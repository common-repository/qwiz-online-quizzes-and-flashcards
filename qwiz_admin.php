<?php
if (! defined ('ABSPATH')) exit;
$swinging_hotspot_admin_f = strpos ($_SERVER['REQUEST_URI'], 'rdgm') !== false;
if ($qwiz_debug[0]) {
   error_log ('[qwiz_admin.php] $_SERVER[REQUEST_URI]; ' . $_SERVER['REQUEST_URI']);
}
if ($swinging_hotspot_admin_f) {
   $plugin_label               = 'Swinging Hotspot';
   $plugin_url                 = 'swinginghotspot.com';
   $quiz_and_flashcard_deck    = 'hotspot diagram';
   $quiz_or_flashcard_deck     = 'hotspot diagram';
   $quizzes_or_flashcard_decks = 'hotspot diagrams';
} else {
   $plugin_label               = 'Qwizcards';
   $plugin_url                 = 'qwizcards.com';
   $quiz_and_flashcard_deck    = 'quiz and flashcard deck';
   $quiz_or_flashcard_deck     = 'quiz or flashcard deck';
   $quizzes_or_flashcard_decks = 'quizzes or flashcard decks';
}
function qwiz_admin () {
   global $qwiz_options_page;
   $qwiz_options_page = add_options_page ('Qwizcards', 'Qwizcards', 'manage_options',
                                          'qwiz-admin', 'qwiz_options');
}
function qwiz_admin_enqueue_scripts ($hook_suffix) {
   global $qwiz_options_page, $qwizcards_version;
   if ($qwiz_options_page == $hook_suffix) {
      wp_enqueue_script ('qwiz_options_script',       plugins_url ('qwiz_admin.js',           __FILE__), array ('jquery'), $qwizcards_version, true);
      wp_enqueue_script ('qwizzled_handle',           plugins_url ('qwizzled.js',             __FILE__), array ('jquery'), $qwizcards_version, true);
      wp_enqueue_script ('qwiz_qcards_common_handle', plugins_url ('qwiz_qcards_common.js',   __FILE__), array ('jquery'), $qwizcards_version, true);
      $qwiz_qcards_common   = qwiz_plugin_url ('qwiz_qcards_common.js');
      wp_enqueue_script ('jquery-ui-autocomplete');
      wp_enqueue_script ('jquery-ui-draggable');
   }
}
add_action ('admin_enqueue_scripts', 'qwiz_admin_enqueue_scripts');
function qwiz_options () {
   global $plugin_label;
   if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
   }
   print '<div class="wrap">' . "\n";
   print    '<h2>' . $plugin_label . ' options</h2>' . "\n";
   print    '<form action="options.php" method="post">' . "\n";
                settings_fields ('qwiz_options_group');
                do_settings_sections ('qwiz-options-page');
   print       '<input name="Submit" type="submit" value="Save changes" style="cursor: pointer;" />' . "\n";
   print    '</form>';
   print '</div>';
}
function qwiz_admin_init () {
   global $plugin_label, $quiz_and_flashcard_deck, $swinging_hotspot_admin_f,
          $server_name;
   register_setting ( 'qwiz_options_group', 'qwiz_options', 'qwiz_options_validate' );
   add_settings_section ('qwiz-go_mobile-section', 'Mobile-device full-screen option/icon',
                         'qwiz_go_mobile_text', 'qwiz-options-page');
   add_settings_field ('qwiz-go_mobile-field', 'Show full-screen icon',
                       'qwiz_go_mobile_field_input', 'qwiz-options-page',
                       'qwiz-go_mobile-section');
   add_settings_section ('qwiz-icon_qwiz-section', $plugin_label . ' icon/link',
                         'icon_qwiz_text', 'qwiz-options-page');
   add_settings_field ('qwiz-icon_qwiz-field', 'Display ' . $plugin_label . ' icon/link',
                       'icon_qwiz_field_input', 'qwiz-options-page',
                       'qwiz-icon_qwiz-section');
   if (! $swinging_hotspot_admin_f) {
      add_settings_section ('qwiz-use_dict-section', 'Free-form input options',
                            'qwiz_free_form_input_text', 'qwiz-options-page');
      add_settings_field ('qwiz-use_dict-field', 'Default for use_dict',
                          'qwiz_use_dict_field_input', 'qwiz-options-page',
                          'qwiz-use_dict-section');
      add_settings_section ('qwiz-use_terms-section', '',
                            '', 'qwiz-options-page');
      add_settings_field ('qwiz-use_terms-field', 'Default for use_terms',
                          'qwiz_use_terms_field_input', 'qwiz-options-page',
                          'qwiz-use_terms-section');
      add_settings_section ('qwiz-hint_timeout-section', '',
                            '', 'qwiz-options-page');
      add_settings_field ('qwiz-hint_timeout-field', 'Seconds till hint shown',
                          'qwiz_hint_timeout_field_input', 'qwiz-options-page',
                          'qwiz-hint_timeout-section');
      $title =   '<input name="Submit" type="submit" value="Save changes" style="cursor: pointer;" />'
               . '<br /><br />'
               . 'Hangman hint options';
      add_settings_section ('qwiz-hangman_hints-section', $title,
                            'qwiz_hangman_hints_text', 'qwiz-options-page');
      add_settings_field ('qwiz-hangman_hints-field', 'Default for number of hints',
                          'qwiz_hangman_hints_field_input', 'qwiz-options-page',
                          'qwiz-hangman_hints-section');
   }
   $title = 'Customize button labels, etc.';
   add_settings_section ('qwiz-translate_strings-section', $title,
                         'qwiz_translate_strings_text', 'qwiz-options-page');
   $title = 'Select phrase to translate<br /><br />Phrase to translate; translation (semicolon-separated pair each line)';
   add_settings_field ('qwiz-translate_strings-field', $title,
                       'qwiz_translate_strings_field_input', 'qwiz-options-page',
                       'qwiz-translate_strings-section');
   if ($server_name != 'learn-biology.com') {
      $title =  'Automatic student registration/login based on WordPress user role';
      add_settings_section ('qwiz-qwizcards_user_role_login-section', $title,
                            'qwiz_qwizcards_user_role_login_text', 'qwiz-options-page');
      add_settings_field ('qwiz-qwizcards_user_role_login-field', 'Enable automatic student login',
                          'qwiz_qwizcards_user_role_login_field_input', 'qwiz-options-page',
                          'qwiz-qwizcards_user_role_login-section');
   }
   $title =   '<input name="Submit" type="submit" value="Save changes" style="cursor: pointer;" />'
            . '<br /><br />'
            . 'Disable automatic shortcode error check and dataset question save on Publish/Update';
   add_settings_section ('qwiz-manual_syntax_check-section', $title,
                         'qwiz_manual_syntax_check_text', 'qwiz-options-page');
   add_settings_field ('qwiz-manual_syntax_check-field', 'Manual-only check/save',
                       'qwiz_manual_syntax_check_field_input', 'qwiz-options-page',
                       'qwiz-manual_syntax_check-section');
   add_settings_section ('qwiz-regular_page_error_check-section', 'Check shortcodes for errors on every page/post',
                         'qwiz_regular_page_error_check_text', 'qwiz-options-page');
   add_settings_field ('qwiz-regular_page_error_check-field', 'Do shortcodes error check every page load',
                       'qwiz_regular_page_error_check_field_input', 'qwiz-options-page',
                       'qwiz-regular_page_error_check-section');
   $title = '<input name="Submit" type="submit" value="Save changes" style="cursor: pointer;" />'
            . '<br /><br />'
            . 'HTML element that contains plugin content (shortcodes, etc.)';
   add_settings_section ('qwiz-content-section', $title,
                         'qwiz_content_text', 'qwiz-options-page');
   add_settings_field ('qwiz-content-field', $plugin_label . '-content<br />HTML element(s)',
                       'qwiz_content_field_input', 'qwiz-options-page',
                       'qwiz-content-section');
}
function qwiz_options_validate ($qwiz_options) {
   global $qwiz_debug;
   $qwiz_options['go_mobile'] = $qwiz_options['go_mobile_select'];
   if ($qwiz_debug[0]) {
      error_log ('[qwiz_options_validate] $qwiz_options[\'go_mobile_select\']: ' . $qwiz_options['go_mobile_select']);
      error_log ('[qwiz_options_validate] $qwiz_options[\'go_mobile\']: '        . $qwiz_options['go_mobile']);
   }
   $new_icon_qwiz = trim ($qwiz_options['icon_qwiz']);
   if (   $new_icon_qwiz != 'Icon and link'
       && $new_icon_qwiz != 'Icon only'
       && $new_icon_qwiz != 'Not displayed') {
      $new_icon_qwiz = 'Icon and link';
   }
   $qwiz_options['icon_qwiz'] = $new_icon_qwiz;
   $qwiz_options['use_dict'] = $qwiz_options['use_dict_select'];
   $qwiz_options['use_terms'] = $qwiz_options['use_terms_select'];
   $qwiz_options['hint_timeout_sec'] = $qwiz_options['hint_timeout_sec_select'];
   $qwiz_options['hangman_hints'] = $qwiz_options['hangman_hints_select'];
   $translate_strings = '';
   if (! empty ($qwiz_options['translate_strings'])) {
      $translate_strings = trim ($qwiz_options['translate_strings']);
      $translate_strings = sanitize_textarea_field ($translate_strings);
   }
   $new_translate_strings = array ();
   if ($translate_strings != '') {
      $lines = explode ("\n", $translate_strings);
      $n_lines = count ($lines);
      for ($i=0; $i<$n_lines; $i++) {
         $line = trim ($lines[$i]);
         if ($line == '') {
            continue;
         }
         $strings = explode (';', $line);
         if (count ($strings) != 2) {
            add_settings_error ('qwiz-translate_strings-section', 'qwiz-translate_strings-errmsg1',
                                'Custom labels line ' . ($i + 1) . ': doesn\'t have semicolon.');
            $new_translate_strings[] = $line;
         } else {
            $old_string = trim ($strings[0]);
            $new_string = trim ($strings[1]);
            if (strlen ($old_string) == 0) {
               add_settings_error ('qwiz-translate_strings-section', 'qwiz-translate_strings-errmsg2',
                                   'Custom labels line' . ($i + 1) . ': null string before semicolon not allowed.');
               $new_translate_strings[] = $old_string . '; ' . $new_string;
            } else {
               $new_translate_strings[] = $old_string . '; ' . $new_string;
            }
         }
      }
   }
   $qwiz_options['translate_strings'] = implode ("\n", $new_translate_strings);
   if (! empty ($qwiz_options['qwizcards_user_role_login'])) {
      $qwiz_options['qwizcards_user_role_login'] = 1;
   } else {
      $qwiz_options['qwizcards_user_role_login'] = '';
   }
   if (! empty ($qwiz_options['regular_page_error_check'])) {
      $qwiz_options['regular_page_error_check'] = 1;
   } else {
      $qwiz_options['regular_page_error_check'] = '';
   }
   if (! empty ($qwiz_options['qwiz_syntax_check_manual_only'])) {
      $qwiz_options['qwiz_syntax_check_manual_only'] = 1;
   } else {
      $qwiz_options['qwiz_syntax_check_manual_only'] = '';
   }
   $new_content = trim ($qwiz_options['content']);
   if ($new_content == '') {
      $new_content = 'article';
      add_settings_error ('qwiz-content-section', 'qwiz-content-errmsg',
                          'All-blank content HTML element(s) not allowed.  Resetting to default...');
   }
   $qwiz_options['content'] = $new_content;
   return $qwiz_options;
}
function qwiz_go_mobile_text () {
   global $quiz_and_flashcard_deck, $quiz_or_flashcard_deck;
   print '<p>';
   print 'An icon at the top left of each ' . $quiz_and_flashcard_deck . ' allows users to ';
   print 'switch to full-screen view.&nbsp; ';
   print 'In addition, on small-screen devices users see a full-screen view of ';
   print 'a ' . $quiz_and_flashcard_deck . ' once they start that ' . $quiz_or_flashcard_deck . '.&nbsp; ';
   print 'You can specify whether the full-screen icon is always shown, shows ';
   print 'only on small screens, or the icon and full-screen view are disabled.';
   print '</p>';
}
function qwiz_go_mobile_field_input () {
   global $qwiz_options, $qwiz_debug;
   $go_mobile = 'true';
   if (! empty ($qwiz_options['go_mobile'])) {
      $go_mobile = $qwiz_options['go_mobile'];
      if ($qwiz_debug[0]) {
         error_log ('[qwiz_go_mobile_field_input] $go_mobile: X' . $go_mobile . 'X');
      }
   }
   print '<table border="0">';
   print    '<tr>';
   print       '<td style="padding: 0; width: 120px;">';
   print          '<select id="qwiz_go_mobile_qwiz" name="qwiz_options[go_mobile_select]">' . "\n";
   $selected = $go_mobile == 'Enabled' || $go_mobile == 'Always' ? 'selected' : '';
   print             "<option $selected>";
   print                "Always";
   print             "</option>\n";
   $selected = $go_mobile == 'Small screens only' ? 'selected' : '';
   print             "<option $selected>";
   print                "Small screens only";
   print             "</option>\n";
   $selected = $go_mobile == 'Disabled' ? 'selected' : '';
   print             "<option $selected>";
   print                "Disabled";
   print             "</option>\n";
   print          "</select>\n";
   print       '</td>';
   print       '<td style="padding: 0; font-size: 13px;">';
   print          'When the switch-to-full-screen icon is shown, or full-screen view is disabled.';
   print       '</td>';
   print    '</tr>';
   print '</table>';
}
function icon_qwiz_text () {
   global $plugin_label, $quiz_or_flashcard_deck, $plugin_url;
   print '<p>';
   print 'The ' . $plugin_label . ' icon appears on the first or introductory card/page ';
   print 'of a ' . $quiz_or_flashcard_deck . '.  It provides a link to the ' . $plugin_label . ' ';
   print 'email, support@' . $plugin_url . '.';
   print '</p>';
}
function icon_qwiz_field_input () {
   global $qwiz_debug, $qwiz_options;
   if ($qwiz_debug[0]) {
   }
   $icon_qwiz = '';
   if (! empty ($qwiz_options['icon_qwiz'])) {
      $icon_qwiz = $qwiz_options['icon_qwiz'];
   }
   if ($icon_qwiz == '') {
      $icon_qwiz = 'Icon and link';
   }
   print '<select id="qwiz_qwiz_icon_qwiz" name="qwiz_options[icon_qwiz]">' . "\n";
   $select_options = array ('Icon and link', 'Icon only', 'Not displayed');
   $n_select_options = count ($select_options);
   for ($i_opt=0; $i_opt<$n_select_options; $i_opt++) {
      $value = $select_options[$i_opt];
      $selected = $icon_qwiz == $value ? 'selected' : '';
      print    '<option value = "' . $value . '" ' . $selected . ">\n";
      print       $value;
      print    "</option>\n";
   }
   print "</select>\n";
}
function qwiz_free_form_input_text () {
   print 'Free-form input is specified with the [textentry] shortcode.&nbsp; ';
   print 'Users type a few characters and pick words from a suggestion list.&nbsp; ';
   print 'You can specify option default choices here.&nbsp; ';
   print 'You can also specify whether the dictionary and/or terms list will be used for any particular quiz question or flashcard by entering something like [textentry use_dict="false" use_terms="true"]';
}
function qwiz_use_dict_field_input () {
   global $qwiz_options;
   $use_dict = 'true';
   if (! empty ($qwiz_options['use_dict'])) {
      $use_dict = $qwiz_options['use_dict'];
   }
   print '<table border="0">';
   print    '<tr>';
   print       '<td style="padding: 0; width: 120px;">';
   print          '<select id="qwiz_use_dict_qwiz" name="qwiz_options[use_dict_select]">' . "\n";
   $selected = $use_dict == 'true' ? 'selected' : '';
   print             "<option $selected>";
   print                "true";
   print             "</option>\n";
   $selected = $use_dict == 'false' ? 'selected' : '';
   print             "<option $selected>";
   print                "false";
   print             "</option>\n";
   print          "</select>\n";
   print       '</td>';
   print       '<td style="padding: 0; font-size: 13px;">';
   print          'Whether an English-language dictionary will be used for suggestion words.';
   print       '</td>';
   print    '</tr>';
   print '</table>';
}
function qwiz_use_terms_field_input () {
   global $qwiz_options;
   $use_terms = 'true';
   if (! empty ($qwiz_options['use_terms'])) {
      $use_terms = $qwiz_options['use_terms'];
   }
   print '<table border="0">';
   print    '<tr>';
   print       '<td style="padding: 0; width: 120px;">';
   print          '<select id="qwiz_use_terms_qwiz" name="qwiz_options[use_terms_select]">' . "\n";
   $selected = $use_terms == 'true' ? 'selected' : '';
   print             "<option $selected>";
   print                "true";
   print             "</option>\n";
   $selected = $use_terms == 'false' ? 'selected' : '';
   print             "<option $selected>";
   print                "false";
   print             "</option>\n";
   print          "</select>\n";
   print       '</td>';
   print       '<td style="padding: 0; font-size: 13px;">';
   print          'Whether a list of biology terms will be used for suggestion words.';
   print       '</td>';
   print    '</tr>';
   print '</table>';
}
function qwiz_hint_timeout_field_input () {
   global $qwiz_options;
   $hint_timeout_sec = 20;
   if (! empty ($qwiz_options['hint_timeout_sec'])) {
      $hint_timeout_sec = $qwiz_options['hint_timeout_sec'];
      if ($hint_timeout_sec == '') {
         $hint_timeout_sec = 20;
      }
   }
   print '<table border="0">';
   print    '<tr>';
   print       '<td style="padding: 0; width: 120px;">';
   print          '<select id="qwiz_hint_timeout_qwiz" name="qwiz_options[hint_timeout_sec_select]">' . "\n";
   $select_displays = array ('Never', 'Always show', 2, 3, 5, 10, 15, 20, 30, 60);
   $select_values   = array (     -1,             0, 2, 3, 5, 10, 15, 20, 30, 60);
   $n_select_options = count ($select_displays);
   for ($i_opt=0; $i_opt<$n_select_options; $i_opt++) {
      $display = $select_displays[$i_opt];
      $value   = $select_values[$i_opt];
      $selected = $hint_timeout_sec == $value ? 'selected' : '';
      print          '<option value="' . $value . '" ' . $selected . ">\n";
      print             $display;
      print          "</option>\n";
   }
   print           "</select>\n";
   print       '</td>';
   print       '<td style="padding: 0; font-size: 13px;">';
   print          'How long before a &ldquo;Hint&rdquo; button is shown if the user does nothing.&nbsp; ';
   print          '(A hint will be shown in any case if the user types a few &ldquo;incorrect&rdquo; letters.)';
   print       '</td>';
   print    '</tr>';
   print '</table>';
}
function qwiz_hangman_hints_text () {
   print 'A &ldquo;Hint&rdquo; button is normally shown with [hangman] input, and two hint letters may be requested.&nbsp; ';
   print 'You can change this default.&nbsp; ';
   print 'You can eliminate the hint button, or specify how many hints will be given.&nbsp; ';
   print 'You can also customize individual quizzes and flashcard decks by adding a "hint=" attribute to the [hangman] shortcode, like this: [hangman hints=3]';
}
function qwiz_hangman_hints_field_input () {
   global $qwiz_options;
   $hangman_hints = 2;
   if (! empty ($qwiz_options['hangman_hints'])) {
      $hangman_hints = $qwiz_options['hangman_hints'];
      if ($hangman_hints == '') {
         $hangman_hints = 2;
      }
   }
   print '<table border="0">';
   print    '<tr>';
   print       '<td style="padding: 0; width: 120px;">';
   print          '<select id="qwiz_hangman_hints" name="qwiz_options[hangman_hints_select]">' . "\n";
   $select_displays = array ('No hint button', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'No limit');
   $select_values   = array (               0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100);
   $n_select_options = count ($select_displays);
   for ($i_opt=0; $i_opt<$n_select_options; $i_opt++) {
      $display = $select_displays[$i_opt];
      $value   = $select_values[$i_opt];
      $selected = $hangman_hints == $value ? 'selected' : '';
      print          '<option value="' . $value . '" ' . $selected . ">\n";
      print             $display;
      print          "</option>\n";
   }
   print           "</select>\n";
   print       '</td>';
   print       '<td style="padding: 0; font-size: 13px;">';
   print          'The maximum number of hint letters that will be provided.';
   print       '</td>';
   print    '</tr>';
   print '</table>';
}
function qwiz_translate_strings_text () {
   global $plugin_label, $swinging_hotspot_admin_f;
   print '<p>';
   print 'You can change the labels that are currently displayed on buttons or ';
   print 'in headers (or just about anywhere else for that matter).';
   print 'Enter the current phrase you want to change, followed by a ';
   print 'semicolon, and then the replacement phrase. ';
   print 'Enter each such translation on a separate line. ';
   print '</p>';
   print '<p>';
   print 'Note: the &ldquo;phrase to translate&rdquo; must be entered in its entirety, ';
   print 'exactly as it currently appears.  Thus, &ldquo;Correct!&rdquo; must be entered ';
   print 'with the uppercase C and the exclamation point. ';
   print '</p>';
   print '<p>';
   if (! $swinging_hotspot_admin_f) {
      print 'Example: to replace the Flashcard button "Need more practice" ';
      print 'with "Try card again later", enter<br />';
      print '&emsp;&emsp; Need more practice; Try card again later ';
   } else {
      print 'Example: to replace the feedback, ';
      print '&ldquo;You identified all of the items on the first try!&rdquo; ';
      print 'with &ldquo;Great, you got them all!&rdquo;, enter<br />';
      print '&emsp;&emsp; You identified all of the items on the first try!; Great, you got them all!';
   }
   print '</p>';
}
function qwiz_translate_strings_field_input () {
   global $qwiz_options;
   $translate_strings = '';
   if (! empty ($qwiz_options['translate_strings'])) {
      $translate_strings = sanitize_textarea_field ($qwiz_options['translate_strings']);
   }
   print '<style type="text/css">';
   print    '.qwiz_tstrings_suggestions {';
   print       'width:        40rem;';
   print       'max-height:   200px;';
   print       'overflow-x:   scroll;';
   print       'overflow-y:   scroll;';
   print    '}';
   print '</style>';
   print '<input id="t_strings_select" style="width: 35rem;" onfocus="jQuery (this).autocomplete (\'search\', \'\')" placeholder="Type three or more letters" />&nbsp; ';
   print '<nobr>';
   print    '<label>';
   print       '<input type="checkbox" onclick="qwiz_admin.set_tstrings_to_show (this)" />';
   print       'Show all phrases';
   print    '</label>';
   print '</nobr>';
   print '<br />';
   print '<br />';
   print '<textarea id="qwiz_translate_strings" ';
   print '          name="qwiz_options[translate_strings]" ';
   print '          wrap="off" ';
   print '          style="width: 35rem; height: 5rem;">';
   print esc_textarea ($translate_strings);
   print '</textarea>&ensp;';
   print '<button onclick="qwiz_admin.add_all_translate_strings ()" style="vertical-align: top; cursor: pointer;">';
   print    '<b>Add all phrases</b>';
   print '</button>';
}
function qwiz_regular_page_error_check_text () {
   global $plugin_label, $quiz_and_flashcard_deck;
   print '<p>';
   print 'You can have ' . $plugin_label . ' perform error checks of ' . $quiz_and_flashcard_deck . ' shortcodes ';
   print 'on every page load, which may be useful if you have had to disable shortcode error checks ';
   print 'on Update/Publish in the WordPress editor, or if there is an error particular to a page&rsquo;s published content.&nbsp; ';
   print '</p>';
}
function qwiz_regular_page_error_check_field_input () {
   global $qwiz_options;
   if (! empty ($qwiz_options['regular_page_error_check'])) {
      $regular_page_error_check = $qwiz_options['regular_page_error_check'];
   } else {
      $regular_page_error_check = 0;
   }
   $checked = $regular_page_error_check == 1 ? 'checked' : '';
   print '<input id="regular_page_error_check" name="qwiz_options[regular_page_error_check]" '
      .      'type="checkbox" ' . $checked . ' /> ';
   print 'Check this box to perform shortcode error checks on each page load' . "\n";
}
function qwiz_qwizcards_user_role_login_text () {
   if (! empty ($qwiz_options['qwizcards_user_role_login'])) {
      $qwizcards_user_role_login = $qwiz_options['qwizcards_user_role_login'];
   } else {
      $qwizcards_user_role_login = 0;
   }
   print '<p>';
   print 'You can specify subsets of WordPress users who will be automatically ';
   print 'set up for score recording and progress reports in Qwizcards.&nbsp; ';
   print 'Their login to your WordPress site will also log them in to all ';
   print 'quizzes and flashcard decks that have progress reporting enabled ';
   print '(this is done with the &ldquo;Qwizcards editing menu&rdquo; in the ';
   print 'WordPress editor &ndash; you will need a Qwizcards administrative ';
   print 'account, which you can set up ';
   print '<a href="https://qwizcards.net/admin/new_account" target="_blank">';
   print 'here</a>).&nbsp; ';
   print '</p>';
}
function qwiz_qwizcards_user_role_login_field_input () {
   global $qwiz_options;
   if (! empty ($qwiz_options['qwizcards_user_role_login'])) {
      $qwizcards_user_role_login = $qwiz_options['qwizcards_user_role_login'];
   } else {
      $qwizcards_user_role_login = '';
   }
   $checked = $qwizcards_user_role_login == 1 ? 'checked' : '';
   print '<input class="qwizcards_user_role_login" name="qwiz_options[qwizcards_user_role_login]" '
          .      'type="checkbox" ' . $checked . ' /> ';
   print '<input id="qwizcards_user_role_login_info" type="hidden" name="qwiz_options[qwizcards_user_role_login_info]" />';
   print 'Students&rsquo; progress will be recorded in the class(es) specified here:';
   print '<br />';
   print '<br />';
   print '<div class="qwizcards_user_role_login">';
   print '</div>';
   print '<style type="text/css">';
   print    'table.qwizcards_user_role_login {';
   print       'border-collapse:    collapse;';
   print    '}';
   print    'table.qwizcards_user_role_login th,';
   print    'table.qwizcards_user_role_login td {';
   print       'padding:            0 10px 0 5px;';
   print    '}';
   print    'table.qwizcards_user_role_login th {';
   print       'width:              auto;';
   print       'text-align:         left;';
   print       'vertical-align:     bottom;';
   print       'border-bottom:      1px solid black;';
   print    '}';
   print    'table.qwizcards_user_role_login td {';
   print       'height:             30px;';
   print       'text-align:         left;';
   print       'vertical-align:     middle;';
   print    '}';
   print    'table.qwizcards_user_role_login select {';
   print       'padding-left:       4px;';
   print       'margin-left:        -4px;';
   print    '}';
   print    'table.qwizcards_user_role_login img {';
   print       'width:              16px;';
   print       'height:             16px;';
   print    '}';
   print    'table.qwizcards_user_role_login td.add_delete img:hover {';
   print       'outline:            4px solid white;';
   print    '}';
   print '</style>';
   print '<table class="qwizcards_user_role_login">';
   print    '<thead>';
   print       '<tr>';
   print          '<th style="border: none;">';
   print          '</th>';
   print          '<th>';
   print             'User role';
   print          '</th>';
   print          '<th>';
   print             'Qwizcards administrative login name';
   print          '</th>';
   print          '<th>';
   print             'First name';
   print          '</th>';
   print          '<th>';
   print           'Last name';
   print          '</th>';
   print          '<th>';
   print           'Class';
   print          '</th>';
   print          '<th style="border: none;">';
   print          '</th>';
   print       '</tr>';
   print    '</thead>';
   print    '<tbody>';
   print    '</tbody>';
   print '</table>';
}
function qwiz_manual_syntax_check_text () {
   global $plugin_label;
   print '<p>';
   print 'Normally ' . $plugin_label . ' automatically checks for errors and saves dataset ';
   print 'questions when you click &ldquo;Publish&rdquo; or &ldquo;Update&rdquo; ';
   print 'in the WordPress editor.&nbsp; ';
   print 'Sometimes, however, this interferes with the Update/Publish function.&nbsp; ';
   print 'You can disable the automatic-check feature here.&nbsp; ';
   print 'A manual option to check shortcodes and save dataset questions will be ';
   print 'available in the ' . $plugin_label . ' editing menu pop-up.';
   print '</p>';
}
function qwiz_manual_syntax_check_field_input () {
   global $qwiz_options;
   if (! empty ($qwiz_options['qwiz_syntax_check_manual_only'])) {
      $qwiz_syntax_check_manual_only = $qwiz_options['qwiz_syntax_check_manual_only'];
   } else {
      $qwiz_syntax_check_manual_only = 0;
   }
   $checked = $qwiz_syntax_check_manual_only == 1 ? 'checked' : '';
   print '<input id="qwiz_manual_syntax_check" name="qwiz_options[qwiz_syntax_check_manual_only]" '
      .      'type="checkbox" ' . $checked . ' /> ';
   print 'Check this box to disable the automatic shortcode error check / dataset save' . "\n";
}
function qwiz_content_text () {
   global $plugin_label, $quiz_and_flashcard_deck, $quizzes_or_flashcard_decks;
   print '<p>';
   print 'The ' . $plugin_label . ' "content" HTML element identifies the "container" for ';
   print $quiz_and_flashcard_deck . ' shortcodes, etc.  In WordPress, this is where ';
   print 'page and post content appears.  The default setting is the html tag ';
   print '"article".  There may be special circumstances (themes) that require ';
   print 'additional specifications ("div.entry-summary", say).  ';
   print 'This option lets you change or add to the default setting.';
   print '</p>';
   print '<p>';
   print 'Note: pages that include excerpts from several pages or posts ';
   print '(including the results of a search) include multiple such HTML ';
   print 'elements, which may contain incomplete ' . $quizzes_or_flashcard_decks . '. ';
   print 'The ' . $plugin_label . ' plugin handles this, but will be confused if it thinks ';
   print 'the excerpts are all part of the same page or post. ';
   print 'So don\'t define "body" to be the ' . $plugin_label . '-content HTML element!';
   print '</p>';
   print '<p>';
   print 'HTML elements are entered CSS-fashion, comma-separated, such as div.class, div#id. Examples:<br />';
   print '&emsp;&emsp; div#special-container &emsp; - div element with id="special-container"<br />';
   print '&emsp;&emsp; span.content-span &emsp; - span element with class="content-span"';
   print '</p>';
}
function qwiz_content_field_input () {
   global $qwiz_options, $wp_roles;
   $content = '';
   if (! empty ($qwiz_options['content'])) {
      $content = sanitize_text_field ($qwiz_options['content']);
   }
   if ($content == '') {
      $content = 'article';
   }
   print '<input id="qwiz_content" name="qwiz_options[content]" type="text" '
         . 'style="width: 30rem;" value="' . esc_textarea ($content) . '" />' . "\n";
   $qwiz_wp_roles_json = json_encode (array_keys ($wp_roles->roles));
   $qwizcards_user_role_login_info_json = "''";
   if (! empty ($qwiz_options['qwizcards_user_role_login_info'])) {
      $qwizcards_user_role_login_info_json = $qwiz_options['qwizcards_user_role_login_info'];
   }
   print '<script id="qwiz_admin_js">';
   print    'var user_role_info = ' . $qwizcards_user_role_login_info_json . ';';
   print    'var wp_roles       = ' . $qwiz_wp_roles_json . ';';
   print '</script>';
}
add_action ('admin_menu', 'qwiz_admin');
add_action ('admin_init', 'qwiz_admin_init');
