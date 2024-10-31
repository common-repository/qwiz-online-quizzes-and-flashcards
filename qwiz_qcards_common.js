var document_qwiz_declined_login_b    = 'not ready';
var document_qwiz_user_logged_in_b    = 'not ready';
var document_qwiz_wp_user_session_id;
var document_qwiz_maker_privileges    = false;
var qjax_bypass                       = 'not ready';
var qwiz_wp_site_url;
var document_qwiz_remember_f          = false;
var document_active_qwiz_qdeck        = '';
var document_qwiz_username            = '';
var document_qwiz_independent_taker_f = '';
var document_qwiz_email               = '';
var default_document_qwiz_email_confirm = 1;  // Don't require confirmation.
var document_qwiz_email_confirm       = default_document_qwiz_email_confirm;
var $dialog_current_password          = '';
var $dialog_assign_to_classes         = '';
var document_qwiz_class_id            = '';
var document_qwiz_school_id           = 0;
var document_qwiz_session_id;
var document_qwiz_login_timeout;
var document_qwiz_team_b              = false;
var document_qwiz_mobile_enabled      = 'Always';
var document_qwiz_mobile              = '';
var document_qwiz_bubblebar_enabled_b = true;
var document_qwiz_force_mobile_f      = false;
var document_qwiz_qdeck_maker_ids     = {};   // Set in check_registered.php.
var document_qwiz_pay_registration_date_unix = 0;
var document_qwiz_not_logged_in_alerted = false;
var document_qwiz_preview_i_qwiz;
var document_qwiz_preview_i_deck;
var document_qwiz_good_through_date;
var document_qwiz_good_through_date_ok;
var document_qwiz_subscription_id;
var document_qwiz_login_alt_free_trial;
var document_qwiz_immediate_payment;
qwiz_qcards_common = {};
var qwiz_qcards_common_f = function () {
var qqc = this;
var qqcname = 'qwiz_qcards_common';
var $ = jQuery;
var init_enter_intercept_f;
var jjax_script_no = 0;
var head = 'not ready';
var server_loc   = 'not ready';
var secure_server_loc;
var qwiz_ajaxurl = 'not ready';
var plugin_url = '';
var icon_expand_src = 'not ready';
var icon_collapse_src;
var maker_specific_n_qs_by_unit_topic;
var use_dataset_options_html = {};
var use_dataset_options_display_name = {};
var progress_bars_leaderboard = {};
var refresh_leaderboard_timeout = {};
var dataset_questions_countdown_timeout = {};
var pay_qwiz_qdeck_;
var pay_i_qwiz_deck;
var payment_received_f = false;
var register_taker_global_reg_code_ok_f = false;
var register_taker_display_pay_screen   = false;
var register_taker_global_username;
var register_taker_global_first_name;
var register_taker_global_last_name;
var register_taker_global_sha3_password;
var register_taker_global_username_unique_f;
var register_taker_global_email_unique_f;
var register_taker_global_reg_code_maker_id    = '';
var register_taker_global_reg_code_school_id   = '';
var register_taker_global_reg_code_class_id    = '';
var register_taker_global_reg_code_class_name  = '';
var register_taker_global_reg_code_school_name = '';
var register_taker_global_in_process_b = false;
var provide_feedback_html = {};
var debug = [];
debug[0]  = false;    // General.
debug[5]  = false;    // find_matching_block ().
debug[7]  = false;    // Enter -> click.
debug[9]  = false;    // [hangman].
debug[10] = false;    // parse_html_block ().
debug[11] = false;    // use_dataset.
debug[12] = false;    // Progress bars/leaderboard.
$ (document).ready (function () {
   qqc.qdebug (debug);
   if ($.cookie) {
      document_qwiz_declined_login_b = $.cookie ('qwiz_declined_login');
   }
   head = document.getElementsByTagName ('head')[0];
   if (debug[0]) {
      console.log ('[qwiz_qcards_common ready] head:', head);
   }
   var $start_course_button = $ ('a.unit.unit_button');
   var button_label = $start_course_button.html ();
   if (button_label && button_label.toLowerCase () == 'start course') {
      var delay_init = function () {
         if ($ ('div.qwiz_wrapper_fallback').is (':visible')) {
            qwiz_.qwiz_init ();
         }
         if ($ ('div.qdeck_wrapper_fallback').is (':visible')) {
            qcard_.qdeck_init ();
         }
      }
      $start_course_button.click (function () {
         setTimeout (delay_init, 3000);
      });
   }
});
this.jjax = function (qname, i_qwiz, qrecord_id, dest, data) {
   qqc.qjax (qname, i_qwiz, qrecord_id, dest, data);
   return false;
   if (head == 'not ready') {
      head = document.getElementsByTagName ('head')[0];
   }
   jjax_script_no++;
   jjax_script_no = jjax_script_no % 5;
   var script_id = 'jjax' + jjax_script_no;
   var script = document.getElementById (script_id);
   if (script) {
      try {
         if (head) {
            head.removeChild (script);
         } else {
            document.body.removeChild (script);
         }
      } catch (e) {
         console.log ('[jjax] script_id:', script_id, ', script:', script);
      }
   }
   var script = document.createElement ('script');
   script.id = script_id;
   script.setAttribute ('charset', 'utf-8');
   var send_data = '?';
   if (data) {
      for (var property in data) {
         send_data += property + '=' + encodeURIComponent (data[property]) + '&'
      }
   }
   send_data += 'qname=' + qname + '&i_qwiz=' + i_qwiz + '&qrecord_id=' + encodeURIComponent (qrecord_id);
   var msec = new Date ().getTime();
   send_data += '&msec=' + msec;
   if (typeof (document_qwiz_session_id) != 'undefined') {
      send_data += '&qwiz_session_id=' + encodeURIComponent (document_qwiz_session_id);
   }
   if (server_loc == 'not ready') {
      server_loc        = qqc.get_qwiz_param ('server_loc', 'http://qwizcards.com/admin');
      secure_server_loc = qqc.get_qwiz_param ('secure_server_loc', 'https://host359.hostmonster.com/~whereisq/qwiz/admin');
   }
   var local_server_loc;
   if (dest == 'login') {
      local_server_loc = secure_server_loc;
   } else {
      local_server_loc = server_loc;
   }
   local_server_loc = local_server_loc.replace (/^https*:/, '');
   script.src = local_server_loc + '/' + dest + '.php' + send_data;
   if (debug[0]) {
      console.log ('[jjax] data:', data);
      console.log ('[jjax] script.src:', script.src);
   }
   if (head) {
      head.appendChild (script);
   } else {
      document.body.appendChild (script);
   }
}
this.qjax = function (qname, i_qwiz, qrecord_id, dest, qwizdata) {
   if (! qwizdata) {
      qwizdata = {};
   }
   qwizdata.qname      = qname;
   qwizdata.i_qwiz     = i_qwiz;
   qwizdata.qrecord_id = qrecord_id;
   qwizdata.dest       = dest;
   qwizdata.js_f       = 1;
   if (typeof (document_qwiz_session_id) != 'undefined') {
      qwizdata.qwiz_session_id = document_qwiz_session_id;
   }
   if (debug[0]) {
      console.log ('[qjax] qwizdata:', qwizdata);
   }
   if (qjax_bypass == 'not ready') {
      qjax_bypass = qqc.get_qwiz_param ('qjax_bypass', '');
   }
   qwiz_wp_site_url = qqc.get_qwiz_param ('wp_site_url', '');
   if (qjax_bypass) {
      var url = qwiz_wp_site_url + '/admin/' + dest;
      if (debug[0]) {
         console.log ('[qjax] url:', url);
      }
      $.ajax ({type:    'POST',
               url:     url,
               data:    qwizdata,
               error:   function (XMLHttpRequest, statusText, errorThrown) {
                           console.log ('[qjax] XMLHttpRequest:', XMLHttpRequest, ', statusText:', statusText, ', errorThrown:', errorThrown);
                           console.log ('[qjax] url:', url);
                           var msg;
                           var readyState = XMLHttpRequest.readyState;
                           if (url.indexOf ('record') != -1) {
                              if (qname == 'qwiz_') {
                                 $ ('span.response_recorded-qwiz' + i_qwiz).hide ();
                              } else {
                                 $ ('span.response_recorded-qdeck' + i_qwiz).hide ();
                              }
                              if (readyState == 0) {
                                 if (qwizdata.secure_f) {
                                    msg = 'Sorry, unable to record your response.  Please try again.  Perhaps check your Internet connection?';
                                 } else {
                                    msg = 'Sorry, unable to record your response.  Perhaps check your Internet connection?';
                                 }
                              } else {
                                 if (qwizdata.secure_f) {
                                    msg = 'Sorry, unable to record your response.  Please try again.  If the problem reoccurs, contact support@qwizcards.com';
                                 } else {
                                    msg = 'Sorry, unable to record your response.  If the problem reoccurs, please contact support@qwizcards.com';
                                 }
                              }
                           } else {
                              if (readyState == 0) {
                                 msg = 'Sorry, unable to process request.  Perhaps check your Internet connection?';
                              } else {
                                 msg = 'Sorry, unable to process request.  If the problem persists, please contact support@qwizcards.com';
                              }
                           }
                           alert (msg);
                        },
               success: qjax_callback});
   } else {
      if (qwiz_ajaxurl == 'not ready') {
         qwiz_ajaxurl = qqc.get_qwiz_param ('ajaxurl', '');
      }
      var data = {};
      data.action   = 'qjax';
      data.qwizdata = qwizdata;
      $.ajax ({type:    'POST',
               url:     qwiz_ajaxurl,
               data:    data,
               success: qjax_callback});
   }
}
function qjax_callback (js) {
   if (debug[0]) {
      console.log ('[qjax_callback] js:', js);
   }
   if (js) {
      js = js.replace (/var /g, '');
      eval (js);
   }
}
this.check_session_id = function (i_qwiz) {
   var cookie_session_id = $.cookie ('qwiz_session_id');
   if (debug[0]) {
      console.log ('[check_session_id] cookie_session_id:', cookie_session_id);
   }
   if (! cookie_session_id) {
      document_qwiz_user_logged_in_b = false;
   } else {
      document_qwiz_session_id = cookie_session_id;
      var data = {cookie_session_id: cookie_session_id};
      qqc.qjax ('', i_qwiz, '', 'check_session_id', data);
   }
}
function check_maker_session_id () {
   var cookie_session_id = $.cookie ('maker_session_id');
   if (debug[0]) {
      console.log ('[check_maker_session_id] cookie_session_id:', cookie_session_id);
   }
   if (! cookie_session_id) {
      qqc.maker_session_id_ok_or_no ();
   } else {
      var data = {cookie_session_id: cookie_session_id,
                  callback:          'maker_session_id_ok_or_no'
                 };
      qqc.qjax ('qwiz_qcards_common', 0, '', 'check_maker_session_id', data);
   }
}
this.maker_session_id_ok_or_no = function () {
   if (! qqc.maker_logged_in_b) {
      var delay_set = function () {
         var $teacher_subscriptions = $ ('a.teacher_subscriptions');
         $teacher_subscriptions.each (function () {
            var $this = $ (this);
            var query_string = $this.data ('query_string');
            if (debug[0]) {
               console.log ('[maker_session_id_ok_or_no]: query_string:', query_string);
            }
            const secure_server_loc = qqc.get_qwiz_param ('secure_server_loc', 'https://qwizcards.com/admin');
            const href = secure_server_loc + '/maker_login_register' + query_string;
            $this.attr ('href', href);
         });
      }
      setTimeout (delay_set, 250);
   }
}
this.set_user_menus_and_icons = function (sign_out_f, bounce_all) {
   var htm = '';
   var icon_color = 'black';
   if (document_qwiz_user_logged_in_b === true) {
      var logged_in_msg = document_qwiz_maker_privileges ? 'Teacher logged in as student' : 'Logged in as';
      htm +=    '<div style="text-align: right;">'
             +     qqc.T (logged_in_msg) + ' <strong>' + document_qwiz_username + '</strong>'
             +  '</div>';
      if (document_qwiz_maker_privileges && !(qwiz_.preview_i_qwiz_plus1 || qcard_.preview_ideck_plus1)) {
         const preview_href = `javascript: qwiz_qcards_common.do_preview (i_qwiz, 'qname')`;
         htm +=    '<div class="teacher_preview_qname">'
                +     '<table class="teacher_preview">'
                +        '<tr>'
                +           '<td>'
                +              '<b>' + qqc.T ('Teachers only:') + '&ensp;</b>'
                +           '</td>'
                +           '<td style="padding-bottom: 5px;">'
                +              '<a href="' + preview_href + '" title="View this quiz/deck in expanded, all-question display">'
                +                 qqc.T ('preview this') + ' quiz_flashcard_deck'
                +              '</a>'
                +           '</td>'
                +        '</tr>'
                +        '<tr>'
                +           '<td>'
                +           '</td>'
                +           '<td>'
                +              '<a href="javascript: qwiz_qcards_common.assign_to_classes (\'qname\', i_qwiz)" title="Assign this quiz_flashcard_deck to your classes">'
                +                 qqc.T ('assign to classes')
                +              '</a>'
                +           '</td>'
                +        '</tr>'
                +     '</table>'
                +  '</div>';
      }
      if (document_qwiz_independent_taker_f) {
         htm +=    '<div>'
                +     '<a href="javascript: qname.hide_menu_and_display_login (i_qwiz, false, \'enroll\')" title="You are currently registered as an independent student.  If you have a registration code you can join a class">'
                +         qqc.T ('Enroll in a school/class')
                +     '</a>'
                +  '</div>';
      } else {
         if (! document_qwiz_wp_user_session_id) {
            htm += '<div>'
                 +    '<a href="javascript: qname.hide_menu_and_display_login (i_qwiz, true)">'
                 +        qqc.T ('Add team member')
                 +    '</a>'
                 + '</div>';
         }
      }
      if (server_loc == 'not ready') {
         server_loc = qqc.get_qwiz_param ('server_loc', 'http://qwizcards.com/admin');
      }
      htm +=    '<div>'
             +     '<a href="' + server_loc + '/index?student_view=1&time=' + document_qwiz_session_id + '" target="_blank">'
             +      qqc.T ('My scores')
             +     '</a>'
             +  '</div>';
      htm +=    '<div>'
             +     '<nobr>'
             +     '<a href="javascript: qname.hide_menu_and_display_login (i_qwiz, false, \'progress_bars\')">'
             +         qqc.T ('My progress')
             +     '</a>' + '&emsp;';
      htm +=       'leaderboard';
      htm +=       '</nobr>'
             +  '</div>';
      if (! document_qwiz_wp_user_session_id) {
         htm += '<div>'
              +    '<a href="' + server_loc + '/my_account?time=' + document_qwiz_session_id + '" target="_blank" title="' + qqc.T ('View/edit login name, password, ...') + '">'
              +        qqc.T ('My account - settings')
              +    '</a>'
              + '</div>';
      }
      htm +=    '<div>'
             +     '<a href="javascript: qname.hide_menu_and_display_login (i_qwiz, false, \'feedback\')" title="' + qqc.T ('Report errors/bugs, comment, make suggestions...') + '">'
             +         qqc.T ('Feedback')
             +     '</a>'
             +  '</div>';
      /*
      htm +=    '<div class="qwiz_usermenu_pay_link">'
             +     '<a href="javascript: ' + qqcname + '.usermenu_pay (\'qname\', i_qwiz)">'
             +        'Pay us already!'
             +     '</a>'
             +  '</div>';
      */
      if (! document_qwiz_wp_user_session_id) {
         htm += '<div>'
              +     qqc.T ('Not') + ' ' + document_qwiz_username + '? '
              +    '<a href="javascript: ' + qqcname + '.sign_out ()">'
              +        qqc.T ('Sign out')
              +    '</a>'
              + '</div>';
      }
      if (document_qwiz_maker_privileges) {
         icon_color = '#00b8ff'
      } else {
         icon_color = '#20a020';
      }
      $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   } else if (! document_qwiz_wp_user_session_id) {
      htm +=    '<br />'
             +  '<div>'
             +     '<nobr>'
             +     '<a href="javascript: qname.hide_menu_and_display_login (i_qwiz)">'
             +        '<strong>' + qqc.T ('Log in') + '</strong> ' + qqc.T ('to record/get credit')
             +     '</a>'
             +     '</nobr>'
             +  '</div>';
      htm +=    '<div>'
             +     ' <span class="qwiz-remember" title="' + qqc.T ('Skip login in the future') + '">'
             +        '<label class="qwiz_label">'
             +           '<span class="qwiz-remember">'
             +              '<input type="checkbox" /> ' + qqc.T ('Remember')
             +           '</span>'
             +        '</label>'
             +     '</span> &nbsp;'
             +     '<a href="javascript: qname.icon_no_login (i_qwiz)">'
             +        '<strong>' + qqc.T ('No thanks') + '</strong>'
             +     '</a>'
             +  '</div>';
      /*
      htm +=    '<div class="qwiz_usermenu_pay_link">'
             +     '<a href="javascript: ' + qqcname + '.usermenu_pay (\'qname\', i_qwiz)">'
             +        'Pay us already!'
             +     '</a>'
             +  '</div>';
      */
      htm +=    'leaderboard';
      if (document_qwiz_declined_login_b == 'not ready') {
         document_qwiz_declined_login_b = $.cookie ('qwiz_declined_login');
      }
      if (! sign_out_f && ! document_qwiz_declined_login_b) {
         $ ('div.qwiz-usermenu_icon_no_intro').addClass ('qwiz-icon-bounce');
         $ ('div.qwiz-usermenu_icon').addClass ('qwiz-icon-bounce');
      }
   } else {
      htm += '<b>Authentication expired.&nbsp;Please re-load this page to record your work</b>';
   }
   const leaderboard_htm =  '<span qwiz_leaderboard_link>'
                          +    '<a href="javascript: qwiz_.hide_menu_and_display_login (i_qwiz, false, \'leaderboard\')">'
                          +       qqc.T ('Fastest finish times')
                          +    '</a>'
                          + '</span>';
   var qwiz_htm = htm.replace (/qname/g, 'qwiz_').replace (/quiz_flashcard_deck/g, 'quiz');
   $ ('div.qwiz-usermenu').each (function () {
                                    const id = $ (this).attr ('id');
                                    const i_qwiz = id.substr (13);
                                    var lhtm = '';
                                    if (qwiz_.get_qwizdata (i_qwiz, 'qwiz_timer')) {
                                       lhtm = leaderboard_htm;
                                    }
                                    $ (this).html (qwiz_htm.replace ('leaderboard', lhtm).replace (/i_qwiz/g, i_qwiz));
                                 });
   var qdeck_htm = htm.replace (/qname/g, 'qcard_').replace (/quiz_flashcard_deck/g, 'deck').replace ('leaderboard', '');
   $ ('div.qdeck-usermenu').each (function () {
                                    const id = $ (this).attr ('id');
                                    const i_deck = id.substr (14);
                                    $ (this).html (qdeck_htm.replace (/i_qwiz/g, i_deck));
                                 });
   $ ('div.qwiz-usermenu_icon').css ({display: 'block', color: icon_color});
   $qscores = $ ('span.qscores');
   if ($qscores.length) {
      qqc.set_qscore_menus ($qscores);
   }
}
var do_preview_form = false;
this.do_preview = function (i_qwiz_deck, qname) {
   if (! do_preview_form) {
      var htm = [];
      htm.push ('<form name="do_preview" target="_blank">');
      htm.push ('</form>');
      $ ('body').append (htm.join ('\n'));
      do_preview_form = true;
   }
   const qwiz_deck = qname == 'qwiz_' ? 'qwiz' : 'deck';
   $.cookie (qwiz_deck + '_preview', i_qwiz_deck, {path: '/'});
   $.cookie ('qwiz_preview_username', document_qwiz_username, {path: '/'});
   const f = document.forms.do_preview;
   const href = document.location.href;
   f.action = href;
   f.submit ();
}
this.assign_to_classes = function (qname, i_qwiz_deck) {
   var qrecord_id;
   if (qname == 'qwiz_') {
      qrecord_id = $ ('div#qwiz' + i_qwiz_deck).attr ('qrecord_id');
   } else {
      qrecord_id = $ ('div.qcard_card-qdeck' + i_qwiz_deck + ' div.qcard-front').attr ('qrecord_id');
   }
   const data = {modal: 1};
   qqc.qjax (qname, i_qwiz_deck, qrecord_id, 'assign_to_classes', data);
}
var assign_to_classes_data;
this.dialog_assign_to_classes = function (data) {
   if (debug[0]) {
      console.log ('[dialog_assign_to_classes] data:', data);
   }
   if (data.errmsg) {
      alert (data.errmsg);
      return;
   }
   assign_to_classes_data = data;
   if (! $dialog_assign_to_classes) {
      var htm = [];
      htm.push ('<div id="dialog_assign_to_classes" title="Assign quiz/flashcard deck to classes">');
      htm.push (   '<div id="assign_to_classes_feedback_msg">');
      htm.push (      '&nbsp;');
      htm.push (   '</div>');
      htm.push (   '<h3 class="assign_to_classes qwiz_display_none">');
      htm.push (      'Assign <span id="assign_to_classes_quiz_flashcard_deck"></span> to classes');
      htm.push (   '</h3>');
      htm.push (   '<div id="assign_to_classes_select">');
      htm.push (   '</div>');
      htm.push (   '<br />');
      htm.push (   '<h3 class="assign_to_classes qwiz_display_none">');
      htm.push (      'Set <span id="assign_to_classes_assignment_due"></span> date');
      htm.push (   '</h3>');
      htm.push (   '<input id="assign_to_classes_assignment_date" class="qwiz_display_none" type="date" onchange="qwiz_qcards_common.update_assignment_date (this)" />');
      htm.push ('</div>');
      $ ('body').append (htm.join ('\n'));
      $dialog_assign_to_classes = $ ('div#dialog_assign_to_classes').dialog ({
         autoOpen:      false,
         width:         600,
         height:        600,
         modal:         true,
         resizable:     false,
         buttons:       {'Close':   function () {
                                       $dialog_assign_to_classes.dialog ('close');
                                    }
                        }
      });
   }
   const qdata = {class_id:    'all',
                 maker_id:    data.maker_id,
                 callback:    'qwiz_qcards_common.assign_to_classes_set_quizzes_decks'};
   qqc.qjax (data.qname, 0, data.qrecord_id, 'get_quizzes_decks', qdata);
}
this.assign_to_classes_set_quizzes_decks = function (data) {
   if (debug[0]) {
      console.log ('[assign_to_classes_set_quizzes_decks] data:', data);
   }
   const quiz_flashcard_deck = assign_to_classes_data.qname == 'qwiz_' ? 'quiz' : 'flashcard deck';
   var htm = [];
   if (data.class_ids_assigned_to_qwiz.length == 0) {
      const display_name = assign_to_classes_data.qrecord_id.replace (/sciencemusicvideosMeister1961-/, '');
      htm.push ('<b>Sorry, this ' + quiz_flashcard_deck + ', &ldquo;' + display_name + '&rdquo;, has not been made available to you for use in your classes.');
      htm.push ('<br />');
      htm.push ('<br />');
      htm.push ('You will have to contact the ' + quiz_flashcard_deck + ' owner/creator and ask them to provide it to you.</b>');
      $ ('div#assign_to_classes_select').html (htm.join ('\n'));
   } else {
      htm.push ('<select id="class_select" multiple="multiple">');
      const class_ids                  = assign_to_classes_data.class_ids;
      const class_names                = assign_to_classes_data.class_names;
      const class_deleted_fs           = assign_to_classes_data.deleted_fs;
      const n_classes = class_ids.length;
      var any_selected = false;
      for (var i=0; i<n_classes; i++) {
         if (! class_deleted_fs[i]) {
            var selected = '';
            if (data.class_ids_assigned_to_qwiz[0].indexOf (class_ids[i]) != -1) {
               selected = ' selected';
               any_selected = true;
            }
            htm.push ('<option value="' + class_ids[i] + '"' + selected + '>');
            htm.push (   class_names[i]);
            htm.push ('</option>');
         }
      }
      htm.push ('</select>');
      if (any_selected) {
         htm.push ('<br />');
         htm.push ('<span style="font-size: 8pt; color: gray;">');
         htm.push (   'Click in the box for options dropdown');
         htm.push ('</span>');
      }
      $ ('div#assign_to_classes_select').html (htm.join ('\n'));
      $ ('h3.assign_to_classes').removeClass ('qwiz_display_none');
      $ ('span#assign_to_classes_quiz_flashcard_deck').html (quiz_flashcard_deck + ' &ldquo;' + data.display_names[0] + '&rdquo;');
      var $select = $ ('select#class_select');
      $select.select2 ({placeholder: 'Select...',
                        width:       '250px'
                       });
      $select.on ('select2:unselect',  deassign_class_from_quiz);
      $select.on ('select2:select', add_class_to_qwiz_qdeck);
      const assignment_due = data.assignment_due ? 'due' : 'assignment';
      $ ('span#assign_to_classes_assignment_due').html (assignment_due);
      $ ('input#assign_to_classes_assignment_date').removeClass ('qwiz_display_none');
      if (typeof data.assignment_dates[0] != 'undefined') {
         const assignment_date_yyyy_mm_dd = DateFormat.format.date (data.assignment_dates[0]*1000, 'yyyy-MM-dd');
         $ ('input#assign_to_classes_assignment_date').val (assignment_date_yyyy_mm_dd);
      }
   }
   $dialog_assign_to_classes.dialog ('open');
}
function deassign_class_from_quiz (e) {
   if (debug) {
      console.log ('[deassign_class_from_quiz] e.params.data:', e.params.data);
      console.log ('[deassign_class_from_quiz] e.params.data.element.value:', e.params.data.element.value);
   }
   var class_id   = e.params.data.element.value;
   var class_name = e.params.data.element.text;
   const data = {class_id:    class_id,
                 class_name:  class_name,
                 i_row:       0,
                 callback:    'qwiz_qcards_common.assign_to_classes_updated'
                };
   qqc.qjax ('', 0, assign_to_classes_data.qrecord_id, 'delete_class_from_qwiz_qdeck', data);
}
function add_class_to_qwiz_qdeck (e) {
   if (debug) {
      console.log ('[add_class_to_qwiz_qdeck] e.params.data:', e.params.data);
      console.log ('[add_class_to_qwiz_qdeck] e.params.data.element.value:', e.params.data.element.value);
   }
   var class_id   = e.params.data.element.value;
   var class_name = e.params.data.element.text;
   const data = {class_id:    class_id,
                 class_name:  class_name,
                 i_row:       0,
                 callback:    'qwiz_qcards_common.assign_to_classes_updated'
              };
   qqc.qjax ('', 0, assign_to_classes_data.qrecord_id, 'add_class_to_qwiz_qdeck', data);
}
this.update_assignment_date = function (input_el) {
   var value = input_el.value;
   if (! value) {
      $ ('div#assign_to_classes_feedback_msg').html ('<span class="qwiz_errmsg">Please enter a valid date</span>');
      return;
   }
   value = Date.parse (value + 'T00:00') / 1000;
   const data = {qrecord_ids:    [assign_to_classes_data.qrecord_id],
                 field:          'assignment_date',
                 value:          value,
                 callback:       'qwiz_qcards_common.assign_to_classes_updated'
                }
   qqc.qjax ('', 0, assign_to_classes_data.qrecord_id, 'update_quiz_deck', data);
}
this.assign_to_classes_updated = function (data) {
   var hhmmss = DateFormat.format.date (new Date ().getTime (), 'h:mm:ss');
   var feedback;
   if (data.affected_rows >= 1) {
      feedback = 'Database updated ' + hhmmss;
   } else {
      feedback = '<span class="qwiz_red">'
               +    'Sorry, unable to update database'
               + '</span>';
   }
   $ ('div#assign_to_classes_feedback_msg').html (feedback);
}
this.request_assign_to_class = function (q_f) {
   var qname;
   var i_qwiz_deck;
   var qrecord_id;
   var maker_id;
   if (q_f) {
      qname       = 'qwiz_';
      i_qwiz_deck = qwiz_.assign_to_class_i_qwiz;
      qrecord_id  = qwiz_.assign_to_class_qrecord_id;
   } else {
      qname       = 'qcard_';
      i_qwiz_deck = qcard_.assign_to_class_i_deck;
      qrecord_id  = qcard_.assign_to_class_qrecord_id;
      maker_id    = document_qwiz_qdeck_maker_ids['qdeck' + i_qwiz_deck];
   }
   const school_id   = document_qwiz_school_id;
   const taker_id    = document_qwiz_taker_id;
   const page_url = window.location.href;
   const data = {taker_username: document_qwiz_username,
                 school_id:      school_id,
                 taker_id:       taker_id,
                 page_url:       page_url};
   if (! plugin_url) {
      plugin_url = qqc.get_qwiz_param ('url', './');
   }
   const spinner = '<img src="' + plugin_url + 'images/spinner16x16.gif" />';
   $ ('div#' + qname + 'request_assign_to_class_feedback').html (spinner);
   qqc.qjax (qname, i_qwiz_deck, qrecord_id, 'request_assign_to_class', data);
}
this.do_not_show_assign_to_class = function (checkbox_el) {
   const cookie_name = document_qwiz_username + 'do_not_show_assign_to_class';
   if (checkbox_el.checked) {
      const options = {expires: 7};
      $.cookie (cookie_name, 1, options);
   } else {
      $.removeCookie (cookie_name);
   }
}
function set_pay_unlock_menu (qname, i_qwiz_deck, pay_errmsg,
                              pay_preview_status_htm, pay_prefix_htm,
                              taker_options, all_taker_options_free_b,
                              maker_options, maker_fees_b) {
   var htm = '';
   var quiz_flashcard_deck;
   var qwiz_qdeck;
   var qwiz_qcard_;
   if (qname == 'qwiz_') {
      quiz_flashcard_deck = 'quiz';
      qwiz_qdeck          = 'qwiz';
      qwiz_qcard_         = 'qwiz_';
   } else {
      quiz_flashcard_deck = 'flashcard deck';
      qwiz_qdeck          = 'qdeck';
      qwiz_qcard_         = 'qcard_';
   }
   htm +=    '<div class="pay_preview_status">'
          +     pay_preview_status_htm
          +  '</div>';
   var check_maker_session_id_b = false;
   if (document_qwiz_user_logged_in_b === true) {
      if (get_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok') != 'paid') {
         if (taker_options.length) {
            htm += pay_prefix_htm + taker_options.join ('');
            var pay_now_sign_up = all_taker_options_free_b ? 'Sign up' : 'Pay now';
            htm += '<a href="javascript: ' + qname + '.hide_menu_and_display_login (' + i_qwiz_deck + ', false, \'pay\', \'\', 0, \'' + pay_now_sign_up + '\')" class="qwiz_pay_unlock_menu_pay_now">'
                 +    pay_now_sign_up
                 + '</a>';
         } else {
            if (document_qwiz_school_id == 1) {
               htm += 'Please contact the maker of this ' + quiz_flashcard_deck
                    + ': they need to provide an individual-student payment '
                    + 'option for you';
            } else {
               htm += 'Please talk to your teacher: they need to provide access '
                    + 'to this ' + quiz_flashcard_deck + ' for you';
            }
         }
      }
   } else {
      if (! pay_errmsg) {
         var local_url = encodeURIComponent (qqc.get_qwiz_param ('url', './'));
         var query_string = '?url=' + local_url + '&qname=' + qwiz_qcard_ + '&i_qwiz=' + i_qwiz_deck;
         var secure_server_loc = qqc.get_qwiz_param ('secure_server_loc', 'https://qwizcards.com/admin');
         var msg = 'Please register so you can get credited for your payment';
         htm += '<div>'
             +     '<b>Students in a teacher&rsquo;s class</b>: '
             +     'Use your teacher&rsquo;s registration code to '
             +     '<a href="javascript: qwiz_qcards_common.pay_unlock_menu_display_login (\'' + qname + '\', ' + i_qwiz_deck + ', \'register\', \'' + btoa (msg) + '\')" class="qwiz_login">'
             +        qqc.T ('register')
             +     '</a>. '
         if (taker_options.length) {
            htm += '<br />' + pay_prefix_htm + taker_options.join ('');
            if (! all_taker_options_free_b) {
               const bmsg = btoa (msg);
               htm += `<a href="javascript: qwiz_qcards_common.pay_unlock_menu_display_login ('${qname}', ${i_qwiz_deck}, 'register', '${bmsg}')" class="qwiz_login qwiz_pay_unlock_menu_pay_now">
                         Pay now
                       </a>`;
            }
         }
         htm += '</div>';
         if (maker_options.length) {
            htm += '<div>'
                +  '<b>Teachers</b>: ' + maker_options.join ('<br />');
            if (maker_fees_b) {
               if (! qqc.maker_logged_in_b) {
                  check_maker_session_id_b = true;
               }
               const href = 'javascript: ' + qname + '.hide_menu_and_display_login (' + i_qwiz_deck + ', false, \'maker_pay\')';
               htm += '<br />'
                    + '<a href="' + href + '" class="teacher_subscriptions qwiz_login" data-query_string="' + query_string + '" target="_blank">'
                    +    'Teacher subscriptions'
                    + '</a>';
            }
         }
         htm += '</div>';
      }
   }
   $ ('div#pay_unlock_menu-' + qwiz_qdeck + i_qwiz_deck).html (htm);
   return check_maker_session_id_b;
}
this.pay_unlock_menu_display_login = function (qname, i_qwiz_deck, login_alt, msg)  {
   var qwiz_qdeck;
   var qwiz_qcard_;
   if (qname == 'qwiz_') {
      qwiz_qdeck          = 'qwiz'
      qwiz_qcard_         = qwiz_;
   } else {
      qwiz_qdeck          = 'qdeck'
      qwiz_qcard_         = qcard_;
   }
   var $container = $ ('div.qwiz_icon_and_menu_container.' + qwiz_qdeck + i_qwiz_deck);
   $container.css ({'z-index': '-1'});
   if (login_alt == 'free_trial') {
      document_qwiz_login_alt_free_trial = true;
   }
   qwiz_qcard_.display_login (i_qwiz_deck, false, login_alt, atob (msg), 1);
   var delay_reset = function () {
      $container.css ({'z-index': ''});
   }
   setTimeout (delay_reset, 100);
}
this.sign_out = function (force_bounce, bounce_all) {
   var data = {session_id: document_qwiz_session_id, table: 'session_id'};
   qqc.qjax ('', -1, '', 'delete_session_id', data);
   $.removeCookie ('qwiz_session_id', {path: '/'});
   document_qwiz_user_logged_in_b = false;
   document_qwiz_maker_privileges = false;
   document_qwiz_session_id       = '';
   document_qwiz_email            = '';
   document_qwiz_email_confirm    = default_document_qwiz_email_confirm;
   qqc.set_user_menus_and_icons (! force_bounce, bounce_all);
   if (qwiz_ && qwiz_.any_pay_quiz_f) {
      qwiz_.pay_lock_settings ();
   }
   if (qcard_ && qcard_.any_pay_deck_f) {
      qcard_.pay_lock_settings ();
   }
   document_qwiz_pay_registration_date_unix = 0;
}
this.usermenu_pay = function (qname, i_qwiz_deck) {
   if (qname == 'qwiz_') {
      $ ('div.qwiz-progress-container.qwiz' + i_qwiz_deck).find ('a.qwiz_pay_unlock_menu_pay_now')[0].click ();
   } else {
      $ ('div#qcard_progress-qdeck' + i_qwiz_deck).find ('a.qwiz_pay_unlock_menu_pay_now')[0].click ();
   }
}
this.set_qscore_menus = function ($qscores) {
   if (server_loc == 'not ready') {
      server_loc        = qqc.get_qwiz_param ('server_loc', 'http://qwizcards.com/admin');
      secure_server_loc = qqc.get_qwiz_param ('secure_server_loc', 'https://host359.hostmonster.com/~whereisq/qwiz/admin');
   }
   var htm;
   if (document_qwiz_user_logged_in_b === true) {
      htm = '<a href="' + secure_server_loc + '/index.php?student_view=1&time=' + document_qwiz_session_id + '" target="_blank">'
      htm += qqc.T ('View scores');
   } else {
      htm = '<a href="' + secure_server_loc + '/student_login.php" target="_blank">'
      htm += qqc.T ('Login/View scores');
   }
   htm += '</a>';
   $qscores.html (htm);
}
this.create_progress_bars = function (qname, qdata, i_qwiz, local_progress_bars_leaderboard) {
   progress_bars_leaderboard[qname + i_qwiz] = local_progress_bars_leaderboard;
   if (! plugin_url) {
      plugin_url = qqc.get_qwiz_param ('url', './');
   }
   var spinner_url = plugin_url + 'images/spinner40x40.gif';
   var htm = '<img src="' + spinner_url + '" class="qwiz-center" style="margin-top: 100px;" />';
   if (qname) {
      var login_div = qqc.$get_login_div (qname, i_qwiz);
      login_div.html (htm).show ();
   }
   if (document_qwiz_user_logged_in_b !== true) {
      var data = {not_logged_in_f:  1,
                  qname:            qname,
                  i_qwiz_qdeck:     i_qwiz,
                  qrecord_id:       qdata[i_qwiz].qrecord_id};
      qqc.create_progress_bars3 (data);
      return false;
   }
   if (qdata[i_qwiz].record_start_b && document_qwiz_user_logged_in_b === true) {
      qdata[i_qwiz].record_start_b = false;
      var now_sec = new Date ().getTime ()/1000.0;
      var data = {qrecord_id_ok: qdata[i_qwiz].qrecord_id_ok,
                  type:          'start',
                  now_sec:       now_sec,
                  callback:      'create_progress_bars2'};
      var record_dest = qname == 'qwiz_' ? 'record_response_v3' : 'record_qcard_v2';
      qqc.qjax (qname, i_qwiz, qdata[i_qwiz].qrecord_id, record_dest, data);
   } else {
      qqc.create_progress_bars2 (qname, i_qwiz, qdata[i_qwiz].qrecord_id);
   }
}
this.create_progress_bars2 = function (qname, i_qwiz, qrecord_id) {
   if (document_qwiz_independent_taker_f) {
      document_qwiz_class_id = 'independent_student';
   }
   const dataset = get_qwizdeckdata (qname, i_qwiz, 'use_dataset');
   if (dataset) {
      get_dataset_units_topics (qname, i_qwiz, qrecord_id, dataset, 'create_progress_bars3');
   } else {
      var n_correct_got_it;
      var n_questions_cards;
      if (qname == 'qwiz_') {
         n_questions_cards = qwiz_.get_qwizdata (i_qwiz, 'n_questions');
         n_correct_got_it  = qwiz_.get_qwizdata (i_qwiz, 'n_correct');
      } else {
         n_questions_cards = qcard_.get_deckdata (i_qwiz, 'n_cards');
         var n_to_go       = qcard_.get_deckdata (i_qwiz, 'n_to_go');
         n_correct_got_it  = n_questions_cards - n_to_go;
      }
      var data = {qname:                     qname,
                  i_qwiz_qdeck:              i_qwiz,
                  qrecord_id:                qrecord_id,
                  units:                     [''],
                  n_correct_by_unit_topic:   [n_correct_got_it],
                  n_questions_by_unit_topic: [n_questions_cards]
                 };
      qqc.create_progress_bars3 (data);
   }
}
var leaderboard_refresh_sec = 0;
this.create_progress_bars3 = function (data) {
   if (debug[12]) {
      console.log ('[create_progress_bars3] data:', data);
   }
   var logged_in_b = document_qwiz_user_logged_in_b;
   var qname       = data.qname;
   var i_qwiz      = data.i_qwiz_qdeck;
   var qrecord_id  = data.qrecord_id;
   var n_units;
   if (logged_in_b) {
      var progress_units         = data.units;
      var unit_best_n_corrects   = data.n_correct_by_unit_topic;
      var unit_n_questions       = data.n_questions_by_unit_topic;
      n_units = progress_units.length;
      var course_best_n_corrects = 0;
      var course_n_questions     = 0;
      for (var i=0; i<n_units; i++) {
         course_best_n_corrects += unit_best_n_corrects[i];
         course_n_questions     += unit_n_questions[i];
      }
   }
   var htm = [];
   const qwiz_timer = qwiz_.get_qwizdata (i_qwiz, 'qwiz_timer');
   htm.push ('<div id="progress_bars_leaderboard_tabs_' + qname + i_qwiz + '" class="progress_bars_leaderboard_tabs">');
   htm.push ('<ul>');
   if (logged_in_b) {
      htm.push ('<li>');
      htm.push (   '<a href="#progress_bars_tab_' + qname + i_qwiz + '">');
      htm.push (      'Progress');
      htm.push (   '</a>');
      htm.push ('</li>');
   }
   if (qwiz_timer) {
      htm.push ('<li>');
      htm.push (   '<a href="#leaderboard_tab_' + qname + i_qwiz + '">');
      htm.push (      'Fastest finish times');
      htm.push (   '</a>');
      htm.push ('</li>');
   }
   htm.push ('</ul>');
   if (logged_in_b) {
      htm.push ('<div id="progress_bars_tab_' + qname + i_qwiz + '" class="qwiz_progress_bars_tab">');
      var select_id;
      htm.push ('<table class="unit_progress_bars">');
      var show_units_progress_bar_f = false;
      for (var i=0; i<n_units; i++) {
         if (! progress_units[i]) {
            progress_units[i] = 'Other';
         }
         if (! (progress_units[i] == 'Other' || progress_units[i] == '(excluded)')) {
            show_units_progress_bar_f = true;
         }
      }
      var unit_n_qs = {}
      if (show_units_progress_bar_f) {
         for (var i=0; i<n_units; i++) {
            var unit = progress_units[i];
            if (unit != '(excluded)') {
               var label = unit_best_n_corrects[i] + '/' + unit_n_questions[i];
               htm.push ('<tr>');
               htm.push (   '<td>');
               htm.push (      progress_units[i]);
               htm.push (   '</td>');
               htm.push (   '<td>');
               var div_id    = 'unit_progress_bar-' + qname + i_qwiz + '-unit' + i;
               htm.push (      '<div id="' + div_id + '" class="unit_progress_bars"><div class="progress-label"></div></div>');
               htm.push (   '</td>');
               htm.push ('</tr>');
            }
         }
      }
      if (n_units) {
         htm.push ('<tr>');
         htm.push (   '<td colspan="2">');
         htm.push (      '<hr style="margin: 2px 0 0;" />');
         htm.push (   '</td>');
         htm.push ('</tr>');
      }
      htm.push (   '<tr>');
      htm.push (      '<td>');
      const dataset = get_qwizdeckdata (qname, i_qwiz, 'use_dataset');
      const this_session = dataset ? '' : ', this session';
      if (qname == 'qwiz_') {
         htm.push (      '<b>Quiz' + this_session + '</b>');
      } else if (qname == 'qcard_') {
         htm.push (      '<b>Deck' + this_session + '</b>');
      } else if (document_qwiz_independent_taker_f) {
         htm.push (      '<b>All quizzes/decks tried</b>');
      } else {
         htm.push (      '<b>Course</b>');
      }
      htm.push (      '</td>');
      htm.push (      '<td>');
      var div_id = 'course_progress_bar-' + qname + i_qwiz;
      htm.push (         '<div id="' + div_id + '" class="unit_progress_bars"><div class="progress-label"></div></div>');
      htm.push (      '</td>');
      htm.push (   '</tr>');
      htm.push ('</table>');
      htm.push ('All work: <a href="' + server_loc + '/index?student_view=1&time=' + document_qwiz_session_id + '" style="color: blue;" target="_blank">');
      htm.push (qqc.T ('My scores') + '</a>');
      htm.push ('<button class="qwiz_button exit_progress_bars" style="float: right;" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true, event)">');
      htm.push (   'Continue');
      htm.push ('</button>');
      htm.push ('</div>');
   }
   if (qwiz_timer) {
      htm.push ('<div id="leaderboard_tab_' + qname + i_qwiz + '" class="leaderboard">');
      htm.push (   '<div id="leaderboard-quiz_times_histogram-qwiz' + i_qwiz + '">');
      htm.push (   '</div>');
      htm.push (   '<div class="refresh_leaderboard">');
      htm.push (      'Refresh every');
      htm.push (      '<select onchange="' + qqcname + '.refresh_leaderboard_change (this, \'' + qname + '\', ' + i_qwiz + ', \'' + qrecord_id + '\')">');
      var options = ['', '5', '10', '15', '30', '60'];
      var n_options = options.length;
      for (var i=0; i<n_options; i++) {
         var selected = leaderboard_refresh_sec == options[i] ? ' selected' : '';
         htm.push (      '<option value="' + options[i] + '"' + selected + '>');
         htm.push (        options[i]);
         htm.push (     '</option>');
      }
      htm.push (      '</select>');
      htm.push (      ' seconds');
      htm.push (   '</div>');
      htm.push (   '<button class="qwiz_button exit_progress_bars" style="float: right;" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true, event)">');
      htm.push (      'Continue');
      htm.push (   '</button>');
      htm.push ('</div>');
   }
   htm.push ('</div>');
   var selector;
   if (! qname) {
      selector = '#progress_bars' + i_qwiz;
   } else if (qname == 'qwiz_') {
      selector = '#qwiz_login-qwiz' + i_qwiz;
   } else {
      selector = 'div.qcard_card-qdeck' + i_qwiz + ' div.qcard-front div.qcard_content_size';
   }
   var $progress_div = $ (selector);
   $progress_div.html (htm.join ('\n')).show ();
   var i_tab = 0;
   if (progress_bars_leaderboard[qname + i_qwiz] == 'leaderboard') {
      i_tab = 1;
      qqc.qjax (qname, i_qwiz, qrecord_id, 'get_quiz_times', {summary: 0});
   }
   $ ('#progress_bars_leaderboard_tabs_' + qname + i_qwiz).tabs ({
               active:   i_tab,
               activate: function (event, ui) {
                            if (ui.newPanel.hasClass ('leaderboard')) {
                               if (debug[12]) {
                                  console.log ('[create_progress_bars3 > leaderboard activate] qrecord_id:', qrecord_id);
                               }
                               qqc.qjax (qname, i_qwiz, qrecord_id, 'get_quiz_times', {summary: 0});
                            }
                         }
   });
   if (logged_in_b) {
      if (n_units > 1) {
         for (var i=0; i<n_units; i++) {
            var unit = progress_units[i];
            if (unit != '(excluded)') {
               var percent_complete = parseInt (100*unit_best_n_corrects[i]/unit_n_questions[i], 10);
               var $unit_progress_bar = $ ('#unit_progress_bar-' + qname + i_qwiz + '-unit' + i);
               $unit_progress_bar.progressbar ({
                  value:   percent_complete
               });
               var label = unit_best_n_corrects[i] + '/' + unit_n_questions[i];
               $unit_progress_bar.find ('div.progress-label').text (label);
            }
         }
      }
      var $course_progress_bar = $ ('#course_progress_bar-' + qname + i_qwiz);
      var percent_complete = parseInt (100*course_best_n_corrects/course_n_questions, 10);
      $course_progress_bar.progressbar ({
         value:   percent_complete
      });
      var label = course_best_n_corrects + '/' + course_n_questions;
      $course_progress_bar.find ('div.progress-label').text (label);
   }
}
this.refresh_leaderboard_change = function (select_el, qname, i_qwiz, qrecord_id) {
   if (typeof (refresh_leaderboard_timeout[i_qwiz]) != 'undefined') {
      clearTimeout (refresh_leaderboard_timeout[i_qwiz]);
   }
   leaderboard_refresh_sec = select_el.value;
   if (leaderboard_refresh_sec) {
      var refresh_leaderboard_later = function () {
         qqc.qjax (qname, i_qwiz, qrecord_id, 'get_quiz_times', {summary: 0});
         refresh_leaderboard_timeout[i_qwiz] = setTimeout (refresh_leaderboard_later, leaderboard_refresh_sec*1000);
      }
      refresh_leaderboard_timeout[i_qwiz] = setTimeout (refresh_leaderboard_later, leaderboard_refresh_sec*1000);
   }
}
this.update_leaderboard_opt_out = function (qname, i_qwiz, checkbox_el) {
   var opt_out_f = checkbox_el.checked ? 1 : 0;
   qqc.qjax (qname, i_qwiz, '', 'update_leaderboard_opt_out', {opt_out_f: opt_out_f});
}
this.create_use_dataset_options = function (qname, qdata, i_qwiz) {
   if (qname == 'qwiz_') {
      $ ('#progress-qwiz' + i_qwiz).html ('');
   } else {
      $ ('#progress-qdeck' + i_qwiz).html ('');
   }
   if (! plugin_url) {
      plugin_url = qqc.get_qwiz_param ('url', './');
   }
   const spinner_url = plugin_url + 'images/spinner40x40.gif';
   const htm = '<img src="' + spinner_url + '" class="qwiz-center" style="margin-top: 100px;" />';
   const $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz);
   $use_dataset_options_div.html (htm).show ();
   use_dataset_options_html[qname + i_qwiz]         = qdata[i_qwiz].use_dataset_options_html;
   use_dataset_options_display_name[qname + i_qwiz] = qdata[i_qwiz].use_dataset_options_display_name;
   qrecord_id = qdata[i_qwiz].qrecord_id;
   var dataset = qdata[i_qwiz].use_dataset;
   if (qdata[i_qwiz].record_start_b && document_qwiz_user_logged_in_b === true) {
      qdata[i_qwiz].record_start_b = false;
      var now_sec = new Date ().getTime ()/1000.0;
      var data = {qrecord_id_ok: qdata[i_qwiz].qrecord_id_ok,
                  type:          'start',
                  now_sec:       now_sec,
                  dataset:       dataset,
                  callback:      'create_use_dataset_options2'};
      var record_dest = qname == 'qwiz_' ? 'record_response_v3' : 'record_qcard_v2';
      qqc.qjax (qname, i_qwiz, qrecord_id, record_dest, data);
   } else {
      qqc.create_use_dataset_options2 (qname, i_qwiz, dataset, qrecord_id);
   }
}
this.create_use_dataset_options2 = function (qname, i_qwiz, dataset, qrecord_id) {
   if (debug[11]) {
      console.log ('[create_use_dataset_options2] dataset:', dataset, ', qrecord_id:', qrecord_id);
   }
   if (use_dataset_options_html[qname + i_qwiz]) {
      if (document_qwiz_user_logged_in_b !== true) {
         qqc.create_use_dataset_options3 ('', qname, i_qwiz);
         return false;
      }
   }
   get_dataset_units_topics (qname, i_qwiz, qrecord_id, dataset);
}
this.create_use_dataset_options3 = function (data, qname, i_qwiz) {
   if (debug[11]) {
      console.log ('[create_use_dataset_options3] data:', data);
   }
   if (qname) {
      var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz);
      $use_dataset_options_div.html (use_dataset_options_html[qname + i_qwiz]).show ();
      return false;
   }
   var qname           = data.qname;
   var i_qwiz          = data.i_qwiz_qdeck;
   var qrecord_id      = data.qrecord_id;
   var dataset         = data.dataset;
   var units           = data.units;
   var topics          = data.topics;
   var n_qss           = data.n_questions_by_unit_topic;
   var n_cgs           = data.n_correct_by_unit_topic;
   var n_units_topics  = units.length;
   var dataset_reset_questions_date   = data.dataset_reset_questions_date;
   var maker_specific_random          = data.maker_specific_random;
   var maker_specific_questions_cards = data.maker_specific_questions_cards_to_show;
   var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz);
   if (data.errmsg) {
      $use_dataset_options_div.html ('<br /><b>' + data.errmsg + '</b>').show ();
      return false;
   }
   if (n_units_topics == 0) {
      var msg;
      if (qname == 'qwiz_') {
         msg = qqc.T ('You have completed all questions correctly');
      } else {
         msg = qqc.T ('You have marked all cards') + ' &ldquo;' + qqc.T ('Got it!') + '&rdquo;';
      }
      $use_dataset_options_div.html ('<br /><b>' + msg + '</b>').show ();
      return false;
   }
   var order_array = [];
   for (var i=0; i<n_units_topics; i++) {
      order_array.push ([i, qqc.create_sortable_unit_number (units[i]), qqc.create_sortable_unit_number (topics[i])]);
   }
   order_array.sort (firstBy (1).thenBy (2));
   var unit_topic_order = [];
   for (var i=0; i<n_units_topics; i++) {
      unit_topic_order.push (order_array[i][0]);
   }
   var n_unit_qss         = {};
   var n_qs_by_unit_topic = {};
   maker_specific_n_qs_by_unit_topic = {}
   var n_cg_by_unit_topic = {};
   var n_unit_cgs = {};
   var units_all_other = true;
   var unit_topics_all_other = {};
   var n_qs = 0;
   var prev_unit = units[n_units_topics-1];
   if (! prev_unit) {
      prev_unit = 'Other';
   }
   var n_unit_qs = 0;
   var n_unit_cg = 0;
   var n_unit_topics_not_other = 0;
   for (var ii=n_units_topics-1; ii>=0; ii--) {
      const i = unit_topic_order[ii];
      var n_cg = n_cgs[i] === null ? 0 : parseInt (n_cgs[i], 10);
      if (! units[i]) {
         units[i] = 'Other';
      }
      if (! topics[i]) {
         topics[i] = 'Other';
      }
      var unit_topic_class = units[i] + '__' + topics[i];
      unit_topic_class = unit_topic_class.replace (/[^a-z0-9 ]/gi, '_');
      n_qs_by_unit_topic[unit_topic_class] = n_qss[i];
      n_cg_by_unit_topic[unit_topic_class] = n_cg;
      if (units[i] != prev_unit) {
         var prev_unit_class = prev_unit.replace (/[^a-z0-9 ]/gi, '_');
         n_unit_qss[prev_unit_class] = n_unit_qs;
         n_unit_cgs[prev_unit_class] = n_unit_cg;
         if (prev_unit != 'Other') {
            units_all_other = false;
         }
         unit_topics_all_other[prev_unit_class] = n_unit_topics_not_other == 0;
         n_unit_qs = 0;
         n_unit_cg = 0;
         n_unit_topics_not_other = 0;
         prev_unit = units[i];
      }
      n_unit_qs += parseInt (n_qss[i], 10);
      n_unit_cg += n_cg;
      if (topics[i] != 'Other') {
         n_unit_topics_not_other++;
      }
      n_qs += n_qss[i];
   }
   var n_to_show;
   if (maker_specific_questions_cards) {
      n_to_show = 0;
   } else {
      if (qname == 'qwiz_') {
         n_to_show = get_qwizdeckdata (qname, i_qwiz, 'questions_to_show');
      } else {
         n_to_show = get_qwizdeckdata (qname, i_qwiz, 'cards_to_show');
      }
   }
   var unit_class = units[0].replace (/[^a-z0-9 ]/gi, '_');
   n_unit_qss[unit_class] = n_unit_qs;
   n_unit_cgs[unit_class] = n_unit_cg;
   if (units[0] != 'Other') {
      units_all_other = false;
   }
   unit_topics_all_other[unit_class] = n_unit_topics_not_other == 0;
   var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz);
   if (use_dataset_options_html[qname + i_qwiz]) {
      $use_dataset_options_div.html (use_dataset_options_html[qname + i_qwiz]).show ();
      $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.nquestions').html ('0');
      $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.ncorrect').html ('0');
      for (var unit_class in n_unit_qss) {
         $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.nquestions.' + unit_class).html (n_unit_qss[unit_class]);
         $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.ncorrect.'   + unit_class).html (n_unit_cgs[unit_class]);
      }
      var n_total_correct = 0;
      for (var unit_topic_class in n_qs_by_unit_topic) {
         $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.nquestions.' + unit_topic_class).html (n_qs_by_unit_topic[unit_topic_class]);
         const n_cg = n_cg_by_unit_topic[unit_topic_class];
         $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.ncorrect.'   + unit_topic_class).html (n_cg);
         n_total_correct += n_cg;
      }
      $ ('#dataset_units_topics-' + qname + i_qwiz + ' td.ncorrect.total').html (n_total_correct);
      return false;
   }
   if (icon_expand_src == 'not ready') {
      if (! plugin_url) {
         plugin_url = qqc.get_qwiz_param ('url', './');
      }
      icon_expand_src   = plugin_url + 'images/icon_expand.gif';
      icon_collapse_src = plugin_url + 'images/icon_collapse.gif';
   }
   var htm = [];
   var display_name = dataset;
   if (use_dataset_options_display_name[qname + i_qwiz]) {
      display_name = use_dataset_options_display_name[qname + i_qwiz];
   }
   var topics_only_f = get_qwizdeckdata (qname, i_qwiz, 'dataset_intro_f') == 'topics_only';
   var info_only_msg = get_qwizdeckdata (qname, i_qwiz, 'dataset_intro_info_only_msg');
   var questions_cards = qname == 'qwiz_' ? qqc.T ('questions') : qqc.T ('cards');
   if (info_only_msg) {
      htm.push ('<span class="qwiz_errmsg">' + info_only_msg + '</span><br />');
   }
   htm.push ('<div class="use_dataset_options_header">' + display_name + '</div>');
   if (! units_all_other || ! unit_topics_all_other['Other']) {
      if (units_all_other) {
         qqc.set_qwizdeckdata (qname, i_qwiz, 'expand_topics', true);
      }
      if (! topics_only_f) {
         if (qname == 'qwiz_') {
            htm.push ('<p class="use_dataset_options">' + qqc.T ('Choose the type of questions you want to practice') + '</p>');
         } else {
            htm.push ('<p class="use_dataset_options">' + qqc.T ('Choose the type of cards you want to practice') + '</p>');
         }
      }
      htm.push ('<table id="dataset_units_topics-' + qname + i_qwiz + '" class="dataset_units_topics" align="center">');
      htm.push (   '<tr>');
      htm.push (      '<th>');
      htm.push (      '</th>');
      var checkbox_visible_hidden = topics_only_f ? 'hidden' : 'visible';
      htm.push (      '<th>');
      htm.push (         '<input type="checkbox" onclick="qwiz_qcards_common.dataset_units_topics_toggle_all (this)" style="visibility: ' + checkbox_visible_hidden + '" checked />');
      htm.push (      '</th>');
      htm.push (      '<th>');
      htm.push (         '<span class="units_header">Unit</span>');
      htm.push (      '</th>');
      htm.push (      '<th>');
      htm.push (         '<span class="topics_header">Topic</span>');
      htm.push (      '</th>');
      htm.push (      '<th class="qwiz-center">');
      if (qname == 'qwiz_') {
         htm.push (      'Qs');
      } else {
         htm.push (      'Cards');
      }
      htm.push (      '</th>');
      if (qrecord_id && document_qwiz_user_logged_in_b === true) {
         htm.push (      '<th class="qwiz-center">');
         if (qname == 'qwiz_') {
            htm.push (      qqc.T ('Correct'));
         } else {
            htm.push (      '&ldquo;' + qqc.T ('Got it!') + '&rdquo;');
         }
         htm.push (      '</th>');
      }
      htm.push (   '</tr>');
      var prev_unit = '';
      var i_unit = -1;
      var n_total_questions = 0;
      var n_total_correct   = 0;
      var cum_n_unit_qs     = 0;
      var cum_n_topic_qs    = 0;
      var maker_specific_fraction = maker_specific_questions_cards / n_qs;
      if (maker_specific_fraction > 1.0) {
         maker_specific_fraction = 1.0;
      }
      for (var ii=0; ii<n_units_topics; ii++) {
         const i = unit_topic_order[ii];
         var unit  = units[i];
         var topic = topics[i];
         if (unit != prev_unit) {
            i_unit++;
            prev_unit = unit;
            var unit_id = qname + i_qwiz + '-unit' + i_unit;
            var unit_class = unit.replace (/[^a-z0-9 ]/gi, '_');
            var display_n_unit_qs = n_unit_qss[unit_class];
            if (maker_specific_questions_cards) {
               display_n_unit_qs = Math.ceil (display_n_unit_qs * maker_specific_fraction);
               if (cum_n_unit_qs + display_n_unit_qs > maker_specific_questions_cards) {
                  display_n_unit_qs = maker_specific_questions_cards - cum_n_unit_qs;
               }
               cum_n_topic_qs = 0;
            }
            if (display_n_unit_qs > 0) {
               htm.push ('<tr id="' + unit_id + '" class="unit_head">');
               htm.push (   '<td style="padding-right: 5px;">');
               if (! unit_topics_all_other[unit_class]) {
                  htm.push (   '<img src="' + icon_expand_src + '" class="expand expand_collapse expand_collapse_unit qwiz-inline" onclick="qwiz_qcards_common.dataset_unit_expand_collapse (\'' + qname + '\', ' + i_qwiz + ', this)" title="' + qqc.T ('Show/hide topics in this unit') + '" />');
               }
               htm.push (   '</td>');
               htm.push (   '<td>');
               htm.push (      '<input type="checkbox" class="toggle_topics" style="visibility: ' + checkbox_visible_hidden + '" onclick="qwiz_qcards_common.dataset_unit_toggle_topics (this)" title="' + qqc.T ('Select/deselect all topics in this unit') + '" checked />');
               htm.push (   '</td>');
               htm.push (   '<td colspan="2" class="unit">');
               htm.push (      '<b>');
               htm.push (         unit.replace (/_/g, ' '));
               htm.push (      '</b>');
               htm.push (   '</td>');
               htm.push (   '<td class="qwiz-right qwiz-nowrap nquestions ' + unit_class + '">');
               htm.push (      '<b>');
               htm.push (         display_n_unit_qs);
               htm.push (      '</b>');
               htm.push (   '</td>');
               if (qrecord_id && document_qwiz_user_logged_in_b === true) {
                  htm.push (   '<td class="qwiz-right qwiz-nowrap ncorrect ' + unit_class + '">');
                  htm.push (      '<b>');
                  htm.push (         n_unit_cgs[unit_class]);
                  htm.push (      '</b>');
                  htm.push (   '</td>');
               }
               htm.push ('</tr>');
               cum_n_unit_qs += display_n_unit_qs;
            }
         }
         var unit_topic_class = (unit + '__' + topic);
         unit_topic_class = unit_topic_class.replace (/[^a-z0-9 ]/gi, '_');
         var display_n_qs_by_unit_topic = n_qs_by_unit_topic[unit_topic_class];
         if (display_n_unit_qs > 0) {
            if (maker_specific_questions_cards) {
               display_n_qs_by_unit_topic = Math.ceil (display_n_qs_by_unit_topic * maker_specific_fraction);
               if (cum_n_topic_qs + display_n_qs_by_unit_topic > display_n_unit_qs) {
                  display_n_qs_by_unit_topic = display_n_unit_qs - cum_n_topic_qs;
               }
               maker_specific_n_qs_by_unit_topic[unit_topic_class] = display_n_qs_by_unit_topic;
            }
            if (display_n_qs_by_unit_topic > 0) {
               htm.push ('<tr class="unit_topic unit_topic' + i_unit + '" data-unit="' + btoa (unit) + '">');
               htm.push (   '<td>');
               htm.push (   '</td>');
               var id = qname + i_qwiz + '-unit_topic' + i;
               htm.push (   '<td>');
               htm.push (      '<input type="checkbox" id="' + id + '" style="visibility: ' + checkbox_visible_hidden + '" checked />');
               htm.push (   '</td>');
               htm.push (   '<td>');
               htm.push (   '</td>');
               htm.push (   '<td class="topic" data-topic="' + btoa (topic) + '">');
               htm.push (      topic.replace (/_/g, ' '));
               htm.push (   '</td>');
               htm.push (   '<td class="qwiz-right qwiz-nowrap nquestions ' + unit_topic_class + '">');
               htm.push (      display_n_qs_by_unit_topic);
               htm.push (   '</td>');
               n_total_questions += display_n_qs_by_unit_topic;
               if (qrecord_id && document_qwiz_user_logged_in_b === true) {
                  htm.push (   '<td class="qwiz-right qwiz-nowrap ncorrect ' + unit_topic_class + '">');
                  htm.push (      n_cg_by_unit_topic[unit_topic_class]);
                  htm.push (   '</td>');
               }
               n_total_correct += n_cg_by_unit_topic[unit_topic_class];
               htm.push ('</tr>');
               cum_n_topic_qs += display_n_qs_by_unit_topic;
            }
         }
      }
      htm.push (   '<tr class="border-top">');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td colspan="2">');
      htm.push (         '<b>');
      htm.push (            'Total');
      htm.push (         '</b>');
      htm.push (      '</td>');
      htm.push (      '<td class="qwiz-right qwiz-nowrap">');
      htm.push (         '<b>');
      htm.push (            n_total_questions);
      htm.push (         '</b>');
      htm.push (      '</td>');
      if (qrecord_id && document_qwiz_user_logged_in_b === true) {
         htm.push (   '<td class="qwiz-right qwiz-nowrap ncorrect total">');
         htm.push (      '<b>');
         htm.push (         n_total_correct);
         htm.push (      '</b>');
         htm.push (   '</td>');
      }
      htm.push (   '</tr>');
      htm.push ('</table>');
   } else {
      var n_total_questions;
      if (maker_specific_questions_cards) {
         n_total_questions = maker_specific_questions_cards;
      } else {
         n_total_questions = n_qs_by_unit_topic['Other__Other'];
      }
      var n_total_correct   = n_cg_by_unit_topic['Other__Other'];
      htm.push ('<br /><br />');
      if (qname == 'qwiz_') {
         htm.push ('<b>' + qqc.T ('Questions') + ': ' + n_total_questions);
         if (qrecord_id && document_qwiz_user_logged_in_b === true) {
            htm.push ('&ensp; ' + qqc.T ('Correct') + ': ' + n_total_correct);
         }
         htm.push ('</b><br />');
      } else {
         htm.push ('<b>' + qqc.T ('Cards') + ': ' + n_total_questions);
         if (qrecord_id && document_qwiz_user_logged_in_b === true) {
            htm.push ('&ensp; &ldquo;' + qqc.T ('Got it!') + '&rdquo;: ' + n_total_correct);
         }
         htm.push ('</b><br />');
      }
   }
   if (! info_only_msg) {
      htm.push ('<p class="use_dataset_options">');
      var info;
      if (qname == 'qwiz_') {
         info = qqc.T ("'Redo' - questions done before this date will not be counted in totals");
      } else {
         info = qqc.T ("'Redo' - cards done before this date will not be counted in totals");
      }
      htm.push (   'Restart:');
      htm.push (   '<input type="date" id="dataset_reset_questions_date_' + qname + i_qwiz + '" class="dataset_reset_questions_date" value=' + dataset_reset_questions_date + ' />');
      htm.push (   '<img src="' + plugin_url + 'images/info_icon.png" class="qwiz_icon_smaller qwiz-inline" style="cursor: help;" title="' + info + '">');
      htm.push (   '&emsp;');
      if (! topics_only_f) {
         htm.push (qqc.T ('Max to practice in this session') + ':');
      } else {
         htm.push (questions_cards);
      }
      htm.push (   '<select id="dataset_max_q_' + qname + i_qwiz + '" class="dataset_max_q">');
      if (! topics_only_f) {
         var opts = [10, 20, 30, 50];
         if (debug[11]) {
            opts.unshift (3);
         }
         var an_option_selected = false;
         var n_opts = opts.length;
         for (var i=0; i<n_opts; i++) {
            if (! an_option_selected && n_to_show && opts[i] >= n_to_show) {
               htm.push ('<option selected>');
               htm.push (   n_to_show);
               htm.push ('</option>');
               an_option_selected = true;
            }
            if (opts[i] >= n_total_questions) {
               const selected = an_option_selected ? '' : ' selected';
               htm.push ('<option' + selected + '>');
               htm.push (   n_total_questions);
               htm.push ('</option>');
               break;
            }
            if (! n_to_show || opts[i] != n_to_show) {
               htm.push ('<option>');
               htm.push (   opts[i]);
               htm.push ('</option>');
            }
         }
         if (n_total_questions > opts[n_opts - 1]) {
            const selected = an_option_selected ? '' : ' selected';
            htm.push ('<option' + selected + '>');
            htm.push (   n_total_questions);
            htm.push ('</option>');
         }
      } else {
         htm.push (   '<option selected>');
         htm.push (      n_total_questions);
         htm.push (   '</option>');
      }
      htm.push (   '</select>');
      if (qname == 'qwiz_') {
         info = 'Note: questions that you miss will be repeated within this session';
      } else {
         info = 'Note: cards that you mark &ldquo;Need more practice&rdquo; will be repeated within this session';
      }
      htm.push (   '<img src="' + plugin_url + 'images/info_icon.png" class="qwiz_icon_smaller qwiz-inline" style="cursor: help;" title="' + info + '">');
      htm.push ('</p>');
      if (qrecord_id && document_qwiz_user_logged_in_b === true) {
         if (! topics_only_f) {
            htm.push ('<span class="use_dataset_options">');
            htm.push (   'Do ' + questions_cards + ': &ensp;');
            htm.push ('</span>');
            htm.push ('<label class="qwiz_label use_dataset_options">');
            var title;
            if (qname == 'qwiz_') {
               title = qqc.T ('Priority is questions you answered incorrectly and new questions, but questions you answered correctly will sometimes be shown for review');
            } else {
               title = qqc.T ('Priority is cards you marked') + ' &ldquo;' + qqc.T ('Need more practice') + '&rdquo; ' + qqc.T ('and new cards, but cards you marked') + ' &ldquo;' + qqc.T ('Got it!') + '&rdquo; ' + qqc.T ('will sometimes be shown for review');
            }
            htm.push (   '<input type="radio" name="spaced_repetition" class="qwiz_radio_smaller" value="spaced_repetition" checked />' + qqc.T ('Spaced repetition') + '<img src="' + plugin_url + 'images/info_icon.png" class="qwiz_icon_smaller qwiz-inline" style="cursor: help;" title="'+ title + '" /> &ensp;');
            htm.push ('</label>');
            htm.push ('<label class="qwiz_label use_dataset_options">');
            htm.push (   '<input type="radio" name="spaced_repetition" class="qwiz_radio_smaller" value="new" />' + qqc.T ('New') + '&ensp;');
            htm.push ('</label>');
            htm.push ('<label class="qwiz_label use_dataset_options">');
            var label = qname == 'qwiz_' ? qqc.T ('Incorrect') : '&ldquo;' + qqc.T ('Need more practice') + '&rdquo;';
            htm.push (   '<input type="radio" name="spaced_repetition" class="qwiz_radio_smaller" value="incorrect" />' + label + ' &ensp;');
            htm.push ('</label>');
            htm.push ('<label class="qwiz_label use_dataset_options">');
            htm.push (   '<input type="radio" name="spaced_repetition" class="qwiz_radio_smaller" value="all" />' + qqc.T ('All'));
            htm.push ('</label>');
            htm.push ('<br />');
         }
      }
      var begin_label   = qqc.T ('Begin practice');
      htm.push ('<button class="qwiz_button begin_practice" onclick="qwiz_qcards_common.begin_dataset_quiz_deck (\'' + qqc.addSlashes (dataset) + '\', \'' + qname + '\', ' + i_qwiz + ', \'' + qqc.addSlashes (qrecord_id) + '\', ' + n_qs + ', 0, 0, \'' + dataset_reset_questions_date + '\', ' + maker_specific_questions_cards + ')">');
      if (topics_only_f) {
         begin_label = qname == 'qwiz_' ? qqc.T ('Start questions') : qqc.T ('Start cards');
      }
      htm.push (   begin_label);
      htm.push ('</button>');
      htm.push ('<br />');
      htm.push ('<br />');
   }
   $use_dataset_options_div.html (htm.join ('\n')).show ();
   if (qname == 'qcard_') {
      qcard_.set_container_width_height (i_qwiz);
   }
   if (topics_only_f || get_qwizdeckdata (qname, i_qwiz, 'expand_topics')) {
      $ ('table#dataset_units_topics-qwiz_' + i_qwiz + ' img.expand_collapse_unit').each (function () {
         qqc.dataset_unit_expand_collapse (qname, i_qwiz, this);
      });
   }
}
this.offset_height_rescale = function ($el, scale_fac, add_margin) {
   const unscaled_height = $el.outerHeight ();
   var   offset = unscaled_height*(scale_fac - 1.0);
   if (add_margin) {
      offset += add_margin;
   }
   $el.css ({'margin-bottom': offset.toFixed (1)+ 'px'});
}
this.create_sortable_unit_number = function (unit_no) {
   var sortable_unit_no = '';
   var type = typeof unit_no;
   if (type != 'number' && type != 'string') {
      sortable_unit_no = 'z';
   } else if (unit_no == '') {
      sortable_unit_no = 'z';
   } else {
      var pieces = unit_no.split ('.');
      var n_pieces = pieces.length;
      if (n_pieces > 1) {
         var pieces2 = pieces[1].split ('-');
         pieces[1] = pieces2[0];
      }
      var n = Math.min (2, n_pieces);
      for (var i=0; i<n; i++) {
         if (! isNaN (pieces[i])) {
            pieces[i] = ('++++++' + pieces[i]).slice (-6);
         }
      }
      sortable_unit_no = pieces.join ('.') + ' ' + unit_no;
   }
   return sortable_unit_no;
}
this.shuffle = function (array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor (Math.random () * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
firstBy = (function() {
   function makeCompareFunction (f, direction) {
      if (typeof (f) != "function") {
         var i = f;
         var locale = window.navigator.userLanguage || window.navigator.language;
         f = function (a, b) {
            if (typeof a[i] == 'number' && typeof b[i] == 'number') {
               return a[i] - b[i];
            } else {
               var a0 = a[i] || 'zzz';
               var b0 = b[i] || 'zzz';
               return a0.toString ().toLowerCase ().localeCompare (b0.toString ().toLowerCase (), locale);
            }
         };
      }
      if (direction === -1)  return function(a, b)
                                       {return -f (a, b)
                                    };
      return f;
   }
   /* mixin for the `thenBy` property */
   function extend (f, d) {
      f = makeCompareFunction (f, d);
      f.thenBy = tb;
      return f;
   }
   /* adds a secondary compare function to the target function (`this` context)
      which is applied in case the first one returns 0 (equal)
      returns a new compare function, which has a `thenBy` method as well */
   function tb (y, d) {
      var x = this;
      y = makeCompareFunction (y, d);
      return extend (function (a, b) {
            return x (a, b) || y (a, b);
      });
    }
    return extend;
})();
function get_dataset_units_topics (qname, i_qwiz, qrecord_id, dataset, callback) {
   var qwiz_session_id = '';
   if (typeof (document_qwiz_session_id) != 'undefined') {
      qwiz_session_id = document_qwiz_session_id;
   }
   var data = {qname:            qname,
               i_qwiz_qdeck:     i_qwiz,
               dataset:          dataset,
               qwiz_session_id:  qwiz_session_id};
   if (callback) {
      data.callback = callback;
   }
   qqc.qjax (qname, i_qwiz, qrecord_id, 'get_dataset_units_topics', data);
}
this.create_paypal_subscription_screen = function (qname, i_qwiz, special_offer) {
   $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   const $subscription_screen_div = qqc.$get_login_div (qname, i_qwiz);
   var htm = [];
   if (special_offer && ! document_qwiz_user_logged_in_b) {
      htm.push ('Please log in');
      $subscription_screen_div.html (htm.join ('\n')).show ();
      return;
   }
   const clientId = 'AdMvaQesYKbCDS3vl8-_Td2bmsnVdwrPl3jbkMzefr3RUZIsmK8BHwUZxEfg_f2m2jfmLJwh4-iEikTC';
   var   plan_id;
   const immediate_payment = qqc.set_immediate_payment (qname, i_qwiz);
   if (immediate_payment) {
      plan_id = 'P-3BN46242LL439390GMYKVOVA'
      htm.push (`
                Sign up with PayPal or a credit card
                <br />
                `);
   } else {
      plan_id  = 'P-6T382372C44113124MXX5UFI';
      htm.push (`
                Sign up for a two-week free trial with a PayPal or credit card
                authorization.&nbsp;
                There is no charge; you can cancel any time.&nbsp;
                After two weeks you will be charged $24.95 per month;
                again, you can cancel any time.&nbsp;
                `);
   }
   if (debug[0]) {
      const subscription_id = 'test' + (parseInt (1.0e6*Math.random ()) + 100000);
      htm.push (`
              <br />
              <button onclick="qwiz_qcards_common.free_trial_registration ('${qname}', ${i_qwiz}, {subscriptionID: '${subscription_id}'})">
                 Test (bypass PayPal)
              </button>
              <br />
                `);
   }
   htm.push ('<br />');
   if (! plugin_url) {
      plugin_url = qqc.get_qwiz_param ('url', './');
   }
   const spinner = '<img src="' + plugin_url + 'images/spinner16x16.gif" />';
   htm.push (`
              <script src="https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription">
              </script>
              <div id="paypal-button-container-${qname}${i_qwiz}" style="width: 250px; margin: auto;">
                 ${spinner}
              </div>
             `);
   $subscription_screen_div.html (htm.join ('\n')).show ();
   var i_tries = 0;
   const delay_run = function () {
      if (typeof paypal == 'undefined') {
         i_tries++;
         if (i_tries < 20) {
            setTimeout (delay_run, 250);
         }
      } else {
         var add_htm = [];
         add_htm.push (`
                 <script>
                    parent.jQuery ('#paypal-button-container-${qname}${i_qwiz}').html ('');
                    paypal.Buttons({
                       style: {
                          height:   40,
                          shape:    'pill',
                          tagline:  false
                       },
                       createSubscription: function(data, actions) {
                          return actions.subscription.create({
                             plan_id: '${plan_id}',
                             application_context: {
                                shipping_preference:  'NO_SHIPPING'
                             }
                          });
                       },
                          onApprove: function(data, actions) {
                          parent.qwiz_qcards_common.free_trial_registration ('${qname}', ${i_qwiz}, data, actions);
                       }
                     }).render("#paypal-button-container-${qname}${i_qwiz}");
                 </script>
         `);
         var display_pay_screen;
         if (qname == 'qwiz_') {
            display_pay_screen = qwiz_.get_qwizdata (i_qwiz, 'display_pay_screen');
         } else {
            display_pay_screen = qcard_.get_deckdata (i_qwiz, 'display_pay_screen');
         }
         if (! display_pay_screen) {
            const return_to = qname == 'qwiz_' ? 'quiz' : 'flashcard deck';
            add_htm.push (`
                 <div style="text-align: right;">
                    <button onclick="${qname}.no_login (${i_qwiz}, false, true)">
                       Return to ${return_to}
                    </button>
                 </div>
            `);
         }
         $subscription_screen_div.append (add_htm.join ('\n'));
      }
   }
   setTimeout (delay_run, 250);
}
this.free_trial_registration = function (qname, i_qwiz, data, actions) {
   if (debug[0]) {
      console.log ('[free_trial_registration] data:', data);
   }
   document_qwiz_subscription_id = data.subscriptionID;
   if (qname == 'qwiz_') {
      const display_pay_screen = qwiz_.get_qwizdata (i_qwiz, 'display_pay_screen');
      const immediate_payment  = qqc.set_immediate_payment (qname, i_qwiz);
      if (display_pay_screen == 'special_offer'
                || (document_qwiz_user_logged_in_b
                    && display_pay_screen == 'free_trial' && immediate_payment)) {
         const payment_type_id = immediate_payment ? 65 : 52;
         var data = {login_f:          0,
                     special_offer:    1,
                     register_v2:      '1',
                     subscription:     1,
                     payment_type_id:  payment_type_id,
                     subscription_id:  document_qwiz_subscription_id,
                     callback:         'special_offer_callback'
                    };
         if (debug[0]) {
            console.log ('[free_trial_registration] data', data);
         }
         qqc.qjax (qname, i_qwiz, '', 'new_student_registration', data);
         return
      }
   }
   var msg;
   if (qqc.set_immediate_payment (qname, i_qwiz)) {
      msg = 'Create a new account &ndash; or log in with your existing account';
   } else {
      msg = 'Create a new Learn-Biology.com login account';
   }
   msg += '<br /><span class="qwiz-smaller qwiz-highlight">Please be sure to complete this step in order to access learn-biology.com</span>';
   if (qname == 'qwiz_') {
      qwiz_.display_login (i_qwiz, false, 'register', msg);
   } else {
      qcard_.display_login (i_qwiz, false, 'register', msg);
   }
}
this.create_pay_screen = function (qname, qdata, i_qwiz, msg, pay_now_sign_up) {
   var $pay_screen_div = qqc.$get_login_div (qname, i_qwiz);
   var htm = [];
   if (qdata[i_qwiz].pay_errmsg) {
      htm.push ('<strong>' + qdata[i_qwiz].pay_errmsg + '</strong><br />');
   } else {
      if (msg) {
         htm.push (msg + '<br />');
      }
      var n_pay_options = qdata[i_qwiz].taker_payment_type_ids.length;
      var any_promo = qdata[i_qwiz].any_promo;
      var promo_applied = false;
      /*
      Discount automatically applied to school's students in set_pay_settings ()
      -- as soon as an option has promo_fee != -1.
      if (any_promo) {
         var promo_code = qdata[i_qwiz].promo_code;
         promo_code = promo_code ? promo_code : '';
         promo_applied = qdata[i_qwiz].promo_applied;
         htm.push ('<form action="promo_code_nada" onSubmit="return qwiz_qcards_common.check_promo_code (\'' + qname + '\', ' + i_qwiz + ')">');
         htm.push (   '<p id="' + qname + 'promo_code' + i_qwiz + '" style="text-align: right; margin-right: 5px;">');
         htm.push (      '<span class="qwiz-normal">If you have a discount code:</span>');
         htm.push (      '<input class="promo_code" onfocus="qwiz_qcards_common.clear_promo_code_msgs (\'' + qname + '\', ' + i_qwiz + ')" value="' + promo_code + '" />');
         htm.push (      '<button type="submit" class="qwiz-smaller">');
         htm.push (         'Go');
         htm.push (      '</button>');
         htm.push (      '<span class="promo_code_errmsg promo_code_msg"></span>');
         htm.push (      '<span class="promo_code_okmsg promo_code_msg">');
         if (promo_applied) {
            htm.push (   '<br />OK, discount applied');
            pay_now_sign_up = 'Pay now';
         }
         htm.push (      '</span>');
         htm.push (   '</p>');
         htm.push ('</form>');
      }
      */
      htm.push ('<form action="https://www.paypal.com/cgi-bin/webscr" onSubmit="return qwiz_qcards_common.submit_for_payment (\'' + qname + '\', ' + i_qwiz + ', this)" method="post" target="_blank">');
      htm.push (   '<input type="hidden" name="cmd" value="_s-xclick">');
         htm.push ('<input type="hidden" name="hosted_button_id" value="WH6FWJY29SWN8">');
      var i_promo = -1;
      var i_pay_option_beg = 0;
      var i_pay_option_end = n_pay_options;
      if (typeof qdata[i_qwiz].i_promo != 'undefined') {
         i_promo = qdata[i_qwiz].i_promo;
         if (i_promo != -1) {
            i_pay_option_beg = i_promo;
            i_pay_option_end = i_promo + 1;
            n_pay_options    = 1
            pay_now_sign_up  = 'Pay now';
         }
      }
      htm.push (   '<table class="pay_options">');
      htm.push (      '<tr>');
      htm.push (         '<td>');
      htm.push (            '<input type="hidden" name="on0" value="Options">');
      if (n_pay_options > 1) {
         htm.push (         'Please choose:');
      }
      htm.push (         '</td>');
      htm.push (      '</tr>');
      htm.push (      '<tr>');
      htm.push (         '<td>');
      var size = '';
      if (n_pay_options <= 2) {
         size = ' size="2" style="min-height: 42px;"';
      } else if (n_pay_options == 3) {
         size = ' size="3" style="min-height: 64px;"';
      } else if (n_pay_options >= 4) {
         size = ' size="4" style="min-height: 86px;"';
      }
      htm.push (            '<select name="os0" class="qwiz_paypal_select"' + size + ' onchange="qwiz_qcards_common.update_pay_button (this, \'' + qname + '\', ' + i_qwiz + ')">');
      var all_taker_options_free_b = true;
      var selection_already_made_b = false;
      for (var i=i_pay_option_beg; i<i_pay_option_end; i++) {
         var fee         = qdata[i_qwiz].taker_fees[i];
         if (debug[0] && fee == 19.99) {
            fee = "1.00";
         }
         var skip_f = (document_qwiz_user_logged_in_b && fee <= 0.0)
                                                                   || fee > 0.0;
         if (skip_f) {
            continue;
         }
         var n_periods   = qdata[i_qwiz].taker_good_for_n_periodss[i];
         var period      = qdata[i_qwiz].taker_good_for_periods[i];
         var description = qdata[i_qwiz].taker_payment_descriptions[i];
         var selected_b  = qdata[i_qwiz].taker_payment_selected_bs[i];
         var option_text;
         if (fee <= 0.0) {
            option_text = qqc.capitalize (qqc.number_to_word (n_periods)) + ' ' + qqc.plural (period, period + 's', n_periods);
            if (i == 0) {
               selected_b = true;
               selection_already_made_b = true;
            }
         } else {
            option_text = qqc.currency (fee) + ' ' + qqc.number_to_word (n_periods) + ' ' + qqc.plural (period, period + 's', n_periods);
            if (pay_now_sign_up && pay_now_sign_up == 'Pay now') {
               if (! selection_already_made_b) {
                  selected_b = true;
                  selection_already_made_b = true;
               }
            }
         }
         if (description) {
            description = description.replace (/<\/{0,1}b>/gi, '');
            description = description.replace (/<[^>]+>.*/, '');
            option_text += ' - ' + description;
         }
         var selected = selected_b ? ' selected' : '';
         htm.push (            '<option value="' + fee + '"' + selected + '>');
         htm.push (               option_text);
         htm.push (            '</option>');
         if (fee > 0.0) {
            all_taker_options_free_b = false;
         }
      }
      htm.push (            '</select> ');
      htm.push (         '</td>');
      htm.push (      '</tr>');
      htm.push (   '</table>');
      htm.push (   '<input type="hidden" name="currency_code" value="USD">');
      if (   all_taker_options_free_b
           || (   qdata[i_qwiz].taker_fees[0] <= 0.0
               && (! pay_now_sign_up || pay_now_sign_up == 'Sign up'))) {
         sign_up_display = 'block';
         paypal_display  = 'none';
      } else {
         sign_up_display = 'none';
         paypal_display  = 'block';
      }
      var style = 'style="display: ' + sign_up_display + ';"';
      htm.push ('<div class="sign_up_button" ' + style + '>');
      if (true || document_qwiz_email_confirm == 1) {
         htm.push (   '<input type="submit" class="qwiz_button" value="Sign up" />');
         htm.push (   '<div class="signup_confirm_email_errmsg qwiz_errmsg" style="display: none;">');
         htm.push (   '</div>');
      } else {
         htm.push (   '<span class="qwiz-smaller" style="display: inline-block; line-height: 1.4em;">');
         htm.push (      'A free trial requires confirmation of your email address, and indicates your acceptance of occasional emails during the free-trial period.&nbsp');
         htm.push (      'Note: email to public school addresses is often blocked.&nbsp;');
         htm.push (      'If you do not receive an email (and you&rsquo;ve checked your <b>spam folder</b>!), please either enter an alternate address and try again, or ask your instructor to consider signing up for a teacher license.&nbsp');
         htm.push (      '<br />');
         htm.push (   '</span>');
         htm.push (   '<input class="confirm_email_address" type="text" style="width: 13rem !important; padding: 2px; min-height: 20px;" onfocus="qwiz_qcards_common.update_email_hide_error (\'' + qname + '\', ' + i_qwiz + ')" value="' + document_qwiz_email + '" />');
         htm.push (   '&nbsp;');
         htm.push (   '<span class="confirm_email_address qwiz_button" onclick="qwiz_qcards_common.confirm_email (this, \'' + qname + '\', ' + i_qwiz + ')">');
         htm.push (      'Confirm email address');
         htm.push (   '</span>');
         htm.push (   '<div class="update_email_errmsg qwiz_errmsg"></div>');
         var visibility       = '';
         var qwiz_button_disabled = ' qwiz_button_disabled';
         var disabled         = ' disabled';
         if (document_qwiz_email_confirm != 0) {
            visibility       = ' visibility: visible;';
            qwiz_button_disabled = '';
            disabled         = '';
         }
         htm.push (   '<div class="signup_confirm_email qwiz-smaller" style="line-height: 1.4em;' + visibility + '">');
         htm.push (      'We&rsquo;ve emailed you a code.&nbsp; If you don&rsquo;t see it, CHECK YOUR SPAM FOLDER.&nbsp; Enter the code, or, if you followed the link in the email, click &ldquo;Sign up&rdquo;');
         htm.push (   '</div>');
         htm.push (   '<input class="signup_confirm_email" type="text" style="width: 5rem !important; padding: 2px; min-height: 20px;' + visibility + '" onfocus="qwiz_qcards_common.hide_signup_confirm_email_errmsg (this)" />');
         htm.push (   '&nbsp;');
         htm.push (   '<input type="submit" class="sign_up qwiz_button' + qwiz_button_disabled + '"' + disabled + ' value="Sign up" />');
         htm.push (   '<div class="signup_confirm_email_errmsg qwiz_errmsg" style="display: none;">');
         htm.push (   '</div>');
      }
      htm.push ('</div>');
      style = 'style="display: ' + paypal_display + ';"';
      htm.push ('<div class="paypal_button" ' + style + '>');
      htm.push (   '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" style="border: none;" name="submit" alt="PayPal - The safer, easier way to pay online!">');
      htm.push (   '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">');
      htm.push ('</div>');
      htm.push (   '<input type="hidden" name="custom">');
      htm.push ('</form>');
      htm.push ('<button onclick="qwiz_qcards_common.payment_received (1, \'' + qname + '\', ' + i_qwiz + ')" class="qwiz_pay_cancel qwiz-smaller">');
      htm.push (   'Cancel');
      htm.push ('</button>');
   }
   $pay_screen_div.html (htm.join ('\n')).show ();
}
this.update_pay_button = function (select_el, qname, i_qwiz) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   $ (qwiz_deck + ' div.signup_confirm_email_errmsg').hide ();
   if (select_el.value <= '0.00') {
      $ (qwiz_deck + 'div.sign_up_button').show ();
      $ (qwiz_deck + 'div.paypal_button').hide ();
   } else {
      $ (qwiz_deck + 'div.sign_up_button').hide ();
      $ (qwiz_deck + 'div.paypal_button').show ();
   }
}
this.hide_signup_confirm_email_errmsg = function (input_el) {
   $ (input_el).parents ('div.sign_up_button').find ('div.signup_confirm_email_errmsg').hide ();
}
this.update_email_callback = function (qname, i_qwiz, errmsg) {
   if (debug) {
      console.log ('[update_email_callback] qname:', qname, ', i_qwiz:', i_qwiz, ', errmsg:', errmsg);
   }
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   if (errmsg == 'need_password') {
      qqc.create_password_dialog (qname, i_qwiz);
      $dialog_current_password.dialog ('open');
      return false;
   } else if (errmsg == 'password_incorrect') {
      $ ('#current_password_errmsg').html ('Password incorrect');
   } else if (errmsg == 'not_unique') {
      $ (qwiz_deck + ' div.update_email_errmsg').html ('Email address already in use');
      $ (qwiz_deck + ' span.confirm_email_address').addClass ('qwiz_button_disabled');
   } else if (errmsg == 'fail') {
      $ (qwiz_deck + ' div.update_email_errmsg').html ('Sorry, unable to update email');
   } else if (errmsg == 'ok') {
      document_qwiz_email = $ (qwiz_deck + ' input.confirm_email_address').val ();
      qqc.confirm_email2 (qname, i_qwiz)
   }
   if ($dialog_current_password) {
      $dialog_current_password.dialog ('close');
   }
}
this.update_email_hide_error = function (qname, i_qwiz) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   $ (qwiz_deck + ' div.update_email_errmsg').html ('');
   $ (qwiz_deck + ' span.confirm_email_address').removeClass ('qwiz_button_disabled');
   return false;
}
var update_email_data;
this.confirm_email = function (confirm_el, qname, i_qwiz) {
   if ($ (confirm_el).hasClass ('qwiz_button_disabled')) {
      return false;
   }
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   var email = $ (qwiz_deck + 'input.confirm_email_address').val ();
   if (email == '') {
      $ (qwiz_deck + ' div.update_email_errmsg').html ('Please enter email address');
      $ (confirm_el).addClass ('qwiz_button_disabled');
      return false;
   }
   if (email != document_qwiz_email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (! re.test (email)) {
         $ (qwiz_deck + ' div.update_email_errmsg').html ('Not a valid email address');
         $ (confirm_el).addClass ('qwiz_button_disabled');
      } else {
         update_email_data = {field:      'email',
                              value:      email,
                              callback:   'qwiz_qcards_common.update_email_callback'};
         $ (qwiz_deck + ' span.confirm_email_address').addClass ('qwiz_button_disabled');
         qqc.qjax (qname, i_qwiz, '', 'update_my_account', update_email_data);
      }
      return false;
   }
   qqc.confirm_email2 (qname, i_qwiz);
}
this.confirm_email2 = function (qname, i_qwiz) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   $ (qwiz_deck + ' .signup_confirm_email').css ({visibility: 'visible'});
   $ (qwiz_deck + ' input.signup_confirm_email').val ('').focus ();
   $ (qwiz_deck + ' input.sign_up').removeClass ('qwiz_button_disabled').removeAttr ('disabled');
   $ (qwiz_deck + ' div.signup_confirm_email_errmsg').hide ();
   var email_address = $ (qwiz_deck + ' input.confirm_email_address').val ();
   var email_confirm_data = {field:          'email_confirm',
                             value:          '',
                             email_address:  email_address,
                             username:       document_qwiz_username,
                             callback:       'qwiz_qcards_common.confirm_email_callback'};
   qqc.qjax (qname, i_qwiz, '', 'update_my_account', email_confirm_data);
}
this.confirm_email_callback = function (qname, i_qwiz, errmsg) {
   if (debug[0]) {
      console.log ('[confirm_email_callback] errmsg:', errmsg);
   }
   if (errmsg == 'need_password') {
      qqc.create_password_dialog (qname, i_qwiz);
      $dialog_current_password.dialog ('open');
   }
}
this.hide_current_password_errmsg = function () {
   $ ('#current_password_errmsg').html ('');
}
this.create_password_dialog = function (qname, i_qwiz) {
   var htm = [];
   htm.push ('<div id="dialog_current_password" title="Security check: re-enter password">');
   htm.push (   '<tr>');
   htm.push (      '<td>');
   htm.push (         'Password');
   htm.push (      '</td>');
   htm.push (      '<td>');
   htm.push (         '<input id="current_password" type="password" onfocus="qwiz_qcards_common.hide_current_password_errmsg ()" />');
   htm.push (         '<br />');
   htm.push (         '<div id="current_password_errmsg" class="qwiz_errmsg">');
   htm.push (         '</div>');
   htm.push (      '</td>');
   htm.push (   '</tr>');
   htm.push ('</div>');
   $ ('body').append (htm.join ('\n'));
   $dialog_current_password = $ ('#dialog_current_password').dialog ({
      autoOpen:      false,
      height:        200,
      width:         350,
      modal:         true,
      buttons:       {'Submit':     function () {
                                       qqc.update_session_id (qname, i_qwiz);
                                    },
                      'Cancel':     function () {
                                       $dialog_current_password.dialog ('close');
                                    }
                     }
   });
}
this.update_session_id = function (qname, i_qwiz) {
   var current_password = $ ('#current_password').val ();
   if (current_password == '') {
      $ ('#current_password_errmsg').html ('Please enter password');
      return;
   }
   update_email_data.sha3_current_password = CryptoJS.SHA3 (current_password).toString ();
   update_email_data.current_username      = document_qwiz_username;
   qqc.qjax (qname, i_qwiz, '', 'update_my_account', update_email_data);
}
this.create_enroll_screen = function (qname, i_qwiz) {
   var htm = [];
   htm.push ('<p style="font-weight: normal; text-align: left; margin: 0 0 0 10px;">');
   htm.push (   'You are currently registered as an &ldquo;independent student,&rdquo; not enrolled in a school or class.&nbsp;');
   htm.push (   'If you have a registration code you can join a class.&nbsp;');
   htm.push (   '<br />(Any work you have completed on quizzes and flashcard decks will be transferred to the teacher&rsquo;s gradebook.)');
   htm.push ('</p>');
   htm.push ('<table class="qwiz-border-none qwiz-padding" border="0" align="center"');
   htm.push (   '<tr>');
   htm.push (      '<td style="vertical-align: top;">');
   htm.push (         '<b>Registration code</b>');
   htm.push (      '</td>');
   htm.push (      '<td>');
   htm.push (         '<input type="text" class="enroll_screen_reg_code" style="padding: 2px;" onfocus="qwiz_qcards_common.hide_enroll_error ()" onkeydown="qwiz_qcards_common.enroll_registration_code_keydown (\'' + qname + '\', ' + i_qwiz + ');" />');
   htm.push (         '<div class="enroll_screen_reg_code_errmsg qwiz_errmsg"></div>');
   htm.push (         '<div class="enroll_screen_reg_code_class_name"></div>');
   htm.push (      '</td>');
   htm.push (   '</tr>');
   htm.push (   '<tr>');
   htm.push (      '<td>');
   htm.push (      '</td>');
   htm.push (      '<td>');
   htm.push (         '<button class="enroll_check_reg_code qwiz_button" onclick="qwiz_qcards_common.check_reg_code (\'' + qname + '\', ' + i_qwiz + ')">');
   htm.push (            'Check code');
   htm.push (         '</button>');
   htm.push (         '<button class="enroll_join_class qwiz_button" style="display: none;" onclick="qwiz_qcards_common.reset_independent_student (\'' + qname + '\', ' + i_qwiz + ')">');
   htm.push (            'Join class');
   htm.push (         '</button>');
   if (! plugin_url) {
      plugin_url = qqc.get_qwiz_param ('url', './');
   }
   htm.push (         '<img class="enroll_spinner" style="display: none;" src="' + plugin_url + 'images/spinner16x16.gif" />');
   htm.push (      '</td>');
   htm.push (   '</tr>');
   htm.push ('</table>');
   htm.push ('<div style="text-align: right; padding-right: 10px;">');
   htm.push (   '<button class="qwiz-smaller" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true)">');
   htm.push (      'Cancel');
   htm.push (   '</button>');
   htm.push ('</div>');
   const $enroll_screen_div = qqc.$get_login_div (qname, i_qwiz);
   $enroll_screen_div.html (htm.join ('\n')).show ();
}
this.create_refresh_page_notice = function (qname, i_qwiz) {
   const htm = `
            <div class="qwiz-center">
               <br />
               <br />
               <p>
                  <b>Score-recording authentication expired.
                  <br />
                  Please re-load this page to continue</b>
               </p>
            </div>
         `;
   const $login_screen_div = qqc.$get_login_div (qname, i_qwiz);
   $login_screen_div.html (htm).show ();
}
this.check_reg_code = function (qname, i_qwiz) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   var reg_code = $ (qwiz_deck + 'input.enroll_screen_reg_code').val ();
   if (reg_code != '') {
      $ ('.enroll_spinner').show ();
      var data = {reg_code: reg_code, js_f: 1};
      qqc.qjax (qname, i_qwiz, '', 'check_reg_code', data);
   }
   return false;
}
var enroll_reg_code_ok_f;
var enroll_reg_code_school_id;
var enroll_reg_code_school_name;
var enroll_reg_code_class_id;
var enroll_reg_code_class_name;
this.reg_code_ok_or_no = function (data) {
   if (debug[0]) {
      console.log ('[reg_code_ok_or_no] data:', data);
   }
   var qwiz_deck = qwiz_deck_selector (data.qname, data.i_qwiz);
   $ (qwiz_deck + '.enroll_spinner').hide ();
   enroll_reg_code_ok_f = data.num_rows == 1;
   if (enroll_reg_code_ok_f) {
      enroll_reg_code_school_id   = data.school_id;
      enroll_reg_code_school_name = data.school_name;
      enroll_reg_code_class_id    = data.class_id;
      enroll_reg_code_class_name  = data.class_name;
      $ (qwiz_deck + 'div.enroll_screen_reg_code_class_name').html ('<b>Registration for class ' + data.class_name + ', ' + data.school_name + '</b>').show ();
      $ (qwiz_deck + 'button.enroll_check_reg_code').hide ();
      $ (qwiz_deck + 'button.enroll_join_class').show ();
   } else {
      $ (qwiz_deck + 'div.enroll_screen_reg_code_errmsg').html ('Could not find registration code').show ();
      $ (qwiz_deck + 'div.enroll_screen_reg_code_class_name').html ('').hide ();
   }
}
this.hide_enroll_error = function () {
   $ ('div.enroll_screen_reg_code_errmsg').html ('').hide ();
}
this.enroll_registration_code_keydown = function (qname, i_qwiz) {
   if (debug[0]) {
      console.log ('[enroll_registration_code_keydown] enroll_reg_code_ok_f:', enroll_reg_code_ok_f);
   }
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   if (enroll_reg_code_ok_f) {
      $ (qwiz_deck + 'button.enroll_join_class').hide ();
      $ (qwiz_deck + 'button.enroll_check_reg_code').show ();
   } else {
      $ (qwiz_deck + 'div.enroll_screen_reg_code_errmsg').html ('').hide ();
      $ (qwiz_deck + 'div.enroll_screen_reg_code_class_name').html ('').hide ();
   }
}
this.reset_independent_student = function (qname, i_qwiz) {
   if (debug[0]) {
      console.log ('[reset_independent_student]');
   }
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   if ($ (qwiz_deck + 'input.enroll_screen_reg_code').val () == '') {
      $ ('div.enroll_screen_reg_code_errmsg').html ('Please enter registration code').show ();
      return false;
   }
   $ (qwiz_deck + '.enroll_spinner').show ();
   var data = {jjax:       1,
               school_id:  enroll_reg_code_school_id,
               class_id:   enroll_reg_code_class_id,
               taker_id:   document_qwiz_taker_id}
   qqc.qjax (qname, i_qwiz, '', 'reset_independent_student', data);
   return false;
}
this.reset_independent_student_callback = function (data) {
   if (debug[0]) {
      console.log ('[reset_independent_student_callback] data:', data);
   }
   if (data.errmsg == 'ok') {
      data.jjax = 1;
      qqc.qjax (data.qname, data.i_qwiz, '', 'add_to_class', data);
   } else {
      var htm = [];
      htm.push ('<br /><p><b>Sorry, unable to reset status</b></p>');
      htm.push ('<button class="qwiz_button" onclick="' + data.qname + '.no_login (' + data.i_qwiz + ', false, true, event)">');
      htm.push (   'Continue');
      htm.push ('</button>');
      htm = htm.join ('\n');
      var $enroll_screen_div = qqc.$get_login_div (data.qname, data.i_qwiz);
      $enroll_screen_div.html (htm).show ();
   }
}
this.add_to_class_callback = function (data) {
   if (debug[0]) {
      console.log ('[add_to_class_callback] data:', data);
   }
   var qwiz_deck = qwiz_deck_selector (data.qname, data.i_qwiz);
   $ (qwiz_deck + '.enroll_spinner').hide ();
   var htm = [];
   if (data.errmsg == 'ok') {
      document_qwiz_school_id = enroll_reg_code_school_id;
      document_qwiz_class_id  = enroll_reg_code_class_id;
      document_qwiz_independent_taker_f = false;
      qqc.set_user_menus_and_icons ();
      htm.push ('<br /><p><b>You are now enrolled in ' + enroll_reg_code_class_name + ', ' + enroll_reg_code_school_name + '</b></p>');
   } else {
      htm.push ('<br /><p><b>Sorry, unable to reset status</b></p>');
   }
   htm.push ('<button class="qwiz_button" onclick="' + data.qname + '.no_login (' + data.i_qwiz + ', false, true, event)">');
   htm.push (   'Continue');
   htm.push ('</button>');
   htm = htm.join ('\n');
   var $enroll_screen_div = qqc.$get_login_div (data.qname, data.i_qwiz);
   $enroll_screen_div.html (htm).show ();
}
this.create_provide_feedback_screen = function (qname, i_qwiz, i_question) {
   var htm = [];
   htm.push ('<div style="margin-top: 5px">');
   htm.push (   '<b>Feedback - bugs, errors, suggestions...?</b>');
   htm.push ('</div>');
   htm.push ('<div class="qwiz-normal qwiz-smaller">');
   htm.push (   'Feel free to copy and paste, including screenshots!');
   htm.push ('</div>');
   var style;
   var qwiz_qdeck;
   if (qname == 'qcard_') {
      var $qcard_card = $ ('div.qcard_card-qdeck' + i_qwiz);
      var width  = $qcard_card.width () - 16;
      var height = $qcard_card.height () * 0.62;
      style = ' style="width: ' + parseInt (width) + 'px; height: ' + parseInt (height) + 'px;"';
      qwiz_qdeck = 'div.qcard_card-qdeck' + i_qwiz;
   } else {
      style = ' style="min-height: 175px;"';
      qwiz_qdeck = 'div#qwiz' + i_qwiz;
   }
   htm.push ('<div class="qwiz-provide_feedback"' + style + ' contenteditable="true">');
   if (provide_feedback_html[qwiz_qdeck]) {
      htm.push (provide_feedback_html[qwiz_qdeck]);
   }
   htm.push ('</div>');
   htm.push ('<div class="qwiz-normal qwiz-smaller" style="text-align: left;">');
   htm.push (   'From: ' + document_qwiz_username);
   htm.push ('</div>');
   htm.push ('<div>');
   htm.push (   '<button class="qwiz_button" onclick="qwiz_qcards_common.submit_feedback (\'' + qname + '\', ' + i_qwiz + ', ' + i_question + ')">');
   htm.push (      'Submit');
   htm.push (   '</button>');
   htm.push (   '&emsp;');
   htm.push (   '<button class="qwiz_button_small qwiz-b_and_w" onclick="qwiz_qcards_common.cancel_provide_feedback (\'' + qname + '\', ' + i_qwiz + ')">');
   htm.push (      'Back');
   htm.push (   '</button>');
   htm.push (   '<span class="qwiz-smaller qwiz-normal">');
   htm.push (      '(you can return to complete your comments)');
   htm.push (   '</span>');
   htm.push ('</div>');
   var $feedback_screen_div = qqc.$get_login_div (qname, i_qwiz);
   $feedback_screen_div.html (htm.join ('\n')).show ();
   var isChrome = false; //DKTMP /Chrome/.test (navigator.userAgent) && /Google Inc/.test (navigator.vendor) && ! /CrOS/.test (navigator.userAgent);
   if (isChrome) {
      $ ('div.qwiz-provide_feedback').on ('paste', function (event) {
         var feedback_el = this;
         var items = (event.clipboardData || event.originalEvent.clipboardData).items;
         var n_items = items.length;
         var blob = null;
         for (var i=0; i<n_items; i++) {
            if (items[i].type.indexOf ('image') === 0) {
               blob = items[i].getAsFile ();
            }
         }
         if (blob !== null) {
            var reader = new FileReader();
            reader.onload = function (event) {
               var image = new Image ();
               image.src = event.target.result;
               image.onload = function () {
                  var range = window.getSelection ().getRangeAt (0);
                  if (range) {
                     range.deleteContents ();
                     range.insertNode (image);
                     window.getSelection ().removeAllRanges ();
                  } else {
                     feedback_el.appendChild (image)
                  }
                  resize_feedback_images (feedback_el);
               }
            }
            reader.readAsDataURL (blob);
         }
      });
   } else {
      $ ('div.qwiz-provide_feedback').on ('paste', function (event) {
         var feedback_el = this;
         var delay_set = function () {
            resize_feedback_images (feedback_el);
         }
         setTimeout (delay_set, 100);
      });
   }
}
function resize_feedback_images (feedback_el) {
   $ (feedback_el).find ('img').each (function () {
      if (! this.qwiz_sizing) {
         var $this = $ (this);
         var container_width = parseInt ($this.parents ('div.qwiz-provide_feedback').width ());
         var img_width       = parseInt ($this.width ());
         if (debug[0]) {
            console.log ('[resize_feedback_images] img_width:', img_width, ', container_width:', container_width);
         }
         var scale_fac;
         if (img_width == container_width) {
            scale_fac = 1.0;
         } else {
            scale_fac = 1.0 / window.devicePixelRatio;
         }
         var new_width  = parseInt (img_width       * scale_fac);
         var new_height = parseInt ($this.height () * scale_fac);
         $this.css ({cssText: 'border:  1px solid gray !important',
                     width:   new_width + 'px',
                     height:  new_height + 'px',
                     margin:  '0 5px 5px 0',
                     float:   'left'
                    });
         this.qwiz_sizing = 1;
      }
   });
}
this.submit_feedback = function (qname, i_qwiz, i_question) {
   var qwiz_qcard;
   var get_qwiz_deckdata;
   if (qname == 'qwiz_') {
      qwiz_qcard  = 'div#qwiz' + i_qwiz;
   } else {
      qwiz_qcard  = 'div.qcard_card-qdeck' + i_qwiz;
   }
   var $provide_feedback = $ (qwiz_qcard + ' div.qwiz-provide_feedback');
   var feedback_html = $provide_feedback.html ();
   if (feedback_html.indexOf ('<img') != -1) {
      var matches = feedback_html.match (/<img src="blob:[^"]+/g);
      if (matches) {
         global_blob_urls = [];
         global_data_urls = [];
         var n_matches = matches.length;
         for (var i=0; i<n_matches; i++) {
            var taglen = matches[i].length;
            global_blob_urls.push (matches[i].substr (10));
         }
         qqc.get_blobs_as_data_urls (qname, i_qwiz, i_question, n_matches,
                                     feedback_html, matches);
      } else {
         submit_feedback2 (qname, i_qwiz, i_question, feedback_html);
      }
   } else {
      if (qqc.is_only_tags_and_whitespace (feedback_html)) {
         return false;
      }
      submit_feedback2 (qname, i_qwiz, i_question, feedback_html);
   }
}
this.remove_empty_opening_tags = function (htm) {
   htm = htm.replace (/^\s*<(p|h\d)>\s*<\/(p|h\d)>/, '');
   return htm;
}
this.is_only_tags_and_whitespace = function (htm) {
   var htm = qqc.remove_tags_eols (htm, true);
   htm = htm.replace (/&nbsp;|&ensp;|&emsp;|&thinsp;|&hairsp;/, '');
   const no_non_whitespace = htm.search (/\S/) == -1;
   return no_non_whitespace;
}
function submit_feedback2 (qname, i_qwiz, i_question, feedback_html, matches) {
   if (matches) {
      if (debug[0]) {
         console.log ('[submit_feedback2] global_data_urls[0].substr (0, 50):', global_data_urls[0].substr (0, 50));
      }
      var n_matches = matches.length;
      for (var i=0; i<n_matches; i++) {
         feedback_html = feedback_html.replace (matches[i], '<img src="' + global_data_urls[i]);
      }
      if (debug[0]) {
         console.log ('[submit_feedback2] feedback_html.length:', feedback_html.length);
      }
   }
   var qwiz_qcard;
   var qwiz_qdeck;
   var get_qwiz_deckdata;
   var header_html;
   if (qname == 'qwiz_') {
      qwiz_qcard  = 'div#qwiz' + i_qwiz;
      qwiz_qdeck  = 'qwiz';
      get_qwiz_deckdata = qwiz_.get_qwizdata;
      header_html = $ ('div.header-qwiz' + i_qwiz).html ();
   } else {
      qwiz_qcard  = 'div.qcard_card-qdeck' + i_qwiz;
      qwiz_qdeck  = 'qdeck';
      get_qwiz_deckdata = qcard_.get_deckdata;
      header_html       = $ ('div#qcard_header-qdeck' + i_qwiz).html ();
   }
   provide_feedback_html[qwiz_qcard] = feedback_html;
   if (feedback_html.length > 25.0e6) {
      alert ('Sorry, your feedback is too big (large images). Please use smaller/fewer images.');
      return false;
   }
   var qrecord_id = get_qwiz_deckdata (i_qwiz, 'qrecord_id');
   var maker_id = document_qwiz_qdeck_maker_ids[qwiz_qdeck + i_qwiz];
   var page_url = window.location.href;
   var data = {feedback_html:    feedback_html,
               page_url:         page_url,
               user_agent:       navigator.userAgent,
               qwiz_qcard:       qwiz_qcard,
               qname:            qname,
               header_html:      header_html,
               i_qwiz:           i_qwiz,
               i_question:       i_question,
               maker_id:         maker_id,
               taker_username:   document_qwiz_username,
               taker_email:      document_qwiz_email}
   qqc.jjax (qname, i_qwiz, qrecord_id, 'receive_feedback', data);
}
var global_data_urls;
var global_blob_urls;
this.get_blobs_as_data_urls = function (qname, i_qwiz, i_question, i_do,
                                                       feedback_html, matches) {
   i_do--;
   var xhr = new XMLHttpRequest;
   xhr.responseType = 'blob';
   xhr.onload = function () {
      var recoveredBlob = xhr.response;
      var reader = new FileReader;
      reader.onload = function () {
         if (debug[0]) {
            console.log ('[get_blobs_as_data_urls] i_do:', i_do, ', reader.result.length:', reader.result.length);
         }
         global_data_urls.push (reader.result);
         if (i_do == 0) {
            submit_feedback2 (qname, i_qwiz, i_question, feedback_html, matches);
         } else {
            qqc.get_blobs_as_data_urls (qname, i_qwiz, i_question, i_do,
                                        feedback_html, matches);
         }
      };
      reader.readAsDataURL (recoveredBlob);
   };
   xhr.open ('GET', global_blob_urls[i_do]);
   xhr.send ();
}
this.blob_data = {};
this.get_blob_as_data_url = function (index, imageUrl) {
   if (debug[0]) {
      console.log ('[get_blob_as_data_url] imageUrl:', imageUrl);
   }
   const reader = new FileReader ();
   reader.onloadend = () => {
      const base64data = reader.result;
      if (debug[0]) {
         console.log ('[get_blob_as_data_url] base64data.length:', base64data.length);
         console.log ('[get_blob_as_data_url] base64data.substr (0, 50):', base64data.substr (0, 50));
      }
      qqc.blob_data[index] = base64data;
   }
   (async () => {
      const response = await fetch (imageUrl)
      const imageBlob = await response.blob ()
      reader.readAsDataURL (imageBlob);
   })()
}
this.submit_feedback_callback = function (qname, i_qwiz, qwiz_qcard, ok_f, errmsg) {
   var htm = [];
   htm.push ('<p>');
   htm.push (   '<b>' + errmsg + '</b>');
   htm.push ('</p>');
   if (ok_f) {
      provide_feedback_html[qwiz_qcard] = '';
      htm.push (   '<button class="qwiz_button" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true)">');
      htm.push (      'Continue');
      htm.push (   '</button>');
   } else {
      htm.push (   '<button class="qwiz-smaller" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true)">');
      htm.push (      'Back');
      htm.push (   '</button>');
   }
   var $feedback_screen_div = qqc.$get_login_div (qname, i_qwiz);
   $feedback_screen_div.html (htm.join ('\n')).show ();
}
this.cancel_provide_feedback = function (qname, i_qwiz) {
   var qwiz_qdeck;
   if (qname == 'qwiz_') {
      qwiz_qdeck = 'div#qwiz' + i_qwiz;
   } else {
      qwiz_qdeck = 'div.qcard_card-qdeck' + i_qwiz;
   }
   var $provide_feedback = $ (qwiz_qdeck + ' div.qwiz-provide_feedback');
   provide_feedback_html[qwiz_qdeck] = $provide_feedback.html ();
   if (provide_feedback_html[qwiz_qdeck].length > 20.0e6) {
      alert ('Please note: the images in your feedback are large. You may want to submit your comments so far before adding more images.');
   }
   var qwiz_qcard_ = qname == 'qwiz_' ? qwiz_ : qcard_;
   qwiz_qcard_.no_login (i_qwiz, false, true);
}
this.preview_iframe_close = function () {
   $ ('div#preview_iframe_wrapper').remove ();
}
this.init_hide_show_password = function (selector) {
   $ (selector).hidePassword (true, {
      states: {
         shown: {
            toggle: {className: 'qwiz-hideShowPassword-toggle-hide'}
         },
         hidden: {
            toggle: {className: 'qwiz-hideShowPassword-toggle-show'}
         }
      }
   });
}
this.create_register_taker_screen = function (qname, i_qwiz, proceed_to_pay,
                                                                          msg) {
   register_taker_global_reg_code_ok_f     = false;
   register_taker_global_username          = '';
   register_taker_global_first_name        = '';
   register_taker_global_last_name         = '';
   register_taker_global_sha3_password     = '';
   register_taker_global_username_unique_f = false;
   register_taker_global_email_unique_f    = false;
   var display_pay_screen = set_display_pay_screen (qname, i_qwiz);
   var htm = [];
   var trial_pay = '';
   if (msg) {
      htm.push (msg + '<br />');
      if (/free/.test (msg)) {
         trial_pay = 'free';
      }
   }
   htm.push ('<form name="register_taker_' + qname + i_qwiz + '" action="nada.php" onSubmit="return qwiz_qcards_common.register_taker (\'' + qname + '\',' + i_qwiz + ', ' + proceed_to_pay + ')">');
   htm.push (   '<table class="register_taker">');
   if (   display_pay_screen != 'subscribe'
                     && display_pay_screen != 'free_trial'
                                     && display_pay_screen != 'special_offer') {
      htm.push (   '<tr>');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td colspan="2" class="register_taker_if_your_teacher" style="white-space: nowrap; font-weight: normal;">');
      if (display_pay_screen == 'signup') {
         htm.push (      '<i>Please enter the registration code you received');
         htm.push (      'from Mr. W on TikTok, Youtube, etc.');
      } else if (display_pay_screen != 'free_trial'
                                     && display_pay_screen != 'special_offer') {
         htm.push (      '<i>Enter the registration code that your teacher gave you</i>');
         htm.push (      '<br />');
         htm.push (      '(Not in a class?&nbsp;Go');
         htm.push (      '<a href="https://learn-biology.com/signupforafreetrial">');
         htm.push (         'here</a>)');
      }
      htm.push (      '</td>');
      htm.push (   '</tr>');
      htm.push (   '<tr>');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td>');
      htm.push (         '<label for="reg_code">');
      htm.push (            'Registration code');
      htm.push (         '</label>');
      htm.push (      '</td>');
      htm.push (      '<td>');
      htm.push (         '<input type="text" class="register_taker_reg_code" onchange="qwiz_qcards_common.register_taker_check_reg_code (\'' + qname + '\', ' + i_qwiz + ', this.value)" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);"> <span class="qwiz-required">*</span>');
      htm.push (         '<div class="register_taker_reg_code_errmsg qwiz_errmsg"></div>');
      htm.push (         '<div class="register_taker_reg_code_class_name"></div>');
      htm.push (      '</td>');
      htm.push (   '</tr>');
      htm.push (   '<tr class="register_taker_please_continue_below">');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td colspan="2" style="font-weight: normal;">');
      if (display_pay_screen == 'signup') {
         htm.push (      '<i>Please provide the following information.&nbsp;');
      } else {
      }
      htm.push (      '</td>');
      htm.push (   '</tr>');
   }
   htm.push (      '<tr class="register_taker_login_name_exists">');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td colspan="2">');
   htm.push (            '<i>This login name exists.');
   htm.push (            'Either log in or choose another name</i>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr>');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="username">');
   htm.push (               'Login name');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="text" class="register_taker_username" onchange="qwiz_qcards_common.register_taker_check_unique (\'' + qname + '\', ' + i_qwiz + ', \'username\')" onblur="qwiz_qcards_common.register_taker_check_unique (\'' + qname + '\', ' + i_qwiz + ', \'username\')" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required">*</span>');
   htm.push (            '<div class="register_taker_username_errmsg qwiz_errmsg"></div>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr class="register_taker_first_name_last_name">');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="first_name">');
   htm.push (               'First name');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="text" class="register_taker_first_name" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required">*</span>');
   htm.push (            '<div class="register_taker_first_name_errmsg qwiz_errmsg"></div>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr class="register_taker_first_name_last_name">');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="last_name">');
   htm.push (               'Last name');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="text" class="register_taker_last_name" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required">*</span>');
   htm.push (            '<div class="register_taker_last_name_errmsg qwiz_errmsg"></div>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr>');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="password">');
   htm.push (               'Password');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="password" class="register_taker_password" onchange="qwiz_qcards_common.register_taker_check_password_match (\'' + qname + '\', ' + i_qwiz + ')" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required">*</span>');
   htm.push (            '<div class="register_taker_password_errmsg register_taker_confirm_password_errmsg qwiz_errmsg"></div>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr class="register_taker_confirm_password register_taker_confirm_password_email">');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="confirm_password">');
   htm.push (               'Confirm&nbsp;password');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="password" class="register_taker_confirm_password" onchange="qwiz_qcards_common.register_taker_check_password_match (\'' + qname + '\', ' + i_qwiz + ')" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required">*</span>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr class="register_taker_email register_taker_confirm_password_email">');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<label for="email">');
   htm.push (               'Email');
   htm.push (            '</label>');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<input type="text" class="register_taker_email" onchange="qwiz_qcards_common.register_taker_validate_email (\'' + qname + '\', ' + i_qwiz + ', \'\', true)" onfocus="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this);" /> <span class="qwiz-required register_taker_email_required">*</span>');
   htm.push (            '<div class="register_taker_email_errmsg qwiz_errmsg"></div>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   if (display_pay_screen != 'subscribe' && display_pay_screen != 'signup'
                      && display_pay_screen != 'free_trial'
                                     && display_pay_screen != 'special_offer') {
      htm.push (   '<tr class="register_taker_email register_taker_confirm_password_email">');
      htm.push (      '<td>');
      htm.push (      '</td>');
      htm.push (      '<td colspan="2" style="line-height: 1;">');
      htm.push (         '<span class="qwiz-smaller qwiz-normal">');
      htm.push (            'Your email address is required since you haven&rsquo;t entered a registration code for a class.&nbsp;');
      htm.push (            'Your email is used for password reset.&nbsp; ');
      if (trial_pay == 'free') {
         htm.push (         'We will encourage you to upgrade; you will have an option to unsubscribe.');
      }
      htm.push (         '</span>');
      htm.push (      '</td>');
      htm.push (   '</tr>');
   }
   /*
   if (! proceed_to_pay) {
      var any_taker_options_free_b;
      if (qname == 'qwiz_') {
         any_taker_options_free_b = qwiz_.get_qwizdata (i_qwiz, 'any_taker_options_free_b');
      } else {
         any_taker_options_free_b = qcard_.get_deckdata (i_qwiz, 'any_taker_options_free_b');
      }
      if (any_taker_options_free_b) {
         htm.push ('<tr class="free_trial_yes_no">');
         htm.push (   '<td>');
         htm.push (   '</td>');
         htm.push (   '<td>');
         htm.push (      'Free trial sign-up');
         htm.push (   '</td>');
         htm.push (   '<td>');
         htm.push (      '<input type="radio" name="free_trial_' + qname + i_qwiz + '" class="qwiz_free_trial_yes_no" onclick="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this)" value="Yes" />');
         htm.push (      'Yes');
         htm.push (      '&nbsp;&nbsp;');
         htm.push (      '<input type="radio" name="free_trial_' + qname + i_qwiz + '" class="qwiz_free_trial_yes_no" onclick="qwiz_qcards_common.register_taker_hide_error (\'' + qname + '\', ' + i_qwiz + ', this)" value="No" />');
         htm.push (      'No &nbsp; <span class="qwiz-required">*</span>');
         htm.push (      '<div class="qwiz_free_trial_yes_no_errmsg qwiz_errmsg"></div>');
         htm.push (   '</td>');
         htm.push ('</tr>');
      }
   }
   */
   htm.push (       '</tr>');
   htm.push (         '<td colspan="2">');
   htm.push (         '</td>');
   htm.push (         '<td>');
   htm.push (            '<span style="float: right;">');
   htm.push (               '<span class="qwiz_button" style="font-size: 9pt !important;" onclick="' + qname + '.no_login (' + i_qwiz + ', false, true, event)">');
   htm.push (                  'Cancel');
   htm.push (               '</span>');
   htm.push (               '&emsp;');
   htm.push (               '<span class="qwiz-required ">*</span>');
   htm.push (               '<span class="qwiz-smaller">required</span>');
   htm.push (            '</span>');
   htm.push (            '<button type="submit" class="qwiz_button">');
   htm.push (               '<span class="register_taker_login" style="font-size: 12pt !important;">');
   htm.push (                  'Register');
   htm.push (               '</span>');
   htm.push (            '</button>');
   htm.push (            '<br />');
   htm.push (            '<span class="register_taker_forgot_password">');
   if (server_loc == 'not ready') {
      secure_server_loc = qqc.get_qwiz_param ('secure_server_loc', 'https://host359.hostmonster.com/~whereisq/qwiz/admin');
   }
   htm.push (               '<a href="' + secure_server_loc + '/password_reset_request" target="_blank">');
   htm.push (                  'Forgot password?</a>');
   htm.push (            '</span>');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (      '<tr>');
   htm.push (         '<td>');
   htm.push (         '</td>');
   htm.push (         '<td colspan="2" class="register_taker_errmsg qwiz_errmsg">');
   htm.push (         '</td>');
   htm.push (      '</tr>');
   htm.push (   '</table>');
   htm.push ('</form>');
   var $register_taker_screen_div = qqc.$get_login_div (qname, i_qwiz);
   $register_taker_screen_div.html (htm.join ('\n')).show ();
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   qqc.init_hide_show_password (qwiz_deck + 'input.register_taker_password');
   qqc.init_hide_show_password (qwiz_deck + 'input.register_taker_confirm_password');
   if (display_pay_screen == 'subscribe'
                     || display_pay_screen == 'free_trial'
                                     || display_pay_screen == 'special_offer') {
      $ (qwiz_deck + '.register_taker_email').show ();
      $ (qwiz_deck + '.register_taker_username').val ('').focus ();
   } else if (display_pay_screen == 'signup') {
      $ (qwiz_deck + '.register_taker_email').show ();
      $ (qwiz_deck + '.register_taker_reg_code').val ('').focus ();
   } else {
      $ (qwiz_deck + '.register_taker_reg_code').val ('').focus ();
   }
}
function qwiz_deck_selector (qname, i_qwiz) {
   var qwiz_deck = qname == 'qwiz_' ? 'div#qwiz' + i_qwiz : 'div.qcard_card-qdeck' + i_qwiz;
   return qwiz_deck + ' ';
}
this.register_taker_check_password_match = function (qname, i_qwiz) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   $ (qwiz_deck + '.register_taker_password_errmsg').hide ();
   var confirm_password = $ (qwiz_deck + 'input.register_taker_confirm_password').val ();
   if (confirm_password != '') {
      var password         = $ (qwiz_deck + '.register_taker_password').val ();
      if (password != '') {
         if (password != confirm_password) {
            $ (qwiz_deck + '.register_taker_password_errmsg').html ('Password and Confirm password do not match').show ();
         }
      }
   }
}
this.register_taker_check_reg_code = function (qname, i_qwiz, reg_code) {
   if (reg_code == '') {
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
      $ (qwiz_deck + 'tr.register_taker_first_name_last_name').show ();
      $ (qwiz_deck + '.register_taker_reg_code_class_name').html ('').hide ();
      $ (qwiz_deck + '.register_taker_login_name_exists,' + qwiz_deck + '  .register_taker_forgot_password').hide ();
      $ (qwiz_deck + 'span.register_taker_login').html ('Register');
      $ (qwiz_deck + 'tr.register_taker_confirm_password_email').show ();
      $ (qwiz_deck + 'tr.register_taker_please_continue_below').show ();
      $ (qwiz_deck + '.register_taker_email_required, ' + qwiz_deck + '.register_taker_email').show ();
      register_taker_global_reg_code_ok_f = false;
      qqc.register_taker_check_unique (qname, i_qwiz, 'username');
   } else {
      var data = {reg_code:   reg_code,
                  callback:   'register_taker_reg_code_ok_or_no'};
      register_taker_global_in_process_b = true;
      qqc.qjax (qname, i_qwiz, '', 'check_reg_code', data);
   }
   return false;
}
function set_display_pay_screen (qname, i_qwiz_deck) {
   var display_pay_screen = '';
   if (document_qwiz_login_alt_free_trial) {
      display_pay_screen = 'free_trial';
   } else {
      if (qname == 'qwiz_') {
         display_pay_screen = qwiz_.get_qwizdata (i_qwiz_deck, 'display_pay_screen');
      }
   }
   return display_pay_screen;
}
this.set_immediate_payment = function (qname, i_qwiz_deck) {
   var immediate_payment = false;
   if (typeof document_qwiz_immediate_payment == 'undefined') {
      const no_free_trial_beg_mm_dd = '04-16';
      const no_free_trial_end_mm_dd = '06-01';
      const today_mm_dd = DateFormat.format.date (new Date ().getTime (), 'MM-dd');
      if (today_mm_dd >= no_free_trial_beg_mm_dd
                                       && today_mm_dd < no_free_trial_end_mm_dd) {
         immediate_payment = true;
      } else {
         if (qname == 'qwiz_') {
            immediate_payment = qwiz_.get_qwizdata (i_qwiz_deck, 'immediate_payment');
         }
      }
      document_qwiz_immediate_payment = immediate_payment;
   } else {
      immediate_payment = document_qwiz_immediate_payment;
   }
   return immediate_payment;
}
this.register_taker_reg_code_ok_or_no = function (data) {
   if (debug[0]) {
      console.log ('[register_taker_reg_code_ok_or_no] data:', data);
   }
   register_taker_global_reg_code_ok_f = data.num_rows == 1;
   var qwiz_deck = qwiz_deck_selector (data.qname, data.i_qwiz);
   if (register_taker_global_reg_code_ok_f) {
      $ (qwiz_deck + '.register_taker_if_your_teacher').hide ();
      $ (qwiz_deck + 'tr.register_taker_please_continue_below').hide ();
      $ (qwiz_deck + 'tr.register_taker_first_name_last_name').show ();
      var display_pay_screen = set_display_pay_screen (data.i_qwiz);
      if (data.qname == 'qwiz_') {
         display_pay_screen = qwiz_.get_qwizdata (data.i_qwiz, 'display_pay_screen');
      }
      if (display_pay_screen != 'signup') {
         $ (qwiz_deck + '.register_taker_email_required, ' + qwiz_deck + '.register_taker_email').hide ();
      }
      register_taker_global_reg_code_maker_id    = data.maker_id;
      register_taker_global_reg_code_school_id   = data.school_id;
      register_taker_global_reg_code_class_id    = data.class_id;
      register_taker_global_reg_code_class_name  = data.class_name;
      register_taker_global_reg_code_school_name = data.school_name;
      $ (qwiz_deck + '.register_taker_reg_code_class_name').html ('<b>Registration for class ' + register_taker_global_reg_code_class_name + ', ' + register_taker_global_reg_code_school_name + '</b>').show ();
   } else {
      $ (qwiz_deck + '.register_taker_reg_code_errmsg').html ('Could not find registration code').show ();
      $ (qwiz_deck + '.register_taker_reg_code_class_name').html ('').hide ();
   }
   register_taker_global_in_process_b = false;
}
this.register_taker_check_unique = function (qname, i_qwiz, field) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   var value = $ (qwiz_deck + 'input.register_taker_' + field).val ();
   if (value != '') {
      if (field == 'username') {
         if (/["\\;]/.test (value)) {
            $ (qwiz_deck + '.register_taker_username_errmsg').html ('Invalid characters').show ();
            return false;
         }
      }
      var data = {field:      field,
                  value:      value,
                  callback:   'register_taker_unique_or_no'};
      register_taker_global_in_process_b = true;
      qqc.qjax (qname, i_qwiz, '', 'check_taker_name_email_unique', data);
   }
   return false;
}
this.register_taker_unique_or_no = function (data) {
   if (debug[0]) {
      console.log ('[register_taker_unique_or_no] data:', data);
   }
   var qwiz_deck = qwiz_deck_selector (data.qname, data.i_qwiz);
   var field    = data.field;
   var unique_f = data.unique_f;
   if (field == 'username') {
      register_taker_global_username_unique_f = unique_f;
      if (unique_f == 0) {
         if (debug[0]) {
            console.log ('[register_taker_unique_or_no] "username already in use"');
         }
         var display_pay_screen = '';
         if (data.qname == 'qwiz_') {
            display_pay_screen = qwiz_.get_qwizdata (data.i_qwiz, 'display_pay_screen');
         }
         register_taker_display_pay_screen
            = display_pay_screen
                && (   (   display_pay_screen != 'free_trial'
                        && display_pay_screen != 'special_offer')
                    || qqc.set_immediate_payment (data.qname, data.i_qwiz));
         if (register_taker_global_reg_code_ok_f
                                         || register_taker_display_pay_screen) {
            $ (qwiz_deck + 'tr.register_taker_confirm_password_email, ' + qwiz_deck + 'tr.register_taker_first_name_last_name').hide ();
            $ (qwiz_deck + '.register_taker_login_name_exists, ' + qwiz_deck + '.register_taker_forgot_password').show ();
            $ (qwiz_deck + 'span.register_taker_login').html ('Log in');
            $ (qwiz_deck + '.register_taker_password').focus ();
         } else {
            $ (qwiz_deck + '.register_taker_username_errmsg').html ('Login name already in use').show ();
            $ (qwiz_deck + '.register_taker_login_name_exists, ' + qwiz_deck + '.register_taker_forgot_password').hide ();
            $ (qwiz_deck + 'span.register_taker_login').html ('Register');
            $ (qwiz_deck + 'tr.register_taker_confirm_password_email').show ();
         }
      } else {
         $ (qwiz_deck + 'span.register_taker_login').html ('Register');
         $ (qwiz_deck + 'tr.register_taker_first_name_last_name').show ();
         $ (qwiz_deck + '.register_taker_login_name_exists, ' + qwiz_deck + '.register_taker_forgot_password').hide ();
         if (register_taker_global_reg_code_ok_f
                                         || register_taker_display_pay_screen) {
            if (register_taker_display_pay_screen == 'signup') {
               $ (qwiz_deck + 'tr.register_taker_confirm_password_email').show ();
            } else if (register_taker_display_pay_screen == 'register'
                                     && ! register_taker_global_reg_code_ok_f) {
               $ (qwiz_deck + 'tr.register_taker_confirm_password_email').show ();
            } else {
               $ (qwiz_deck + 'tr.register_taker_confirm_password').show ();
            }
         } else {
            $ (qwiz_deck + 'tr.register_taker_confirm_password_email').show ();
         }
         $ (qwiz_deck + '.register_taker_first_name').focus ();
      }
   } else {
      register_taker_global_email_unique_f = unique_f;
      if (unique_f == 0) {
         if (debug[0]) {
            console.log ('[register_taker_unique_or_no] "email already in use"');
         }
         $ (qwiz_deck + '.register_taker_email_errmsg').html ('Email already in use').show ();
      }
   }
   register_taker_global_in_process_b = false;
}
this.register_taker = function (qname, i_qwiz, proceed_to_pay) {
   if (debug[0]) {
      console.log ('[register_taker] register_taker_global_in_process_b:', register_taker_global_in_process_b);
   }
   var n_tries = 0;
   var delay_register_taker = function () {
      if (register_taker_global_in_process_b) {
         if (debug[0]) {
            console.log ('[delay_register_taker] n_tries:', n_tries);
         }
         if (n_tries > 40) {
            alert ('Sorry, unable to process request');
            return false;
         } else {
            n_tries++;
            setTimeout (delay_register_taker, 250);
         }
      } else {
         qqc.register_taker2 (qname, i_qwiz, proceed_to_pay);
      }
   }
   setTimeout (delay_register_taker, 250);
   return false;
}
this.register_taker2 = function (qname, i_qwiz, proceed_to_pay) {
   if (debug[0]) {
      console.log ('[register_taker2]');
   }
   var ok_f = true;
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   var display_pay_screen = set_display_pay_screen (qname, i_qwiz);
   var reg_code = '';
   if (display_pay_screen != 'free_trial'
                                     && display_pay_screen != 'special_offer') {
      reg_code = $ (qwiz_deck + '.register_taker_reg_code').val ();
      reg_code = reg_code.trim ();
      if (reg_code == '') {
         $ (qwiz_deck + '.register_taker_reg_code_errmsg').html ('Please enter registration code').show ();
         ok_f = false;
      }
   }
   register_taker_global_username = $ (qwiz_deck + '.register_taker_username').val ();
   if (register_taker_global_username == '') {
      $ (qwiz_deck + '.register_taker_username_errmsg').html ('Please enter login name').show ();
      ok_f = false;
   }
   if (/["\\;]/.test (register_taker_global_username)) {
      $ (qwiz_deck + '.register_taker_username_errmsg').html ('Invalid characters').show ();
      ok_f = false;
   }
   var password = $ (qwiz_deck + '.register_taker_password').val ();
   if (password == '') {
      $ (qwiz_deck + '.register_taker_password_errmsg').html ('Please enter password').show ();
      ok_f = false;
   }
   var email = $ (qwiz_deck + 'input.register_taker_email').val ();
   if (! proceed_to_pay) {
      if (qname == 'qwiz_') {
         proceed_to_pay = ! qwiz_.get_qwizdata (i_qwiz, 'all_taker_options_free_b');
      } else {
         proceed_to_pay = ! qcard_.get_deckdata (i_qwiz, 'all_taker_options_free_b');
      }
   }
   if (   ! (   register_taker_global_reg_code_ok_f
             || register_taker_display_pay_screen)
       || register_taker_global_username_unique_f == 1
       || register_taker_global_username == ''        ) {
      ok_f = ok_f && register_taker_global_username_unique_f;
      if (ok_f && register_taker_global_username != '' && ! register_taker_global_username_unique_f) {
         $ (qwiz_deck + '.register_taker_username_errmsg').html ('Login name already in use').show ();
         ok_f = false;
      }
      register_taker_global_first_name = $ (qwiz_deck + '.register_taker_first_name').val ();
      if (register_taker_global_first_name == '') {
         $ (qwiz_deck + '.register_taker_first_name_errmsg').html ('Please enter first name').show ();
         ok_f = false;
      }
      register_taker_global_last_name  = $ (qwiz_deck + '.register_taker_last_name').val ();
      if (register_taker_global_last_name == '') {
         $ (qwiz_deck + '.register_taker_last_name_errmsg').html ('Please enter last name').show ();
         ok_f = false;
      }
      if (reg_code && ! (   register_taker_global_reg_code_ok_f
                         || register_taker_display_pay_screen)) {
         ok_f = false;
         $ (qwiz_deck + '.register_taker_reg_code_errmsg').html ('Could not find registration code').show ();
      }
      var display_pay_screen = set_display_pay_screen (qname, i_qwiz);
      if (display_pay_screen == 'free_trial'
                                     || display_pay_screen == 'special_offer') {
         proceed_to_pay = false;
      }
      if (email == '') {
         if (! register_taker_global_reg_code_ok_f || display_pay_screen == 'signup') {
            $ (qwiz_deck + '.register_taker_email_errmsg').html ('Please enter email').show ();
            ok_f = false;
         }
      } else if (register_taker_global_email_unique_f){
         ok_f = qqc.register_taker_validate_email (qname, i_qwiz, ok_f);
      } else {
         $ (qwiz_deck + '.register_taker_email_errmsg').html ('Email already in use').show ();
         ok_f = false;
      }
      if (password != '') {
         var confirm_password = $ (qwiz_deck + 'input.register_taker_confirm_password').val ();
         if (password != confirm_password) {
            $ (qwiz_deck + '.register_taker_password_errmsg').html ('Password and Confirm password do not match').show ();
            ok_f = false;
         }
      }
      if (! reg_code && display_pay_screen == 'signup') {
         $ (qwiz_deck + '.register_taker_reg_code_errmsg').html ('Please enter registration code').show ();
         $ (qwiz_deck + '.register_taker_reg_code_class_name').html ('').hide ();
      }
      /*
      if (! reg_code) {
         var f = document.forms['register_taker_' + qname + i_qwiz];
         if (typeof (f['free_trial_' + qname + i_qwiz]) != 'undefined') {
            var yes_no = f['free_trial_' + qname + i_qwiz].value;
            if (yes_no == '') {
               $ (qwiz_deck + '.qwiz_free_trial_yes_no_errmsg').html ('Please pick one').show ();
               ok_f = false;
            } else if (yes_no == 'Yes') {
               proceed_to_pay = true;
            }
         }
      }
      */
      if (ok_f) {
         if (! proceed_to_pay && ! reg_code
                        && display_pay_screen != 'free_trial'
                                     && display_pay_screen != 'special_offer') {
            ok_f = confirm ('You have not entered a registration code;\nyou will be an "independent student," not in a class.\n\nIs this OK?  If not, click "Cancel" and enter a code.');
         }
      } else {
         if (qname == 'qcard_') {
            qcard_.set_container_width_height (i_qwiz);
         }
      }
   }
   register_taker_global_sha3_password = CryptoJS.SHA3 (password).toString ();
   if (ok_f) {
      var login_f = (   register_taker_global_reg_code_ok_f
                     || register_taker_display_pay_screen
                    )
                      && register_taker_global_username_unique_f == 0 ? 1 : 0;
      const immediate_payment = qqc.set_immediate_payment (qname, i_qwiz);
      const payment_type_id   = immediate_payment ? 65 : 52;
      var data = {login_f:         login_f,
                  reg_code:        reg_code,
                  school_id:       register_taker_global_reg_code_school_id,
                  username:        register_taker_global_username,
                  firstname:       register_taker_global_first_name,
                  lastname:        register_taker_global_last_name,
                  sha3_password:   register_taker_global_sha3_password,
                  email:           email,
                  register_v2:     '1',
                  subscription:    '1',              // Indicate new version.
                  payment_type_id: payment_type_id,
                  callback:        'taker_registered'
                 };
      if (proceed_to_pay) {
         data.proceed_to_pay_f = '1';
      }
      if (document_qwiz_subscription_id) {
         data.subscription_id = document_qwiz_subscription_id;
      }
      if (debug[0]) {
         console.log ('[register_taker2] data', data);
      }
      qqc.qjax (qname, i_qwiz, '', 'new_student_registration', data);
   }
   return false;
}
this.register_taker_hide_error = function (qname, i_qwiz, input_el) {
   var classname = input_el.className;
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   $ (qwiz_deck + '.' + classname + '_errmsg').hide ();
   $ (qwiz_deck + '.register_taker_errmsg').hide ();
}
this.taker_registered = function (data) {
   if (debug[0]) {
      console.log ('[taker_registered] data:', data);
      console.log ('[taker_registered] register_taker_global_reg_code_ok_f:', register_taker_global_reg_code_ok_f, ', register_taker_global_username_unique_f:', register_taker_global_username_unique_f);
      console.log ('[taker_registered] register_taker_display_pay_screen:', register_taker_display_pay_screen);
   }
   var errmsg = data.errmsg;
   var display_errmsg = '';
   if (! errmsg) {
      const qname                       = data.qname;
      const i_qwiz                      = data.i_qwiz;
      document_qwiz_user_logged_in_b    = true;
      document_qwiz_session_id          = data.session_id;
      document_qwiz_username            = register_taker_global_username;
      document_qwiz_school_id           = data.school_id;
      document_qwiz_taker_id            = data.taker_id;
      document_qwiz_email               = data.email;
      document_qwiz_independent_taker_f = data.school_id == 1;
      var options = {path: '/', expires: 1};
      $.cookie ('qwiz_session_id', document_qwiz_session_id, options);
      document_qwiz_remember_f = true;
      qqc.set_user_menus_and_icons ();
      var msg = '';
      if (data.add_and_provide_f) {
         const immediate_payment  = qqc.set_immediate_payment (qname, i_qwiz);
         if (immediate_payment) {
            msg = '<b>Thanks!&nbsp; You now have a Learn-Biology.com subscription.</b>';
         } else {
            msg = '<b>Thanks!&nbsp; You now have a free-trial subscription.</b>';
         }
      }
      if (qwiz_ && qwiz_.any_pay_quiz_f) {
         qwiz_.pay_lock_settings (i_qwiz, i_qwiz, undefined, undefined, msg);
      }
      if (qcard_ && qcard_.any_pay_deck_f) {
         qcard_.pay_lock_settings (i_qwiz, i_qwiz, undefined, undefined, msg);
      }
      if (register_taker_global_reg_code_ok_f) {
         if (data.login_f) {
            register_taker_global_first_name = data.firstname;
            register_taker_global_last_name  = data.lastname;
         }
         var fields = {};
         fields['First_name'] = [register_taker_global_first_name];
         fields['Last_name']  = [register_taker_global_last_name];
         var custom_input_data
                        = {input_field_names:  ['First_name', 'Last_name'],
                           fields:             fields};
         var taker_data = {userids:            [document_qwiz_taker_id],
                           usernames:          [register_taker_global_username],
                           passwords:          [register_taker_global_sha3_password],
                           custom_input_data:  custom_input_data};
         qqc.input_data_to_db (qname, i_qwiz,
                               register_taker_global_reg_code_maker_id,
                               register_taker_global_reg_code_school_id,
                               register_taker_global_reg_code_class_id,
                               register_taker_global_reg_code_class_name,
                               taker_data);
      } else {
         register_taker_registered_feedback (data.qname, data.i_qwiz, true,
                                             false); //data.proceed_to_pay_f);
      }
   } else if (errmsg == 'login unsuccessful') {
      display_errmsg = 'Incorrect username/password.';
   } else if (errmsg == 'duplicate username') {
      display_errmsg = 'Login name is already in database.';
   } else {
      display_errmsg = 'Unable to create account';
   }
   if (display_errmsg) {
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
      $ (qwiz_deck + '.register_taker_errmsg').html (display_errmsg).show ();
   }
   return false;
}
this.special_offer_callback = function (data) {
   if (debug[0]) {
      console.log ('[special_offer_callback] data:', data);
   }
   var msg = '<br /><br />';
   const immediate_payment = qqc.set_immediate_payment (data.qname, data.i_qwiz);
   if (immediate_payment) {
      msg += '<b>Thanks!&nbsp; You now have a Learn-Biology.com subscription.</b>';
   } else {
      msg += '<b>Thanks!&nbsp; You now have a new free-trial subscription.</b>';
   }
   const $subscription_screen_div = qqc.$get_login_div ('qwiz_', data.i_qwiz);
   $subscription_screen_div.html (msg);
}
this.register_taker_validate_email = function (qname, i_qwiz, ok_f, check_unique_f) {
   var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
   var email = $ (qwiz_deck + 'input.register_taker_email').val ();
   if (email != '') {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (! re.test (email)) {
         $ (qwiz_deck + '.register_taker_email_errmsg').html ('Not a valid email address').show ();
         ok_f = false;
      } else if (check_unique_f) {
         qqc.register_taker_check_unique (qname, i_qwiz, 'email');
      }
   }
   return ok_f;
}
this.input_data_to_db = function (qname, i_qwiz, maker_id, school_id, class_id,
                                                       class_name, taker_data) {
   if (debug[0]) {
      console.log ('[input_data_to_db] taker_data:', taker_data);
   }
   var data = {};
   data.qname      = qname;
   data.i_qwiz     = i_qwiz;
   data.class_id   = class_id;
   data.class_name = class_name;
   data.school_id  = school_id;
   data.maker_id   = maker_id;
   data.taker_data = taker_data;
   data.callback   = 'register_taker_input_data_to_db_callback';
   if (debug[0]) {
      console.log ('[input_data_to_db] data:', data);
   }
   qwiz_qcards_common.qjax (qname, i_qwiz, '', 'new_class', data);
}
this.register_taker_input_data_to_db_callback = function (data) {
   if (debug[0]) {
      console.log ('[input_data_to_db_callback] data:', data);
   }
   if (data.error_f) {
      alert ('Sorry, registration did not work');
   } else {
      register_taker_registered_feedback (data.qname, data.i_qwiz, false);
   }
}
function register_taker_registered_feedback (qname, i_qwiz, independent_taker_f,
                                                               proceed_to_pay) {
   if (debug[0]) {
      console.log ('[register_taker_registered_feedback] qname:', qname);
   }
   if (! proceed_to_pay) {
      htm = [];
      if (independent_taker_f) {
         if (! plugin_url) {
            plugin_url = qqc.get_qwiz_param ('url', './');
         }
         const spinner_url = plugin_url + 'images/spinner40x40.gif';
         htm.push ('<img src="' + spinner_url + '" class="qwiz-center" style="margin-top: 70px;" />');
         const server_name = qqc.get_qwiz_param ('server_name', 'Qwizcards');
         if (server_name == 'learn-biology.com' || debug[0]) {
            document.location = `https://${server_name}/thank-you-student-free-trial`;
         }
      } else {
         htm.push ('<br />');
         htm.push ('<br />');
         htm.push ('<p>');
         htm.push (   '<b>Thank you.&nbsp; You are now registered for class ' + register_taker_global_reg_code_class_name + ', ' + register_taker_global_reg_code_school_name + '</b>');
         htm.push ('</p>');
         htm.push ('<p>');
         htm.push (   'When you do a quiz or flashcard deck, be sure to log in (under the');
         htm.push (   'pull-down triangle icon on each quiz or deck).');
         htm.push ('</p>');
      }
      var display_pay_screen = '';
      if (qname == 'qwiz_') {
         display_pay_screen = qwiz_.get_qwizdata (i_qwiz, 'display_pay_screen');
      }
      if (display_pay_screen == 'free_trial') {
         document_qwiz_good_through_date_ok = true;
      } else if (! display_pay_screen) {
         proceed_to_pay = register_taker_global_reg_code_ok_f ? 0 : 1
         htm.push ('<button class="qwiz_button" onclick="' + qname + '.login_ok (' + i_qwiz + ', 0, ' + proceed_to_pay + ')">');
         htm.push (   'Continue');
         htm.push ('</button>');
      }
      var $register_taker_screen_div = qqc.$get_login_div (qname, i_qwiz);
      $register_taker_screen_div.html (htm.join ('\n')).show ();
   }
   return false;
}
this.check_promo_code = function (qname, i_qwiz_deck) {
   var promo_code = $ ('#' + qname + 'promo_code' + i_qwiz_deck + ' input').val ();
   if (promo_code != '') {
      var pay_quiz_deck_id = get_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_deck_id');
      var data = {qname: qname, promo_code: promo_code, pay_quiz_deck_id: pay_quiz_deck_id};
      qqc.qjax (qname, i_qwiz_deck, '', 'check_promo_code', data);
   }
   return false;
}
this.check_promo_code2 = function (data) {
   if (debug[0]) {
      console.log ('[check_promo_code2] data:', data);
   }
   var qname       = data.qname;
   var i_qwiz_deck = data.i_qwiz;
   var $p = $ ('p#' + qname + 'promo_code' + i_qwiz_deck);
   if (data.errmsg) {
      $p.find ('span.promo_code_errmsg').html ('<br />' + data.errmsg);
      $p.find ('span.promo_code_okmsg').html ('');
   } else {
      qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'promo_code', data.promo_code);
      if (qname == 'qwiz_') {
         qwiz_.pay_lock_settings (i_qwiz_deck, i_qwiz_deck);
      } else {
         qcard_.pay_lock_settings (i_qwiz_deck, i_qwiz_deck);
      }
   }
}
this.clear_promo_code_msgs = function (qname, i_qwiz_deck) {
   $ ('p#' + qname + 'promo_code' + i_qwiz_deck + ' span.promo_code_msg').html ('');;
}
this.submit_for_payment = function (qname, i_qwiz, form_el) {
   if (debug[0]) {
      console.log ('[submit_for_payment] qname:', qname, ', i_qwiz:', i_qwiz, ', form_el:', form_el);
   }
   var pay_quiz_deck_id = get_qwizdeckdata (qname, i_qwiz, 'pay_quiz_deck_id');
   var selectedIndex = form_el.os0.selectedIndex;
   if (selectedIndex == -1) {
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
      $ (qwiz_deck + ' div.signup_confirm_email_errmsg').html ('Please choose a payment option').show ();
      return false;
   }
   if (! document_qwiz_session_id) {
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
      $ (qwiz_deck + ' div.signup_confirm_email_errmsg').html ('Sorry, login session not set. Please refresh this page in your browser and try again, or contact support@qwizcards.com').show ();
      return false;
   }
   var taker_payment_type_ids = get_qwizdeckdata (qname, i_qwiz, 'taker_payment_type_ids');
   var payment_type_id = taker_payment_type_ids[selectedIndex];
   var fee = form_el.os0.value;
   pay_qwiz_qdeck_ = qname;
   pay_i_qwiz_deck = i_qwiz;
   if (fee <= 0.0) {
      var data = {url:              qqc.get_qwiz_param ('url', './'),
                  payment_type_id:  payment_type_id,
                  qwiz_session_id:  document_qwiz_session_id};
      if (qname == 'qwiz_' && qwiz_.get_qwizdata (i_qwiz, 'display_pay_screen')) {
         data.no_alert = 1;
      }
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz);
      var confirm_email_code = $ (qwiz_deck + ' input.signup_confirm_email').val ();
      if (! confirm_email_code) {
         confirm_email_code = 0;
      }
      data.confirm_email_code = confirm_email_code;
      qqc.jjax (qname, i_qwiz, '', 'create_paypal_authorization', data);
      return false;
   } else {
      var custom_data = {m:      0,
                         pid:    pay_quiz_deck_id,
                         ptid:   payment_type_id,
                         sid:    document_qwiz_session_id,
                         url:    qqc.get_qwiz_param ('url', './')
                        }
      if (debug[0]) {
         console.log ('[submit_for_payment] custom_data:', custom_data);
      }
      form_el.custom.value = btoa (JSON.stringify (custom_data));
      return true;
   }
}
this.create_maker_pay_screen = function (qname, qdata, i_qwiz, msg) {
   var $pay_screen_div = qqc.$get_login_div (qname, i_qwiz);
   var htm = [];
   if (qdata[i_qwiz].pay_errmsg) {
      htm.push ('<strong>' + qdata[i_qwiz].pay_errmsg + '</strong><br />');
   } else {
      if (msg) {
         htm.push ('<strong>' + msg + '</strong><br />');
      }
      var n_pay_options = qdata[i_qwiz].maker_payment_type_ids.length;
      htm.push ('<form action="https://www.paypal.com/cgi-bin/webscr" onSubmit="return qwiz_qcards_common.submit_for_payment (\'' + qname + '\', ' + i_qwiz + ', this)" method="post" target="_blank">');
      htm.push (   '<input type="hidden" name="cmd" value="_s-xclick">');
      htm.push (   '<input type="hidden" name="hosted_button_id" value="QK2XZUEFF9RNS">');
      htm.push (   '<table class="pay_options">');
      htm.push (      '<tr>');
      htm.push (         '<td>');
      htm.push (            '<input type="hidden" name="on0" value="Options">');
      if (n_pay_options > 1) {
         htm.push (         'Please choose:');
      }
      htm.push (         '</td>');
      htm.push (      '</tr>');
      htm.push (      '<tr>');
      htm.push (         '<td>');
      htm.push (            '<select name="os0" class="qwiz_paypal_select">');
      for (var i=0; i<n_pay_options; i++) {
         var fee         = qdata[i_qwiz].maker_fees[i];
         var n_periods   = qdata[i_qwiz].maker_good_for_n_periodss[i];
         var period      = qdata[i_qwiz].maker_good_for_periods[i];
         var description = qdata[i_qwiz].maker_payment_descriptions[i];
         var option_text = qqc.currency (fee) + ' ' + qqc.number_to_word (n_periods) + ' ' + qqc.plural (period, period + 's', n_periods);
         if (description) {
            option_text += ' - ' + description;
         }
         htm.push (            '<option value="' + fee + '">');
         htm.push (               option_text);
         htm.push (            '</option>');
      }
      htm.push (            '</select> ');
      htm.push (         '</td>');
      htm.push (      '</tr>');
      htm.push (   '</table>');
      htm.push (   '<input type="hidden" name="currency_code" value="USD">');
      htm.push (   '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" style="border: none;" name="submit" alt="PayPal - The safer, easier way to pay online!">');
      htm.push (   '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">');
      htm.push (   '<input type="hidden" name="custom">');
      htm.push ('</form>');
   }
   $pay_screen_div.html (htm.join ('\n')).show ();
}
this.submit_for_maker_payment = function (qname, i_qwiz, form_el) {
   if (debug[0]) {
      console.log ('[submit_for_maker_payment] qname:', qname, ', i_qwiz:', i_qwiz, ', form_el:', form_el);
   }
   var pay_quiz_deck_id = get_qwizdeckdata (qname, i_qwiz, 'pay_quiz_deck_id');
   var selectedIndex = form_el.os0.selectedIndex;
   var maker_payment_type_ids = get_qwizdeckdata (qname, i_qwiz, 'maker_payment_type_ids');
   var payment_type_id = maker_payment_type_ids[selectedIndex];
   var custom_data = {m:      1,
                      pid:    pay_quiz_deck_id,
                      ptid:   payment_type_id,
                      sid:    qqc.maker_session_id,
                      url:    qqc.get_qwiz_param ('url', './')
                     }
   if (debug[0]) {
      console.log ('[submit_for_maker_payment] custom_data:', custom_data);
   }
   form_el.custom.value = btoa (JSON.stringify (custom_data));
   pay_qwiz_qdeck_ = qname;
   pay_i_qwiz_deck = i_qwiz;
   return true;
}
this.payment_received = function (no_set_f, qname, i_qwiz_deck, confirm_email_errmsg) {
   if (debug[0]) {
      console.log ('[payment_received] no_set_f:', no_set_f, ', confirm_email_errmsg:', confirm_email_errmsg);
   }
   if (confirm_email_errmsg) {
      var qwiz_deck = qwiz_deck_selector (qname, i_qwiz_deck);
      $ (qwiz_deck + ' div.signup_confirm_email_errmsg').html (confirm_email_errmsg).show ();
      return false;
   }
   if (no_set_f) {
      pay_qwiz_qdeck_ = qname;
      pay_i_qwiz_deck = i_qwiz_deck;
   } else {
      document_qwiz_email_confirm = 1;
      if (qwiz_ && qwiz_.any_pay_quiz_f) {
         if (qname == 'qwiz_' && qwiz_.get_qwizdata (i_qwiz_deck, 'display_pay_screen')) {
            payment_received_f = true;
         }
         qwiz_.pay_lock_settings ();
      }
      if (qcard_ && qcard_.any_pay_deck_f) {
         qcard_.pay_lock_settings ();
      }
   }
   if (pay_qwiz_qdeck_ == 'qwiz_') {
      $ ('#qwiz_login-qwiz' + pay_i_qwiz_deck).hide ();
      var i_question = qwiz_.get_qwizdata (pay_i_qwiz_deck, 'i_question');
      if (i_question == -1) {
         $ ('.intro-qwiz' + pay_i_qwiz_deck).show ();
         qwiz_.position_show_next_button (pay_i_qwiz_deck);
      } else {
         qwiz_.login_ok_start_quiz (pay_i_qwiz_deck);
      }
   } else {
      $ ('#qdeck_login-qdeck' + pay_i_qwiz_deck).hide ();
      qcard_.login_ok_start_deck (pay_i_qwiz_deck);
   }
}
this.registration_complete = function (qname, i_qwiz, session_id, username) {
   if (debug[0]) {
      console.log ('[registration_complete] qname:', qname, ', i_qwiz:', i_qwiz, ', session_id:', session_id, ', username:', username);
   }
   document_qwiz_session_id          = session_id;
   document_qwiz_username            = username;
   document_qwiz_school_id           = 1;
   document_qwiz_independent_taker_f = 1;
   var qwiz_qcard_ = qname == 'qwiz_' ? qwiz_ : qcard_;
   qwiz_qcard_.login_ok (i_qwiz, session_id, 0);
}
this.maker_login_registration_complete = function (qname, i_qwiz, maker_session_id, username) {
   if (debug[0]) {
      console.log ('[maker_login_registration_complete] qname:', qname, ', i_qwiz:', i_qwiz, ', maker_session_id:', maker_session_id, ', username:', username);
   }
   qqc.maker_session_id = maker_session_id;
   var options = {path: '/', expires: 1};
   $.cookie ('maker_session_id', maker_session_id, options);
   var qwiz_qcard_ = qname == 'qwiz_' ? qwiz_ : qcard_;
   qwiz_qcard_.hide_menu_and_display_login (i_qwiz, false, 'maker_pay');
   setTimeout (function () {
                  alert ('Admin registration/login successful');
               }, 250);
}
this.set_login_expiry = function () {
   if (debug[0]) {
      console.log ('[set_login_expiry]');
   }
   clearTimeout (document_qwiz_login_timeout);
   document_qwiz_login_timeout = setTimeout ('qwiz_qcards_common.login_expired ()', 24*3600*1000);
}
this.login_expired = function () {
   document_qwiz_user_logged_in_b = false;
   qqc.set_user_menus_and_icons ();
   if (qwiz_ && qwiz_.any_pay_quiz_f) {
      qwiz_.pay_lock_settings ();
   }
   if (qcard_ && qcard_.any_pay_deck_f) {
      qcard_.pay_lock_settings ();
   }
   document_qwiz_pay_registration_date_unix = 0;
   const delay_alert = function () {
      if (document_qwiz_wp_user_session_id) {
         alert (qqc.T ('Score-recording authentication expired.  Please re-load this page'));
      } else {
         alert (qqc.T ('Qwizcards login session expired.  Please log in again'));
      }
   }
   setTimeout (delay_alert, 20);
}
this.is_mobile = function (mobile_enabled) {
   var mobile_b;
   if (! document_qwiz_force_mobile_f) {
      mobile_b = mobile_enabled != 'Disabled'
                       && (window.innerWidth < 961 || window.innerHeight < 450);
   }
   return mobile_b
}
this.set_force_mobile = function () {
   var in_iframe_b = parent !== window;
   if (in_iframe_b) {
      if (document.location.href.search (/(localhost|192.168.1.120|qwizcards.com|swinginghotspot.com)\/u\//) != -1) {
         document_qwiz_force_mobile_f = true;
      }
   }
}
this.process_textentry_terms = function (data) {
   if (debug[0]) {
      console.log ('process_textentry_terms] data:', data.substr (0, 50), '...');
   }
   terms = {singular: [], plural: []};
   var terms_base = data.split (/\n|;/);
   var n_terms = terms_base.length;
   for (var i=0; i<n_terms; i++) {
      var term_i_singular;
      var term_i_plural;
      var term_i = terms_base[i];
      if (term_i.search (/\S/) == -1) {
         continue;
      }
      var i_pos_slash = term_i.indexOf ('/');
      if (i_pos_slash == -1) {
         term_i_singular = term_i;
         var i_last = term_i.length - 1;
         var last_char = term_i[i_last];
         var last_2_chars = term_i.substr (i_last - 1);
         if (last_2_chars == 'es') {
            term_i_plural = term_i;
         } else if (last_char == 'y') {
            term_i_plural = term_i.substr (0, i_last) + 'ies';
         } else if (last_char == 's' || last_2_chars == 'sh' || last_2_chars == 'ch') {
            term_i_plural = term_i + 'es';
         } else if (last_char == 'x') {
            term_i_plural = term_i;
         } else {
            term_i_plural = term_i + 's';
         }
      } else {
         term_i_singular = term_i.substr (0, i_pos_slash);
         if (i_pos_slash == term_i.length-1) {
            term_i_plural = term_i.substr (0, i_pos_slash);
         } else {
            term_i_plural = term_i.substr (i_pos_slash+1);
         }
      }
      terms.singular.push ([term_i_singular, qqc.metaphone (term_i_singular)]);
      terms.plural.push   ([term_i_plural,   qqc.metaphone (term_i_plural)]);
   }
   return terms;
}
this.process_inline_textentry_terms = function (htm, terms_add_terms, qdata, i_q) {
   qdata.additional_errmsgs = [];
   var multiple_b = terms_add_terms == 'add_terms';
   var r_local = extract_delete_shortcode_content (htm, terms_add_terms, multiple_b, qdata);
   if (r_local.content == 'NA') {
      return htm;
   }
   var terms_htm = [r_local.content];
   var anchor_re = new RegExp ('<a.*?href="([^"]*)"[\\s\\S]*?<\\/a>', 'm');
   while (true) {
      var m = terms_htm[0].match (anchor_re);
      if (! m) {
         break;
      } else {
         var terms_url = m[1];
         var terms_data = qqc.get_textentry_terms (terms_url, qdata);
         if (terms_data) {
            if (terms_url.substr (terms_url.length - 4) != '.txt') {
               /*
               if (debug[5]) {
                  console.log ('[process_inline_textentry_terms] terms_url: ', terms_url);
                  console.log ('[process_inline_textentry_terms] terms_data.substr (0, 100): ', terms_data.substr (0, 100));
               }
               */
               r_remote = extract_delete_shortcode_content (terms_data, 'terms', false, qdata);
               if (r_remote.content == 'NA') {
                  qdata.additional_errmsgs.push (qqc.T ('Did not find [terms]...[/terms] shortcode pair in file') + ' ' + terms_url);
               } else {
                  terms_htm.push (r_remote.content);
               }
            } else {
               if (terms_data.indexOf ('[terms]') != -1) {
                  r_remote = extract_delete_shortcode_content (terms_data, 'terms', false, qdata);
                  if (r_remote.content == 'NA') {
                     qdata.additional_errmsgs.push (qqc.T ('Did not find [terms]...[/terms] shortcode pair in file') + ' ' + terms_url);
                  } else {
                     terms_htm.push (r_remote.content);
                  }
               } else {
                  terms_htm.push (terms_data);
               }
            }
         }
         terms_htm[0] = terms_htm[0].replace (anchor_re, '');
      }
   }
   terms_htm = terms_htm.join ('');
   terms_htm = terms_htm.replace (/<[^>]+>|&nbsp;/g, '\n');
   qdata[i_q][terms_add_terms] = terms_htm;
   return r_local.htm;
}
function extract_delete_shortcode_content (htm, shortcode, multiple_b, qdata) {
   var content = [];
   var opening_shortcode = '[' + shortcode + ']';
   var closing_shortcode = '[/' + shortcode + ']';
   while (true) {
      var opening_pos = htm.indexOf (opening_shortcode);
      if (opening_pos == -1) {
         break;
      } else {
         var closing_pos = htm.indexOf (closing_shortcode);
         if (closing_pos < opening_pos) {
            qdata.additional_errmsgs.push (opening_shortcode + ' ' + qqc.T ('found, but not') + ' ' + closing_shortcode);
         } else {
            var terms_re = new RegExp ('(<[^\\/][^>]*>\\s*)*?\\[' + shortcode + '\\]([\\s\\S]*?)\\[\\/' + shortcode + '\\]((<\\/[^>]+>\\s*)*)', 'm');
            var m = htm.substr (opening_pos).match (terms_re);
            content.push (m[2]);
            htm = htm.replace (terms_re, '');
         }
      }
      if (! multiple_b) {
         break;
      }
   }
   if (content.length) {
      content = content.join ('');
   } else {
      content = 'NA';
   }
   return {'htm': htm, 'content': content};
}
this.sort_dedupe_terms_metaphones = function (terms_metaphones) {
   var locale = window.navigator.userLanguage || window.navigator.language;
   terms_metaphones.sort (function (a, b) {
      return a[0].toLowerCase ().localeCompare (b[0].toLowerCase (), locale, {numeric: true});
   });
   var deduped_terms_metaphones = [terms_metaphones[0]];
   var len = terms_metaphones.length;
   for (var i=1; i<len; i++) {
      if (terms_metaphones[i][0] != terms_metaphones[i-1][0]) {
         deduped_terms_metaphones.push (terms_metaphones[i]);
      }
   }
   return deduped_terms_metaphones;
}
this.get_textentry_terms = function (terms_url, qdata) {
   if (debug[0]) {
      console.log ('[get_textentry_terms] terms_url:', terms_url);
   }
   var error_b = false;
   var terms_data = '';
   $.ajax ({
      type:       'GET',
      async:      false,
      url:        terms_url,
      dataType:   'text',
      error:      function (xhr, desc) {
                     qdata.additional_errmsgs.push (qqc.T ('Could not read terms file') + ': ' + terms_url);
                     error_b = true;
                  },
      success:    function (data) {
                     terms_data = data;
                  }
   });
   if (! error_b) {
      if (! terms_data) {
         qdata.additional_errmsgs.push (qqc.T ('No data read from terms file') + ': ' + terms_url);
      }
   }
   return terms_data;
}
this.create_hangman_entry = function (entry) {
   var hairsp = '<span class="qwiz-hairsp"></span>';
   var n_chars = 0;
   if (entry) {
      n_chars = entry.length;
   }
   var chars = [];
   for (var i=0; i<n_chars; i++) {
      if (entry[i].match (/[a-z0-9]/i)) {
         chars.push ('<u>' + entry[i] + '</u>' + hairsp);
      } else if (entry[i] == ' ') {
         chars.push ('&ensp;' + hairsp);
      } else {
         chars.push (entry[i] + hairsp);
      }
   }
   var entry = chars.join ('');
   if (debug[9]) {
      console.log ('[create_hangman_entry] entry:', entry);
   }
   return  entry;
}
this.create_hangman_incorrect_chars_display = function (incorrect_chars, incorrect_chars_before_hint, qwiz_f) {
   var n_incorrect = incorrect_chars.length;
   var display = [];
   if (incorrect_chars_before_hint == 0) {
      display.push ('<span class="hangman_incorrect_letters_exceeded inline-block entry">');
   } else {
      display.push ('<span class="hangman_incorrect_letters_allowed inline-block entry">');
   }
   var i_end = qwiz_f ? 12 : n_incorrect;
   for (var i=0; i<i_end; i++) {
      var chr_spacer = i < n_incorrect ? incorrect_chars[i] : '<span class="qwiz_spacer">x</span>';
      display.push (chr_spacer);
      if (i + 1 == incorrect_chars_before_hint) {
         display.push ('</span><span class="hangman_incorrect_letters_exceeded inline-block entry">');
      }
   }
   display.push ('</span>');
   display = 'Incorrect: ' + display.join ('');
   return display;
}
this.setCharAt = function (str, index, chr) {
   if (index > str.length-1)  return str;
   return str.substr (0,index) + chr + str.substr (index+1);
}
this.make_inline = function (htm, i_pos) {
   var htm_substr = htm.substr (i_pos);
   var tag_htm = htm_substr.match (/<[hp][^>]*>/)[0];
   var tagname = tag_htm[1];
   if (tagname == 'h') {
      tagname += tag_htm[2];
   }
   var new_tag = qqc.add_attr_value ('style', 'display: inline;', tag_htm);
   if (debug[9]) {
      console.log ('[make_inline] new_tag:', new_tag);
   }
   var new_htm_substr = htm_substr.replace (tag_htm, new_tag);
   var new_div = new_tag.replace (tagname, 'div');
   new_htm_substr = new_div + new_htm_substr;
   var pat = '</' + tagname + '>';
   if (new_htm_substr.search (pat) != -1) {
      new_htm_substr = new_htm_substr.replace (pat, pat + '</div>');
   } else {
      new_htm_substr += '</div>';
   }
   htm = htm.substr (0, i_pos) + new_htm_substr;
   var closing_tag = '</' + tagname + '>';
   new_tag = '<' + tagname + ' style="display: inline;">';
   htm = htm.replace (/\[hangman[^\]]*\]/, closing_tag + '$&' + new_tag);
   if (debug[9]) {
      console.log ('[make_inline] htm:', htm);
   }
   return htm;
}
this.add_attr_value = function (attr, value, attributes) {
   var re = new RegExp (attr + '\\s*=\\s*["\']', 'im');
   var m = attributes.match (re);
   if (m) {
      if (attributes.search (value) == -1) {
         attributes = attributes.replace (re, m[0] + value + ' ');
      }
   } else {
      attributes = attributes.replace ('>', ' ' + attr + '="' + value + '">');
   }
   if (debug[0]) {
      console.log ('[add_attr_value] attributes:', attributes);
   }
   return attributes;
}
this.remove_tags_eols = function (htm, keep_img_f) {
   if (htm) {
      if (keep_img_f) {
         htm = htm.replace (/<img/g, 'xXximg');
      }
      htm = qqc.trim (htm.replace (/<[^>]+>/g, '').replace (/\n|&nbsp;/g, ' ').replace (/ {2,}/g, ' '));
      if (keep_img_f) {
         htm = htm.replace (/xXximg/g, '<img');
      }
   }
   return htm;
}
this.q_and_a_hash = function (text) {
   if (text.length > 200) {
      text = text.substr (0, 184) + 'CRC32:' + qwiz_crc32 (text);
   }
   return text;
}
this.init_enter_intercept = function () {
   if (init_enter_intercept_f) {
      return;
   }
   init_enter_intercept_f = true;
   $ ('html').on ('keydown',
                  function (e) {
                     if (document_active_qwiz_qdeck && e.keyCode == 13) {
                        if (debug[7]) {
                            console.log ('[init_enter_intercept] document_active_qwiz_qdeck:', document_active_qwiz_qdeck);
                            console.log ('[init_enter_intercept] e.target:', e.target);
                        }
                        var tagname = e.target.tagName.toLowerCase ();
                        if (tagname == 'input' || tagname == 'textarea') {
                           var id = e.target.id.toLowerCase ();
                           if (id.indexOf ('qwiz') == -1
                                                && id.indexOf ('qdeck') == -1) {
                              return;
                           }
                        }
                        if (e.target.className.indexOf ('user_html') != -1) {
                           var id = e.target.id.toLowerCase ();
                           if (id.indexOf ('qwiz') == -1
                                                && id.indexOf ('qdeck') == -1) {
                              return;
                           }
                        }
                        var $document_active_qwiz_qdeck = $ (document_active_qwiz_qdeck);
                        if (document_active_qwiz_qdeck.className.toLowerCase ().indexOf ('qcard_window') == -1) {
                           if ($document_active_qwiz_qdeck.find ('div.next_button').is (':visible')) {
                              if (debug[7]) {
                                 console.log ('[init_enter_intercept] qwiz next_button trigger');
                                 console.log ('[init_enter_intercept] $document_active_qwiz_qdeck.find (\'div.next_button button\'):', $document_active_qwiz_qdeck.find ('div.next_button button'));
                              }
                              $document_active_qwiz_qdeck.find ('div.next_button button').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('div.textentry_check_answer_div').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qwiz call text_entry_check_answer ()');
                              }
                              var id = document_active_qwiz_qdeck.id;
                              var i_qwiz = parseInt (id.substr (4), 10);
                              qwiz_.textentry_check_answer (i_qwiz);
                           } else if ($document_active_qwiz_qdeck.find ('button.login_button').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qwiz login_button trigger');
                              }
                              $document_active_qwiz_qdeck.find ('div.qwiz-login button.login_button').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('button.begin_practice').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qwiz begin_practice trigger');
                              }
                              $document_active_qwiz_qdeck.find ('div.qwiz-login button.begin_practice').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('.exit_progress_bars').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qwiz exit_progress_bars trigger');
                              }
                              $document_active_qwiz_qdeck.find ('div.qwiz-login button.exit_progress_bars').trigger ('click');
                           }
                        } else if (! qcard_.qwizard_b) {
                           if (e.target.className.indexOf ('flip') != -1) {
                              return;
                           }
                           if ($document_active_qwiz_qdeck.find ('button.login_button').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qdeck login_button trigger');
                              }
                              $document_active_qwiz_qdeck.find ('button.login_button').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('button.begin_practice').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qdeck begin_practice trigger');
                              }
                              $document_active_qwiz_qdeck.find ('div.button.begin_practice').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('.exit_progress_bars').is (':visible')) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qdeck exit_progress_bars trigger');
                              }
                              $document_active_qwiz_qdeck.find ('.exit_progress_bars').trigger ('click');
                           } else if ($document_active_qwiz_qdeck.find ('div.qcard_next_buttons button.flip.qwiz_button').length) {
                              if (debug[7]) {
                                  console.log ('[init_enter_intercept] qdeck Check answer trigger');
                                  console.log ('[init_enter_intercept] find:', $document_active_qwiz_qdeck.find ('div.qcard_next_buttons button.flip'));
                              }
                              $document_active_qwiz_qdeck.find ('div.qcard_next_buttons button.flip').trigger ('click');
                           }
                        }
                     }
                  });
}
this.$get_login_div = function (qname, i_qwiz) {
   var selector;
   if (qname == 'qwiz_') {
      selector = '#qwiz_login-qwiz' + i_qwiz;
      $ ('#progress-qwiz' + i_qwiz).html ('');
   } else {
      selector = 'div.qcard_card-qdeck' + i_qwiz + ' div.qcard-front div.qcard_content_size';
      $ ('#progress-qdeck' + i_qwiz).html ('');
   }
   return $ (selector);
}
this.get_attr = function (htm, attr_name) {
   var attr_value = '';
   var attr_re = new RegExp ('(\\s|^)' + attr_name + '\\s*=\\s*("([^"]+)")*', 'm');
   var attr_match = htm.match (attr_re);
   if (attr_match) {
      if (attr_match[3]) {
         attr_value = qqc.trim (attr_match[3]);
      }
   }
   return attr_value;
}
this.opening_tag_shortcode_pos = function (shortcode_pat, htm) {
   var shortcode_pat = shortcode_pat.replace (/([\[\]\*])/g, '\\$1');
   var opening_tags_re_txt = '(<[^\\/][^>]*>\\s*)*?' + shortcode_pat + '[\\s\\S]*';
   var opening_tags_re = new RegExp (opening_tags_re_txt);
   var i_pos = htm.search (opening_tags_re);
   if (i_pos == -1) {
      i_pos = htm.length;
   } else {
      var shortcode_re = new RegExp (shortcode_pat);
      var shortcode_pos = htm.search (shortcode_re);
      var repeat_b = false;
      var img_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<img');
      if (img_pos != -1) {
         i_pos += img_pos + 3;
         repeat_b = true;
      }
      var input_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<input');
      if (input_pos != -1) {
         i_pos += input_pos + 3;
         repeat_b = true;
      }
      var qp_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<span class="qwizard_placeholder">');
      if (qp_pos != -1) {
         i_pos += qp_pos + 3;
         repeat_b = true;
      }
      var break_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<br');
      if (break_pos != -1) {
         i_pos += break_pos + 3;
         repeat_b = true;
      }
      var iframe_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<video');
      if (iframe_pos != -1) {
         i_pos += iframe_pos + 3;
         repeat_b = true;
      }
      var iframe_pos = htm.substring (i_pos, shortcode_pos).lastIndexOf ('<iframe');
      if (iframe_pos != -1) {
         i_pos += iframe_pos + 3;
         repeat_b = true;
      }
      if (repeat_b) {
         var ii_pos = htm.substr (i_pos).search (opening_tags_re);
         i_pos += ii_pos;
      }
   }
   return i_pos;
}
this.replace_smart_quotes = function (string) {
   var new_string = string.replace (/[\u201C\u201D\u2033\u00AB\u00BB]/gm, '"');
   new_string = new_string.replace (/[\u2018\u2019]/gm, "'");
   new_string = new_string.replace (/&nbsp;|\u000A0/gm, ' ');
   new_string = new_string.replace (/&ndash;|\u2013/gm, '-');
   return new_string;
}
this.balance_closing_tag = function (s) {
   var i_pos_close_tag = s.search (/<\/[ph]/);
   if (i_pos_close_tag != -1) {
      var open_phx;
      var close_phx = s.substr (i_pos_close_tag + 2, 2);
      if (close_phx.substr (1) == '>') {
         open_phx = '<p';
      } else {
         open_phx = '<' + close_phx;
      }
      var re = new RegExp (open_phx);
      var i_pos_open_phx = s.search (re);
      if (i_pos_open_phx == -1 || i_pos_open_phx > i_pos_close_tag) {
         s = open_phx + '>' + s;
      }
   }
   return s;
}
this.remove_unmatched_tag = function (part, first_part_f, last_part_f) {
   var part_orig = part;
   var pieces = part.split (/(<[ph][^>]*>[^]*?<\/[ph][^>]*>)/);
   var n_pieces = pieces.length;
   var last_piece = pieces[n_pieces - 1];
   var new_last_piece = last_piece.replace (/<\/{0,1}[ph][^>]*>/g, '')
   var all_tags_removed_f = true;
   var i_unmatched_tags = last_piece.search (/<\/{0,1}[ph]/);
   if (i_unmatched_tags != -1) {
      if (! last_part_f || last_piece.search (/<[ph]/) != -1) {
         if (! first_part_f || last_piece.search (/<[ph]/) != -1) {
            if (new_last_piece.search (/\S/) != -1) {
               var wrap_tag_re = new RegExp (/<[ph][^>]*>/);
               var m = last_piece.match (wrap_tag_re);
               var wrap_tag = '<p>';
               var opening_tag_pos = -1;
               if (m) {
                  wrap_tag = m[0];
                  opening_tag_pos = last_piece.search (wrap_tag_re);
               } else if (n_pieces > 1) {
                  var next_to_last_piece = pieces[n_pieces - 2];
                  m = next_to_last_piece.match (wrap_tag_re);
                  if (m) {
                     wrap_tag = m[0];
                  }
               }
               if (opening_tag_pos != -1) {
                  var tag_type_re = new RegExp (/<\/{0,1}([ph][^>\s]*)/);
                  var tag_type;
                  if (! wrap_tag) {
                     tag_type = last_piece.match (tag_type_re)[1];
                     wrap_tag = '<' + tag_type + '>';
                  } else {
                     tag_type = wrap_tag.match (tag_type_re)[1];
                  }
                  var wrap_closing_tag = '</' + tag_type + '>';
                  var sub_pieces = last_piece.split (wrap_tag_re, 2);
                  sub_piece1 = sub_pieces[0].replace  (/<\/{0,1}[ph][^>]*>/g, '');
                  sub_piece2 = sub_pieces[1].replace  (/<\/{0,1}[ph][^>]*>/g, '');
                  var wrap_tag_inline;
                  if (wrap_tag.search ('class') != -1) {
                     wrap_tag_inline = wrap_tag.replace (/class\s*=\s*"/, 'class="qwiz-inline ');
                  } else {
                     wrap_tag_inline = '<' + tag_type + ' class="qwiz-inline">';
                  }
                  sub_piece1 = add_span_if_empty (sub_piece1);
                  sub_piece2 = add_span_if_empty (sub_piece2);
                  if (sub_piece1) {
                     sub_piece1 = wrap_tag_inline + sub_piece1 + wrap_closing_tag;
                  }
                  if (sub_piece2) {
                     sub_piece2 = wrap_tag_inline + sub_piece2 + wrap_closing_tag;
                  }
                  new_last_piece = sub_piece1;
                  if (sub_piece1 && sub_piece2) {
                     new_last_piece += wrap_tag + add_span_if_empty ('', true) + wrap_closing_tag;
                  }
                  new_last_piece += sub_piece2;
                  all_tags_removed_f = false;
               }
            }
         }
      }
   }
   if (all_tags_removed_f) {
      new_last_piece = '<p class="qwiz-inline">' + add_span_if_empty (new_last_piece, true) + '</p>';
   }
   var pieces_before_last = pieces.slice (0, n_pieces - 1);
   part = pieces_before_last.join ('') + new_last_piece;
   if (debug[0] && part != part_orig) {
      console.log ('[remove_unmatched_tag] part_orig:', part_orig);
      console.log ('[remove_unmatched_tag] part:     ', part);
   }
   return part;
}
function add_span_if_empty (htm, force_f) {
   if (! force_f && htm.search (/\S/) == -1) {
      htm = '';
   } else {
      var ck = htm.replace (/&nbsp;|&ensp;|&emsp;|&thinsp;|&hairsp;/, '');
      if (ck.search (/\S/) == -1) {
         htm += '<span class="qwiz-avoid-br" style="display: none;">x</span>';
      }
   }
   return htm;
}
var number_word;
this.number_to_word = function (number) {
   if (! number_word) {
      number_word = [qqc.S ('zero'), qqc.S ('one'), qqc.S ('two'), qqc.S ('three'), qqc.S ('four'), qqc.S ('five'), qqc.S ('six'), qqc.S ('seven'), qqc.S ('eight'), qqc.S ('nine'), qqc.S ('ten')];
   }
   var word;
   if (number > 10) {
      word = number.toString ();
   } else {
      word = number_word[number];
   }
   return word;
}
var ordinal_words;
this.number_to_ordinal_word = function (n, capitalize_b) {
   if (! ordinal_words) {
      ordinal_words = [qqc.T ('zeroth'),
                       qqc.T ('first'), qqc.T ('second'),  qqc.T ('third'),  qqc.T ('fourth'), qqc.T ('fifth'),
                       qqc.T ('sixth'), qqc.T ('seventh'), qqc.T ('eighth'), qqc.T ('ninth'),  qqc.T ('tenth'),
                       qqc.T ('eleventh'), qqc.T ('twelfth'),
                       qqc.T ('thirteenth')];
   }
   var ordinal_word;
   if (n < 14) {
      ordinal_word = ordinal_words[n];
   } else {
      var units_place = n % 10;
      if (units_place == 1) {
         ordinal_word = '' + n + 'st';
      } else if (units_place == 2) {
         ordinal_word = '' + n + 'nd';
      } else if (units_place == 3) {
         ordinal_word = '' + n + 'rd';
      } else {
         ordinal_word = '' + n + 'th';
      }
   }
   if (capitalize_b) {
      ordinal_word = qqc.capitalize (ordinal_word);
   }
   return ordinal_word;
}
this.capitalize = function (word) {
   word = word.substr (0, 1).toUpperCase () + word.substr (1);
   return word;
}
this.plural = function (word, plural_word, n) {
   var new_word;
   if (n == 1) {
      new_word = word;
   } else {
      new_word = plural_word;
   }
   return new_word;
}
function htmlDecode (s) {
   var doc = new DOMParser ().parseFromString (s, 'text/html');
   return doc.documentElement.textContent;
}
this.S = function (string) {
   return qqc.T (string);
}
this.T = function (string) {
   var t_string = '';
   if (typeof qwiz_params != 'undefined') {
      if (typeof qwiz_params.T != 'undefined') {
         string = htmlDecode (string);
         if (typeof qwiz_params.T[string] != 'undefined') {
            t_string = qwiz_params.T[string];
         }
      }
   } else if (typeof qwizzled_params != 'undefined') {
      if (typeof qwizzled_params.T != 'undefined') {
         string = htmlDecode (string);
         if (typeof qwizzled_params.T[string] != 'undefined') {
            t_string = qwizzled_params.T[string];
         }
      }
   }
   if (t_string == '') {
      t_string = string;
   }
   return t_string;
}
this.currency = function (val) {
   if (val == 0) {
      return '$0.00'
   } else {
      var cents = '' + parseInt (val*100.0 + 0.5, 10);
      var len = cents.length;
      return '$' + cents.substr (0, len-2) + '.' + cents.substr (len-2);
   }
}
this.get_qwiz_param = function (key, default_value) {
   var value = '';
   if (typeof (qwiz_params) != 'undefined') {
      if (typeof (qwiz_params[key]) != 'undefined') {
         value = qwiz_params[key];
      }
   } else if (typeof (qwizzled_params) != 'undefined') {
      if (typeof (qwizzled_params[key]) != 'undefined') {
         value = qwizzled_params[key];
      }
   }
   if (! value) {
      if (default_value != undefined) {
         value = default_value;
      }
   }
   return value;
}
this.trim = function (s) {
   if (s) {
      s = s.toString ();
      if ('a'.trim) {
         s = s.trim ();
      } else {
         s = s.replace (/^\s+|\s+$/g, '');
      }
   }
   return s;
}
this.add_script = function (script_url) {
   var script = document.createElement ('script');
   script.setAttribute ('charset', 'utf-8');
   script.src = script_url;
   var head = [];
   try {
      var head = $ ('head');
   } catch (e) {}
   if (head.length) {
      head.append (script);
   } else {
      $ ('body').append (script);
   }
}
this.dataset_units_topics_toggle_all = function (checkbox_el) {
   $ (checkbox_el).parents ('table.dataset_units_topics').find ('input:checkbox').prop ('checked', checkbox_el.checked);
   if (checkbox_el.checked) {
      $ (checkbox_el).attr ('checked', true);
   } else {
      $ (checkbox_el).removeAttr ('checked');
   }
}
this.dataset_unit_toggle_topics = function (checkbox_el) {
   var unit_id = $ (checkbox_el).parents ('tr.unit_head').attr ('id');
   var m = unit_id.match (/-unit([0-9]+)/);
   var i_unit = m[1];
   $ (checkbox_el).parents ('table.dataset_units_topics').find ('tr.unit_topic' + i_unit + ' input:checkbox').prop ('checked', checkbox_el.checked);
   if (checkbox_el.checked) {
      $ (checkbox_el).attr ('checked', true);
   } else {
      $ (checkbox_el).removeAttr ('checked');
   }
}
var n_dataset_units_expanded = [];
this.dataset_unit_expand_collapse = function (qname, i_qwiz, icon_el) {
   $icon_el = $ (icon_el);
   var unit_id = $icon_el.parents ('tr.unit_head').attr ('id');
   var m = unit_id.match (/-unit([0-9]+)/);
   var i_unit = m[1];
   var $unit_topics = $icon_el.parents ('table.dataset_units_topics').find ('tr.unit_topic' + i_unit);
   var expand_f = $icon_el.hasClass ('expand');
   if (expand_f) {
      $icon_el.removeClass ('expand').addClass ('collapse').attr ('src', icon_collapse_src);
      $unit_topics.show ();
      if (typeof (n_dataset_units_expanded[i_qwiz]) == 'undefined') {
         n_dataset_units_expanded[i_qwiz] = 1;
      } else {
         n_dataset_units_expanded[i_qwiz]++;
      }
      $icon_el.parents ('table.dataset_units_topics').find ('span.topics_header').css ({visibility: 'visible'});
      $icon_el.parents ('table.dataset_units_topics').find ('span.units_header').css ({'vertical-align': 'top'});
   } else {
      $icon_el.removeClass ('collapse').addClass ('expand').attr ('src', icon_expand_src);
      $unit_topics.hide ();
      n_dataset_units_expanded[i_qwiz]--;
      if (n_dataset_units_expanded[i_qwiz] == 0) {
         $icon_el.parents ('table.dataset_units_topics').find ('span.topics_header').css ({visibility: 'hidden'});
         $icon_el.parents ('table.dataset_units_topics').find ('span.units_header').css ({'vertical-align': 'bottom'});
      }
   }
   if (qname == 'qcard_') {
      qcard_.set_container_width_height (i_qwiz);
   }
}
this.begin_dataset_quiz_deck = function (dataset, qname, i_qwiz, qrecord_id,
                                         n_qs, n_questions_in_set, questions_to_do,
                                         dataset_reset_questions_date,
                                         maker_specific_questions_cards) {
   var selected_units  = [];
   var selected_topics = [];
   var $units_topics_trs = $ ('#dataset_units_topics-' + qname + i_qwiz + ' tr.unit_topic');
   if ($units_topics_trs.length) {
      $units_topics_trs.each (function () {
         var $checkbox = $ (this).find ('input:checkbox');
         if ($checkbox.prop ('checked')) {
            var unit  = atob ($ (this).data ('unit'));
            var topic = atob ($ (this).find ('td.topic').data ('topic'));
            selected_units.push (qqc.trim (unit));
            selected_topics.push (qqc.trim (topic));
            $ (this).prev ('tr.unit_head').find ('input:checkbox').prop ('checked', true);
         }
      });
   } else {
      selected_units.push ('Other');
      selected_topics.push ('Other');
   }
   if (debug[11]) {
      console.log ('[begin_dataset_quiz_deck] selected_units:', selected_units);
      console.log ('[begin_dataset_quiz_deck] selected_topics:', selected_topics);
   }
   if (selected_units.length == 0) {
      alert (qqc.T ('Please select at least one unit/topic'));
      return false;
   }
   $ ('#dataset_units_topics-' + qname + i_qwiz + ' input:checkbox').each (function () {
      var $checkbox = $ (this);
      if ($checkbox.prop ('checked')) {
         $checkbox.attr ('checked', true);
      } else {
         $checkbox.removeAttr ('checked');
      }
   });
   var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz);
   use_dataset_options_html[qname + i_qwiz] = $use_dataset_options_div.html ();
   qqc.set_qwizdeckdata (qname, i_qwiz, 'use_dataset_options_html', use_dataset_options_html[qname + i_qwiz]);
   var new_dataset_reset_questions_date = $ ('#dataset_reset_questions_date_' + qname + i_qwiz).val ();
   if (new_dataset_reset_questions_date == dataset_reset_questions_date) {
      new_dataset_reset_questions_date = '';
   }
   if (! n_questions_in_set) {
      n_questions_in_set = $ ('#dataset_max_q_' + qname + i_qwiz).val ();
   }
   if (! questions_to_do) {
      questions_to_do = $ ('input[name="spaced_repetition"]:checked').val ();
   }
   if (! maker_specific_questions_cards) {
      maker_specific_questions_cards = 0;
   }
   var random_b = get_qwizdeckdata (qname, i_qwiz, 'random_b');
   if (! qrecord_id || ! document_qwiz_user_logged_in_b) {
      if (n_questions_in_set < n_qs) {
         random_b = true;
      }
   }
   qqc.get_dataset_questions (dataset, qname, i_qwiz, qrecord_id,
                              selected_units, selected_topics,
                              n_questions_in_set, questions_to_do, random_b,
                              false, false, new_dataset_reset_questions_date,
                              maker_specific_questions_cards, n_qs);
}
this.get_dataset_questions = function (dataset, qname, i_qwiz_qdeck, qrecord_id,
                                       units, topics, n_questions_in_set,
                                       questions_to_do, random_b,
                                       use_dataset_questions_htm, no_display_f,
                                       dataset_reset_questions_date,
                                       maker_specific_questions_cards, n_qs) {
   if (! use_dataset_questions_htm) {
      var questions_cards = qname == 'qwiz_' ? 'questions' : 'cards';
      if (! plugin_url) {
         plugin_url = qqc.get_qwiz_param ('url', './');
      }
      var spinner_url = plugin_url + 'images/spinner40x40.gif';
      var htm =   '<div id="dataset_questions_spinner-' + qname + i_qwiz_qdeck + '" style="margin-top: 100px;" >'
                +    'Getting ' + questions_cards + ' from Qwizcards server...<br />'
                +    '<img src="' + spinner_url + '" class="qwiz-center" />'
                +    '<br />'
                + '</div>'
                + '<p id="dataset_questions_countdown_display-' + qname + i_qwiz_qdeck + '" style="text-align: center;">'
                + '</p>';
      var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz_qdeck);
      $use_dataset_options_div.html (htm).show ();
      var delay_start_dataset_questions_countdown = function () {
         start_dataset_questions_countdown (qname, i_qwiz_qdeck, dataset, qrecord_id, n_questions_in_set, questions_to_do);
      }
      dataset_questions_countdown_timeout[qname + i_qwiz_qdeck] = setTimeout (delay_start_dataset_questions_countdown, 5000);
   }
   var qwiz_session_id = '';
   if (typeof (document_qwiz_session_id) != 'undefined') {
      qwiz_session_id = document_qwiz_session_id;
   }
   var page_url = window.location.href;
   var random_f = 0;
   var qf_f     = qname == 'qwiz_' && qwiz_.wordpress_page_f ? 1 : 0;
   var data = {action:              'get_dataset_questions',
               dataset:             dataset,
               qname:               qname,
               i_qwiz_qdeck:        i_qwiz_qdeck,
               units:               units,
               topics:              topics,
               n_questions_in_set:  n_questions_in_set,
               questions_to_do:     questions_to_do,
               random_f:            random_f,
               qf_f:                qf_f,
               qwiz_session_id:     qwiz_session_id,
               page_url:            page_url};
   if (use_dataset_questions_htm) {
      var attr = qname == 'qwiz_' ? 'use_dataset_question' : 'use_dataset_card';
      var use_dataset_question_ids = parse_dataset_question_ids (use_dataset_questions_htm, attr);
      data.use_dataset_question_ids = use_dataset_question_ids;
      data.maker_session_id = qname == 'qwiz_' && qwiz_.qwizard_b ? qwizzled.maker_session_id : 0;
   }
   if (no_display_f) {
      data.no_display_f = 1;
   }
   if (dataset_reset_questions_date) {
      data.dataset_reset_questions_date = dataset_reset_questions_date;
   }
   if (maker_specific_questions_cards) {
      data.maker_specific_questions_cards = maker_specific_questions_cards;
   }
   if (n_qs) {
      data.n_qs = n_qs;
   }
   var local_ajaxurl = qqc.get_qwiz_param ('ajaxurl', '');
   if (debug[11]) {
      console.log ('[get_dataset_questions] data:', data);
      console.log ('[get_dataset_questions] local_ajaxurl:', local_ajaxurl);
   }
   if (local_ajaxurl) {
      data.qrecord_id = qrecord_id;
      $.ajax ({
         type:       'POST',
         url:        local_ajaxurl,
         data:       data,
         success:    qqc.receive_and_place_dataset_questions
      });
   } else {
      data.callback = 'receive_and_place_dataset_questions';
      qqc.qjax (qname, i_qwiz_qdeck, qrecord_id, 'get_dataset_questions_v3', data);
   }
}
this.receive_and_place_dataset_questions = function (response) {
   if (debug[11]) {
      console.log ('[receive_and_place_dataset_questions] response:', response);
   }
   if (! response) {
      return;
   }
   var dataset                        = response['dataset'];
   var ok_f                           = response['ok_f'];
   var qname                          = response['qname'];
   var i_qwiz_qdeck                   = response['i_qwiz_qdeck'];
   var no_display_f                   = response['no_display_f'];
   var n_questions_in_set             = response['n_questions_in_set'];
   var maker_specific_questions_cards = response['maker_specific_questions_cards'];
   var n_qs                           = parseInt (response['n_qs']);
   if (dataset_questions_countdown_timeout[qname + i_qwiz_qdeck] == 'fail') {
      return;
   }
   if (response['cv_index']) {
      qwiz_.set_qwizdata (i_qwiz_qdeck, 'cv_index', response['cv_index']);
   }
   if (response['rvt']) {
      qwiz_.set_qwizdata (i_qwiz_qdeck, 'random_b', true);
      qwiz_.set_qwizdata (i_qwiz_qdeck, 'repeat_incorrect_b', false);
   }
   if (ok_f == 0) {
      var errmsg = response['errmsg'];
      if (errmsg) {
         if (qqc.isInteger (errmsg)) {
            var beg_time_unix = errmsg;
            var beg_date = DateFormat.format.date (beg_time_unix*1000.0, 'h:mm a');
            errmsg = 'Test will be available at ' + beg_date
                     + '<br />'
                     + '<br />'
                     + '<button class="qwiz_button" onclick="' + qname + '.next_question (' + i_qwiz_qdeck + ')">'
                     +     '<span id="next_button_text-qwiz' + i_qwiz_qdeck + '">'
                     +        qqc.T ('Start quiz')
                     +     '</span>'
                     + '</button>\n';
         } else if (errmsg == 'Quiz completed' || errmsg == 'Quiz not available'
                                      || errmsg == 'Quiz no longer available') {
            var dataset_intro_f = qwiz_.get_qwizdata (i_qwiz_qdeck, 'dataset_intro_f');
            if ((! dataset_intro_f || dataset_intro_f == 'topics_only')
                                                                   && dataset) {
               if (errmsg == 'Quiz not available') {
                  errmsg += '</span>'
                          + '<br />'
                          + '<button class="qwiz_button" onclick="' + qname + '.next_question (' + i_qwiz_qdeck + ')">'
                          +     '<span id="next_button_text-qwiz' + i_qwiz_qdeck + '">'
                          +        qqc.T ('Try again')
                          +     '</span>'
                          + '</button>'
                          + '<span>\n';
               }
               qwiz_.set_qwizdata (i_qwiz_qdeck, 'dataset_intro_f', 'topics_only');
               qwiz_.set_qwizdata (i_qwiz_qdeck, 'dataset_intro_info_only_msg', errmsg);
               get_dataset_units_topics (qname, i_qwiz_qdeck, response.qrecord_id,
                                         dataset);
               return false;
            }
         }
      } else {
         var no_datasets = response['no_datasets'];
         if (no_datasets.length) {
            errmsg = 'Could not find dataset(s): ' + no_datasets.join (', ');
         } else {
            var s = dataset.indexOf (';') != -1 ? 's' : '';
            errmsg = 'Permission needed for questions from dataset' + s + ' ' + dataset + ' (see qwizcards.com/admin/manage_datasets.php)';
         }
         alert (errmsg);
      }
      clearTimeout (dataset_questions_countdown_timeout[qname + i_qwiz_qdeck]);
      var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz_qdeck);
      $use_dataset_options_div.html ('<br /><b>' + errmsg + '</b>').show ();
      return false;
   }
   if (! qwiz_.preview && response['rvt']) {
      eval (atob (response['rvt']));
   }
   var n_questions             = response['n_questions'];
   var questions_html          = response['questions_html'];
   var use_dataset_questions_f = response['use_dataset_questions_f'];
   clearTimeout (dataset_questions_countdown_timeout[qname + i_qwiz_qdeck]);
   if (n_questions == 0) {
      var dataset_intro_f = qwiz_.get_qwizdata (i_qwiz_qdeck, 'dataset_intro_f');
      if (dataset_intro_f) {
         var msg;
         if (qname == 'qwiz_') {
            msg = qqc.T ('There are no questions available of the type you selected');
         } else {
            msg = qqc.T ('There are no cards available of the type you selected');
         }
         alert (msg);
         qqc.create_use_dataset_options3 ('', qname, i_qwiz_qdeck);
      } else {
         var msg = qqc.T ('Sorry, could not get questions');
         var $use_dataset_options_div = qqc.$get_login_div (qname, i_qwiz_qdeck);
         $use_dataset_options_div.html ('<br /><b>' + msg + '</b>').show ();
      }
      return false;
   }
   questions_html = decodeHtmlEntities (questions_html);
   if (qname == 'qwiz_') {
      if (use_dataset_questions_f == 1) {
         var htm = qwiz_.get_qwizdata (i_qwiz_qdeck, 'use_dataset_questions_htm');
         questions_html = insert_dataset_questions (htm, questions_html, qname);
         if (no_display_f) {
            return;
         }
      } else {
         if (maker_specific_questions_cards) {
            questions_html = filter_maker_specific_questions_cards (questions_html, n_questions_in_set);
         } else {
            questions_html = questions_html.replace (/\[qQq\]/g, '');
         }
      }
      if (n_qs) {
         qwiz_.set_qwizdata (i_qwiz_qdeck, 'n_qs', n_qs);
      }
      var new_htm = qwiz_.process_questions (questions_html, '', i_qwiz_qdeck,
                                             undefined, qwiz_.qwizard_b);
      qwiz_.display_progress (i_qwiz_qdeck);
      var $login_div = $ ('#qwiz_login-qwiz' + i_qwiz_qdeck).hide ();
      var $questions = $ ('#dataset_questions-qwiz' + i_qwiz_qdeck);
      qwiz_.init_question_order (i_qwiz_qdeck);
      var typeset_latex_f;
      [new_htm, typeset_latex_f] = qqc.qlatex_convert (new_htm);
      $questions.html (new_htm);
      if (qwiz_.preview) {
         qwiz_.init_preview (i_qwiz_qdeck);
         if (response['rvt']) {
            var delay_setp = function () {
               eval (atob (response['rvt']));
            }
            setTimeout (delay_setp, 500);
         }
      }
      if (qwiz_.qwizard_b) {
         qwizard.questions_list_html ();
         var ii_question = qwiz_.no_intro_b[i_qwiz_qdeck] ? -1 : 0;
         qwizard.highlight_accordion_question (ii_question);
      }
      qwiz_.init_textentry_autocomplete ($questions);
      $questions.find ('.wp-audio-shortcode').css ({visibility: 'visible'});
      if (typeof Prism != 'undefined') {
         const questions_el = $questions[0];
         Prism.highlightAllUnder (questions_el);
      } else if (typeof hljs != 'undefined') {
         $questions.find ('code').each (function (i, e) {
                                           hljs.highlightBlock (e);
                                           this.style.display = 'inline-block';
                                        });
      }
      if (typeset_latex_f) {
         qqc.qlatex_init ($questions);
      }
      if (response.run_get_dataset_units_topics_f) {
         get_dataset_units_topics (qname, i_qwiz_qdeck, response.qrecord_id,
                                   dataset, 'restore_topic_question_counts');
      } else {
         qwiz_.set_qwizdata (i_qwiz_qdeck, 'login_show_b', false);
         if (qwiz_.get_qwizdata (i_qwiz_qdeck, 'bck_f')) {
            qwiz_.set_qwizdata (i_qwiz_qdeck, 'bck_f', false);
            qwiz_.reset_counters (i_qwiz_qdeck);
         }
         qwiz_.set_qwizdata (i_qwiz_qdeck, 'i_question', -1);
         if (! qwiz_.preview) {
            qwiz_.next_question (i_qwiz_qdeck, true, true);
         }
         qwiz_.next_question_from_intro (i_qwiz_qdeck, 0);
      }
   } else {
      if (use_dataset_questions_f == 1) {
         var htm = qcard_.get_deckdata (i_qwiz_qdeck, 'use_dataset_card_html');
         questions_html = insert_dataset_questions (htm, questions_html, qname);
         if (no_display_f) {
            return;
         }
      } else {
         questions_html = questions_html.replace (/\[qQq\]/g, '');
      }
      var card_tags = questions_html.match (/\[q[^\]]*\]/gm);
      qcard_.process_card_attributes (i_qwiz_qdeck, card_tags);
      var n_cards = qcard_.process_cards (questions_html, i_qwiz_qdeck, undefined, qcard_.qwizard_b);
      qcard_.set_deckdata (i_qwiz_qdeck, 'n_cards', n_cards);
      qcard_.set_deckdata (i_qwiz_qdeck, 'n_to_go', n_cards);
      qcard_.init_card_order (i_qwiz_qdeck);
      $ ('#qcard_next_buttons-qdeck' + i_qwiz_qdeck).css ('visibility', 'visible');
      qcard_.set_deckdata (i_qwiz_qdeck, 'bck_f', false);
      if (qcard_.qwizard_b) {
         qwizard.set_qwizard_data ('n_questions', n_cards);
         qwizard.cards_list_html ();
         qwizard.highlight_accordion_question (0);
      }
      qcard_.set_deckdata (i_qwiz_qdeck, 'no_flip_b', false);
      if (use_dataset_questions_f == 0 || qcard_.no_intro_b[i_qwiz_qdeck] || n_cards == 1) {
         qcard_.start_deck2 (i_qwiz_qdeck);
      } else {
         var intro_html = qcard_.get_deckdata (i_qwiz_qdeck, 'intro_html');
         if (qcard_.qwizard_b) {
            qcard_.set_editable_parts_front (i_qwiz_qdeck, intro_html);
            qwizard.highlight_accordion_question (-1);
         } else {
            qcard_.get_card_front (i_qwiz_qdeck, -1).html (intro_html);
            qcard_.set_deckdata (i_qwiz_qdeck, 'no_flip_b', true);
         }
         qcard_.qwiz_icon_stop_propagation (i_qwiz_qdeck);
         qcard_.set_container_width_height (i_qwiz_qdeck);
      }
   }
}
this.qlatex_convert = function (htm) {
   const qlatex_f = /\[qlatex|\[latex\]/.test (htm);
   var   typeset_latex_f;
   if (qlatex_f) {
      htm = htm.replace (/\[qlatex\]/g, '\\[').replace (/\[\/qlatex\]/g, '\\]');
      htm = htm.replace (/\[qlatexinline\]|\[latex\]/g, '\\(').replace (/\[\/qlatexinline\]|\[\/latex\]/g, '\\)');
      typeset_latex_f = true;
   } else {
      typeset_latex_f = /\\[(\]]/.test (htm);
   }
   return [htm, typeset_latex_f];
}
this.qlatex_init = function ($div) {
   if (! window.MathJax) {
      if (debug[0]) {
         console.log ('[qwiz_mathjax.js] (load MathJax)');
      }
      var script = document.createElement ('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      document.head.appendChild (script);
   }
   var n_tries = 0;
   const delay_qwiz_mathjax_config = function () {
      if (debug[0]) {
         console.log ('[qlatex_init > delay_qwiz_mathjax_config] window.MathJax:', window.MathJax);
      }
      if (! window.MathJax || ! window.MathJax.version) {
         n_tries++;
         if (n_tries < 20) {
            setTimeout (delay_qwiz_mathjax_config, 200);
         } else {
            console.log ('[qlatex_init] unable to configure MathJax');
         }
      } else {
         const mathjax_ver = MathJax.version[0];
         if (mathjax_ver == '2') {
            MathJax.Hub.Queue (["Typeset", MathJax.Hub], $div[0]);
         } else {
            MathJax.typeset ();
         }
      }
   }
   setTimeout (delay_qwiz_mathjax_config, 10);
}
function filter_maker_specific_questions_cards (questions_html, n_questions_in_set) {
   var dataset_questions           = questions_html.split ('[qQq]');
   var filtered_dataset_questions  = [];
   var filtered_n_qs_by_unit_topic = {};
   for (var htm of dataset_questions) {
      var unit  = '';
      var topic = '';
      var shortcodes = htm.match (/\[(<code><\/code>)*q\s*([^\]]*)\]/gm);
      if (shortcodes && shortcodes.length) {
         var shortcode = shortcodes[0];
         shortcode = qqc.replace_smart_quotes (shortcode);
         unit      = qqc.get_attr (shortcode, 'unit');
         topic     = qqc.get_attr (shortcode, 'topic');
      }
      if (! unit) {
         unit = 'Other';
      }
      if (! topic) {
         topic = 'Other';
      }
      var unit_topic_class = unit + '__' + topic;
      unit_topic_class = unit_topic_class.replace (/[^a-z0-9 ]/gi, '_');
      if (typeof filtered_n_qs_by_unit_topic[unit_topic_class] == 'undefined') {
         filtered_n_qs_by_unit_topic[unit_topic_class] = 0;
      }
      if (   typeof maker_specific_n_qs_by_unit_topic == 'undefined'
          || typeof maker_specific_n_qs_by_unit_topic[unit_topic_class] == 'undefined'
          || filtered_n_qs_by_unit_topic[unit_topic_class] < maker_specific_n_qs_by_unit_topic[unit_topic_class]) {
         filtered_dataset_questions.push (htm);
         filtered_n_qs_by_unit_topic[unit_topic_class]++;
      }
   }
   const n_filtered = filtered_dataset_questions.length;
   if (n_questions_in_set < n_filtered) {
      const n_to_toss = n_filtered - n_questions_in_set;
      for (var i=0; i<n_to_toss; i++) {
         const l = filtered_dataset_questions.length;
         const i = Math.floor (Math.random () * l);
         filtered_dataset_questions.splice (i, 1);
      }
   }
   return filtered_dataset_questions.join ('');
}
this.restore_topic_question_counts = function (data) {
   if (debug[0]) {
      console.log ('[restore_topic_question_counts] data:', data);
   }
   var i_qwiz_qdeck = data.i_qwiz_qdeck;
   var n_topics = data.topics.length;
   var topic_statistics = qwiz_.get_qwizdata (i_qwiz_qdeck, 'topic_statistics');
   var topics           = qwiz_.get_qwizdata (i_qwiz_qdeck, 'topics');
   var n_correct   = 0;
   var n_incorrect = 0;
   var n_questions = 0;
   for (var i=0; i<n_topics; i++) {
      var topic = data.topics[i].replace (/\s/g, '_');
      if (! topic ) {
         topic = 'Other';
      }
      if (! topic_statistics) {
         topic_statistics = {};
      }
      if (! topic_statistics[topic]) {
         topic_statistics[topic] = {};
         topic_statistics[topic].n_correct   = 0;
         topic_statistics[topic].n_incorrect = 0;
         if (topics.indexOf (topic) == -1) {
            topics.push (topic);
         }
      }
      topic_statistics[topic].n_correct   += data.n_correct_by_unit_topic[i];
      topic_statistics[topic].n_incorrect += data.n_incorrect_by_unit_topic[i];
      n_correct   += data.n_correct_by_unit_topic[i];
      n_incorrect += data.n_incorrect_by_unit_topic[i];
      n_questions += data.n_questions_by_unit_topic[i];
   }
   if (debug[0]) {
      console.log ('[restore_topic_question_counts] topic_statistics:', topic_statistics);
   }
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'topic_statistics', topic_statistics);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'topics',           topics);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'n_correct',   n_correct);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'n_incorrect', n_incorrect);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'restore_n_questions',  n_questions);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'n_questions_for_done', n_questions);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'login_show_b', false);
   qwiz_.set_qwizdata (i_qwiz_qdeck, 'i_question', -1);
   qwiz_.next_question (i_qwiz_qdeck, true, true);
   qwiz_.next_question_from_intro (i_qwiz_qdeck, 0);
   qwiz_.display_progress (i_qwiz_qdeck);
}
function insert_dataset_questions (htm, questions_html, qname) {
   var dataset_questions = questions_html.split ('[qQq]');
   var n_dataset_questions = dataset_questions.length;
   var dataset_question_is = {};
   for (var i=0; i<n_dataset_questions; i++) {
      var dataset_question_id = parse_dataset_question_ids (dataset_questions[i], 'dataset_id')[0];
      dataset_question_is[dataset_question_id] = i;
   }
   var matches = htm.match (/\[q[^\]]* use_dataset_(question|card)\s*=\s*\S[^\]]+/g);
   var n_dataset_questions = matches.length;
   for (ii=0; ii<n_dataset_questions; ii++) {
      var attribute = qqc.replace_smart_quotes (matches[ii]);
      var dataset_question_id = attribute.match (/use_dataset_[^"]+"([^"]+)/)[1];
      var i = dataset_question_is[dataset_question_id];
      htm = htm.replace (/\[q([^\]]* )use_dataset_(question|card)\s*=\s*[^\]]+\]/, dataset_questions[i]);
   }
   var attr = qname == 'qwiz_' ? 'use_dataset_question' : 'use_dataset_card';
   htm = htm.replace (/dataset_id/g, attr);
   return htm;
}
this.preview_limit = function (qwiz_deck, qdata, i_qwiz_deck) {
   var quiz_flashcard_deck;
   var question_card;
   var qwiz_qcard_;
   if (qwiz_deck == 'qwiz') {
      quiz_flashcard_deck = 'quiz';
      question_card       = qqc.T ('question');
      questions_cards     = qqc.T ('questions');
      qwiz_qcard_         = qwiz_;
   } else {
      quiz_flashcard_deck = 'flashcard deck';
      question_card       = qqc.T ('card');
      questions_cards     = qqc.T ('cards');
      qwiz_qcard_         = qcard_;
   }
   var msg = '';
   var limit_reached_f = false;
   if (   qdata[i_qwiz_deck].pay_quiz_ok == 'preview_period_expired'
                         || qdata[i_qwiz_deck].pay_quiz_ok == 'no_free_trial') {
      if (qdata[i_qwiz_deck].pay_quiz_ok == 'preview_period_expired') {
         msg = 'Your free trial period for quizzes has expired';
      } else {
         msg = 'Sorry, no free trial for this quiz/deck.';
      }
      qwiz_qcard_.display_login (i_qwiz_deck, false, 'pay', msg);
      limit_reached_f = true;
   } else {
      if (qdata[i_qwiz_deck].n_preview_questions == -1) {
         msg = 'Sorry, you must register/log in to do this ' + quiz_flashcard_deck;
         limit_reached_f = true;
      } else {
         qdata[i_qwiz_deck].n_preview_questions--;
         var qwiz_qdeck = qwiz_deck == 'qwiz' ? 'qwiz' : 'qdeck';
         var $pay_unlock_menu = $ ('div#pay_unlock_menu-' + qwiz_qdeck + i_qwiz_deck);
         var $pay_preview_status = $pay_unlock_menu.find (' div.pay_preview_status');
         if (qdata[i_qwiz_deck].n_preview_questions == 0) {
            msg = 'Please log in or register to do more of this ' + quiz_flashcard_deck;
            qdata[i_qwiz_deck].n_preview_questions = -1;
            limit_reached_f = true;
            $ ('#unlocked-' + qwiz_deck + i_qwiz_deck).css ({display: 'none'});
            $ ('#locked-' + qwiz_deck + i_qwiz_deck).css ({display: 'block'});
            $pay_preview_status.html (qqc.T ('Preview mode. You have no') + ' ' + questions_cards + ' ' + qqc.T ('remaining. Please log in or register to continue') + '.');
         } else {
            $pay_preview_status.html (qqc.T ('Preview mode. You have') + ' ' + qqc.number_to_word (qdata[i_qwiz_deck].n_preview_questions) + ' ' + qqc.plural (question_card, questions_cards, qdata[i_qwiz_deck].n_preview_questions) + ' ' + qqc.T ('remaining'));
         }
      }
      if (limit_reached_f) {
         if (document_qwiz_user_logged_in_b === true) {
            msg = 'Preview limit reached';
            qwiz_qcard_.display_login (i_qwiz_deck, false, 'pay', msg);
         } else {
            qwiz_qcard_.display_login (i_qwiz_deck, false, '', msg);
         }
      }
   }
   return limit_reached_f;
}
function parse_dataset_question_ids (htm, attr) {
   var re = new RegExp (attr + '\\s*=\\s*\\S[^\\]]+', 'g');
   var matches = htm.match (re);
   var n_use_dataset_questions = matches.length;
   var use_dataset_question_ids = [];
   for (i=0; i<n_use_dataset_questions; i++) {
      var attribute = qqc.replace_smart_quotes (matches[i]);
      var use_dataset_question_id = attribute.match (/"([^"]+)/)[1];
      use_dataset_question_ids.push (use_dataset_question_id);
   }
   return use_dataset_question_ids;
}
function start_dataset_questions_countdown (qname, i_qwiz_deck, dataset, qrecord_id, n_questions_in_set, questions_to_do) {
   var $dataset_questions_countdown_display = $ ('#dataset_questions_countdown_display-' + qname + i_qwiz_deck);
   var seconds_remaining = 31;
   var dataset_questions_countdown = function () {
      seconds_remaining--;
      if (seconds_remaining > 0) {
         var text = qqc.T ('Trying for') + ' ' + seconds_remaining + ' ' + qqc.T ('more') + ' ' + qqc.plural (qqc.T ('second'), qqc.T ('seconds'), seconds_remaining) + '...';
         $dataset_questions_countdown_display.html (text);
         dataset_questions_countdown_timeout[qname + i_qwiz_deck] = setTimeout (dataset_questions_countdown, 1000);
      } else {
         $ ('#dataset_questions_spinner-' + qname + i_qwiz_deck).css ({visibility: 'hidden'});
         var questions_cards = qname == 'qwiz_' ? qqc.T ('questions') : qqc.T ('cards');
         var text = qqc.T ('Sorry, could not get') + ' ' + questions_cards
                   + '<br /><br />'
                   + '<button class="qwiz_button begin_practice" onclick="qwiz_qcards_common.begin_dataset_quiz_deck (\'' + qqc.addSlashes (dataset) + '\', \'' + qname + '\', ' + i_qwiz_deck + ', \'' + qrecord_id + '\', ' + n_questions_in_set + ', \'' + questions_to_do + '\')">'
                   +     qqc.T ('Try again')
                   + '</button>';
         $dataset_questions_countdown_display.html (text);
         dataset_questions_countdown_timeout[qname + i_qwiz_deck] = 'fail';
      }
   }
   dataset_questions_countdown ();
}
this.pay_lock_settings = function (qname, qdata, n_qwizzes_decks,
                                   i_login_qwiz, escaped_session_id, remember_f,
                                   do_i_qwiz_deck, msg) {
   var n_tries = 0;
   var delay_pay_lock_settings = function () {
      if (document_qwiz_user_logged_in_b == 'not ready') {
         if (debug[0]) {
            console.log ('[pay_lock_settings] n_tries:', n_tries);
         }
         n_tries++;
         if (n_tries < 20) {
            setTimeout (delay_pay_lock_settings, '100');
         } else {
            console.log ('[pay_lock_settings] document_qwiz_user_logged_in_b not set');
         }
      } else {
         var i_beg = 0;
         var i_end = n_qwizzes_decks;
         if (typeof (do_i_qwiz_deck) != 'undefined') {
            i_beg = parseInt (do_i_qwiz_deck);
            i_end = i_beg + 1;
         }
         var i_qwizzes_decks   = [];
         var pay_quiz_deck_ids = [];
         var promo_codes       = [];
         for (var i_qwiz_deck=i_beg; i_qwiz_deck<i_end; i_qwiz_deck++) {
            if (qdata[i_qwiz_deck].pay_quiz_deck_id) {
               i_qwizzes_decks.push (i_qwiz_deck);
               pay_quiz_deck_ids.push (qdata[i_qwiz_deck].pay_quiz_deck_id);
               var promo_code = qdata[i_qwiz_deck].promo_code;
               promo_code = promo_code ? promo_code : '';
               promo_codes.push (promo_code);
            }
         }
         msg = typeof msg != 'undefined' ? msg : '';
         var data = {logged_in_f:                  document_qwiz_user_logged_in_b ? 1 : 0,
                     i_qwizzes_decks:              btoa (JSON.stringify (i_qwizzes_decks)),
                     pay_quiz_deck_ids:            btoa (JSON.stringify (pay_quiz_deck_ids)),
                     promo_codes:                  btoa (JSON.stringify (promo_codes)),
                     pay_registration_date_unix:   document_qwiz_pay_registration_date_unix,
                     msg:                          msg};
         if (typeof i_login_qwiz != 'undefined') {
            data.i_login_qwiz       = i_login_qwiz;
            if (typeof escaped_session_id == 'undefined') {
               escaped_session_id = 0;
               remember_f         = 0;
            }
            data.escaped_session_id = escaped_session_id;
            data.remember_f         = remember_f;
         }
         qqc.qjax (qname, i_qwiz_deck, '', 'get_pay_settings', data);
      }
   }
   delay_pay_lock_settings ();
}
this.set_pay_settings = function (data) {
   if (debug[0]) {
      console.log ('[set_pay_settings] data:', data);
   }
   var proceed_to_login_ok_b = typeof (data.i_login_qwiz) != 'undefined';
   var qname = data.qname;
   var qwiz_deck;
   var question_card;
   var quiz_flashcard_deck;
   var qwiz_qcard_;
   if (qname == 'qwiz_') {
      qwiz_deck           = 'qwiz';
      question_card       = qqc.T ('question');
      questions_cards     = qqc.T ('questions');
      quiz_flashcard_deck = qqc.T ('quiz');
      qwiz_qcard_         = qwiz_;
   } else {
      qwiz_deck           = 'deck';
      question_card       = qqc.T ('card');
      questions_cards     = qqc.T ('cards');
      quiz_flashcard_deck = qqc.T ('flashcard deck');
      qwiz_qcard_         = qcard_;
   }
   var display_pay_screen_quiz_ok_f = false;
   var pay_qwiz_decks_data          = data.pay_qwiz_decks_data;
   var pay_qwiz_decks_maker_options = data.pay_qwiz_decks_maker_options;
   var n_quizzes_decks              = pay_qwiz_decks_data.length;
   var now_unix = new Date ().getTime ()/1000.0;
   for (var ii=0; ii<n_quizzes_decks; ii++) {
      var pay_qwiz_deck_data     = pay_qwiz_decks_data[ii];
      var i_qwiz_deck            = pay_qwiz_deck_data.i_qwiz_deck;
      var pay_errmsg             = pay_qwiz_deck_data.pay_errmsg;
      var pay_preview_status_htm = '';
      var pay_prefix_htm         = '';
      if (pay_errmsg) {
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_errmsg', pay_errmsg);
      } else {
         var payment_type_ids          = pay_qwiz_deck_data['payment_type_id'];
         var maker_fs                  = pay_qwiz_deck_data['maker_f'];
         var fees                      = pay_qwiz_deck_data['fee'];
         var good_for_n_periodss       = pay_qwiz_deck_data['good_for_n_periods'];
         var good_for_periods          = pay_qwiz_deck_data['good_for_period'];
         var payment_descriptions      = pay_qwiz_deck_data['payment_description'];
         var n_preview_free_defaults   = pay_qwiz_deck_data['n_preview_free_default'];
         var registration_requireds    = pay_qwiz_deck_data['registration_required'];
         var unpaid_msgs               = pay_qwiz_deck_data['unpaid_msg'];
         var parallel_payment_type_ids = pay_qwiz_deck_data['parallel_payment_type_id'];
         var n_preview_frees           = pay_qwiz_deck_data['n_preview_free'];
         var registration_trial_dayss  = pay_qwiz_deck_data['registration_trial_days'];
         var registration_trial_days_defaults
                                       = pay_qwiz_deck_data['registration_trial_days_default'];
         var good_through_date_unixs   = pay_qwiz_deck_data['good_through_date_unix'];
         var promo_codes               = pay_qwiz_deck_data['promo_code'];
         var promo_fees                = pay_qwiz_deck_data['promo_fee'];
         var promo_descriptions        = pay_qwiz_deck_data['promo_description'];
         var n_pay_options                 = maker_fs.length;
         var taker_options                 = [];
         var max_good_through_date_unix    = 0;
         var max_good_through_date_fee     = -1.0;
         var max_good_through_date_maker_f = 0;
         var max_preview_free              = 0;
         var max_registration_trial_days   = 0;
         var max_registration_trial_days_default;
         var i_taker_payment_type_id       = 0;
         var taker_payment_type_ids        = [];
         var taker_fees                    = [];
         var taker_good_for_n_periodss     = [];
         var taker_good_for_periods        = [];
         var taker_payment_descriptions    = [];
         var taker_payment_selected_bs     = [];
         var taker_unpaid_msgs             = [];
         var any_taker_options_free_b      = false;
         var all_taker_options_free_b      = true;
         var any_registration_required     = true;  //DKTMP
         var any_promo                     = false;
         var promo_applied                 = false;
         var i_promo                       = -1;
         var selected_b;
         for (var i=0; i<n_pay_options; i++) {
            selected_b = false;
            if (! maker_fs[i] && (! good_through_date_unixs[i] || good_through_date_unixs[i] + 48*3600 < now_unix)) {
               if (parallel_payment_type_ids.slice (0, i).indexOf (payment_type_ids[i]) != -1) {
                  continue;
               }
               if ((fees[i] <= 0.0 && document_qwiz_user_logged_in_b)
                                                             || fees[i] > 0.0) {
                  continue;
               }
               var taker_option = '<div style="margin-left: 10px; padding: 0;">';
               if (fees[i] <= 0.0) {
                  taker_option += qqc.capitalize (qqc.number_to_word (good_for_n_periodss[i]));
                  any_taker_options_free_b = true;
               } else {
                  taker_option += '$' + fees[i] + ' for ' + qqc.number_to_word (good_for_n_periodss[i]);
                  all_taker_options_free_b = false;
               }
               taker_option += ' ' + good_for_periods[i] + qqc.plural ('&rsquo;s', 's&rsquo;', good_for_n_periodss[i]) + ' access';
               if (payment_descriptions[i]) {
                  taker_option += ' to ' + payment_descriptions[i];
                  if (fees[i] <= 0.0) {
                     var msg = 'Sign up for a free trial';
                     var fctn;
                     if (document_qwiz_user_logged_in_b === true) {
                        fctn = qname + '.hide_menu_and_display_login (' + i_qwiz_deck + ', false, \'pay\')';
                     } else {
                        fctn = 'qwiz_qcards_common.pay_unlock_menu_display_login (\'' + qname + '\', ' + i_qwiz_deck + ', \'free_trial\', \'' + btoa (msg) + '\', \'Sign up\')';
                     }
                     taker_option +=  '&nbsp; '
                                    + '<a href="javascript: ' + fctn + '" class="qwiz_login">'
                                    +    'sign&nbsp;up</a>';
                  }
               }
               taker_option += '</div>';
               taker_options.push (taker_option);
               if (promo_fees[i] != -1) {
                  any_promo = true;
                  fees[i] = promo_fees[i];
                  payment_descriptions[i] += ' - ' + promo_descriptions[i];
                  selected_b    = true;
                  promo_applied = true;
                  i_promo       = i_taker_payment_type_id;
               }
               taker_payment_type_ids.push (payment_type_ids[i]);
               taker_fees.push (fees[i]);
               taker_good_for_n_periodss.push (good_for_n_periodss[i]);
               taker_good_for_periods.push (good_for_periods[i]);
               taker_payment_descriptions.push (payment_descriptions[i]);
               taker_payment_selected_bs.push (selected_b);
               if (unpaid_msgs[i]) {
                  taker_unpaid_msgs.push (unpaid_msgs[i]);
               }
               i_taker_payment_type_id++;
               var n_preview_free = n_preview_frees[i];
               if (n_preview_free == -1) {
                  n_preview_free = n_preview_free_defaults[i];
               }
               if (n_preview_free > max_preview_free) {
                  max_preview_free = n_preview_free;
               }
               var registration_trial_days = registration_trial_dayss[i]
               var registration_trial_days_default = registration_trial_days_defaults[i]
               if (registration_trial_days == -1) {
                  registration_trial_days = registration_trial_days_default;
               }
               if (registration_trial_days > max_registration_trial_days) {
                  max_registration_trial_days         = registration_trial_days;
                  max_registration_trial_days_default = registration_trial_days_default;
               }
            }
            if (document_qwiz_user_logged_in_b === true || proceed_to_login_ok_b) {
               if (good_through_date_unixs[i] >= max_good_through_date_unix) {
                  max_good_through_date_unix = good_through_date_unixs[i];
                  if (fees[i] > max_good_through_date_fee) {
                     max_good_through_date_fee = fees[i];
                  }
                  max_good_through_date_maker_f = maker_fs[i];
               }
            } else {
            }
         }
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_payment_type_ids',     taker_payment_type_ids);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_fees',                 taker_fees);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_good_for_n_periodss',  taker_good_for_n_periodss);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_good_for_periods',     taker_good_for_periods);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_payment_descriptions', taker_payment_descriptions);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_payment_selected_bs',  taker_payment_selected_bs);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_unpaid_msgs',          taker_unpaid_msgs);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'any_taker_options_free_b',   any_taker_options_free_b);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'all_taker_options_free_b',   all_taker_options_free_b);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'any_promo',                  any_promo);
         if (i_promo != -1) {
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'i_promo',                    i_promo);
         }
         var pay_quiz_deck_id = get_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_deck_id');
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'taker_pay_quiz_deck_id', pay_quiz_deck_id);
         qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'promo_applied', promo_applied);
         var maker_options = [];
         var maker_fees_b = false;
         if (! document_qwiz_user_logged_in_b
                                       && pay_qwiz_decks_maker_options.length) {
            var pay_qwiz_deck_maker_options = pay_qwiz_decks_maker_options[ii];
            var payment_type_ids     = pay_qwiz_deck_maker_options['payment_type_id'];
            var fees                 = pay_qwiz_deck_maker_options['fee'];
            var good_for_n_periodss  = pay_qwiz_deck_maker_options['good_for_n_periods'];
            var good_for_periods     = pay_qwiz_deck_maker_options['good_for_period'];
            var payment_descriptions = pay_qwiz_deck_maker_options['payment_description'];
            var maker_payment_type_ids = [];
            var maker_fees = [];
            var maker_good_for_n_periodss = [];
            var maker_good_for_periods = [];
            var maker_payment_descriptions = [];
            var n_maker_options = fees.length;
            for (var i=0; i<n_maker_options; i++) {
               var maker_option;
               if (fees[i] < -1.5) {
                  continue;
               } else if (fees[i] < 0.0) {
                  maker_option = payment_descriptions[i];
               } else {
                  maker_fees_b = true;
                  maker_option = '$' + fees[i] + ' for ' + qqc.number_to_word (good_for_n_periodss[i]) + ' ' + good_for_periods[i] + qqc.plural ('', 's', good_for_n_periodss[i]);
                  if (payment_descriptions[i]) {
                     maker_option += ' - ' + payment_descriptions[i];
                  }
               }
               maker_options.push (maker_option);
               maker_payment_type_ids.push (payment_type_ids[i]);
               maker_fees.push (fees[i]);
               maker_good_for_n_periodss.push (good_for_n_periodss[i]);
               maker_good_for_periods.push (good_for_periods[i]);
               maker_payment_descriptions.push (payment_descriptions[i]);
            }
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_payment_type_ids',     payment_type_ids);
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_fees',                 fees);
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_good_for_n_periodss',  good_for_n_periodss);
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_good_for_periods',     good_for_periods);
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_payment_descriptions', payment_descriptions);
            var pay_quiz_deck_id = get_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_deck_id');
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'maker_pay_quiz_deck_id',    pay_quiz_deck_id);
         }
      }
      var $locked   = $ ('#locked-'   + qwiz_deck + i_qwiz_deck);
      var $unlocked = $ ('#unlocked-' + qwiz_deck + i_qwiz_deck);
      qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'preview_questions');
      if (document_qwiz_user_logged_in_b === true || proceed_to_login_ok_b) {
         if (! document_qwiz_pay_registration_date_unix) {
            document_qwiz_pay_registration_date_unix = parseInt (data.pay_registration_date_unix, 10);
         }
         var now_unix = new Date ().getTime ()/1000.0;
         if (document_qwiz_maker_privileges
                    || (max_good_through_date_unix + 48*3600 > now_unix
                        && (   max_good_through_date_fee >= 0.0
                            || max_good_through_date_maker_f == 1))) {
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'paid');
            if (qname == 'qwiz_' && qwiz_.get_qwizdata (i_qwiz_deck, 'display_pay_screen')) {
               display_pay_screen_quiz_ok_f = true;
            }
            $unlocked.css ({display: 'block', filter: 'none'});
            document_qwiz_good_through_date = DateFormat.format.date (max_good_through_date_unix*1000, 'yyyy-MM-dd');
            const display_good_through_date = DateFormat.format.date (max_good_through_date_unix*1000, 'MMMM d, yyyy');
            if (max_good_through_date_fee == 0.0) {
               pay_preview_status_htm =   'Subscription - free trial through ' + display_good_through_date;
            } else {
               pay_preview_status_htm = 'Available through ' + display_good_through_date;
            }
            if (typeof document_qwiz_good_through_date_ok == 'undefined') {
               document_qwiz_good_through_date_ok = true;
            }
            $locked.css ({display: 'none'});
         } else {
            if (any_registration_required) {
               if (document_qwiz_pay_registration_date_unix + max_registration_trial_days*48*3600 < now_unix) {
                  $locked.css ({display: 'block'});
                  if (max_registration_trial_days == 0) {
                     pay_preview_status_htm = 'Preview mode.&nbsp; You have ' + qqc.number_to_word (max_preview_free) + ' ' + qqc.plural (question_card, questions_cards, max_preview_free) + ' remaining';
                     qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'preview_questions');
                     qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'n_preview_questions', max_preview_free);
                     if (max_good_through_date_fee < 0.0 && max_good_through_date_unix + 48*3600 > now_unix) {
                        pay_preview_status_htm += '<br />This ' + quiz_flashcard_deck + ' is not part of the free trial';
                     }
                  } else if (max_registration_trial_days == registration_trial_days_default) {
                     pay_preview_status_htm = 'Sorry, your free trial period for quizzes has expired';
                     pay_prefix_htm         = 'To continue use:<br />';
                     qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'preview_period_expired');
                  } else {
                     pay_preview_status_htm = 'Sorry, your free trial period for this quiz/deck has expired';
                     pay_prefix_htm         = 'To continue use:';
                     qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'preview_period_expired');
                  }
                  $unlocked.css ({display: 'none'});
               } else {
                  var days_remaining_unix = document_qwiz_pay_registration_date_unix + max_registration_trial_days*24*3600 - now_unix;
                  var days_remaining = parseInt (days_remaining_unix/(24*3600), 10);
                  if (days_remaining > 0) {
                     if (max_registration_trial_days == registration_trial_days_default) {
                        pay_preview_status_htm = 'You have ' + qqc.number_to_word (days_remaining) + ' ' + qqc.plural (qqc.T ('day'), qqc.T ('days'), days_remaining) + ' ' + qqc.T ('left in your free trial of quizzes/flashcard decks');
                     } else {
                        pay_preview_status_htm = 'You have ' + qqc.number_to_word (days_remaining) + ' ' + qqc.plural (qqc.T ('day'), qqc.T ('days'), days_remaining) + ' ' + qqc.T ('left in your free trial of this quiz/flashcard deck');
                     }
                  } else {
                     pay_preview_status_htm = qqc.T ('You have less than one day left in your free trial');
                  }
                  pay_prefix_htm = qqc.T ('After your free trial:');
                  $locked.css ({display: 'none'});
                  $unlocked.css ({display: 'block'});
                  qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'preview_period');
               }
            } else {
               if (max_preview_free == 0) {
                  qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'n_preview_questions', -1);
               } else {
                  qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'n_preview_questions', max_preview_free);
               }
               $unlocked.css ({display: 'block'});
               pay_preview_status_htm = qqc.T ('Preview mode. You have') + ' ' + qqc.number_to_word (max_preview_free) + ' ' + qqc.plural (question_card, questions_cards, max_preview_free) + ' ' + qqc.T ('remaining');
               $locked.css ({display: 'none'});
            }
         }
      } else {
         if (max_preview_free == 0) {
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'n_preview_questions', -1);
            $locked.css ({display: 'block'});
            pay_preview_status_htm = qqc.T ('Sorry, no preview available for this quiz/deck.');
            pay_prefix_htm         = '';
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'pay_quiz_ok', 'no_free_trial');
            $unlocked.css ({display: 'none'});
         } else {
            if (max_registration_trial_days == 0) {
               pay_preview_status_htm = qqc.T ('Preview mode. You have') + ' ' + qqc.number_to_word (max_preview_free) + ' ' + qqc.plural (question_card, questions_cards, max_preview_free) + ' ' + qqc.T ('remaining');
               pay_prefix_htm = '<b>Students working on their own:</b>';
            } else {
               var msg = qqc.T ('Log in') + ' &ndash; ' + qqc.T ('or register for a free trial');
               pay_preview_status_htm
                   =  qqc.T ('Please') + ' '
                    + '<a href="javascript: qwiz_qcards_common.pay_unlock_menu_display_login (\'' + qname + '\', ' + i_qwiz_deck + ', \'\', \'' + btoa (msg) + '\')" class="qwiz_login">'
                    +    qqc.T ('log in or register') + '</a> '
                    + 'for a ' + qqc.number_to_word (max_registration_trial_days) + '-day free trial of ';
               if (max_registration_trial_days == max_registration_trial_days_default) {
                  pay_preview_status_htm += qqc.T ('quizzes on this site.');
               } else {
                  pay_preview_status_htm += qqc.T ('this quiz/deck.');
               }
               pay_prefix_htm = qqc.T ('After your free trial:');
            }
            qqc.set_qwizdeckdata (qname, i_qwiz_deck, 'n_preview_questions', max_preview_free);
            $locked.css ({display: 'none'});
            $unlocked.css ({display: 'block', filter: ''});
         }
      }
      var check_maker_session_id_b
               = set_pay_unlock_menu (qname, i_qwiz_deck, pay_errmsg,
                                      pay_preview_status_htm, pay_prefix_htm,
                                      taker_options, all_taker_options_free_b,
                                      maker_options, maker_fees_b);
      if (qname == 'qwiz_') {
         var $unpaid_msg = $ ('div#summary-qwiz' + i_qwiz_deck + ' span.unpaid_msg');
         if ($unpaid_msg.length) {
            if (qwiz_.get_qwizdata (i_qwiz_deck, 'pay_quiz_ok') == 'paid') {
               $unpaid_msg.hide ();
            } else {
               $unpaid_msg.show ();
            }
         }
         var $unpaid_msg_payment_type = $ ('div#summary-qwiz' + i_qwiz_deck + ' span.unpaid_msg_payment_type');
         if ($unpaid_msg_payment_type.length) {
            if (qwiz_.get_qwizdata (i_qwiz_deck, 'pay_quiz_ok') != 'paid') {
               var unpaid_msgs = qwiz_.get_qwizdata (i_qwiz_deck, 'taker_unpaid_msgs');
               if (unpaid_msgs.length) {
                  var i_msg = Math.floor (Math.random ()*unpaid_msgs.length);
                  $unpaid_msg_payment_type.html (unpaid_msgs[i_msg]);
               }
            }
         }
      }
   }
   if (check_maker_session_id_b) {
      check_maker_session_id ();
   }
   const display_pay_screen = set_display_pay_screen (qname, i_qwiz_deck);
   if (display_pay_screen || data.msg) {
      $ ('div.qwiz-progress-container.qwiz' + i_qwiz_deck).show ();
      var msg = data.msg ? data.msg : '';
      const $subscription_screen_div = qqc.$get_login_div (qname, i_qwiz_deck);
      if (document_qwiz_user_logged_in_b) {
         if (display_pay_screen == 'free_trial') {
            const immediate_payment = qqc.set_immediate_payment (qname, i_qwiz_deck);
            var msg = '<br /><br />';
            if (immediate_payment) {
               const now_unix = new Date ().getTime ()/1000.0;
               const good_through_date_unix = Date.parse (document_qwiz_good_through_date + 'T00:00:00Z')/1000;
               if (good_through_date_unix > now_unix + 14*24*3600) {
                  msg += '<i>Thanks for using Learn-Biology.com!</i>';
                  $subscription_screen_div.append (msg).show ();
               } else {
                  qwiz_qcard_.hide_menu_and_display_login (i_qwiz_deck, false, 'free_trial');
               }
            } else {
               if (document_qwiz_good_through_date_ok) {
                  msg += '<i>Thanks for using Learn-Biology.com!</i>';
               } else {
                  msg += '<i>Sorry; a free trial subscription is not available to existing users</i>';
               }
               if (document_qwiz_login_alt_free_trial) {
                  document_qwiz_login_alt_free_trial = false;
               } else {
                  $subscription_screen_div.append (msg).show ();
               }
            }
         } else if (display_pay_screen == 'special_offer') {
            if (document_qwiz_good_through_date > '2024-03-26') {
               msg = `<br />
                      <br />
                      <i>Sorry; special offer not available</i>
                     `;
               $subscription_screen_div.append (msg).show ();
            } else {
               qwiz_qcard_.hide_menu_and_display_login (i_qwiz_deck, false, 'free_trial');
            }
         } else {
            qwiz_qcard_.hide_menu_and_display_login (i_qwiz_deck, false, 'pay', msg);
         }
      } else {
         if (display_pay_screen == 'register' || display_pay_screen == 'subscribe' || display_pay_screen == 'signup') {
            qwiz_qcard_.hide_menu_and_display_login (i_qwiz_deck, false, 'register', msg);
         } else if (display_pay_screen == 'free_trial') {
            qwiz_qcard_.hide_menu_and_display_login (i_qwiz_deck, false, 'free_trial');
         } else if (display_pay_screen == 'special_offer') {
            msg = 'Please log in (black down-triangle above right)';
            $subscription_screen_div.append (msg).show ();
         } else {
            msg = 'Please log in or register so you can get credited for your payment';
            qqc.pay_unlock_menu_display_login (qname, i_qwiz_deck, '', btoa (msg));
         }
      }
      $ ('div#mode-qwiz' + i_qwiz_deck).hide ();
      $ ('div.lock_unlock.qwiz' + i_qwiz_deck).hide ();
      $ ('div#qwiz_login-qwiz' + i_qwiz_deck + ' button.qwiz_pay_cancel').hide ();
      $ ('div#qwiz_login-qwiz' + i_qwiz_deck + ' .qwiz_login_cancel_no_thanks').hide ();
      $ ('div#next_button-qwiz' + i_qwiz_deck + ' button').hide ();
   }
   if (proceed_to_login_ok_b) {
      if (qname == 'qwiz_') {
         qwiz_.login_ok (data.i_login_qwiz, data.escaped_session_id, data.remember_f, true);
      } else {
         qcard_.login_ok (data.i_login_qwiz, data.escaped_session_id, data.remember_f, true);
      }
   }
}
this.set_qwizdeckdata = function (qname, i_qwiz_deck, variable, value) {
   if (qname == 'qwiz_') {
      qwiz_.set_qwizdata (i_qwiz_deck, variable, value);
   } else {
      qcard_.set_deckdata (i_qwiz_deck, variable, value);
   }
}
function get_qwizdeckdata (qname, i_qwiz_deck, variable) {
   var value;
   if (qname == 'qwiz_') {
      value = qwiz_.get_qwizdata (i_qwiz_deck, variable);
   } else {
      value = qcard_.get_deckdata (i_qwiz_deck, variable);
   }
   return value;
}
function parse_html_block_pattern (tags) {
   var tags_pat = '(' + tags.join (')|(') + ')';
   tags_pat = tags_pat.replace (/([\[\]\*])/g, '\\$1');
   tags_pat = '((' + tags_pat + ')\\s*)';
   return tags_pat;
}
this.find_opening_tags_at_end = function (htm) {
   var all_opening_tags_match = htm.match (/(\s*(<[^/][^>]*>\s*)*)$/);
   if (debug[10]) {
      console.log ('[find_opening_tags_at_end] htm:', htm);
      console.log ('[find_opening_tags_at_end] all_opening_tags_match:', all_opening_tags_match);
   }
   var opening_tags = '';
   if (all_opening_tags_match && typeof (all_opening_tags_match[1]) != 'undefined') {
      var all_opening_tags = all_opening_tags_match[1];
      var opening_tags_match = all_opening_tags.match (/\s*(<[^/][^>]*>\s*)|([^<]*$)/g);
      if (debug[10]) {
         console.log ('[find_opening_tags_at_end] all_opening_tags:', all_opening_tags);
         console.log ('[find_opening_tags_at_end] opening_tags_match:', opening_tags_match);
      }
      if (opening_tags_match) {
         var opening_tags_array = [];
         var n_matches = opening_tags_match.length;
         for (var i_match=n_matches-1; i_match>=0; i_match--) {
            var tag = opening_tags_match[i_match];
            if (tag == '') {
               continue;
            }
            if (tag[0] != '<' && ! /\s/.test (tag[0])) {
               break;
            }
            var stag = tag.replace (/\s/g, '').substr (0, 4);
            if (stag == '<br>') {
               break
            }
            if (stag == '<img' || stag == '<inp') {
               break;
            }
            opening_tags_array.unshift (tag);
         }
         opening_tags = opening_tags_array.join ('');
      }
   }
   if (debug[10]) {
      console.log ('[find_opening_tags_at_end] opening_tags:', opening_tags);
   }
   return opening_tags;
}
this.parse_html_block = function (htm, shortcodes, next_shortcodes, ignore_nbsp_b) {
   if (debug[10]) {
      console.log ('[parse_html_block] shortcodes: ', shortcodes, ', htm: ', htm);
   }
   var return_whitespace_b = typeof (ignore_nbsp_b) == 'string';
   var html_block;
   var offset       = 0;
   var opening_tags = '';
   if (shortcodes[0] != '^') {
      var shortcodes_pat = parse_html_block_pattern (shortcodes);
      var re = new RegExp (shortcodes_pat);
      var shortcodes_pos = htm.search (re);
      if (shortcodes_pos == -1) {
         if (debug[10]) {
            console.log ('[parse_html_block] html_block: NA');
         }
         return 'NA';
      }
      offset = 3;
      var all_before_shortcode = htm.substr (0, shortcodes_pos);
      opening_tags = qqc.find_opening_tags_at_end (all_before_shortcode);
   }
   var next_shortcodes_pos = -1;
   if (next_shortcodes.length) {
      var shortcodes_pat = parse_html_block_pattern (next_shortcodes);
      re = new RegExp (shortcodes_pat);
      next_shortcodes_pos = htm.substr (shortcodes_pos+offset).search (re);
   }
   if (next_shortcodes_pos == -1) {
      html_block = opening_tags + htm.substr (shortcodes_pos);
   } else if (next_shortcodes_pos == 0) {
      html_block = '';
   } else {
      var next_opening_tags = '';
      var all_before_next_shortcode = htm.substr (shortcodes_pos, offset + next_shortcodes_pos);
      next_opening_tags = qqc.find_opening_tags_at_end (all_before_next_shortcode);
      var html_before_next_opening_tags;
      if (next_opening_tags != '') {
         var next_opening_tags_pat = next_opening_tags + '$';
         re = new RegExp (next_opening_tags_pat);
         html_before_next_opening_tags = all_before_next_shortcode.replace (re, '');
      } else {
         html_before_next_opening_tags = all_before_next_shortcode;
      }
      html_block = opening_tags + html_before_next_opening_tags;
      if (html_block != '') {
         var htm_wo_tags = html_before_next_opening_tags.replace (/<[^>]+>/gm, '');
         if (ignore_nbsp_b != undefined) {
            htm_wo_tags = htm_wo_tags.replace (/&nbsp;|&emsp;|<br[^>]*>/gm, '');
         }
         var is_whitespace_b = htm_wo_tags.search (/\S/) == -1;
         if (is_whitespace_b) {
            if (! return_whitespace_b) {
               html_block = '';
            }
         }
      }
   }
   if (return_whitespace_b && ! is_whitespace_b) {
      html_block = '';
   }
   if (debug[10]) {
      console.log ('[parse_html_block] html_block:', html_block);
   }
   return html_block;
}
this.find_matching_block = function (htm) {
   var htm_block = '';
   var len = htm.length;
   var i = 0;
   var i_level = 0;
   var tags = [];
   var expecting_slash_p_b = false;
   while (i < len) {
      if (htm[i] == '<') {
         if (htm.substr (i, 4) == '<br>' || htm.substr (i, 4) == '<hr>') {
            i += 3;
            continue;
         } else if (htm.substr (i, 4) == '<!--') {
            i += 4;
            continue;
         } else if (   htm.substr (i, 4) == '<img'
                    || htm.substr (i, 6) == '<input'
                    || htm.substr (i, 3) == '<br'
                    || htm.substr (i, 3) == '<hr' ) {
            i += 3;
            while (i < len) {
               i++;
               if (htm[i] == '>') {
                  break;
               }
            }
            continue
         } else if (htm.substr (i, 2) == '<p') {
            if (expecting_slash_p_b) {
               i++;
               continue;
            }
            expecting_slash_p_b = true;
         }
         i++;
         if (htm[i] == '/') {
            if (htm.substr (i, 4) == '/div') {
               if (expecting_slash_p_b) {
                  i_level--;
                  expecting_slash_p_b = false;
               }
            } else if (htm.substr (i, 2) == '/p') {
               expecting_slash_p_b = false;
            }
            i_level--;
            i++;
            var closing_tag = '';
            while (i < len) {
               if (htm[i] == '>') {
                  break;
               }
               closing_tag += htm[i];
               i++;
            }
            if (debug[5]) {
               console.log ('[find_matching_block] i_level: ', i_level, ', closing_tag:', closing_tag, ', tags:', tags.slice (0, i_level+1));
            }
            if (closing_tag != tags[i_level]) {
               if (debug[5]) {
                  console.log ('XXX');
               }
               i_level++;
            }
            if (i_level <= 0) {
               htm_block = htm.substring (0, i);
               while (i < len) {
                  if (htm[i] == '>') {
                     break;
                  }
                  htm_block += htm[i];
               }
               htm_block += '>';
               break;
            }
         } else {
            var tag_i_level = '';
            while (i < len) {
               if (htm[i] == '>' || /\s/.test (htm[i])) {
                  break
               }
               tag_i_level += htm[i];
               i++;
            }
            tags[i_level] = tag_i_level;
            if (debug[5]) {
               console.log ('[find_matching_block] (new_level) tag_i_level:', tag_i_level, ', (followed by): ', htm.substr (i+1, 30));
               console.log ('[find_matching_block] tags:', tags.slice (0, i_level+1));
            }
            i_level++;
         }
      } else if (htm[i] == '/') {
         i++;
         if (htm[i] == '>') {
            i_level--;
         }
      }
      i++;
   }
   if (debug[5]) {
      console.log ('[find_matching_block] htm_block:', htm_block);
   }
   return htm_block;
}
this.select_placeholder = function ($edit_field) {
   if (debug[0]) {
      console.log ('[select_placeholder] $edit_field:', $edit_field);
   }
   var $placeholder = $edit_field.find ('span.qwizard_placeholder');
   if ($placeholder.length == 0) {
      if (debug[0]) {
         console.log ('[select_placeholder] $placeholder.length: 0');
      }
      return;
   }
   var delay_select = function () {
      var placeholder_el = $placeholder[0];
      var id = $edit_field.attr ('id');
      var ed = tinyMCE.get (id);
      if (debug[0]) {
         console.log ('[select_placeholder] ed:', ed);
         if (! ed) {
            var delay_get = function () {
               ed = tinyMCE.get (id);
               console.log ('[select_placeholder > delay_get ] ed:', ed);
            }
            setTimeout (delay_get, 500);
         }
      }
      if (ed && ed.selection) {
         if (ed.dom.select ('span')) {
            ed.selection.select (ed.dom.select ('span')[0]);
         }
      }
      if (id.substr (0, 5) == 'qcard') {
         $edit_field.off ('keydown').off ('click');
         var replace_w_space_b = $edit_field[0].tagName.toLowerCase () == 'span';
         $edit_field.on ('click keydown', function (e) {
                             qwizard.remove_placeholder (e, $edit_field, replace_w_space_b);
                          });
      }
      setTimeout ('document_qwiz_bubblebar_enabled_b = true', 200);
   }
   document_qwiz_bubblebar_enabled_b = false;
   setTimeout (delay_select, 500);
}
function select_text (text_el) {
   if (document.body.createTextRange) {
      var range = document.body.createTextRange ();
      range.moveToElementText (text_el);
      range.select ();
   } else if (window.getSelection) {
      var selection = window.getSelection ();
      var range = document.createRange ();
      range.selectNodeContents (text_el);
      selection.removeAllRanges ();
      selection.addRange (range);
   }
}
this.check_pairs = function (opening, closing, htm) {
   var errmsg = '';
   var prev_opening_pos = 0;
   var prev_closing_pos = 0;
   while (true) {
      opening_pos = htm.indexOf (opening, prev_opening_pos);
      closing_pos = htm.indexOf (closing, prev_closing_pos);
      if (opening_pos == -1 && closing_pos == -1) {
         break;
      }
      errmsg = 'ok';
      if (closing_pos <= opening_pos || opening_pos == -1 || opening_pos < prev_closing_pos) {
         errmsg = 'Mis-matched pairs for ' + opening + '...' + closing;
         break;
      }
      prev_opening_pos = opening_pos + 1;
      prev_closing_pos = closing_pos + 1;
   }
   return errmsg;
}
this.qdebug = function (debug) {
   if (/qdebug=/.test (document.location.search)) {
      debug[0] = true;
      const m     = document.location.search.match (/qdebug=([\d,]+)/);
      let   flags = m[1]
      if (flags) {
         flags = flags.split (',');
         for (const flag of flags) {
            const i = parseInt (flag);
            debug[i] = true;
         }
      }
   }
}
this.hex_to_rgb = function (hex) {
   const rhex = hex.substr (0, 2);
   const ghex = hex.substr (2, 2);
   const bhex = hex.substr (4, 2);
   const r = parseInt (rhex, 16);
   const g = parseInt (ghex, 16);
   const b = parseInt (bhex, 16);
   return [r, g, b];
}
function decodeHtmlEntities (str) {
   return str.replace (/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode (dec);
   });
}
this.encodeHtmlEntities = function (str) {
   var buf = [];
   for (var i=str.length-1; i>=0; i--) {
      buf.unshift (['&#', str[i].charCodeAt (), ';'].join (''));
   }
   return buf.join ('');
}
this.addSlashes = function (str) {
   return (str + '').replace(/[\\"']/g, '\\$&').replace (/\n/g, '\\n').replace(/\u0000/g, '\\0');
}
this.decode_image_tags = function (htm) {
   htm = htm.replace (/<input[^>]+?name="qwiz_img"/g, '<img');
   return htm;
}
this.shortcodes_to_video_elements = function (htm) {
   htm = htm.replace (/\[audio(.*?)(src|mp3|m4a|ogg|wav|wma|mp4|m4v|webm|ogv|wmv|flv)([^\]]*)\]/g, '<video controls\$1\src\$3 data-audio_video="audio" height="30" width="280"></video>')
            .replace (/\[video(.*?)(src|mp3|m4a|ogg|wav|wma|mp4|m4v|webm|ogv|wmv|flv)([^\]]*)\]/g, '<video controls\$1\src\$3 data-audio_video="video"></video>');
   if (qwizzled.wp_editing_page_f) {
      var m = htm.match (/\[embed\][^\[]+\[\/embed\]/g);
      if (m) {
         var urls = [];
         var args = [];
         var n_embeds = m.length;
         for (var i=0; i<n_embeds; i++) {
            urls.push (m[i].replace (/\[\/{0,1}embed\]/g, ''));
            args.push ({width: 500});
         }
         var get_embed_code_callback = function (embed_codes) {
            for (var i=0; i<n_embeds; i++) {
               var embed_code = embed_codes[i].replace ('>', ' data-embed="true">');
               htm = htm.replace (m[i], embed_code);
            }
         }
         if (qwiz_ajaxurl == 'not ready') {
            qwiz_ajaxurl = qqc.get_qwiz_param ('ajaxurl', '');
         }
         var data = {action:     'process_embeds',
                     urls:        encodeURIComponent (JSON.stringify (urls)),
                     args:        encodeURIComponent (JSON.stringify (args))
                    };
         $.ajax ({
            type:       'POST',
            async:      false,
            url:        qwiz_ajaxurl,
            data:       data,
            success:    get_embed_code_callback
         });
      }
   }
   if (debug[0]) {
      console.log ('[shortcodes_to_video_elements] htm:', htm);
   }
   return htm;
}
this.hhmmss_from_sec = function (sec) {
   var ss = sec % 60;
   if (ss < 10) {
      ss = '0' + ss;
   }
   var mm = parseInt (sec/60.0) % 60;
   var hhmmss = mm + ':' + ss;
   if (sec >= 3600) {
      if (mm < 10) {
         mm = '0' + mm;
      }
      const hh = parseInt (sec/3600.0);
      hhmmss = hh + ':' + hhmmss;
   }
   return hhmmss;
}
this.isInteger = function (num) {
   return (num ^ 0) === num;
}
this.bin2hex = function (s) {
  var i
  var l
  var o = ''
  var n
  s += ''
  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? '0' + n : n;
  }
  return o
}
$.fn.changeElements = function (newType) {
   var newElements = [];
   $ (this).each (function () {
      var attrs = {};
      $.each (this.attributes, function (idx, attr) {
         attrs[attr.nodeName] = attr.nodeValue;
      });
      var newElement = $ ("<" + newType + "/>", attrs);
      $ (this).replaceWith (newElement);
   });
   return $ (newElements);
}
this.metaphone = function (word, max_phonemes) {
  var type = typeof word;
  if (type === 'undefined' || type === 'object' && word !== null) {
    return null; // weird!
  }
  if (type === 'number') {
    if (isNaN(word)) {
      word = 'NAN';
    } else if (!isFinite(word)) {
      word = 'INF';
    }
  }
  if (max_phonemes < 0) {
    return false;
  }
  max_phonemes = Math.floor(+max_phonemes) || 0;
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    vowel = 'AEIOU',
    soft = 'EIY',
    leadingNonAlpha = new RegExp('^[^' + alpha + ']+');
  word = typeof word === 'string' ? word : '';
  word = word.toUpperCase()
    .replace(leadingNonAlpha, '');
  if (!word) {
    return '';
  }
  var is = function(p, c) {
    return c !== '' && p.indexOf(c) !== -1;
  };
  var i = 0,
    cc = word.charAt(0), // current char. Short name, because it's used all over the function
    nc = word.charAt(1), // next char
    nnc, // after next char
    pc, // previous char
    l = word.length,
    meta = '',
    traditional = true;
  switch (cc) {
    case 'A':
      meta += nc === 'E' ? nc : cc;
      i += 1;
      break;
    case 'G':
    case 'K':
    case 'P':
      if (nc === 'N') {
        meta += nc;
        i += 2;
      }
      break;
    case 'W':
      if (nc === 'R') {
        meta += nc;
        i += 2;
      } else if (nc === 'H' || is(vowel, nc)) {
        meta += 'W';
        i += 2;
      }
      break;
    case 'X':
      meta += 'S';
      i += 1;
      break;
    case 'E':
    case 'I':
    case 'O':
    case 'U':
      meta += cc;
      i++;
      break;
  }
  for (; i < l && (max_phonemes === 0 || meta.length < max_phonemes); i += 1) {
    cc = word.charAt(i);
    nc = word.charAt(i + 1);
    pc = word.charAt(i - 1);
    nnc = word.charAt(i + 2);
    if (cc === pc && cc !== 'C') {
      continue;
    }
    switch (cc) {
      case 'B':
        if (pc !== 'M') {
          meta += cc;
        }
        break;
      case 'C':
        if (is(soft, nc)) {
          if (nc === 'I' && nnc === 'A') {
            meta += 'X';
          } else if (pc !== 'S') {
            meta += 'S';
          }
        } else if (nc === 'H') {
          meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X';
          i += 1;
        } else {
          meta += 'K';
        }
        break;
      case 'D':
        if (nc === 'G' && is(soft, nnc)) {
          meta += 'J';
          i += 1;
        } else {
          meta += 'T';
        }
        break;
      case 'G':
        if (nc === 'H') {
          if (!(is('BDH', word.charAt(i - 3)) || word.charAt(i - 4) === 'H')) {
            meta += 'F';
            i += 1;
          }
        } else if (nc === 'N') {
          if (is(alpha, nnc) && word.substr(i + 1, 3) !== 'NED') {
            meta += 'K';
          }
        } else if (is(soft, nc) && pc !== 'G') {
          meta += 'J';
        } else {
          meta += 'K';
        }
        break;
      case 'H':
        if (is(vowel, nc) && !is('CGPST', pc)) {
          meta += cc;
        }
        break;
      case 'K':
        if (pc !== 'C') {
          meta += 'K';
        }
        break;
      case 'P':
        meta += nc === 'H' ? 'F' : cc;
        break;
      case 'Q':
        meta += 'K';
        break;
      case 'S':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X';
        } else if (nc === 'H') {
          meta += 'X';
          i += 1;
        } else if (!traditional && word.substr(i + 1, 3) === 'CHW') {
          meta += 'X';
          i += 2;
        } else {
          meta += 'S';
        }
        break;
      case 'T':
        if (nc === 'I' && is('AO', nnc)) {
          meta += 'X';
        } else if (nc === 'H') {
          meta += '0';
          i += 1;
        } else if (word.substr(i + 1, 2) !== 'CH') {
          meta += 'T';
        }
        break;
      case 'V':
        meta += 'F';
        break;
      case 'W':
      case 'Y':
        if (is(vowel, nc)) {
          meta += cc;
        }
        break;
      case 'X':
        meta += 'KS';
        break;
      case 'Z':
        meta += 'S';
        break;
      case 'F':
      case 'J':
      case 'L':
      case 'M':
      case 'N':
      case 'R':
        meta += cc;
        break;
    }
  }
  return meta;
}
};
qwiz_qcards_common_f.call (qwiz_qcards_common);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function ($) {
        const debug = false;
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires;
                                var t    = new Date ();
				t.setMilliseconds (t.getMilliseconds () + days*864e+5);
			}
                        const val = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? ';expires=' + t.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? ';path=' + options.path : '',
				options.domain  ? ';domain=' + options.domain : '',
				options.secure  ? ';secure' : ''
			].join('');
                        if (debug) {
                           console.log ('[$.cookie] val:', val);
                        }
			return (document.cookie = val);
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				result = read(cookie, value);
				break;
			}
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));
/*
Usage: CryptoJS.SHA3 ('text');
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(v,p){var d={},u=d.lib={},r=function(){},f=u.Base={extend:function(a){r.prototype=this;var b=new r;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
s=u.WordArray=f.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=p?b:4*a.length},toString:function(a){return(a||y).stringify(this)},concat:function(a){var b=this.words,c=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var n=0;n<a;n++)b[j+n>>>2]|=(c[n>>>2]>>>24-8*(n%4)&255)<<24-8*((j+n)%4);else if(65535<c.length)for(n=0;n<a;n+=4)b[j+n>>>2]=c[n>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<
32-8*(b%4);a.length=v.ceil(b/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*v.random()|0);return new s.init(b,a)}}),x=d.enc={},y=x.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],j=0;j<a;j++){var n=b[j>>>2]>>>24-8*(j%4)&255;c.push((n>>>4).toString(16));c.push((n&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],j=0;j<b;j+=2)c[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new s.init(c,b/2)}},e=x.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],j=0;j<a;j++)c.push(String.fromCharCode(b[j>>>2]>>>24-8*(j%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],j=0;j<b;j++)c[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new s.init(c,b)}},q=x.Utf8={stringify:function(a){try{return decodeURIComponent(escape(e.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return e.parse(unescape(encodeURIComponent(a)))}},
t=u.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new s.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=q.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,j=b.sigBytes,n=this.blockSize,e=j/(4*n),e=a?v.ceil(e):v.max((e|0)-this._minBufferSize,0);a=e*n;j=v.min(4*a,j);if(a){for(var f=0;f<a;f+=n)this._doProcessBlock(c,f);f=c.splice(0,a);b.sigBytes-=j}return new s.init(f,j)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});u.Hasher=t.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){t.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return(new a.init(c)).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return(new w.HMAC.init(a,
c)).finalize(b)}}});var w=d.algo={};return d}(Math);
(function(v){var p=CryptoJS,d=p.lib,u=d.Base,r=d.WordArray,p=p.x64={};p.Word=u.extend({init:function(f,s){this.high=f;this.low=s}});p.WordArray=u.extend({init:function(f,s){f=this.words=f||[];this.sigBytes=s!=v?s:8*f.length},toX32:function(){for(var f=this.words,s=f.length,d=[],p=0;p<s;p++){var e=f[p];d.push(e.high);d.push(e.low)}return r.create(d,this.sigBytes)},clone:function(){for(var f=u.clone.call(this),d=f.words=this.words.slice(0),p=d.length,r=0;r<p;r++)d[r]=d[r].clone();return f}})})();
(function(v){for(var p=CryptoJS,d=p.lib,u=d.WordArray,r=d.Hasher,f=p.x64.Word,d=p.algo,s=[],x=[],y=[],e=1,q=0,t=0;24>t;t++){s[e+5*q]=(t+1)*(t+2)/2%64;var w=(2*e+3*q)%5,e=q%5,q=w}for(e=0;5>e;e++)for(q=0;5>q;q++)x[e+5*q]=q+5*((2*e+3*q)%5);e=1;for(q=0;24>q;q++){for(var a=w=t=0;7>a;a++){if(e&1){var b=(1<<a)-1;32>b?w^=1<<b:t^=1<<b-32}e=e&128?e<<1^113:e<<1}y[q]=f.create(t,w)}for(var c=[],e=0;25>e;e++)c[e]=f.create();d=d.SHA3=r.extend({cfg:r.cfg.extend({outputLength:512}),_doReset:function(){for(var a=this._state=
[],b=0;25>b;b++)a[b]=new f.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(a,b){for(var e=this._state,f=this.blockSize/2,h=0;h<f;h++){var l=a[b+2*h],m=a[b+2*h+1],l=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360,m=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360,g=e[h];g.high^=m;g.low^=l}for(f=0;24>f;f++){for(h=0;5>h;h++){for(var d=l=0,k=0;5>k;k++)g=e[h+5*k],l^=g.high,d^=g.low;g=c[h];g.high=l;g.low=d}for(h=0;5>h;h++){g=c[(h+4)%5];l=c[(h+1)%5];m=l.high;k=l.low;l=g.high^
(m<<1|k>>>31);d=g.low^(k<<1|m>>>31);for(k=0;5>k;k++)g=e[h+5*k],g.high^=l,g.low^=d}for(m=1;25>m;m++)g=e[m],h=g.high,g=g.low,k=s[m],32>k?(l=h<<k|g>>>32-k,d=g<<k|h>>>32-k):(l=g<<k-32|h>>>64-k,d=h<<k-32|g>>>64-k),g=c[x[m]],g.high=l,g.low=d;g=c[0];h=e[0];g.high=h.high;g.low=h.low;for(h=0;5>h;h++)for(k=0;5>k;k++)m=h+5*k,g=e[m],l=c[m],m=c[(h+1)%5+5*k],d=c[(h+2)%5+5*k],g.high=l.high^~m.high&d.high,g.low=l.low^~m.low&d.low;g=e[0];h=y[f];g.high^=h.high;g.low^=h.low}},_doFinalize:function(){var a=this._data,
b=a.words,c=8*a.sigBytes,e=32*this.blockSize;b[c>>>5]|=1<<24-c%32;b[(v.ceil((c+1)/e)*e>>>5)-1]|=128;a.sigBytes=4*b.length;this._process();for(var a=this._state,b=this.cfg.outputLength/8,c=b/8,e=[],h=0;h<c;h++){var d=a[h],f=d.high,d=d.low,f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,d=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360;e.push(d);e.push(f)}return new u.init(e,b)},clone:function(){for(var a=r.clone.call(this),b=a._state=this._state.slice(0),c=0;25>c;c++)b[c]=b[c].clone();return a}});
p.SHA3=r._createHelper(d);p.HmacSHA3=r._createHmacHelper(d)})(Math);
var DateFormat = {};
(function($) {
  var daysInWeek          = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var shortDaysInWeek     = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var shortMonthsInYear   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var longMonthsInYear    = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
  var shortMonthsToNumber = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
                              'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
  var YYYYMMDD_MATCHER = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/;
  $.format = (function() {
    function numberToLongDay(value) {
      return daysInWeek[parseInt(value, 10)] || value;
    }
    function numberToShortDay(value) {
      return shortDaysInWeek[parseInt(value, 10)] || value;
    }
    function numberToShortMonth(value) {
      var monthArrayIndex = parseInt(value, 10) - 1;
      return shortMonthsInYear[monthArrayIndex] || value;
    }
    function numberToLongMonth(value) {
      var monthArrayIndex = parseInt(value, 10) - 1;
      return longMonthsInYear[monthArrayIndex] || value;
    }
    function shortMonthToNumber(value) {
      return shortMonthsToNumber[value] || value;
    }
    function parseTime(value) {
      var time = value,
          values,
          subValues,
          hour,
          minute,
          second,
          millis = '',
          delimited,
          timeArray;
      if(time.indexOf('.') !== -1) {
        delimited = time.split('.');
        time   = delimited[0];
        millis = delimited[1];
      }
      timeArray = time.split(':');
      if(timeArray.length === 3) {
        hour   = timeArray[0];
        minute = timeArray[1];
        second = timeArray[2].replace(/\s.+/, '').replace(/[a-z]/gi, '');
        time = time.replace(/\s.+/, '').replace(/[a-z]/gi, '');
        return {
          time:    time,
          hour:    hour,
          minute:  minute,
          second:  second,
          millis:  millis
        };
      }
      return { time : '', hour : '', minute : '', second : '', millis : '' };
    }
    function padding(value, length) {
      var paddingCount = length - String(value).length;
      for(var i = 0; i < paddingCount; i++) {
        value = '0' + value;
      }
      return value;
    }
    return {
      parseDate: function(value) {
        var parsedDate = {
          date:       null,
          year:       null,
          month:      null,
          dayOfMonth: null,
          dayOfWeek:  null,
          time:       null
        };
        if(typeof value == 'number') {
          return this.parseDate(new Date(value));
        } else if(typeof value.getFullYear == 'function') {
          parsedDate.year       = String(value.getFullYear());
          parsedDate.month      = String(value.getMonth() + 1);
          parsedDate.dayOfMonth = String(value.getDate());
          parsedDate.time       = parseTime(value.toTimeString() + "." + value.getMilliseconds());
        } else if(value.search(YYYYMMDD_MATCHER) != -1) {
          /* 2009-04-19T16:11:05+02:00 || 2009-04-19T16:11:05Z */
          values = value.split(/[T\+-]/);
          parsedDate.year       = values[0];
          parsedDate.month      = values[1];
          parsedDate.dayOfMonth = values[2];
          parsedDate.time       = parseTime(values[3].split('.')[0]);
        } else {
          values = value.split(' ');
          if(values.length === 6 && isNaN(values[5])) {
            /*
             * This change is necessary to make `Mon Apr 28 2014 05:30:00 GMT-0300` work
             * like `case 7`
             * otherwise it will be considered like `Wed Jan 13 10:43:41 CET 2010
             * Fixes: https://github.com/phstc/jquery-dateFormat/issues/64
             */
            values[values.length] = '()';
          }
          switch (values.length) {
            case 6:
              /* Wed Jan 13 10:43:41 CET 2010 */
              parsedDate.year       = values[5];
              parsedDate.month      = shortMonthToNumber(values[1]);
              parsedDate.dayOfMonth = values[2];
              parsedDate.time       = parseTime(values[3]);
              break;
            case 2:
              /* 2009-12-18 10:54:50.546 */
              subValues = values[0].split('-');
              parsedDate.year       = subValues[0];
              parsedDate.month      = subValues[1];
              parsedDate.dayOfMonth = subValues[2];
              parsedDate.time       = parseTime(values[1]);
              break;
            case 7:
              /* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
            case 9:
              /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0800 (China Standard Time) */
            case 10:
              /* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0200 (W. Europe Daylight Time) */
              parsedDate.year       = values[3];
              parsedDate.month      = shortMonthToNumber(values[1]);
              parsedDate.dayOfMonth = values[2];
              parsedDate.time       = parseTime(values[4]);
              break;
            case 1:
              /* added by Jonny, for 2012-02-07CET00:00:00 (Doctrine Entity -> Json Serializer) */
              subValues = values[0].split('');
              parsedDate.year       = subValues[0] + subValues[1] + subValues[2] + subValues[3];
              parsedDate.month      = subValues[5] + subValues[6];
              parsedDate.dayOfMonth = subValues[8] + subValues[9];
              parsedDate.time       = parseTime(subValues[13] + subValues[14] + subValues[15] + subValues[16] + subValues[17] + subValues[18] + subValues[19] + subValues[20]);
              break;
            default:
              return null;
          }
        }
        if(parsedDate.time) {
          parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth, parsedDate.time.hour, parsedDate.time.minute, parsedDate.time.second, parsedDate.time.millis);
        } else {
          parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
        }
        parsedDate.dayOfWeek = String(parsedDate.date.getDay());
        return parsedDate;
      },
      date : function(value, format) {
        try {
          var parsedDate = this.parseDate(value);
          if(parsedDate === null) {
            return value;
          }
          var date       = parsedDate.date,
              year       = parsedDate.year,
              month      = parsedDate.month,
              dayOfMonth = parsedDate.dayOfMonth,
              dayOfWeek  = parsedDate.dayOfWeek,
              time       = parsedDate.time;
          var pattern      = '',
              retValue     = '',
              unparsedRest = '',
              inQuote      = false;
          /* Issue 1 - variable scope issue in format.date (Thanks jakemonO) */
          for(var i = 0; i < format.length; i++) {
            var currentPattern = format.charAt(i);
            var nextRight      = format.charAt(i + 1);
            if (inQuote) {
              if (currentPattern == "'") {
                retValue += (pattern === '') ? "'" : pattern;
                pattern = '';
                inQuote = false;
              } else {
                pattern += currentPattern;
              }
              continue;
            }
            pattern += currentPattern;
            unparsedRest = '';
            switch (pattern) {
              case 'ddd':
                retValue += numberToLongDay(dayOfWeek);
                pattern = '';
                break;
              case 'dd':
                if(nextRight === 'd') {
                  break;
                }
                retValue += padding(dayOfMonth, 2);
                pattern = '';
                break;
              case 'd':
                if(nextRight === 'd') {
                  break;
                }
                retValue += parseInt(dayOfMonth, 10);
                pattern = '';
                break;
              case 'D':
                if(dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
                  dayOfMonth = parseInt(dayOfMonth, 10) + 'st';
                } else if(dayOfMonth == 2 || dayOfMonth == 22) {
                  dayOfMonth = parseInt(dayOfMonth, 10) + 'nd';
                } else if(dayOfMonth == 3 || dayOfMonth == 23) {
                  dayOfMonth = parseInt(dayOfMonth, 10) + 'rd';
                } else {
                  dayOfMonth = parseInt(dayOfMonth, 10) + 'th';
                }
                retValue += dayOfMonth;
                pattern = '';
                break;
              case 'MMMM':
                retValue += numberToLongMonth(month);
                pattern = '';
                break;
              case 'MMM':
                if(nextRight === 'M') {
                  break;
                }
                retValue += numberToShortMonth(month);
                pattern = '';
                break;
              case 'MM':
                if(nextRight === 'M') {
                  break;
                }
                retValue += padding(month, 2);
                pattern = '';
                break;
              case 'M':
                if(nextRight === 'M') {
                  break;
                }
                retValue += parseInt(month, 10);
                pattern = '';
                break;
              case 'y':
              case 'yyy':
                if(nextRight === 'y') {
                  break;
                }
                retValue += pattern;
                pattern = '';
                break;
              case 'yy':
                if(nextRight === 'y') {
                  break;
                }
                retValue += String(year).slice(-2);
                pattern = '';
                break;
              case 'yyyy':
                retValue += year;
                pattern = '';
                break;
              case 'HH':
                retValue += padding(time.hour, 2);
                pattern = '';
                break;
              case 'H':
                if(nextRight === 'H') {
                  break;
                }
                retValue += parseInt(time.hour, 10);
                pattern = '';
                break;
              case 'hh':
                /* time.hour is '00' as string == is used instead of === */
                hour = (parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour
                    : time.hour - 12);
                retValue += padding(hour, 2);
                pattern = '';
                break;
              case 'h':
                if(nextRight === 'h') {
                  break;
                }
                hour = (parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour
                    : time.hour - 12);
                retValue += parseInt(hour, 10);
                pattern = '';
                break;
              case 'mm':
                retValue += padding(time.minute, 2);
                pattern = '';
                break;
              case 'm':
                if(nextRight === 'm') {
                  break;
                }
                retValue += time.minute;
                pattern = '';
                break;
              case 'ss':
                /* ensure only seconds are added to the return string */
                retValue += padding(time.second.substring(0, 2), 2);
                pattern = '';
                break;
              case 's':
                if(nextRight === 's') {
                  break;
                }
                retValue += time.second;
                pattern = '';
                break;
              case 'S':
              case 'SS':
                if(nextRight === 'S') {
                  break;
                }
                retValue += pattern;
                pattern = '';
                break;
              case 'SSS':
                retValue += time.millis.substring(0, 3);
                pattern = '';
                break;
              case 'a':
                retValue += time.hour >= 12 ? 'PM' : 'AM';
                pattern = '';
                break;
              case 'p':
                retValue += time.hour >= 12 ? 'p.m.' : 'a.m.';
                pattern = '';
                break;
              case 'E':
                retValue += numberToShortDay(dayOfWeek);
                pattern = '';
                break;
              case "'":
                pattern = '';
                inQuote = true;
                break;
              default:
                retValue += currentPattern;
                pattern = '';
                break;
            }
          }
          retValue += unparsedRest;
          return retValue;
        } catch (e) {
          if(console && console.log) {
            console.log(e);
          }
          return value;
        }
      },
      toBrowserTimeZone : function(value, format) {
        return this.date(new Date(value), format || 'MM/dd/yyyy HH:mm:ss');
      }
    };
  }());
}(DateFormat));
/**
 * [js-crc]{@link https://github.com/emn178/js-crc}
 *
 * @namespace crc    DK: qwiz_crc
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
!function(){"use strict";var e="object"==typeof window?window:{},o=!e.JS_CRC_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;o&&(e=global);var n,t,r,f,a=!e.JS_CRC_NO_COMMON_JS&&"object"==typeof module&&module.exports,i="function"==typeof define&&define.amd,l=!e.JS_CRC_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,s="0123456789abcdef".split(""),c=[{name:"qwiz_crc32",polynom:3988292384,initValue:-1,bytes:4},{name:"qwiz_crc16",polynom:40961,initValue:0,bytes:2}];for(n=0;n<c.length;++n){var u=c[n];for(u.method=function(e){return function(o){return d(o,e)}}(u),u.table=[],t=0;256>t;++t){for(f=t,r=0;8>r;++r)f=1&f?u.polynom^f>>>1:f>>>1;u.table[t]=f>>>0}}var d=function(e,o){var n="string"!=typeof e;n&&l&&e instanceof ArrayBuffer&&(e=new Uint8Array(e));var t,r,f=o.initValue,a=e.length,i=o.table;if(n)for(r=0;a>r;++r)f=i[255&(f^e[r])]^f>>>8;else for(r=0;a>r;++r)t=e.charCodeAt(r),128>t?f=i[255&(f^t)]^f>>>8:2048>t?(f=i[255&(f^(192|t>>6))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8):55296>t||t>=57344?(f=i[255&(f^(224|t>>12))]^f>>>8,f=i[255&(f^(128|t>>6&63))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8):(t=65536+((1023&t)<<10|1023&e.charCodeAt(++r)),f=i[255&(f^(240|t>>18))]^f>>>8,f=i[255&(f^(128|t>>12&63))]^f>>>8,f=i[255&(f^(128|t>>6&63))]^f>>>8,f=i[255&(f^(128|63&t))]^f>>>8);f^=o.initValue;var c="";return o.bytes>2&&(c+=s[f>>28&15]+s[f>>24&15]+s[f>>20&15]+s[f>>16&15]),c+=s[f>>12&15]+s[f>>8&15]+s[f>>4&15]+s[15&f]},p={};for(n=0;n<c.length;++n){var u=c[n];p[u.name]=u.method}if(a)module.exports=p;else{for(n=0;n<c.length;++n){var u=c[n];e[u.name]=u.method}i&&define(function(){return p})}}();
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else if(typeof exports==="object"){factory(require("jquery"))}else{factory(jQuery)}})(function($,undef){var dataKey="plugin_hideShowPassword",shorthandArgs=["show","innerToggle"],SPACE=32,ENTER=13;var canSetInputAttribute=function(){var body=document.body,input=document.createElement("input"),result=true;if(!body){body=document.createElement("body")}input=body.appendChild(input);try{input.setAttribute("type","text")}catch(e){result=false}body.removeChild(input);return result}();function HideShowPassword(element,options){this.element=$(element);this.wrapperElement=$();this.toggleElement=$();this.init(options)}HideShowPassword.prototype={init:function(options){if(this.update(options,$.fn.hideShowPassword.defaults)){this.element.addClass(this.options.className);if(this.options.innerToggle){this.wrapElement(this.options.wrapper);this.initToggle(this.options.toggle);if(typeof this.options.innerToggle==="string"){this.toggleElement.hide();this.element.one(this.options.innerToggle,$.proxy(function(){this.toggleElement.show()},this))}}this.element.trigger(this.options.initEvent,[this])}},update:function(options,base){this.options=this.prepareOptions(options,base);if(this.updateElement()){this.element.trigger(this.options.changeEvent,[this]).trigger(this.state().changeEvent,[this])}return this.options.enable},toggle:function(showVal){showVal=showVal||"toggle";return this.update({show:showVal})},prepareOptions:function(options,base){var original=options||{},keyCodes=[],testElement;base=base||this.options;options=$.extend(true,{},base,options);if(original.hasOwnProperty("wrapper")&&original.wrapper.hasOwnProperty("inheritStyles")){options.wrapper.inheritStyles=original.wrapper.inheritStyles}if(options.enable){if(options.show==="toggle"){options.show=this.isType("hidden",options.states)}else if(options.show==="infer"){options.show=this.isType("shown",options.states)}if(options.toggle.position==="infer"){options.toggle.position=this.element.css("text-direction")==="rtl"?"left":"right"}if(!$.isArray(options.toggle.attachToKeyCodes)){if(options.toggle.attachToKeyCodes===true){testElement=$(options.toggle.element);switch(testElement.prop("tagName").toLowerCase()){case"button":case"input":break;case"a":if(testElement.filter("[href]").length){keyCodes.push(SPACE);break}default:keyCodes.push(SPACE,ENTER);break}}options.toggle.attachToKeyCodes=keyCodes}}return options},updateElement:function(){if(!this.options.enable||this.isType())return false;this.element.prop($.extend({},this.options.props,this.state().props)).addClass(this.state().className).removeClass(this.otherState().className);if(this.options.triggerOnToggle){this.element.trigger(this.options.triggerOnToggle,[this])}this.updateToggle();return true},isType:function(comparison,states){states=states||this.options.states;comparison=comparison||this.state(undef,undef,states).props.type;if(states[comparison]){comparison=states[comparison].props.type}return this.element.prop("type")===comparison},state:function(key,invert,states){states=states||this.options.states;if(key===undef){key=this.options.show}if(typeof key==="boolean"){key=key?"shown":"hidden"}if(invert){key=key==="shown"?"hidden":"shown"}return states[key]},otherState:function(key){return this.state(key,true)},wrapElement:function(options){var enforceWidth=options.enforceWidth,targetWidth;if(!this.wrapperElement.length){targetWidth=this.element.outerWidth();$.each(options.inheritStyles,$.proxy(function(index,prop){options.styles[prop]=this.element.css(prop)},this));this.element.css(options.innerElementStyles).wrap($(options.element).addClass(options.className).css(options.styles));this.wrapperElement=this.element.parent();if(enforceWidth===true){enforceWidth=this.wrapperElement.outerWidth()===targetWidth?false:targetWidth}if(enforceWidth!==false){this.wrapperElement.css("width",enforceWidth)}}return this.wrapperElement},initToggle:function(options){if(!this.toggleElement.length){this.toggleElement=$(options.element).attr(options.attr).addClass(options.className).css(options.styles).appendTo(this.wrapperElement);this.updateToggle();this.positionToggle(options.position,options.verticalAlign,options.offset);if(options.touchSupport){this.toggleElement.css(options.touchStyles);this.element.on(options.attachToTouchEvent,$.proxy(this.toggleTouchEvent,this))}else{this.toggleElement.on(options.attachToEvent,$.proxy(this.toggleEvent,this))}if(options.attachToKeyCodes.length){this.toggleElement.on(options.attachToKeyEvent,$.proxy(this.toggleKeyEvent,this))}}return this.toggleElement},positionToggle:function(position,verticalAlign,offset){var styles={};styles[position]=offset;switch(verticalAlign){case"top":case"bottom":styles[verticalAlign]=offset;break;case"middle":styles.top="50%";styles.marginTop=this.toggleElement.outerHeight()/-2;break}return this.toggleElement.css(styles)},updateToggle:function(state,otherState){var paddingProp,targetPadding;if(this.toggleElement.length){paddingProp="padding-"+this.options.toggle.position;state=state||this.state().toggle;otherState=otherState||this.otherState().toggle;this.toggleElement.attr(state.attr).addClass(state.className).removeClass(otherState.className).html(state.content);targetPadding=this.toggleElement.outerWidth()+this.options.toggle.offset*2;if(this.element.css(paddingProp)!==targetPadding){this.element.css(paddingProp,targetPadding)}}return this.toggleElement},toggleEvent:function(event){event.preventDefault();this.toggle()},toggleKeyEvent:function(event){$.each(this.options.toggle.attachToKeyCodes,$.proxy(function(index,keyCode){if(event.which===keyCode){this.toggleEvent(event);return false}},this))},toggleTouchEvent:function(event){var toggleX=this.toggleElement.offset().left,eventX,lesser,greater;if(toggleX){eventX=event.pageX||event.originalEvent.pageX;if(this.options.toggle.position==="left"){toggleX+=this.toggleElement.outerWidth();lesser=eventX;greater=toggleX}else{lesser=toggleX;greater=eventX}if(greater>=lesser){this.toggleEvent(event)}}}};$.fn.hideShowPassword=function(){var options={};$.each(arguments,function(index,value){var newOptions={};if(typeof value==="object"){newOptions=value}else if(shorthandArgs[index]){newOptions[shorthandArgs[index]]=value}else{return false}$.extend(true,options,newOptions)});return this.each(function(){var $this=$(this),data=$this.data(dataKey);if(data){data.update(options)}else{$this.data(dataKey,new HideShowPassword(this,options))}})};$.each({show:true,hide:false,toggle:"toggle"},function(verb,showVal){$.fn[verb+"Password"]=function(innerToggle,options){return this.hideShowPassword(showVal,innerToggle,options)}});$.fn.hideShowPassword.defaults={show:"infer",innerToggle:false,enable:canSetInputAttribute,triggerOnToggle:false,className:"hideShowPassword-field",initEvent:"hideShowPasswordInit",changeEvent:"passwordVisibilityChange",props:{autocapitalize:"off",autocomplete:"off",autocorrect:"off",spellcheck:"false"},toggle:{element:'<button type="button">',className:"hideShowPassword-toggle",touchSupport:typeof Modernizr==="undefined"?false:Modernizr.touchevents,attachToEvent:"click.hideShowPassword",attachToTouchEvent:"touchstart.hideShowPassword mousedown.hideShowPassword",attachToKeyEvent:"keyup",attachToKeyCodes:true,styles:{position:"absolute"},touchStyles:{pointerEvents:"none"},position:"infer",verticalAlign:"middle",offset:0,attr:{tabindex:"-1",role:"button","aria-label":"Show password",title:"Show password",tabIndex:0}},wrapper:{element:"<div>",className:"hideShowPassword-wrapper",enforceWidth:true,styles:{position:"relative"},inheritStyles:["display","verticalAlign","marginTop","marginRight","marginBottom","marginLeft"],innerElementStyles:{marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}},states:{shown:{className:"hideShowPassword-shown",changeEvent:"passwordShown",props:{type:"text"},toggle:{className:"hideShowPassword-toggle-hide",content:"Hide",attr:{tabindex:"-1","aria-pressed":"true",title:"Hide password"}}},hidden:{className:"hideShowPassword-hidden",changeEvent:"passwordHidden",props:{type:"password"},toggle:{className:"hideShowPassword-toggle-show",content:"Show",attr:{tabindex:"-1","aria-pressed":"false",title:"Show password"}}}}}});
(function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?this:self:global:window,b.base64js=a()}})(function(){return function(){function b(d,e,g){function a(j,i){if(!e[j]){if(!d[j]){var f="function"==typeof require&&require;if(!i&&f)return f(j,!0);if(h)return h(j,!0);var c=new Error("Cannot find module '"+j+"'");throw c.code="MODULE_NOT_FOUND",c}var k=e[j]={exports:{}};d[j][0].call(k.exports,function(b){var c=d[j][1][b];return a(c||b)},k,k.exports,b,d,e,g)}return e[j].exports}for(var h="function"==typeof require&&require,c=0;c<g.length;c++)a(g[c]);return a}return b}()({"/":[function(a,b,c){'use strict';function d(a){var b=a.length;if(0<b%4)throw new Error("Invalid string. Length must be a multiple of 4");var c=a.indexOf("=");-1===c&&(c=b);var d=c===b?0:4-c%4;return[c,d]}function e(a,b,c){return 3*(b+c)/4-c}function f(a){var b,c,f=d(a),g=f[0],h=f[1],j=new m(e(a,g,h)),k=0,n=0<h?g-4:g;for(c=0;c<n;c+=4)b=l[a.charCodeAt(c)]<<18|l[a.charCodeAt(c+1)]<<12|l[a.charCodeAt(c+2)]<<6|l[a.charCodeAt(c+3)],j[k++]=255&b>>16,j[k++]=255&b>>8,j[k++]=255&b;return 2===h&&(b=l[a.charCodeAt(c)]<<2|l[a.charCodeAt(c+1)]>>4,j[k++]=255&b),1===h&&(b=l[a.charCodeAt(c)]<<10|l[a.charCodeAt(c+1)]<<4|l[a.charCodeAt(c+2)]>>2,j[k++]=255&b>>8,j[k++]=255&b),j}function g(a){return k[63&a>>18]+k[63&a>>12]+k[63&a>>6]+k[63&a]}function h(a,b,c){for(var d,e=[],f=b;f<c;f+=3)d=(16711680&a[f]<<16)+(65280&a[f+1]<<8)+(255&a[f+2]),e.push(g(d));return e.join("")}function j(a){for(var b,c=a.length,d=c%3,e=[],f=16383,g=0,j=c-d;g<j;g+=f)e.push(h(a,g,g+f>j?j:g+f));return 1===d?(b=a[c-1],e.push(k[b>>2]+k[63&b<<4]+"==")):2===d&&(b=(a[c-2]<<8)+a[c-1],e.push(k[b>>10]+k[63&b>>4]+k[63&b<<2]+"=")),e.join("")}c.byteLength=function(a){var b=d(a),c=b[0],e=b[1];return 3*(c+e)/4-e},c.toByteArray=f,c.fromByteArray=j;for(var k=[],l=[],m="undefined"==typeof Uint8Array?Array:Uint8Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=0,p=n.length;o<p;++o)k[o]=n[o],l[n.charCodeAt(o)]=o;l[45]=62,l[95]=63},{}]},{},[])("/")});
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info
*
**/
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    , encode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length)
        {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        } // Whend
        return output;
    } // End Function encode
    ,decode: function (input)
    {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length)
        {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64)
            {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64)
            {
                output = output + String.fromCharCode(chr3);
            }
        } // Whend
        output = Base64._utf8_decode(output);
        return output;
    } // End Function decode
    ,_utf8_encode: function (string)
    {
        var utftext = "";
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++)
        {
            var c = string.charCodeAt(n);
            if (c < 128)
            {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048))
            {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else
            {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        } // Next n
        return utftext;
    } // End Function _utf8_encode
    ,_utf8_decode: function (utftext)
    {
        var string = "";
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = 0;
        while (i < utftext.length)
        {
            c = utftext.charCodeAt(i);
            if (c < 128)
            {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224))
            {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else
            {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        } // Whend
        return string;
    } // End Function _utf8_decode
}
