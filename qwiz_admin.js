qwiz_admin = {};
var qwiz_adminf = function () {
const $     = jQuery;
const q     = this;
const qname = 'qwiz_admin';
var   qqc;

var   qwiz_admin_debug = false;

var   maker_session_id;
var   spinner;
var   $spinner;
var   user_login_role_data;
var   user_login_role_i_row;

var   t_strings;

$ (document).ready (function () {

   qqc = qwiz_qcards_common;

   init_user_role_table ();

   const q_plugin_admin_f = document.location.href.indexOf ('rdgm') == -1;
   if (q_plugin_admin_f) {
      t_strings = [
         '"hints" for [hangman] should be a number',
         '(exit text) must be last',
         '[textentry] on back of card, but not on front',
         'A new question shortcode [q] has been placed inside an existing question.  Please move it outside and try again.',
         'a team',
         'about topic',
         'Add team member',
         'After your free trial:',
         'All',
         'and new cards, but cards you marked',
         'Answer given in more than one choice',
         'assign to classes',
         'Back to page view',
         'Bars',
         'Begin practice',
         'bin',
         'Both',
         'Cancel',
         'card was',
         'card',
         'cards total',
         'cards were',
         'Cards',
         'cards',
         'Check answer',
         'choice',
         'Choose different letters when you see this word again!',
         'Choose the type of cards you want to practice',
         'Choose the type of questions you want to practice',
         'Click on the target you want to delete',
         'Click to highlight student',
         'Click to see feedback for this answer choice',
         'Come back later to see more finish times',
         'confirmation',
         'Congratulations, you answered all questions correctly',
         'Congratulations, you\'re done!',
         'Continue',
         'Correct!',
         'correct',
         'Correct',
         'Correctly clicked',
         'Correctly labeled',
         'Could not read terms file',
         'Create teacher administrative account',
         'cutoff',
         'day',
         'days',
         'Did not enter answer text -- card back',
         'Did not find "[qwiz...]" or ["qdeck...]" shortcodes',
         'Did not find [qwiz]...[/qwiz] shortcodes',
         'Did not find [terms]...[/terms] shortcode pair in file',
         'Did not find answer ("[a]" -- card back)',
         'Did not find answer ("[a]") -- card back -- for',
         'Did not find any labeled diagram questions (labels [l] within [qwiz]...[/qwiz] shortcode pairs)',
         'Did not find any questions [q] within [qwiz]...[/qwiz] shortcode pairs',
         'Did not find any targets',
         'Did not find choices ("[c]")',
         'Did not find page content (looking for div',
         'Did not find question tags ("[q]")',
         'Did not find target "drop-zones" for labels.  Please check that all labels and target "drop zones" were correctly processed and saved during the edit of this page',
         'Did not get [c] or [c*] (hangman answer) with [hangman]',
         'Did not get answer/feedback [a] or [f] for [textentry] choice',
         'Did not get',
         'Do this question again',
         'Do you want to continue as this team?',
         'Do you want to continue?  (Click "Cancel" to sign out)',
         'does not match number of labels',
         'Don&rsquo;t show me this again for quizzes and flashcard decks on this page',
         'Done:',
         'Duplicate',
         'editing menu',
         'eight',
         'eighth',
         'eleventh',
         'Enable progress recording for quizzes and flashcard decks',
         'End of labeled-diagram question',
         'Enroll in a school/class',
         'Entry given in more than one [textentry] choice',
         'Error found',
         'Error: no text selected.',
         'Errors found',
         'Everyone',
         'Excellent!',
         'Exit full-screen view',
         'faster',
         'Fastest finish times',
         'Feedback [f] is required for a one-choice question',
         'Feedback',
         'Few or no results available for',
         'fifth',
         'Finish time (min:sec)',
         'Finish time:',
         'first',
         'five',
         'Flashcard deck not assigned in your class',
         'flashcard deck',
         'Flip (click disabled)',
         'Flip back',
         'For [textentry] card, wildcard choice ("*", for any other user entry) must be accompanied by answer/feedback "[a] or [f]"',
         'For [textentry] question, wildcard choice ("*", for any other user entry) cannot be marked correct "[c*]"',
         'For [textentry] question, wildcard choice ("*", for any other user entry) must be accompanied by feedback "[f]"',
         'for this card',
         'Forgot password?',
         'Found',
         'found, but not',
         'four',
         'fourth',
         'Free-form input choices [c] or [c*] card does not have [textentry]',
         'Full-screen view',
         'Go to &ldquo;Choose cards&rdquo;',
         'Go to &ldquo;Choose questions&rdquo;',
         'Go to first card',
         'Go to first question',
         'Go to most-recent card',
         'Go to most-recent question',
         'Go to next card',
         'Go to next question',
         'Go to previous card',
         'Go to previous question',
         'Good!',
         'Got it!',
         'Got more than one [fx]',
         'Got more than one answer ("[a]" -- card back)',
         'Got more than one answer ("[a]") -- card back',
         'Great!',
         'hint',
         'Hint',
         'Identify yourself - initials, other characters, or emojis! (optional)',
         'In finishing this %s-question quiz you entered %s incorrect answers',
         'In finishing this %s-question quiz you entered one incorrect answer',
         'In finishing this %s-question set you entered %s incorrect answers',
         'In finishing this %s-question set you entered one incorrect answer',
         'In this %s-flashcard stack, you clicked',
         'In this %s-question quiz you answered every question correctly on the first try!',
         'In this %s-question set you answered every question correctly on the first try!',
         'Incorrect administrative login. Please try again',
         'Incorrect letters',
         'incorrect',
         'Incorrect',
         'Independent students',
         'independent students',
         'It took you %s re-tries overall until you clicked',
         'It took you %s tries',
         'It took you one re-try overall until you clicked',
         'It took you one try',
         'items',
         'Label [l] is blank',
         'Learn mode: questions repeat until answered correctly.',
         'Learn',
         'left in your free trial of quizzes/flashcard decks',
         'left in your free trial of this quiz/flashcard deck',
         'letter',
         'letters',
         'log in or register',
         'Log in',
         'Login incorrect. Please try again',
         'Login name',
         'Login/View scores',
         'Max to practice in this session',
         'More than one answer or feedback shortcode [a] or [f] given with [textentry] choice',
         'More than one choice was marked correct',
         'More than one feedback shortcode [f] given with choice',
         'More than one feedback shortcode [f] given with hangman answer',
         'More than one feedback shortcode [f] or [fx] given with a choice',
         'more',
         'My account - settings',
         'My progress',
         'My scores',
         'Need help?  Try the "hint" button',
         'Need more practice',
         'Need to define acceptable entries for [textentry] card in addition to "other entry" choice ([c] *)',
         'New student - register',
         'New',
         'Next card',
         'Next question',
         'nine',
         'ninth',
         'No answer-word given',
         'No choice was marked correct',
         'No data read from terms file',
         'No hotspots set for hotspot_diagram',
         'No text given for [textentry] choice',
         'No text selected.  Please try again',
         'No thanks',
         'No word(s) given for [textentry] choice',
         'No, that\'s not correct.',
         'No.',
         'not complete',
         'not',
         'Not',
         'Note: the label for this target will no longer be associated with any target',
         'Note: this flashcard deck has not been assigned as work you need to do.',
         'Note: this quiz has not been assigned as work you need to do.',
         'Now click on:',
         'Number done',
         'Number of feedback items does not match number of choices',
         'Number of feedback items',
         'OK, I\'ve got it!',
         'OK.  Only %s is logged in now',
         'on all cards',
         'on the first try for every card',
         'one',
         'Only one independent student has taken this quiz.',
         'Only one person in your class has taken this quiz.',
         'or register for a free trial',
         'out of',
         'Password',
         'Pick different letters when you see this word again.',
         'Place dot at new random location',
         'Please close and re-open this menu and check/try again.',
         'Please delete the duplicate "dataset_id="..." attribute(s); new IDs will be created',
         'Please enter Login name',
         'Please enter Password',
         'Please enter User name',
         'Please fix and try again.',
         'Please select &ldquo;Visual&rdquo; mode to create a target/drop zone',
         'Please select at least one unit/topic',
         'Please try again',
         'Please',
         'Practice more flashcards',
         'Practice more questions',
         'Preview mode. You have no',
         'Preview mode. You have',
         'preview this',
         'Priority is cards you marked',
         'Priority is questions you answered incorrectly and new questions, but questions you answered correctly will sometimes be shown for review',
         'Put this card at the bottom of the stack, show the next card',
         'Qs',
         'Question appears to be information-only, but feeedback ([f]) was provided',
         'Question is completely blank',
         'question',
         'Questions in this quiz:',
         'Questions in this set:',
         'questions',
         'Questions',
         'Questions, comments, suggestions?',
         'Quiz not assigned in your class',
         'quiz',
         'Quizzes done by your class',
         'Quizzes done by your classes',
         'Quizzes done most recently by independent students',
         'Quizzes done most recently',
         'quizzes on this site.',
         'Qwizcards administrative login',
         'Qwizcards login session expired.  Please log in again',
         'Randomly shuffle the remaining cards',
         'Rank:',
         'Record score/credit?',
         'recorded',
         'Recording your response at',
         'register',
         'registration',
         'remaining',
         'remaining. Please log in or register to continue',
         'Remember',
         'Remove this card from the stack',
         'Report errors/bugs, comment, make suggestions...',
         'Response to card',
         'Response to question',
         'response',
         'responses',
         'Review this flashcard stack again',
         'reviewed',
         'Save preference (do not use on shared computer)',
         'Save quiz/deck as dataset',
         'save',
         'Save',
         'Score-recording authentication expired.  Please re-load this page',
         'second',
         'seconds',
         'Select the text or click on the image (you may have to click twice) where you want the decoy target "drop zone" (that will not accept a label)',
         'Select the text or click on the image (you may have to click twice) where you want the target "drop zone" for this label',
         'Select/deselect all topics in this unit',
         'Selection already is a target',
         'Selection must be text.  Please try again.',
         'Send request',
         'seven',
         'seventh',
         'Show me again later',
         'Show the other side',
         'Show/hide emoji picker',
         'Show/hide topics in this unit',
         'Showing results for everyone',
         'Shuffle',
         'Sign out',
         'six',
         'sixth',
         'Skip login in the future',
         'Skip',
         'Sorry, could not get questions',
         'Sorry, could not get',
         'Sorry, labeled diagrams do not work with images that have captions.  Please edit the image, delete the caption, and try again.',
         'Sorry, no preview available for this quiz/deck.',
         'Sorry, no.',
         'Sorry, that\'s not correct.',
         'Sorry, you entered more than six incorrect letters',
         'Sorry, you entered more than six incorrect letters.',
         'Spaced repetition',
         'Start cards',
         'Start questions',
         'Start quiz',
         'Start reviewing cards',
         'Student login',
         'Student',
         'Take this quiz again',
         'Teachers only: delete this entry',
         'Teachers only:',
         'Teachers: track your students&rsquo; progress on quizzes and flashcards',
         'ten',
         'tenth',
         'Test mode: incorrectly-answered questions do not repeat.',
         'Test',
         'Text before header',
         'Text before intro',
         'The topic of the only question you answered incorrectly is',
         'The topic of the questions you answered incorrectly is',
         'There are no cards available of the type you selected',
         'There are no questions available of the type you selected',
         'There should be two feedback items -- correct and incorrect -- for each label',
         'These are the topics of cards where you clicked',
         'These are the topics of questions that you answered incorrectly',
         'These initials have already been used by someone else',
         'third',
         'thirteenth',
         'This flashcard stack had %s cards.',
         'This is the only topic for which you clicked',
         'This label already has a target.\nDo you want to replace the existing target?',
         'This label does not have a target, while you clicked "Create another target for a label."  Do you want to create a target for this label?',
         'this quiz/deck.',
         'This',
         'three',
         'time limit',
         'times this quiz',
         'to go',
         'to identify these items',
         'to identify this item',
         'to place these labels correctly',
         'to place this label correctly',
         'to record/get credit',
         'To return to this full-screen view, tap',
         'Too many feedback shortcodes',
         'too many incorrect letters',
         'Try again',
         'Trying for',
         'twelfth',
         'two',
         'Type %s+ letters',
         'Type %s+ letters/numbers',
         'Type %s+ letters/numbers, then select',
         'Type a letter',
         'Type a letter/number',
         'Type letters in the box',
         'Type numbers in the box',
         'Unmatched [qdeck] - [/qdeck] pairs.',
         'Unmatched [qwiz] - [/qwiz] pairs.',
         'Use datasets or save quizzes and decks as datasets',
         'User name',
         'View scores',
         'View summary report',
         'View/edit login name, password, ...',
         'views',
         'Visited',
         'Want to use this flashcard deck in your own class?',
         'When done',
         'will sometimes be shown for review',
         'within',
         'You are logged in as team',
         'You are logged in as',
         'You can enter your initials',
         'You can get %s hint letters, but your answer will count as incorrect',
         'You can get hints, but your answer will count as incorrect',
         'You can get one hint letter, but your answer will count as incorrect',
         'You can get two hint letters',
         'You can get',
         'You can position and resize the target "drop zone" how you want in relation to the image.',
         'You can send a request message to your teacher asking them to include this quiz in your class.',
         'You entered',
         'You got %s letters correct',
         'You got one letter correct',
         'You have completed all questions correctly',
         'You have less than one day left in your free trial',
         'You have marked all cards',
         'You identified all of the items on the first try!',
         'You used %s hints',
         'You used one hint',
         'You wrote',
         'You&rsquo;re the first independent student to take this quiz!',
         'You&rsquo;re the first person in your class to take this quiz!',
         'You',
         'you',
         'your class',
         'Your class',
         'Your score is %s out of %s questions',
         'Your work will be recorded, but it may not count for your class.',
         'zero',
         'zeroth'
      ];  // t_strings
   } else {
      t_strings = [
         'Bars',
         'bin',
         'Click to highlight student',
         'Come back later to see more finish times',
         'Correct!',
         'Correctly clicked',
         'Correctly labeled',
         'cutoff',
         'Done:',
         'eight',
         'Error found',
         'Errors found',
         'Everyone',
         'Excellent!',
         'faster',
         'Few or no results available for',
         'Finish time (min:sec)',
         'Finish time:',
         'five',
         'Found',
         'four',
         'Good!',
         'Great!',
         'Identify yourself - initials, other characters, or emojis! (optional)',
         'independent students',
         'Independent students',
         'It took you %s tries',
         'It took you one try',
         'items',
         'nine',
         'No, that\'s not correct.',
         'Now click on:',
         'Number done',
         'one',
         'Only one independent student has taken this quiz.',
         'Only one person in your class has taken this quiz.',
         'out of',
         'Please try again',
         'Quizzes done by your class',
         'Quizzes done by your classes',
         'Quizzes done most recently by independent students',
         'Quizzes done most recently',
         'Rank:',
         'seven',
         'Show/hide emoji picker',
         'Showing results for everyone',
         'six',
         'Sorry, no.',
         'Sorry, that\'s not correct.',
         'Student',
         'ten',
         'These initials have already been used by someone else',
         'three',
         'times this quiz',
         'to identify these items',
         'to identify this item',
         'two',
         'Visited',
         'When done',
         'within',
         'You can enter your initials',
         'You identified all of the items on the first try!',
         'You&rsquo;re the first independent student to take this quiz!',
         'You&rsquo;re the first person in your class to take this quiz!',
         'You',
         'you',
         'Your class',
         'your class',
         'zero'
      ]; // t_strings
   }
   t_strings = t_strings.join ('\n');
   t_strings = htmlDecode (t_strings);

   t_strings = t_strings.replace (';', ',');
   t_strings = t_strings.split ('\n');

   $ ('form[action="options.php"]').attr ('onSubmit', 'return qwiz_admin.check_qwiz_admin_data_and_submit()');
   $ ('#t_strings_select').autocomplete ({
      source:        t_strings,
      classes:       {'ui-autocomplete': 'qwiz_tstrings_suggestions'},
      minLength:     3,
      select:        add_tstring_to_qwiz_translate_strings
   });
});


function init_user_role_table () {

   if (qwiz_admin_debug) {
      console.log ('[init_user_role_table] user_role_info:', user_role_info);
      console.log ('[init_user_role_table] wp_roles:', wp_roles);
   }

   const $tbody = $ ('table.qwizcards_user_role_login tbody');
   var trs = [];
   user_login_role_i_row = 0;
   for (const role in user_role_info) {
      trs.push (user_role_table_row_html (role, user_role_info[role], user_login_role_i_row));
      user_login_role_i_row++;
   }

   trs.push (add_new_user_login_row_html ());


   $tbody.append (trs.join ('\n'));
}


function add_new_user_login_row_html () {
   const add_icon_url = qwizzled_params.url + 'images/add_icon.png';
   const tr_html = `
      <tr class="add-new">
         <td class="add_delete">
            <img src="${add_icon_url}" onclick="qwiz_admin.edit_add_user_login_role ()" />
         </td>
         <td>
            (add new role -> class)
         </td>
      </tr>
   `;

   return tr_html;
}


function user_role_table_row_html (role, user_info, i_row) {
   const del_icon_url = qwizzled_params.url + 'images/delete.png';
   const tr_html = `
      <tr class="${role} i_row${i_row}" data-maker_id="${user_info[0]}" data-school_id="${user_info[6]}" data-class_id="${user_info[4]}">
         <td class="add_delete">
            <img src="${del_icon_url}" onclick="qwiz_admin.delete_user_login_role (${i_row})" title="Delete this role -> class assignment" />
         </td>
         <td class="role">
            ${role}
         </td>
         <td class="username">
            ${user_info[1]}
         </td>
         <td class="firstname">
            ${user_info[2]}
         </td>
         <td class="lastname">
            ${user_info[3]}
         </td>
         <td class="class_name">
            ${user_info[5]}
         </td>
         <td>
            <button type="button" style="padding: 2px; font-size: 85%;" onclick="qwiz_admin.edit_user_login_role ('${role}', ${i_row})">
               Edit
            </button>
         </td>
      </tr>
   `;
   return tr_html;
}


this.edit_user_login_role = function (role, i_row) {
   const class_id = $ ('table.qwizcards_user_role_login tr.i_row' + i_row).data ('class_id');

   user_login_role_data = {i_row:    i_row,
                           role:     role,
                           class_id: class_id};

   q.edit_add_user_login_role (i_row);
}


this.delete_user_login_role = function (i_row) {
   $ (`table.qwizcards_user_role_login tr.i_row${i_row}`).remove ();
}


this.edit_add_user_login_role = function (i_edit_row) {
   spinner  = `<img src="${qwizzled_params.url + 'images/spinner40x40.gif'}" style="width: 20px; height: 20px;" />`;
   if (typeof i_edit_row != 'undefined') {
      $spinner = $ (`table.qwizcards_user_role_login tr.i_row${i_edit_row} td:last-of-type`);
   } else {
      $spinner = $ (`table.qwizcards_user_role_login tr.add-new            td:first-of-type`);
   }
   $spinner.html (spinner);

   const cookie_session_id = $.cookie ('maker_session_id');
   if (user_login_role_data) {
      const cookie_username = cookie_session_id.split ('#')[0];
      const i_row           = user_login_role_data.i_row;
      const row_username    = $ ('table.qwizcards_user_role_login tr.i_row' + i_row + ' td.username').html ().trim ();
      if (row_username != cookie_username) {
         if ($spinner) {
            $spinner.html ('');
         }
         qwizzled.maker_logged_in_b = false;
         qwizzled.show_login (1);
         return false;
      }
   }

   const data = {cookie_session_id: cookie_session_id,
                 callback:          'edit_add_user_login_role2'};
   qqc.qjax (qname, 0, '', 'check_maker_session_id', data);
}


this.edit_add_user_login_role2 = function () {
   if (qwiz_admin_debug) {
      console.log ('[edit_add_user_login_role2]');
   }

   if (q.maker_logged_in_b) {
      if (qwiz_admin_debug) {
         console.log ('[edit_add_user_login_role2] q.maker_session_id:', q.maker_session_id);
      }
      const options = {path: '/', expires: 1};
      $.cookie ('maker_session_id', q.maker_session_id, options);
      q.edit_add_user_login_role3 (q.maker_session_id, q.username, q.firstname, q.lastname);
   } else {

      if ($spinner) {
         $spinner.html ('');
      }
      qwizzled.maker_logged_in_b = false;
      qwizzled.show_login (1);
   }
}


this.edit_add_user_login_role3 = function (maker_session_id, username, firstname, lastname) {
   if (qwiz_admin_debug) {
      console.log ('[edit_add_user_login_role3] maker_session_id:', maker_session_id);
   }
   if ($spinner) {
      $spinner.html (spinner);
   }

   if (maker_session_id) {
      const options = {path: '/', expires: 1};
      $.cookie ('maker_session_id', maker_session_id, options);
      q.maker_session_id = maker_session_id;
      q.username         = username;
      q.firstname        = firstname;
      q.lastname         = lastname;
   }

   const data = {maker_session_id:  q.maker_session_id,
                 callback:          'edit_add_user_login_role4'};
   qqc.qjax (qname, 0, '', 'get_classes_json', data);
}


this.edit_add_user_login_role4 = function (data) {
   if (qwiz_admin_debug) {
      console.log ('[edit_add_user_login_role4] data:', data);
      console.log ('[edit_add_user_login_role4] user_login_role_data:', user_login_role_data);
   }
   if (data.errmsg) {
      alert (data.errmsg);
      return false;
   }

   var tr_html;
   var i_row;
   if (user_login_role_data) {
      i_row                     = user_login_role_data.i_row;
      tr_html = edit_user_role_table_row_html (data, i_row);
      $ ('table.qwizcards_user_role_login tr.i_row' + i_row).replaceWith (tr_html);
      const role_select_el  = $ ('table.qwizcards_user_role_login tr.i_row' + i_row + ' td.role       select')[0];
      if (user_login_role_data.role) {

         role_select_el.value = user_login_role_data.role;

         const class_id = user_login_role_data.class_id;
         $ ('table.qwizcards_user_role_login tr.i_row' + i_row + ' td.class_name select').val (class_id);
      } else {
         role_select_el.selectedIndex = user_login_role_data.role_selectedIndex;
      }
      user_login_role_data = '';

   } else {
      i_row = user_login_role_i_row;
      tr_html = edit_user_role_table_row_html (data, i_row);
      user_login_role_i_row++;
      $ ('table.qwizcards_user_role_login tr.add-new').replaceWith (tr_html);

      tr_html = add_new_user_login_row_html ();
      $ ('table.qwizcards_user_role_login tbody').append (tr_html)
   }
   if (data.class_ids.length == 0) {
      const delay_tooltip = function () {
         const tooltip = 'No classes available.  Go to <a href="https://qwizcards.com/admin/enter_edit_takers.php" target="_blank">Edit students/classes</a> to create a class';
         $ ('table.qwizcards_user_role_login tr.i_row' + i_row + ' td.class_name')
            .tooltip ({content:  tooltip,
                       position: {my: 'left top',
                                  at: 'left bottom'},
                       hide:      2000
                      });
      }
      setTimeout (delay_tooltip, 100);
   }
}


function edit_user_role_table_row_html (d, i_row) {
   var role_opts = [];
   for (const available_role of wp_roles) {
      role_opts.push (`
               <option>${available_role}</option>
      `);
   }
   role_opts = role_opts.join ('');

   const n_classes = d.class_ids.length;
   var class_select;
   if (n_classes) {
      var class_opts = [];
      for (var i=0; i<n_classes; i++) {
         if (! d.deleted_fs[i]) {
            class_opts.push (`
                  <option value="${d.class_ids[i]}">
                     ${d.class_names[i]}
                  </option>
            `);
         }
      }
      class_opts = class_opts.join ('');
      class_select = `
               <select>
                  <option value="0">
                     Select...
                  </option>
                  ${class_opts}
               </select>
      `;
   } else {
      const warning_icon_url = qwizzled_params.url + 'images/warning_icon.png';
      class_select = `
               <img src="${warning_icon_url}" style="width: 20px; height: 20px;" title="No classes available.  Go to &ldquo;Edit students/classes&rdquo; to create a class" />
      `;
   }

   const del_icon_url = qwizzled_params.url + 'images/delete.png';
   const tr_html = `
      <tr class="new-in-progress i_row${i_row}">
         <td class="add_delete">
            <img src="${del_icon_url}" onclick="qwiz_admin.delete_user_login_role (${i_row})" title="Delete this role -> class assignment" />
         </td>
         <td class="role">
            <select>
               <option>
                  Select...
               </option>
               ${role_opts}
            </select>
         </td>
         <td class="username">
            <select onchange="qwiz_admin.change_administrator (this, ${i_row})">
               <option value="${q.maker_id}|${q.school_id}">
                  ${q.username}
               </option>
               <option value="change_admin">
                  [change]
               </option>
            </select>
         </td>
         <td class="firstname">
            ${q.firstname}
         </td>
         <td class="lastname">
            ${q.lastname}
         </td>
         <td class="class_name">
            ${class_select}
         </td>
      </tr>
   `;

   return tr_html;
}


this.change_administrator = function (select_el, i_row) {
   if (qwiz_admin_debug) {
      console.log ('[change_administrator] select_el:', select_el, ', i_row:', i_row);
   }
   if (select_el.value == 'change_admin') {

      select_el.selectedIndex = 0;

      const role_select_el = $ ('table.qwizcards_user_role_login tr.i_row' + i_row + ' td.role select')[0];
      const role_selectedIndex = role_select_el.selectedIndex;

      user_login_role_data = {i_row:               i_row,
                              role_selectedIndex:  role_selectedIndex,
                              class_selectedIndex: 0};
      $.removeCookie ('maker_session_id', {path: '/'});
      qwizzled.maker_logged_in_b = false;
      qwizzled.show_login (1);
   }
}


this.set_tstrings_to_show = function (checkbox_el) {
   if (checkbox_el.checked) {
      $ ('#t_strings_select').autocomplete ('option', 'minLength', 0)
                             .attr ('placeholder', 'Type letters')
                             .focus ();
   } else {
      $ ('#t_strings_select').autocomplete ('option', 'minLength', 3)
                             .attr ('placeholder', 'Type three or more letters');
   }
}


function htmlDecode (s) {
   var doc = new DOMParser ().parseFromString (s, 'text/html');
   return doc.documentElement.textContent;
}


this.add_all_translate_strings = function () {

   const $qwiz_translate_strings = $ ('textarea#qwiz_translate_strings');
   var current_textarea_strings = $qwiz_translate_strings.val ();
   if (current_textarea_strings) {
      current_textarea_strings = current_textarea_strings.split ('\n');
      var current_textarea_phrases_to_translate = [];
      const n_current_textarea_strings = current_textarea_strings.length;
      for (var i=0; i<n_current_textarea_strings; i++) {
         const current_textarea_string = current_textarea_strings[i];
         if (current_textarea_string) {
            const fields = current_textarea_string.split (';');
            const current_textarea_phrase_to_translate = fields[0];
            current_textarea_phrases_to_translate.push (current_textarea_phrase_to_translate);
         }
      }

      const n_current_textarea_phrases_to_translate = current_textarea_phrases_to_translate.length;
      var updated_strings = current_textarea_strings;
      const n_t_strings = t_strings.length;
      for (var i=0; i<n_t_strings; i++) {
         const t_string = t_strings[i];
         if (current_textarea_phrases_to_translate.indexOf (t_string) == -1) {
            updated_strings.push (t_string + ';');
         }
      }
      updated_strings = updated_strings.join ('\n');

   } else {

      var updated_strings = t_strings.join (';\n') + ';';
   }
   updated_strings = htmlDecode (updated_strings);
   $qwiz_translate_strings.val (updated_strings);

   return false;
}


this.check_qwiz_admin_data_and_submit = function () {
   if (qwiz_admin_debug) {
      console.log ('[check_qwiz_admin_data_and_submit]');
   }

   var errmsgs = '';
   const $qwiz_translate_strings = $ ('textarea#qwiz_translate_strings');
   var current_textarea_strings = $qwiz_translate_strings.val ();
   var updated_strings = [];
   if (current_textarea_strings) {
      var updated = false;
      current_textarea_strings = current_textarea_strings.split ('\n');
      const n_current_textarea_strings = current_textarea_strings.length;
      var warnings = [];
      for (var i=0; i<n_current_textarea_strings; i++) {
         if (current_textarea_strings[i].search (/\S/) == -1) {
            updated = true;
            continue
         }
         const fields = current_textarea_strings[i].split (';');
         const current_textarea_phrase_to_translate = fields[0];
         if (t_strings.indexOf (current_textarea_phrase_to_translate) == -1) {
            const r = dquo ();
            errmsgs += 'Phrase to translate, ' + r.ldquo + current_textarea_phrase_to_translate + r.rdquo + ' does not match an existing phrase\n';
         }
         const new_translated_phrase = fields[1];
         if (new_translated_phrase.search (/\S/) == -1) {
            const r = dquo ();
            warnings.push ('Warning: no translation entered (after semicolon) for ' + r.ldquo + current_textarea_phrase_to_translate + r.rdquo);
         }
         updated_strings.push (current_textarea_strings[i]);
      }
      if (warnings.length) {
         const n_warnings = warnings.length;
         warnings = warnings.slice (0, 5);
         if (n_warnings > 5) {
            warnings.push ('... (and ' + (n_warnings - 5) + ' more)');
         }
         warnings.push ('\nIgnoring phrases that do not have a translation');
         alert (warnings.join ('\n'));
      }
      if (updated) {
         $qwiz_translate_strings.val (updated_strings.join ('\n'));
      }
   }


   var new_user_role_info = {};
   var i_row = 0;
   $ ('table.qwizcards_user_role_login tbody tr').not ('tr.add-new') .each (function () {
      const $tr = $ (this);
      var   role;
      var   maker_id;
      var   username;
      var   class_id;
      var   class_name;
      var   school_id

      const $role_select = $tr.find ('td.role select');
      if ($role_select.length) {

         role = $role_select.val ();
         if (role == "Select...") {
            errmsgs += `Please select a User role for automatic student login table row ${i_row + 1}\n`;
         }
         var maker_id_school_id = $tr.find ('td.username select').val ();
         maker_id_school_id = maker_id_school_id.split ('|');
         if (maker_id_school_id.length > 1) {
            maker_id  = maker_id_school_id[0];
            school_id = maker_id_school_id[1];
         }
         username  = $tr.find ('td.username select option:selected').html ().trim ();

         var class_err_f = false;
         const $class_select = $tr.find ('td.class_name select');
         if ($class_select.length) {
            class_id = parseInt ($class_select.val ());
            if (class_id) {
               class_name = $class_select.find ('option:selected').html ().trim ();
            } else {
               class_err_f = true;
            }
         } else {
            class_err_f = true;
         }
         if (class_err_f) {
            errmsgs += `No class selected for User role "${role}" (automatic student login table row ${i_row + 1})\n`;
         }
      } else {

         role = $tr.find ('td.role').html ().trim ();
         maker_id   = $tr.data ('maker_id');
         username   = $tr.find ('td.username').html ().trim ();
         class_id   = $tr.data ('class_id');
         class_name = $tr.find ('td.class_name').html ().trim ();
         school_id = $tr.data ('school_id');
      }
      var firstname = $tr.find ('td.firstname').html ().trim ();
      var lastname  = $tr.find ('td.lastname').html ().trim ();

      if (new_user_role_info[role]) {
         errmsgs += `User role "${role}" can only be assigned once for automatic student login\n`;
      } else {
         new_user_role_info[role] = [maker_id, username, firstname, lastname, class_id, class_name, school_id];
      }
      i_row++;
   });
   if (qwiz_admin_debug) {
      console.log ('[check_qwiz_admin_data_and_submit] new_user_role_info:', new_user_role_info);
   }
   if (!errmsgs) {

      $ ('input#qwizcards_user_role_login_info').val (JSON.stringify (new_user_role_info));
   }


   if (errmsgs) {
      alert (errmsgs);
      return false;
   }
}


var ldquo = '';
var rdquo = '';
function dquo () {
   if (! ldquo) {
      const ldquo_el = document.createElement ('div');
      ldquo_el.innerHTML = '&ldquo;';
      ldquo = ldquo_el.innerHTML;

      const rdquo_el = document.createElement ('div');
      rdquo_el.innerHTML = '&rdquo;';
      rdquo = rdquo_el.innerHTML;
   }

   return {ldquo: ldquo, rdquo: rdquo};
}


function add_tstring_to_qwiz_translate_strings (event, ui) {
   if (qwiz_admin_debug) {
      console.log ('[add_tstring_to_qwiz_translate_strings] ui:', ui);
   }

   const delay_clear = function () {
      $ ('#t_strings_select').val ('');
   }
   setTimeout (delay_clear, 200);

   const $qwiz_translate_strings = $ ('textarea#qwiz_translate_strings');

   const phrase_to_translate = ui.item.value;

   var current_textarea_strings = $qwiz_translate_strings.val ();
   var updated_textarea_strings = [];
   var current_textarea_string = '';
   if (current_textarea_strings) {
      current_textarea_strings = current_textarea_strings.split ('\n');
      const n_current_textarea_strings = current_textarea_strings.length;
      for (var i=0; i<n_current_textarea_strings; i++) {
         const current_textarea_phrase_to_translate = current_textarea_strings[i].split (';')[0];
         if (current_textarea_phrase_to_translate != phrase_to_translate) {
            updated_textarea_strings.push (current_textarea_strings[i]);
         } else {
            current_textarea_string = current_textarea_strings[i];
         }
      }
   }
   if (current_textarea_string) {
      updated_textarea_strings.push (current_textarea_string);
   } else {
      updated_textarea_strings.push (phrase_to_translate + '; ');
   }

   $qwiz_translate_strings.val (updated_textarea_strings.join ('\n'));
   $qwiz_translate_strings.focus ();
}


};
qwiz_adminf.call (qwiz_admin);

