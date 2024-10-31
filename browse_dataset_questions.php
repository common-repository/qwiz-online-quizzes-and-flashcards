<?php
include 'globals.php';
$server_loc = preg_replace ('/https*:/', '', $qwiz_server_loc);
if ($qwiz_debug[0]) {
   error_log ('[browse_dataset_questions.php] $_REQUEST: ' . print_r ($_REQUEST, true));
}
$records_per_query = 25;
function qwiz_selected ($option, $value) {
   $selected = '';
   if ($option == $value) {
      $selected = 'selected';
   }
   return $selected;
}
if ($qwiz_debug[0]) {
   error_log ('[browse_dataset_questions.php] $server_name: ' . $server_name . ', $qjax_bypass: ' . $qjax_bypass);
}
$plugin_url = qwiz_plugin_url ( '/');
$plugin_loc = sanitize_text_field ($_REQUEST['plugin_loc']);
$url_components = parse_url ($plugin_loc);
$wp_site_url = $url_components['scheme'] . '://' . $url_components['host'];
if ($qwiz_debug[0]) {
   error_log ('[browse_dataset_questions.php] plugin_loc: ' . $plugin_loc . ', $wp_site_url: ' . $wp_site_url);
}
if (isset ($_REQUEST['maker_email'])) {
   $maker_email = sanitize_text_field ($_REQUEST['maker_email']);
} else {
   $maker_email = '';
}
if (isset ($_REQUEST['qwiz_deck'])) {
   $qwiz_deck = sanitize_text_field ($_REQUEST['qwiz_deck']);
} else {
   $qwiz_deck = 'qwiz';
}
if (isset ($_REQUEST['qwizard_page'])) {
   $qwizard_page = sanitize_text_field (urldecode ($_REQUEST['qwizard_page']));
} else {
   $qwizard_page = '';
}
if (isset ($_REQUEST['qwizard_php_f'])) {
   $qwizard_php_f = sanitize_text_field ($_REQUEST['qwizard_php_f']);
   $qwizard_php_f = $qwizard_php_f ? 1 : 0;
} else {
   $qwizard_php_f = 0;
}
if (isset ($_REQUEST['browse_records_shown'])) {
   $browse_records_shown = sanitize_text_field ($_REQUEST['browse_records_shown']);
} else {
   $browse_records_shown = $records_per_query;
}
if ($qwiz_deck == 'qwiz') {
   $q_f = 'Q';
   $question_card = 'question';
} else {
   $q_f = 'F';
   $question_card = 'card';
}
$search_words_array_json = '""';
$search_words_string     = '';
if (isset ($_REQUEST['browse_search_words_array'])) {
   $search_words_array = $_REQUEST['browse_search_words_array'];
   array_walk ($search_words_array, 'qwiz_sanitize_text_field');
   $search_words_array_json = json_encode ($search_words_array);
   if (gettype ($search_words_array) == 'array') {
      $search_words_string = implode (' ', $search_words_array);
   }
   if ($qwiz_debug[0]) {
      error_log ('[browse_dataset_questions.php] $search_words_array_json: ' . print_r ($search_words_array_json, true));
      error_log ('[browse_dataset_questions.php] gettype ($search_words_array):' .  gettype ($search_words_array));
      error_log ('[browse_dataset_questions.php] $search_words_string: ' . $search_words_string);
   }
}
$search_question_card_type = '';
if (isset ($_REQUEST['browse_search_question_card_type'])) {
   $search_question_card_type = sanitize_text_field ($_REQUEST['browse_search_question_card_type']);
}
$search_unit_topic = '';
if (isset ($_REQUEST['browse_search_unit_topic'])) {
   $search_unit_topic = sanitize_text_field ($_REQUEST['browse_search_unit_topic']);
}
$reinit_scrollY = 0;
if (isset ($_REQUEST['browse_scrollY'])) {
   $reinit_scrollY = sanitize_text_field ($_REQUEST['browse_scrollY']);
}
$question_types_display = array ('Multiple choice', 'Hangman', 'Free-form input',
                                 'One-letter answer', 'Labeled diagram',
                                 'Show me the answer', 'Information only');
$card_types_display     = array ('Simple card', 'Hangman', 'Free-form input',
                                 'One-letter answer');
$question_card_type_display = array (
   'multiple_choice'    => 'Multiple choice',
   'hangman'            => 'Hangman',
   'textentry'          => 'Free-form input',
   'one_letter_answer'  => 'One-letter answer',
   'labeled_diagram'    => 'Labeled diagram',
   'show_me'            => 'Show me the answer',
   'information_only'   => 'Information only',
   'simple_card'        => 'Simple card',
   'optional_textentry' => 'Optional text input',
   ''                   => '');
wp_head ();
wp_footer ();
define ('WP_USE_THEMES', false);
if ($qwiz_debug[0]) {
   error_log ('[browse_dataset_questions.php] php finished');
}
?>
<!DOCTYPE HTML>
<html>
<head>
   <meta http-equiv="content-type" content="text/html; charset=UTF-8">
   <meta charset="UTF-8">
   <title>
      <?php print ucfirst ($question_card) ?> from database
   </title>
   <!-- For jjax ().  Need to pass it server loc (qwiz_params not otherwise
        set). -->
   <script>
      var qwiz_params = {server_loc:        '<?php print $server_loc ?>',
                         secure_server_loc: '<?php print $qwiz_secure_server_loc ?>',
                         qjax_bypass:       '<?php print $qjax_bypass ?>',
                         wp_site_url:       '<?php print $wp_site_url ?>'
                        };
   </script>
   <script>
      var $ = jQuery;
      var qqc;
      var debug         = '<?php print $qwiz_debug[0] ?>';
      var plugin_loc    = '<?php print $plugin_loc ?>';
      var qwizard_page  = '<?php print $qwizard_page ?>';
      var q_f           = '<?php print $q_f ?>';
      var question_card = '<?php print $question_card ?>';
      var qwizard_php_f = <?php print $qwizard_php_f ?>;
      var question_card_type_display = <?php print json_encode ($question_card_type_display) ?>;
      var combobox_callback          = qwiz_unit_topic_selected;
      var dataset_question_ids    = [];
      var question_card_page_urls = [];
      var skip_records;
      var records_per_query    = <?php print $records_per_query ?>;
      var more_records_available_f;
      var browse_records_shown = <?php print $browse_records_shown ?>;
      var ii_row = 0;
      var input_search_words        = '';
      var search_words_array        = <?php print ($search_words_array_json) ?>;
      var search_question_card_type = '<?php print $search_question_card_type ?>';
      var search_unit_topic         = '<?php print addslashes ($search_unit_topic) ?>';
      var reinit_scrollY            = <?php print $reinit_scrollY ?>;
      var $dialog_request_permission;
      var $dialog_dataset_question_page_link;
      var $dialog_search_help;
      var requested_dataset;
      var requested_question_card_page_url;
      var request_permission_email_msg_body;
      $ (document).ready (function () {
         qqc = qwiz_qcards_common;
         qwiz_create_questions_cards_table ();
         skip_records = 0;
         qwiz_get_data (browse_records_shown, search_words_array, search_question_card_type);
         qwiz_get_units_topics ();
         $dialog_request_permission = $ ('#dialog_request_permission').dialog ({
            autoOpen:      false,
            width:         700,
            height:        500,
            modal:         true,
            draggable:     false,
            resizable:     false
         });
         $dialog_dataset_question_page_link = $ ('#dialog_dataset_question_page_link').dialog ({
            autoOpen:      false,
            width:         500,
            height:        350,
            modal:         true,
            draggable:     false,
            resizable:     false,
            buttons:       {'Close':        function () {
                                               $dialog_dataset_question_page_link.dialog ('close');
                                            }
                           }
         });
         $dialog_search_help = $ ('#dialog_search_help').dialog ({
            autoOpen:      false,
            width:         500,
            height:        200,
            modal:         false,
            draggable:     true,
            resizable:     false,
            position:      {my: 'left top',
                            at: 'center',
                            of: '#search_info_icon'},
         });
      });
      function qwiz_get_units_topics () {
         var data = {qwizard_page:         qwizard_page,
                     q_f:                  q_f
                    };
         if (debug) {
            console.log ('[browse_dataset_questions.php > qwiz_get_units_topics ()] data:', data);
         }
         qqc.qjax ('', 0, 0, 'browse_dataset_questions_units_topics', data);
      }
      function set_units_topics (data) {
         if (debug) {
            console.log ('[set_units_topics] data:', data);
         }
         var $units_topics = $ ('div#qwiz_unit_topic_select');
         $units_topics_select = $units_topics.find ('select');
         var opts = $units_topics_select[0].options;
         var units_topics = data.units_topics;
         var n = units_topics.length;
         for (var i=0; i<n; i++) {
            opts[opts.length] = new Option (units_topics[i]);
         }
         $units_topics_select.combobox ();
         $units_topics_input = $units_topics.find ('input');
         $units_topics_input.attr ('placeholder', 'Enter unit or topic, or use pull-down');
         if (search_unit_topic) {
            $units_topics_input.val (search_unit_topic);
         }
      }
      function qwiz_unit_topic_selected (unit_topic) {
         if (debug) {
            console.log ('[qwiz_unit_topic_selected] unit_topic:', unit_topic);
         }
         if (unit_topic == '[Any]') {
            unit_topic = '';
         }
         search_unit_topic = unit_topic;
         qwiz_new_search ();
      }
      function qwiz_get_data (local_browse_records_shown, search_words_array, search_question_card_type) {
         var data = {qwizard_page:         qwizard_page,
                     q_f:                  q_f,
                     skip_records:         skip_records,
                     records_per_query:    local_browse_records_shown
                    };
         if (search_words_array.length) {
            if (search_words_array[0]) {
               data.search_words_array = search_words_array;
            }
         }
         if (search_question_card_type) {
            data.search_question_card_type = search_question_card_type;
         }
         if (search_unit_topic) {
            data.search_unit_topic = search_unit_topic;
         }
         if (debug) {
            console.log ('[browse_dataset_questions.php > qwiz_get_data ()] data:', data);
         }
         qqc.qjax ('', 0, 0, 'browse_dataset_questions_sql', data);
      }
      function qwiz_full_text_search (input_el) {
         input_search_words = trim (input_el.value);
         if (debug) {
            console.log ('[qwiz_full_text_search] input_search_words:', input_search_words);
         }
         search_words_array = [];
         if (input_search_words.length) {
            var search_words = input_search_words.replace (/[-\s]+/g, ' ').toUpperCase ();
            search_words = search_words.replace (/[^A-Z0-9 *'"]/g, '');
            var quoted_strings = search_words.match (/"[^"]*?"/g);
            if (quoted_strings) {
               search_words = search_words.replace (/"[^"]*?"/g, '');
            }
            if (search_words.indexOf ('"') != -1) {
               alert ('Double-quotes must be entered in pairs surrounding exact-match search terms');
               var delay_focus = function () {
                  input_el.focus ();
               }
               setTimeout (delay_focus, 100);
               return;
            }
            search_words = trim (search_words);
            search_words_array = search_words.split (/\s+/);
            if (search_words_array[0] != '') {
               if (quoted_strings) {
                  search_words_array = search_words_array.concat (quoted_strings);
               }
            } else {
               search_words_array = quoted_strings;
            }
            if (debug) {
               console.log ('[qwiz_full_text_search] search_words_array:', search_words_array);
            }
            var ok_f = false;
            var n_words = search_words_array.length;
            for (var i=0; i<n_words; i++) {
               if (search_words_array[i].length > 3) {
                  ok_f = true;
                  break;
               }
            }
            if (! ok_f) {
               alert ('Word must be at least four letters or longer');
               var delay_focus = function () {
                  input_el.focus ();
               }
               setTimeout (delay_focus, 100);
               return;
            }
         }
         qwiz_new_search ();
      }
      function qwiz_new_search () {
         skip_records            = 0;
         ii_row                  = 0;
         browse_records_shown    = records_per_query;
         dataset_question_ids    = [];
         question_card_page_urls = [];
         window.removeEventListener ('scroll', qwiz_detect_scroll_near_bottom);
         $ ('#questions_cards_tbody').html ('');
         qwiz_get_data (records_per_query, search_words_array, search_question_card_type);
      }
      function qwiz_question_card_type_search (select_el) {
         var display_type = select_el.value;
         search_question_card_type = qwiz_findKey (question_card_type_display, display_type);
         if (debug) {
            console.log ('[qwiz_question_card_type_search] display_type:', display_type, 'search_question_card_type:', search_question_card_type);
         }
         qwiz_new_search ();
      }
      function qwiz_cancel_browse () {
         if (window.opener && window.opener.qwizard) {
            window.opener.qwizard.cancel_browse_alert (question_card);
         }
         window.close ();
      }
      function qwiz_create_questions_cards_table () {
         if (debug) {
            console.log ('[qwiz_create_questions_cards_table]');
         }
         var Question_Card;
         if (q_f == 'Q') {
            Question_Card       = 'Question';
         } else {
            Question_Card       = 'Card';
         }
         var htm = [];
         htm.push ('<table id="qwiz_questions_cards" class="qwiz_questions_cards">');
         htm.push (   '<thead>');
         htm.push (      '<tr>');
         htm.push (         '<th>');
         htm.push (         '</th>');
         htm.push (         '<th>');
         htm.push (            'Type');
         htm.push (         '</th>');
         htm.push (         '<th>');
         htm.push (            'Unit&nbsp;/&nbsp;topic');
         htm.push (         '</th>');
         htm.push (         '<th>');
         if (q_f == 'Q') {
            htm.push (         Question_Card + '&nbsp;text');
         } else {
            htm.push (         '<table class="qwiz_card_front_back">');
            htm.push (            '<thead>');
            htm.push (               '<tr>');
            htm.push (                  '<th>');
            htm.push (                     'Card front');
            htm.push (                  '</th>');
            htm.push (                  '<th>');
            htm.push (                     'Card back');
            htm.push (                  '</th>');
            htm.push (               '</tr>');
            htm.push (            '</thead>');
            htm.push (         '</table>');
         }
         htm.push (         '</th>');
         htm.push (         '<th class="center">');
         htm.push (            Question_Card + '&nbsp;image');
         htm.push (            '<br />');
         htm.push (            '<span class="normal smaller">');
         htm.push (               '(hover to enlarge)');
         htm.push (            '</span>');
         htm.push (          '</th>');
         htm.push (      '</tr>');
         htm.push (   '</thead>');
         htm.push (   '<tbody id="questions_cards_tbody">');
         htm.push (    '</tbody>');
         htm.push ('</table>');
         htm = htm.join ('\n');
         $ ('div#qwiz_questions_cards_table').html (htm);
      }
      function add_to_questions_cards_table (data) {
         if (debug) {
            console.log ('[add_to_questions_cards_table] data:', data);
         }
         var quiz_flashcard_deck;
         if (q_f == 'Q') {
            quiz_flashcard_deck = 'quiz';
         } else {
            quiz_flashcard_deck = 'flashcard_deck';
         }
         var units  = data.units;
         var topics = data.topics;
         var htmls  = data.htmls;
         var n_additional_questions_cards = htmls.length;
         if (n_additional_questions_cards > 0) {
            $ ('#getting_more').html ('Added ' + n_additional_questions_cards + ' ' + question_card + 's').fadeOut (4000, 'easeInCubic');
         } else {
            $ ('#getting_more').hide ();
            var msg =  '<tr>'
                     +    '<td colspan="4">'
                     +       '<br />'
                     +       '<span class="red">Did not find any ' + question_card + 's matching ';
               if (search_words_array) {
                  msg +=        '&ldquo;' + input_search_words.toLowerCase () + '&rdquo;';
                  if (search_question_card_type) {
                     msg +=     ' and ';
                  }
               }
               if (search_question_card_type) {
                  msg +=        '&ldquo;' + question_card_type_display[search_question_card_type] + '&rdquo;';
               }
               msg +=        '</span>';
                     +    '</td>';
                     + '</tr>';
               $ ('#questions_cards_tbody').append (msg);
            return;
         }
         var browse_image_urls          = data.browse_image_urls;
         var thumbnail_urls             = data.thumbnail_urls;
         var question_card_types        = data.question_card_types;
         var permission_requested_fs    = data.permission_requested_fs;
         var permission_requested_dates = data.permission_requested_dates;
         var permission_ok_fs           = data.permission_ok_fs;
         var records_queried            = data.records_queried;
         more_records_available_f       = data.more_records_available_f;
         var add_question_card_title = 'Add ' + question_card + ' to ' + quiz_flashcard_deck;
         var request_permission_title = 'Click to open form to request permission to use ' + question_card + 's from this dataset on your site/page';
         var htm = [];
         for (var i_row=0; i_row<n_additional_questions_cards; i_row++) {
            htm.push ('<tr class="i_row' + ii_row + '">');
            htm.push (   '<td class="pad_top center">');
            if (permission_ok_fs[i_row]) {
               htm.push (   '<img src="<?php print $plugin_loc ?>images/add_icon.png" class="pointer" onclick="qwiz_add_question_card (' + ii_row + ')" title="' + add_question_card_title + '" />');
            } else if (permission_requested_fs[i_row]) {
               var rerequest_permission_title = 'Permission requested ' + permission_requested_dates[i_row] + '.  Click to open form to resend request';
               htm.push (   '<img src="' + plugin_loc + 'images/icon_question_checked.png" class="pointer" onclick="qwiz_request_permission (' + ii_row + ', \'' + permission_requested_dates[i_row] + '\')" title="' + rerequest_permission_title + '" />');
            } else if (qwizard_php_f) {
               var save_first_title = 'To use this ' + question_card + ' you need to save your new ' + quiz_flashcard_deck + '.  Please close this page and click &ldquo;Publish/update&rdquo;';
               htm.push (   '<img src="' + plugin_loc + 'images/warning_icon.png" + title="' + save_first_title + '" />');
            } else {
               var dataset_question_id = data.dataset_question_ids[i_row];
               var i_pos = dataset_question_id.indexOf ('|');
               var dataset = dataset_question_id.substr (0, i_pos);
               var b64_dataset = btoa (dataset).replace (/=/g, '');
               htm.push (   '<img src="' + plugin_loc + 'images/icon_question.png" class="pointer ' + b64_dataset + '" onclick="qwiz_request_permission (' + ii_row + ')" title="' + request_permission_title + '" />');
            }
            htm.push (      '<br />' + (ii_row + 1));
            htm.push (   '</td>');
            var question_card_type = question_card_types[i_row];
            htm.push (   '<td class="pad_top">');
            htm.push (      question_card_type_display[question_card_type]);
            htm.push (   '</td>');
            var unit  = units[i_row];
            var topic = topics[i_row];
            var unit_topic = '';
            if (unit || topic) {
               unit_topic = unit + ' / ' + topic;
            }
            htm.push (   '<td class="pad_top">');
            htm.push (      unit_topic);
            htm.push (   '</td>');
            var html = htmls[i_row];
            htm.push (   '<td>');
            htm.push (      '<div class="question_card">');
            htm.push (         html);
            htm.push (      '</div>');
            htm.push (   '</td>');
            var browse_image_url = browse_image_urls[i_row];
            var thumbnail_url    = thumbnail_urls[i_row];
            htm.push (   '<td>');
            if (browse_image_url) {
               htm.push ('<a href="#" class="qwiz_thumbnail" data-featherlight="' + browse_image_url + '">');
               htm.push (   '<img class="qwiz_thumbnail" src="' + thumbnail_url + '"></a>');
            }
            htm.push (   '</td>');
            htm.push ('</tr>');
            dataset_question_ids.push (data.dataset_question_ids[i_row]);
            question_card_page_urls.push (data.question_card_page_urls[i_row]);
            ii_row++;
         }
         htm = htm.join ('\n');
         $ ('#questions_cards_tbody').append (htm);
         if (reinit_scrollY) {
            window.scrollTo (0, reinit_scrollY);
            reinit_scrollY = 0;
         }
         $ ('a.qwiz_thumbnail').featherlight (null, {openTrigger: 'mouseenter', closeTrigger: 'mousemove', loading: 'Getting image...'});
         if (debug) {
            console.log ('[add_to_questions_cards_table] more_records_available_f:', more_records_available_f);
         }
         if (more_records_available_f) {
            skip_records += records_queried;
            setTimeout (qwiz_near_bottom_add_data, 500);
         }
      }
      function qwiz_near_bottom_add_data () {
         if (debug) {
            console.log ('[qwiz_near_bottom_add_data] skip_records:', skip_records);
         }
         window.addEventListener ('scroll', qwiz_detect_scroll_near_bottom);
      }
      function qwiz_detect_scroll_near_bottom () {
         var doc_height_trigger = parseInt ($ (document).height ()) - 200;;
         var scroll =   parseInt (window.innerHeight)
                      + parseInt (window.scrollY);
         if (debug) {
         }
         if (scroll > doc_height_trigger) {
            window.removeEventListener ('scroll', qwiz_detect_scroll_near_bottom);
            $ ('#getting_more').html ('Getting more ' + question_card + 's...').show ();
            qwiz_get_data (records_per_query, search_words_array, search_question_card_type);
         }
      }
      function qwiz_add_question_card (i_row) {
         var dataset_question_id = dataset_question_ids[i_row];
         if (debug) {
            console.log ('[qwiz_add_question_card] i_row:', i_row, ', dataset_question_ids.length:', dataset_question_ids.length);
         }
         var data = {dataset_question_id:  dataset_question_id,
                     page_url:             qwizard_page,
                     skip_records:         skip_records
                    };
         qqc.jjax ('', 0, 0, 'browse_dataset_questions_get', data);
      }
      function qwiz_request_permission (i_row, permission_requested_date) {
         var dataset_question_id    = dataset_question_ids[i_row];
         var question_card_page_url = question_card_page_urls[i_row];
         if (debug) {
            console.log ('[qwiz_request_permission] i_row:', i_row, ', dataset_question_ids.length:', dataset_question_ids.length);
            console.log ('[qwiz_request_permission] dataset_question_id:', dataset_question_id, ', question_card_page_url:', question_card_page_url);
         }
         var rerequest_msg = '';
         if (permission_requested_date) {
            rerequest_msg = 'You previously requested permission to use ' + question_card + 's from this dataset on ' + permission_requested_date + '<br /><br />';
         }
         $ ('#rerequest_msg').html (rerequest_msg);
         var i_pos = dataset_question_id.indexOf ('|');
         var dataset = dataset_question_id.substr (0, i_pos);
         var data = {dataset:                 dataset,
                     question_card_page_url:  question_card_page_url
                    };
         qqc.jjax ('', 0, 0, 'maker_email_from_dataset', data);
      }
      function open_dialog_request_permission (data) {
         if (debug) {
            console.log ('[open_dialog_request_permission] data:', data);
         }
         var maker_email_f = data.maker_email_f;
         requested_question_card_page_url = data.question_card_page_url;
         requested_dataset                = data.dataset;
         $ ('a.dialog_request_permission_page_url').html (requested_question_card_page_url);
         $ ('a.dialog_request_permission_page_url').attr ('href', requested_question_card_page_url);
         if (maker_email_f == 1) {
            var msg = [];
            msg.push ('Hello:');
            msg.push ('This is a request to use questions from Qwizcards dataset "' + requested_dataset + '"');
            msg.push ('I would like to use them on this site/page: ' + qwizard_page);
            msg.push ('(Permissions can be set on the Qwizcards "Manage datasets" page.)');
            msg.push ('');
            request_permission_email_msg_body = msg.join ('\n');
            $ ('div.request_permission_email_msg_body').html (request_permission_email_msg_body);
            qwiz_hide_request_permission_feedback ();
            $ ('#preface_message_to_send').show ();
            $ ('button.qwiz_send_permission_request').show ();
            $ ('button.cancel_permission_request').html ('Cancel');
            $dialog_request_permission.dialog ('open');
         } else {
            $dialog_dataset_question_page_link.dialog ('open');
         }
      }
      function qwiz_send_permission_request () {
         var errmsg = '';
         var msg_addition        = $ ('#request_permission_email_msg_body_addition').val ();
         var current_maker_email = $ ('#current_maker_email').val ();
         var cc_sender_f         = $ ('#cc_sender')[0].checked ? 1 : 0;
         if (trim (current_maker_email) == '') {
            errmsg = 'Please enter your email address';
         } else {
            if (! qwiz_validate_email (current_maker_email)) {
               errmsg = 'Email address is not valid';
            }
         }
         if (errmsg) {
            $ ('#dialog_request_permission_feedback').addClass ('red').html (errmsg).show ();
         } else {
            var request_permission_msg =   request_permission_email_msg_body
                                         + msg_addition
                                         + '\n\n'
                                         + 'Thanks.  I look forward to hearing from you'
                                         + '\n';
            var data = {dataset:                requested_dataset,
                        request_for_page_url:   qwizard_page,
                        current_maker_email:    current_maker_email,
                        cc_sender_f:            cc_sender_f,
                        request_permission_msg: request_permission_msg
                       };
            if (debug) {
               console.log ('[qwiz_send_permission_request] data:', data);
            }
            qqc.jjax ('', 0, 0, 'send_request_permission_email', data);
         }
      }
      function sent_permission_request (data) {
         if (debug) {
            console.log ('[sent_permission_request]: data:', data);
         }
         if (data.errmsg == 'ok') {
            var b64_dataset = btoa (requested_dataset).replace (/=/g, '');
            $ ('img.' + b64_dataset).attr ('src', 'images/icon_question_checked.png')
                                    .attr ('title', 'Permission requested')
                                    .attr ('disabled', true);
            $ ('button.qwiz_send_permission_request').hide ();
            $ ('button.cancel_permission_request').html ('Close');
            $ ('#preface_message_to_send').hide ();
            var msg = 'Email sent to dataset owner';
            $ ('#dialog_request_permission_feedback').addClass ('green').html (msg).show ();
         } else {
            var msg;
            if (data.errmsg == 'same_email') {
               msg = 'Sorry, cannot send to recipient email address same as sender&rsquo;s (that is, yours)';
            } else {
               msg = 'Sorry, could not send email to dataset owner';
            }
            $ ('#dialog_request_permission_feedback').addClass ('red').html (msg).show ();
         }
      }
      function qwiz_show_search_help () {
         $dialog_search_help.dialog ('open');
      }
      function qwiz_hide_request_permission_feedback () {
         $ ('#dialog_request_permission_feedback').hide ();
      }
      function return_question_card_html (data) {
         if (debug) {
            console.log ('[return_question_card_html] data:', data);
         }
         if (data.error) {
            alert ('Permission problem - question/card not available');
         } else {
            data.browse_search_words_array        = search_words_array;
            data.browse_search_question_card_type = search_question_card_type;
            data.browse_search_unit_topic         = search_unit_topic;
            data.browse_scrollY                   = window.scrollY;
            if (window.opener.qwizard) {
               window.opener.qwizard.new_dataset_question_card (data);
            }
            window.close ();
         }
      }
      function qwiz_findKey (obj, value) {
         for (var key in obj) {
            if (obj.hasOwnProperty (key)) {
               if (obj[key] == value) {
                  return key;
               }
            }
         }
         return '';
      }
      function qwiz_validate_email (email) {
         var ok_f = true;
         var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
         if (! re.test (email)) {
            ok_f = false;
         }
         return ok_f;
      }
      function trim (s) {
         if (s) {
            if ('a'.trim) {
               s = s.trim ();
            } else {
               s = s.replace (/^\s+|\s+$/g, '');
            }
         }
         return s;
      }
   </script>
   <style type="text/css">
      body {
         margin:              0;
         font-family:         arial, verdana, sans-serif;
         font-size:           10pt;
         background:          white;
      }
      h2 {
         margin-top:          5px;
         margin-bottom:       10px;
      }
      p {
         margin-top:          0;
      }
      div#qwiz_fixed_header {
         position:            fixed;
         top:                 0;
         width:               100%;
         height:              115px;
         padding:             5px;
         background:          white;
         border-bottom:       1px solid black;
      }
      select#qwiz_question_card_type_select {
         height:              30px;
      }
      div#qwiz_unit_topic_select {
         display:             inline-block;
      }
      div#qwiz_unit_topic_select input {
         width:               20em;
         height:              30px;
         background:          white;
         border:              1px solid darkgray;
         border-radius:       3px;
         font-size:           9pt;
      }
      div#qwiz_unit_topic_select a.ui-button {
         border:              none;
      }
      /* For combobox autocomplete */
      ul.ui-autocomplete {
         max-height:          400px;
         overflow:            auto;
      }
      li.ui-menu-item {
         padding:             0 !important;
      }
      input.qwiz_search_words {
         width:               16em;
         height:              30px;
         font-size:           9pt;
      }
      button.qwiz_cancel {
         float:               right;
         margin-right:        10px !important;
      }
      div#qwiz_questions_cards_table {
         margin-left:         5px;
         margin-top:          115px;
      }
      table.qwiz_questions_cards {
         border:              0;
         border-spacing:      0;
         background:          white;
         table-layout:        auto;
      }
      table.qwiz_questions_cards th {
         text-align:          left;
         vertical-align:      bottom;
         padding:             3px;
      }
      table.qwiz_questions_cards th.center {
         text-align:          center;
      }
      table.qwiz_questions_cards span.normal.smaller {
         font-size:           80%;
         font-weight:         normal;
      }
      table.qwiz_questions_cards td {
         text-align:          left;
         vertical-align:      top;
         margin:              0;
         padding:             3px 6px 3px 3px;
         border-top:          1px solid lightgray;
      }
      table.qwiz_questions_cards td.pad_top {
         padding-top:         8px;
      }
      table.qwiz_questions_cards td div.question_card {
         padding:             5px;
         max-height:          150px;
         overflow:            auto;
      }
      div.clear {
         clear:               both;
      }
      table.qwiz_card_front_back {
                           /* Hor. Ver. */
         border:              0;
         border-spacing:      15px 0;
         width:               100%;
      }
      table.qwiz_card_front_back th,
      table.qwiz_card_front_back td {
         width:               50%;
         min-width:           300px;
         padding:             2px;
         margin-right:        1em;
         text-align:          center;
         vertical-align:      middle;
         overflow:            auto;
         box-sizing:          border-box;
      }
      table.qwiz_card_front_back td {
         border:              1px solid black;
         height:              122px;
      }
      table.qwiz_card_front_back td div.qwiz_card_front_back,
      table.qwiz_card_front_back td div.qwiz_card_front_back {
         display:             inline-block;
         min-height:          50px;
         max-height:          120px;
         padding:             2px;
         overflow:            auto;
         min-width:           300px;
      }
      span.hangman {
         border:              1px solid gray;
         padding:             2px;
         font-family:         courier new;
         color:               blue;
         font-weight:         bold;
      }
      span.textentry {
         border:              1px solid gray;
      }
      ul.radio_bullet {
         margin-top:          0;
         list-style:          url('<?php print $plugin_url ?>images/radio.png');
      }
      ul.radio_bullet span.radio_li {
         vertical-align:      30%;
      }
      ul.inline_bullet {
         margin-top:          0;
      }
      ul.inline_bullet li {
         float:               left;
         padding:             0px;
         margin:              0 0 0.5rem 2rem;
         line-height:         1.2rem;
      }
      img.qwiz_thumbnail {
         border:              1px dotted gray;
      }
      img[src$="info_icon.png"],
      img[src$="warning_icon.png"] {
         width:           16px;
         height:          16px;
      }
      br.bigger {
         line-height:         150%;
      }
      div.message_to_send {
         font-size:           10pt;
         border:              1px solid black;
         padding:             3px;
         margin-left:         15px;
         margin-bottom:       5px;
      }
      div.request_permission_email_msg_body {
         white-space:         pre;
      }
      input#current_maker_email {
         width:               17em;
      }
      textarea#request_permission_email_msg_body_addition {
         width:               550px;
         height:               60px;
      }
      div#getting_more {
         position:            fixed;
         bottom:              20px;
         left:                50%;
         transform:           translateX(-50%);
         -webkit-transform:   translateX(-50%);
         width:               200px;
         height:              20px;
         display:             none;
         text-align:          center;
         background:          white;
         border:              1px solid black;
         border-radius:       5px;
         -webkit-border-radius: 5px;
         -moz-border-radius:  5px;
         box-shadow:          3px 3px 2px gray;
         padding:             15px 5px 5px 5px;
      }
      .qwiz_button {
         margin-bottom: 2px;
         border-top: 1px solid #96d1f8;
         background: #65a9d7;
         background: -webkit-gradient(linear, left top, left bottom, from(#3e779d), to(#65a9d7));
         background: -webkit-linear-gradient(top, #3e779d, #65a9d7);
         background: -moz-linear-gradient(top, #3e779d, #65a9d7);
         background: -ms-linear-gradient(top, #3e779d, #65a9d7);
         background: -o-linear-gradient(top, #3e779d, #65a9d7);
         padding: 3px 3px;
         -webkit-border-radius: 8px;
         -moz-border-radius: 8px;
         border-radius: 8px;
         -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;
         -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;
         box-shadow: rgba(0,0,0,1) 0 1px 0;
         text-shadow: rgba(0,0,0,.4) 0 1px 0;
         color: white;
         font-size: 14px !important;
         font-weight: bold;
         font-family: arial, verdana, sans-serif;
         text-decoration: none;
         vertical-align: middle;
      }
      .indent {
         margin-left:         15px;
      }
      .center {
         text-align:          center !important;
      }
      .green {
         color:               green;
         font-weight:         bold;
      }
      .red {
         color:               red;
         font-weight:         bold;
      }
      .gray {
         color:               gray;
      }
      .highlight {
         background:          #ffffa0;
      }
      .normal {
         font-size:           10pt;
         font-weight:         normal;
      }
      .smaller {
         font-size:           80%;
      }
      .textentry_border {
         border:              1px solid gray;
         padding:             2px;
      }
      img[src$="add_icon.png"] {
         width:           16px;
         height:          16px;
      }
      .shift_icon {
         transform:           translate(0px, 3px);
         -webkit-transform:   translate(0px, 3px);
      }
      .pointer {
         cursor:              pointer;
      }
      .help {
         cursor:              help;
      }
   </style>
</head>
<body>
   <div id="qwiz_fixed_header">
      <h2>
         Select <?php print $question_card ?> from database
      </h2>
      <?php print ucfirst ($question_card) ?> type
      <select id="qwiz_question_card_type_select" onchange="qwiz_question_card_type_search (this)">
      <?php
      if ($q_f == 'Q') {
         $types_display = $question_types_display;
      } else {
         $types_display = $card_types_display;
      }
      print "<option>\n";
      print "</option>\n";
      $search_question_card_type_display = $question_card_type_display[$search_question_card_type];
      foreach ($types_display as $type_display) {
         $selected = qwiz_selected ($type_display, $search_question_card_type_display);
         print "<option $selected>\n";
         print    "$type_display\n";
         print "</option>\n";
      }
      ?>
      </select>
      &emsp;
      <!-- Set by set_units_topics () -->
      <div id="qwiz_unit_topic_select">
         <select>
         </select>
      </div>
      &emsp;
      <input type="text" class="qwiz_search_words" onchange="qwiz_full_text_search (this)" placeholder="Search words" value="<?php print strtolower (esc_textarea ($search_words_string)) ?>" />
         <img id="search_info_icon" src="<?php print $plugin_loc ?>/images/info_icon.png" style="cursor: help;" onclick="qwiz_show_search_help ()" title="Click for pop-up search help" />
      &nbsp;
      <button>
         Go
      </button>
      <button class="qwiz_cancel qwiz_button" onclick="qwiz_cancel_browse ()">
         Cancel
      </button>
   </div>
   <div id="qwiz_questions_cards_table">
   </div>
   <div id="dialog_request_permission" title="Request permission to use <?php print $question_card ?> from dataset">
      <div id="rerequest_msg" class="normal">
      </div>
      <p id="preface_message_to_send" style="margin-bottom: 4px;">
         Message to send:
      </p>
      <div class="message_to_send">
         <p>
            <!-- maker_email from maker_classes_from_session_id.php, included
                 above. -->
            From: <input type="text" id="current_maker_email" onfocus="qwiz_hide_request_permission_feedback ()" value="<?php print $maker_email ?>" placeholder="Enter your email address" />
            &emsp;
            <span class="smaller">
               <input type="checkbox" id="cc_sender" checked />
               Send copy to this address
            </span>
         </p>
         <div class="request_permission_email_msg_body">
         </div>
         <p>
            <textarea id="request_permission_email_msg_body_addition" placeholder="Add your own message here"></textarea>
         </p>
         <p>
            Thanks!  I look forward to hearing from you.
         </p>
      </div>
      <div id="dialog_request_permission_feedback">
      </div>
      <div style="text-align: right; margin-bottom: 10px;">
         <button class="qwiz_send_permission_request" onclick="qwiz_send_permission_request ()">
            Send message
         </button>
         &ensp;
         <button class="cancel_permission_request" onclick="$dialog_request_permission.dialog ('close')">
            Cancel
         </button>
      </div>
      <p style="margin-bottom: 0;">
         <b>View dataset page in new window:</b>
      </p>
      <p class="indent">
         <a href="#" class="dialog_request_permission_page_url" target="_blank">
         </a>
      </p>
   </div>
   <div id="dialog_dataset_question_page_link" title="View dataset <?php print $question_card ?> page in new window">
      <p>
         Sorry, we don&rsquo;t have an email address for this <?php print $question_card ?>/dataset&rsquo;s
         owner.&nbsp;
         You may be able to view the dataset and find contact info here:
      </p>
      <p class="indent">
         <a href="#" class="dialog_request_permission_page_url" target="_blank">
         </a>
      </p>
   </div>
   <div id="dialog_search_help" title="Search help">
      <br />
      Space-separated words have implied &ldquo;AND&rdquo; between them.
      <br />
      <br />
      Word or words in double quotes: search for exact word or phrase.
      <br />
      <br />
      * is wildcard match (at end of words).
   </div>
   <div id="getting_more">
   </div>
</body>
</html>
