if (! window.console) {
   window.console = {log: function(){} };
}
qwiz_ = {};
var qwizf = function () {
var qname = 'qwiz_';
var debug = [];
debug.push (false);    // 0 - general.
debug.push (false);    // 1 - radio/choices html.
debug.push (false);    // 2 - feedback html.
debug.push (false);    // 3 - old/new html dump.
debug.push (false);    // 4 - question tags/topics.
debug.push (false);    // 5 - unused.
debug.push (false);    // 6 - [textentry] / autocomplete.
debug.push (false);    // 7 - Enter -> click.
debug.push (false);    // 8 - Drag and drop.
debug.push (false);    // 9 - [hangman].
debug.push (false);    // 10 - unused (used in qwiz_qcards_common).
debug.push (false);    // 11 - use_dataset.
debug.push (false);    // 12 - Wizard.
if (/qdebug=1/.test (document.location.search)) {
   debug[0] = true;
}
var $ = jQuery;
this.no_intro_b = [];
this.processing_complete_b = false;
this.qrecord_b = false;
this.dataset_b = false;
this.preview = false;
this.any_pay_quiz_f = false;
this.hotspot_alpha_value        = 121;
this.hotspot_alpha_value_tmp    = 122;
this.hotspot_border_alpha_value = 254;
var q = this;
var qqc;
var regular_page_f = true;
var content;
var default_use_dict;
var default_use_terms;
var hint_timeout_sec;
var default_hangman_max_hints;
var correct;
var incorrect;
var errmsgs = [];
var n_qwizzes = 0;
var qwizzled_b;
var qwizcards_page_f = false;
var qwizdata = [];
var header_html;
var drag_and_drop_initialized_b = false;
var try_again_obj = '';
var $label_clicked = [];
var $prev_label_clicked = [];
var ignore_label_click_b = false;
var next_button_active_b = false;
var textentry_b = false;
var loaded_metaphone_js_b = false;
var default_textentry_terms_metaphones;
var current_question_textentry_terms_metaphones = {};
var textentry_answers = {};
var textentry_answer_metaphones = {};
var textentry_matches = {};
var lc_textentry_matches = {};
var textentry_i_qwiz;
var suppress_hangman_hint_b = false;
var Tcheck_answer_message;
var show_hint_timeout = {};
var panel_exit_mobile_open_b = false;
var panel_exit_mobile_just_closed_b;
var non_mobile_scrollLeft;
var non_mobile_scrollTop;
var qw;
var set_qwizard_data_b = false;
var preview_min_height;
var preview_mode = 'questions_active';
this.wordpress_page_f = false;
var reinit_highlighting_f = false;
var restart_timers_i_qwiz = -1;
$ (document).ready (function () {
   qqc = qwiz_qcards_common;
   qqc.qdebug (debug);
   if (typeof document_qwiz_wp_user_session_id != 'undefined') {
      const options = {path: '/', expires: 1};
      $.cookie ('qwiz_session_id', document_qwiz_wp_user_session_id, options);
   } else {
      document_qwiz_wp_user_session_id = '';
   }
   var preview_i_qwiz = $.cookie ('qwiz_preview');
   if (typeof preview_i_qwiz != 'undefined') {
      q.preview_i_qwiz_plus1 = parseInt (preview_i_qwiz, 10) + 1;
      document_qwiz_username = $.cookie ('qwiz_preview_username');
      $.removeCookie ('qwiz_preview', {path: '/'});
   }
   if (debug[0]) {
      console.log ('[qwiz.js > document ready] typeof (document_qwizard_user_page):', typeof (document_qwizard_user_page));
      console.log ('[qwiz.js > document ready] q.preview_i_qwiz_plus1:', q.preview_i_qwiz_plus1);
   }
   correct = [S ('Good!'), S ('Correct!'), S ('Excellent!'), S ('Great!')];
   incorrect = [S ('Sorry, no.'), S ('No, that\'s not correct.'), S ('Sorry, that\'s not correct.')];
   var page_url = document.location.href;
   qwizcards_page_f =    page_url.indexOf ('qwizcards.com/u/')     != -1
                      || page_url.indexOf ('qwizcards.com/admin/') != -1
                      || page_url.indexOf ('qwizcards.net/u/')     != -1
                      || page_url.indexOf ('qwizcards.net/admin/') != -1
                      || page_url.indexOf ('localhost/u/')         != -1
                      || page_url.indexOf ('localhost/admin/')     != -1
                      || page_url.indexOf ('192.168.1.120/u/'    ) != -1
                      || page_url.indexOf ('192.168.1.120/admin/') != -1;
   if (typeof document_qwizard_user_page == 'undefined'
               && page_url.indexOf ('admin-ajax') == -1
               && window.location.href.indexOf ('action=edit') == -1
                          && window.location.href.indexOf ('post-new') == -1) {
      q.qwiz_init ();
   } else {
      regular_page_f = false;
   }
});
this.qwiz_init = function (skip_error_check_f, only_get_qwiz_param_f, proceed_f) {
   /*
   if (debug[0]) {
      if (! proceed_f) {
         const proceed_button = `
            <button id="qwiz_proceed" style="position: fixed; left: 300px; top: 200px; z-index: 100; font-size: 24pt;"
                    onclick="${qname}.qwiz_init (false, false, true)">
               Proceed
            </button>
         `;
         $ ('body').append (proceed_button);
         return;
      } else {
         $ ('#qwiz_proceed').hide ();
      }
   }
   */
   content                   = qqc.get_qwiz_param ('content', 'body');
   default_use_dict          = qqc.get_qwiz_param ('use_dict', 'true');
   default_use_terms         = qqc.get_qwiz_param ('use_terms', 'true');
   default_hangman_max_hints = parseInt (qqc.get_qwiz_param ('hangman_hints', 2), 10);
   hint_timeout_sec          = qqc.get_qwiz_param ('hint_timeout_sec', 20);
   q.qwizcards_version       = qqc.get_qwiz_param ('qwizcards_version', '');
   document_qwiz_mobile_enabled = qqc.get_qwiz_param ('mobile_enabled', 'Always');
   if (document_qwiz_mobile_enabled == 'Enabled') {
      document_qwiz_mobile_enabled = 'Always';
   }
   Tcheck_answer_message = T ('Need help?  Try the "hint" button');
   if (only_get_qwiz_param_f) {
      return;
   }
   qqc.set_force_mobile ();
   process_html ();
   if (errmsgs.length && ! skip_error_check_f) {
      if (! q.qwizard_b) {
         if (qqc.get_qwiz_param ('regular_page_error_check')) {
            alert (plural (S ('Error found'), S ('Errors found'), errmsgs.length) + ':\n\n' + errmsgs.join ('\n'));
         } else {
            console.log ('Errors found:\n', errmsgs.join ('\n'));
         }
      }
   }
   if (document_qwiz_force_mobile_f) {
      q.go_mobile (0);
   }
   if (n_qwizzes) {
      for (var i_qwiz=0; i_qwiz<n_qwizzes; i_qwiz++) {
         if (qwizdata[i_qwiz].questions) {
            if (! document_qwiz_force_mobile_f) {
               const mobile_enabled = qwizdata[i_qwiz].mobile_enabled;
               if (mobile_enabled == 'Always'
                      || (mobile_enabled == 'Small screens only'
                                           && qqc.is_mobile (mobile_enabled))) {
                  $ ('.go-mobile-qwiz' + i_qwiz).show ();
               }
            }
            if (qwizdata[i_qwiz].qrecord_id) {
               qwizdata[i_qwiz].record_start_b = true;
            }
            if (! qwizdata[i_qwiz].use_dataset) {
               q.init_question_order (i_qwiz)
            }
            if (q.no_intro_b[i_qwiz] || qwizdata[i_qwiz].n_questions == 1
                                                    || q.preview_i_qwiz_plus1) {
               q.next_question (i_qwiz);
            } else {
               if (! qwizdata[i_qwiz].display_pay_screen) {
                  $ ('div.intro-qwiz' + i_qwiz).show ();
                  $ ('div#next_button-qwiz' + i_qwiz).show ();
               }
            }
         }
      }
      if (! q.$dialog_no_credit) {
         $ ('body').append (dialog_no_credit_html ());
         q.$usernames_is_are = $ ('#qwiz_usernames_is_are');
         q.$dialog_no_credit = $ ('#qwiz_dialog_no_credit').dialog ({
            height:        400,
            width:         550,
            modal:         true,
            autoOpen:      false,
            open:          function () {
                              check_timers ();
                              $ ('div#qwiz_request_assign_to_class_feedback').html ('');
                              $ ('button#qwiz_request_assign_to_class').removeClass ('qwiz_button_disabled').removeAttr ('disabled');
                           },
            buttons:       {'Close':   function () {
                                          q.$dialog_no_credit.dialog ('close');
                                          if (restart_timers_i_qwiz != -1) {
                                             const i_qwiz = restart_timers_i_qwiz;
                                             if (qwizdata[i_qwiz].question_time_limit) {
                                                start_timers (i_qwiz, qwizdata[i_qwiz].question_time_limit);
                                             }
                                             if (qwizdata[i_qwiz].qwiz_timer) {
                                                start_timers (i_qwiz);
                                             }
                                             restart_timers_i_qwiz = -1;
                                          }
                                       }
                           }
         });
      }
      if (q.preview_i_qwiz_plus1) {
         var i_preview_qwiz = q.preview_i_qwiz_plus1 - 1;
         if (! qwizdata[i_preview_qwiz].use_dataset) {
            q.init_preview (i_preview_qwiz);
         }
      } else {
         if (q.preview && ! q.qwizard_b) {
            q.init_preview (0);
         }
      }
   }
   if (reinit_highlighting_f) {
      if (typeof Prism != 'undefined') {
         Prism.highlightAll ();
      } else if (typeof hljs != 'undefined') {
         $ ('code').each (function (i, e) {
                             hljs.highlightBlock (e);
                             this.style.display = 'inline-block';
                          });
      }
   }
}
function process_html () {
   $ ('p:contains("[!]"), :header:contains("[!]")').each (function () {
      var comment_htm = $ (this).html ();
      if (comment_htm.search (/\s*(<.+?>)*\s*\[!+\][^]*?\[\/!+\]\s*(<.+?>)*\s*$/m) == 0) {
         $ (this).remove ();
      }
   });
   $ ('p:contains("qwiz"), :header:contains("qwiz")').each (function () {
      var tag_htm = $ (this).html ();
      if (tag_htm.search (/\s*\[\/{0,1}qwiz[^\]]*\]\s*/m) == 0) {
         $ (this).replaceWith (tag_htm);
      }
   });
   if (! q.qwizard_b) {
      q.wordpress_page_f = qqc.get_qwiz_param ('wppf', '') == 1;
   }
   var div_html_selector = '';
   var $qwiz_divs= $ ('div.qwiz_wrapper');
   var $fallback_wrappers = $ ('div.qwiz_wrapper_fallback');
   if ($qwiz_divs.length) {
      div_html_selector = 'div.qwiz_wrapper';
      $fallback_wrappers.css ({display: 'none'});
   } else {
      if ($fallback_wrappers.length == 0) {
         var style =   '<style type="text/css">\n'
                     +    '.qwiz_wrapper_fallback_visible {\n'
                     +       'visibility: visible;\n'
                     +    '}\n'
                     + '</style>\n';
         $ ('head').append (style);
      }
      div_html_selector = content;
      if (div_html_selector.indexOf ('wp-block-post-excerpt') == -1) {
         div_html_selector += ', div.wp-block-post-excerpt';
      }
   }
   n_qwizzes = 0;
   var i_qwiz = 0;
   $ (div_html_selector).each (function () {
      const $this = $ (this);
      var htm = $this.html ();
      if (! htm) {
      } else {
         var qwiz_pos = htm.indexOf ('[qwiz');
         if (qwiz_pos != -1) {
            var r = q.process_html2 (htm, i_qwiz);
            htm = r.htm;
            if (q.qwizdemos) {
               var n_qwizdemos = q.qwizdemos.length;
               for (var i_qwizdemo=0; i_qwizdemo< n_qwizdemos; i_qwizdemo++) {
                  var qwizdemo_i = q.qwizdemos[i_qwizdemo];
                  var len = qwizdemo_i.length;
                  qwizdemo_i = qwizdemo_i.substring (10, len - 11);
                  htm = htm.replace ('<qwizdemo></qwizdemo>', qwizdemo_i);
               }
            }
            if (r.replace_body) {
               if (debug[0]) {
                  console.log ('[process_html] document_qwiz_user_logged_in_b:', document_qwiz_user_logged_in_b);
               }
               var h =  '<div class="preview_header">'
                      +    '<h2 style="margin-bottom: 10px;">Preview quiz</h2>'
                      +    '<a href="javascript: void (0)" style="float: right; margin-right: 50px;" onclick="' + qname + '.reset_preview (' + i_qwiz + ')">Reload preview</a>'
                      +    '<label>'
                      +       '<input type="radio" name="preview_radio" value="questions_active"          onclick="' + qname + '.change_preview_mode (this, ' + i_qwiz + ')" checked /> '
                      +       'Questions active'
                      +    '</label>'
                      +    '&emsp;'
                      +    '<label>'
                      +       '<input type="radio" name="preview_radio" value="show_answers"              onclick="' + qname + '.change_preview_mode (this, ' + i_qwiz + ')" /> '
                      +       'Show answers'
                      +    '</label>'
                      +    '&emsp;'
                      +    '<label>'
                      +       '<input type="radio" name="preview_radio" value="show_answers_and_feedback" onclick="' + qname + '.change_preview_mode (this, ' + i_qwiz + ')" /> '
                      +       'Show answers and feedback'
                      +    '</label>'
                      +    '&emsp;'
                      + '</div>';
               $ ('body').html (h + htm);
               $ ('div#qwiz' + i_qwiz).css ({margin: 'auto'});
            } else {
               $this.html (htm);
            }
            if (i_qwiz != r.i_qwiz) {
               i_qwiz = r.i_qwiz;
               $this.find ('div.qwiz')
                  .on ('mouseenter',
                       function (e) {
                          if (e.target.tagName.toLowerCase () == 'div'
                                                 && e.target.className == 'qwiz') {
                             document_active_qwiz_qdeck = e.target;
                          } else {
                             var $qwizdiv = $ (e.target).parents ('div.qwiz');
                             if ($qwizdiv.length) {
                                document_active_qwiz_qdeck = $qwizdiv[0];
                             }
                          }
                          if (debug[7]) {
                             console.log ('[qwiz mouseenter] e.target:', e.target);
                             console.log ('[qwiz mouseenter] document_active_qwiz_qdeck:', document_active_qwiz_qdeck);
                          }
                      });
               var ii_qwiz = i_qwiz - 1;
               if (qwizdata[ii_qwiz]) {
                  var n_questions = qwizdata[ii_qwiz].n_questions;
                  for (var i_question=0; i_question<n_questions; i_question++) {
                     if (qwizdata[ii_qwiz].bg_img[i_question]) {
                        var bg_img = qwizdata[ii_qwiz].bg_img[i_question];
                        var img = new Image ();
                        img.src = bg_img.src;
                        img.i_qwiz = ii_qwiz;
                        img.i_question = i_question;
                        img.onload = function () {
                           var w = this.width;
                           var h = this.height;
                           var $qwizq = $ ('#qwiz' + img.i_qwiz + '-q' + img.i_question);
                           if (debug[0]) {
                              console.log ('[process_html] w:', w, ', h:', h, ', $qwizq:', $qwizq);
                           }
                           var min_height;
                           if (bg_img.height) {
                              min_height = bg_img.height;
                           } else if (bg_img.width) {
                              min_height = Math.floor (bg_img.width/w * h);
                           } else {
                              min_height = h;
                           }
                           min_height = '' + min_height + 'px';
                           if (bg_img.top) {
                              min_height = 'calc(' + bg_img.top + 'px + ' + min_height + ')';
                           }
                           $qwizq.css ({'min-height': min_height});
                        }
                     }
                  }
               }
            }
         }
         if ($qwiz_divs.length) {
            $this.contents ().unwrap ();
         }
      }
   });
   n_qwizzes = i_qwiz;
   $ ('div.qwiz_wrapper').removeClass ('qwiz_shortcodes_hidden');
   /*
   $ ('button.hangman_hint').tooltip ({tooltipClass:  'qwiz_hint_tooltip',
                                       show:          {delay: 500}
                                      });
                                      */
   $ ('div.hangman_label').each (function () {
                                    var $this = $ (this);
                                    var width = $this.outerWidth ();
                                    $this.outerWidth (1.2 * width);
                                 });
   for (var i_qwiz=0; i_qwiz<n_qwizzes; i_qwiz++) {
      if (qwizdata[i_qwiz].qrecord_id) {
         var n_questions = qwizdata[i_qwiz].n_questions;
         var data = {qwiz_qdeck: 'qwiz', n_questions_cards: n_questions};
         qqc.jjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'check_registered', data);
      }
   };
   if (n_qwizzes) {
      qqc.init_enter_intercept ();
   }
   if (q.qrecord_b) {
      qqc.set_user_menus_and_icons ();
   }
   if (textentry_b) {
      if (content == 'body' && typeof (qcard_) != 'undefined') {
         var n_tries = 0;
         var run_init_textentry_autocomplete = function () {
            var ok_b = false;
            if (debug[6]) {
               console.log ('[run_init_textentry_autocomplete]', n_tries);
            }
            if (qcard_.processing_complete_b || n_tries > 30) {
               if (debug[6]) {
                  console.log ('[run_init_textentry_autocomplete] OK');
               }
               q.init_textentry_autocomplete ($ ('body'));
               ok_b = true;
            }
            if (! ok_b) {
               setTimeout (run_init_textentry_autocomplete, 100);
               n_tries++;
            }
         }
         run_init_textentry_autocomplete ();
      } else {
         q.init_textentry_autocomplete ($ ('body'));
      }
   }
   for (var i_qwiz=0; i_qwiz<n_qwizzes; i_qwiz++) {
      set_initial_width (i_qwiz);
   }
   q.processing_complete_b = true;
}
this.process_html2 = function (htm, i_qwiz, qwizard_b, create_qwizard_json_f) {
   var qwizdemo_re = new RegExp ('\\[qwizdemo\\][\\s\\S]*?\\[\\/qwizdemo\\]', 'gm');
   q.qwizdemos = htm.match (qwizdemo_re);
   if (q.qwizdemos) {
      htm = htm.replace (qwizdemo_re, '<qwizdemo></qwizdemo>');
      if (debug[0]) {
         console.log ('[process_html2] q.qwizdemos.length: ', q.qwizdemos.length);
      }
   }
   htm = htm.replace (/<!--[^]*?-->/gm, '');
   htm = htm.replace (/\[!+\][^]*?\[\/!+\]/gm, '');
   var local_n_qwizzes = 0;
   var do_not_process_htm = check_qwiz_tag_pairs (htm);
   if (do_not_process_htm) {
      htm = do_not_process_htm;
      if (typeof qwizard != 'undefined') {
         qwizard.errmsgs = errmsgs;
      }
   } else {
      qwizzled_b = false;
      var qwiz_matches = htm.match (/\[qwiz[^]*?\[\/qwiz\]/gm);
      if (qwiz_matches) {
         local_n_qwizzes = qwiz_matches.length;
         if (debug[0]) {
            console.log ('[process_html2] local_n_qwizzes: ', local_n_qwizzes);
            console.log ('                qwiz_matches[0]: ', qwiz_matches[0]);
         }
         if (q.preview_i_qwiz_plus1) {
            q.preview = true;
         }
         var do_qwiz_pair = true;
         var replace_body = false;
         q.quizzes_questions = [];
         for (var ii_qwiz=0; ii_qwiz<local_n_qwizzes; ii_qwiz++) {
            if (q.preview_i_qwiz_plus1) {
               if (q.preview_i_qwiz_plus1 == i_qwiz + 1) {
                  replace_body = true;
                  do_qwiz_pair = true;
               } else {
                  do_qwiz_pair = false;
               }
            }
            if (do_qwiz_pair) {
               var new_qwiz_html
                           = q.process_qwiz_pair (qwiz_matches[ii_qwiz], i_qwiz,
                                                  qwizard_b,
                                                  create_qwizard_json_f,
                                                  create_qwizard_json_f);
               if (create_qwizard_json_f) {
                  if (qwizard.questions_cards && qwizard.questions_cards.length) {
                     if (debug[0]) {
                        console.log ('[process_html2] qwizard.questions_cards:', qwizard.questions_cards);
                     }
                     qwizard.questions_cards[0].dataset_b = qwizard.questions_cards_dataset_b;
                     q.quizzes_questions[i_qwiz] = JSON.parse (JSON.stringify (qwizard.questions_cards));
                  }
                  if (debug[0]) {
                     console.log ('[process_html2] i_qwiz:', i_qwiz, ', qwizard.questions_cards:', qwizard.questions_cards);
                     if (qwizard.questions_cards) {
                        console.log ('[process_html2] JSON.stringify (qwizard.questions_cards):', JSON.stringify (qwizard.questions_cards));
                        console.log ('[process_html2] qwizard.questions_cards.length:', qwizard.questions_cards.length);
                        var ll = qwizard.questions_cards.length;
                        for (var ii=0; ii<ll; ii++) {
                           if (qwizard.questions_cards[ii] == '') {
                              console.log ('[process_html2] NULL JSON ii:', ii);
                           }
                        }
                     }
                  }
               }
               htm = htm.replace (/(<[ph][^>]*>\s*)*?\[qwiz[^]*?\[\/qwiz\]/m, function () {return new_qwiz_html});
            } else {
               qwizdata[i_qwiz] = {};
            }
            i_qwiz++;
         }
         if (debug[0] && q.quizzes_questions.length) {
            var n = q.quizzes_questions.length;
            for (var i=0; i<n; i++) {
               console.log ('[process_html2] q.quizzes_questions[' + i + ']:', q.quizzes_questions[i]);
            }
         }
         if (debug[3]) {
            console.log ('[process_html2] htm:', htm);
         }
      }
   }
   if (debug[0]) {
      console.log ('[process_html2] replace_body:', replace_body);
   }
   return {'htm': htm, 'i_qwiz': i_qwiz, 'replace_body': replace_body};
}
function set_initial_width (i_qwiz) {
   const $xqwiz = $ ('#xqwiz' + i_qwiz);
   if ($xqwiz.length) {
      $xqwiz.css ({height: '', 'min-height': ''});
      const initial_width = $xqwiz.outerWidth ();
      if (debug[0]) {
         console.log ('[set_initial_width] i_qwiz:', i_qwiz, ', initial_width:', initial_width);
      }
      if (initial_width) {
         qwizdata[i_qwiz].initial_width = initial_width;
      }
   }
}
this.reset_preview = function (i_qwiz) {
   $.cookie ('qwiz_preview', i_qwiz, {path: '/'});
   window.location = window.location.href;
}
function dialog_no_credit_html () {
   htm = [];
   htm.push ('<div id="qwiz_dialog_no_credit" title="' + T ('Quiz not assigned in your class') + '">');
   htm.push (   '<p style="margin-bottom: 1em;">');
   htm.push (      T ('Note: this quiz has not been assigned as work you need to do.')); //DKTMP <span id="qwiz_usernames_is_are"></span> ');
   htm.push (      T ('Your work will be recorded, but it may not count for your class.'));
   htm.push (   '</p>');
   htm.push (   '<p>');
   htm.push (      T ('You can send a request message to your teacher asking them to include this quiz in your class.'));
   htm.push (      '<br />');
   htm.push (      '<br />');
   htm.push (      '<button id="qwiz_request_assign_to_class" class="qwiz_button" onclick="qwiz_qcards_common.request_assign_to_class (1)">');
   htm.push (         T ('Send request'));
   htm.push (      '</button>');
   htm.push (   '</p>');
   htm.push (   '<br />');
   htm.push (   '<div id="qwiz_request_assign_to_class_feedback">');
   htm.push (   '</div>');
   htm.push (   '<p>');
   htm.push (      '<label>');
   htm.push (         '<input type="checkbox" onclick="qwiz_qcards_common.do_not_show_assign_to_class (this)" />');
   htm.push (         T ('Don&rsquo;t show me this again for quizzes and flashcard decks on this page'));
   htm.push (      '</label>');
   htm.push (   '</p>');
   htm.push ('</div>');
   return htm.join ('\n');
}
this.process_reg_code = function (reg_code) {
   if (debug[0]) {
      console.log ('[process_reg_code] reg_code:', reg_code);
   }
   if (reg_code != '') {
      var data = {reg_code: reg_code};
      qqc.jjax (qname, 0, 0, 'reg_code_add_to_class', data);
   }
}
this.hide_reg_code_error = function () {
   $ ('div.qwiz_reg_code_errmsg').html ('').hide ();
}
this.init_preview = function (i_qwiz) {
   const $qwizq = $ ('#qwiz' + i_qwiz + ' div.qwizq');
   if (preview_min_height) {
      $qwizq.css ({'min-height': preview_min_height});
   }
   $qwizq.addClass ('qwizq_preview')
         .on ('mouseenter', q.set_i_qwiz_i_question)
         .show ();
   $ ('#qwiz' + i_qwiz).css ({border: 'none'});
   if (! q.no_intro_b[i_qwiz] && ! qwizdata[i_qwiz].use_dataset) {
      $ ('div.intro-qwiz' + i_qwiz).addClass ('qwiz qwizq_preview').show ();
   }
   q.display_summary_and_exit (i_qwiz);
   $ ('#summary-qwiz' + i_qwiz).addClass ('qwiz qwizq_preview').show ();
   $ ('#next_button-qwiz' + i_qwiz).remove ();
   var n_questions = qwizdata[i_qwiz].n_questions;
   for (var i_question=0; i_question<n_questions; i_question++) {
      q.display_question (i_qwiz, i_question, false);
   }
   init_preview_questions_active (i_qwiz);
}
function init_preview_show_answers (i_qwiz) {
   $ ('div#qwiz' + i_qwiz + ' input[type="radio"][data-q="1"]')
      .each (function () {
                var id = this.id;
                var choice_id = id.substr (6);
                q.process_choice (undefined, choice_id);
              });
   $ ('div#qwiz' + i_qwiz + ' button.show_the_answer')
        .each (function () {
                  $ (this).trigger ('click');
               });
   $ ('div#qwiz' + i_qwiz + ' div.show_answer_got_it_or_not').hide ();
   $ ('div#qwiz' + i_qwiz).find ('input.qwiz_textentry, input.qwiz_single_char_entry')
      .each (function () {
                var id = this.id;
                var i_question = id.split ('-')[2].substr (1);
                var answer = qwizdata[i_qwiz].textentry[i_question].first_correct_answer;
                $ (this).val (answer);
                $ (this).parents ('div.qwizq').find ('button.textentry_check_answer, button.qwiz_textentry_hint').hide ();
                if (preview_mode == 'show_answers_and_feedback') {
                   $ (this).parents ('div.qwizq').find ('div.qwiz-feedback').first ().show ();
                }
             });
   $ ('div#qwiz' + i_qwiz).find ('span.qwiz_hangman')
      .each (function () {
                var $this = $ (this);
                preview_replace_hangman_entries ($this, i_qwiz, 'final');
                $this.find ('span.hangman_type_letters').hide ();
                if (preview_mode == 'show_answers_and_feedback') {
                   $this.parents ('div.qwizq').find ('.qwiz-feedback').show ();
                }
             });
   $ ('div#qwiz' + i_qwiz).find ('div.qwizzled_label')
     .each (function () {
               var $label = $ (this);
               var classnames = $label.attr ('class');
               var m = classnames.match (/qtarget_assoc(\d+)/);
               if (m) {
                  var target_id = m[1];
                  var $target = $ ('.qwizzled_target-' + target_id);
                  place_label ($target, $label);
               }
            });
}
this.change_preview_mode = function (radio_el, i_qwiz) {
   if (debug[0]) {
      console.log ('[change_preview_mode] radio_el:', radio_el)
   }
   for (var qwizzled_div_id in qwizdata[i_qwiz].$qwizzled) {
      $ ('div#' + qwizzled_div_id).replaceWith (qwizdata[i_qwiz].$qwizzled[qwizzled_div_id]);
      $ ('div#' + qwizzled_div_id).addClass ('qwizq_preview').show ();
      qwizdata[i_qwiz].$qwizzled[qwizzled_div_id] = $ ('div#' + qwizzled_div_id).clone (true);
   }
   $ ('div#qwiz' + i_qwiz + ' button.show_the_answer').show ();
   $ ('div#qwiz' + i_qwiz + ' div.show_answer_got_it_or_not').hide ();
   $ ('div#qwiz' + i_qwiz + ' div.qwiz-feedback').hide ();
   preview_mode = radio_el.value;
   if (preview_mode == 'questions_active') {
      init_preview_questions_active (i_qwiz);
   } else {
      init_preview_show_answers (i_qwiz);
   }
}
function init_preview_questions_active (i_qwiz) {
   $ ('div#qwiz' + i_qwiz + ' input[type="radio"]').attr ('disabled', false).prop ('checked', false);
   $ ('div#qwiz' + i_qwiz).find ('input.qwiz_textentry, input.qwiz_single_char_entry').attr ('disabled', false).val ('');
   $ ('div#qwiz' + i_qwiz).find ('button.textentry_check_answer, button.qwiz_textentry_hint').css ({display: ''});
   $ ('div#qwiz' + i_qwiz).find ('span.qwiz_hangman')
      .each (function () {
                var $this = $ (this);
                preview_replace_hangman_entries ($this, i_qwiz, 'initial');
          });
   for (var qwizzled_div_id in qwizdata[i_qwiz].$qwizzled) {
      $ ('div#' + qwizzled_div_id).replaceWith (qwizdata[i_qwiz].$qwizzled[qwizzled_div_id]);
      $ ('div#' + qwizzled_div_id).addClass ('qwizq_preview').show ();
      qwizdata[i_qwiz].$qwizzled[qwizzled_div_id] = $ ('div#' + qwizzled_div_id).clone (true);
   }
}
function preview_replace_hangman_entries ($this, i_qwiz, initial_final) {
   var $qwizq = $this.parents ('div.qwizq');
   var qwizq_id = $qwizq[0].id;
   var i_question = qwizq_id.split ('-')[1].substr (1);
   var classnames = $this.attr ('class');
   var m = classnames.match (/qwiz_hangman_c(\d+)/);
   var i_choice = m[1];
   var hangman = qwizdata[i_qwiz].hangman[i_question];
   var hangman_final_entry = hangman.hangman_final_entry[i_choice];
   if (initial_final == 'initial') {
      var hangman_current_entry = hangman_final_entry.replace (/>[a-z0-9]</gi, '>&ensp;<');
      $this.find ('span.hangman_current_entry').html (hangman_current_entry);
   } else {
      $this.find ('span.hangman_current_entry').html (hangman_final_entry);
   }
}
this.set_i_qwiz_i_question = function () {
   if (debug[0]) {
      console.log ('[set_i_qwiz_i_question] this:', this);
   }
   var id = this.id;
   var i_qwiz = id.match (/qwiz([^-]+)/)[1];
   var i_question = id.match (/-q(.+)/)[1];
   qwizdata[i_qwiz].i_question = i_question;
}
this.init_qwizzled = function ($content, i_qwiz, i_question) {
   if (debug[0]) {
      console.log ('[init_qwizzled] i_qwiz:', i_qwiz);
   }
   sibs = {};
   var t_id;
   var ii = 0;
   $content.find ('div.qwizzled_canvas .qwizzled_target').each (function () {
      var $this = $ (this);
      $this.removeClass ('ui-draggable ui-draggable-handle');
      $this.css ({'border-style': 'dotted', 'border-color': 'gray'});
      var classes = $this.attr ('class');
      var m = classes.match (/qtarget_sib-([0-9]+)/);
      if (m) {
         var sib = m[1];
         if (sibs[sib]) {
            t_id = sibs[sib];
         } else {
            t_id = 't' + ii;
            sibs[sib] = t_id;
            ii++;
         }
      } else {
         t_id = 't' + ii;
         ii++;
      }
      $this.attr ('id', t_id);
      $this.on ('click', function (event) {
                               if (debug[8]) {
                                  console.log ('[target clicked] $ (event.target):', $ (event.target));
                               }
                               var $target = $ (event.target);
                               if ($target.hasClass ('qwizzled_target')) {
                                  if (! $target.droppable ('option', 'disabled')) {
                                     q.label_dropped ($target);
                                  }
                               }
                            });
   });
   $content.find ('td.qwizzled_labels div.qwizzled_label').each (function () {
      $ (this).on ('click', function (event) {
                               if (debug[8]) {
                                  console.log ('[label clicked] $ (event.target).html ():', $ (event.target).html ());
                               }
                               if (ignore_label_click_b) {
                                  ignore_label_click_b = false;
                               } else {
                                  var $label;
                                  if (event.target.tagName.toLowerCase () == 'div') {
                                     $label = $ (event.target);
                                  } else {
                                     $label = $ (event.target).parents ('div.qwizzled_label');
                                  }
                                  var ii_qwiz = $label[0].id.match (/qwiz([^-]+)/)[1];
                                  $label_clicked[ii_qwiz] = $label;
                                  var $td_qwizzled_labels = $label.parents ('td.qwizzled_labels');
                                  $td_qwizzled_labels.find ('.qwizzled_highlight_label').removeClass ('label_click_highlight');
                                  $td_qwizzled_labels.find ('.qwizzled_label_head').hide ();
                                  $td_qwizzled_labels.find ('.qwizzled_label_head_label_clicked').show ();
                                  $label.find ('.qwizzled_highlight_label').addClass ('label_click_highlight');
                                  q.label_dragstart ($label, true);
                               }
                            });
   });
   $content.find ('div.qwizzled_canvas div.ui-resizable-handle').remove ();
   $content.find ('div.qwizzled_image div.qwizzled_target').css ('border-width', '2px');
   $content.find ('.qwizzled_highlight_label').css ('border', 'none');
   $content.find ('.qwizzled_highlight_label *').css ('word-wrap', 'normal');
   $content.find ('div.qwizzled_image').each (function () {
      var wrapper_width  = $ (this).width ();
      var wrapper_height = $ (this).height ();
      $ (this).find ('img').attr ('width', wrapper_width).attr ('height', wrapper_height)
                           .removeAttr ('sizes').removeAttr ('srcset');
   });
   q.init_qwizzled2 ($content, i_qwiz, i_question);
}
this.init_qwizzled2 = function ($content, i_qwiz, i_question) {
   if (! qwizdata[i_qwiz].$qwizzled) {
      qwizdata[i_qwiz].$qwizzled = {};
   }
   var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
   qwizdata[i_qwiz].$qwizzled[qwizq_id] = $content.clone (true);
}
this.init_textentry_autocomplete = function ($scope) {
   if (debug[6]) {
      console.log ('[init_textentry_autocomplete]');
   }
   $scope.find ('input.qwiz_textentry').autocomplete ({
      source:        find_matching_terms,
      close:         menu_closed,
      open:          menu_shown,
      select:        q.item_selected
   });
   $scope.find ('input.qwiz_textentry').keyup (menu_closed);
   $scope.find ('input.qwiz_single_char_entry').keyup (single_char_textentry_keyup);
}
this.label_dragstart = function ($label, label_clicked_b) {
   var i_qwiz = $label[0].id.match (/qwiz([^-]+)/)[1];
   if (label_clicked_b) {
      if (debug[8]) {
         console.log ('[label_dragstart] $label_clicked[i_qwiz].html():', $label_clicked[i_qwiz].html());
      }
   } else {
      if ($label_clicked[i_qwiz]) {
         $label_clicked[i_qwiz].find ('.qwizzled_highlight_label').removeClass ('label_click_highlight');
         var $td_qwizzled_labels = $label.parents ('td.qwizzled_labels');
         $td_qwizzled_labels.find ('.qwizzled_label_head').hide ();
         $td_qwizzled_labels.find ('.qwizzled_label_head_standard').show ();
         $label_clicked[i_qwiz] = '';
      }
      $prev_label_clicked[i_qwiz] = 0;
   }
   if (try_again_obj && $prev_label_clicked[i_qwiz] !== $label_clicked[i_qwiz]) {
      var local_try_again_obj = try_again_obj;
      try_again_obj = '';
      if (debug[8]) {
         console.log ('[label_dragstart] $label.html():', $label.html());
         console.log ('[label_dragstart] local_try_again_obj:', local_try_again_obj);
         console.log ('[label_dragstart] local_try_again_obj.$label.attr (\'id\'):', local_try_again_obj.$label.attr ('id'));
      }
      local_try_again_obj.$label.find ('.qwizzled_highlight_label').css ({background: ''});
      local_try_again_obj.$label.find ('.qwizzled_highlight_label img').css ({outline: ''});
      if (local_try_again_obj.$label.attr ('id') != $label.attr ('id')) {
         local_try_again_obj.$label.animate ({left: '0px', top: '0px'}, {duration: 750})
         local_try_again_obj.$label.find ('.qwizzled_highlight_label').removeClass ('label_click_highlight');
      }
      local_try_again_obj.$feedback.hide ();
      local_try_again_obj.$target.droppable ('enable');
   }
   $prev_label_clicked[i_qwiz] = '';
}
this.label_dropped = function ($target, $label) {
   if (debug[8]) {
      console.log ('[label_dropped]: $target:', $target, ', $label:', $label);
   }
   if ($label) {
      ignore_label_click_b = true;
      /* DKTMP DEDRAG
      if (q.qwizard_b) {
         $qwizzled_highlight_label = $label.children ();
         if ($qwizzled_highlight_label.tooltip ('instance')) {
            if (debug[8]) {
               console.log ('[label_dropped] $qwizzled_highlight_label:', $qwizzled_highlight_label);
            }
            $qwizzled_highlight_label.tooltip ('enable');
         }
      }
      */
   } else {
      var $qwizq = $target.parents ('div.qwizq');
      var i_qwiz = $qwizq[0].id.match (/qwiz([^-]+)/)[1];
      if ($label_clicked[i_qwiz]) {
         if (debug[8]) {
            console.log ('[label_dropped]: $label_clicked[i_qwiz]:', $label_clicked[i_qwiz]);
         }
         $label = $label_clicked[i_qwiz];
         var $td_qwizzled_labels = $label.parents ('td.qwizzled_labels');
         $td_qwizzled_labels.find ('.qwizzled_label_head').hide ();
         var standard_mobile = document_qwiz_mobile ? 'mobile' : 'standard';
         $td_qwizzled_labels.find ('.qwizzled_label_head_' + standard_mobile).show ();
      } else {
         return false;
      }
   }
   var classes = $label.attr ('class');
   m = classes.match (/qwizzled_n_targets([0-9]*)/);
   if (! m) {
      $label.find ('.qwizzled_highlight_label').removeClass ('label_click_highlight');
   }
   var classes = $label.attr ('class');
   var m = classes.match (/qtarget_assoc([0-9]+)/);
   var assoc_id;
   if (m) {
      assoc_id = m[1];
   } else {
      assoc_id = $label.data ('label_target_id');
   }
   if (debug[8]) {
      console.log ('[label_dropped] $target:', $target, ', assoc_id:', assoc_id);
   }
   var label_id = $label.attr ('id');
   var feedback_selector = '#' + label_id.substr (6);
   var fields = feedback_selector.split ('-');
   var question_selector = fields[0] + '-' + fields[1];
   var i_qwiz = fields[0].substr (5);
   var i_question = fields[1].substr (1);
   if (debug[8]) {
      console.log ('[label_dropped] question_selector:', question_selector);
   }
   if (qwizdata[i_qwiz].record_start_b && document_qwiz_user_logged_in_b) {
      qwizdata[i_qwiz].record_start_b = false;
      var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
   }
   if (qwizdata[i_qwiz].user_question_number == 1
               && (q.no_intro_b[i_qwiz] || qwizdata[i_qwiz].n_questions == 1)) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   qwizdata[i_qwiz].n_label_attempts++;
   $ ('[id^=qwiz' + i_qwiz + '-q' + i_question + '-a]').hide ();
   var qwizq_id = '#qwiz' + i_qwiz + '-q' + i_question;
   var correct_b = false;
   if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
      if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
         if (! qwizdata[i_qwiz].q_and_a_text[i_question]) {
            var img_src = $ (qwizq_id + ' div.qwizzled_image img').attr ('src');
            var q_and_a_text;
            if (img_src) {
               q_and_a_text = img_src;
            } else {
               img_src = '';
            }
            $ (qwizq_id + ' div.qwizzled_label').each (function () {
                                                          var label_text = $ (this).html ();
                                                          if (label_text) {
                                                             q_and_a_text += '\t' + label_text;
                                                          }
                                                       });
            q_and_a_text = qqc.remove_tags_eols (q_and_a_text);
            qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (q_and_a_text);
            qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 ($ (qwizq_id).html ());
            if (debug[0]) {
               console.log ('[label_dropped] qwizdata[i_qwiz].q_and_a_crc32[i_question]:', qwizdata[i_qwiz].q_and_a_crc32[i_question]);
            }
         }
      } else {
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
      }
   }
   var finished_diagram_b = false;
   if ($target.hasClass ('qwizzled_target-' + assoc_id)) {
      if (debug[8]) {
         console.log ('[label_dropped] feedback_selector:', feedback_selector + 'c');
         console.log ('[label_dropped] qwizdata[i_qwiz].n_questions:', qwizdata[i_qwiz].n_questions);
      }
      $ (feedback_selector + 'c').show ();
      place_label ($target, $label);
      qwizdata[i_qwiz].n_labels_correct++;
      if (qwizdata[i_qwiz].n_labels_correct == qwizdata[i_qwiz].n_label_targets) {
         finished_diagram_b = true;
         var n_tries = qwizdata[i_qwiz].n_label_attempts;
         var n_label_targets = qwizdata[i_qwiz].n_label_targets;
         correct_b = n_tries == n_label_targets;
         var qwizzled_summary;
         if (correct_b) {
            qwizzled_summary = 'You placed all of the items correctly on the first try!';
         } else {
            qwizzled_summary = plural (T ('It took you one try'), T ('It took you %s tries'), n_tries) + ' ' + plural (T ('to place this label correctly'), T ('to place these labels correctly'), n_label_targets) + '.';
            qwizzled_summary = qwizzled_summary.replace ('%s', qqc.number_to_word (n_tries));
            if (qwizdata[i_qwiz].n_questions == 1
                                       && qwizdata[i_qwiz].repeat_incorrect_b) {
               qwizzled_summary += '<br />Re-do those you did not label correctly ';
               if (qwizdata[i_qwiz].qrecord_id
                                            && document_qwiz_user_logged_in_b) {
                  qwizzled_summary += 'to get this question marked &ldquo;correct&rdquo; '
               }
               qwizzled_summary +=  '<button class="qwiz_button" onclick="qwiz_.next_question (' + i_qwiz + ', true)">'
                                  +    'Re-do'
                                  + '</button>';
               if (! q.qwizard_b) {
                  qwizdata[i_qwiz].answered_correctly[i_question] = -1;
               }
            }
         }
         $ (qwizq_id + '-ff').html (qwizzled_summary).show ();
         if (qwizdata[i_qwiz].n_questions > 1 || qwizdata[i_qwiz].use_dataset) {
            if (! q.qwizard_b) {
               qwizdata[i_qwiz].answered_correctly[i_question] = correct_b ? 1 : -1;
               if (correct_b) {
                  qwizdata[i_qwiz].n_correct++;
                  if (qwizdata[i_qwiz].n_qs_done) {
                     qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
                  }
               } else {
                  qwizdata[i_qwiz].n_incorrect++;
               }
               update_topic_statistics (i_qwiz, i_question, correct_b);
            }
            update_progress_show_next (i_qwiz);
         } else {
            q.display_diagram_progress (i_qwiz);
         }
         update_progress_show_next (i_qwiz);
      } else {
         var target_id = $target.attr ('id');
         if (typeof (qwizdata[i_qwiz].correct_on_try1[i_question]) == 'undefined') {
            qwizdata[i_qwiz].correct_on_try1[i_question] = {};
         }
         if (! qwizdata[i_qwiz].correct_on_try1[i_question][target_id]) {
            qwizdata[i_qwiz].correct_on_try1[i_question][target_id] = 1;
         }
         q.display_diagram_progress (i_qwiz);
      }
   } else {
      if (debug[8]) {
         console.log ('[label_dropped] feedback_selector:', feedback_selector + 'x');
         console.log ('[label_dropped] qwizdata[i_qwiz].n_questions:', qwizdata[i_qwiz].n_questions);
      }
      if ($label_clicked[i_qwiz]) {
         var target_offset = $target.offset ();
         var target_x = target_offset.left;
         var target_y = target_offset.top;
         var label_x = $label_clicked[i_qwiz].data ('label_x');
         var label_y = $label_clicked[i_qwiz].data ('label_y');
         if (debug[8]) {
            console.log ('[label_dropped] target_x:', target_x, ', target_y:', target_y);
            console.log ('[label_dropped] label_x:', label_x, ', label_y:', label_y);
         }
         $label.css ({left: (target_x - label_x) + 'px',
                      top:  (target_y - label_y) + 'px'});
         $label_clicked[i_qwiz] = '';
      }
      $label.find ('.qwizzled_highlight_label').css ({background: '#FF8080'});
      $label.find ('.qwizzled_highlight_label img').css ({outline: '2px solid #FF8080'});
      var $feedback = $ (feedback_selector + 'x');
      $feedback.show ();
      try_again_obj = { $label: $label, $feedback:  $feedback, $target: $target};
      $target.droppable ('disable');
      var target_id = $target.attr ('id');
      if (typeof (qwizdata[i_qwiz].correct_on_try1[i_question]) == 'undefined') {
         qwizdata[i_qwiz].correct_on_try1[i_question] = {};
      }
      qwizdata[i_qwiz].correct_on_try1[i_question][target_id] = -1;
   }
   if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
      var label = $label.find ('span.qwizzled_highlight_label').html ();
      label = qqc.remove_tags_eols (label);
      var classes = $target.attr ('class');
      var target_assoc_id = classes.match (/qwizzled_target-([0-9]*)/)[1];
      var target_label = $ (qwizq_id).find ('div.qtarget_assoc' + target_assoc_id).find ('span.qwizzled_highlight_label').html ();
      if (! target_label) {
         target_label = $ (qwizq_id).find ('div.qwizzled_label[data-label_target_id="' + target_assoc_id + '"]').find ('span.qwizzled_highlight_label').html ();
      }
      target_label = qqc.remove_tags_eols (target_label);
      var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                  q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                  i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                  unit:          qwizdata[i_qwiz].unit[i_question],
                  type:          'labeled_diagram',
                  response:      label + '\t' + target_label,
                  correct_b:     '',
                  confirm:       'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
      if (finished_diagram_b) {
         var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                     q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                     i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                     unit:          qwizdata[i_qwiz].unit[i_question],
                     type:          'labeled_diagram',
                     response:      'done',
                     correct_b:     correct_b ? 1 : '',
                     confirm:       'js'};
         var delay_jjax = function () {
            record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
         }
         setTimeout (delay_jjax, 500);
      }
   }
}
function place_labels (i_qwiz, i_question, qwizq_id) {
   if (debug[0]) {
      console.log ('[place_labels] i_qwiz:', i_qwiz, ', i_question:', i_question, ', qwizq_id:, ', qwizq_id);
   }
   for (var target_id in qwizdata[i_qwiz].correct_on_try1[i_question]) {
      if (qwizdata[i_qwiz].correct_on_try1[i_question][target_id] == 1) {
         var $target = $ ('div#' + qwizq_id + ' div#' + target_id);
         if ($target.length == 0) {
            $target = $ ('div#' + qwizq_id + ' span#' + target_id).first ();
         }
         var classes = $target.attr ('class');
         var m = classes.match (/qwizzled_target-([0-9]+)/);
         var assoc_id;
         if (m) {
            assoc_id = m[1];
         }
         if (debug[8]) {
            console.log ('[place_labels] $target:', $target, ', assoc_id:', assoc_id);
         }
         var $label = $ ('td.qwizzled_labels div.qtarget_assoc' + assoc_id);
         if (! $label.length) {
            $label = $ ('div#' + qwizq_id).find ('td.qwizzled_labels div.qwizzled_label[data-label_target_id="' + assoc_id + '"]');
         }
         place_label ($target, $label);
         qwizdata[i_qwiz].n_labels_correct++;
         qwizdata[i_qwiz].n_label_attempts++;
      } else {
         qwizdata[i_qwiz].correct_on_try1[i_question][target_id] = 0;
      }
   }
   q.display_diagram_progress (i_qwiz);
}
function place_label ($target, $label) {
   var $label_copy = $label.clone (false);
   if (q.qwizard_b) {
      $editable = $label_copy.find ('.qwiz_editable');
      $editable.removeAttr ('id')
               .removeAttr ('contenteditable')
               .removeClass ('qwiz_editable')
               .addClass ('qwizzled_label_placed');
      if (debug[12]) {
         console.log ('[place_label] $editable:', $editable);
      }
   }
   $label_copy.css ({position: 'absolute', left: '4px', top: '50%', height: 'auto', width: '100%', transform: 'translateY(-50%)'});
   $label_copy.removeClass ('qwizzled_label_unplaced');
   $label_copy.find ('.qwizzled_highlight_label').css ('cursor', 'default').removeClass ('label_click_highlight');
   $label_copy.appendTo ($target);
   $label.css ({left: '0px', top: '0px'});
   var multiple_targets_b = false;
   var classes = $label.attr ('class');
   m = classes.match (/qwizzled_n_targets([0-9]*)/);
   if (m) {
      multiple_targets_b = true;
      var current_n_targets = m[0];
      var n_targets = parseInt (m[1], 10);
      if (n_targets == 2) {
         $label.removeClass (current_n_targets);
      } else {
         var new_class = 'qwizzled_n_targets' + (--n_targets);
         $label.removeClass (current_n_targets).addClass (new_class);
      }
   }
   if (! q.qwizard_b && ! multiple_targets_b) {
      if (debug[8]) {
         console.log ('[place_label] (draggable disable) $label[0]:', $label[0]);
      }
      $label.css ({color: 'lightgray', left: '0px', top: '0px'});
      $label.find ('*').css ({color: 'lightgray'});
      $label.find ('.qwizzled_highlight_label').css ('cursor', 'default');
      $label.removeClass ('qwizzled_label_unplaced');
      if (! q.qwizard_b) {
         try {
            $label.draggable ('disable');
         } catch (e) {};
      }
      $label.off ('click');
   }
   if (! q.qwizard_b) {
      if ($target[0].tagName.toLowerCase () == 'div') {
         if ($target.droppable ('instance')) {
            $target.droppable ('disable');
         }
      } else {
         var classes = $target.attr ('class');
         var m = classes.match (/qtarget_sib-[0-9]+/);
         if (m) {
            var $span = $target.parents ('qwizq').find ('span.' + m[0]);
            if ($span.droppable ('instance')) {
               $span.droppable ('disable');
            }
         } else {
            var $siblings = $target.siblings ('span').andSelf ();
            $siblings.droppable ('disable');
         }
      }
   }
}
this.process_qwiz_pair = function (htm, i_qwiz, qwizard_b,
                                   existing_quiz_to_qwizard_f,
                                   qwizard_process_dataset_questions_f) {
   q.qwizard_b = qwizard_b;
   if (typeof qwizard != 'undefined') {
      qw = qwizard;
   }
   if (existing_quiz_to_qwizard_f) {
      n_qwizzes = 1;
      set_qwizard_data_b = true;
      q.no_intro_b = [];
      if (debug[0]) {
         console.log ('[process_qwiz_pair] htm.substr (0, 2000):', htm.substr (0, 2000));
      }
   } else {
      set_qwizard_data_b = false;
   }
   qwizdata[i_qwiz] = {};
   qwizdata[i_qwiz].questions            = [];
   qwizdata[i_qwiz].answered_correctly   = [];
   qwizdata[i_qwiz].i_questions_done     = [];
   qwizdata[i_qwiz].n_correct            = 0;
   qwizdata[i_qwiz].n_incorrect          = 0;
   qwizdata[i_qwiz].i_question           = -1;
   qwizdata[i_qwiz].i_user_question      = -1;
   qwizdata[i_qwiz].ii_question          = 0;
   qwizdata[i_qwiz].user_question_number = 0;
   qwizdata[i_qwiz].initial_width        = 500;
   qwizdata[i_qwiz].hangman = {};
   qwizdata[i_qwiz].use_dataset = '';
   qwizdata[i_qwiz].dataset_id = {};
   qwizdata[i_qwiz].use_dataset_question_ids = {};
   qwizdata[i_qwiz].bg_img = {};
   qwizdata[i_qwiz].align = '';
   qwizdata[i_qwiz].qrecord_id = '';
   qwizdata[i_qwiz].qrecord_id_ok = 'check credit';
   qwizdata[i_qwiz].information_question_b = {};
   qwizdata[i_qwiz].unit = [];
   qwizdata[i_qwiz].parts_htm = {};
   qwizdata[i_qwiz].hotspot_user_interaction = {};
   qwizdata[i_qwiz].hotspot_labels_stick     = {};
   qwizdata[i_qwiz].show_hotspots            = {};
   qwizdata[i_qwiz].find_the_dot             = {};
   qwizdata[i_qwiz].ctx                      = {};
   qwizdata[i_qwiz].current_xy_hotspot_no    = {};
   var m = htm.match (/\[qwiz([^\]]*)\]/m);
   var qwiz_tag   = m[0];
   var attributes = m[1];
   qwiz_tag   = qqc.replace_smart_quotes (qwiz_tag);
   attributes = qqc.replace_smart_quotes (attributes);
   if (debug[0]) {
      console.log ('[process_qwiz_pair] qwiz_tag: ', qwiz_tag);
      console.log ('[process_qwiz_pair] attributes: ', attributes);
   }
   if (set_qwizard_data_b) {
      qw.set_qwizard_data ('qwiz_deck_attributes', attributes);
   }
   var use_dataset_questions_b = false;
   qwizdata[i_qwiz].icon_swhs = 'qwiz' == 'rdgm';
   qwizdata[i_qwiz].summary_b = get_attr (qwiz_tag, 'summary') != 'false';
   const random_b = get_attr (qwiz_tag, 'random') == 'true';
   qwizdata[i_qwiz].random_b = random_b;
   if (q.qwizard_b) {
      qwizdata[i_qwiz].attr_random_b = random_b;
   }
   const reshow_after = get_attr (qwiz_tag, 'reshow_after');
   if (reshow_after) {
      qwizdata[i_qwiz].reshow_after = reshow_after;
   }
   var use_dataset = get_attr (qwiz_tag, 'use_dataset', true);
   if (! use_dataset) {
      const dataset = get_attr (qwiz_tag, 'dataset');
      if (dataset) {
         if (regular_page_f) {
            use_dataset = dataset;
         } else {
            qwizdata[i_qwiz].dataset = dataset;
         }
      }
   }
   if (use_dataset) {
      qwizdata[i_qwiz].use_dataset = use_dataset;
      var dataset_intro_f = get_attr (qwiz_tag, 'dataset_intro');
      if (! dataset_intro_f || dataset_intro_f == 'true') {
         dataset_intro_f = true;
      } else if (dataset_intro_f == 'false') {
         dataset_intro_f = false;
      }
      qwizdata[i_qwiz].dataset_intro_f = dataset_intro_f;
      var spaced_repetition_f = get_attr (qwiz_tag, 'spaced_repetition') != 'false';
      qwizdata[i_qwiz].dataset_questions_to_do = spaced_repetition_f ? 'spaced_repetition' : 'all';
      var m = qwiz_tag.match (/\sstyle\s*=\s*"[^"]+"/gm);
      if (m) {
         var len = m.length;
         for (var i=0; i<len; i++) {
            var encoded_style = encodeURIComponent (m[i]);
            qwiz_tag = qwiz_tag.replace (m[i], encoded_style);
         }
      }
      var display_name = get_attr (qwiz_tag, 'display_name');
      if (display_name) {
         qwizdata[i_qwiz].use_dataset_options_display_name = decodeURIComponent (display_name);
         var qwiz_tag = qwiz_tag.replace (/\sdisplay_name\s*=\s*"[^"]*?"/, '');
      }
      qwiz_tag = decodeURIComponent (qwiz_tag);
   }
   const questions_to_show = parseInt (get_attr (qwiz_tag, 'questions_to_show'));
   if (qqc.isInteger (questions_to_show) && questions_to_show > 0) {
      qwizdata[i_qwiz].questions_to_show = questions_to_show;
   }
   var repeat_incorrect_value = get_attr (attributes, 'repeat_incorrect');
   qwizdata[i_qwiz].repeat_incorrect_b = repeat_incorrect_value != 'false';
   if (debug[0]) {
      console.log ('[create_qwiz_divs] repeat_incorrect_value:', repeat_incorrect_value, ', repeat_incorrect_b:', qwizdata[i_qwiz].repeat_incorrect_b);
   }
   var align = get_attr (attributes, 'align');
   if (align == 'center' || align == 'right' || align == 'tiled') {
      qwizdata[i_qwiz].align = align;
      if (align == 'tiled') {
         qwizdata[i_qwiz].spacing = 20;
      }
   }
   var spacing = parseInt (get_attr (attributes, 'spacing'));
   if (qqc.isInteger (spacing)) {
      qwizdata[i_qwiz].spacing = spacing;
   }
   qwizdata[i_qwiz].hide_forward_back_b = get_attr (qwiz_tag, 'hide_forward_back') == 'true';
   qwizdata[i_qwiz].hide_progress_b = get_attr (qwiz_tag, 'hide_progress') == 'true';
   qwizdata[i_qwiz].hide_qwizcards_icon_b = get_attr (qwiz_tag, 'hide_qwizcards_icon') == 'true';
   const mc_style = get_attr (qwiz_tag, 'mc_style');
   if (mc_style) {
      qwizdata[i_qwiz].mc_style = mc_style;
   }
   var mobile_enabled = get_attr (qwiz_tag, 'mobile_enabled');
   if (! mobile_enabled) {
      mobile_enabled = document_qwiz_mobile_enabled;
   }
   qwizdata[i_qwiz].mobile_enabled = mobile_enabled;
   var qrecord_id = get_attr (attributes, 'qrecord_id');
   if (qrecord_id) {
      qwizdata[i_qwiz].qrecord_id = qrecord_id;
      qwizdata[i_qwiz].q_and_a_text  = {};
      qwizdata[i_qwiz].q_and_a_crc32 = {};
      if (! q.qrecord_b) {
         q.qrecord_b = true;
         if (typeof (document_qwiz_user_logged_in_b) == 'undefined'
                              || document_qwiz_user_logged_in_b == 'not ready') {
            qqc.check_session_id (i_qwiz);
         }
      }
      const display_pay_screen = get_attr (attributes, 'display_pay_screen');
      if (display_pay_screen && display_pay_screen != 'false') {
         qwizdata[i_qwiz].display_pay_screen = display_pay_screen;
         const immediate_payment = get_attr (attributes, 'immediate_payment');
         if (immediate_payment && immediate_payment != 'false') {
            qwizdata[i_qwiz].immediate_payment = true;
         }
      }
   }
   if (q.qwizard_b || set_qwizard_data_b) {
      const dataset_b = !! get_attr (attributes, 'dataset');
      q.dataset_b = dataset_b;
      if (set_qwizard_data_b) {
         qw.questions_cards_dataset_b = dataset_b;
      }
   }
   const question_time_limit = get_attr (attributes, 'question_time_limit');
   if (question_time_limit) {
      qwizdata[i_qwiz].question_time_limit = parseInt (question_time_limit);
   }
   const qwiz_timer = get_attr (attributes, 'quiz_timer') == 'true';
   if (qwiz_timer) {
      qwizdata[i_qwiz].qwiz_timer = qwiz_timer;
   }
   var unit = get_attr (attributes, 'unit');
   if (unit) {
      qwizdata[i_qwiz].default_unit = unit.replace (/\s/g, '_');
      if (set_qwizard_data_b) {
         qw.set_qwizard_data ('default_unit', unit);
      }
   } else {
      qwizdata[i_qwiz].default_unit = 'null';
   }
   var new_htm = '';
   var no_intro_i_b = false;
   var m = htm.match (/\[qwiz[^\]]*\]((<\/[^>]+>\s*)*)/m, '');
   if (m) {
      var initial_closing_tags = m[1];
      if (debug[0]) {
         console.log ('[process_qwiz_pair] initial_closing_tags: ', initial_closing_tags);
      }
   }
   htm = htm.replace (/\[qwiz[^\]]*\]((<\/[^>]+>\s*)*)/m, '');
   htm = htm.replace (/(<(p|h[1-6]|span)[^>]*>)*\[\/qwiz\]$/, '');
   htm = qqc.trim (htm);
   m = htm.match (/\[(q|<code><\/code>q)([^\]]*)\]/gm);
   var n_questions = m ? m.length : 0;
   if (! use_dataset && ! q.qwizard_b && n_questions == 0) {
      errmsgs.push (T ('Did not find question tags ("[q]")') + '.  qwiz: ' + (i_qwiz + 1));
      header_html = '';
   } else {
      htm = qqc.process_inline_textentry_terms (htm, 'terms', qwizdata, i_qwiz);
      errmsgs = errmsgs.concat (qwizdata.additional_errmsgs);
      htm = qqc.process_inline_textentry_terms (htm, 'add_terms', qwizdata, i_qwiz);
      errmsgs = errmsgs.concat (qwizdata.additional_errmsgs);
      var whitespace = qqc.parse_html_block (htm.substr (0, 2000), ['^'], ['[h]', '[i]', '[q]', '[q '], '[<code></code>q', 'return whitespace');
      if (whitespace) {
         htm = htm.replace (whitespace, '');
      }
      htm = process_header (htm, i_qwiz, 0, true);
      if (set_qwizard_data_b && header_html != 'NA') {
         qw.set_qwizard_data ('header_text', header_html);
      }
      var intro_html = qqc.parse_html_block (htm.substr (0, 5000), ['[i]'], ['[q]', '[q ', '[<code></code>q', '<div class="qwizzled_question', '[x]']);
      if (intro_html == 'NA') {
         intro_html = qqc.parse_html_block (htm.substr (0, 5000), ['^'], ['[q]', '[q ', '[<code></code>q', '<div class="qwizzled_question', '[x]'], true);
         if (intro_html == '') {
            if (use_dataset) {
               intro_html = '<br /><br /><br />';
            } else {
               no_intro_i_b = true;
            }
         }
      } else {
         var htmx = htm.substr (0, 200);
         htmx = qqc.trim (htmx);
         var i_pos = qqc.opening_tag_shortcode_pos ('[i]', htmx);
         htmx = htmx.substr (i_pos, 5);
         var intro_htmlx = intro_html.replace (/<br[^>]*>/g, '');
         intro_htmlx = qqc.trim (intro_htmlx).substr (0, 5);
         if (htmx != intro_htmlx) {
            errmsgs.push (T ('Text before intro') + ' [i].  qwiz: ' + (i_qwiz + 1));
         }
         intro_html = intro_html.replace ('[i]', '');
         intro_html = qqc.balance_closing_tag (intro_html);
      }
      if (q.qwizard_b) {
         intro_html = qqc.shortcodes_to_video_elements (intro_html);
      }
      if (! no_intro_i_b || q.qwizard_b || qwizdata[i_qwiz].question_time_limit) {
         if (debug[0]) {
            console.log ('[process_qwiz_pair] intro_html:', intro_html);
         }
         new_htm += '<div class="intro-qwiz' + i_qwiz + ' qwiz-intro qwiz_editable">'
                  +    qqc.decode_image_tags (intro_html)
                  + '</div>\n';
      }
      if (set_qwizard_data_b) {
         intro_hmtl = qqc.remove_empty_opening_tags (intro_html);
         qw.set_qwizard_data ('intro_text', intro_html);
      }
      var exit_html = qqc.parse_html_block (htm, ['[x]'], []);
      if (exit_html != 'NA') {
         exit_html = exit_html.replace (/\[x\]/, '');
         if (exit_html.search (/\[q[ \]]|<div class="qwizzled_question/) != -1) {
            errmsgs.push ('[x] ' + T ('(exit text) must be last') + '.  qwiz: ' + (i_qwiz + 1));
         } else {
            var i_pos_exit_opening = qqc. opening_tag_shortcode_pos ('[x]', htm);
            htm = htm.substr (0, i_pos_exit_opening);
         }
      } else {
         exit_html = '';
      }
      if (set_qwizard_data_b) {
         var qwizard_exit_html = qqc.shortcodes_to_video_elements (exit_html);
         qwizard_exit_html = qqc.remove_empty_opening_tags (qwizard_exit_html);
         qw.set_qwizard_data ('exit_text', qwizard_exit_html);
      }
      if (! use_dataset) {
         if (htm.search (/use_dataset_question\s*=\s*/) != -1) {
            use_dataset_questions_b = true;
            qwizdata[i_qwiz].use_dataset_questions_htm = htm;
         }
      }
      if (! use_dataset && (! use_dataset_questions_b || qwizard_process_dataset_questions_f)) {
         if (n_questions == 0) {
            qwizdata[i_qwiz].n_questions = 0;
            new_htm += '<div id="qwiz' + i_qwiz + '-q-1" class="qwizq">'
                       + '</div>';
         } else {
            qwizdata[i_qwiz].n_questions = n_questions;
            const questions_to_show = qwizdata[i_qwiz].questions_to_show;
            if (questions_to_show && questions_to_show < n_questions) {
               qwizdata[i_qwiz].n_questions_for_done = questions_to_show;
               qwizdata[i_qwiz].random_b = true;
            } else {
               qwizdata[i_qwiz].n_questions_for_done = n_questions;
            }
            new_htm = q.process_questions (htm, new_htm, i_qwiz, undefined,
                                           undefined, qwizard_process_dataset_questions_f);
         }
      } else {
         if (qwizard_process_dataset_questions_f) {
            qwizard.questions_cards_dataset_b = false;
         }
         new_htm +=   '<div id="dataset_questions-qwiz' + i_qwiz + '">'
                    + '</div>';
      }
   }
   q.no_intro_b[i_qwiz] = no_intro_i_b && ! qwizdata[i_qwiz].question_time_limit;
   new_htm = create_qwiz_divs (i_qwiz, qwiz_tag, new_htm, exit_html);
   if (typeof q.qwizard_b != 'undefined') {
      if (typeof qwizard != 'undefined') {
         qwizard.errmsgs = errmsgs;
      }
   }
   return new_htm;
}
this.process_questions = function (htm, new_htm, i_qwiz, i_qwizard_question,
                                   set_qwizard_f,
                                   qwizard_process_dataset_questions_f) {
   if (set_qwizard_f) {
      qw = qwizard;
      n_qwizzes = 1;
      set_qwizard_data_b = true;
      q.qwizard_b = true;
   }
   if (typeof (i_qwizard_question) != 'undefined') {
      number_first_question = i_qwizard_question;
   } else {
      number_first_question = 0;
   }
   if (! set_qwizard_data_b) {
      if (htm.indexOf ('[!') != -1) {
         htm = htm.replace (/\[!+\][^]*?\[\/!+\]/gm, '');
      }
   }
   var question_html = htm.match (/(\[q [^\]]*\]|<div class="qwizzled_question|\[q\])[^]*/m)[0];
   var question_shortcodes = question_html.match (/\[(<code><\/code>)*(q\]|q\s+[^\]]*\])/gm);
   if (debug[4] || debug[11]) {
      console.log ('[process_questions] question_shortcodes: ', question_shortcodes);
   }
   n_questions = question_shortcodes.length;
   qwizdata[i_qwiz].question_topics = new Array (n_questions);
   if (q.qwizard_b) {
      qwizdata[i_qwiz].qwizard_multiple_choice_b = [];
   }
   qwizdata[i_qwiz].units  = [];
   qwizdata[i_qwiz].topics = [];
   var matches = htm.match (/(<[^\/][^>]*>\s*)*?(\[q[ \]]|\[<code><\/code>q)/gm);
   var q_opening_tags = [];
   var n_q_opening_tags = matches.length;
   for (var i_tag=0; i_tag<n_q_opening_tags; i_tag++) {
      var q_opening_tag = matches[i_tag];
      q_opening_tag = q_opening_tag.replace (/\[q[ \]]|\[<code><\/code>q/gm, '');
      q_opening_tag = q_opening_tag.replace (/[^]*<(img|input)[^>]+>/, '');
      q_opening_tags.push (q_opening_tag);
   }
   if (debug[0] || debug[11]) {
      console.log ('[process_questions] q_opening_tags: ', q_opening_tags);
      console.log ('[process_questions] question_html: ', question_html);
   }
   var first_q_qwizzled_b = question_html.substr (0, 2) != '[q';
   if (first_q_qwizzled_b) {
      question_html = question_html.replace (/<div class="qwizzled_question[^>]*>/, '');
   } else {
      var start = question_html.indexOf (']') + 1;
      question_html = question_html.substr (start);
   }
   var qwizzled_pieces = question_html.split (/<div class="qwizzled_question[^_][^>]*>/);
   if (debug[0] || debug[11]) {
      console.log ('[process_questions] qwizzled_pieces.length:', qwizzled_pieces.length);
   }
   var questions_html = [];
   if (qwizzled_pieces.length == 1) {
      var q_split = question_html.split (/(?:(?:<(?:p|h[1-6]|span|em|strong|code)[^>]*|<i|<b)>(?:\s|&nbsp;)*)*?(?:\[q [^\]]*\]|\[<code><\/code>q [^\]]*\]|\[q\]|\[<code><\/code>q\])/);
      if (debug[0] || debug[11]) {
         console.log ('[process_questions] q_split:', q_split);
      }
      var i_qbeg = 0;
      if (first_q_qwizzled_b) {
         questions_html.push (q_split[0] + '[q]' + q_split[1]);
         i_qbeg = 2;
      }
      for (var i_q=i_qbeg; i_q<q_split.length; i_q++) {
         questions_html.push (q_split[i_q]);
      }
   } else if (qwizzled_pieces.length > 1) {
      if (first_q_qwizzled_b) {
         for (var i_qwizzled=0; i_qwizzled<qwizzled_pieces.length; i_qwizzled++) {
            var q_split = qwizzled_pieces[i_qwizzled].split (/\[q [^\]]*\]|\[<code><\/code>q [^\]]*\]|\[q\]|\[<code><\/code>q\]/);
            questions_html.push (q_split[0] + '[q]' + q_split[1]);
            for (var i_q=2; i_q<q_split.length; i_q++) {
               questions_html.push (q_split[i_q]);
            }
         }
      } else {
         var q_split =  qwizzled_pieces[0].split (/\[q [^\]]*\]|\[q\]/);
         for (var i_q=0; i_q<q_split.length; i_q++) {
            questions_html.push (q_split[i_q]);
         }
         for (var i_qwizzled=1; i_qwizzled<qwizzled_pieces.length; i_qwizzled++) {
            var q_split = qwizzled_pieces[i_qwizzled].split (/\[q [^\]]*\]|\[<code><\/code>q [^\]]*\]|\[q\]|\[<code><\/code>q\]/);
            questions_html.push (q_split[0] + '[q]' + q_split[1]);
            for (var i_q=2; i_q<q_split.length; i_q++) {
               questions_html.push (q_split[i_q]);
            }
         }
      }
   }
   if (set_qwizard_data_b && typeof (i_qwizard_question) == 'undefined') {
      qw.set_qwizard_data ('n_questions', n_questions);
   }
   if (! q.qwizard_b) {
      qwizdata[i_qwiz].n_questions = n_questions;
      const questions_to_show = qwizdata[i_qwiz].questions_to_show;
      if (questions_to_show && questions_to_show < n_questions) {
         qwizdata[i_qwiz].n_questions_for_done = questions_to_show;
         qwizdata[i_qwiz].random_b = true;
      } else {
         qwizdata[i_qwiz].n_questions_for_done = n_questions;
      }
   }
   if (debug[0] || debug[11]) {
      console.log ('[process_questions] n_questions:', n_questions);
      console.log ('[process_questions] questions_html:', questions_html.join ('\n================================================\n'));
   }
   var question_divs = [];
   var question_div;
   var questions_w_topics_b = false;
   for (var ii=0; ii<n_questions; ii++) {
      var i_question = ii + number_first_question;
      var question_shortcode;
      if (typeof (i_qwizard_question) != 'undefined') {
         question_shortcode = question_shortcodes[0];
      } else {
         question_shortcode = question_shortcodes[i_question];
      }
      question_topic = process_question_attributes (i_qwiz, i_question, question_shortcode, i_qwizard_question);
      if (question_topic) {
         questions_w_topics_b = true;
      }
      if (questions_html[ii].indexOf ('[hangman') != -1
                  || questions_html[ii].indexOf ('hangman_img_wrapper') != -1) {
         question_div = process_hangman (i_qwiz, i_question,
                                         questions_html[ii],
                                         q_opening_tags[ii]);
      } else if (questions_html[ii].indexOf ('[textentry') != -1) {
         question_div = process_textentry (i_qwiz, i_question,
                                           questions_html[ii],
                                           q_opening_tags[ii]);
      } else if (questions_html[ii].search (/\[c\]|\[c\*\]/m) != -1) {
         question_div = process_multiple_choice (i_qwiz, i_question,
                                                 questions_html[ii],
                                                 q_opening_tags[ii]);
      } else if (questions_html[ii].indexOf ('hotspot_image_stack') != -1) {
         qwizdata[i_qwiz].hotspot_b = true;
         question_div = process_hotspot_diagram (i_qwiz, i_question,
                                                 questions_html[ii],
                                                 q_opening_tags[ii],
                                                 qwizard_process_dataset_questions_f);
      } else if (questions_html[ii].search (/<div[^>]+class=".*?qwizzled_label/m) != -1) {
         qwizzled_b = true;
         qwizdata[i_qwiz].qwizzled_b = true;
         question_div = process_qwizzled (i_qwiz, i_question,
                                          questions_html[ii],
                                          q_opening_tags[ii],
                                          question_shortcodes[ii]);
         if (qwizdata[i_qwiz].correct_on_try1) {
            qwizdata[i_qwiz].correct_on_try1[i_question] = {};
         } else {
            qwizdata[i_qwiz].correct_on_try1 = [];
         }
      } else {
         var question_htm = questions_html[ii];
         var question_html_wo_tags_whitespace = question_htm.replace (/<[^>]+>|&nbsp;|\s/gm, '');
         if (! question_html_wo_tags_whitespace) {
            if (question_htm.indexOf ('img') != -1) {
               question_html_wo_tags_whitespace = true;
            }
         }
         if (! question_html_wo_tags_whitespace) {
            if (! qwizdata[i_qwiz].use_dataset_question_ids[i_question]) {
               errmsgs.push (T ('Question is completely blank') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (i_question + 1));
            }
         } else {
            const f_pos = question_htm.indexOf ('[f]');
            if (f_pos != -1) {
               errmsgs.push (T ('Question appears to be information-only, but feeedback ([f]) was provided') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (i_question + 1));
               if (q.wordpress_page_f) {
                  question_htm = cvt_feedback (question_htm, f_pos);
               }
            }
            qwizdata[i_qwiz].information_question_b[i_question] = true;
            if (qwizdata[i_qwiz].qrecord_id) {
               var q_and_a_text;
               if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
                  q_and_a_text = qqc.remove_tags_eols (question_htm);
                  qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (q_and_a_text);
                  qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (questions_html[ii]);
               } else {
                  qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
                  qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
               }
            }
         }
         if (set_qwizard_data_b) {
            qw.questions_cards[i_question].type = 'information_only';
            question_htm = qqc.shortcodes_to_video_elements (question_htm);
            qw.questions_cards[i_question].question_text = q_opening_tags[ii] + question_htm;
         }
         var bg_img_style = create_bg_img_style (i_qwiz, i_question);
         question_div = '<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq"' + bg_img_style + '>\n'
                    +      '<div class="qwiz-question qwiz_editable">'
                    +          q_opening_tags[ii] + question_htm
                    +      '</div>'
                    +   '</div>';
      }
      question_divs.push (question_div);
   }
   new_htm += question_divs.join ('\n');
   const dataset_ids = Object.values (qwizdata[i_qwiz].dataset_id);
   if (dataset_ids.length > 1) {
      dataset_ids.sort ();
      const l = dataset_ids.length;
      var dup_err = false;
      for (var i=1; i<l; i++) {
         if (dataset_ids[i] == dataset_ids[i - 1]) {
            errmsgs.push (T ('Duplicate') + ' dataset_id: ' + dataset_ids[i] + '.  qwiz: ' + (i_qwiz + 1));
            dup_err = true;
         }
      }
      if (dup_err) {
         errmsgs.push (T ('Please delete the duplicate dataset_id="..." attribute(s); new IDs will be created'));
      }
   }
   if (questions_w_topics_b) {
      if (debug[4]) {
         console.log ('[process_questions] topics: ' + qwizdata[i_qwiz].topics.join ('; '));
      }
   }
   if (set_qwizard_data_b) {
      qw.unit_names = qwizdata[i_qwiz].units;
   }
   if (qwizdata[i_qwiz].topics.length) {
      check_questions_have_topics (i_qwiz);
      if (set_qwizard_data_b) {
         qw.topic_names = qwizdata[i_qwiz].topics;
      }
   }
   if (debug[3] || debug[11]) {
      console.log ('[process_questions] new_htm: ', new_htm);
   }
   if (debug[12]) {
      console.log ('[process_questions] errmsgs: ', errmsgs.join ('\n'));
   }
   return new_htm;
}
function create_qwiz_divs (i_qwiz, qwiz_tag, htm, exit_html) {
   var m = qwiz_tag.match (/\[qwiz([^\]]*)\]/m);
   var attributes = m[1];
   if (debug[0]) {
      console.log ('[create_qwiz_divs] attributes: ', attributes);
   }
   attributes = qqc.replace_smart_quotes (attributes);
   var non_default_width_b = attributes.search (/[\s;"]width/m) != -1;
   var top_html = [];
   if (non_default_width_b) {
      var xattributes = attributes.replace (/;\s*;/g, ';');
      top_html.push ('<div id="xqwiz' + i_qwiz + '" class="xqwiz" ' + xattributes + '></div>\n');
   }
   m = attributes.match (/min-height:\s*([^;\s]+)/);
   if (m) {
      preview_min_height = m[1];
   }
   if (qwizdata[i_qwiz].align) {
      var align = qwizdata[i_qwiz].align;
      var style = '';
      if (align == 'center') {
         style = 'margin: auto;';
      } else if (align == 'right') {
         style = 'margin-left: auto;';
      } else if (align == 'tiled') {
         style = 'float: left;';
         if (qwizdata[i_qwiz].spacing) {
            var spacing = qwizdata[i_qwiz].spacing + 'px !important';
            style += ' margin-left: ' + spacing + '; margin-bottom: ' + spacing + ';';
         }
      }
      m = attributes.match (/style\s*=\s*"[^"]*/m);
      if (m) {
         attributes = attributes.replace (/(style\s*=\s*"[^"]*)/m, '$1' + '; ' + style);
         attributes = attributes.replace (/;\s*;/g, ';');
      } else {
         attributes += ' style="' + style + '"';
      }
      attributes = attributes.replace (/align\s*=\s*"[^"]*"/, '');
      if (debug[0]) {
         console.log ('[create_qwiz_divs] attributes: ', attributes);
      }
   }
   top_html.push ('<div id="qwiz' + i_qwiz + '" class="qwiz visibilityhidden" ' + attributes + '>');
   var mmss = '';
   if (qwizdata[i_qwiz].question_time_limit) {
      mmss = qqc.hhmmss_from_sec (qwizdata[i_qwiz].question_time_limit);
   }
   top_html.push ('<div id="qwiz' + i_qwiz+ '-question_timer" class="question-timer">' + mmss + '</div>');
   top_html.push (   '<div id="overlay-times-up-qwiz' + i_qwiz + '" class="overlay-times-up">');
   top_html.push (      '<div class="overlay-times-up-msg">');
   top_html.push (         'Sorry, time&rsquo;s up');
   top_html.push (      '</div>');
   top_html.push (   '</div>');
   top_html.push (   '<div id="overlay-exit-mobile-qwiz' + i_qwiz + '" class="overlay-exit-mobile-qwiz" onclick="' + qname + '.close_panel_exit_mobile(this)">');
   top_html.push (      '<div id="panel-exit-mobile-qwiz' + i_qwiz + '" class="panel-exit-mobile-qwiz">');
   top_html.push (         '<button onclick="' + qname + '.exit_mobile (' + i_qwiz + ')">');
   top_html.push (            T ('Back to page view'));
   top_html.push (         '</button>');
   top_html.push (         '<br />');
   top_html.push (         '<span>');
   top_html.push (            '(');
   top_html.push (            T ('To return to this full-screen view, tap'));
   top_html.push (            '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAk0lEQVR4nI3QMQ6EIBAF0BG2YLiGtjRcgt7EcBfDhShtbLwBHIgCJrPFbrGJqPvrl/k/MzAzPOUFAMYYRCSiaZpijGckAAARSynM3BVf1FpTSkkpQwiXaBzHnLNzbtu2Lhr+GS4exSUyxqzrCgDLssDnBefM87zv+3EcRHS3yVpba0XElFK/znsvhNBal1LuLv3mDbu1OYLB67+mAAAAAElFTkSuQmCC" />');
   top_html.push (            ')');
   top_html.push (         '</span>');
   top_html.push (         '<div class="panel-icon-exit-mobile-qwiz"></div>');
   top_html.push (      '</div>');
   top_html.push (   '</div>');
   top_html.push (   '<div id="icon-exit-mobile-qwiz' + i_qwiz + '" class="icon-exit-mobile-qwiz" onclick="' + qname + '.open_panel_exit_mobile (' + i_qwiz + ')"></div>');
   var style = '';
   if (header_html == '' || header_html == 'NA' || header_html.indexOf ('Enter header text') != -1) {
      style = ' style="display: none;"';
   }
   top_html.push ('<div class="header-qwiz' + i_qwiz + ' qwiz-header qwiz_editable"' + style + '>');
   top_html.push (    header_html);
   top_html.push ('</div>');
   top_html = top_html.join ('\n');
   /*
   var learn_mode_title = T ('Learn mode: questions repeat until answered correctly.');
   var test_mode_title  = T ('Test mode: incorrectly-answered questions do not repeat.');
   var mode;
   var title;
   if (qwizdata[i_qwiz].repeat_incorrect_b) {
      mode = T ('Learn');
      title = learn_mode_title + ' ' + test_mode_title;
   } else {
      mode = T ('Test');
      title = test_mode_title + ' ' + learn_mode_title;
   }
   */
   const plugin_url = qqc.get_qwiz_param ('url', './');
   var progress_div_html = [];
   progress_div_html.push ('<div class="qwiz-progress-container qwiz' + i_qwiz + '">');
   var title = T ('Full-screen view');
   progress_div_html.push (   '<div class="go-mobile-qwiz go-mobile-qwiz' + i_qwiz + '" onclick="' + qname + '.go_mobile (' + i_qwiz + ')" title="' + title + '">');
   progress_div_html.push (   '</div>');
   progress_div_html.push (   '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAKwmlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU9kWhs+96Y2WEAEpofcuXUroAZReRSUkgYQSY0JQsSviCCqKiAiWoQxVwUEpMhbEgm1QbNgnyKCiPgcLNlTeBYYw89567633r3XW/e6+++y9z1nnrLUvABQ8WyTKgJUAyBRmiSMCvBlx8QkM3O8AAligChSAHpsjETHDwkIAounn3/XhDuKN6KblRKx///5fpczlSTgAQGEIJ3MlnEyEjyHjNUckzgIAVY3Y9ZdliSb4IsI0MVIgwg8nOHWKRyY4eZLR6EmfqAgfhNUAwJPZbHEqAGQDxM7I5qQicci+CNsIuQIhwsg78ODw2VyEkbzAIjNzyQTLEDZJ/kuc1L/FTJbHZLNT5Ty1lknhfQUSUQZ7xf+5Hf9bmRnS6RxGyCDzxYERyJOO7Nnd9CXBchYmzw+dZgF30n+S+dLA6GnmSHwSppnL9g2Wz82YHzLNKQJ/ljxOFitqmnkSv8hpFi+JkOdKEfswp5ktnskrTY+W2/k8ljx+Dj8qdpqzBTHzp1mSHhk84+Mjt4ulEfL6ecIA75m8/vK1Z0r+sl4BSz43ix8VKF87e6Z+npA5E1MSJ6+Ny/P1m/GJlvuLsrzluUQZYXJ/XkaA3C7JjpTPzUIO5MzcMPkeprGDwqYZhIAAwADRIANkATFgIxwIkJOaxVs+cUaBzxLRCrEglZ/FYCK3jMdgCTlWFgw7GzsbACbu7NSReHd38i5CdPyMTYJ4uG5DjKIZ20IaAMf4AChwZmxGRch1JAFwNoEjFWdP2SauE8AAIlAENKAOtIE+MAGWwA44AjfgBfxAEAgFUSAeLAIcwAeZSOXLwCqwHuSBArAD7AZl4CCoAnXgMGgB7eAEOAMugCvgOrgNHgAZGAIvwQj4AMYgCMJBFIgKqUM6kCFkDtlBzpAH5AeFQBFQPJQEpUJCSAqtgjZCBVARVAZVQPXQz9Bx6Ax0CeqD7kED0DD0FvoCo2AyTIO1YCPYGnaGmXAwHAUvhFPhpXAOnAtvh0vhSvgQ3Aafga/At2EZ/BIeRQEUCUVH6aIsUc4oH1QoKgGVghKj1qDyUSWoSlQTqhPVg7qJkqFeoT6jsWgqmoG2RLuhA9HRaA56KXoNeiu6DF2HbkOfQ99ED6BH0N8xFIwmxhzjimFh4jCpmGWYPEwJpgbTijmPuY0ZwnzAYrF0rDHWCRuIjcemYVdit2L3Y5uxXdg+7CB2FIfDqePMce64UBwbl4XLw+3FHcKdxt3ADeE+4Ul4Hbwd3h+fgBfiN+BL8A34U/gb+Gf4MYISwZDgSgglcAkrCIWEakIn4RphiDBGVCYaE92JUcQ04npiKbGJeJ74kPiORCLpkVxI4SQBaR2plHSEdJE0QPpMViGbkX3IiWQpeTu5ltxFvkd+R6FQjChelARKFmU7pZ5ylvKY8kmBqmClwFLgKqxVKFdoU7ih8FqRoGioyFRcpJijWKJ4VPGa4islgpKRko8SW2mNUrnScaV+pVFlqrKtcqhypvJW5QblS8rPVXAqRip+KlyVXJUqlbMqg1QUVZ/qQ+VQN1KrqeepQzQszZjGoqXRCmiHab20EVUV1TmqMarLVctVT6rK6Ci6EZ1Fz6AX0lvod+hfZmnNYs7izdoyq2nWjVkf1Wareanx1PLVmtVuq31RZ6j7qaer71RvV3+kgdYw0wjXWKZxQOO8xqvZtNluszmz82e3zL6vCWuaaUZortSs0ryqOaqlrRWgJdLaq3VW65U2XdtLO027WPuU9rAOVcdDR6BTrHNa5wVDlcFkZDBKGecYI7qauoG6Ut0K3V7dMT1jvWi9DXrNeo/0ifrO+in6xfrd+iMGOgbzDFYZNBrcNyQYOhvyDfcY9hh+NDI2ijXabNRu9NxYzZhlnGPcaPzQhGLiabLUpNLklinW1Nk03XS/6XUz2MzBjG9WbnbNHDZ3NBeY7zfvs8BYuFgILSot+i3JlkzLbMtGywErulWI1QardqvX1gbWCdY7rXusv9s42GTYVNs8sFWxDbLdYNtp+9bOzI5jV253y55i72+/1r7D/s0c8zm8OQfm3HWgOsxz2OzQ7fDN0clR7NjkOOxk4JTktM+p35nmHOa81fmiC8bF22WtywmXz66OrlmuLa5/uFm6pbs1uD2fazyXN7d67qC7njvbvcJd5sHwSPL40UPmqevJ9qz0fOKl78X1qvF6xjRlpjEPMV9723iLvVu9P/q4+qz26fJF+Qb45vv2+qn4RfuV+T321/NP9W/0HwlwCFgZ0BWICQwO3BnYz9JicVj1rJEgp6DVQeeCycGRwWXBT0LMQsQhnfPgeUHzds17ON9wvnB+eygIZYXuCn0UZhy2NOyXcGx4WHh5+NMI24hVET2R1MjFkQ2RH6K8owqjHkSbREuju2MUYxJj6mM+xvrGFsXK4qzjVsddideIF8R3JOASYhJqEkYX+C3YvWAo0SExL/HOQuOFyxdeWqSxKGPRycWKi9mLjyZhkmKTGpK+skPZlezRZFbyvuQRjg9nD+cl14tbzB3mufOKeM9S3FOKUp6nuqfuSh3me/JL+K8EPoIywZu0wLSDaR/TQ9Nr08czYjOaM/GZSZnHhSrCdOG5JdpLli/pE5mL8kSypa5Ldy8dEQeLaySQZKGkI4uGNEdXpSbSTdKBbI/s8uxPy2KWHV2uvFy4/OoKsxVbVjzL8c/5aSV6JWdl9yrdVetXDaxmrq5YA61JXtO9Vn9t7tqhdQHr6tYT16ev/3WDzYaiDe83xm7szNXKXZc7uClgU2OeQp44r3+z2+aDP6B/EPzQu8V+y94t3/O5+ZcLbApKCr5u5Wy9vM12W+m28e0p23sLHQsP7MDuEO64s9NzZ12RclFO0eCuebvaihnF+cXvdy/efalkTsnBPcQ90j2y0pDSjr0Ge3fs/VrGL7td7l3evE9z35Z9H/dz99844HWg6aDWwYKDX34U/Hi3IqCirdKosqQKW5Vd9bQ6prrnJ+ef6ms0agpqvtUKa2V1EXXn6p3q6xs0Gwob4UZp4/ChxEPXD/se7miybKpopjcXHAFHpEde/Jz0852W4Jbuo85Hm44ZHtvXSm3Nb4PaVrSNtPPbZR3xHX3Hg453d7p1tv5i9UvtCd0T5SdVTxaeIp7KPTV+Ouf0aJeo69WZ1DOD3Yu7H5yNO3vrXPi53vPB5y9e8L9wtofZc/qi+8UTl1wvHb/sfLn9iuOVtqsOV1t/dfi1tdext+2a07WO6y7XO/vm9p264XnjzE3fmxdusW5duT3/dt+d6Dt3+xP7ZXe5d5/fy7j35n72/bEH6x5iHuY/UnpU8ljzceVvpr81yxxlJwd8B64+iXzyYJAz+PJ3ye9fh3KfUp6WPNN5Vv/c7vmJYf/h6y8WvBh6KXo59irvH8r/2Pfa5PWxP7z+uDoSNzL0Rvxm/O3Wd+rvat/Ped89Gjb6+EPmh7GP+Z/UP9V9dv7c8yX2y7OxZV9xX0u/mX7r/B78/eF45vi4iC1mT7YCKGTAKSkAvK0FgBIPAPU6AMQFUz31pKCp/4BJAv+Jp/ruSTkCgIQC0V0ATLRoVX+2tIrIe5gXAFFeALa3l48/JUmxt5uKRWpHWpOS8fF3SP+IMwXgW//4+Fj7+Pi3GqTY+wB0fZjq5SekjfxXLMADqHzTrZYB8K/6J1bAD27htQDfAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDY4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjQ2NjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrdRrnkAAADWklEQVRIDZ1VW08TQRT+uvRqCBoI5ckCD3JRjEALCfFNMJHfIH9B0V+BkIj6omgiEilPBiFyT+TRAAX1wQj0JpBIFYQaa6Db7WWcc8rWBKl2nWR2Z3bOfOf2nbMmfzAk1tfWYLfbkclkABN4KIqCpJZEs7sZ5eVOpFIpmExHh1mRwp53+/uFlMw7P3xcFRkhxGEiIVQtaXiaHQ4HW+LxtCAS2UZxcTHS6TS2IxG8np/HhfP1SEhPFJNSmMXHpJRMhowHYrEfUkEEaiKBcDgMr3cEl9vaEFcTx64Y2yp6zK1WG5wVFUglk4wwNPQMgVAYp+y2bG6M4eakFY6+3MbVOHZ3dqCqKmpqazE5MQGPTHAw/ImVUNj+ZyhWq5XvlZWVoae3F9FoFAG/Hw0NF/EzFkODzIHuicy1cR29fX3MIN/yirwvxIvRUd47nRVCesJrm80mAqGQSMvzQ9UYm/D23Xux6FtmcKIhUXJ0bIyBJf/FpcZGXkvTxe7evkhLgYO4WjBdQVYRaDyh5awjbS/Hxhn4rMvF74ePBvg8kUyxbKE1gd/AGltFIaBvNMZfTTD4wOMnIiWt0FLpHDjJHar/9sRElhzPHLWMoqIiULsIh0JwVVbCYrEgKSlM36ltyLzI4oOsG43ljmPo+xMV0KF0gGXsVgtkWHhPCgncIWvj294+Dg8OUFXpoijkVZK3/qmx0ZShYHBaUy1Q4UWj39F98waqqyqxHgjCYbPyWbalZY2jKLCRhSaLYk55iHzdEde7ujg35CjN1XU/pYzZRXKESSMpKYdCFRA1aSwsLjHouZoa0djUlFOkKyEiEOb07Kz4HPlSuAK6ROwiWk9OzzBwSUmJqD0qRt0TovzTwUE+f7OwaFyB7v7k1DSDyPYu6urreX2lvV303OnlNSn0rawYU6B7odfJ1JEnBFZXV5cDdrvdvF5c8om8LJKXThzEJhkFyh06O69hZm6O5YLBIFwuF6qqq+W/JZa9K+vEsAK6SfVANKR/VUfHVXTfus001TQNmxsboLeuwXy0MvQiD8xmM4N6h5/jwf17aGltRTwex+kzZ1BaWoqtra0sJsXV6KQcEFuGvSO5uEu0P9bEoryt4m8ukQfUkwKBALY2N7kv8R9Pxlwf0gK4PR78Ak4cQYObEn/YAAAAAElFTkSuQmCC" class="go-mobile-qwiz go-mobile-qwiz' + i_qwiz + '" />');
   title = T ('Exit full-screen view');
   progress_div_html.push (   '<div class="exit-mobile-qwiz exit-mobile-qwiz' + i_qwiz + '" onclick="' + qname + '.exit_mobile (' + i_qwiz + ')" title="' + title + '">');
   progress_div_html.push (   '</div>');
   progress_div_html.push (   '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAoVJREFUSA2lVj2PEkEY3plZV5I9Q3KBqzFHQkFJaCx0sTCxo6EnsfMPWPjBctqoueqMNf/CwtODxo7ySCxMaAjhgiRGiXjsh8+zzl5WKoZ7k+GdnZ33ed6PeWdRtVrtxnQ6jWxbvrUs8SCO449cq1Qqst1uWxBVr9fFaDSKW62WouaikTiO0xVCxBy2bXdpXC6Xb5ZKpZzv+xKkIp/PH3JuBMzN9FyD/4Fea5IjvmMk1FLKExAfc24sMH6tCQgeYgSa5BXB4MAz/ewbg6cG8M4niAZPotDPZ1ozdZ10v5GuVqsODTIkJGIkkQZn6q5qYwSOzbJYLEYsaBAEvlLqpQYQWq+h07leMlPS87wI4IIFhX4B8zMNGkAnRTaD/H+37Pf7PO+Xw+FwzYLidQPjUm9jBCSiRP+U4S+bJ44twaOoc570w+YcNUIjmkuSXzbRcrl8DPOfGOzUbEPR8z0QfFitVp8xNxNGsG2Hpo1nxmC4e1sSOo0DZO90BHO53H2cuIfw7RfGZjqJeWt/331/cfHjG+bmwoJvHoLss1LyHS9Ipl+ZwyeX3x0AeLD9re15EEIM9KrqhGH4BIQSV7vMhqf3bqVSOxu702bkldNH6o5Yp16v57CJd42ggQjuAZCec5CIchvpsyeTyWmhUFCLxcK6LgHTklyW0OwfAeK74JDz+fzUdd2UGK8MBACdTFGvrnSs8apPvyddQl4nAg8FfR5F0SOmhZ4DL4kCOsRzA9fPHkmMBXjHOIonNEwbD2tdHRWjSL4hIHhjDM4OPTjIH8JDwTn/GPB7QiCQpF9GfqB8ru2SInV+/vX7YDCwx+OxaDabAU8LCzqbzT7BaxcRfEEvPGV0fwEIA/zW345reQAAAABJRU5ErkJggg==" class="exit-mobile-qwiz exit-mobile-qwiz' + i_qwiz + '" />');
   /*
   progress_div_html.push (   '<div id="mode-qwiz' + i_qwiz + '" class="qwiz-mode" title="' + title + '">');
   progress_div_html.push (      'Mode: ' + mode);
   progress_div_html.push (   '</div>');
   */
   var n_questions = qwizdata[i_qwiz].n_questions;
   if (   (   n_questions > 1
           || qwizdata[i_qwiz].use_dataset
           || qwizdata[i_qwiz].use_dataset_questions_htm)
       && (! q.preview || q.preview_i_qwiz_plus1)        ) {
      style = '';
      if (qwizdata[i_qwiz].hide_forward_back_b) {
         style = ' style="visibility: hidden;"';
      }
      var title;
      if (qwizdata[i_qwiz].use_dataset && qwizdata[i_qwiz].dataset_intro_f) {
         title = T ('Go to &ldquo;Choose questions&rdquo;');
      } else {
         title = T ('Go to first question');
      }
      progress_div_html.push ('<span class="bbfe-wrapper bbfe-wrapper' + i_qwiz + '">');
      progress_div_html.push (   '<span class="bbfe bbfe-qwiz' + i_qwiz + ' bck-question-qwiz' + i_qwiz + '"' + style + ' onclick="' + qname + '.bck_question (' + i_qwiz + ', true )" title="' + title + '">');
      progress_div_html.push (      '<img class="icon-beg-end-qwiz" src="' + plugin_url + '/images/icon_beg.svg">');
      progress_div_html.push (   '</span>');
      progress_div_html.push (   '<span class="bbfe bbfe-qwiz' + i_qwiz + ' bck-question-qwiz' + i_qwiz + '"' + style + ' onclick="' + qname + '.bck_question (' + i_qwiz + ', false)" title="' + T ('Go to previous question') + '">');
      progress_div_html.push (      '<img class="icon-bck-fwd-qwiz" src="' + plugin_url + '/images/icon_bck.svg">');
      progress_div_html.push (   '</span>');
      progress_div_html.push (   '<span class="question-number-qwiz question-number-qwiz' + i_qwiz + '"' + style + '>');
      progress_div_html.push (   '</span>');
      progress_div_html.push (   '<span class="bbfe bbfe-qwiz' + i_qwiz + ' fwd-question-qwiz' + i_qwiz + '"' + style + ' onclick="' + qname + '.fwd_question (' + i_qwiz + ', false)" title="' + T ('Go to next question') + '">');
      progress_div_html.push (      '<img class="icon-bck-fwd-qwiz" src="' + plugin_url + '/images/icon_fwd.svg">');
      progress_div_html.push (   '</span>');
      progress_div_html.push (   '<span class="bbfe bbfe-qwiz' + i_qwiz + ' fwd-question-qwiz' + i_qwiz + '"' + style + ' onclick="' + qname + '.fwd_question (' + i_qwiz + ', true )" title="' + T ('Go to most-recent question') + '">');
      progress_div_html.push (      '<img class="icon-beg-end-qwiz" src="' + plugin_url + '/images/icon_end.svg">');
      progress_div_html.push (   '</span>');
      progress_div_html.push ('</span>');
   }
   style = '';
   var mmss = '';
   if (qwizdata[i_qwiz].qwiz_timer && ! q.preview) {
      style = ' style="display: inline-block;"';
      mmss = '0:00';
   }
   progress_div_html.push ('<span id="qwiz' + i_qwiz+ '-qwiz_timer" class="qwiz-timer"' + style + '>' + mmss + '</span>');
   if (qwizdata[i_qwiz].qrecord_id) {
      progress_div_html.push ('<span class="response_recorded_wrapper response_recorded_wrapper-qwiz' + i_qwiz + '">');
      progress_div_html.push (   '<span class="response_recorded response_recorded-qwiz' + i_qwiz + '">');
      progress_div_html.push (      `<img src="${plugin_url}/images/recording.svg" class="response_recording" >`);
      progress_div_html.push (   '</span>');
      progress_div_html.push ('</span>');
      progress_div_html.push ('<div class="qwiz_icon_and_menu_container lock_unlock qwiz' + i_qwiz + '">');
      progress_div_html.push (   '<div id="locked-qwiz' + i_qwiz + '" class="qwiz-locked qwiz_menu_icon">');
      progress_div_html.push (      `<img src="${plugin_url}/images/icon_locked.png" />`);
      progress_div_html.push (   '</div>');
      progress_div_html.push (   '<div id="unlocked-qwiz' + i_qwiz + '" class="qwiz-unlocked qwiz_menu_icon">');
      progress_div_html.push (      `<img src="${plugin_url}/images/icon_unlocked.png" />`);
      progress_div_html.push (   '</div>');
      progress_div_html.push (   '<div class="qwiz_icon_trigger_and_menu qwiz-hover">');
      progress_div_html.push (      '<div class="qwiz_icon_trigger">');
      progress_div_html.push (      '</div>');
      progress_div_html.push (      '<div id="pay_unlock_menu-qwiz' + i_qwiz + '" class="qwiz-pay_unlock_menu qwiz_menu">');
      progress_div_html.push (      '</div>');
      progress_div_html.push (   '</div>');
      progress_div_html.push ('</div>');
      var addclass = '';
      if (q.no_intro_b[i_qwiz] || n_questions == 1) {
         addclass = ' qwiz-usermenu_icon_no_intro';
      }
      progress_div_html.push ('<div class="qwiz_icon_and_menu_container qwiz' + i_qwiz + '">');
      progress_div_html.push (   '<div class="qwiz-usermenu_icon qwiz_menu_icon' + addclass + '">');
      progress_div_html.push (      '&#x25bc;');
      progress_div_html.push (   '</div>');
      progress_div_html.push (   '<div class="qwiz_icon_trigger_and_menu qwiz-hover">');
      progress_div_html.push (      '<div class="qwiz_icon_trigger" style="left: -12px; top: -4px;">');
      progress_div_html.push (      '</div>');
      progress_div_html.push (      '<div id="usermenu-qwiz' + i_qwiz + '" class="qwiz-usermenu qwiz_menu">');
      progress_div_html.push (      '</div>');
      progress_div_html.push (   '</div>');
      progress_div_html.push ('</div>');
   }
   style = '';
   if (qwizdata[i_qwiz].hide_progress_b) {
      style = ' style="display: none;"';
   }
   progress_div_html.push (   '<div id="progress-qwiz' + i_qwiz + '" class="qwiz-progress"' + style + '>');
   progress_div_html.push (   '</div>');
   progress_div_html.push ('</div>');
   progress_div_html = progress_div_html.join ('\n');
   var login_div = '';
   if (qwizdata[i_qwiz].qrecord_id || qwizdata[i_qwiz].use_dataset) {
      login_div =  '<div id="qwiz_login-qwiz' + i_qwiz + '" class="qwiz-login">\n'
                 + '</div>';
   }
   var bottom_html = [];
   if (   n_questions > 1
       || qwizdata[i_qwiz].use_dataset
       || qwizdata[i_qwiz].use_dataset_questions_htm || q.qwizard_b) {
      if (exit_html) {
         if (exit_html.indexOf ('[unpaid') != -1 && exit_html.indexOf ('[/unpaid]') != -1) {
            exit_html = exit_html.replace ('[unpaid]', '<span class="unpaid_msg">');
            exit_html = exit_html.replace ('[/unpaid]', '</span>');
         } else {
            exit_html += '<span class="unpaid_msg_payment_type unpaid_msg"></span>';
         }
      } else {
         exit_html += '<span class="unpaid_msg_payment_type unpaid_msg"></span>';
      }
      if (qwizdata[i_qwiz].use_dataset && ! q.preview) {
         if (exit_html.indexOf ('[restart') == -1) {
            exit_html += '<br />[restart]';
         }
      }
      if (exit_html) {
         exit_html = create_restart_button (i_qwiz, exit_html);
      }
      if (q.qwizard_b) {
         exit_html = qqc.shortcodes_to_video_elements (exit_html);
      }
      if (qwizdata[i_qwiz].summary_b) {
         bottom_html.push (create_summary_report_div (i_qwiz, exit_html));
      }
   } else {
      if (n_questions == 1 && exit_html) {
         exit_html = create_restart_button (i_qwiz, exit_html);
         bottom_html.push ('<div class="single-question_exit">');
         bottom_html.push (   exit_html);
         bottom_html.push ('</div>');
      }
      if (   ! qwizdata[i_qwiz].qwizzled_b && ! qwizdata[i_qwiz].hotspot_b
          && ! qwizdata[i_qwiz].qrecord_id
          && ! qqc.is_mobile (qwizdata[i_qwiz].mobile_enabled)
          && ! q.qwizard_b) {
         progress_div_html = '';
      }
   }
   bottom_html.push ('<div class="next_button" id="next_button-qwiz' + i_qwiz + '">\n');
   bottom_html.push (   '<button class="qwiz_button" onclick="' + qname + '.next_question (' + i_qwiz + ')">');
   bottom_html.push (       '<span id="next_button_text-qwiz' + i_qwiz + '">');
   bottom_html.push (          T ('Start quiz'));
   bottom_html.push (       '</span>');
   bottom_html.push (   '</button>\n');
   bottom_html.push ('</div>\n');
   if (! qwizdata[i_qwiz].summary_b) {
      if (n_questions > 1 && exit_html) {
         bottom_html.push (create_summary_report_div (i_qwiz, exit_html));
      }
   }
   if (! qwizdata[i_qwiz].hide_qwizcards_icon_b) {
      if (! qwizdata[i_qwiz].icon_swhs) {
         bottom_html.push (create_icon_qwiz_div (i_qwiz));
      }
   }
   bottom_html.push ('</div>');
   htm = top_html + progress_div_html + login_div
         + htm + bottom_html.join ('')
         + '</div>\n';  // This qwiz closing div.
   return htm;
}
function create_icon_qwiz_div (i_qwiz) {
   const icon_swhs = qwizdata[i_qwiz].icon_swhs;
   var htm = [];
   htm.push ('<div class="icon_qwiz" id="icon_qwiz' + i_qwiz + '">');
   var icon_qwiz = qqc.get_qwiz_param ('icon_qwiz');
   if (icon_qwiz != 'Not displayed') {
      const qwizcards_swhs = icon_swhs ? 'swinginghotspot' : 'qwizcards';
      if (icon_qwiz != 'Icon only') {
         htm.push ('<a href="mailto:support@' + qwizcards_swhs + '.com" style="border: none; box-shadow: none;">');
      }
      const title = T ('Questions, comments, suggestions?') + ' support@' + qwizcards_swhs + '.com';
      var icon_b64;
      if (icon_swhs) {
         icon_b64 = 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAABnWAAAZ1gEY0crtAAABiElEQVQ4jZWSv0sCYRyHnzvvinCIhBwEoyFBcJB0CKSmBJejIWhqbAuhv8DFCAdndRehqVDIKdokWlsEI1qiqesMkQNf77yGC/qh1t0zfvg8vO/3fb/gnUiE8/PvgexDLhQIh330v0ilEILNze+Z8qMRCLC7y+oqqoosI8s4DrZNr0e5jK6jafR6mOYs+fSUoyOenrBtAElClllYYGMDReHiguNj3t6oVmfdrVik2yUU+hFms+g6Z2fkcoxGbG3NGUxVabfpdFha+kySSSwLIahUeH/n5OTPhwkGubuj1UJRANJphMCycBxqtT9Nl3CYx8evwba3MQxublBVDzIQi/H6Sj4P0Gjw8MDKijfTZW8Pw2B/n8GAeNyPCSwv4zjU6zSb8yrz19OyAIJBhkP/8mQCIEmMx/5lF3c9fcvuPwvB4uI/B/xmfZ12m+dnNA3TpFQiEPAs399zfc3aGsDODobB4aFn+fIS2+bqioMD+n1Mk0xmuiXNliWJRIJolJcXolFub+n3p1sfn3l/Jjmrf3gAAAAASUVORK5CYII=';
      } else {
         icon_b64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAIAAAALACogAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABP0lEQVR4nGP8//8/AymAiSTV5GhgwSZ4rcRrxRooW3futlBnJDlGND/cXzXVccFLVP0oepiwqtZJyH2wrenBtogQBgYGhsv9q15j9cO1qTDVW8JEGRgYGBi0PJ0YGBgYrjzCpuH+qv1rGBgYGHQLoaoZGBgYlOTEGRgYGB68uY+h4fXuQy8ZGBgYnLSRvXjv0UsGBgYGBRFFdA1Prm+6x8DAwBBio4XsyO37GBgYGHTkEHaixYO4mszrWTl1CjmH7iMcKe5nhdAAi4cnL6/A3HbrHgMDw56pJ0QYIOHr5JgmgzASZoOFdggDAwPDy03HRCEhs6YJEne6c0uQHYkUcXt76pL3oTqQQbxqVjay8Sh+cC5pmuuEpkFMWQZNBCNpwMDrWTmT2+5hCCu54EqtomkVLjqYwgoiuGzACWifgQDhK2rq5bcX2gAAAABJRU5ErkJggg==';
      }
      htm.push ('<img class="icon_qwiz" style="border: none;" title="' + title + '" src="data:image/png;base64,' + icon_b64 + '" />');
      if (icon_qwiz != 'Icon only') {
         htm.push ('</a>');
      }
   }
   return htm.join ('');
}
function create_summary_report_div (i_qwiz, exit_html) {
   var bottom_html = [];
   bottom_html.push ('<div id="summary-qwiz' + i_qwiz + '" class="qwiz-summary">\n');
   bottom_html.push (   '<div id="summary_report-qwiz' + i_qwiz + '" class="qwiz_summary_report">');
   bottom_html.push (   '</div>\n');
   bottom_html.push (   '<div id="summary-quiz_times_histogram-qwiz' + i_qwiz + '">');
   bottom_html.push (   '</div>\n');
   bottom_html.push (   '<div id="qwiz_exit-qwiz' + i_qwiz + '" class="qwiz-exit qwiz_editable">');
   bottom_html.push (       exit_html);
   bottom_html.push (   '</div>\n');
   bottom_html.push (   '<button class="summary_exit_mobile_qwiz" onclick="' + qname + '.exit_mobile (' + i_qwiz + ')">\n');
   bottom_html.push (      'Return to page view');
   bottom_html.push (   '</button>\n');
   bottom_html.push ('</div>\n');
   return bottom_html.join ('');
}
function get_login_html (i_qwiz, add_team_member_f, msg, proceed_to_pay) {
   add_team_member_f = add_team_member_f ? 1 : 0;
   proceed_to_pay  = proceed_to_pay  ? 1 : 0;
   var onfocus = 'onfocus="jQuery (\'#qwiz_login-qwiz' + i_qwiz + ' p.login_error\').hide ()"';
   var login_div_html = '<p>';
   if (msg) {
      login_div_html += '<strong>' + msg + '</strong>';
   } else if (add_team_member_f) {
      login_div_html += '<strong>' + T ('Add team member') + '</strong>';
   } else {
      login_div_html += '<strong>' + T ('Record score/credit?') + '</strong>';
   }
   login_div_html += '</p>';
   login_div_html +=
      '<form action="nada" onSubmit="return qwiz_.login (' + i_qwiz + ', ' + add_team_member_f + ', ' + proceed_to_pay + ')">\n'
     +   '<table border="0" align="center" width="100%">'
     +      '<tr>'
     +         '<td>'
     +            '<label for="qwiz_username-qwiz' + i_qwiz + '"><nobr>'+ T ('Login name') + '</nobr></label>'
     +         '</td>'
     +         '<td>'
     +            '<input type="text" id="qwiz_username-qwiz' + i_qwiz + '" ' + onfocus + ' />'
     +         '</td>'
     +      '</tr>'
     +      '<tr>'
     +         '<td>'
     +            '<label for="qwiz_password-qwiz' + i_qwiz + '">'+ T ('Password') + '</label>'
     +         '</td>'
     +         '<td>'
     +            '<input type="password" id="qwiz_password-qwiz' + i_qwiz + '" />'
     +         '</td>'
     +      '</tr>'
     +      '<tr>'
     +         '<td style="text-align: right;">'
     +            '<span class="qwiz-remember" title="' + T ('Save preference (do not use on shared computer)') + '">'
     +               '<label>'
     +                  '<span class="qwiz-remember">'
     +                     '<input type="checkbox" />&nbsp;' + T ('Remember')
     +                  '</span>'
     +               '</label>'
     +            '</span>'
     +         '</td>'
     +         '<td>'
     +            '<button type="submit" class="qwiz_button">'
     +               T ('Student login')
     +            '</button>'
     +            '&ensp;';
   if (! add_team_member_f) {
      login_div_html +=
                  '<span class="qwiz_button" onclick="qwiz_qcards_common.create_register_taker_screen (\'' + qname + '\', ' + i_qwiz + ', ' + proceed_to_pay + ')">'
     +               T ('New student - register')
     +            '</span>'
     +            '&ensp;';
   }
   login_div_html +=
                  '<span class="qwiz_login_cancel_no_thanks qwiz_button" onclick="' + qname + '.no_login (' + i_qwiz + ',' + add_team_member_f + ')">';
   if (add_team_member_f) {
      login_div_html +=
                     T ('Cancel');
   } else {
      login_div_html +=
                    T ('No thanks');
   }
   login_div_html +=
                 '</span>'
     +         '</td>'
     +      '</tr>';
   if (! add_team_member_f) {
      login_div_html +=
            '<tr>'
     +         '<td>'
     +         '</td>'
     +         '<td class="qwiz-smaller">'
     +            '<a href="' + qqc.get_qwiz_param ('secure_server_loc', 'https://qwizcards.com/admin') + '/password_reset_request" target="_blank">'
     +               T ('Forgot password?') + '</a>'
     +         '</td>'
     +      '</tr>'
   }
   var register_page = 'new_account';
   if (window.location.href.indexOf ('learn-biology.com') != -1) {
      register_page = 'new_account_smv';
   }
   login_div_html +=
             '<tr>'
     +          '<td colspan="2">'
     +             '<hr style="margin: 5px;">'
     +          '</td>'
     +       '</tr>'
     +       '<tr>'
     +          '<td colspan="2" class="qwiz-center">'
     +             '<b>' + T ('Teachers: track your students&rsquo; progress on quizzes and flashcards') + '.&nbsp; '
     +                '<a href="' + qqc.get_qwiz_param ('secure_server_loc', 'https://qwizcards.com/admin') + '/' + register_page + '" target="_blank">'
     +                '<nobr>' + T ('Create teacher administrative account') + '</nobr></a></b>'
     +          '</td>'
     +       '</tr>'
     +    '</table>\n'
     + '</form>'
     + '<p class="login_error">'
     +     T ('Login incorrect. Please try again')
     + '</p>\n';
   return login_div_html;
}
this.qwiz_password_focus = function (el, i_qwiz) {
   el.qwiz_pw = '';
   el.value = '';
   $ ('#qwiz_login-qwiz' + i_qwiz + ' p.login_error').hide ();
}
function create_restart_button (i_qwiz, htm, feedback_f) {
   var restart = htm.match (/\[restart[^\]]*\]/);
   if (restart) {
      var label;
      if (feedback_f || qwizdata[i_qwiz].n_questions == 1) {
         label = T ('Do this question again');
      } else {
         if (qwizdata[i_qwiz].use_dataset && qwizdata[i_qwiz].dataset_intro_f) {
            label = T ('Practice more questions');
         } else {
            label = T ('Take this quiz again');
         }
      }
      var attr = qqc.replace_smart_quotes (restart[0]);
      var custom_label = get_attr (attr, 'label');
      if (custom_label) {
         label = custom_label;
      }
      var restart_redo = feedback_f ? 'redo_question' : 'restart_quiz' ;
      var restart_button_html =
                       '<button class="qwiz_button qwiz_restart" onclick="' + qname + '.' + restart_redo + ' (' + i_qwiz + ')">'
                     +    label
                     + '</button>';
      htm = htm.replace (restart, restart_button_html);
   }
   return htm;
}
function create_bg_img_style (i_qwiz, i_question) {
   var style = '';
   var bg_img = qwizdata[i_qwiz].bg_img[i_question];
   if (bg_img) {
      var top    = bg_img.top    ? bg_img.top    + 'px' : '0';
      var left   = bg_img.left   ? bg_img.left   + 'px' : '0';
      var width  = bg_img.width  ? bg_img.width  + 'px' : 'auto';
      var height = bg_img.height ? bg_img.height + 'px' : 'auto';
      var style = ' style="background: no-repeat ' + left + ' ' + top
                                       + ' / ' + width + ' ' + height
                                       + ' url(' + bg_img.src + ')"';
      if (debug[0]) {
         console.log ('[create_bg_img_style] style:', style);
      }
   }
   return style;
}
function process_question_attributes (i_qwiz, i_question, question_shortcode, i_qwizard_question) {
   if (set_qwizard_data_b) {
      if (typeof (i_qwizard_question) == 'undefined') {
         i_qwizard_question = i_question;
      }
      qw.questions_cards[i_qwizard_question] = {};
   }
   qwizdata[i_qwiz].dataset_id[i_question] = i_question;
   qwizdata[i_qwiz].unit[i_question] = qwizdata[i_qwiz].default_unit;
   var m = question_shortcode.match (/\[(<code><\/code>)*q\s*([^\]]*)\]/m);
   var attributes = m[2];
   if (attributes) {
      attributes = qqc.replace_smart_quotes (attributes);
      if (set_qwizard_data_b) {
         qw.questions_cards[i_qwizard_question].question_attributes = attributes;
      }
      if (q.qwizard_b) {
         qwizdata[i_qwiz].qwizard_multiple_choice_b[i_question] = get_attr (attributes, 'multiple_choice') == 'true';
      }
      var question_topics = get_attr (attributes, 'topic', true);
      if (! question_topics) {
         question_topics = get_attr (attributes, 'unit', true);
      }
      if (question_topics) {
         if (debug[4]) {
            console.log ('[process_question_attributes] question_topics: ', question_topics);
         }
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].topic = question_topics;
         }
         question_topics = question_topics.split (/; */);
         for (var i=0; i<question_topics.length; i++) {
            question_topics[i] = question_topics[i].replace (/\s/g, '_');
            var topic = question_topics[i];
            if (qwizdata[i_qwiz].topics.indexOf (topic) == -1) {
               qwizdata[i_qwiz].topics.push (topic);
            }
         }
         qwizdata[i_qwiz].question_topics[i_question] = question_topics;
      }
      if (qwizdata[i_qwiz].use_dataset || qwizdata[i_qwiz].dataset
                     || qwizdata[i_qwiz].use_dataset_question_ids[i_question]) {
         const dataset_id = get_attr (attributes, 'dataset_id');
         if (dataset_id) {
            qwizdata[i_qwiz].dataset_id[i_question] = dataset_id;
         }
      }
      var unit = get_attr (attributes, 'unit');
      if (unit) {
         qwizdata[i_qwiz].unit[i_question] = unit;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].unit = unit;
         }
         if (qwizdata[i_qwiz].units.indexOf (unit) == -1) {
            qwizdata[i_qwiz].units.push (unit);
         }
      }
      var use_dataset_question_id = get_attr (attributes, 'use_dataset_question');
      if (use_dataset_question_id) {
         qwizdata[i_qwiz].use_dataset_question_ids[i_question] = use_dataset_question_id;
         qwizdata[i_qwiz].dataset_id[i_question]               = use_dataset_question_id;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].from_dataset_b = true;
         }
      }
      var bg_img_src = get_attr (attributes, 'bg_img_src');
      if (bg_img_src) {
         var bg_img = {};
         bg_img.src    = bg_img_src;
         bg_img.left   = get_attr (attributes, 'bg_img_left');
         bg_img.top    = get_attr (attributes, 'bg_img_top');
         bg_img.width  = get_attr (attributes, 'bg_img_width');
         bg_img.height = get_attr (attributes, 'bg_img_height');
         qwizdata[i_qwiz].bg_img[i_question] = bg_img;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].bg_img = bg_img;
         }
      }
      const hotspot_user_interaction = get_attr (attributes, 'hotspot_user_interaction');
      if (hotspot_user_interaction) {
         qwizdata[i_qwiz].hotspot_user_interaction[i_question] = hotspot_user_interaction;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].hotspot_user_interaction = hotspot_user_interaction;
         }
      }
      const hotspot_labels_stick = get_attr (attributes, 'hotspot_labels_stick');
      if (hotspot_labels_stick) {
         qwizdata[i_qwiz].hotspot_labels_stick[i_question] = hotspot_labels_stick;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].hotspot_labels_stick = hotspot_labels_stick;
         }
      }
      const show_hotspots = get_attr (attributes, 'show_hotspots');
      if (show_hotspots) {
         qwizdata[i_qwiz].show_hotspots[i_question] = show_hotspots;
         if (set_qwizard_data_b) {
            qw.questions_cards[i_qwizard_question].show_hotspots = show_hotspots;
         }
      }
      const find_the_dot_width = get_attr (attributes, 'find_the_dot_width');
      if (find_the_dot_width) {
         qwizdata[i_qwiz].find_the_dot[i_question] = {};
         qwizdata[i_qwiz].find_the_dot[i_question].width = find_the_dot_width;
         qwizdata[i_qwiz].find_the_dot[i_question].height               = get_attr (attributes, 'find_the_dot_height');
         qwizdata[i_qwiz].find_the_dot[i_question].dot_color            = get_attr (attributes, 'find_the_dot_dot_color');
         qwizdata[i_qwiz].find_the_dot[i_question].background_color     = get_attr (attributes, 'find_the_dot_background_color');
         qwizdata[i_qwiz].find_the_dot[i_question].controls             = get_attr (attributes, 'find_the_dot_controls') != 'false';
         qwizdata[i_qwiz].find_the_dot[i_question].new_dot_button_style = get_attr (attributes, 'find_the_dot_new_dot_button_style');
      }
   }
   return question_topics;
}
function check_questions_have_topics (i_qwiz) {
   var add_other_b = false;
   for (var i_question=0; i_question<qwizdata[i_qwiz].n_questions; i_question++) {
      if (! qwizdata[i_qwiz].information_question_b[i_question]) {
         if (! qwizdata[i_qwiz].question_topics[i_question]) {
            qwizdata[i_qwiz].question_topics[i_question] = ['Other'];
            add_other_b = true;
         }
      }
   }
   if (add_other_b) {
      if (qwizdata[i_qwiz].topics.indexOf ('Other') == -1) {
         qwizdata[i_qwiz].topics.push ('Other');
      }
   }
   if (debug[4]) {
      console.log ('[check_questions_have_topics] qwizdata[i_qwiz].question_topics:', qwizdata[i_qwiz].question_topics);
   }
   qwizdata[i_qwiz].topic_statistics = {};
   var n_topics = qwizdata[i_qwiz].topics.length;
   for (var i_topic=0; i_topic<n_topics; i_topic++) {
      var topic = qwizdata[i_qwiz].topics[i_topic];
      qwizdata[i_qwiz].topic_statistics[topic] = {};
      qwizdata[i_qwiz].topic_statistics[topic].n_correct = 0;
      qwizdata[i_qwiz].topic_statistics[topic].n_incorrect = 0;
   }
}
this.restart_quiz = function (i_qwiz) {
   var $summary = $ ('#summary-qwiz' + i_qwiz);
   $summary.hide ();
   $summary.find ('button.summary_exit_mobile_qwiz').hide ();
   $ ('#qwiz' + i_qwiz + ' div.show_answer_got_it_or_not').hide ();
   if (qwizdata[i_qwiz].n_questions == 1) {
      $( '#qwiz' + i_qwiz + ' div.single-question_exit').hide ();
   }
   q.reset_counters (i_qwiz);
   qwizdata[i_qwiz].hotspot_user_interaction = {};
   if (qwizdata[i_qwiz].use_dataset) {
      qwizdata[i_qwiz].information_question_b = {};
      qwizdata[i_qwiz].hangman = {};
      qwizdata[i_qwiz].textentry = '';
   }
   q.display_progress (i_qwiz);
   for (var qwizzled_div_id in qwizdata[i_qwiz].$qwizzled) {
      $ ('div#' + qwizzled_div_id).replaceWith (qwizdata[i_qwiz].$qwizzled[qwizzled_div_id]);
      qwizdata[i_qwiz].$qwizzled[qwizzled_div_id] = $ ('div#' + qwizzled_div_id).clone (true);
   }
   if (qwizdata[i_qwiz].qwizzled_b) {
      qwizdata[i_qwiz].correct_on_try1 = [];
   }
   $ ('#qwiz' + i_qwiz).find ('div.qwizq').hide ();
   if (! qwizdata[i_qwiz].hide_forward_back_b) {
      $ ('.bbfe-qwiz' + i_qwiz).css ({visibility: 'visible', opacity: 0.2}).removeClass ('hover');
      $ ('span.question-number-qwiz' + i_qwiz).css ({visibility: 'visible'}).html (1);
   }
   $ ('span.response_recorded_wrapper-qwiz' + i_qwiz).css ({display: 'none'});
   if (qwizdata[i_qwiz].qwiz_timer) {
      qwizdata[i_qwiz].$qwiz_timer.html ('0:00');
   }
   if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
      qwizdata[i_qwiz].record_start_b = false;
      var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
   }
   q.init_question_order (i_qwiz);
   q.next_question (i_qwiz, true);
}
this.reset_counters = function (i_qwiz) {
   const n_questions = qwizdata[i_qwiz].n_questions;
   for (var i_question=0; i_question<n_questions; i_question++) {
      qwizdata[i_qwiz].answered_correctly[i_question] = 0;
      qwizdata[i_qwiz].i_questions_done               = [];
      qwizdata[i_qwiz].questions[i_question] = {};
   }
   qwizdata[i_qwiz].n_correct                = 0;
   qwizdata[i_qwiz].n_incorrect              = 0;
   qwizdata[i_qwiz].hotspot_user_interaction = {};
   var n_topics = qwizdata[i_qwiz].topics.length;
   for (var i_topic=0; i_topic<n_topics; i_topic++) {
      var topic = qwizdata[i_qwiz].topics[i_topic];
      qwizdata[i_qwiz].topic_statistics[topic].n_correct = 0;
      qwizdata[i_qwiz].topic_statistics[topic].n_incorrect = 0;
   }
   qwizdata[i_qwiz].i_question           = -1;
   qwizdata[i_qwiz].i_user_question      = -1;
   qwizdata[i_qwiz].ii_question          = 0;
   qwizdata[i_qwiz].user_question_number = 0;
}
function start_timers (i_qwiz, question_time_limit_sec) {
   if (debug[0]) {
      console.log ('[start_timers] i_qwiz:', i_qwiz, ', question_time_limit_sec:', question_time_limit_sec);
   }
   if (q.preview) {
      return;
   }
   if (qwizdata[i_qwiz].question_time_limit) {
      if (! qwizdata[i_qwiz].question_timer_interval_id) {
         if (question_time_limit_sec) {
            const $question_timer = $ ('#qwiz' + i_qwiz + '-question_timer');
            qwizdata[i_qwiz].$question_timer = $question_timer;
            const hhmmss = qqc.hhmmss_from_sec (question_time_limit_sec);
            $question_timer.html (hhmmss).show ();
            if (! q.qwizard_b) {
               qwizdata[i_qwiz].question_timer_interval_id
                  = setInterval (update_timer, 1000, i_qwiz, true);
               qwizdata[i_qwiz].times_up_msec
                  = new Date ().getTime () + question_time_limit_sec*1000 + 500;
            }
         }
      }
   }
   if (qwizdata[i_qwiz].qwiz_timer) {
      if (! qwizdata[i_qwiz].qwiz_timer_interval_id) {
         const $qwiz_timer = $ ('#qwiz' + i_qwiz + '-qwiz_timer');
         qwizdata[i_qwiz].$qwiz_timer = $qwiz_timer;
         if (! q.qwizard_b) {
            qwizdata[i_qwiz].qwiz_timer_interval_id
                                     = setInterval (update_timer, 1000, i_qwiz);
            qwizdata[i_qwiz].timer_start_msec
                                     = new Date ().getTime ();
         }
      }
   }
}
function stop_timer (i_qwiz, no_record_f=false, question_time_limit) {
   if (question_time_limit) {
      if (qwizdata[i_qwiz].question_timer_interval_id) {
         clearInterval (qwizdata[i_qwiz].question_timer_interval_id);
         qwizdata[i_qwiz].question_timer_interval_id = '';
      }
   } else {
      if (qwizdata[i_qwiz].qwiz_timer_interval_id) {
         clearInterval (qwizdata[i_qwiz].qwiz_timer_interval_id);
         qwizdata[i_qwiz].qwiz_timer_interval_id = '';
         if (! no_record_f && qwizdata[i_qwiz].qrecord_id
                                               && document_qwiz_user_logged_in_b) {
            const sec = parseInt ((new Date ().getTime () - qwizdata[i_qwiz].timer_start_msec)/1000.0);
            qwizdata[i_qwiz].when_done_unix = 0;
            var data = {elapsed_time: sec, callback: 'record_quiz_time_callback'};
            qqc.jjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'record_quiz_time', data);
         }
         if (qwizdata[i_qwiz].qrecord_id.indexOf ('finish_times_demo') != -1) {
            qwizdata[i_qwiz].elapsed_time = parseInt ((new Date ().getTime () - qwizdata[i_qwiz].timer_start_msec)/1000.0);
         }
      }
   }
}
this.record_quiz_time_callback = function (data) {
   if (data.errmsg) {
      alert (data.errmsg);
      qwizdata[i_qwiz].when_done_unix = 0;
   } else {
      const i_qwiz = data.i_qwiz;
      qwizdata[i_qwiz].quiz_elapsed_time_id = data.quiz_elapsed_time_id;
      qwizdata[i_qwiz].when_done_unix       = data.when_done_unix;
   }
}
function update_timer (i_qwiz, time_limit_f) {
   var sec;
   if (time_limit_f) {
      sec = parseInt ((qwizdata[i_qwiz].times_up_msec - new Date ().getTime ())/1000.0);
      if (sec <= 0) {
         times_up (i_qwiz);
         sec = 0;
      }
      const hhmmss = qqc.hhmmss_from_sec (sec);
      qwizdata[i_qwiz].$question_timer.html (hhmmss);
   } else {
      sec = parseInt ((new Date ().getTime () - qwizdata[i_qwiz].timer_start_msec)/1000.0);
      const hhmmss = qqc.hhmmss_from_sec (sec);
      qwizdata[i_qwiz].$qwiz_timer.html (hhmmss);
   }
}
function times_up (i_qwiz) {
   stop_timer (i_qwiz, true, true);
   qwizdata[i_qwiz].$question_timer.html ('0:00');
   $ ('div#overlay-times-up-qwiz' + i_qwiz).show ();
   qwizdata[i_qwiz].n_incorrect++;
   update_progress_show_next (i_qwiz);
}
function check_timers () {
   for (var i_qwiz=0; i_qwiz<n_qwizzes; i_qwiz++) {
      if (qwizdata[i_qwiz].question_timer_interval_id
                                   || qwizdata[i_qwiz].qwiz_timer_interval_id) {
         stop_timer (i_qwiz, true, true);
         stop_timer (i_qwiz, true);
         restart_timers_i_qwiz = i_qwiz;
         break;
      }
   }
}
this.redo_question = function (i_qwiz) {
   if (qwizdata[i_qwiz].n_questions == 1) {
      $( '#qwiz' + i_qwiz + ' div.single-question_exit').hide ();
   }
   qwizdata[i_qwiz].i_question = qwizdata[i_qwiz].i_question - 1;
   qwizdata[i_qwiz].answered_correctly[0] = 0;
   qwizdata[i_qwiz].n_correct = 0;
   q.next_question (i_qwiz, true);
}
this.next_question = function (i_qwiz, no_login_b, simple_go_f) {
   if (debug[0]) {
      console.log ('[next_question] qwizdata[i_qwiz].i_question:', qwizdata[i_qwiz].i_question);
   }
   if (qwizdata[i_qwiz].bck_f) {
      q.fwd_question (i_qwiz, false);
      return;
   }
   const $overlay_times_up = $ ('div#overlay-times-up-qwiz' + i_qwiz);
   if ($overlay_times_up.is (':visible')) {
      $overlay_times_up.hide ();
   }
   var i_question = qwizdata[i_qwiz].i_question;
   if (i_question == -1) {
      if (! qwizdata[i_qwiz].use_dataset || ! qwizdata[i_qwiz].dataset_intro_f) {
         $ ('.bbfe-qwiz' + i_qwiz).css ({visibility: 'visible', opacity: 0.2}).removeClass ('hover');
      }
   }
   const n_questions = qwizdata[i_qwiz].n_questions;
   if (debug[0]) {
      console.log ('[next_question] i_question: ', i_question, ', n_questions: ', n_questions);
   }
   var qwiz_id = 'qwiz' + i_qwiz;
   var $qwiz = $ ('#' + qwiz_id);
   if (document_qwiz_mobile) {
      $qwiz.css ('width', '');
   } else {
      if (qwizdata[i_qwiz].width_reset) {
         if ($ ('#xqwiz' + i_qwiz).length) {
            $qwiz.css ({width: qwizdata[i_qwiz].initial_width + 'px', 'max-width': '', 'margin-bottom': ''});
         } else {
            $qwiz.css ({width: '', 'max-width': ''});
         }
         $qwiz.css ({transform: ''});
         $qwiz[0].qscale_fac  = '';
         $qwiz[0].qstart_left = '';
         $qwiz[0].qstart_top  = '';
         qwizdata[i_qwiz].width_reset = false;
      }
   }
   var start_quiz_b = false;
   simple_go_f = !! simple_go_f;
   if (i_question == -1 && ! simple_go_f) {
      if (   qwizdata[i_qwiz].use_dataset
          || qwizdata[i_qwiz].use_dataset_questions_htm
          || n_questions > 1 || q.qwizard_b) {
         var i_user_question = -1;
         if (! q.no_intro_b[i_qwiz] || qwizdata[i_qwiz].use_dataset_questions_htm) {
            start_quiz_b = true;
            if (! no_login_b && ! q.qwizard_b) {
               if (qwizdata[i_qwiz].qrecord_id) {
                  const user_logged_in_b
                     =    typeof (document_qwiz_user_logged_in_b) != 'undefined'
                       && document_qwiz_user_logged_in_b
                       && typeof (document_qwiz_username) != 'undefined';
                  if (   user_logged_in_b
                      || (   typeof (document_qwiz_declined_login_b) != 'undefined'
                          && document_qwiz_declined_login_b)) {
                     if (user_logged_in_b & ! document_qwiz_wp_user_session_id) {
                        var check_team_b = true;
                        if (! $.cookie ('qwiz_current_login_lt_nmin_ago')) {
                           check_team_b = false;
                           var a_team = '';
                           if (document_qwiz_team_b) {
                              a_team = ' ' + T ('a team') + ':';
                           }
                           if (confirm (T ('You are logged in as') + a_team + ' ' + document_qwiz_username + '.\n' + T ('Do you want to continue?  (Click "Cancel" to sign out)'))) {
                              var login_timeout_min = qqc.get_qwiz_param ('login_timeout_min', 40);
                              var options = {path:    '/',
                                             expires: login_timeout_min/(24.0*60.0)};
                              $.cookie ('qwiz_current_login_lt_nmin_ago', 1, options);
                           } else {
                              qqc.sign_out ();
                              document_qwiz_user_logged_in_b = false;
                           }
                        }
                        if (check_team_b && document_qwiz_team_b) {
                           if (! confirm (T ('You are logged in as team') + ': ' + document_qwiz_username + '.\n' + T ('Do you want to continue as this team?'))) {
                              document_qwiz_session_id = document_qwiz_session_id.split (';')[0];
                              document_qwiz_username   = document_qwiz_username.split ('; ')[0];
                              document_qwiz_team_b     = false;
                              qqc.set_user_menus_and_icons ();
                              var msg = T ('OK.  Only %s is logged in now');
                              msg = msg.replace ('%s', document_qwiz_username);
                              alert (msg);
                           }
                        }
                        qwizdata[i_qwiz].record_start_b = false;
                        if (document_qwiz_user_logged_in_b) {
                           var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
                           record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
                        }
                     }
                  } else {
                     q.display_login (i_qwiz);
                     return false;
                  }
               }
            }
            if (qwizdata[i_qwiz].use_dataset || qwizdata[i_qwiz].use_dataset_questions_htm) {
               var dataset_intro_f = qwizdata[i_qwiz].dataset_intro_f;
               if (dataset_intro_f && dataset_intro_f != 'topics_only') {
                  q.display_login (i_qwiz, false, 'use_dataset_options');
               } else {
                  $ ('.intro-qwiz' + i_qwiz).hide ();
                  qqc.get_dataset_questions (qwizdata[i_qwiz].use_dataset, qname,
                                             i_qwiz, qwizdata[i_qwiz].qrecord_id,
                                             [], [], 10000,
                                             qwizdata[i_qwiz].dataset_questions_to_do,
                                             false,     // random_b
                                             qwizdata[i_qwiz].use_dataset_questions_htm);
                  i_user_question = 0;
               }
            }
         } else {
            if (q.no_intro_b[i_qwiz]) {
               if (qwizdata[i_qwiz].qwiz_timer) {
                  start_timers (i_qwiz);
               }
            }
         }
         if (! qwizdata[i_qwiz].use_dataset && ! qwizdata[i_qwiz].use_dataset_questions_htm) {
            q.next_question_from_intro (i_qwiz, i_user_question);
         }
      } else {
         $ ('#mode-' + qwiz_id).css ('visibility', 'hidden');
         /* DKTMP
         if (q.qwizard_b && ! q.no_intro_b[i_qwiz]) {
            $ ('#intro-' + qwiz_id).hide ();
         }
         */
      }
   } else {
      var qwizq_id = qwiz_id + '-q' + i_question;
      $ ('#' + qwizq_id).hide ();
      if (document_qwiz_mobile) {
         $ ('#mobile_' + qwizq_id).hide ();
      }
      if (qwizdata[i_qwiz].pay_quiz_deck_id
            && (   qwizdata[i_qwiz].pay_quiz_ok == 'preview_questions'
                || qwizdata[i_qwiz].pay_quiz_ok == 'preview_period_expired'
                || qwizdata[i_qwiz].pay_quiz_ok == 'no_free_trial')) {
         if (qqc.preview_limit ('qwiz', qwizdata, i_qwiz)) {
            return;
         }
      }
   }
   if (n_questions == 0) {
      if (debug[0]) {
         console.log ('[next_question] n_questions:', n_questions);
      }
      return;
   }
   if (! next_button_active_b) {
      $ ('#next_button-' + qwiz_id).hide ();
      qwizdata[i_qwiz].next_button_show_b = false;
   }
   if (i_question != -1 || simple_go_f) {
      const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
      const hotspot_info_only = hotspot_user_interaction && hotspot_user_interaction == 'info_only';
      if (qwizdata[i_qwiz].information_question_b[i_question]
                                                         || hotspot_info_only) {
         $ ('#next_button_text-qwiz' + i_qwiz).html (T ('Next question'));
         if (! q.qwizard_b) {
            qwizdata[i_qwiz].answered_correctly[i_question] = 1;
            qwizdata[i_qwiz].n_correct++;
            if (qwizdata[i_qwiz].n_qs_done) {
               qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
            }
            q.display_progress (i_qwiz);
            if (    qwizdata[i_qwiz].user_question_number == 1
                && (   q.no_intro_b[i_qwiz]
                    || qwizdata[i_qwiz].n_questions == 1)) {
               $ ('div#icon_qwiz' + i_qwiz).hide ();
               alert_not_logged_in (i_qwiz);
               if (qwizdata[i_qwiz].qwiz_timer) {
                  start_timers (i_qwiz);
               }
            }
            const type = hotspot_info_only ? 'hotspot_diagram' : 'information_only';
            if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
               var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                           q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                           i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                           unit:          qwizdata[i_qwiz].unit[i_question],
                           type:          'information_only',
                           response:      'continue',
                           correct_b:     1,
                           confirm:       'js'};
               record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
            }
         }
      }
   }
   if (next_button_active_b) {
      if (qwizdata[i_qwiz].user_question_number == n_questions) {
         q.display_summary_and_exit (i_qwiz);
         return;
      }
   }
   if (! (qwizdata[i_qwiz].use_dataset && i_question == -1)
                                            || (simple_go_f && ! q.qwizard_b)) {
      var n_done = qwizdata[i_qwiz].n_correct;
      if (! qwizdata[i_qwiz].repeat_incorrect_b) {
         n_done += qwizdata[i_qwiz].n_incorrect;
      }
      var n_questions_for_done = qwizdata[i_qwiz].n_questions_for_done;
      if (debug[0]) {
         console.log ('[next_question] n_done:', n_done, ', n_questions:', n_questions, ', n_questions_for_done:', n_questions_for_done);
      }
      if (n_done >= n_questions_for_done) {
         if (qwizdata[i_qwiz].i_user_question == -1) {
            qwizdata[i_qwiz].i_question      = 0;
            qwizdata[i_qwiz].i_user_question = 0;
         }
         var i_user_question = qwizdata[i_qwiz].i_user_question;
         qwizdata[i_qwiz].questions[n_questions] = {i_user_prev_question: i_user_question, user_question_number: '--'};
         qwizdata[i_qwiz].questions[i_user_question].i_user_next_question = n_questions;
         qwizdata[i_qwiz].i_user_question  = n_questions;
         qwizdata[i_qwiz].saved_i_question = n_questions;
         $ ('span.question-number-qwiz' + i_qwiz).html ('--');
         if (qwizdata[i_qwiz].qwiz_timer) {
            if (qwizdata[i_qwiz].n_qs) {
               if (qwizdata[i_qwiz].n_qs_done.size == qwizdata[i_qwiz].n_qs) {
                  stop_timer (i_qwiz);
                  qwizdata[i_qwiz].n_qs_done = new Set ();
               }
            } else {
               stop_timer (i_qwiz);
            }
         }
         stop_timer (i_qwiz, true, true);
         if (qwizdata[i_qwiz].$question_timer) {
            qwizdata[i_qwiz].$question_timer.hide ();
         }
         q.display_summary_and_exit (i_qwiz);
      } else {
         if (q.qwizard_b) {
            qwizdata[i_qwiz].i_question++;
            i_question = qwizdata[i_qwiz].i_question;
         } else {
            var ii_question;
            const reshow_after = qwizdata[i_qwiz].reshow_after;
            while (true) {
               ii_question = qwizdata[i_qwiz].ii_question;
               if (ii_question >= qwizdata[i_qwiz].n_questions_for_done) {
                  ii_question = 0;
                  qwizdata[i_qwiz].ii_question = 0;
               }
               i_question = qwizdata[i_qwiz].question_order[ii_question];
               if (qwizdata[i_qwiz].repeat_incorrect_b) {
                  if (qwizdata[i_qwiz].answered_correctly[i_question] != 1) {
                     var reshowing = false;
                     if (reshow_after) {
                        const i_questions_done = qwizdata[i_qwiz].i_questions_done;
                        const i_back           = i_questions_done.length - reshow_after;
                        if (i_back >= 0) {
                           const i_question_back = i_questions_done[i_back];
                           if (qwizdata[i_qwiz].answered_correctly[i_question_back] != 1) {
                              reshowing = true;
                              i_question = i_question_back;
                           }
                        }
                     }
                     qwizdata[i_qwiz].i_questions_done.push (i_question);
                     if (! reshowing) {
                        qwizdata[i_qwiz].ii_question++;
                     }
                     break;
                  }
               } else {
                  if (typeof qwizdata[i_qwiz].answered_correctly[i_question]
                                                                  == 'undefined'
                         || qwizdata[i_qwiz].answered_correctly[i_question] == 0) {
                     qwizdata[i_qwiz].ii_question++;
                     break;
                  }
               }
               qwizdata[i_qwiz].ii_question++;
            }
         }
         var i_prev_question = qwizdata[i_qwiz].i_user_question;
         qwizdata[i_qwiz].i_question = i_question;
         if (typeof (qwizdata[i_qwiz].questions[i_question]) == 'undefined') {
            qwizdata[i_qwiz].questions[i_question] = {};
         }
         var question = qwizdata[i_qwiz].questions[i_question];
         if (i_prev_question != question.i_user_prev_question) {
            question.i_user_prev_question = i_prev_question;
         }
         if (i_prev_question == -1) {
            qwizdata[i_qwiz].i_first_user_question = i_question;
            if (debug[0]) {
               console.log ('[next_question] i_first_user_question:', i_question);
            }
         } else {
            var prev_question = qwizdata[i_qwiz].questions[i_prev_question];
            if (prev_question) {
               prev_question.i_user_next_question = i_question;
            } else {
               console.log ('[next_question] prev_question for i_prev_question', i_prev_question, 'does not exist');
            }
            if (! q.qwizard_b) {
               $ ('.bck-question-qwiz' + i_qwiz).css ({opacity: 0.5}).addClass ('hover');
            }
         }
         qwizdata[i_qwiz].i_user_question = i_question;
         if (typeof question.user_question_number == 'undefined') {
            qwizdata[i_qwiz].user_question_number++;
            question.user_question_number = qwizdata[i_qwiz].user_question_number;
         }
         if (! q.qwizard_b) {
            $ ('span.question-number-qwiz' + i_qwiz).html (question.user_question_number);
         }
         q.display_question (i_qwiz, i_question, start_quiz_b);
         if (q.qwizard_b && n_questions) {
            qwizard.set_qwizard_data ('i_question', i_question);
            qwizard.go_to_question2 ();
            if (qw.questions_cards[i_question].type != 'hotspot_diagram') {
               q.display_progress (i_qwiz);
            }
         }
      }
   }
};
this.next_question_from_intro = function (i_qwiz, i_user_question) {
   if (! qwizdata[i_qwiz].n_questions) {
      return;
   }
   $ ('.intro-qwiz' + i_qwiz).hide ();
   if (! q.no_intro_b[i_qwiz]) {
      $ ('#icon_qwiz' + i_qwiz).hide ();
      if (qwizdata[i_qwiz].qwiz_timer) {
         if (qwizdata[i_qwiz].n_qs) {
            if (! qwizdata[i_qwiz].n_qs_done) {
               qwizdata[i_qwiz].n_qs_done = new Set ();
            }
         }
         start_timers (i_qwiz);
      }
   }
   $ ('.bbfe-qwiz' + i_qwiz).css ({visibility: 'visible', opacity: 0.2}).removeClass ('hover');
   $ ('span.question-number-qwiz' + i_qwiz).html (1);
   $ ('#next_button-qwiz' + i_qwiz).css ('text-align', 'left');
   if (! (qwizdata[i_qwiz].use_dataset || qwizdata[i_qwiz].use_dataset_questions_htm)) {
      q.display_progress (i_qwiz, true);
   }
   $ ('#next_button_text-qwiz' + i_qwiz).html (T ('Next question'));
}
this.bck_question = function (i_qwiz, go_to_beg_f) {
   if (! $ ('.bck-question-qwiz' + i_qwiz).hasClass ('hover')) {
      return;
   }
   qwizdata[i_qwiz].bck_f = true;
   var i_user_question = qwizdata[i_qwiz].i_user_question;
   var i_current_user_question = i_user_question;
   if (go_to_beg_f) {
      if (qwizdata[i_qwiz].use_dataset && qwizdata[i_qwiz].dataset_intro_f) {
         qwizdata[i_qwiz].saved_i_question = qwizdata[i_qwiz].i_question;
         $ ('.bck-question-qwiz' + i_qwiz).css ({opacity: 0.2}).removeClass ('hover');
         $ ('.fwd-question-qwiz' + i_qwiz).css ({opacity: 0.5}).addClass ('hover');
         $ ('span.question-number-qwiz' + i_qwiz).html ('--');
         hide_current_question (i_qwiz, i_current_user_question);
         if (i_user_question == qwizdata[i_qwiz].n_questions) {
            $ ('div#summary-qwiz' + i_qwiz).hide ();
         }
         qwizdata[i_qwiz].i_question = -1;
         q.display_login (i_qwiz, false, 'use_dataset_options');
         return;
      } else {
         i_user_question = qwizdata[i_qwiz].i_first_user_question;
      }
   } else {
      i_user_question = qwizdata[i_qwiz].questions[i_user_question].i_user_prev_question;
      if (i_user_question == -1) {
         return;
      }
   }
   hide_current_question (i_qwiz, i_current_user_question);
   $ ('div#summary-qwiz' + i_qwiz).hide ();
   qwizdata[i_qwiz].i_user_question = i_user_question;
   var question = qwizdata[i_qwiz].questions[i_user_question];
   if (go_to_beg_f || question.i_user_prev_question == -1) {
      var $bck = $ ('.bck-question-qwiz' + i_qwiz);
      if (qwizdata[i_qwiz].use_dataset && qwizdata[i_qwiz].dataset_intro_f) {
         $bck = $bck.last ();
      }
      $bck.css ({opacity: 0.2}).removeClass ('hover');
   }
   var user_question_number = question.user_question_number;
   $ ('span.question-number-qwiz' + i_qwiz).html (user_question_number);
   $ ('.fwd-question-qwiz' + i_qwiz).css ({opacity: 0.5}).addClass ('hover');
   qwizq_id = 'qwiz' + i_qwiz + '-q' + i_user_question;
   $ ('#' + qwizq_id).show ();
   $ ('#next_button-qwiz' + i_qwiz).hide ();
   if (document_qwiz_mobile) {
      $ ('#mobile_' + qwizq_id).show ();
   }
}
this.fwd_question = function (i_qwiz, go_to_end_f) {
   if (! $ ('.fwd-question-qwiz' + i_qwiz).hasClass ('hover')) {
      return;
   }
   if (qwizdata[i_qwiz].i_question == -1) {
      $ ('#qwiz_login-qwiz' + i_qwiz).hide ();
   } else {
      var i_user_question = qwizdata[i_qwiz].i_user_question;
      var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_user_question;
      $ ('#' + qwizq_id).hide ();
      if (document_qwiz_mobile) {
         $ ('#mobile_' + qwizq_id).hide ();
      }
   }
   if (go_to_end_f) {
      if (qwizdata[i_qwiz].i_question == -1) {
         qwizdata[i_qwiz].i_question = qwizdata[i_qwiz].saved_i_question;
      }
      i_user_question = qwizdata[i_qwiz].i_question;
   } else {
      if (qwizdata[i_qwiz].i_question == -1) {
         i_user_question = qwizdata[i_qwiz].i_first_user_question;
         qwizdata[i_qwiz].i_question = qwizdata[i_qwiz].saved_i_question;
      } else {
         i_user_question = qwizdata[i_qwiz].questions[i_user_question].i_user_next_question;
      }
   }
   qwizdata[i_qwiz].i_user_question = i_user_question;
   var question = qwizdata[i_qwiz].questions[i_user_question];
   if (i_user_question == qwizdata[i_qwiz].i_question) {
      qwizdata[i_qwiz].bck_f = false;
      $ ('.fwd-question-qwiz' + i_qwiz).css ({opacity: 0.2}).removeClass ('hover');
      if (qwizdata[i_qwiz].next_button_show_b) {
         $ ('#next_button-qwiz' + i_qwiz).show ();
      }
   }
   var user_question_number = question.user_question_number;
   $ ('span.question-number-qwiz' + i_qwiz).html (user_question_number);
   if (i_user_question == qwizdata[i_qwiz].n_questions) {
      $ ('div#summary-qwiz' + i_qwiz).show ();
   } else {
      qwizq_id = 'qwiz' + i_qwiz + '-q' + i_user_question;
      $ ('#' + qwizq_id).show ();
      if (document_qwiz_mobile) {
         $ ('#mobile_' + qwizq_id).show ();
      }
      if (! qwizdata[i_qwiz].summary_b) {
         if (user_question_number == qwizdata[i_qwiz].n_questions) {
            $ ('div#summary-qwiz' + i_qwiz).show ();
         }
      }
   }
   var $bck = $ ('.bck-question-qwiz' + i_qwiz);
   if (question.i_user_prev_question == -1) {
      $bck = $bck.first ();
   }
   $bck.css ({opacity: 0.5}).addClass ('hover');
}
this.init_question_order = function (i_qwiz) {
   var n_questions = qwizdata[i_qwiz].n_questions;
   qwizdata[i_qwiz].question_order = new Array (n_questions);
   for (var i=0; i<n_questions; i++) {
      qwizdata[i_qwiz].question_order[i] = i;
   }
   if (qwizdata[i_qwiz].random_b) {
      qwizdata[i_qwiz].question_order = qqc.shuffle (qwizdata[i_qwiz].question_order);
      if (debug[0]) {
         console.log ('[init_question_order] qwizdata[i_qwiz].question_order:', qwizdata[i_qwiz].question_order);
      }
   }
}
function hide_current_question (i_qwiz, i_question) {
   var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
   $ ('#' + qwizq_id).hide ();
   if (document_qwiz_mobile) {
      $ ('#mobile_' + qwizq_id).hide ();
   }
}
this.display_question = function (i_qwiz, i_question, start_quiz_b) {
   var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
   var $qwizq = $ ('div#' + qwizq_id);
   if (debug[0]) {
      console.log ('[display_question] start_quiz_b:', start_quiz_b);
      console.log ('[display_question] $qwizq:', $qwizq);
   }
   $qwizq.find ('[id^=' + qwizq_id + '-a]').hide ();
   var $mobile_qwizq = $ ('div#mobile_' + qwizq_id);
   $mobile_qwizq.find ('[id^=mobile_' + qwizq_id + '-a]').hide ();
   var $qwiz_img = $qwizq.find ('input[name="qwiz_img"]');
   if ($qwiz_img.length) {
      $qwiz_img.changeElements ('img');
      $mobile_qwizq.find ('input[name="qwiz_img"]').changeElements ('img');
   }
   if (qwizdata[i_qwiz].question_time_limit) {
      start_timers (i_qwiz, qwizdata[i_qwiz].question_time_limit);
   }
   var qwizzled_b = $qwizq.hasClass ('qwizzled');
   if (qwizzled_b) {
      if (! qwizdata[i_qwiz].$qwizzled) {
         qwizdata[i_qwiz].$qwizzled = {};
      }
      if (typeof (qwizdata[i_qwiz].$qwizzled[qwizq_id]) == 'undefined') {
         if (q.qwizard_b) {
            q.init_qwizzled2 ($qwizq, i_qwiz, i_question);
         } else {
            q.init_qwizzled ($qwizq, i_qwiz, i_question);
         }
      }
      qwizdata[i_qwiz].n_labels_correct = 0;
      qwizdata[i_qwiz].n_label_attempts = 0;
      if (qwizdata[i_qwiz].answered_correctly[i_question] == -1) {
         $qwizq.replaceWith (qwizdata[i_qwiz].$qwizzled[qwizq_id]);
         var $qwizq = $ ('div#' + qwizq_id);
         qwizdata[i_qwiz].$qwizzled[qwizq_id] = $ ('div#' + qwizq_id).clone (true);
         var delay_init_drag_and_drop = function () {
            if (debug[8]) {
               console.log ('[display_question > delay_init_drag_and_drop] i_qwiz:', i_qwiz, ', i_question:', i_question);
            }
            q.init_drag_and_drop ($qwizq[0]);
         };
         if (! q.qwizard_b) {
            setTimeout (delay_init_drag_and_drop, 100);
         }
         var delay_place_labels = function () {
            place_labels (i_qwiz, i_question, qwizq_id);
         };
         setTimeout (delay_place_labels, 200);
      }
      var n_label_targets = 0;
      var target_count = {};
      $qwizq.find ('span.qwizzled_target').not ('.decoy').each (function () {
         var classes = $ (this).attr ('class');
         var m = classes.match (/qtarget_sib-[0-9]*/);
         if (m) {
            var qwizzled_target_assoc_id = m[0];
            target_count[qwizzled_target_assoc_id] = 1;
         } else {
            m = classes.match (/qwizzled_target-[0-9]*/);
            if (m) {
               var qwizzled_target_assoc_id = m[0];
               target_count[qwizzled_target_assoc_id] = 1;
            } else {
               n_label_targets++;
            }
         }
      });
      n_label_targets += $qwizq.find ('div.qwizzled_target').not ('.decoy').length;
      qwizdata[i_qwiz].n_label_targets = n_label_targets + Object.keys (target_count).length;
      q.display_diagram_progress (i_qwiz);
   } else if ($qwizq.hasClass ('hotspot_diagram')) {
      const $hotspot_image_stack = $qwizq.find ('div.hotspot_image_stack')
      qwizdata[i_qwiz].$hotspot_image_stack[i_question] = $hotspot_image_stack;
      const $canvas   = $hotspot_image_stack.find ('canvas.layer0_edited');
      if (q.qwizard_b) {
         $hotspot_image_stack.find ('img.layer0_edited, img.qwiz_style_layer').addClass ('qwizard_display_block_important');
         $hotspot_image_stack.find ('div.qwiz_hotspot_label').removeClass ('qwizard_display_none_important');
         $ ('#icon_qwiz' + i_qwiz).hide ();
      } else {
         qwizdata[i_qwiz].n_labels_correct = 0;
         qwizdata[i_qwiz].n_label_attempts = 0;
         const show_hotspots = qwizdata[i_qwiz].show_hotspots[i_question];
         const find_the_dot  = qwizdata[i_qwiz].find_the_dot[i_question];
         if (find_the_dot) {
            const find_the_dot_htm = create_find_the_dot_html (i_qwiz, qwizdata[i_qwiz].find_the_dot[i_question]);
            $hotspot_image_stack.before (find_the_dot_htm);
            $hotspot_image_stack.find ('img.qwiz_layer0, img.qwiz_style_layer').hide ();
            $qwizq.find ('input.find_the_dot_dot_color')
               .simpleColor ({boxWidth:   '25px',
                              boxHeight:  '17px',
                              onSelect:   find_the_dot_color_selected});
            $qwizq.find ('input.find_the_dot_background_color')
               .simpleColor ({boxWidth:   '25px',
                              boxHeight:  '17px',
                              onSelect:   find_the_dot_color_selected});
            q.update_find_the_dot (i_qwiz, false, true);
            $hotspot_image_stack.find ('canvas.layer0_edited').css ({outline: '1px dotted gray'}).show ();
         } else {
            qwizdata[i_qwiz].spotmap_width[i_question]  = $canvas.data ('qwiz_spotmap_width');
            qwizdata[i_qwiz].spotmap_height[i_question] = $canvas.data ('qwiz_spotmap_height');
            const sparsemap                             = $canvas.data ('qwiz_sparsemap');
            qwizdata[i_qwiz].sparsemap[i_question]      = sparsemap;
            const spotmap_data = $canvas.data ('qwiz_spotmap');
            if (sparsemap) {
               qwizdata[i_qwiz].spotmap[i_question]     = JSON.parse (spotmap_data.replace (/(\d+):/g, '"$1":'));
            } else {
               qwizdata[i_qwiz].spotmap[i_question]     = new Uint8ClampedArray (base64js.toByteArray (spotmap_data));
            }
            qwizdata[i_qwiz].hotspot_image_width[i_question]  = $canvas.attr ('width');
            qwizdata[i_qwiz].hotspot_image_height[i_question] = $canvas.attr ('height');
            $hotspot_image_stack.find ('img.hotspot_only_image').hide ();
            if (show_hotspots && show_hotspots.indexOf ('always') != -1) {
               $hotspot_image_stack.find ('img.qwiz_style_layer').show ();
            }
         }
         const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
         if (! hotspot_user_interaction || hotspot_user_interaction == 'label_prompt') {
            var n_hotspots;
            if (qwizdata[i_qwiz].answered_correctly[i_question] == -1) {
               var n_hotspots_to_do = 0;
               n_hotspots  = qwizdata[i_qwiz].n_hotspots[i_question];
               for (var i=0; i<n_hotspots; i++) {
                  const mod_hotspot_no
                              = qwizdata[i_qwiz].hotspot_nos[i_question][i] % 1000;
                  if (qwizdata[i_qwiz].hotspot_nos[i_question][i] < 0) {
                     qwizdata[i_qwiz].hotspot_nos[i_question][i] = -mod_hotspot_no;
                     n_hotspots_to_do++;
                  }
               }
               qwizdata[i_qwiz].n_hotspots_to_do[i_question] = n_hotspots_to_do;
               if (debug[0]) {
                  console.log ('[display_question] n_hotspots_to_do:', n_hotspots_to_do);
               }
               qwizdata[i_qwiz].n_labels_correct = n_hotspots - n_hotspots_to_do;
               qwizdata[i_qwiz].n_label_attempts = 0;
            }
         }
         const hotspot_labels_stick = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
         if (qwizdata[i_qwiz].answered_correctly[i_question] != -1) {
            qwizdata[i_qwiz].hotspot_nos[i_question] = [];
            qwizdata[i_qwiz].hotspot_labels[i_question] = [];
            qwizdata[i_qwiz].hotspot_ver2_f[i_question] = $hotspot_image_stack.find ('.qwiz_hotspot1').hasClass ('qwiz_hotspot_ver2');
            $hotspot_image_stack
               .find ('div.qwiz_hotspot_label').not ('.qwiz_hotspot_deleted')
               .each (function () {
                         const $label = $ (this);
                         const classnames = $label.attr ('class');
                         const m = classnames.match (/ qwiz_hotspot(\d+)/);
                         const hotspot_no = m[1];
                         qwizdata[i_qwiz].hotspot_nos[i_question].push (parseInt (hotspot_no));
                         $label.find ('div.ui-resizable-handle').remove ();
                         var hotspot_label = $label.find ('div.qwiz_hotspot_label_editable').text ();
                         hotspot_label = qqc.remove_tags_eols (hotspot_label);
                         qwizdata[i_qwiz].hotspot_labels[i_question].push (hotspot_label);
                         /* DKTMP xxx
                         if (hotspot_labels_stick && hotspot_labels_stick == 'temporary') {
                            $label.off ('mouseenter');
                            $label.on  ('mouseenter', function () {
                                                         $label.hide ();
                                                      });
                         }
                         */
                         if (hotspot_labels_stick
                                  && (   hotspot_labels_stick == 'keep'
                                      || hotspot_labels_stick == 'temporary')) {
                            $label.off ('mouseenter mouseleave');
                            $label.on  ('mouseenter', function () {
                                                         $label.css ({opacity: 0.1});
                                                      })
                                  .on  ('mouseleave', function () {
                                                         $label.css ({opacity: 1.0});
                                                      });
                         }
                      });
            n_hotspots = qwizdata[i_qwiz].hotspot_nos[i_question].length;
            qwizdata[i_qwiz].n_hotspots[i_question] = n_hotspots;
            if (! n_hotspots) {
               errmsgs.push (T ('No hotspots set for hotspot_diagram'), + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (i_question + 1));
            }
            qwizdata[i_qwiz].n_hotspots_to_do[i_question] = n_hotspots;
            if (debug[0]) {
               console.log ('[display_question] n_hotspots:', n_hotspots);
            }
            if (show_hotspots && show_hotspots.indexOf ('hide') == -1
                                                            && ! find_the_dot) {
               init_hotspot_image_canvas (i_qwiz, i_question, $hotspot_image_stack);
            }
         }
         qwizdata[i_qwiz].n_label_targets = n_hotspots;
         qwizdata[i_qwiz].answered_correctly[i_question] = 1;
         $hotspot_image_stack.find ('div.qwiz_hotspot_label').hide ();
         if (! hotspot_user_interaction || hotspot_user_interaction == 'label_prompt') {
            $qwizq.find ('div.hotspot_click_feedback').html ('<b>Click on:</b>');  // DKTMP
            const current_query_hotspot_no = pick_random_hotspot (i_qwiz, i_question);
            qwizdata[i_qwiz].current_query_hotspot_no[i_question] = current_query_hotspot_no;
            set_hotspot_label_query (i_qwiz, i_question, $qwizq);
         }
         $hotspot_image_stack.off ('click.hotspot_diagram_click');
         if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
            if (qwizdata[i_qwiz].n_questions > 1 || qwizdata[i_qwiz].use_dataset) {
               $ ('#next_button_text-qwiz' + i_qwiz).html (T ('Continue'));
               q.position_show_next_button (i_qwiz);
               qwizdata[i_qwiz].next_button_show_b = true;
            }
            if (qwizdata[i_qwiz].user_question_number == 1) {
               alert_not_logged_in (i_qwiz);
            }
         } else {
            $hotspot_image_stack.on ('click.hotspot_diagram_click', qwiz_.hotspot_diagram_click);
         }
         if (   (show_hotspots        && show_hotspots.indexOf ('hover_show') != -1)
             || (hotspot_labels_stick && hotspot_labels_stick.indexOf ('hover_show') != -1)) {
            $hotspot_image_stack.off ('mousemove click.mobile_hover_eq');
            $hotspot_image_stack.on  ('mousemove click.mobile_hover_eq', show_hotspot_on_hover);
            if (show_hotspots && show_hotspots.indexOf ('keep') == -1) {
               $hotspot_image_stack.off ('mouseleave');
               $hotspot_image_stack.on  ('mouseleave', hide_hotspots);
            }
            qwizdata[i_qwiz].current_xy_hotspot_no = -1;
         }
         if (qwizdata[i_qwiz].icon_swhs && ! qwizdata[i_qwiz].hide_qwizcards_icon_b) {
            $hotspot_image_stack.append (create_icon_qwiz_div (i_qwiz));
         }
         var found_clicked_visited = S ('Correctly clicked');
         if (hotspot_user_interaction) {
            if (hotspot_user_interaction == 'find_hotspots') {
               found_clicked_visited = S ('Found');
            } else if (hotspot_user_interaction == 'info_only') {
               found_clicked_visited = S ('Visited');
            }
         }
         q.display_diagram_progress (i_qwiz, found_clicked_visited);
      }
   }
   if (start_quiz_b && qqc.is_mobile (qwizdata[i_qwiz].mobile_enabled)) {
      q.go_mobile (i_qwiz);
   } else if (document_qwiz_mobile) {
      var $mobile_qwizq = $ ('#mobile_qwiz' + i_qwiz + '-q' + i_question);
      if ($mobile_qwizq.length) {
         $mobile_qwizq.show ();
      } else {
         $qwizq.show ();
      }
      window.scrollTo (0, 1);
   } else {
      if (debug[0]) {
         console.log ('[display_question] $qwizq:', $qwizq);
      }
      $qwizq.css ('display', 'block');
      if (q.qwizard_b) {
         var init_b = false;
         if (qwizdata[i_qwiz].use_dataset_question_ids[i_question]) {
            var $qwiz_editable = $qwizq.find ('.qwiz_editable');
            if ($qwiz_editable.length) {
               $qwiz_editable.removeClass ('qwiz_editable');
               init_b = true;
            }
         } else {
            var hangman_labeled_diagram_f = $qwizq.find ('div.hangman_image').length;
            qwizard.init_tinymce ('div#' + qwizq_id + ' .qwiz_editable', false,
                                  hangman_labeled_diagram_f);
            init_b = true;
         }
         if (init_b) {
            var reset_i_question = i_question;
            if (debug[0]) {
               console.log ('[display_question] reset_i_question:', reset_i_question);
            }
            var delay_reset = function () {
               qwizard.reset_show_me_button_text (reset_i_question);
               if (typeof qwizdata[i_qwiz].parts_htm[reset_i_question] != 'undefined') {
                  var parts = qwizdata[i_qwiz].parts_htm[reset_i_question];
                  var n_parts = parts.length;
                  for (var i_part=1; i_part <= n_parts; i_part++) {
                     var part_htm = parts[i_part];
                     $ ('#qwiz' + i_qwiz + '-q' + reset_i_question + ' div.qwiz-part' + i_part).html (part_htm);
                     if (debug[12]) {
                        console.log ('part_htm:', part_htm);
                     }
                  }
               }
               q.init_textentry_autocomplete ($qwizq);
            }
            setTimeout (delay_reset, 300);
         }
      }
   }
   var selector = '#qwiz' + i_qwiz;
   if (q.preview) {
      selector += '-q' + i_question + '.qwizq_preview';
   }
   var $qwiz = $ (selector);
   if (! document_qwiz_mobile && ! document_qwiz_force_mobile_f) {
      if (qwizzled_b) {
         var table_width = 10 + $qwizq.find ('table.qwizzled_table').outerWidth ();
         if (debug[0]) {
            console.log ('[display_question] table_width:', table_width, ', initial_width:', qwizdata[i_qwiz].initial_width);
         }
         if (table_width > qwizdata[i_qwiz].initial_width) {
            $qwiz.css ({width: table_width + 'px', 'max-width': 'none'});
            qwizdata[i_qwiz].width_reset = true;
         }
         if (q.qwizard_b) {
            var $labels = $qwizq.find ('.qwizzled_highlight_label');
            /* DKTMP DEDRAG
            qwizard.create_label_tooltips ($labels);
            qwizard.disable_browser_context_menu ($labels);
            */
            $labels.addClass ('no_move');
         }
      } else {
         var $img = $qwizq.find ('img');
         if ($img.length) {
            var img_width = 10 + $img.outerWidth ();
            if (q.qwizard_b) {
               set_initial_width (i_qwiz);
            }
            if (debug[0]) {
               console.log ('[display_question] img_width:', img_width, ', initial_width:', qwizdata[i_qwiz].initial_width);
            }
            if (img_width > qwizdata[i_qwiz].initial_width) {
               $qwiz.css ({width: img_width + 'px', 'max-width': 'none'});
               qwizdata[i_qwiz].width_reset = true;
            }
         }
      }
   }
   if ($qwiz.length) {
      if (! $qwiz.is (':visible')) {
         const observer = new IntersectionObserver (scale_quiz_to_container_when_visible, {threshold: 1});
         observer.observe ($qwiz[0]);
      } else {
         scale_quiz_to_container ($qwiz);
      }
   }
   if (! qwizzled_b) {
      if (qwizdata[i_qwiz].textentry && qwizdata[i_qwiz].textentry[i_question]) {
         var $textentry = $ ('#textentry-qwiz' + i_qwiz + '-q' + i_question);
         if (! qwizdata[i_qwiz].textentry[i_question].textentry_suggest_b) {
            var $check_answer = $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question);
            $check_answer.find ('button.textentry_check_answer').removeClass ('qwiz_button_disabled');
            qwizdata[i_qwiz].check_answer_disabled_b = false;
            $check_answer.css ({display: 'inline-block'});
         } else if (! qwizdata[i_qwiz].textentry[i_question].single_char_b) {
            if (qwizdata[i_qwiz].terms) {
               if (! qwizdata[i_qwiz].textentry_terms_metaphones) {
                  qwizdata[i_qwiz].textentry_terms_metaphones = qqc.process_textentry_terms (qwizdata[i_qwiz].terms);
               }
            } else {
               if (! default_textentry_terms_metaphones) {
                  var plugin_url = qqc.get_qwiz_param ('url', './');
                  var terms_data = '';
                  if (content == 'body' && plugin_url == './') {
                     if (typeof (document_qwiz_terms) != 'undefined') {
                        terms_data = document_qwiz_terms;
                     }
                  } else {
                     terms_data = qqc.get_textentry_terms (plugin_url + 'terms.txt', qwizdata);
                  }
                  default_textentry_terms_metaphones = qqc.process_textentry_terms (terms_data);
               }
            }
            if (qwizdata[i_qwiz].add_terms) {
               if (! qwizdata[i_qwiz].add_textentry_terms_metaphones) {
                  qwizdata[i_qwiz].add_textentry_terms_metaphones = qqc.process_textentry_terms (qwizdata[i_qwiz].add_terms);
               }
            }
            qwizdata[i_qwiz].check_answer_disabled_b = true;
            qwizdata[i_qwiz].textentry_n_hints = 0;
            textentry_answers[i_qwiz] = qwizdata[i_qwiz].textentry[i_question].answers;
            textentry_answer_metaphones[i_qwiz]
               = textentry_answers[i_qwiz].map (function (answer) {
                                                   answer = answer.replace (/\s*(\S+)\s.*/, '\$1');
                                                   return qqc.metaphone (answer);
                                                });
            if (qwizdata[i_qwiz].textentry[i_question].use_terms_b) {
               var singular_plural;
               if (qwizdata[i_qwiz].textentry[i_question].textentry_plural_b) {
                  singular_plural = 'plural';
               } else {
                  singular_plural = 'singular';
               }
               if (qwizdata[i_qwiz].terms) {
                  current_question_textentry_terms_metaphones[i_qwiz]
                     = qwizdata[i_qwiz].textentry_terms_metaphones[singular_plural];
               } else {
                  current_question_textentry_terms_metaphones[i_qwiz]
                     = default_textentry_terms_metaphones[singular_plural];
               }
               if (qwizdata[i_qwiz].add_terms) {
                  current_question_textentry_terms_metaphones[i_qwiz]
                     = current_question_textentry_terms_metaphones[i_qwiz]
                          .concat (qwizdata[i_qwiz].add_textentry_terms_metaphones[singular_plural]);
               }
            } else {
               current_question_textentry_terms_metaphones[i_qwiz] = [];
            }
            var textentry_answers_metaphones
               = textentry_answers[i_qwiz].map (function (answer) {
                                           return [answer, qqc.metaphone (answer)];
                                        });
            if (debug[6]) {
               console.log ('[display_question] textentry_answers_metaphones: ', textentry_answers_metaphones);
            }
            current_question_textentry_terms_metaphones[i_qwiz]
                  = current_question_textentry_terms_metaphones[i_qwiz]
                                         .concat (textentry_answers_metaphones);
            current_question_textentry_terms_metaphones[i_qwiz]
               = qqc.sort_dedupe_terms_metaphones (current_question_textentry_terms_metaphones[i_qwiz]);
            if (debug[6]) {
               console.log ('[display_question] current_question_textentry_terms_metaphones[i_qwiz].length: ', current_question_textentry_terms_metaphones[i_qwiz].length);
               console.log ('[display_question] current_question_textentry_terms_metaphones[i_qwiz].slice (0, 10): ', current_question_textentry_terms_metaphones[i_qwiz].slice (0, 10));
               var i_start = current_question_textentry_terms_metaphones[i_qwiz].length - 10;
               if (i_start > 0) {
                  console.log ('[display_question] current_question_textentry_terms_metaphones[i_qwiz].slice (' + i_start + '): ', current_question_textentry_terms_metaphones[i_qwiz].slice (i_start));
               }
            }
            var question = qwizdata[i_qwiz].textentry[i_question];
            var minlength = question.textentry_minlength;
            var correct_answer_length = question.first_correct_answer.length;
            if (correct_answer_length < minlength) {
               minlength = correct_answer_length;
            }
            if (! $textentry.autocomplete ('instance')) {
               q.init_textentry_autocomplete ($qwizq);
            }
            $textentry.autocomplete ('option', 'minLength', minlength);
            var placeholder;
            var check_answer;
            if (minlength <= 1) {
               placeholder = T ('Type a letter/number');
               check_answer = T ('Type a letter');
            } else {
               minlength = Math.max (minlength, 3);
               placeholder = T ('Type %s+ letters/numbers, then select');
               placeholder = placeholder.replace ('%s', minlength);
               check_answer = T ('Type %s+ letters');
               check_answer = check_answer.replace ('%s', minlength);
            }
            $textentry.attr ('placeholder', placeholder);
            $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question + ' button.textentry_check_answer').html (check_answer);
            qwizdata[i_qwiz].check_answer = check_answer;
            question.textentry_minlength = minlength;
            var $check_answer = $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question);
            $check_answer.find ('button.textentry_check_answer').addClass ('qwiz_button_disabled');
            qwizdata[i_qwiz].check_answer_disabled_b = true;
            $check_answer.css ({display: 'inline-block'});
            if (i_question == 0 && (q.no_intro_b[i_qwiz]
                                           || qwizdata[i_qwiz].n_questions == 1)) {
               $ ('div#qwiz' + i_qwiz).attr ('onmouseenter', qname + '.start_hint_timeout (' + i_qwiz + ')');
            } else {
               q.start_hint_timeout (i_qwiz);
            }
         }
         if ($textentry.length) {
            $textentry.val ('').removeAttr ('disabled');
            if ((qwizdata[i_qwiz].n_correct + qwizdata[i_qwiz].n_incorrect) != 0
                                                    || ! q.no_intro_b[i_qwiz]) {
               panel_exit_mobile_just_closed_b = true;
               if (! q.preview) {
                  $textentry.focus ();
               }
            }
         }
      } else {
         if (qwizdata[i_qwiz].information_question_b[i_question]) {
            if (qwizdata[i_qwiz].n_questions > 1) {
               $ ('#next_button_text-qwiz' + i_qwiz).html (T ('Continue'));
               q.position_show_next_button (i_qwiz);
               qwizdata[i_qwiz].next_button_show_b = true;
            }
         } else if (typeof qwizdata[i_qwiz].hangman[i_question] != 'undefined') {
            var hangman               = qwizdata[i_qwiz].hangman[i_question];
            var n_hangman             = hangman.n_hangman;
            hangman.n_hangman_done    = 0;
            hangman.n_hangman_correct = 0;
            var first_f               = true;
            var hangman_final_entry;
            for (var i_choice=0; i_choice<n_hangman; i_choice++) {
               $hangman = $qwizq.find ('span.qwiz_hangman.qwiz_hangman_c' + i_choice);
               hangman_final_entry = hangman.hangman_final_entry[i_choice]
               if (qwizdata[i_qwiz].answered_correctly[i_question] == -1) {
                  if (n_hangman > 1
                        && hangman.hangman_incorrect_chars[i_choice].length <= 3
                        && hangman.hangman_n_hints[i_choice] == 0) {
                     $hangman.find ('span.hangman_current_entry').html (hangman_final_entry);
                     hangman.n_hangman_done++;
                     hangman.n_hangman_correct++;
                     continue;
                  }
               }
               var hangman_current_entry = hangman_final_entry.replace (/>[a-z0-9]</gi, '>&ensp;<');
               hangman.hangman_current_entry[i_choice]
                          = hangman_current_entry.replace (/u>&ensp;</g, 'u>\t<');
               $hangman.find ('span.hangman_current_entry').html (hangman_current_entry);
               if (! q.qwizard_b || hangman.hangman_answer[i_choice] != 'placeholder') {
                  $hangman.find ('input').off ('mousedown');
                  $ ('#hangman_hint-qwiz' + i_qwiz + '-q' + i_question + '-c' + i_choice)
                     .removeAttr ('disabled')
                     .removeClass ('qwiz_button_disabled')
               }
               hangman.hangman_incorrect_chars[i_choice] = '';
               hangman.hangman_incorrect_chars_before_hint[i_choice] = 6;
               hangman.hangman_n_hints[i_choice] = 0;
               $hangman[0].done_f = false;
               $hangman.find ('span.hangman_status').html ('');
               var msg;
               var hangman_answer = hangman.hangman_answer[i_choice];
               if (hangman_answer.search (/[a-z]/i) != -1) {
                  msg = T ('Type letters in the box');
               } else {
                  msg = T ('Type numbers in the box');
               }
               $hangman.find ('span.hangman_type_letters').html ('<span class="type_letters">' + msg + '</span>').show ();
               $qwizq.find ('div.qwiz_hangman_msg').hide ();
               if (   (   qwizdata[i_qwiz].user_question_number > 1
                       || ! q.no_intro_b[i_qwiz]
                       || qwizdata[i_qwiz].answered_correctly[i_question] == -1
                      )
                   && first_f && ! q.preview) {
                  first_f = false;
                  panel_exit_mobile_just_closed_b = true;
                  var $hangman_input = $qwizq.find ('span.qwiz_hangman.qwiz_hangman_c' + i_choice + ' input');
                  suppress_hangman_hint_b = true;
                  if (! q.qwizard_b) {
                     $hangman_input[0].focus ();
                  }
               }
            }
         } else {
            $ ('input[name=' + qwizq_id + ']').removeAttr ('disabled').prop ('checked', false);
            $ ('#mobile_' + qwizq_id + ' li.mobile_choice').show ();
            $qwizq.find ('button.show_the_answer').removeAttr ('disabled').show ();
            if (! q.qwizard_b) {
               /*
               $ ('.choices-' + qwizq_id).on ('mouseover', function () {
                  $ (this).css ({'cursor': 'pointer', 'color': '#045FB4'})
               }).on ('mouseout', function () {;
                  $ (this).css ({'cursor': 'text', 'color': 'black'})
               });
               */
               $qwizq.find (`.choices-${qwizq_id}, .choices-${qwizq_id} .qwiz-choice`)
                  .css ({'cursor': '', 'color': ''});
               $qwizq.find ('.qwiz_correct_choice').removeClass ('qwiz_correct_choice');
               $qwizq.find ('.qwiz_incorrect_choice').removeClass ('qwiz_incorrect_choice');
            }
         }
      }
   }
}
function scale_quiz_to_container_when_visible (entries, observer) {
   if (debug[0]) {
      console.log ('[scale_quiz_to_container_when_visible] entries:', entries);
      console.log ('[scale_quiz_to_container_when_visible] observer:', observer);
   }
   const $qwiz = $ (entries[0].target);
   if ($qwiz.is (':visible')) {
      scale_quiz_to_container ($qwiz);
      observer.unobserve (entries[0].target);
   }
}
function scale_quiz_to_container ($qwiz) {
   var qwiz_width = $qwiz.outerWidth ();
   var $container = $qwiz.parent ();
   if ($container.length) {
      var container_width = $container.width ();
      if (container_width > 0) {
         if (qwiz_width > container_width) {
            const scale_fac = container_width / qwiz_width;
            const trans_pct = Math.round ((1.0 - scale_fac) * 50.0)
            const rtl_fac = getComputedStyle ($container[0]).direction == 'rtl' ? 1 : -1;
            $qwiz.css ({transform: 'translate(' + rtl_fac*trans_pct + '%, -' + trans_pct + '%) scale(' + scale_fac.toFixed (3) + ')'});
            qqc.offset_height_rescale ($qwiz, scale_fac);
            const id = $qwiz[0].id;
            const m = id.match (/qwiz(\d+)/);
            if (m) {
               const i_qwiz = m[1];
               if (debug[0]) {
                  console.log ('[scale_quiz_to_container] $qwiz:', $qwiz);
                  console.log ('[scale_quiz_to_container] i_qwiz:', i_qwiz);
               }
               qwizdata[i_qwiz].width_reset = true;
            }
            $qwiz[0].qscale_fac = scale_fac;
         }
      }
   }
}
function record_response (i_qwiz, qrecord_id, data, no_spin_f) {
   if (! q.preview && ! q.qwizard_b && ! no_spin_f) {
      const hhmmss = DateFormat.format.date (new Date ().getTime (), 'h:mm:ss');
      $ ('span.response_recorded_wrapper-qwiz' + i_qwiz)
         .css ({display: 'inline-block'})
         .attr ('title', T ('Recording your response at') + ' ' + hhmmss + ' - ' + T ('not complete'));
      const $response_recording = $ (`span.response_recorded-qwiz${i_qwiz} img.response_recording`);
      $response_recording.addClass ('response_recording_spin').removeAttr ('title');
   }
   qqc.qjax (qname, i_qwiz, qrecord_id, 'record_response_v3', data);
}
this.show_response_recorded = function (i_qwiz) {
   if (! q.preview) {
      var hhmmss = DateFormat.format.date (new Date ().getTime (), 'h:mm:ss');
      const $response_recording = $ (`span.response_recorded-qwiz${i_qwiz} img.response_recording`);
      $response_recording.removeClass ('response_recording_spin')
                         .attr ('title', T ('Response to question') + ' ' + qwizdata[i_qwiz].user_question_number + ' ' + T ('recorded') + ' ' + hhmmss)
   }
}
this.pay_lock_settings = function (do_i_qwiz_deck, i_login_qwiz, escaped_session_id,
                                   remember_f, msg) {
   qqc.pay_lock_settings (qname, qwizdata, n_qwizzes, i_login_qwiz,
                          escaped_session_id, remember_f, do_i_qwiz_deck, msg);
}
this.go_mobile = function (i_qwiz) {
   non_mobile_scrollLeft = window.scrollX;
   non_mobile_scrollTop  = window.scrollY;
   var $qwiz = $ ('#qwiz' + i_qwiz);
   qwizdata[i_qwiz].qwiz_style = $qwiz.attr ('style');
   $qwiz.removeAttr ('style').removeClass ('qwiz').addClass ('qwiz-mobile qwizard_qwiz_deck_div');
   $qwiz.after ('<div id="qwiz_div_placeholder"></div>');
   $qwiz.appendTo ('body');
   window.scrollTo (0, 0);
   $ ('body').css ({overflow: 'hidden'});
   $ ('#icon_qwiz' + i_qwiz).hide ();
   if (qqc.is_mobile (qwizdata[i_qwiz].mobile_enabled) || ! document_qwiz_force_mobile_f) {
      $qwiz.find ('.qwizzled_label_head_standard').hide ();
      $qwiz.find ('.qwizzled_label_head_mobile').show ();
      var i_question = qwizdata[i_qwiz].i_question;
      if (i_question < qwizdata[i_qwiz].n_questions && ! qwizdata[i_qwiz].login_show_b) {
         var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
         var $qwizq = $ ('#' + qwizq_id);
         var $mobile_qwizq = $ ('#mobile_qwiz' + i_qwiz + '-q' + i_question);
         if ($mobile_qwizq.length) {
            $mobile_qwizq.show ();
            $qwizq.hide ();
         } else {
            $qwizq.show ();
         }
      }
      if (qwizdata[i_qwiz].$qwizzled && qwizdata[i_qwiz].$qwizzled[qwizq_id]) {
         reset_label_positions ($qwizq);
         $qwiz.css ('width', '');
      }
      $ ('.go-mobile-qwiz' + i_qwiz).hide ();
      if (! document_qwiz_force_mobile_f) {
         $ ('.exit-mobile-qwiz' + i_qwiz).show ();
         $ ('#mode-qwiz' + i_qwiz).hide ();
         $ ('#icon-exit-mobile-qwiz' + i_qwiz).show ();
         $ ('#summary-qwiz' + i_qwiz).find ('button.summary_exit_mobile_qwiz').show ();
      }
      document_qwiz_mobile = 'mobile_';
      scale_quiz_to_container ($qwiz);
   }
}
this.open_panel_exit_mobile = function (i_qwiz) {
   $ ('#overlay-exit-mobile-qwiz' + i_qwiz)
      .show ()
      .animate ({top: '0px'}, 500);
   panel_exit_mobile_open_b = true;
   $ ('#icon-exit-mobile-qwiz' + i_qwiz).hide ();
}
this.close_panel_exit_mobile = function (overlay_el) {
   $ (overlay_el).animate ({top: '-100px'}, 500,
                           function () {
                              $ (this).hide ();
                              $ ('div.icon-exit-mobile-qwiz').show ();
                           });
   window.scrollTo ($ (window).scrollLeft (), 1);
   panel_exit_mobile_open_b = false;
   panel_exit_mobile_just_closed_b = true;
   return false;
}
this.exit_mobile = function (i_qwiz) {
   var $qwiz = $ ('#qwiz' + i_qwiz);
   $qwiz.attr ('style', qwizdata[i_qwiz].qwiz_style)
        .removeClass ('qwiz-mobile qwizard_qwiz_deck_div')
        .addClass ('qwiz');
   if ($ ('#xqwiz' + i_qwiz).length) {
      $ ('#qwiz' + i_qwiz).css ('width', qwizdata[i_qwiz].initial_width + 'px');
   }
   $ ('#qwiz_div_placeholder').replaceWith ($qwiz);
   $ ('body').css ({overflow: ''});
   window.scrollTo (non_mobile_scrollLeft, non_mobile_scrollTop);
   $ ('#overlay-exit-mobile-qwiz' + i_qwiz).css ({top: '-100px', display: 'none'});
   $ (window).off ('scroll');
   $qwiz.find ('.qwizzled_label_head_standard').show ();
   $qwiz.find ('.qwizzled_label_head_mobile').hide ();
   var i_question = qwizdata[i_qwiz].i_question;
   var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
   var $qwizq = $ ('#' + qwizq_id);
   if (i_question >= 0 && i_question < qwizdata[i_qwiz].n_questions
                                          && ! qwizdata[i_qwiz].login_show_b) {
      var $mobile_qwizq = $ ('#mobile_qwiz' + i_qwiz + '-q' + i_question);
      $mobile_qwizq.hide ();
      $qwizq.show ();
   }
   var $table_img;
   if (qwizdata[i_qwiz].$qwizzled && qwizdata[i_qwiz].$qwizzled[qwizq_id]) {
      $table_img = $qwizq.find ('table.qwizzled_table');
   } else {
      $table_img = $qwizq.find ('img');
   }
   if ($table_img.length) {
      var table_img_width = 10 + $table_img.outerWidth ();
      if (table_img_width > qwizdata[i_qwiz].initial_width) {
         var selector = '#qwiz' + i_qwiz;
         if (q.preview) {
            selector += '-q' + i_question + '.qwizq_preview';
         }
         $ (selector).css ({width: table_img_width + 'px', 'max-width': 'none'});
         qwizdata[i_qwiz].width_reset = true;
      }
      if (qwizdata[i_qwiz].$qwizzled && qwizdata[i_qwiz].$qwizzled[qwizq_id]) {
         reset_label_positions ($qwizq);
      }
   }
   $ ('div.icon-exit-mobile-qwiz, div.icon-panel-exit-mobile-qwiz').hide ();
   $ ('.exit-mobile-qwiz').hide ();
   $ ('button.summary_exit_mobile_qwiz').hide ();
   const mobile_enabled = qwizdata[i_qwiz].mobile_enabled;
   if (mobile_enabled == 'Always'
               || (mobile_enabled == 'Small screens only'
                                           && qqc.is_mobile (mobile_enabled))) {
      $ ('.go-mobile-qwiz' + i_qwiz).show ();
   }
   document_qwiz_mobile = '';
   panel_exit_mobile_just_closed_b = false;
}
function reset_label_positions ($qwizq) {
   if (debug[8]) {
      console.log ('[reset_label_positions] $qwizq:', $qwizq);
   }
   $qwizq.find ('td.qwizzled_labels div.qwizzled_label').each (function () {
      var label_offset = $ (this).parents ('li').offset ();
      if (debug[8]) {
         console.log ('[reset_label_positions] label_offset:', label_offset);
      }
      $ (this).data ('label_x', label_offset.left).data ('label_y', label_offset.top);
   });
}
this.start_hint_timeout = function (i_qwiz) {
   $ ('div#qwiz' + i_qwiz).removeAttr ('onmouseenter');
   var i_question = qwizdata[i_qwiz].i_question;
   var $check_answer = $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question);
   if (debug[0]) {
      console.log ('[start_hint_timeout] $check_answer.length:', $check_answer.length);
   }
   var show_hint_button = function () {
      $check_answer.find ('button.qwiz_textentry_hint')
         .removeAttr ('disabled')
         .html ('Hint').css ({display: 'inline-block'});
   }
   $check_answer.find ('button.qwiz_textentry_hint').html ('Hint').hide ();
   if (hint_timeout_sec >= 0) {
      show_hint_timeout[i_qwiz] = setTimeout (show_hint_button, hint_timeout_sec*1000);
   }
}
function process_multiple_choice (i_qwiz, i_question, htm, opening_tags) {
   var desktop_htm;
   var remaining_htm;
   var choices_html = '';
   var span_pos = qqc.opening_tag_shortcode_pos ('([c]|[c*])', htm);
   if (span_pos == htm.length) {
      errmsgs.push (T ('Did not find choices ("[c]")') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (i_question + 1));
      desktop_htm = '';
      remaining_htm = '';
   } else {
      var question_htm = htm.substr (0, span_pos);
      if (debug[0]) {
         console.log ('[process_multiple_choice] span_pos: ', span_pos);
         console.log ('[process_multiple_choice] question_htm: ', question_htm);
      }
      if (qwizdata[i_qwiz].qrecord_id) {
         var q_and_a_text;
         if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
            q_and_a_text = qqc.remove_tags_eols (question_htm);
            qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (q_and_a_text);
            qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (htm);
         } else {
            qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
            qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
         }
      }
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].type = 'multiple_choice';
         question_htm = qqc.shortcodes_to_video_elements (question_htm);
         qw.questions_cards[i_question].question_text = opening_tags + question_htm;
      }
      var bg_img_style = create_bg_img_style (i_qwiz, i_question);
      desktop_htm =   '<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq"' + bg_img_style + '>\n'
                    +    '<div class="qwiz-question qwiz_editable">'
                    +       opening_tags + question_htm
                    +    '</div>';
      if (debug[1]) {
         console.log ('[process_multiple_choice] desktop_htm: ', desktop_htm);
      }
      remaining_htm = htm.substr (span_pos);
      choices_html = '</p>';
   }
   var choice_tags = htm.match (/\[c\*{0,1}\]/gm);
   var n_choices = 0;
   if (choice_tags) {
      n_choices = choice_tags.length;
   }
   if (debug[0]) {
      console.log ('[process_multiple_choice] n_choices: ', n_choices);
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].n_choices = n_choices;
      qw.questions_cards[i_question].choices   = [];
      qw.questions_cards[i_question].feedbacks = [];
   }
   var n_correct = 0;
   var choice_start_tags = ['[c]', '[c*]'];
   var choice_next_tags  = ['[c]', '[c*]', '[x]'];
   var got_feedback_b = false;
   var i_fx = -1;
   var feedback_divs  = [];   // Feedback div for desktop.
   var feedback_items = [];   // Plain html for mobile.
   var choice_items   = [];   // "
   var i_choice_correct = -1;
   for (var i_choice=0; i_choice<n_choices; i_choice++) {
      var choice_html = qqc.parse_html_block (remaining_htm, choice_start_tags, choice_next_tags);
      remaining_htm = remaining_htm.substr (choice_html.length);
      if (q.wordpress_page_f) {
         choice_html = cvt_feedback (choice_html);
         if (choice_html.indexOf ('[c*]') != -1) {
            choice_tags[i_choice] = '[c*]';
         }
      }
      var r = process_feedback_item (choice_html, i_qwiz, i_question, i_choice);
      choice_html  = r.choice_html;
      if (r.feedback_div) {
         if (i_choice == n_choices-1 && ! got_feedback_b && n_choices != 1) {
            feedback_divs[0] = r.feedback_div;
            feedback_items[0] = r.feedback_item_html;
            var n_feedback_items = 1;
            if (r.fx_b) {
               i_fx = 0;
               n_feedback_items = 0;
            }
            for (var i_feedback=1; i_feedback<n_choices; i_feedback++) {
               var r = process_feedback_item (choice_html, i_qwiz, i_question,
                                              i_feedback);
               choice_html  = r.choice_html;
               if (! r.feedback_div) {
                  break;
               }
               feedback_divs[i_feedback] = r.feedback_div;
               feedback_items[i_feedback] = r.feedback_item_html;
               if (r.fx_b) {
                  if (i_fx == -1) {
                     i_fx = i_feedback;
                  } else {
                     errmsgs.push (T ('Got more than one [fx]') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (1 + i_question));
                  }
               } else {
                  n_feedback_items++;
               }
            }
            if (n_feedback_items == 1 || i_fx != -1) {
               feedback_divs[n_choices-1] = feedback_divs[0];
               feedback_divs[0] = '';
               feedback_items[n_choices-1] = feedback_items[0];
               feedback_items[0] = '';
               if (i_fx == 0) {
                  i_fx = n_choices - 1;
               }
            } else {
               if (n_feedback_items != n_choices) {
                  errmsgs.push (T ('Number of feedback items does not match number of choices') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
               } else {
                  feedback_divs[0] = feedback_divs[0].replace (/(qwiz[0-9]+-q[0-9]+-a)[0-9]+/, '\$10');
               }
            }
         } else {
            got_feedback_b = true;
            if (r.fx_b) {
               if (i_fx == -1) {
                  i_fx = feedback_divs.length;
               } else {
                  errmsgs.push (T ('Got more than one [fx]') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
               }
            }
            feedback_divs.push (r.feedback_div);
            feedback_items.push (r.feedback_item_html);
            var r = process_feedback_item (choice_html, i_qwiz, i_question,
                                           i_feedback);
            if (r.feedback_div) {
               errmsgs.push (T ('More than one feedback shortcode [f] or [fx] given with a choice') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
            }
         }
      } else {
         feedback_divs.push ('');
         feedback_items.push ('');
      }
      if (debug[2]) {
         console.log ('[process_multiple_choice] feedback_divs:', feedback_divs);
      }
      var c = choice_html.match (/\[c\*{0,1}\]/m)[0];
      var without_c = choice_html.replace (/\[c\*{0,1}\]/m, '');
      choice_items.push (without_c);
      if (/^\s*<([ph]|br)/.test (without_c)) {
         choice_html = without_c.replace (/^\s*<([ph]|br)[^>]*>/, '$&' + c);
      } else {
         choice_html = c + without_c;
      }
      if (q.qwizard_b) {
         choice_html = choice_html.replace (/&emsp;&emsp;/g, '');
      } else {
         var m = choice_html.match (/(<\/p>|<br>)\s*$/);
         if (! m) {
            m = choice_html.match (/&emsp;&emsp;\s*$/);
            if (! m) {
               choice_html += '&emsp;&emsp;';
            }
         }
      }
      if (n_choices > 1
            || (q.qwizard_b
                   && qwizdata[i_qwiz].qwizard_multiple_choice_b[i_question])) {
         var r = create_radio_button_html (i_qwiz, i_question, i_choice,
                                           choice_tags[i_choice]);
         if (r.correct) {
            n_correct++;
            i_choice_correct = i_choice;
         }
         var qwiz_question = 'qwiz' + i_qwiz + '-q' + i_question;
         var qwiz_question_choice = qwiz_question + '-a' + i_choice;
         var style = '';
         if (q.qwizard_b) {
            style = ' style="cursor: text;"';
         }
         choice_html = choice_html.replace (/\[c\*{0,1}\]/m, r.htm + '<span class="qwiz-choice qwiz_editable" data-i_choice="' + i_choice + '"' + style + '>');
         if (/^\s*<[ph]/.test (choice_html)) {
            choice_html = choice_html.trimEnd ();
            var len = choice_html.length;
            if (choice_html.substr (len - 4, 3) != '</p'
                                  && choice_html.substr (len - 5, 3) != '</h') {
               var end_opening_tag_pos = choice_html.indexOf ('>');
               if (end_opening_tag_pos != -1) {
                  choices_html += choice_html.substr (0, end_opening_tag_pos + 1);
                  choice_html = choice_html.substr (end_opening_tag_pos + 1);
               }
               choice_html += '</span>';
            } else {
               choice_html = choice_html.replace (/<\/(p|h[1-6])>$/, '</span>$&');
            }
         } else {
            choice_html += '</span>';
         }
         if (set_qwizard_data_b) {
            var m = choice_html.match (/<span class="qwiz-choice[^>]+>/);
            var m = choice_html.match (/<span class="qwiz-choice[^>]+>([^]*?)<\/span>/);
            var choice = qqc.shortcodes_to_video_elements (m[1])
            qw.questions_cards[i_question].choices[i_choice] = choice;
         }
         const onclick = 'onclick="' + qname + '.process_choice (event, \'' + qwiz_question_choice + '\')"';
         var mc_style_alt = '';
         if (qwizdata[i_qwiz].mc_style && qwizdata[i_qwiz].mc_style != 'radio' ) {
            mc_style_alt = '-' + qwizdata[i_qwiz].mc_style;
         }
         if (debug[2]) {
            console.log ('[process_multiple_choice] choices_html:', choices_html);
            console.log ('[process_multiple_choice] choice_html:', choice_html);
         }
         var close_span = '';
         if (i_choice == n_choices - 1 && ! mc_style_alt) {
            const m = choices_html.match (/<p[^>]*>\s*$/);
            if (m) {
               i_pos = m.index;
               choices_html = choices_html.substr (0, i_pos) + '<span class="qwiz-choices">' + choices_html.substr (i_pos);
               close_span = '</span>';
            }
         }
         choices_html += `<span class="choices-${qwiz_question} choice-${qwiz_question_choice}  qwiz-choices${mc_style_alt}" ${onclick} data-i_choice="${i_choice}">\n
                             <span class="qwiz-choice" data-i_choice="${i_choice}'">
                               ${choice_html}
                             </span>
                          </span>
                         ` + close_span;
      } else {
         choice_html = choice_html.replace (/\[c\*{0,1}\]/m, '');
         i_choice_correct = 0;
         n_correct = 1;
         var onclick;
         if (qwizdata[i_qwiz].n_questions == 1) {
            onclick = qname + '.process_choice (event, \'qwiz' + i_qwiz + '-q' + i_question + '-a0\', true)';
         } else {
            onclick = qname + '.show_answer_got_it_or_not (' + i_qwiz + ', ' + i_question + ', this)';
         }
         var button_label = choice_html;
         if (button_label.indexOf ('[show_me_placeholder]') != -1) {
            button_label = 'Show me the answer';
         }
         choices_html += '<button class="qwiz_button show_the_answer qwiz-choice qwiz_editable" data-i_choice="0" style="margin-left: 20px;" onclick="' + onclick + '">';
         choices_html +=    button_label;
         choices_html += '</button>\n';
         if (set_qwizard_data_b) {
            qw.questions_cards[i_question].type = 'show_me';
            choice_html = qqc.shortcodes_to_video_elements (choice_html);
            qw.questions_cards[i_question].choices[i_choice] = choice_html;
         }
         if (! feedback_divs[0]) {
            errmsgs.push (T ('Feedback [f] is required for a one-choice question') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
         }
      }
   }
   if (set_qwizard_data_b && qw.questions_cards[i_question].type != 'show_me') {
      if (debug[12]) {
         console.log ('[process_multiple_choice] choices_html:', choices_html);
      }
      var pos_sub_span1 = choices_html.substr (31).indexOf ('<span');
      if (pos_sub_span1 != -1) {
         if (choices_html.substr (31 + pos_sub_span1).search (/<p|<h[1-6]|<br/) == -1) {
            qw.questions_cards[i_question].choices_inline = true;
         }
      }
   }
   desktop_htm += choices_html;
   desktop_htm += '<div style="clear: both;"></div>\n';
   if (debug[1]) {
      console.log ('[process_multiple_choice] desktop_htm: ', desktop_htm);
   }
   if (n_correct == 0) {
      if (! q.qwizard_b) {
         if (! qwizdata[i_qwiz].use_dataset
                   && ! qwizdata[i_qwiz].use_dataset_question_ids[i_question]) {
            errmsgs.push (T ('No choice was marked correct') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
         }
      }
   } else if (n_correct > 1) {
      errmsgs.push (T ('More than one choice was marked correct') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
   } else {
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].correct_choice = i_choice_correct;
      }
   }
   for (var i_choice=0; i_choice<n_choices; i_choice++) {
      if (! feedback_divs[i_choice]) {
         if (i_fx != -1 && i_choice != i_choice_correct) {
            feedback_divs[i_choice] = feedback_divs[i_fx].replace (/(qwiz[0-9]+-q[0-9]+-a)[0-9]+/, '\$1' + i_choice);
         } else {
            var response = q.canned_feedback (i_choice == i_choice_correct);
            feedback_divs[i_choice]
                               = create_feedback_div_html (i_qwiz, i_question,
                                                           i_choice, response);
            feedback_items[i_choice] = response;
         }
      }
   }
   feedback_divs = feedback_divs.join ('\n');
   desktop_htm += feedback_divs;
   if (set_qwizard_data_b) {
      for (var i_choice=0; i_choice<n_choices; i_choice++) {
         qw.questions_cards[i_question].feedbacks[i_choice]
                  = qqc.shortcodes_to_video_elements (feedback_items[i_choice]);
      }
   }
   if (n_choices == 1 && (qwizdata[i_qwiz].n_questions > 1 || qwizdata[i_qwiz].use_dataset)) {
      desktop_htm += create_got_it_or_not ('', i_qwiz, i_question);
   }
   if (debug[2]) {
      console.log ('[process_multiple_choice] desktop_htm: ', desktop_htm);
   }
   desktop_htm += '</div>\n';
   var qwiz_question = 'mobile_qwiz' + i_qwiz + '-q' + i_question;
   var mobile_htm = [];
   mobile_htm.push ('<div id="mobile_qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq-mobile">\n');
   mobile_htm.push (   opening_tags + question_htm);
   mobile_htm.push (   '<ul class="mobile_choices">');
   for (var i_choice=0; i_choice<n_choices; i_choice++) {
      var qwiz_question_choice = qwiz_question + '-a' + i_choice;
      var data_correct = i_choice == i_choice_correct ? 'data-q="1"' : '';
      var onclick;
      if (n_choices > 1 || qwizdata[i_qwiz].n_questions == 1) {
         onclick = qname + '.process_choice (event, \'' + qwiz_question_choice + '\')';
      } else {
         onclick = qname + '.show_answer_got_it_or_not (' + i_qwiz + ', ' + i_question + ', this)';
         if (choice_items[0].indexOf ('[show_me_placeholder]') != -1) {
            choice_items[0] = 'Show me the answer';
         }
      }
      mobile_htm.push (    '<li id="choice-' + qwiz_question_choice + '" class="mobile_choice" onclick="' + onclick  + '" ' + data_correct + '>');
      mobile_htm.push (       '<div class="mobile_choice">');
      mobile_htm.push (          choice_items[i_choice]);
      mobile_htm.push (       '</div>');
      mobile_htm.push (    '</li>');
   }
   mobile_htm.push (   '</ul>');
   mobile_htm.push (   '<div style="clear: both;"></div>');
   mobile_htm.push (feedback_divs.replace (/id="qwiz/gm, 'id="mobile_qwiz'));
   mobile_htm.push ('</div>');
   if (n_choices == 1 && (qwizdata[i_qwiz].n_questions > 1 || qwizdata[i_qwiz].use_dataset)) {
      mobile_htm.push (create_got_it_or_not ('mobile_', i_qwiz, i_question));
   }
   mobile_htm = mobile_htm.join ('\n');
   return desktop_htm + '\n' + mobile_htm;
}
function process_textentry (i_qwiz, i_question, htm, opening_tags) {
   if (! qwizdata[i_qwiz].textentry) {
      qwizdata[i_qwiz].textentry = {};
      textentry_b = true;
   }
   var question_text = htm;
   var c_pos = qqc.opening_tag_shortcode_pos ('([c*]|[c])', htm);
   if (c_pos < htm.length) {
      question_text = htm.substr (0, c_pos);
   } else {
      errmsgs.push (T ('No answer-word given') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
   }
   if (qwizdata[i_qwiz].qrecord_id) {
      if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
         var q_and_a_text = qqc.remove_tags_eols (question_text);
         q_and_a_text     = q_and_a_text.replace (/\[textentry[^\]]*\]/, '_________');
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (qqc.remove_tags_eols (q_and_a_text));
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (htm);
      } else {
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
      }
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].type = 'textentry';
      question_text = qqc.shortcodes_to_video_elements (question_text);
      qw.questions_cards[i_question].question_text = opening_tags + question_text;
      qw.questions_cards[i_question].choices = [];
      qw.questions_cards[i_question].correct_choice_fs = [];
      qw.questions_cards[i_question].feedbacks = [];
   }
   var textentry_plural_b = false;
   var textentry_suggest_b = true;
   var textentry_minlength = 3;
   var use_dict_b  = default_use_dict == 'true';
   var use_terms_b = default_use_terms == 'true';
   var single_char_b = false;
   var m = htm.match (/\[textentry([^\]]*)\]/m);
   var attributes = '';
   if (m) {
      attributes = m[1];
      if (attributes) {
         attributes = qqc.replace_smart_quotes (attributes);
         textentry_plural_b = get_attr (attributes, 'plural') == 'true';
         textentry_suggest_b = get_attr (attributes, 'suggest') != 'false';
         var attr_val = get_attr (attributes, 'minlength');
         if (attr_val != '') {
            textentry_minlength = attr_val;
         }
         var use_terms = get_attr (attributes, 'use_terms');
         if (use_terms) {
            use_terms_b = use_terms != 'false';
         }
         var use_dict = get_attr (attributes, 'use_dict');
         if (use_dict) {
            use_dict_b = use_dict != 'false';
         }
         single_char_b = get_attr (attributes, 'single_char') == 'true';
      }
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].type = single_char_b ? 'one_letter_answer' : 'textentry';
      qw.questions_cards[i_question].textentry_attributes = attributes;
      qw.questions_cards[i_question].textentry_plural_b = textentry_plural_b;
   }
   var remaining_htm = htm.substr (c_pos);
   htm = htm.substr (0, c_pos);
   var classname;
   var style;
   if (single_char_b) {
      classname = 'qwiz_single_char_entry';
      style     = 'style="width: 2rem; padding: 2px;" ';
   } else if (textentry_suggest_b) {
      classname = 'qwiz_textentry';
      style     = 'style="width: 18em; padding: 2px;" ';
   } else {
      classname = 'qwiz_textentry_no_suggest';
      style     = 'style="width: 18em; padding: 2px;" ';
   }
   var input = '<input type="text" id="textentry-qwiz' + i_qwiz + '-q' + i_question + '" autocomplete="off" class="' + classname + '" ' + style + 'onfocus="' + qname + '.set_textentry_i_qwiz (event, this)" />';
   var new_htm;
   var re = new RegExp ('\\[textentry[^\\]]*\\]');
   if (q.qwizard_b) {
      new_htm = create_hangman_textentry_editable_divs (i_qwiz, i_question,
                                                        opening_tags, [input],
                                                        'textentry', re, htm);
   } else {
      new_htm =   '<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq">\n'
                +    opening_tags + htm.replace (re, input);
   }
   new_htm +=  '<br />'
             + '<div id="textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question + '" class="textentry_check_answer_div">\n'
             +    '<button class="qwiz_button qwiz_button_disabled textentry_check_answer" onclick="' + qname + '.textentry_check_answer (' + i_qwiz + ')">'
             +        T ('Check answer')
             +    '</button>\n'
             +    '&emsp;\n'
             +    '<button class="qwiz_button qwiz_textentry_hint" style="display: none; font-size: 11px; padding: 2px 2px; border-radius: 5px;" onclick="' + qname + '.textentry_hint (' + i_qwiz + ')" disabled>'
             +        T ('Hint')
             +    '</button>\n'
             + '</div>\n';
   var n_correct = 0;
   var choice_start_tags = ['[c]', '[c*]'];
   var choice_next_tags  = ['[c]', '[c*]', '[x]'];
   var got_feedback_b = false;
   var feedback_divs = [];
   qwizdata[i_qwiz].textentry[i_question] = {};
   qwizdata[i_qwiz].textentry[i_question].choices = [];
   qwizdata[i_qwiz].textentry[i_question].textentry_plural_b = textentry_plural_b;
   qwizdata[i_qwiz].textentry[i_question].textentry_suggest_b = textentry_suggest_b;
   qwizdata[i_qwiz].textentry[i_question].textentry_minlength = textentry_minlength;
   qwizdata[i_qwiz].textentry[i_question].use_terms_b = use_terms_b;
   qwizdata[i_qwiz].textentry[i_question].use_dict_b = use_dict_b;
   qwizdata[i_qwiz].textentry[i_question].single_char_b = single_char_b;
   qwizdata[i_qwiz].textentry[i_question].choices_correct = [];
   qwizdata[i_qwiz].textentry[i_question].answers = [];
   qwizdata[i_qwiz].textentry[i_question].first_correct_answer = '';
   qwizdata[i_qwiz].check_answer_disabled_b = true;
   var i_choice = 0;
   var default_choice_given_b = false;
   while (true) {
      var choice_html = qqc.parse_html_block (remaining_htm, choice_start_tags,
                                              choice_next_tags);
      if (choice_html == 'NA') {
         break;
      }
      remaining_htm = remaining_htm.substr (choice_html.length);
      if (q.wordpress_page_f) {
         choice_html = cvt_feedback (choice_html);
      }
      var r = process_feedback_item (choice_html, i_qwiz, i_question, i_choice);
      choice_html  = r.choice_html;
      var feedback_item_html = '';
      if (r.feedback_div) {
         got_feedback_b = true;
         feedback_divs.push (r.feedback_div);
         feedback_item_html = r.feedback_item_html;
         var r = process_feedback_item (choice_html, i_qwiz, i_question,
                                        i_choice);
         if (r.feedback_div) {
            errmsgs.push (T ('More than one feedback shortcode [f] given with choice') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      } else {
         feedback_divs.push ('');
      }
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].feedbacks[i_choice]
                        = qqc.shortcodes_to_video_elements (feedback_item_html);
      }
      var correct_b = choice_html.search (/\[c\*\]/) != -1;
      if (correct_b) {
         n_correct++;
      }
      choice_html = choice_html.replace (/[^]*\[c\*{0,1}\]/, '');
      if (! (q.qwizard_b && choice_html.indexOf ('placeholder') != -1)) {
         choice_html = choice_html.replace (/<[^>]+>|\n|&nbsp;/g, '');
      }
      if (choice_html.replace (';', '').search (/\S/) == -1) {
         errmsgs.push (T ('No word(s) given for [textentry] choice') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
      }
      var alts = choice_html.split (/\s*;\s*/);
      var nonblank_alts = [];
      for (var i=0; i<alts.length; i++) {
         if (alts[i].search (/\S/) != -1) {
            nonblank_alts.push (qqc.trim (alts[i]));
         }
      }
      if (nonblank_alts[0] == '*') {
         default_choice_given_b = true;
         if (correct_b) {
            errmsgs.push (T ('For [textentry] question, wildcard choice ("*", for any other user entry) cannot be marked correct "[c*]"') +  '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
         /*
         if (feedback_divs[i_choice] == '') {
            errmsgs.push (T ('For [textentry] question, wildcard choice ("*", for any other user entry) must be accompanied by feedback "[f]"'));
         }
         */
      }
      qwizdata[i_qwiz].textentry[i_question].choices.push (nonblank_alts);
      qwizdata[i_qwiz].textentry[i_question].choices_correct.push (correct_b);
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].choices.push (nonblank_alts.join (';'));
         qw.questions_cards[i_question].correct_choice_fs.push (correct_b ? 1 : 0);
      }
      if (correct_b) {
         if (nonblank_alts.length && qwizdata[i_qwiz].textentry[i_question].first_correct_answer == '') {
            qwizdata[i_qwiz].textentry[i_question].first_correct_answer = nonblank_alts[0];
         }
      }
      var n_alts = nonblank_alts.length;
      for (var i=0; i<n_alts; i++) {
         if (qwizdata[i_qwiz].textentry[i_question].answers.indexOf (nonblank_alts[i]) != -1
                                           && nonblank_alts != 'Enter word') {
            errmsgs.push (T ('Answer given in more than one choice') + ': ' + nonblank_alts[i] + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      }
      qwizdata[i_qwiz].textentry[i_question].answers
                 = qwizdata[i_qwiz].textentry[i_question].answers.concat (nonblank_alts);
      i_choice++;
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].n_choices = i_choice;
   }
   if (! default_choice_given_b) {
      i_choice++;
      qwizdata[i_qwiz].textentry[i_question].choices.push (['*']);
      qwizdata[i_qwiz].textentry[i_question].choices_correct.push (false);
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].choices.push ('*');
         qw.questions_cards[i_question].correct_choice_fs.push (0);
         qw.questions_cards[i_question].n_choices = i_choice;
      }
   }
   var n_choices = i_choice;
   new_htm += '<div style="clear: both;"></div>\n';
   if (n_correct == 0) {
      errmsgs.push (T ('No choice was marked correct') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
   }
   for (var i_choice=0; i_choice<n_choices; i_choice++) {
      if (! feedback_divs[i_choice]) {
         var response = q.canned_feedback (qwizdata[i_qwiz].textentry[i_question].choices_correct[i_choice]);
         feedback_divs[i_choice] = create_feedback_div_html (i_qwiz, i_question,
                                                             i_choice, response);
         if (set_qwizard_data_b) {
            qw.questions_cards[i_question].feedbacks[i_choice] = response;
         }
      }
   }
   new_htm += feedback_divs.join ('\n');
   new_htm += '</div>\n';
   if (debug[2] || debug[12]) {
      console.log ('[process_textentry] new_htm: ', new_htm);
   }
   return new_htm;
}
function process_hangman (i_qwiz, i_question, htm, opening_tags) {
   var hangman_labeled_diagram_f = htm.indexOf ('hangman_img_wrapper') != -1;
   var question_text = htm;
   var c_pos = qqc.opening_tag_shortcode_pos ('([c*]|[c])', htm);
   if (c_pos < htm.length) {
      question_text = htm.substr (0, c_pos);
   } else {
      errmsgs.push (T ('Did not get [c] or [c*] (hangman answer) with [hangman]') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
      c_pos = 0;
   }
   if (qwizdata[i_qwiz].qrecord_id) {
      if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
         var q_and_a_text = qqc.remove_tags_eols (question_text);
         q_and_a_text = q_and_a_text.replace (/\[hangman[^\]]*\]/g, '_________');
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (qqc.remove_tags_eols (q_and_a_text));
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (htm);
      } else {
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
      }
   }
   var hangman_max_hints    = default_hangman_max_hints;
   var hangman_type_letters = true;
   var m = htm.match (/\[hangman([^\]]*)\]/m);
   var attributes = '';
   if (m) {
      attributes = m[1];
      if (attributes) {
         attributes = qqc.replace_smart_quotes (attributes);
         var hints = get_attr (attributes, 'hints');
         if (hints) {
            if (hints.search (/[^0-9]/) == -1) {
               hangman_max_hints = parseInt (hints, 10);
            } else {
               errmsgs.push (T ('"hints" for [hangman] should be a number') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
            }
         }
         hangman_type_letters = ! (get_attr (attributes, 'type_letters') == 'false');
      }
   }
   var type                         = 'hangman';
   var labeled_diagram_opening_tags = opening_tags;
   if (hangman_labeled_diagram_f) {
      type                         = 'hangman_labeled_diagram';
      labeled_diagram_opening_tags = '';
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].type = type;
      qw.questions_cards[i_question].hangman_attributes = attributes;
      question_text = qqc.shortcodes_to_video_elements (question_text);
      qw.questions_cards[i_question].question_text = labeled_diagram_opening_tags + question_text;
      qw.questions_cards[i_question].choices = [];
      qw.questions_cards[i_question].correct_choice_fs = [];
      qw.questions_cards[i_question].feedbacks = [];
   }
   var question_htm = htm;
   if (c_pos) {
      question_htm = htm.substr (0, c_pos);
   }
   var m = question_htm.match (/\[hangman/g);
   var n_hangman = m.length;
   var remaining_htm = htm.substr (c_pos);
   var choice_start_tags = ['[c]', '[c*]'];
   var choice_next_tags  = ['[c]', '[c*]', '[x]', '<div class="qwizzled_question_bottom_border_title"'];
   var got_feedback_b = false;
   var feedback_divs = [];
   var hangman_re = new RegExp ('\\[hangman[^\\]]*\\]');
   var hangman_spans = [];
   var i_choice = 0;
   while (true) {
      var hangman_answer = '';
      var hangman_answer_length = 0;
      var choice_html = qqc.parse_html_block (remaining_htm, choice_start_tags,
                                              choice_next_tags);
      if (choice_html == 'NA') {
         break;
      }
      remaining_htm = remaining_htm.substr (choice_html.length);
      if (q.wordpress_page_f) {
         choice_html = cvt_feedback (choice_html);
      }
      var r = process_feedback_item (choice_html, i_qwiz, i_question, i_choice);
      choice_html  = r.choice_html;
      if (r.feedback_div) {
         got_feedback_b = true;
         feedback_divs.push (r.feedback_div);
         if (set_qwizard_data_b) {
            qw.questions_cards[i_question].feedbacks[i_choice]
                      = qqc.shortcodes_to_video_elements (r.feedback_item_html);
         }
         var r = process_feedback_item (choice_html, i_qwiz, i_question,
                                        i_choice);
         if (r.feedback_div) {
            errmsgs.push (T ('More than one feedback shortcode [f] given with hangman answer') + '.  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      } else {
         feedback_divs.push ('');
      }
      var hangman_match = choice_html.match (/\[c\*{0,1}\]([^\[]*)/m);
      if (hangman_match) {
         hangman_answer = hangman_match[1];
         hangman_answer = hangman_answer.replace (/<[^>]+>|\n|&nbsp;/g, '');
         hangman_answer = qqc.trim (hangman_answer);
         hangman_answer_length = hangman_answer.length;
         if (debug[0]) {
            console.log ('[process_hangman] hangman_answer:', hangman_answer);
         }
      }
      if (typeof qwizdata[i_qwiz].hangman[i_question] == 'undefined') {
         qwizdata[i_qwiz].hangman[i_question] = {};
      }
      if (! qwizdata[i_qwiz].hangman[i_question].hangman_answer) {
         qwizdata[i_qwiz].hangman[i_question].hangman_answer          = [];
         qwizdata[i_qwiz].hangman[i_question].hangman_final_entry     = [];
         qwizdata[i_qwiz].hangman[i_question].hangman_current_entry   = [];
         qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars = [];
         qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars_before_hint
                                                                      = [];
         qwizdata[i_qwiz].hangman[i_question].hangman_n_hints         = [];
      }
      if (i_choice == 0) {
         qwizdata[i_qwiz].hangman[i_question].n_hangman               = n_hangman;
         qwizdata[i_qwiz].hangman[i_question].hangman_max_hints       = hangman_max_hints;
         qwizdata[i_qwiz].hangman[i_question].hangman_type_letters    = hangman_type_letters;
         qwizdata[i_qwiz].hangman[i_question].n_hangman_done          = 0;
         qwizdata[i_qwiz].hangman[i_question].n_hangman_correct       = 0;
      }
      qwizdata[i_qwiz].hangman[i_question].hangman_answer[i_choice] = hangman_answer;
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].choices[i_choice] = hangman_answer;
         qw.questions_cards[i_question].correct_choice_fs[i_choice] = 1;
      }
      qwizdata[i_qwiz].hangman[i_question].hangman_n_hints[i_choice] = 0;
      var hangman_final_entry = qqc.create_hangman_entry (hangman_answer);
      qwizdata[i_qwiz].hangman[i_question].hangman_final_entry[i_choice] = hangman_final_entry;
      if (! feedback_divs[i_choice]) {
         var response = q.canned_feedback (true);
         feedback_divs[i_choice] = create_feedback_div_html (i_qwiz, i_question, i_choice, response);
         if (set_qwizard_data_b) {
            qw.questions_cards[i_question].feedbacks[i_choice] = response;
         }
      }
      var input_value = new Array (hangman_answer_length).join ('&ensp;');
      var input_focus = q.qwizard_b ? ' onfocus="qwizard.update_hangman_options_menu_choice (this, ' + i_choice + ')"' : '';
      var disabled        = '';
      var disabled_class  = '';
      if (q.qwizard_b && hangman_answer == 'placeholder') {
         disabled       = ' disabled';
         disabled_class = ' qwiz_button_disabled';
      }
      var hangman_span =  '<span class="qwiz_hangman qwiz_hangman_c' + i_choice + '" onkeyup="' + qname + '.hangman_show (this, true)" onmouseenter="' + qname + '.hangman_show (this)" onmouseleave="' + qname + '.hangman_hide (this)">'
                        +    '<span class="hangman_current_entry hangman_entry">'
                        +    '</span>'
                        +    '<input type="text" oninput="' + qname + '.hangman_keyup (this, event,\' ' + input_value + '\', ' + i_qwiz + ', ' + i_question + ', ' + i_choice + ')" onblur="' + qname + '.hangman_hide (this.parentElement)"' + input_focus + ' />';
      if (hangman_max_hints && qwizdata[i_qwiz].repeat_incorrect_b) {
         var title;
         if (hangman_max_hints < hangman_answer.replace (/[^a-z0-9]/i, '').length) {
            if (hangman_max_hints == 1) {
               title = ' title="' + T ('You can get one hint letter, but your answer will count as incorrect') + '"';
            } else {
               title = ' title="' + T ('You can get %s hint letters, but your answer will count as incorrect') + '"';
               title = title.replace ('%s', qqc.number_to_word (hangman_max_hints));
            }
         } else {
            title = ' title="' + T ('You can get hints, but your answer will count as incorrect') + '"';
         }
         hangman_span  +=     '<button id="hangman_hint-qwiz' + i_qwiz + '-q' + i_question + '-c' + i_choice + '" class="qwiz_button hangman_hint' + disabled_class + '" onmouseenter="' + qname + '.hangman_show (this.parentElement)" onclick="' + qname + '.hangman_hint (' + i_qwiz + ', ' + i_question + ', ' + i_choice + ')"' + title + disabled + '>'
                        +        T ('Hint')
                        +    '</button>\n';
      }
      if (hangman_type_letters && ! q.qwizard_b
                       && (! hangman_labeled_diagram_f
                             || (hangman_labeled_diagram_f && i_choice == 0))) {
         hangman_span  +=    '<span class="hangman_type_letters">'
                        +    '</span>';
      }
      hangman_span     +=    '<span class="hangman_status">'
                        +    '</span>'
                        + '</span>';
      if (q.qwizard_b && ! hangman_labeled_diagram_f) {
         hangman_spans.push (hangman_span);
      } else {
         question_htm = question_htm.replace (hangman_re, hangman_span);
      }
      i_choice++;
   }
   question_htm = question_htm.replace (/\[(<code><\/code>)*q[^\]]*\]/, '');
   if (i_choice != n_hangman) {
      errmsgs.push ('Number of [hangman] shortcodes does not match number of hangman words [c].  qwiz: ' + (1 + i_qwiz) + ', ' + T ('question') + ' ' + (1 + i_question));
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].n_choices = n_hangman;
   }
   var new_htm;
   if (q.qwizard_b && ! hangman_labeled_diagram_f) {
      new_htm = create_hangman_textentry_editable_divs (i_qwiz, i_question,
                                                        labeled_diagram_opening_tags, hangman_spans,
                                                        'hangman', hangman_re,
                                                        question_htm);
   } else {
      if (q.qwizard_b) {
         var canvas_pos = question_htm.search (/<div[^>]+qwizzled_canvas/);
         if (canvas_pos != -1) {
            var hangman_fields_pos = question_htm.search (/<div[^>]+hangman_labeled_diagram_fields/);
            if (hangman_fields_pos != 1) {
               var hangman_fields = qqc.find_matching_block (question_htm.substr (hangman_fields_pos));
               question_htm = question_htm.replace (hangman_fields, '');
               question_htm = question_htm.substr (0, canvas_pos) + hangman_fields
                              + question_htm.substr (canvas_pos);
            }
         }
      }
      var bg_img_style = create_bg_img_style (i_qwiz, i_question);
      new_htm =   '<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq"' + bg_img_style + '>\n'
                +    labeled_diagram_opening_tags + question_htm;
   }
   if (debug[0]) {
      console.log ('[process_hangman] new_htm:', new_htm);
   }
   new_htm += '<div style="clear: both;"></div>\n';
   new_htm += feedback_divs.join ('\n');
   new_htm += '<div class="qwiz_hangman_msg"></div>';
   new_htm += '</div>';
   return new_htm;
}
var first_decode_err_f = true;
function cvt_feedback (htm, f_pos) {
   var before_c;
   var after_c;
   const no_c = typeof f_pos != 'undefined';
   if (no_c) {
      before_c = htm.substr (0, f_pos);
      after_c =  htm.substr (f_pos);
   } else {
      c_pos = htm.indexOf ('[c]');
      if (c_pos == -1) {
         return htm;
      }
      before_c = htm.substr (0, c_pos);
      after_c  = htm.substr (c_pos + 3);
   }
   f_pos = after_c.indexOf ('[f]');
   if (f_pos == -1) {
      f_pos = after_c.indexOf ('[fx]');
   }
   var after_f;
   var f_cvt;
   var f = '';
   if (f_pos != -1) {
      after_f = after_c.substr (f_pos + 3);
      after_c = after_c.substr (0, f_pos);
      while (true) {
         f_pos = after_f.indexOf ('[f]');
         if (f_pos == -1) {
            f_cvt = after_f;
         } else {
            f_cvt = after_f.substr (0, f_pos);
            after_f  = after_f.substr (f_pos + 3);
         }
         var r = feedback_decode (f_cvt);
         var more_f = r.c;
         if (more_f) {
            f += '[f]' + more_f;
         }
         if (f_pos == -1) {
            break;
         }
      }
   }
   var r = feedback_decode (after_c);
   var sc = '';
   var c  = '';
   if (! no_c) {
      var sc = '[c' + r.star + ']';
      var c = r.c;
   }
   /*
   if (first_decode_err_f) {
      c = '[Sorry, missing question data. Please contact <a href="mailto: support@qwizcards.com">support@qwizcards.com</a>]';
      first_decode_err_f = false;
   }
   console.log ('[cvt_feedback] unable to convert:', after_c);
   */
   var c_htm = before_c + sc + c + f;
   return c_htm;
}
function feedback_decode (s) {
   var tag_pos = s.indexOf ('[Qq]');
   var s_to_decode;
   var s_rest = '';
   if (tag_pos != -1) {
      s_to_decode = s.substr (0, tag_pos);
      s_rest      = s.substr (tag_pos + 4);
   } else {
      s_to_decode = s;
   }
   if (debug[2]) {
      console.log ('[feedback_decode] s_to_decode:', s_to_decode);
   }
   var star = '';
   var decoded_s = '';
   var fparts = s_to_decode.split (/<[^>]+>/);
   if (fparts.length > 1) {
      var splits = s_to_decode.match (/<[^>]+>/g)
      var decoded_parts = [];
      var n_splits = splits.length;
      var first_f = true;
      for (var i=0; i<n_splits; i++) {
         var fpart = fparts[i];
         if (fpart != '') {
            if (first_f) {
               first_f = false;
               if (/ /.test (fpart)) {
                  star = '*';
               }
            }
            try {
               decoded_parts.push (Base64.decode (fpart));
            } catch (e) {};
         }
         if (splits[i].indexOf ('qcodeq') != -1) {
            reinit_highlighting_f = true;
            splits[i] = splits[i].replace ('qcodeq', 'code');
         }
         decoded_parts.push (splits[i]);
      }
      try {
         var fpart = fparts[n_splits];
         if (first_f) {
            if (/ /.test (fpart)) {
               star = '*';
            }
         }
         decoded_parts.push (Base64.decode (fpart));
      } catch (e) {};
      decoded_s = decoded_parts.join ('');
   } else {
      if (/ /.test (s_to_decode)) {
         star = '*';
      }
      try {
         decoded_s = Base64.decode (s_to_decode);
      } catch (e) {};
   }
   decoded_s += s_rest;
   if (debug[2]) {
      console.log ('[feedback_decode] decoded_s:', decoded_s);
   }
   return {c: decoded_s, star: star};
}
this.hangman_show = function (qwiz_hangman_el, keyup_f) {
   if (suppress_hangman_hint_b) {
      suppress_hangman_hint_b = false;
      return false;
   }
   var $qwiz_hangman = $ (qwiz_hangman_el);
   $qwiz_hangman.find ('span.hangman_type_letters').hide ();
   clearTimeout (qwiz_hangman_el.i_hint_timeout);
   if (keyup_f) {
      var hide_hint_button = function () {
         $qwiz_hangman.find ('button.hangman_hint, span.hangman_status').fadeOut (1000);
      }
      qwiz_hangman_el.i_hint_timeout = setTimeout (hide_hint_button, 750);
   }
   if (! qwiz_hangman_el.done_f) {
      $qwiz_hangman.find ('button.hangman_hint').show ();
      var $hangman_status =  $qwiz_hangman.find ('span.hangman_status')
      if ($hangman_status.html ()) {
         $hangman_status.show ();
      }
   }
}
this.hangman_hide = function (qwiz_hangman_el) {
   var $qwiz_hangman = $ (qwiz_hangman_el);
   var hide_hint_button = function () {
      $qwiz_hangman.find ('button.hangman_hint, span.hangman_status').fadeOut (500);
   }
   qwiz_hangman_el.i_hint_timeout = setTimeout (hide_hint_button, 500);
}
function create_hangman_textentry_editable_divs (i_qwiz, i_question,
                                                 opening_tags, span_inputs,
                                                 hangman_textentry, re, htm) {
   htm = qqc.shortcodes_to_video_elements (htm);
   var new_htm = [];
   var bg_img_style = create_bg_img_style (i_qwiz, i_question);
   new_htm.push ('<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq qwizard_line_height"' + bg_img_style + '>\n');
   if (typeof qwizdata[i_qwiz].parts_htm[i_question] == 'undefined') {
      qwizdata[i_qwiz].parts_htm[i_question] = []
   }
   var t_pos = 0;
   var t_block;
   var i_part = 1;
   var htm_length = htm.length;
   while (true) {
      var remaining_htm = htm.substr (t_pos);
      var ii_pos = remaining_htm.search (re);
      if (ii_pos == -1) {
         break;
      }
      t_pos = t_pos + ii_pos;
      var part_htm = remaining_htm.substr (0, ii_pos);
      if (i_part == 1) {
         part_htm = opening_tags + part_htm;
      }
      part_htm = qqc.remove_unmatched_tag (part_htm, i_part == 1);
      if (part_htm.search (/\S/) == -1) {
         part_htm = '&nbsp;';
      }
      qwizdata[i_qwiz].parts_htm[i_question][i_part] = part_htm;
      var m = remaining_htm.match (re);
      if (debug[9]) {
         console.log ('[create_hangman_textentry_editable_divs] m[0]:', m[0]);
      }
      t_pos += m[0].length;
      new_htm.push ('<div class="qwiz-question qwiz-question-' + hangman_textentry + ' qwiz-parts qwiz-part' + i_part + ' qwiz-inline qwiz_editable" data-i_part="' + i_part + '">\n');
      new_htm.push (   part_htm);
      new_htm.push ('</div>');
      new_htm.push (span_inputs[i_part-1]);
      i_part++;
   }
   var part_htm = htm.substr (t_pos);
   part_htm = qqc.remove_unmatched_tag (part_htm, false, true);
   if (part_htm.search (/\S/) == -1) {
      part_htm = '&nbsp;';
   }
   qwizdata[i_qwiz].parts_htm[i_question][i_part] = part_htm;
   new_htm.push ('<div class="qwiz-question qwiz-question-' + hangman_textentry + ' qwiz-parts qwiz-part' + i_part + ' qwiz-inline qwiz_editable" data-i_part="' + i_part + '">\n');
   new_htm.push (   part_htm);
   new_htm.push ('</div>');
   return new_htm.join ('');
}
this.hangman_keyup = function (input_el, event, default_value, i_qwiz, i_question, i_choice) {
   if (qwizdata[i_qwiz].user_question_number == 1
               && (q.no_intro_b[i_qwiz] || qwizdata[i_qwiz].n_questions == 1)) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   var value = input_el.value;
   input_el.value = default_value;
   if (debug[9]) {
      console.log ('[hangman_keyup] value.charCodeAt:', value.charCodeAt (0), value.charCodeAt (1), value.charCodeAt (2), value.charCodeAt (3));
   }
   var keychars = value.replace (/[^a-z0-9]/gi, '');
   if (keychars == '') {
      return false;
   }
   keychars = keychars.toLowerCase ();
   if (debug[9]) {
      console.log ('[hangman_keyup] keychars:', keychars);
   }
   var current_entry = qwizdata[i_qwiz].hangman[i_question].hangman_current_entry[i_choice];
   var final_entry   = qwizdata[i_qwiz].hangman[i_question].hangman_final_entry[i_choice];
   var done_f;
   var n_chars = keychars.length;
   for (var i=0; i<n_chars; i++) {
      var keychar = keychars[i];
      var done_f = update_hangman_input (keychar, current_entry, final_entry,
                                          i_qwiz, i_question, i_choice, input_el);
      if (done_f) {
         break;
      }
   }
   if (! done_f) {
      $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' div.qwiz-feedback').hide ();
      $ (input_el).parents ('div.qwizq').find('div.qwiz_hangman_msg').hide ();
      if (qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars[i_choice]) {
         var hangman_incorrect_chars_before_hint
                = qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars_before_hint[i_choice];
         var hangman_incorrect_chars_display
            = qqc.create_hangman_incorrect_chars_display (qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars[i_choice], hangman_incorrect_chars_before_hint, true);
         $ (input_el).parents ('span.qwiz_hangman.qwiz_hangman_c' + i_choice).find ('span.hangman_status').html (hangman_incorrect_chars_display).show ();
      }
   }
   return true;
}
function update_hangman_input (keychar, current_entry, final_entry,
                               i_qwiz, i_question, i_choice, input_el, hint_f) {
   var done_f = false;
   var good_char_b = false;
   var i_pos = -1;
   var re = new RegExp ('u>' + keychar + '</u', 'i');
   while (true) {
      var m = final_entry.substr (i_pos + 1).match (re);
      if (! m ) break;
      i_pos += m.index + 2;
      current_entry = qqc.setCharAt (current_entry, i_pos + 1, m[0][2]);
      good_char_b = true;
   }
   if (debug[9]) {
      console.log ('[update_hangman_input] keychar:', keychar, ', good_char_b:', good_char_b);
   }
   var hangman = qwizdata[i_qwiz].hangman[i_question];
   var hangman_incorrect_chars = hangman.hangman_incorrect_chars[i_choice];
   var done_f     = false;;
   var all_done_f = false;;
   if (good_char_b) {
      hangman.hangman_current_entry[i_choice] = current_entry;
      var local_current_entry = current_entry.replace (/\t/g, '&ensp;');
      $ (input_el).parents ('span.qwiz_hangman.qwiz_hangman_c' + i_choice).find ('span.hangman_current_entry').html (local_current_entry);
      done_f = current_entry.indexOf ('<u>\t</u>') == -1;
      if (done_f) {
         hangman.n_hangman_done++;
         all_done_f = hangman.n_hangman_done == hangman.n_hangman;
      }
   } else {
      keychar = keychar.toLowerCase ();
      if (hangman_incorrect_chars.indexOf (keychar) == -1) {
         hangman_incorrect_chars += keychar;
         if (hangman_incorrect_chars.length > 6) {
            done_f = true;
            hangman.n_hangman_done++;
            all_done_f = hangman.n_hangman_done == hangman.n_hangman;
         }
      }
      hangman.hangman_incorrect_chars[i_choice] = hangman_incorrect_chars;
      if (debug[9]) {
         console.log ('[hangman_keyup] hangman_incorrect_chars:', hangman_incorrect_chars);
      }
   }
   if (done_f) {
      $ (input_el).on ('mousedown', function (e) {
                                       e.preventDefault ();
                                    });
      input_el.parentElement.done_f = true;
      const hangman_n_hints = hangman.hangman_n_hints[i_choice];
      var correct_b = hangman_incorrect_chars.length <= 6
                                                        && hangman_n_hints == 0;
      if (correct_b) {
         hangman.n_hangman_correct++;
         if (hangman.n_hangman > 1) {
            $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' div.qwiz-feedback').hide ();
            $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' div.qwiz_hangman_msg').hide ();
         }
         $ ('#qwiz' + i_qwiz + '-q' + i_question + '-a' + i_choice).show ();
         if (all_done_f && hangman.n_hangman_correct == hangman.n_hangman ) {
            if (! q.qwizard_b) {
               qwizdata[i_qwiz].n_correct++;
               if (qwizdata[i_qwiz].n_qs_done) {
                  qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
               }
            }
         }
      } else {
         if (hangman.n_hangman > 1) {
            $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' div.qwiz-feedback').hide ();
         }
         var msg = '<hr />';
         if (qwizdata[i_qwiz].repeat_incorrect_b) {
            const hangman_correct_chars = current_entry.match (/<u>[^\t]<\/u>/g);
            if (hangman_correct_chars) {
               const n_correct = hangman_correct_chars.length - hangman_n_hints;
               if (hangman_correct_chars.length == 1) {
                  msg+= T ('You got one letter correct') + '.&nbsp; ';
               } else {
                  msg+= T ('You got %s letters correct') + '.&nbsp; ';
                  msg = msg.replace ('%s', qqc.number_to_word (hangman_correct_chars.length));
               }
               if (hangman_n_hints == 1) {
                  msg += T ('You used one hint') + '.&nbsp; ';
               } else if (hangman_n_hints > 1) {
                  msg += T ('You used %s hints') + '.&nbsp; ';
                  msg = msg.replace ('%s', qqc.number_to_word (hangman_n_hints));
               }
               if (hangman_incorrect_chars.length) {
                  msg += T ('Incorrect letters') + ': ' + hangman_incorrect_chars + '.&nbsp; ' + T ('Pick different letters when you see this word again.');
               }
            } else {
               msg = '<hr />' + T ('Sorry, you entered more than six incorrect letters') + ': ' + hangman_incorrect_chars + '.&nbsp; ' + T ('Choose different letters when you see this word again!');
            }
         } else {
            msg = '<hr />' + T ('Sorry, you entered more than six incorrect letters.');
         }
         $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' div.qwiz_hangman_msg').html (msg).show ();
         if (all_done_f && hangman.n_hangman_correct != hangman.n_hangman ) {
            if (! q.qwizard_b) {
               qwizdata[i_qwiz].n_incorrect++;
            }
         }
      }
      if (all_done_f) {
         if (! q.qwizard_b) {
            qwizdata[i_qwiz].answered_correctly[i_question]
                      = hangman.n_hangman == hangman.n_hangman_correct ? 1 : -1;
         }
         input_el.blur ();
         if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
            var hangman_answer = hangman.hangman_answer[i_choice];
            var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                        q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                        i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                        unit:          qwizdata[i_qwiz].unit[i_question],
                        type:          'hangman',
                        response:      hangman_answer,
                        correct_b:     correct_b ? 1 : '',
                        confirm:       'js'};
            record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
         }
         update_topic_statistics (i_qwiz, i_question, correct_b);
         update_progress_show_next (i_qwiz);
      } else {
         var first_f = true;
         for (var i_choice=0; i_choice<hangman.n_hangman; i_choice++) {
            if (hangman.hangman_current_entry[i_choice]
                                     != hangman.hangman_final_entry[i_choice]
                     && hangman.hangman_incorrect_chars[i_choice].length <= 6) {
               var $qwiz_hangman = $ ('div#qwiz' + i_qwiz + '-q' + i_question + ' span.qwiz_hangman.qwiz_hangman_c' + i_choice);
               if (first_f) {
                  $qwiz_hangman.find ('input').focus ();
                  first_f = false;
               } else {
                  $qwiz_hangman.find ('span.hangman_type_letters').show ();
               }
            }
         }
      }
      done_f = true;
   }
   return done_f;
}
this.hangman_hint = function (i_qwiz, i_question, i_choice) {
   qwizdata[i_qwiz].hangman[i_question].hangman_n_hints[i_choice]++;
   if (qwizdata[i_qwiz].hangman[i_question].hangman_n_hints[i_choice] > qwizdata[i_qwiz].hangman[i_question].hangman_max_hints) {
      return false;
   } else if (qwizdata[i_qwiz].hangman[i_question].hangman_n_hints[i_choice] == qwizdata[i_qwiz].hangman[i_question].hangman_max_hints) {
      $ ('#hangman_hint-qwiz' + i_qwiz + '-q' + i_question + '-c' + i_choice)
         .attr ('disabled', true)
         .addClass ('qwiz_button_disabled');
   } else {
      qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars_before_hint[i_choice]
                  = qwizdata[i_qwiz].hangman[i_question].hangman_incorrect_chars[i_choice].length;
   }
   var hangman_answer = qwizdata[i_qwiz].hangman[i_question].hangman_answer[i_choice];
   var current_entry = qwizdata[i_qwiz].hangman[i_question].hangman_current_entry[i_choice];
   var matches = current_entry.match (/<u>.<\/u>/g);
   var i_pos = matches.indexOf ('<u>\t</u>');
   if (debug[9]) {
      console.log ('[hangman_hint] matches:', matches);
      console.log ('[hangman_hint] i_pos:', i_pos);
   }
   if (i_pos != -1) {
      var final_entry = qwizdata[i_qwiz].hangman[i_question].hangman_final_entry[i_choice];
      matches = final_entry.match (/<u>.<\/u>/g);
      var hint_char = matches[i_pos][3];
      var qwizq_id = 'qwiz' + i_qwiz + '-q' + i_question;
      var $qwizq = $ ('div#' + qwizq_id);
      var $hangman_input = $qwizq.find ('span.qwiz_hangman.qwiz_hangman_c' + i_choice + ' input');
      var input_el = $hangman_input[0];
      update_hangman_input (hint_char, current_entry, final_entry,
                            i_qwiz, i_question, i_choice, input_el, true);
      $hangman_input.focus ();
   }
}
function single_char_textentry_keyup (e) {
   var input_el = e.target;
   if (debug[6]) {
      console.log ('[single_char_textentry_keyup] input_el:', input_el);
   }
   var value = input_el.value;
   if (value.search (/[a-z0-9]/i) == -1) {
      input_el.value = '';
      return false;
   }
   var id = input_el.id;
   var i_qwiz = id.match (/qwiz([0-9]+)/)[1];
   if (debug[6]) {
      console.log ('[single_char_textentry_keyup] i_qwiz:', i_qwiz);
   }
   if (qwizdata[i_qwiz].user_question_number == 1) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   q.textentry_check_answer (i_qwiz, true);
}
function process_feedback_item (choice_html, i_qwiz, i_question, i_choice) {
   var feedback_start_tags = ['[f]', '[fx]'];
   var feedback_next_tags  = ['[f]', '[fx]', '[x]'];
   if (debug[2]) {
      console.log ('[process_feedback_item] choice_html: ', choice_html);
   }
   var feedback_item_html = qqc.parse_html_block (choice_html, feedback_start_tags,
                                                  feedback_next_tags);
   var feedback_div = '';
   var fx_b;
   if (feedback_item_html != 'NA') {
      choice_html = choice_html.replace (feedback_item_html, '');
      if (debug[2]) {
         console.log ('[process_feedback_item] feedback_item_html: ', feedback_item_html);
      }
      fx_b = feedback_item_html.indexOf ('[fx]') != -1;
      feedback_item_html = feedback_item_html.replace (/\[fx{0,1}\]/, '');
      feedback_div = create_feedback_div_html (i_qwiz, i_question, i_choice,
                                               feedback_item_html);
   } else {
      feedback_item_html = '';
   }
   if (debug[2]) {
      console.log ('[process_feedback_item] feedback_div:', feedback_div);
      console.log ('[process_feedback_item] choice_html: ', choice_html);
      console.log ('[process_feedback_item] fx_b:        ', fx_b);
   }
   return {'feedback_div':       feedback_div,
           'choice_html':        choice_html,
           'feedback_item_html': feedback_item_html,
           'fx_b':               fx_b};
}
function init_hotspot_image_canvas (i_qwiz, i_question, $hotspot_image_stack) {
   const $canvas   = $hotspot_image_stack.find ('canvas.layer0_edited');
   const canvas_el = $canvas[0];
   const ctx = canvas_el.getContext ('2d');
   qwizdata[i_qwiz].ctx[i_question] = ctx;
   const $edited_img   = $hotspot_image_stack.find ('img.layer0_edited');
   const edited_img_el = $edited_img[0];
   if (edited_img_el.complete) {
      ctx.drawImage (edited_img_el, 0, 0, canvas_el.width, canvas_el.height);
   } else {
      const img = new Image ();
      img.src = edited_img_el.src;
      img.onload = function () {
         ctx.drawImage (img, 0, 0, canvas_el.width, canvas_el.height);
      }
   }
}
this.create_hotspot_image = function (i_qwiz, i_question, current_hotspot_no,
                                      $hotspot_image_stack, ctx) {
   if (debug[0]) {
      var start_msec = new Date ().getTime ();
   }
   const i_width   = ctx.canvas.width;
   const i_height  = ctx.canvas.height;
   const imageData = ctx.getImageData(0, 0, i_width, i_height);
   const data      = imageData.data;
   const p32       = new Uint32Array (data.buffer);
   const canvas_class = 'qwiz_tmp_hotspot-only_canvas-qwiz' + i_qwiz;
   var $hotspot_only_canvas = $ ('canvas.' + canvas_class);
   var erase_f = true;
   if (! $hotspot_only_canvas.length) {
      erase_f = false;
      $ ('body').append ('<canvas class="' + canvas_class + ' qwiz_display_none" width="' + i_width + '" height="' + i_height + '"></canvas>');
      $hotspot_only_canvas = $ ('canvas.' + canvas_class);
   }
   const hotspot_only_canvas_el  = $hotspot_only_canvas[0];
   var   hotspot_only_ctx        = hotspot_only_canvas_el.getContext ('2d');
   const find_the_dot = qwizdata[i_qwiz].find_the_dot[i_question];
   if (find_the_dot) {
      find_the_dot.hotspot_only_new_f = false;
      $hotspot_only_canvas.attr ('width', i_width);
      $hotspot_only_canvas.attr ('height', i_height);
      hotspot_only_ctx.clearRect (0, 0, i_width, i_height);
      hotspot_only_ctx.beginPath ();
      var [r, g, b] = qqc.hex_to_rgb (find_the_dot.background_color.substr (1));
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
      hotspot_only_ctx.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      hotspot_only_ctx.lineWidth   = 2;
      hotspot_only_ctx.arc (1 + find_the_dot.ix, 1 + find_the_dot.iy, 10, 0, 2*Math.PI);
      hotspot_only_ctx.stroke ();
      const $hotspot_label = $hotspot_image_stack.find ('div.qwiz_hotspot_label.qwiz_hotspot' + current_hotspot_no);
      $hotspot_label.css ({left: 8 + find_the_dot.ix, top: 8 + find_the_dot.iy});
   } else {
      if (erase_f) {
         hotspot_only_ctx.clearRect (0, 0, i_width, i_height);
         hotspot_only_ctx.beginPath ();
      }
      const ii = hotspot_indexof (qwizdata[i_qwiz].hotspot_nos[i_question], current_hotspot_no);
      const ver2_f = qwizdata[i_qwiz].hotspot_ver2_f[i_question];
      const [cur_r, cur_g, cur_b] = q.hotspot_color_from_no (current_hotspot_no, ver2_f);
      if (! ver2_f) {
         if (current_hotspot_no == 11) {
            var [r1, g1, b1] = q.hotspot_color_from_no (1);
         } else if (current_hotspot_no == 13) {
            var [r1, g1, b1] = q.hotspot_color_from_no (3);
         }
      }
      var   highlighted_f = false;
      const $qwizq            = $ ('div#qwiz' + i_qwiz + '-q' + i_question);
      const $label1           = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot1');
      var   border_hotspot_no = $label1.attr ('data-border_all');
      var   $label;
      if (! border_hotspot_no) {
         border_hotspot_no = current_hotspot_no;
      }
      $label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + border_hotspot_no);
      const border_width = $label.data ('border_width');
      if (border_width && border_width != '0') {
         highlighted_f = true;
      }
      var   highlight_hotspot_no = $label1.attr ('data-highlight_all');
      if (! highlight_hotspot_no) {
         highlight_hotspot_no = current_hotspot_no;
      }
      $label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + highlight_hotspot_no);
      if (! highlighted_f) {
         const highlight_brightness = $label.data ('highlight_brightness');
         if (highlight_brightness && highlight_brightness != '0') {
            highlighted_f = true;
         }
      }
      if (! highlighted_f) {
         const highlight_tint = $label.data ('highlight_tint');
         highlighted_f = !! highlight_tint;
      }
      if (! qwizdata[i_qwiz].hotspot_highlighted_fs[i_question]) {
         qwizdata[i_qwiz].hotspot_highlighted_fs[i_question] = {};
      }
      qwizdata[i_qwiz].hotspot_highlighted_fs[i_question][current_hotspot_no] = highlighted_f;
      const n_pixels = i_width * i_height;
      if (highlighted_f) {
         const $style_layer_img = $qwizq.find ('img.qwiz_style_layer');
         const style_layer_img_el = $style_layer_img[0];
         if (style_layer_img_el.complete) {
            hotspot_only_ctx.drawImage (style_layer_img_el, 0, 0, i_width, i_height);
         } else {
            const img = new Image ();
            img.src = style_layer_img_el.src;
            img.onload = function () {
               hotspot_only_ctx.drawImage (img, 0, 0, i_width, i_height);
            }
         }
         var hotspot_only_imageData  = hotspot_only_ctx.getImageData(0, 0, i_width, i_height);
         var hotspot_only_image_data = hotspot_only_imageData.data;
         var hotspot_only_p32        = new Uint32Array (hotspot_only_image_data.buffer);
         for (let i=0; i<n_pixels; i++) {
            let idx = i << 2;
            const a = data[idx + 3];
            if (a == q.hotspot_alpha_value) {
               const r = data[idx];
               const g = data[idx + 1];
               const b = data[idx + 2];
               if (! rgb_same (r, cur_r) || ! rgb_same (g, cur_g) || ! rgb_same (b, cur_b)) {
                  hotspot_only_p32[i] = 0;
               }
            } else {
               hotspot_only_p32[i] = 0;
            }
         }
      } else {
         var hotspot_only_imageData  = hotspot_only_ctx.getImageData(0, 0, i_width, i_height);
         var hotspot_only_image_data = hotspot_only_imageData.data;
         var hotspot_only_p32        = new Uint32Array (hotspot_only_image_data.buffer);
         const gray32 = (192 << 24) + (128 << 16) + (128 << 8) + 128
         for (let i=0; i<n_pixels; i++) {
            let idx = i << 2;
            const a = data[idx + 3];
            if (a == q.hotspot_alpha_value) {
               const r = data[idx];
               const g = data[idx + 1];
               const b = data[idx + 2];
               if (rgb_same (r, cur_r) && rgb_same (g, cur_g) && rgb_same (b, cur_b)) {
                  if (! ver2_f) {
                     if (current_hotspot_no == 11 || current_hotspot_no == 13) {
                        if (rgb_same (r, r1) && rgb_same (g, g1) && rgb_same (b, b1)) {
                           hotspot_only_p32[i] = gray32;
                        }
                     }
                  }
               } else {
                  hotspot_only_p32[i] = gray32;
               }
            } else {
               hotspot_only_p32[i] = gray32;
            }
         }
      }
      hotspot_only_ctx.putImageData (hotspot_only_imageData, 0, 0);
   }
   const dataURL = hotspot_only_canvas_el.toDataURL ();
   if (debug[0]) {
      console.log ('[create_hotspot_image] dataURL:', dataURL);
      console.log ('[create_hotspot_image] msec:', new Date ().getTime () - start_msec);
   }
   return dataURL;
}
function process_hotspot_diagram (i_qwiz, i_question, question_htm, opening_tags,
                                  qwizard_process_dataset_questions_f) {
   if (debug[0]) {
      console.log ('[process_hotspot_diagram] question_htm: ', question_htm);
   }
   var htm = [];
   htm.push ('<div id="qwiz' + i_qwiz + '-q' + i_question + '" class="qwizq hotspot_diagram">');
   const hotspot_image_pos = question_htm.indexOf ('<div class="hotspot_image_stack"');
   const editable = question_htm.substr (0, hotspot_image_pos);
   if (q.qwizard_b) {
      htm.push ('<div class="qwiz_editable qwiz-question">');
      htm.push (   opening_tags + editable);
      htm.push ('</div>');
      var hotspot_image_stack = question_htm.substr (hotspot_image_pos);
      var hotspot_image_src = '';
      var m = hotspot_image_stack.match (/<img class="qwiz_layer0[^_][^>]*>/);
      if (m) {
         var hotspot_image_tag = m[0];
         var m2 = hotspot_image_tag.match (/ src="([^"]*)"/);
         if (m2) {
            hotspot_image_src = m2[1];
         }
      }
      htm.push (hotspot_image_stack);
      htm.push ('<div style="clear: both;"></div>');
      htm.push ('<div class="hotspot_click_feedback hotspot_click_feedback_correct   qwiz_editable"></div>');
      htm.push ('<div class="hotspot_click_feedback hotspot_click_feedback_incorrect qwiz_editable"></div>');
   } else {
      htm.push (opening_tags + question_htm);
      const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
      if (! hotspot_user_interaction || hotspot_user_interaction != 'info_only') {
         htm.push ('<div style="clear: both;"></div>');
         htm.push ('<div class="hotspot_click_feedback"></div>');
         htm.push ('<div class="hotspot_label_query"></div>');
      }
   }
   htm.push ('</div>');
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].type              = 'hotspot_diagram';
      qw.questions_cards[i_question].question_text     = editable;
      qw.questions_cards[i_question].hotspot_image_src = hotspot_image_src;
      qw.questions_cards[i_question].canvas_el         = '';
   }
   htm = htm.join ('\n');
   if (debug[0]) {
      console.log ('[process_hotspot_diagram] htm:', htm);
   }
   if (! qwizdata[i_qwiz].hotspot_nos) {
      qwizdata[i_qwiz].hotspot_nos              = {};
      qwizdata[i_qwiz].hotspot_labels           = {};
      qwizdata[i_qwiz].hotspot_highlighted_fs   = {};
      qwizdata[i_qwiz].hotspot_ver2_f           = {};
      qwizdata[i_qwiz].n_hotspots_to_do         = {};
      qwizdata[i_qwiz].$hotspot_image_stack     = {};
      qwizdata[i_qwiz].hotspot_image_width      = {};
      qwizdata[i_qwiz].hotspot_image_height     = {};
      qwizdata[i_qwiz].spotmap                  = {};
      qwizdata[i_qwiz].spotmap_width            = {};
      qwizdata[i_qwiz].spotmap_height           = {};
      qwizdata[i_qwiz].sparsemap                = {};
      qwizdata[i_qwiz].n_hotspots               = {};
      qwizdata[i_qwiz].current_query_hotspot_no = {};
   }
   if (qwizdata[i_qwiz].qrecord_id) {
      if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
         var question_text_wo_tags = qqc.remove_tags_eols (editable);
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (question_text_wo_tags);
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (htm);
         if (debug[0]) {
            console.log ('[process_hotspot_diagram] qwizdata[i_qwiz].q_and_a_text[i_question]:', qwizdata[i_qwiz].q_and_a_text[i_question]);
            console.log ('[process_hotspot_diagram] qwizdata[i_qwiz].q_and_a_crc32[i_question]:', qwizdata[i_qwiz].q_and_a_crc32[i_question]);
         }
      } else {
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
      }
   }
   if (qwizard_process_dataset_questions_f) {
      qw.questions_cards[i_question].question_html     = editable;
      var m = question_htm.match (/qwiz_layer0[^"]+"\s+src="([^"]+)/);
      if (m) {
         qw.questions_cards[i_question].image_url = m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find image) question_htm:', question_htm);
         qw.questions_cards[i_question].image_url = 'NA';
      }
      var hotspot_labels      = [];
      var feedback_corrects   = [];
      var feedback_incorrects = [];
      const re = /<div\s*(id=""){0,1}\s*class="qwiz_hotspot_label /;
      const correct_pat   = '<span class="hotspot_label_feedback_correct_content">';
      const incorrect_pat = '<span class="hotspot_label_feedback_incorrect_content">';
      var remaining_htm = question_htm;
      while (true) {
         const i_pos = remaining_htm.search (re);
         if (i_pos == -1) {
            break;
         }
         const hotspot_label_div = qqc.find_matching_block (remaining_htm.substr (i_pos));
         var hotspot_label;
         var feedback_correct;
         var feedback_incorrect;
         if (hotspot_label_div.indexOf ('qwiz_hotspot_deleted') != -1) {
            hotspot_label = '[deleted]';
            feedback_correct = '';
            feedback_incorrect = '';
         } else {
            const feedback_pos = hotspot_label_div.search ('<div class="hotspot_label_feedback');
            hotspot_label = hotspot_label_div.substr (0, feedback_pos);
            hotspot_label = hotspot_label.replace (/<div[^>]+>/, '');
            hotspot_label = hotspot_label.replace (/<div[^>]+>/, '');
            hotspot_label = hotspot_label.replace (/<\/div>[^]*/, '');
            const feedback_div          = hotspot_label_div.substr (feedback_pos);
            const feedback_correct_pos  = feedback_div.search (correct_pat);
            const feedback_correct_span = qqc.find_matching_block (feedback_div.substr (feedback_correct_pos));
            feedback_correct            = feedback_correct_span.substr (53);
            feedback_correct            = feedback_correct.replace (/<\/span>$/, '');
            const feedback_incorrect_span_pos = feedback_div.search (incorrect_pat);
            var   feedback_incorrect_span     = feedback_div.substr (feedback_incorrect_span_pos);
            feedback_incorrect_span           = qqc.find_matching_block (feedback_incorrect_span);
            feedback_incorrect                = feedback_incorrect_span.substr (55);
            feedback_incorrect                = feedback_incorrect.replace (/<\/span>$/, '');
         }
         hotspot_labels.push (hotspot_label);
         feedback_corrects.push (feedback_correct);
         feedback_incorrects.push (feedback_incorrect);
         remaining_htm = remaining_htm.substr (i_pos + hotspot_label_div.length);
      }
      qw.questions_cards[i_question].hotspot_labels      = hotspot_labels;
      qw.questions_cards[i_question].feedback_corrects   = feedback_corrects;
      qw.questions_cards[i_question].feedback_incorrects = feedback_incorrects;
      m = question_htm.match (/<canvas.*?width="(\d+)/m);
      if (m) {
         qw.questions_cards[i_question].hotspot_image_width = m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find canvas width) question_htm:', question_htm);
         qw.questions_cards[i_question].hotspot_image_width  = 0;
      }
      m = question_htm.match (/<canvas.*?height="(\d+)/m);
      if (m) {
         qw.questions_cards[i_question].hotspot_image_height = m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find canvas height) question_htm:', question_htm);
         qw.questions_cards[i_question].hotspot_image_height = 0;
      }
      m = question_htm.match (/qwiz_spotmap_width="(\d+)/m);
      if (m) {
         qw.questions_cards[i_question].spotmap_width = m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find spotmap_width) question_htm:', question_htm);
         qw.questions_cards[i_question].spotmap_width = 0;
      }
      m = question_htm.match (/qwiz_spotmap_height="(\d+)/m);
      if (m) {
         qw.questions_cards[i_question].spotmap_height = m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find spotmap_height) question_htm:', question_htm);
         qw.questions_cards[i_question].spotmap_height = 0;
      }
      m = question_htm.match (/qwiz_sparsemap="(\d+)/m);
      if (m) {
         qw.questions_cards[i_question].sparsemap = m[1] == '1';
      } else {
         qw.questions_cards[i_question].sparsemap = false;
      }
      m = question_htm.match (/qwiz_spotmap="([^"]+)/m);
      if (m) {
         qw.questions_cards[i_question].spotmap= m[1];
      } else {
         console.log ('[process_hotspot_diagram] (did not find spotmap) question_htm:', question_htm);
         qw.questions_cards[i_question].spotmap= '';
      }
      m = question_htm.match (/img class="qwiz_style_layer[^"]+"\s+src="([^"]+)/);
      if (m) {
         var img_src = m[1];
         if (img_src.substr (0, 4) == 'blob') {
            const wait = 'wait' + new Date ().getTime ();
            qqc.get_blob_as_data_url (wait, img_src);
            img_src = wait;
         }
         qw.questions_cards[i_question].style_layer_src = img_src;
         if (debug[0]) {
            console.log ('[process_hotspot_diagram] JSON.stringify (qw.questions_cards[' + i_question + ']):', JSON.stringify (qw.questions_cards[i_question]));
         }
      }
   }
   return htm;
}
function create_find_the_dot_html (i_qwiz, find_the_dot) {
   const width                = find_the_dot.width;
   const height               = find_the_dot.height;
   const dot_color            = find_the_dot.dot_color;
   const background_color     = find_the_dot.background_color;
   const controls             = find_the_dot.controls;
   const new_dot_button_style = find_the_dot.new_dot_button_style;
   var htm = [];
   const show_hide_controls = controls ? 'block' : 'none';
   htm.push ('<div class="find_the_dot_controls" style="display: ' + show_hide_controls + '; margin-bottom: 2px;">');
   htm.push (   'Width');
   htm.push (   '<input class="find_the_dot_width"               type="text" onchange="' + qname + '.update_find_the_dot (' + i_qwiz + ')" value="' + width + '" />');
   htm.push (   'Height');
   htm.push (   '<input class="find_the_dot_height"              type="text" onchange="' + qname + '.update_find_the_dot (' + i_qwiz + ')" value="' + height + '"  />');
   htm.push (   '<button class="qwiz_button_small" style="background: gray;">');
   htm.push (      'Go');
   htm.push ('   </button>');
   htm.push (   '&nbsp;');
   htm.push (   'Dot color');
   htm.push (   '<div class="qwiz_simplecolor_wrapper" style="z-index: 3;">');
   htm.push (      '<input class="find_the_dot_dot_color"        type="text" value="' + dot_color + '" />');
   htm.push (   '</div>');
   htm.push (   '&nbsp;');
   htm.push (   'Background');
   htm.push (   '<div class="qwiz_simplecolor_wrapper" style="z-index: 2;">');
   htm.push (      '<input class="find_the_dot_background_color" type="text" value="' + background_color + '" />');
   htm.push (   '</div>');
   htm.push ('</div>');
   var button_class = ' class="qwiz_button qwiz_smaller"';
   var button_style = 'float: right;';
   if (new_dot_button_style) {
      button_class = '';
      if (new_dot_button_style != 'none') {
         button_style += new_dot_button_style;
      }
   }
   htm.push ('<button' + button_class + ' style="' + button_style + '" onclick="' + qname + '.update_find_the_dot (' + i_qwiz + ', true)" title="' + S ('Place dot at new random location') + '">');
   htm.push (   'New dot');
   htm.push ('</button>');
   if (controls) {
      htm.push ('One in <span class="find_the_dot_n_dots"></span>');
   }
   htm.push ('<br />');
   return htm.join ('\n');
}
function find_the_dot_color_selected (value, input_el) {
   if (debug[0]) {
      console.log ('[find_the_dot_color_selected] value:', value, ', input_el:', input_el);
   }
   const $qwiz = $ (input_el).parents ('div.qwiz');
   const id    = $qwiz[0].id;
   const i_qwiz = id.substr (4);
   const i_question = qwizdata[i_qwiz].i_question;
   const dot_background_color = ($ (input_el).hasClass ('find_the_dot_dot_color') ? 'dot' : 'background') + '_color';
   qwizdata[i_qwiz].find_the_dot[i_question][dot_background_color] = '#' + value;
   q.update_find_the_dot (i_qwiz);
}
this.update_find_the_dot = function (i_qwiz, new_dot_only_f, init_f) {
   const i_question = qwizdata[i_qwiz].i_question;
   const $qwiz      = $ ('div#qwiz' + i_qwiz);
   const $qwizq     = $ ('div#qwiz' + i_qwiz + '-q' + i_question);
   const $hotspot_image_stack = $qwizq.find ('div.hotspot_image_stack')
   const $canvas              = $hotspot_image_stack.find ('canvas.layer0_edited');
   const ctx                  = $canvas[0].getContext ('2d');
   qwizdata[i_qwiz].ctx[i_question] = ctx;
   const width  = parseInt ($qwizq.find ('input.find_the_dot_width').val ());
   const height = parseInt ($qwizq.find ('input.find_the_dot_height').val ());
   if (width < 1 || width > 1000 || height < 1 || height > 1000) {
      alert ('Please enter a number between 1 and 1000');
      return;
   }
   var find_the_dot = qwizdata[i_qwiz].find_the_dot[i_question];
   find_the_dot.hotspot_only_new_f = true;
   if (! new_dot_only_f) {
      $hotspot_image_stack.css ({width: width, height: height});
      $canvas.attr ('width',  width);
      $canvas.attr ('height', height);
      qwizdata[i_qwiz].hotspot_image_width[i_question]  = width;
      qwizdata[i_qwiz].hotspot_image_height[i_question] = height;
      $qwizq.find ('span.find_the_dot_n_dots').html ((width * height).toLocaleString ());
      const width10 = 10 + parseInt (width);
      if (width10 > qwizdata[i_qwiz].initial_width) {
         $qwiz.css ({width: width10 + 'px', 'max-width': 'none'});
         qwizdata[i_qwiz].width_reset = true;
      }
   }
   ctx.fillStyle = find_the_dot.background_color;
   ctx.fillRect (0, 0, width, height);
   if (new_dot_only_f || init_f) {
      find_the_dot.ix = parseInt (Math.random ()*width);
      find_the_dot.iy = parseInt (Math.random ()*height);
      if (new_dot_only_f) {
         qwizdata[i_qwiz].n_labels_correct = 0;
         qwizdata[i_qwiz].n_label_attempts = 0;
         q.display_diagram_progress (i_qwiz, S ('Visited'));
         var hotspot_nos = qwizdata[i_qwiz].hotspot_nos[i_question];
         const n = hotspot_nos.length;
         for (let i=0; i<n; i++) {
            hotspot_nos[i] = hotspot_nos[i] % 1000;
         }
      }
   }
   const ix = find_the_dot.ix;
   const iy = find_the_dot.iy;
   ctx.fillStyle = find_the_dot.dot_color;
   ctx.fillRect (ix, iy, 1, 1);
   qwizdata[i_qwiz].sparsemap[i_question] = 1;
   var spotmap = {};
   const ix_beg = Math.max (0, ix - 1);
   const ix_end = Math.min (width, ix + 2);
   const iy_beg = Math.max (0, iy - 1);
   const iy_end = Math.min (height, iy + 2);
   for (var iix=ix_beg; iix<ix_end; iix++) {
      spotmap[iix] = {};
      for (var iiy=iy_beg; iiy<iy_end; iiy++) {
         spotmap[iix][iiy] = 1;
      }
   }
   if (debug[0]) {
      console.log ('[update_find_the_dot] spotmap:', spotmap);
   }
   qwizdata[i_qwiz].spotmap[i_question] = spotmap;
   qwizdata[i_qwiz].spotmap_width[i_question]  = width;
   qwizdata[i_qwiz].spotmap_height[i_question] = height;
}
this.hotspot_diagram_click = function (e) {
   if (debug[0]) {
      console.log ('[hotspot_diagram_click] event:', event);
   }
   const $qwizq     = $ (event.target).parents ('div.qwizq');
   const m          = $qwizq[0].id.match (/qwiz(\d+)/);
   const i_qwiz     = m[1];
   const i_question = qwizdata[i_qwiz].i_question;
   if (qwizdata[i_qwiz].user_question_number == 1) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   if (qwizdata[i_qwiz].use_dataset.indexOf ('secure_hotspot') == -1) {
      const click_hotspot_no = is_xy_hotspot (i_qwiz, i_question, event.offsetX, event.offsetY);
      q.hotspot_diagram_click2 (i_qwiz, i_question, click_hotspot_no);
   } else {
      const data = {use_dataset: qwizdata[i_qwiz].use_dataset,
                    dataset_id:  qwizdata[i_qwiz].dataset_id[i_question],
                    i_question:  i_question,
                    ix:          event.offsetX,
                    iy:          event.offsetY};
      qqc.qjax (qname, i_qwiz, '', 'is_xy_hotspot', data);
   }
}
this.hotspot_diagram_click2 = function (i_qwiz, i_question, click_hotspot_no) {
   const hotspot_nos              = qwizdata[i_qwiz].hotspot_nos[i_question];
   const current_query_hotspot_no = qwizdata[i_qwiz].current_query_hotspot_no[i_question];
   const $hotspot_image_stack     = qwizdata[i_qwiz].$hotspot_image_stack[i_question];
   if (debug[0]) {
      console.log ('[hotspot_diagram_click2] current_query_hotspot_no:', current_query_hotspot_no);
   }
   qwizdata[i_qwiz].n_label_attempts++;
   var   hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
   if (! hotspot_user_interaction) {
      hotspot_user_interaction = 'label_prompt';
   }
   const show_hotspots            = qwizdata[i_qwiz].show_hotspots[i_question];
   var   hotspot_labels_stick     = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
   if (! hotspot_labels_stick) {
      hotspot_labels_stick = 'hide';
   }
   var $feedback;
   var feedback_msg = '';
   var finished_diagram_b = false;
   var correct_b = false;
   var $hotspot_label;
   var query_hotspot_no;
   var ok_f = click_hotspot_no > 0;
   if (hotspot_user_interaction == 'label_prompt') {
      query_hotspot_no = current_query_hotspot_no;
      ok_f = click_hotspot_no == current_query_hotspot_no;
   } else {
      query_hotspot_no = click_hotspot_no;
   }
   const $qwizq = $ ('#qwiz' + i_qwiz + '-q' + i_question);
   $hotspot_label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + query_hotspot_no);
   if (query_hotspot_no) {
      var ii = hotspot_indexof (hotspot_nos, query_hotspot_no);
      if (ii == -1) {
         alert ('Sorry, error');
         ii = 0;
      }
   }
   if (hotspot_user_interaction == 'find_hotspots') {
      if (debug[0]) {
         console.log ('[hotspot_diagram_click2] hotspot_nos:', hotspot_nos);
      }
      if (Math.abs (hotspot_nos[ii]) > 1000) {
         click_hotspot_no = 0;
         ok_f = false;
      }
   }
   if (ok_f) {
      hotspot_nos[ii] += Math.sign (hotspot_nos[ii]) * 1000;
      if (show_hotspots && show_hotspots != 'always' && show_hotspots.indexOf ('hide') == -1) {
         show_hotspot_on_hover ();
         const $hotspot_only_image = $hotspot_image_stack.find ('img.qwiz_layer' + click_hotspot_no);
         const keep_temporary
            = qwizdata[i_qwiz].hotspot_highlighted_fs[i_question][click_hotspot_no]
                                                         ? 'keep' : 'temporary';
         $hotspot_image_stack.find ('img.hotspot_only_image.hotspot_temporary').removeClass ('hotspot_temporary').hide ();
         if (show_hotspots.indexOf ('temporary') != -1) {
            $hotspot_only_image.addClass ('hotspot_temporary').show ();
         } else if (show_hotspots.indexOf ('keep') != -1) {
            $hotspot_only_image.addClass ('hotspot_' + keep_temporary).show ();
         }
      }
      if (hotspot_labels_stick == 'temporary') {
         $hotspot_image_stack.find ('div.qwiz_hotspot_label').hide ();
      }
      if (hotspot_labels_stick == 'temporary' || hotspot_labels_stick == 'keep') {
         var delay_show = function () {
            $hotspot_label.css ({display: 'inline-block'});
         }
         setTimeout (delay_show, 100);
         if (hotspot_labels_stick == 'keep') {
            $hotspot_label.addClass ('hotspot_clicked');
         }
      }
      qwizdata[i_qwiz].n_labels_correct++;
      qwizdata[i_qwiz].n_hotspots_to_do[i_question]--;
      feedback_msg = '';
      var $feedback = $hotspot_label.find ('span.hotspot_label_feedback_correct_content');
      if ($feedback.length) {
         feedback_msg = $feedback.html ();
         if (qqc.is_only_tags_and_whitespace (feedback_msg)) {
            feedback_msg = q.canned_feedback (true);
         } else {
            feedback_msg = feedback_msg.replace (/&nbsp;/g, ' ');
         }
      } else {
         feedback_msg = q.canned_feedback (true);
      }
      if (qwizdata[i_qwiz].n_hotspots_to_do[i_question]) {
         if (hotspot_user_interaction == 'label_prompt') {
            feedback_msg += '<div><b>' + S ('Now click on:') + '</b></div>';
            const current_query_hotspot_no = pick_random_hotspot (i_qwiz, i_question);
            if (current_query_hotspot_no == 0) {
               qwizdata[i_qwiz].n_hotspots_to_do[i_question] = 0;
            } else {
               qwizdata[i_qwiz].current_query_hotspot_no[i_question] = current_query_hotspot_no;
               set_hotspot_label_query (i_qwiz, i_question, $qwizq);
            }
         }
      }
      if (! qwizdata[i_qwiz].n_hotspots_to_do[i_question]) {
         finished_diagram_b = true;
         set_hotspot_label_query (i_qwiz, i_question, $qwizq, true);
         $hotspot_image_stack.off ('mousemove click.hotspot_diagram_click click.mobile_hover_eq');
         if (! q.qwizard_b && ! q.preview) {
            correct_b = qwizdata[i_qwiz].answered_correctly[i_question] == 1;
            if (correct_b) {
               qwizdata[i_qwiz].n_correct++;
               if (qwizdata[i_qwiz].n_qs_done) {
                  qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
               }
               if (hotspot_user_interaction == 'label_prompt') {
                  feedback_msg += '<div>' + S ('You identified all of the items on the first try!') + '</div>';
               } else if (hotspot_user_interaction == 'find_hotspots') {
                  const n_tries = qwizdata[i_qwiz].n_label_attempts;
                  if (n_tries == hotspot_nos.length) {
                     feedback_msg += '<div>' + S ('You identified all of the items on the first try!') + '</div>';
                  } else {
                     feedback_msg += '<div>' + plural (S ('It took you one try'), S ('It took you %s tries'), n_tries) + ' ' + plural (S ('to identify this item'), S ('to identify these items'), qwizdata[i_qwiz].n_label_targets) + '.</div>';
                     feedback_msg = feedback_msg.replace ('%s', qqc.number_to_word (n_tries));
                  }
               }
            } else {
               const n_tries = qwizdata[i_qwiz].n_label_attempts;
               feedback_msg += '<div>' + plural (S ('It took you one try'), S ('It took you %s tries'), n_tries) + ' ' + plural (S ('to identify this item'), S ('to identify these items'), qwizdata[i_qwiz].n_label_targets) + '.</div>';
               feedback_msg = feedback_msg.replace ('%s', qqc.number_to_word (n_tries));
               qwizdata[i_qwiz].n_incorrect++;
            }
            update_topic_statistics (i_qwiz, i_question, correct_b);
         }
         update_progress_show_next (i_qwiz);
      }
   } else {
      if (hotspot_user_interaction == 'label_prompt' || click_hotspot_no > 0) {
         hotspot_nos[ii] = - current_query_hotspot_no;
         qwizdata[i_qwiz].answered_correctly[i_question] = -1;
      }
      if (show_hotspots && show_hotspots.indexOf ('keep') != -1) {
         $hotspot_image_stack.find ('img.hotspot_only_image').removeClass ('hotspot_clicked').hide ();
      }
      if (hotspot_labels_stick == 'temporary') {
         $hotspot_image_stack.find ('div.qwiz_hotspot_label').removeClass ('hotspot_clicked').hide ();
      }
      if (hotspot_user_interaction == 'label_prompt') {
         feedback_msg = '';
         var $feedback = $hotspot_label.find ('span.hotspot_label_feedback_incorrect_content');
         if ($feedback.length) {
            feedback_msg = $feedback.html ();
            if (qqc.is_only_tags_and_whitespace (feedback_msg)) {
               feedback_msg = q.canned_feedback (false);
            } else {
               feedback_msg = feedback_msg.replace (/&nbsp;/g, ' ');
            }
         } else {
            feedback_msg = q.canned_feedback (false);
         }
         if (qwizdata[i_qwiz].n_hotspots_to_do[i_question] > 1) {
            feedback_msg += '<div><b>' + S ('Now click on:') + '</b></div>';
         } else {
            feedback_msg += '<div>';
            if (click_hotspot_no != 0) {
               const label_htm = $hotspot_image_stack.find ('div.qwiz_hotspot_label.qwiz_hotspot' + click_hotspot_no).html ();
               feedback_msg += 'You clicked on ' + label_htm;
            }
            feedback_msg += '&emsp;<b>' + S ('Please try again') + ':</b></div>';
         }
         const current_query_hotspot_no = pick_random_hotspot (i_qwiz, i_question);
         if (current_query_hotspot_no) {
            qwizdata[i_qwiz].current_query_hotspot_no[i_question] = current_query_hotspot_no;
            set_hotspot_label_query (i_qwiz, i_question, $qwizq);
         }
      }
   }
   $qwizq.find ('div.hotspot_click_feedback').html (feedback_msg);
   const found_clicked = (! hotspot_user_interaction || hotspot_user_interaction) == 'label_prompt' ? S ('Correctly clicked') : S ('Found');
   q.display_diagram_progress (i_qwiz, found_clicked);
   if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
      const hotspot_labels = qwizdata[i_qwiz].hotspot_labels[i_question];
      const correct_hotspot_label = hotspot_labels[ii];
      var clicked_hotspot_label = '';
      if (click_hotspot_no != query_hotspot_no) {
         const jj = hotspot_indexof (hotspot_nos, click_hotspot_no);
         if (jj != -1) {
            clicked_hotspot_label = hotspot_labels[jj];
         }
         clicked_hotspot_label += '\t';
      }
      var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                  q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                  i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                  unit:          qwizdata[i_qwiz].unit[i_question],
                  type:          'hotspot_diagram',
                  response:      clicked_hotspot_label + correct_hotspot_label,
                  correct_b:     '',
                  confirm:       'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
      if (finished_diagram_b) {
         var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                     q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                     i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                     unit:          qwizdata[i_qwiz].unit[i_question],
                     type:          'hotspot_diagram',
                     response:      'done',
                     correct_b:     correct_b ? 1 : '',
                     confirm:       'js'};
         var delay_record_response = function () {
            record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
         }
         setTimeout (delay_record_response, 500);
      }
   }
}
var hotspot_long_hover_id;
var hotspot_label_hide_id;
var delay_hide_hotspot_no = -1;
function show_hotspot_on_hover () {
   if (debug[0]) {
      console.log ('[show_hotspot_on_hover] event:', event);
   }
   const $qwizq     = $ (event.target).parents ('div.qwizq');
   const m          = $qwizq[0].id.match (/qwiz(\d+)/);
   const i_qwiz     = m[1];
   const i_question = qwizdata[i_qwiz].i_question;
   const prev_xy_hotspot_no = qwizdata[i_qwiz].current_xy_hotspot_no;
   var className = event.target.className;
   if (className.indexOf ('qwiz_hotspot_label') == -1 ) {
      const $label = $ (event.target).parents ('div.qwiz_hotspot_label');
      if ($label.length) {
         className = $label[0].className;
      } else {
         className = '';
      }
   }
   if (className) {
      const m = className.match (/qwiz_hotspot(\d+)/);
      if (m) {
         const label_hotspot_no = m[1];
         if (label_hotspot_no == prev_xy_hotspot_no
                                 || label_hotspot_no == delay_hide_hotspot_no) {
            clearTimeout (hotspot_label_hide_id);
            delay_hide_hotspot_no = -1;
            qwizdata[i_qwiz].on_hotspot_label = true;
            const hotspot_labels_stick = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
            if (hotspot_labels_stick
                          && hotspot_labels_stick.indexOf ('keep') == -1
                          && hotspot_labels_stick.indexOf ('temporary') == -1) {
               const $hotspot_label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + label_hotspot_no);
               $hotspot_label.off ('mouseleave');
               $hotspot_label.on  ('mouseleave', function () {
                                                    $hotspot_label.hide ();
                                                    $hotspot_label.off ('mouseleave');
                                                 });
            }
         }
         return;
      }
   }
   qwizdata[i_qwiz].on_hotspot_label = false;
   const new_xy_hotspot_no = is_xy_hotspot (i_qwiz, i_question, event.offsetX, event.offsetY);
   if (new_xy_hotspot_no != prev_xy_hotspot_no) {
      if (new_xy_hotspot_no) {
         if (qwizdata[i_qwiz].user_question_number == 1) {
            $ ('div#icon_qwiz' + i_qwiz).hide ();
         }
         const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
         if (hotspot_user_interaction && hotspot_user_interaction == 'find_hotspots') {
            const hotspot_nos = qwizdata[i_qwiz].hotspot_nos[i_question];
            const ii = hotspot_indexof (hotspot_nos, new_xy_hotspot_no);
            if (Math.abs (hotspot_nos[ii]) > 1000) {
               return;
            }
         }
      }
      const $hotspot_image_stack     = qwizdata[i_qwiz].$hotspot_image_stack[i_question];
      const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
      const show_hotspot_on_hover2 = function () {
         const show_hotspots = qwizdata[i_qwiz].show_hotspots[i_question];
         if (show_hotspots && show_hotspots != 'always' && show_hotspots.indexOf ('hide') == -1) {
            var   create_f = qwizdata[i_qwiz].find_the_dot[i_question]?.hotspot_only_new_f;
            const img_class = 'qwiz_layer' + new_xy_hotspot_no;
            if (! create_f) {
               var $hotspot_only_image = $hotspot_image_stack.find ('img.' + img_class);
               create_f = $hotspot_only_image.length == 0;
            }
            if (create_f) {
               const ctx = qwizdata[i_qwiz].ctx[i_question];
               const hotspot_only_img_src = q.create_hotspot_image (i_qwiz, i_question, new_xy_hotspot_no, $hotspot_image_stack, ctx);
               $hotspot_image_stack.append ('<img class="' + img_class + ' hotspot_image_layer hotspot_only_image" />');
               $hotspot_only_image = $hotspot_image_stack.find ('img.' + img_class);
               $hotspot_only_image[0].src = hotspot_only_img_src;
            }
            $hotspot_only_image.show ();
         }
         if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
            const hotspot_labels_stick = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
            if (hotspot_labels_stick && hotspot_labels_stick.indexOf ('hover_show') != -1) {
               if (debug[0]) {
                  console.log ('[show_hotspot_on_hover2] (label) new_xy_hotspot_no:', new_xy_hotspot_no);
               }
               if (hotspot_labels_stick.indexOf ('keep') != -1) {
                  $qwizq.find ('div.qwiz_hotspot_label').css ({opacity: 0.5});
               }
               const $hotspot_label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + new_xy_hotspot_no);
               $hotspot_label.css ({display: 'inline-block', opacity: 1.0});
            }
            const hotspot_nos = qwizdata[i_qwiz].hotspot_nos[i_question];
            const ii = hotspot_indexof (hotspot_nos, new_xy_hotspot_no);
            if (hotspot_nos[ii] < 1000) {
               qwizdata[i_qwiz].n_labels_correct++;
               qwizdata[i_qwiz].n_hotspots_to_do[i_question]--;
               q.display_diagram_progress (i_qwiz, S ('Visited'));
               hotspot_nos[ii] += 1000;
            }
         }
      }
      qwizdata[i_qwiz].current_xy_hotspot_no = new_xy_hotspot_no;
      var hide_previous = '';
      if (prev_xy_hotspot_no > 0) {
         if (debug[0]) {
            console.log ('[show_hotspot_on_hover (hide previous)] prev_xy_hotspot_no:', prev_xy_hotspot_no, ', new_xy_hotspot_no:', new_xy_hotspot_no);
         }
         const hotspot_labels_stick     = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
         const $prev_hotspot_only_image
            = $hotspot_image_stack
                                 .find ('img.qwiz_layer' + prev_xy_hotspot_no)
                                 .not ('img.hotspot_keep');
         hide_previous = 'hide';
         if (new_xy_hotspot_no == 0) {
            const show_hotspots = qwizdata[i_qwiz].show_hotspots[i_question];
            if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
               if (show_hotspots && show_hotspots.indexOf ('keep') != -1) {
                  hide_previous = '';
               }
            }
            if (hide_previous && hotspot_labels_stick && hotspot_labels_stick.indexOf ('hover_show') != -1) {
               if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
                  hide_previous = 'delay';
               }
            }
         }
         if (hide_previous) {
            $prev_hotspot_only_image.hide ();
            if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
               const hotspot_labels_stick = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
               if (hotspot_labels_stick
                         && hotspot_labels_stick.indexOf ('hover_show') != -1
                         && hotspot_labels_stick.indexOf ('keep')       == -1
                         && hotspot_labels_stick.indexOf ('temporary')  == -1) {
                  const $hotspot_label = $qwizq.find ('div.qwiz_hotspot_label.qwiz_hotspot' + prev_xy_hotspot_no);
                  if (hide_previous == 'delay') {
                     const delay_hide = function () {
                                           $hotspot_label.hide ();
                                        };
                     clearTimeout (hotspot_label_hide_id);
                     hotspot_label_hide_id = setTimeout (delay_hide, 700);
                     delay_hide_hotspot_no = prev_xy_hotspot_no;
                  } else {
                     $hotspot_label.hide ();
                  }
               } else {
                  $qwizq.find ('div.qwiz_hotspot_label').css ({opacity: 1.0});
               }
            }
         }
      }
      if (new_xy_hotspot_no) {
         const show_hotspots = qwizdata[i_qwiz].show_hotspots[i_question];
         if (show_hotspots && show_hotspots.indexOf ('long_hover_show') != -1) {
            clearTimeout (hotspot_long_hover_id);
            hotspot_long_hover_id = setTimeout (show_hotspot_on_hover2, 700);
         } else {
            show_hotspot_on_hover2 ();
         }
      }
   }
}
function hide_hotspots (e) {
   if (debug[0]) {
      console.log ('[hide_hotspots] e:', e);
   }
   const $qwizq     = $ (event.target).parents ('div.qwizq');
   const m          = $qwizq[0].id.match (/qwiz(\d+)/);
   const i_qwiz     = m[1];
   const i_question = qwizdata[i_qwiz].i_question;
   qwizdata[i_qwiz].current_xy_hotspot_no = -1;
   clearTimeout (hotspot_long_hover_id);
   const show_hotspots            = qwizdata[i_qwiz].show_hotspots[i_question];
   const hotspot_user_interaction = qwizdata[i_qwiz].hotspot_user_interaction[i_question];
   var hide_label_f = false;
   if (hotspot_user_interaction && hotspot_user_interaction == 'info_only') {
      const hotspot_labels_stick = qwizdata[i_qwiz].hotspot_labels_stick[i_question];
      hide_label_f = hotspot_labels_stick && hotspot_labels_stick.indexOf ('hover_show') != -1 && hotspot_labels_stick.indexOf ('keep') == -1;
      if (hide_label_f && qwizdata[i_qwiz].on_hotspot_label) {
         return;
      }
   }
   if (show_hotspots && show_hotspots.indexOf ('hide') == -1) {
      if (   show_hotspots.indexOf ('temporary') != -1
          || show_hotspots.indexOf ('keep')      != -1) {
         $ (e.currentTarget).find ('img.hotspot_only_image')
            .not ('img.hotspot_keep')                       .hide ();
         if (hide_label_f) {
            $ (e.currentTarget).find ('div.qwiz_hotspot_label')
               .not ('div.hotspot_temporary')
               .not ('div.hotspot_keep')                       .hide ();
         }
      } else {
         $ (e.currentTarget).find ('img.hotspot_only_image').hide ();
         if (hide_label_f) {
            $ (e.currentTarget).find ('div.qwiz_hotspot_label').hide ();
         }
      }
   }
}
this.hotspot_color_from_no = function (hotspot_no, ver2_f=false) {
   var hotspot_color;
   var hotspot_rgba;
   const hotspot_colors = [[202,198,191], [143,131,102], [239,210,130], [106,80,0],    [251,209,30],
                           [0,210,255],   [0,123,201],   [0,86,234],    [123,132,147], [218,227,243]];
   const variants = [[0, 0, 1],
                     [0, 1, 0],
                     [0, 1, 1],
                     [1, 0, 0],
                     [1, 1, 0],
                     [1, 1, 1]];
   const ii = hotspot_no - 1;
   const i_color = ii % 10;
   hotspot_color = hotspot_colors[i_color];
   if (ii > 9) {
      const i_variant = ver2_f ? Math.floor (ii/10) % 5 : ii % 5;
      const variant   = variants[i_variant];
      const i_scale = Math.floor (ii/60.0) + 1;
      const offset = ver2_f ? 5 : 4;
      hotspot_color[0] = add_sub_color_variant (hotspot_color[0], variant[0], i_scale, offset);
      hotspot_color[1] = add_sub_color_variant (hotspot_color[1], variant[1], i_scale, offset);
      hotspot_color[2] = add_sub_color_variant (hotspot_color[2], variant[2], i_scale, offset);
   }
   /*
   if (debug[0]) {
      console.log ('[hotspot_color_from_no] hotspot_color:', hotspot_color);
   }
   */
   hotspot_color.push (q.hotspot_alpha_value);
   return hotspot_color;
}
function add_sub_color_variant (rgb, variant, i_scale, offset=4) {
   var new_rgb = rgb;
   const i_add_sub = variant * i_scale * offset;
   if (rgb + i_add_sub <= 255) {
      new_rgb += i_add_sub;
   } else {
      new_rgb -= i_add_sub;
   }
   return new_rgb;
}
function rgb_same (v1, v2) {
   return Math.abs (v1 - v2) <= 3;
}
function hotspot_indexof (hotspot_nos, i) {
   var jj = -1;
   const n_hotspots = hotspot_nos.length;
   for (var ii=0; ii<n_hotspots; ii++) {
      if (Math.abs (hotspot_nos[ii] % 1000) == i) {
         jj = ii;
         break;
      }
   }
   return jj;
}
function is_xy_hotspot (i_qwiz, i_question, ix, iy) {
   const hotspot_image_width  = qwizdata[i_qwiz].hotspot_image_width[i_question];
   const hotspot_image_height = qwizdata[i_qwiz].hotspot_image_height[i_question];
   const spotmap              = qwizdata[i_qwiz].spotmap[i_question];
   const spotmap_width        = qwizdata[i_qwiz].spotmap_width[i_question];
   const spotmap_height       = qwizdata[i_qwiz].spotmap_height[i_question];
   const sparsemap            = qwizdata[i_qwiz].sparsemap[i_question];
   const sx = Math.floor (ix/hotspot_image_width  * spotmap_width);
   const sy = Math.floor (iy/hotspot_image_height * spotmap_height);
   var hotspot_no;
   if (sparsemap) {
      hotspot_no = 0;
      if (spotmap[sx]) {
         if (spotmap[sx][sy]) {
            hotspot_no = spotmap[sx][sy];
         }
      }
   } else {
      hotspot_no = spotmap[sy*spotmap_width + sx];
   }
   if (debug[0]) {
      console.log ('[is_xy_hotspot] ix:', ix, ', iy:', iy, ', hotspot_no:', hotspot_no);
   }
   return hotspot_no;
}
function pick_random_hotspot (i_qwiz, i_question) {
   const hotspot_nos = qwizdata[i_qwiz].hotspot_nos[i_question];
   const n_hotspots  = qwizdata[i_qwiz].n_hotspots[i_question];
   var ii = Math.floor (Math.random ()*n_hotspots);
   var hotspot_no = 0;
   const dir = Math.random () < 0.5 ? -1 : 1;
   for (var i=0; i<n_hotspots; i+=dir) {
      const abs_hotspot_no = Math.abs (hotspot_nos[ii]);
      if (abs_hotspot_no < 1000) {
         hotspot_no = abs_hotspot_no;
         break;
      }
      ii += dir;
      if (ii >= n_hotspots) {
         ii = 0;
      } else if (ii < 0) {
         ii = n_hotspots - 1;
      }
   }
   if (hotspot_no == 0) {
      alert ('Sorry, error: no hotspot');
   }
   if (debug[0]) {
      console.log ('[pick_random_hotspot] hotspot_nos:', hotspot_nos);
      console.log ('[pick_random_hotspot] hotspot_no:', hotspot_no);
   }
   return hotspot_no;
}
function set_hotspot_label_query (i_qwiz, i_question, $qwizq, hide_f) {
   var label_htm = '';
   if (! hide_f) {
      const current_query_hotspot_no = qwizdata[i_qwiz].current_query_hotspot_no[i_question];
      const $hotspot_image_stack     = qwizdata[i_qwiz].$hotspot_image_stack[i_question];
      label_htm = $hotspot_image_stack.find ('div.qwiz_hotspot_label.qwiz_hotspot' + current_query_hotspot_no).html ();
   }
   const $hotspot_label_query = $qwizq.find ('div.hotspot_label_query');
   $hotspot_label_query.html (label_htm);
}
function process_qwizzled (i_qwiz, i_question, question_htm, opening_tags,
                           question_shortcode) {
   if (debug[0]) {
      console.log ('[process_qwizzled] question_htm: ', question_htm);
   }
   var labels_position = '';
   var m = question_shortcode.match (/\[(<code><\/code>)*q([^\]]*)\]/m);
   if (m) {
      var attributes = m[2];
      if (attributes) {
         attributes = qqc.replace_smart_quotes (attributes);
         labels_position = get_attr (attributes, 'labels');
         labels_position = labels_position.toLowerCase ();
         if (debug[0]) {
            console.log ('[process_qwizzled] labels_position:', labels_position);
         }
      }
   }
   var new_htm  = '<div id="qwiz' + i_qwiz + '-q' + i_question + '" '
   if (q.qwizard_b) {
      question_htm = qqc.shortcodes_to_video_elements (question_htm);
   } else {
      new_htm     +=   'onmouseover="' + qname + '.init_drag_and_drop (this)" ';
   }
   new_htm +=          'class="qwizq qwizzled">'
             +    '<table class="qwizzled_table">'
             +    '<tr class="qwizzled_table">' + question_htm;
   if (debug[0]) {
      console.log ('[process_qwizzled] new_htm: ', new_htm);
   }
   var canvas_div_pos = new_htm.indexOf ('<div class="qwizzled_canvas');
   if (canvas_div_pos == -1) {
      errmsgs.push (T ('Did not find target "drop-zones" for labels.  Please check that all labels and target "drop zones" were correctly processed and saved during the edit of this page') + '.  qwiz: ' + (i_qwiz + 1) + ', ' + T ('question') + ' ' + (i_question + 1));
      return '';
   }
   var div_html = qqc.find_matching_block (new_htm.substr (canvas_div_pos));
   if (! div_html) {
      errmsgs.push ('Did not find end of image area.  Please check that all labels and target "drop zones" were correctly processed and saved during the edit of this page.');
      return '';
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].type = 'labeled_diagram';
      qw.questions_cards[i_question].question_text = div_html;
      qw.questions_cards[i_question].labels = [];
      qw.questions_cards[i_question].feedback_corrects = [];
      qw.questions_cards[i_question].feedback_incorrects = [];
   }
   var remaining_htm = new_htm.substr (canvas_div_pos + div_html.length);
   new_htm = new_htm.substr (0, canvas_div_pos + div_html.length);
   var qwizq_id = 'qwizzled_canvas-qwiz' + i_qwiz + '-q' + i_question;
   var td_canvas = '<td class="qwizzled_table"><div id="' + qwizq_id + '"' + div_html.substring (4) + '</td>';
   td_canvas = td_canvas.replace ('class="', 'class="' + qwizq_id + ' ');
   if (qwizdata[i_qwiz].qrecord_id) {
      if (qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question])) {
         var question_htm_wo_tags = qqc.remove_tags_eols (question_htm);
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qqc.q_and_a_hash (question_htm_wo_tags);
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = qwiz_crc32 (question_htm);
         if (debug[0]) {
            console.log ('[process_qwizzled] qwizdata[i_qwiz].q_and_a_text[i_question]:', qwizdata[i_qwiz].q_and_a_text[i_question]);
            console.log ('[process_qwizzled] qwizdata[i_qwiz].q_and_a_crc32[i_question]:', qwizdata[i_qwiz].q_and_a_crc32[i_question]);
         }
      } else {
         qwizdata[i_qwiz].q_and_a_text[i_question]  = qwizdata[i_qwiz].dataset_id[i_question];
         qwizdata[i_qwiz].q_and_a_crc32[i_question] = 'dataset';
      }
   }
   var td_labels_style = '';
   if (labels_position == 'left') {
      td_labels_style = ' style="padding-right: 5px;"'
   }
   var td_labels_add_class = '';
   if (labels_position != 'top' && labels_position != 'bottom') {
      td_labels_add_class = ' qwizzled_labels_left_right';
   }
   var td_labels   = '<td class="qwizzled_table qwizzled_labels' + td_labels_add_class + '"' + td_labels_style + '>'
                   +    '<div class="qwizzled_labels_border">'
                   +        'Q-LABELS-Q'
                   +        '<div style="clear: both;"></div>\n'
                   +    '</div>'
                   + '</td>';
   var td_feedback = '<td class="qwizzled_table qwizzled_feedback" colspan="2">QWIZZLED-FEEDBACK-Q</td>';
   var table_html;
   if (labels_position == "top") {
      table_html =            td_labels + '</tr>'
                   + '<tr class="qwizzled_table">' + td_canvas + '</tr>';
   } else if (labels_position == "bottom") {
      table_html =            td_canvas + '</tr>'
                   + '<tr class="qwizzled_table">' + td_labels + '</tr>';
   } else if (labels_position == "left") {
      table_html =            td_labels + td_canvas + '</tr>';
                   + '<tr class="qwizzled_table">' + td_canvas + '</tr>';
   } else {
      table_html =            td_canvas + td_labels + '</tr>';
                   + '<tr class="qwizzled_table">' + td_canvas + '</tr>';
   }
   if (debug[0]) {
      console.log ('[process_qwizzled] table_html.substr (0, 100):', table_html.substr (0, 100));
   }
   table_html +=      '<tr class="qwizzled_table">' + td_feedback + '</tr>'
                 + '</table>';
   new_htm = new_htm.replace (div_html, table_html);
   new_htm = new_htm.replace (/\[(<code><\/code>)*q[^\]]*\]/, '');
   if (debug[0]) {
      console.log ('[process_qwizzled] new_htm:', new_htm);
      console.log ('[process_qwizzled] remaining_htm:', remaining_htm);
   }
   remaining_htm = remaining_htm.replace (/\[(<code><\/code>)*l\]/gm, '');
   var label_divs = [];
   var i_label = 0;
   while (true) {
      var label_div_pos = remaining_htm.search (/<div[^>]+class=".*?qwizzled_label/m);
      if (label_div_pos == -1) {
         break;
      }
      var label_div = qqc.find_matching_block (remaining_htm.substr (label_div_pos));
      if (debug[0]) {
         console.log ('[process_qwizzled] label_div:', label_div);
      }
      var new_label_div = '<li><div id="label-qwiz' + i_qwiz + '-q' + i_question + '-a' + i_label + '"'
                          + label_div.substr (4) + '</li>';
      label_divs.push (new_label_div);
      if (set_qwizard_data_b) {
         qw.questions_cards[i_question].labels.push (label_div);
      }
      remaining_htm = remaining_htm.replace (label_div, '');
      i_label++;
   }
   if (debug[0]) {
      console.log ('[process_qwizzled] label_divs:', label_divs);
   }
   var label_head =   '<p class="qwizzled_label_head qwizzled_label_head_standard">Move each item to its correct <span class="qwizzled_target_border">place</span></p>\n'
                    + '<p class="qwizzled_label_head qwizzled_label_head_mobile">Click an item, then its correct <span class="qwizzled_target_border">place</span></p>\n'
                    + '<p class="qwizzled_label_head qwizzled_label_head_label_clicked">Click the correct <span class="qwizzled_target_border">place</span> for the label</p>';
   var ul;
   if (labels_position == "top" || labels_position == "bottom") {
      ul = '<ul class="qwizzled_labels qwizzled_labels_inline">';
   } else {
      ul = '<ul class="qwizzled_labels qwizzled_labels_std">';
   }
   new_htm = new_htm.replace ('Q-LABELS-Q', label_head + ul + label_divs.join ('\n') + '</ul>');
   var feedback_html = remaining_htm;
   var feedback_divs = [];
   var feedback_start_tags = ['[f*]', '[fx]'];
   var feedback_next_tags =  ['[f*]', '[fx]', '[x]', '<div class="qwizzled_question_bottom_border_title"'];
   var i_item = 0;
   while (true) {
      var feedback_item_html
                       = qqc.parse_html_block (feedback_html, feedback_start_tags,
                                               feedback_next_tags);
      if (feedback_item_html == 'NA') {
         break;
      }
      feedback_html = feedback_html.replace (feedback_item_html, '');
      var c_x;
      if (feedback_item_html.search (/\[f\*\]/) != -1) {
         c_x = 'c';
      } else {
         c_x = 'x';
      }
      feedback_item_html = feedback_item_html.replace (/\[f[\*x]\]/, '');
      if (debug[2]) {
         console.log ('[process_qwizzled] feedback_item_html: ', feedback_item_html);
      }
      feedback_divs.push (
            create_feedback_div_html (i_qwiz, i_question, parseInt (i_item/2, 10),
                                      feedback_item_html, c_x)
      );
      if (set_qwizard_data_b) {
         if (c_x == 'c') {
            qw.questions_cards[i_question].feedback_corrects.push (feedback_item_html);
         } else {
            qw.questions_cards[i_question].feedback_incorrects.push (feedback_item_html);
         }
      }
      i_item++;
   }
   if (debug[0]) {
      console.log ('[process_qwizzled] feedback_divs:', feedback_divs);
      console.log ('[process_qwizzled] feedback_html:', feedback_html);
   }
   var n_labels = label_divs.length;
   var n_feedback_items = feedback_divs.length;
   if (n_labels*2 != n_feedback_items) {
      errmsgs.push (T ('Number of feedback items') + ' (' + n_feedback_items + ') ' + T ('does not match number of labels') + ' (' + n_labels + ').  qwiz: ' + (1 + i_qwiz) + ', question ' + (1 + i_question) + ' labeled diagram' + '\n'
                    + '(' + T ('There should be two feedback items -- correct and incorrect -- for each label') + ')');
   }
   var htm = '<div class="qwiz-feedback" id="qwiz' + i_qwiz + '-q' + i_question + '-ff"></div>\n';
   feedback_divs.push (htm);
   new_htm = new_htm.replace ('QWIZZLED-FEEDBACK-Q', feedback_divs.join (''));
   new_htm += '</div>\n';
   if (set_qwizard_data_b) {
      qw.questions_cards[i_question].n_labels = n_labels;
   }
   if (debug[2]) {
      console.log ('[process_qwizzled] new_htm: ', new_htm);
   }
   return new_htm;
}
this.init_drag_and_drop = function (qwizq_elm) {
   if (debug[0]) {
      console.log ('[init_drag_and_drop] qwizq_elm:', qwizq_elm);
   }
   var $qwizq = $ (qwizq_elm);
   $qwizq.removeAttr ('onmouseover');
   $qwizq.find ('td.qwizzled_labels div.qwizzled_label').each (function () {
      if (debug[0] || debug[8]) {
         console.log ('[init_drag_and_drop] $ (this):', $ (this));
         console.log ('[init_drag_and_drop] \'td.qwizzled_labels div.qwizzled_label\':', $ (this)[0]);
      }
      var label_offset = $ (this).offset ();
      if (debug[8]) {
         console.log ('[init_drag_and_drop] label_offset:', label_offset);
      }
      $ (this).data ('label_x', label_offset.left).data ('label_y', label_offset.top);
      $ (this).draggable ({
         containment:   $ (this).parents ('table.qwizzled_table'),
         start:         function (e, ui) {
                           var $qwiz = $ (this).parents ('div.qwiz');
                           if ($qwiz.length) {
                              var qwiz_el = $qwiz[0];
                              if (qwiz_el.qscale_fac) {
                                 qwiz_el.qstart_left = ui.position.left;
                                 if (ui.position.top) {
                                    qwiz_el.qstart_top = ui.position.top;
                                 } else {
                                    qwiz_el.qstart_top = 0.1;
                                 }
                              }
                           }
                           q.label_dragstart ($ (this));
                        },
         drag:          function (e, ui) {
                           var $qwiz = $ (this).parents ('div.qwiz');
                           if ($qwiz.length) {
                              var qwiz_el = $qwiz[0];
                              if (qwiz_el.qscale_fac) {
                                 if (qwiz_el.qstart_top) {
                                    var scale_fac = qwiz_el.qscale_fac;
                                    ui.position.left = (ui.position.left - qwiz_el.qstart_left)/scale_fac + qwiz_el.qstart_left;
                                    ui.position.top  = (ui.position.top  - qwiz_el.qstart_top )/scale_fac + qwiz_el.qstart_top;
                                 }
                              }
                           }
                        }
      }).addClass ('qwizzled_label_unplaced');
   });
   $qwizq.find ('.qwizzled_target').droppable ({
      accept:           '.qwizzled_label',
      hoverClass:       'qwizzled_target_hover',
      drop:             function (event, ui) {
                           q.label_dropped ($ (this), ui.draggable);
                        },
      tolerance:        'pointer',
   });
}
function process_header (htm, i_qwiz, i_question, intro_b) {
   var qtags = ['[h]'];
   var qnext_tags = ['[q]', '[q ', '<div class="qwizzled_question'];
   if (intro_b != undefined) {
      qnext_tags.push ('[i]');
   }
   header_html = qqc.parse_html_block (htm.substr (0, 1000), qtags, qnext_tags, true);
   if (header_html != 'NA' && header_html != '') {
      var htmx = htm.substr (0, 200);
      htmx = qqc.trim (htmx);
      var i_pos = qqc.opening_tag_shortcode_pos ('[h]', htmx);
      htmx = htmx.substr (i_pos, 5);
      var header_htmlx = header_html.replace (/<br[^>]*>/g, '');
      header_htmlx = qqc.trim (header_htmlx).substr (0, 5);
      if (htmx != header_htmlx) {
         errmsgs.push (T ('Text before header') + ' [h].  qwiz: ' + (i_qwiz + 1));
      }
      htm = htm.replace (header_html, '');
      header_html = header_html.replace (/\[h\]/ig, '');
      header_html = qqc.balance_closing_tag (header_html);
      header_html = header_html.replace (/<(p|h[1-6])[^>]*><\/(p|h[1-6])>/g, '');
      header_html = qqc.decode_image_tags (header_html);
   }
   return htm;
}
this.display_summary_and_exit = function (i_qwiz) {
   if (! q.qwizard_b) {
      $ ('.bck-question-qwiz' + i_qwiz).css ({opacity: 0.5}).addClass ('hover');
   }
   if (qwizdata[i_qwiz].summary_b) {
      var report_html = [];
      var n_questions = qwizdata[i_qwiz].n_questions_for_done;
      var n_correct   = qwizdata[i_qwiz].n_correct;
      var n_incorrect = qwizdata[i_qwiz].n_incorrect;
      var summary_line;
      if (qwizdata[i_qwiz].repeat_incorrect_b) {
         var quiz_set = qwizdata[i_qwiz].use_dataset && qwizdata[i_qwiz].dataset_intro_f ? 'set' : 'quiz';
         report_html.push ('<p><b>' + T ('Congratulations, you\'re done!') + '</b></p>');
         if (n_incorrect == 0) {
            if (quiz_set == 'quiz') {
               summary_line = T ('In this %s-question quiz you answered every question correctly on the first try!');
            } else {
               summary_line = T ('In this %s-question set you answered every question correctly on the first try!');
            }
         } else {
            if (quiz_set == 'quiz') {
               if (n_incorrect == 1) {
                  summary_line = T ('In finishing this %s-question quiz you entered one incorrect answer');
               } else {
                  summary_line = T ('In finishing this %s-question quiz you entered %s incorrect answers');
               }
            } else {
               if (n_incorrect == 1) {
                  summary_line = T ('In finishing this %s-question set you entered one incorrect answer');
               } else {
                  summary_line = T ('In finishing this %s-question set you entered %s incorrect answers');
               }
            }
         }
         summary_line = summary_line.replace ('%s', qqc.number_to_word (n_questions));
         if (n_incorrect > 1) {
            summary_line = summary_line.replace ('%s', qqc.number_to_word (n_incorrect));
         }
      } else {
         if (n_incorrect == 0) {
            summary_line = T ('Congratulations, you answered all questions correctly');
         } else {
            summary_line = T ('Your score is %s out of %s questions');
            summary_line = summary_line.replace ('%', qqc.number_to_word (n_correct));
            summary_line = summary_line.replace ('%', qqc.number_to_word (n_questions));
         }
      }
      report_html.push ('<p>' + summary_line + '</p>');
      var n_topics = 0;
      if (qwizdata[i_qwiz].topics) {
         n_topics = qwizdata[i_qwiz].topics.length;
      }
      if (n_topics == 1) {
         var topic = qwizdata[i_qwiz].topics[0];
         if (topic != 'Other') {
            var all_both_n;
            if (n_questions == 1) {
               report_html.push ('<p>The question was about topic &ldquo;' + topic + '.&rdquo;</p>');
            } else {
               if (n_questions == 2) {
                  all_both_n = T ('Both');
               } else {
                  all_both_n = T ('All') + ' '+ qqc.number_to_word (n_questions);
               }
               report_html.push ('<p>' + all_both_n + ' ' + plural (T ('question'), T ('questions'), n_questions) + ' were about topic &ldquo;' + topic + '.&rdquo;</p>');
            }
         }
      } else if (n_topics > 1 && n_incorrect > 0) {
         var incorrect_topics = [];
         for (var i_topic=0; i_topic<n_topics; i_topic++) {
            var topic = qwizdata[i_qwiz].topics[i_topic];
            var n_topic_correct = qwizdata[i_qwiz].topic_statistics[topic].n_correct;
            var n_topic_incorrect = qwizdata[i_qwiz].topic_statistics[topic].n_incorrect;
            var n_topic_items = n_topic_correct + n_topic_incorrect;
            if (n_topic_incorrect > 0) {
               topic = topic.replace (/_/g, ' ');
               var topic_text = '<strong>' + topic + '</strong>: ' + qqc.number_to_word (n_topic_incorrect) + ' ' + T ('incorrect');
               incorrect_topics.push (topic_text);
            }
         }
         var n_incorrect_topics = incorrect_topics.length;
         var topics_html = [];
         if (n_incorrect_topics > 1) {
            topics_html.push (T ('These are the topics of questions that you answered incorrectly'));
            topics_html.push ('<ul>');
            for (var i=0; i<n_incorrect_topics; i++) {
               topics_html.push ('<li>');
               topics_html.push (   incorrect_topics[i]);
               topics_html.push ('</li>');
            }
            topics_html.push ('</ul>');
         } else {
            if (n_incorrect == 1) {
               topics_html.push (T ('The topic of the only question you answered incorrectly is') + '<br />');
            } else {
               topics_html.push (T ('The topic of the questions you answered incorrectly is') + '<br />');
            }
            topics_html.push (incorrect_topics[0]);
         }
         report_html.push (topics_html.join ('\n'));
      }
      $ ('#summary_report-qwiz' + i_qwiz).html (report_html.join ('\n'));
      if (qwizdata[i_qwiz].qwiz_timer && ! q.qwizard_b && ! q.preview) {
         var show_histogram = true;
         if (qwizdata[i_qwiz].n_qs) {
            if (qwizdata[i_qwiz].n_qs_done.size) {
               show_histogram = false;
            }
         }
         const $histogram_div = $ ('div#summary-quiz_times_histogram-qwiz' + i_qwiz).html ('');
         if (show_histogram) {
            const plugin_url = qqc.get_qwiz_param ('url', './');
            const spinner    = `<div style="text-align: center;">
                                  <img src="${plugin_url}images/spinner40x40.gif" />'
                                <div>`;
            $histogram_div.html (spinner);
            var data = {summary: 1};
            const qrecord_id = qwizdata[i_qwiz].qrecord_id;
            if (qrecord_id.indexOf ('finish_times_demo') != -1) {
               data.demo_taker_time = qwizdata[i_qwiz].elapsed_time;
            }
            var n_tries = 0;
            const delay_get_quiz_times = function () {
               if (qwizdata[i_qwiz].when_done_unix || n_tries > 5) {
                  qqc.qjax (qname, i_qwiz, qrecord_id, 'get_quiz_times', data);
               } else {
                  n_tries++;
                  setTimeout (delay_get_quiz_times, 250);
               }
            }
            delay_get_quiz_times ();
         } else {
            $histogram_div.html ('');
         }
      }
   }
   var $summary = $ ('#summary-qwiz' + i_qwiz);
   if (q.qwizard_b) {
      if ($summary.find ('div[contenteditable]').length == 0) {
         qwizard.init_tinymce ('div#qwiz_exit-qwiz' + i_qwiz + '.qwiz_editable');
      }
   }
   var $qwiz_img = $summary.find ('input[name="qwiz_img"]');
   if ($qwiz_img.length) {
      $qwiz_img.changeElements ('img');
   }
   if (qwizdata[i_qwiz].cv_index) {
      $summary.find ('button.qwiz_restart').remove ();
   }
   $summary.show ();
   qwizdata[i_qwiz].i_question = qwizdata[i_qwiz].n_questions;
}
this.draw_histogram = function (data) {
   if (debug[0]) {
      console.log ('[draw_histogram] data:', data);
   }
   const i_qwiz              = data.i_qwiz;
   const summary_leaderboard = data.summary == 1 ? 'summary' : 'leaderboard';
   const $histogram_div      = $ ('div#' + summary_leaderboard + '-quiz_times_histogram-qwiz' + data.i_qwiz);
   qwizdata[i_qwiz].qwiz_histogram_data = data;
   if (data.everyone) {
      qwizdata[i_qwiz].leaderboard_class_everyone = data.everyone;
      var msg = S ('Few or no results available for') + ' ';
      if (document_qwiz_school_id != 1) {
         msg += S ('your class') + '.';
      } else {
         msg += S ('independent students') + '.';
      }
      msg += '\n' + S ('Showing results for everyone') + '.';
      alert (msg);
   }
   if (data.errmsg) {
      alert ('Sorry, unable to retrieve data for your classes');
      return false;
   }
   if (data.i_takers.length == 0) {
      $histogram_div.html ('(No data available for fastest-times graph)');
      return;
   } else if (data.i_takers.length == 1) {
      if (summary_leaderboard == 'summary') {
         var htm;
         if (document_qwiz_school_id != 1) {
            htm = S ('You&rsquo;re the first person in your class to take this quiz!');
         } else {
            htm = S ('You&rsquo;re the first independent student to take this quiz!');
         }
         htm +=  '&nbsp; '
               + S ('You can enter your initials') + ':'
               + '<br />'
               + qwiz_times_histogram_initials_html (i_qwiz, qwizdata[i_qwiz].quiz_elapsed_time_id, '')
               + '<br />'
               + S ('Come back later to see more finish times') + '.';
         $histogram_div.html (htm);
         $histogram_div.find ('emoji-picker')
            .on ('emoji-click', function () {
               pick_emoji (event, i_qwiz);
            });
      } else {
         var htm;
         if (document_qwiz_school_id != 1) {
            htm = S ('Only one person in your class has taken this quiz.');
         } else {
            htm = S ('Only one independent student has taken this quiz.');
         }
         htm +=  '<br />'
               + S ('Come back later to see more finish times') + '.'
               + qwiz_times_histogram_class_everyone_html (i_qwiz, data, true);
         $histogram_div.html (htm);
      }
      return;
   }
   htm = [];
   htm.push ('<div class="qwiz_times_histogram_title">');
   htm.push ('</div>');
   htm.push ('<div class="qwiz_times_histogram">');
   const style = document_qwiz_maker_privileges ? ' style="max-height: 200px; overflow: auto;"' : '';
   htm.push (   '<div class="qwiz_times_histogram_legend"' + style + '>');
   htm.push (      '<div class="qwiz_times_histogram_legend_header">');
   htm.push (      '</div>');
   htm.push (      '<div class="qwiz_times_histogram_legend_content">');
   htm.push (      '</div>');
   htm.push (   '</div>');
   htm.push (   '<div class="qwiz_times_histogram_h_label">');
   htm.push (      '<b>' + S ('Finish time (min:sec)') + ' &nbsp; (<i>' + S ('faster') + '</i></b> &#10132;<b>)</b>');
   htm.push (   '</div>');
   htm.push (   '<div class="qwiz_times_histogram_v_label qwiz_times_histogram_v_axis">');
   htm.push (      '<b>' + S ('Number done') + '</b>');
   htm.push (   '</div>');
   htm.push ('</div>');
   $histogram_div.html (htm.join ('\n'));
   const times  = data.times;
   const r = stats (times);
   if (debug[0]) {
      console.log ('[draw_histogram] r:', r);
   }
   const too_big_fac = 3;
   const too_big = parseInt (too_big_fac * r.median / 10)*10 + 10;
   if (r.sorted[0] > too_big) {
      var i = 1;
      while (r.sorted[i] > too_big) {
         i++;
      }
      r.max = r.sorted[i];
      if (debug[0]) {
         console.log ('[draw_histogram] r.max:', r.max);
      }
   }
   const n      = times.length;
   var   n_bins = 15;
   if (n < 25) {
      n_bins = 10;
   } else if (n > 40) {
      n_bins = 20;
   }
   const times_range        = r.max - r.min + 0.01;
   const bin_width          = times_range/n_bins;
   const bin_width_pct      = (bin_width/times_range * 100.0).toFixed (2);
   const half_bin_width_pct = (bin_width/times_range *  50.0);
   var bin_counts = new Array (n_bins).fill (0);
   var times_for_rank = [];
   var n_reported = 0;
   for (var i=0; i<n; i++) {
      if (times[i] <= r.max) {
         const i_bin = Math.floor ((times[i] - r.min)/bin_width)
         bin_counts[i_bin]++;
         n_reported++;
      }
      times_for_rank.push ([times[i], i]);
   }
   times_for_rank.sort (function (a, b) {
                           return a[0] - b[0];
                        });
   var   ranks = [];
   var i_prev;
   var t_prev = -1;
   for (var i=0; i<n; i++) {
      const t  = times_for_rank[i][0];
      const ii = times_for_rank[i][1];
      if (t > t_prev) {
         t_prev = t;
         i_prev = i;
      }
      ranks[ii] = i_prev;
   }
   if (debug[0]) {
      console.log ('[draw_histogram] bin_width:', bin_width);
      console.log ('[draw_histogram] bin_counts:', bin_counts);
      console.log ('[draw_histogram] times_for_rank:', times_for_rank);
      console.log ('[draw_histogram] ranks:', ranks);
   }
   var max_bin_count = 0;
   for (var i_bin=0; i_bin<n_bins; i_bin++) {
      max_bin_count = Math.max (max_bin_count, bin_counts[i_bin]);
   }
   const $qwiz_times_histogram = $histogram_div.find ('div.qwiz_times_histogram');
   const quiz_header = data.quiz_header ? '&ldquo;' + data.quiz_header + '&rdquo;s' : S ('times this quiz');
   const too_big_hhmmss = qqc.hhmmss_from_sec (too_big);
   const cutoff = n_reported == n ? '' : ' ' + S ('within') + ' ' + too_big_hhmmss + ' ' + S ('cutoff');
   var   histogram_title;
   if (document_qwiz_user_logged_in_b) {
      if (document_qwiz_school_id != 1) {
         if (document_qwiz_maker_privileges) {
            histogram_title = S ('Quizzes done by your classes');
         } else {
            histogram_title = S ('Quizzes done by your class');
         }
      } else {
         histogram_title = S ('Quizzes done most recently by independent students');
      }
      if (qwizdata[i_qwiz].leaderboard_class_everyone) {
         histogram_title = S ('Quizzes done most recently');
      }
      const class_everyone = qwiz_times_histogram_class_everyone_html (i_qwiz, data);
      if (summary_leaderboard == 'summary') {
         $ ('div#summary-qwiz' + i_qwiz).append (class_everyone);
      } else {
         $histogram_div.append (class_everyone);
      }
   } else {
      histogram_title = S ('Quizzes done most recently');
   }
   const title_html = histogram_title + cutoff + ': ' + n_reported;
   $ ('div.qwiz_times_histogram_title').html (title_html);
   qwizdata[i_qwiz].$qwiz_times_histogram = $qwiz_times_histogram;
   for (var i_bin=0; i_bin<n_bins; i_bin++) {
      if (bin_counts[i_bin]) {
         const bar_right_pct  = ((i_bin + 0.5)/n_bins*100.0 - half_bin_width_pct).toFixed (2);
         const bar_height_pct = (bin_counts[i_bin]/max_bin_count * 100).toFixed (2);
         const bar_html =  '<div class="qwiz_times_histogram_bar qwiz_times_histogram_bar' + i_bin + '" style="right: ' + bar_right_pct + '%; width: calc(' + bin_width_pct + '% + 1px); height: ' + bar_height_pct+ '%;">'
                         +    '<div class="qwiz_times_histogram_bar_label">'
                         +       bin_counts[i_bin]
                         +    '</div>';
                         + '</div>';
         $qwiz_times_histogram.append (bar_html);
         const bin_label_right_pct = ((i_bin + 0.5)/n_bins*100.0).toFixed (2);
         const bin_label_html =  '<div class="qwiz_times_histogram_bin_label" style="right: ' + bin_label_right_pct + '%;">'
                               +    bin_counts[i_bin]
                               + '</div>';
         $qwiz_times_histogram.append (bin_label_html);
      }
         const bin_right_pct = (i_bin/n_bins*100.0).toFixed (2);
         const bin_marker_html = '<div class="qwiz_times_histogram_bin_marker" style="right: ' + bin_right_pct + '%;"></div>';
         $qwiz_times_histogram.append (bin_marker_html);
   }
   const dates                 = data.dates;
   var   i_takers              = data.i_takers;
   const initialss             = data.initialss;
   const quiz_elapsed_time_ids = data.quiz_elapsed_time_ids;
   const d                     = stats (dates);
   var ii_new = -1;
   const most_recent_date_i_taker = qwizdata[i_qwiz].when_done_unix;
   if (summary_leaderboard == 'summary') {
      for (var i=0; i<n; i++) {
         if (i_takers[i] == data.i_taker) {
            if (dates[i] == most_recent_date_i_taker) {
               ii_new = i;
            } else if (dates[i] < 0) {
               ii_new = i;
               dates[i] = - dates[i];
            }
         }
      }
   }
   if (debug[0]) {
      console.log ('[draw_histogram] i_takers:', JSON.parse (JSON.stringify (i_takers)));
   }
   const qrecord_id = qwizdata[i_qwiz].qrecord_id;
   if (qrecord_id.indexOf ('finish_times_demo') == -1) {
      var max_taker = -1;
      for (var i=0; i<n; i++) {
         max_taker = Math.max (max_taker, i_takers[i]);
      }
      var u_takers = [...Array (max_taker+1).keys ()]
      shuffle (u_takers);
      for (var i=0; i<n; i++) {
         const i_taker = i_takers[i];
         i_takers[i] = u_takers[i_taker];
      }
      data.i_taker  = u_takers[data.i_taker];
      data.i_takers = i_takers;
      if (debug[0]) {
         console.log ('[draw_histogram] i_takers:', JSON.parse (JSON.stringify (i_takers)));
      }
   }
   const date_bin_width = (d.max - d.min + 0.01)/9;
   for (var i=0; i<n; i++) {
      if (times[i] <= r.max) {
         const i_gray = Math.floor ((d.max - dates[i])/date_bin_width);
         var taker_class = 'qwiz_times_histogram_taker' + i_takers[i];
         var student;
         if (initialss[i]) {
            student = S ('Student') + ': ' + initialss[i];
            if (data.i_taker == i_takers[i]) {
               student += ' (' + S ('you') + ')';
            }
         } else {
            student = S ('Student') + ': #' + (i_takers[i] + 1);
            if (data.i_taker == i_takers[i]) {
               taker_class += ' qwiz_times_histogram_taker_color'
               student      = S ('Student') + ': ' + S ('you');
            }
         }
         const marker_right_pct = ((times[i] - r.min)/times_range * 100.0).toFixed(2);
         const hhmmss            = qqc.hhmmss_from_sec (times[i]);
         const mmm_dd_hh_mm      = DateFormat.format.date (dates[i]*1000, 'MMM dd h:ss a');
         var   marker_title =  S ('Finish time:') + ' ' + hhmmss         + '\n'
                             + S ('Rank:')        + ' ' + (ranks[i] + 1)  + '\n'
                             + S ('Done:')        + ' ' + mmm_dd_hh_mm   + '\n'
                             + student                          + '\n'
                             +                                    '\n'
                             + S ('Click to highlight student');
         const marker_html =  '<div class="qwiz_times_histogram_marker_target qwiz_times_histogram_marker_target' + ranks[i] + '" onclick="' + qname + '.qwiz_times_histogram_show_student (this, ' + i_qwiz + ', ' + i_takers[i] + ', ' + data.i_taker + ')" style="right: ' + marker_right_pct + '%;" title="' + marker_title + '">'
                            +    '<div class="qwiz_times_histogram_marker qwiz_times_histogram_marker' + i_gray + ' qwiz_times_histogram_marker_gray ' + taker_class + '">'
                            +    '</div>'
                            + '</div>';
         $qwiz_times_histogram.append (marker_html);
      }
   }
   var h = [];
   const leaderboard_graph_options = qwizdata[i_qwiz].leaderboard_graph_options;
   const graph_selected = leaderboard_graph_options == 'Graph options' ? ' selected' : '';
   h.push ('<select class="qwiz-bold" onchange="' + qname + '.qwiz_times_histogram_leaderboard_graph_change (this.value, ' + i_qwiz + ', ' + data.summary + ')">');
   h.push (   '<option>');
   h.push (      'Leaderboard');
   h.push (   '</option>');
   h.push (   '<option' + graph_selected + '>');
   h.push (      'Graph options');
   h.push (   '</option>');
   h.push ('</select>');
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_header').html (h.join ('\n'));
   if (leaderboard_graph_options && leaderboard_graph_options == 'Graph options') {
      q.qwiz_times_histogram_graph_legend ($qwiz_times_histogram, i_qwiz, data.i_taker);
   } else {
      q.qwiz_times_histogram_leaderboard_legend (summary_leaderboard, $qwiz_times_histogram, i_qwiz, times, times_for_rank, ranks, i_takers, initialss, quiz_elapsed_time_ids, ii_new, data.i_taker);
   }
   const max_interval_sec = times_range/10;
   var interval_sec;
   if (max_interval_sec <= 5.0) {
      interval_sec = 5;
   } else if (max_interval_sec <= 10.0) {
      interval_sec = 10;
   } else if (max_interval_sec <= 20.0) {
      interval_sec = 20;
   } else if (max_interval_sec <= 30.0) {
      interval_sec = 30;
   } else {
      interval_sec = Math.floor (max_interval_sec/60.0 + 1)*60;
   }
   if (debug[0]) {
      console.log ('[draw_histogram] interval_sec:', interval_sec);
   }
   var tick_sec       = interval_sec - (r.min % interval_sec);
   var tick_label_sec = r.min - (r.min % interval_sec);
   while (tick_sec <= times_range) {
      const tick_pct = (tick_sec/times_range * 100.0).toFixed (2);
      const tick_html = '<div class="qwiz_times_histogram_h_tick" style="right: ' + tick_pct + '%;"></div>';
      $qwiz_times_histogram.append (tick_html);
      tick_label_sec += interval_sec;
      const hhmmss = qqc.hhmmss_from_sec (tick_label_sec);
      const label_html =  '<div class="qwiz_times_histogram_h_tick_label" style="right: ' + tick_pct + '%;">'
                        +    hhmmss
                        + '</div>';
      $qwiz_times_histogram.append (label_html);
      tick_sec       += interval_sec;
   }
   const approx_interval = max_bin_count / 8;
   var interval;
   if (approx_interval < 1.5) {
      interval = 1;
   } else if (approx_interval < 3.0) {
      interval = 2;
   } else if (approx_interval < 7.5) {
      interval = 5;
   } else if (approx_interval < 15.0) {
      interval = 10;
   } else {
      interval = Math.round (approx_interval/20.0)*20;
   }
   if (debug[0]) {
      console.log ('[draw_histogram] interval:', interval);
   }
   var tick = interval;
   while (tick <= max_bin_count) {
      const tick_pct = (tick/max_bin_count * 100.0).toFixed (2);
      const tick_html = '<div class="qwiz_times_histogram_v_tick         qwiz_times_histogram_v_axis" style="bottom: ' + tick_pct + '%;"></div>';
      $qwiz_times_histogram.append (tick_html);
      const label_html =  '<div class="qwiz_times_histogram_v_tick_label qwiz_times_histogram_v_axis" style="bottom: ' + tick_pct + '%;">'
                        +    tick
                        + '</div>';
      $qwiz_times_histogram.append (label_html);
      tick += interval;
   }
   const mmm_dd_hh_mm_top = DateFormat.format.date (d.max*1000, 'MMM dd h:ss a');
   const mmm_dd_hh_mm_bot = DateFormat.format.date (d.min*1000, 'MMM dd h:ss a');
   l = [];
   l.push ('<div class="qwiz_times_histogram_date_legend">');
   l.push (   '<div class="qwiz_times_histogram_date_legend_top">');
   l.push (      mmm_dd_hh_mm_top);
   l.push (   '</div>');
   for (var i_gray=0; i_gray<9; i_gray++) {
      l.push ('<div class="qwiz_times_histogram_date_legend_rect qwiz_times_histogram_marker' + i_gray + '">');
      l.push ('</div>');
   }
   l.push (   '<div class="qwiz_times_histogram_date_legend_bot">');
   l.push (      mmm_dd_hh_mm_bot);
   l.push (   '</div>');
   l.push ('</div>');
   $qwiz_times_histogram.append (l.join ('\n'));
   if (qwizdata[i_qwiz].qwiz_times_histogram_color_by_date) {
      $qwiz_times_histogram.find ('div.qwiz_times_histogram_marker').removeClass ('qwiz_times_histogram_marker_gray qwiz_times_histogram_taker_color qwiz_times_histogram_taker_color0 qwiz_times_histogram_taker_color1 qwiz_times_histogram_taker_color2 qwiz_times_histogram_taker_color3 qwiz_times_histogram_taker_color4 qwiz_times_histogram_taker_color5 qwiz_times_histogram_taker_color6 qwiz_times_histogram_taker_color7 qwiz_times_histogram_taker_color8');
      $qwiz_times_histogram.find ('div.qwiz_times_histogram_date_legend').show ();
      const $checkbox = $qwiz_times_histogram.find ('input.qwiz_times_histogram_color_by_date');
      if ($checkbox.length) {
         $checkbox[0].checked = true;
      }
   }
   if (qwizdata[i_qwiz].qwiz_times_histogram_show_bin_counts) {
      if (qwizdata[i_qwiz].qwiz_times_histogram_show_bars) {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar_label').show ();
      } else {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').show ();
      }
      const $checkbox = $qwiz_times_histogram.find ('input.qwiz_times_histogram_show_bin_counts');
      if ($checkbox.length) {
         $checkbox[0].checked = true;
      }
   }
   if (qwizdata[i_qwiz].qwiz_times_histogram_show_bars) {
      $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar').show ();
      $qwiz_times_histogram.find ('div.qwiz_times_histogram_v_axis').show ();
      const $checkbox = $qwiz_times_histogram.find ('input.qwiz_times_histogram_show_bars');
      if ($checkbox.length) {
         $checkbox[0].checked = true;
      }
   }
}
function qwiz_times_histogram_class_everyone_html (i_qwiz, data, adjust_pos) {
   var class_independent_students;
   if (document_qwiz_school_id != 1) {
      class_independent_students = S ('Your class');
   } else {
      class_independent_students = S ('Independent students');
   }
   var everyone_checked = '';
   var class_checked    = '';
   if (qwizdata[i_qwiz].leaderboard_class_everyone) {
      everyone_checked = ' checked';
   } else {
      class_checked    = ' checked';
   }
   var style = '';
   if (adjust_pos) {
      style = ' style="right: 5px; top: 12px;"';
   }
   const htm =  '<div class="qwiz_times_histogram_class_everyone"' + style + '>'
              +    '<label>'
              +       '<input type="radio" name="qwiz_times_histogram_class_everyone" class="qwiz_radio_smaller_shift" onclick="' + qname + '.qwiz_times_histogram_class_everyone (0, ' + i_qwiz + ', ' + data.summary + ')"' + class_checked    + ' />'
              +       class_independent_students
              +    '</label>'
              +    '<br />'
              +    '<label>'
              +       '<input type="radio" name="qwiz_times_histogram_class_everyone" class="qwiz_radio_smaller_shift" onclick="' + qname + '.qwiz_times_histogram_class_everyone (1, ' + i_qwiz + ', ' + data.summary + ')"' + everyone_checked + ' />'
              +       S ('Everyone')
              +    '</label>'
              + '</div>';
   return htm;
}
this.qwiz_times_histogram_class_everyone = function (everyone, i_qwiz, summary) {
   var data = {summary:    summary,
               everyone:   everyone};
   qwizdata[i_qwiz].leaderboard_class_everyone = everyone;
   qqc.qjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'get_quiz_times', data);
}
this.qwiz_times_histogram_show_student = function (rect_el, i_qwiz, i_taker, current_taker) {
   const $qwiz_times_histogram = qwizdata[i_qwiz].$qwiz_times_histogram;
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_marker_target').removeClass ('qwiz_times_histogram_taker_color qwiz_times_histogram_taker_color0 qwiz_times_histogram_taker_color1 qwiz_times_histogram_taker_color2 qwiz_times_histogram_taker_color3 qwiz_times_histogram_taker_color4 qwiz_times_histogram_taker_color5 qwiz_times_histogram_taker_color6 qwiz_times_histogram_taker_color7 qwiz_times_histogram_taker_color8');
   const taker_color = i_taker == current_taker ? '' : i_taker % 9;
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_taker' + i_taker).parent ().addClass ('qwiz_times_histogram_taker_color' + taker_color);
   const student_html = i_taker == current_taker ? 'You' : 'Student #' + (i_taker + 1);
   $qwiz_times_histogram.find ('span.qwiz_times_histogram_legend_student').html (student_html);
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_color').attr ('class', 'qwiz_times_histogram_legend_color qwiz_times_histogram_taker_color' + taker_color);
   qwizdata[i_qwiz].i_taker_shown = i_taker;
}
this.qwiz_times_histogram_leaderboard_graph_change = function (leaderboard_graph_options,
                                                               i_qwiz, summary) {
   qwizdata[i_qwiz].leaderboard_graph_options = leaderboard_graph_options;
   var data = {summary: summary};
   const qrecord_id = qwizdata[i_qwiz].qrecord_id;
   if (qrecord_id.indexOf ('finish_times_demo') != -1) {
      data.demo_taker_time = qwizdata[i_qwiz].elapsed_time;
   }
   qqc.qjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'get_quiz_times', data);
}
this.qwiz_times_histogram_leaderboard_legend
               = function (summary_leaderboard, $qwiz_times_histogram, i_qwiz,
                           times, times_for_rank, ranks, i_takers, initialss,
                           quiz_elapsed_time_ids, ii_new, i_taker) {
   const n = i_takers.length;
   var   initials_val = '';
   if (summary_leaderboard == 'summary') {
      for (var i=0; i<n; i++) {
         if (i_taker == i_takers[i] && initialss[i]) {
            initials_val = initialss[i];
            const escaped_initials_val = qqc.addSlashes (initials_val);
            q.update_leaderboard_initials (escaped_initials_val, '', i_qwiz, qwizdata[i_qwiz].quiz_elapsed_time_id);
            break;
         }
      }
   }
   var emoji_picker_f = false;
   var l = [];
   l.push ('<table>');
   l.push (   '<tr>');
   if (! document_qwiz_maker_privileges) {
      l.push (   '<td>');
      l.push (      '<table>');
   }
   const plugin_url = qqc.get_qwiz_param ('url', './');
   const n_leaders = document_qwiz_maker_privileges ? i_takers.length : Math.min (10, i_takers.length);
   for (var i=0; i<n_leaders; i++) {
      const ii = times_for_rank[i][1];
      if (i == 5 && ! document_qwiz_maker_privileges) {
         l.push (   '</table>');
         l.push ('</td>');
         l.push ('<td style="border-left: 1px solid gray;">');
         l.push (   '<table>');
      }
      if (document_qwiz_maker_privileges) {
         l.push (      '<tr class="quiz_elapsed_time_id' + quiz_elapsed_time_ids[ii] + '">');
         l.push (         '<td style="padding: 1px 0 0 0;">');
         l.push (            '<img src="' + plugin_url + '/images/delete.png" class="qwiz_icon_smaller" onclick="' + qname + '.delete_leaderboard_entry (' + i_qwiz + ', ' + quiz_elapsed_time_ids[ii] + ')" title="' + S ('Teachers only: delete this entry') + '" />');
         l.push (         '</td>');
      } else {
         l.push (      '<tr>');
      }
      l.push (            '<td class="qwiz-bold qwiz-right">');
      l.push (               ranks[ii] + 1);
      l.push (            '</td>');
      l.push (            '<td onmouseenter="' + qname + '.qwiz_times_histogram_highlight_leader (1, this, ' + i_qwiz + ', ' + ranks[ii] + ')" onmouseleave="' + qname + '.qwiz_times_histogram_highlight_leader (0, this, ' + i_qwiz + ', ' + ranks[ii] + ')">');
      var student;
      if (initialss[ii]) {
         student = initialss[ii];
         if (i_taker == i_takers[ii]) {
            student += ' (you)';
         }
      } else {
         student = S ('Student') + ' #' + (i_takers[ii] + 1);
         if (i_taker == i_takers[ii]) {
            if (summary_leaderboard == 'summary' && ii == ii_new) {
               student = qwiz_times_histogram_initials_html (i_qwiz, qwizdata[i_qwiz].quiz_elapsed_time_id, initials_val);
               emoji_picker_f = true;
            } else {
               student = S ('You');
            }
         }
      }
      l.push (               student);
      l.push (            '</td>');
      l.push (            '<td class="qwiz-right">');
      const hhmmss = qqc.hhmmss_from_sec (times[ii]);
      l.push (               hhmmss);
      l.push (            '</td>');
      l.push (         '</tr>');
   }
   if (! document_qwiz_maker_privileges) {
      l.push (      '</table>');
      l.push (   '</td>');
   }
   l.push (   '</tr>');
   l.push ('</table>');
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_content').html (l.join ('\n'));
   if (emoji_picker_f) {
      $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_content emoji-picker')
         .on ('emoji-click', function () {
            pick_emoji (event, i_qwiz);
         });
      const $input = $qwiz_times_histogram.find ('input.qwiz_times_histogram_initials');
      if (initials_val) {
         $input.css ({background: 'white'});
      } else {
         $input.focus ();
      }
   }
}
this.delete_leaderboard_entry = function (i_qwiz, quiz_elapsed_time_id) {
   data = {quiz_elapsed_time_id: quiz_elapsed_time_id};
   qqc.jjax (qname, i_qwiz, '', 'delete_quiz_elapsed_time', data);
}
this.delete_leaderboard_entry_callback = function (data) {
   if (debug[0]) {
      console.log ('[delete_leaderboard_entry_callback] data:', data);
   }
   if (data.errmsg) {
      alert (data.errmsg);
   } else {
      $ ('div#qwiz' + data.i_qwiz + ' div.qwiz_times_histogram_legend_content tr.quiz_elapsed_time_id' + data.quiz_elapsed_time_id).remove ();
   }
}
function pick_emoji (e, i_qwiz) {
   const input_el = $ ('input.qwiz_times_histogram_initials-qwiz' + i_qwiz)[0];
   input_el.value = leaderboard_initials_ok (input_el.value + e.detail.unicode);
}
function leaderboard_initials_ok (input_value) {
   if (input_value.toLowerCase () == 'fuk') {
      return '';
   }
   const initials = Array.of (...input_value);
   const n        = initials.length;
   var n_non_empty = 0;
   var ok_initials = '';
   for (var i=0; i<n; i++) {
      if (initials[i] != '') {
         ok_initials += initials[i];
         n_non_empty++;
         if (n_non_empty == 3) {
            break;
         }
      }
   }
   return ok_initials;
}
function qwiz_times_histogram_initials_html (i_qwiz, quiz_elapsed_time_id, initials_val) {
   if (! quiz_elapsed_time_id) {
      quiz_elapsed_time_id = 0;
   }
   const plugin_url = qqc.get_qwiz_param ('url', './');
   const htm  =   '<div class="qwiz_times_histogram_initials">'
                +    '<input class="qwiz_times_histogram_initials qwiz_times_histogram_initials-qwiz' + i_qwiz + '" oninput="' + qname + '.check_leaderboard_initials (this)" title="' + S ('Identify yourself - initials, other characters, or emojis! (optional)') + '" value="' + initials_val + '" /> '
                +    '<svg class="qwiz_times_histogram_initials" onclick="' + qname + '.show_hide_emoji_picker (' + i_qwiz + ')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><title>' + S ('Show/hide emoji picker') + '</title><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path></svg> '
                +    '<button class="qwiz_times_histogram_initials" onclick="' + qname + '.update_leaderboard_initials (\'\', this, ' + i_qwiz + ', ' + quiz_elapsed_time_id + ')">' + S ('Save') + '</button>'
                +    '<div class="emoji-picker emoji-picker-qwiz' + i_qwiz + '">'
                +       '<emoji-picker></emoji-picker>'
                +       '<img class="icon_emoji_picker_exit" onclick="jQuery (\'div.emoji-picker-qwiz' + i_qwiz + '\').hide ()" src="' + plugin_url + '/images/icon_exit_bw.jpg" /></div>'
                +    '</div>'
                + '</div>';
   return htm;
}
this.show_hide_emoji_picker = function (i_qwiz) {
   $ ('div.emoji-picker-qwiz' + i_qwiz).toggle ();
}
this.check_leaderboard_initials = function (input_el) {
   input_el.value = leaderboard_initials_ok (input_el.value);
}
this.update_leaderboard_initials = function (initials, button_el, i_qwiz, quiz_elapsed_time_id) {
   if (! initials) {
      const $input = $ (button_el).prevAll ('input.qwiz_times_histogram_initials');
      initials = $input.val ();
      if (initials) {
         const data = qwizdata[i_qwiz].qwiz_histogram_data;
         const n = data.i_takers.length;
         for (var i=0; i<n; i++) {
            if (initials == data.initialss[i] && data.i_takers[i] != data.i_taker) {
               alert (S ('These initials have already been used by someone else'));
               $input.focus ();
               return;
            }
         }
      }
      $input.css ({background: 'white'});
   }
   $ ('div.emoji-picker-qwiz' + i_qwiz).hide ();
   if (quiz_elapsed_time_id) {
      const plugin_url     = qqc.get_qwiz_param ('url', './');
      const spinner        = '<img src="' + plugin_url + 'images/spinner16x16.gif" />';
      const $histogram_div = $ ('div#summary-quiz_times_histogram-qwiz' + i_qwiz);
      $histogram_div.find ('button.qwiz_times_histogram_initials').html (spinner);
      const data = {quiz_elapsed_time_id: quiz_elapsed_time_id,
                    initials:             initials,
                    callback:             'update_quiz_elapsed_time_callback'};
      qqc.qjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'update_quiz_elapsed_time', data);
   }
}
this.update_quiz_elapsed_time_callback = function (i_qwiz, errmsg) {
   const $histogram_div = $ ('div#summary-quiz_times_histogram-qwiz' + i_qwiz);
   $histogram_div.find ('button.qwiz_times_histogram_initials').html (T ('Save'));
   if (errmsg) {
      alert (errmsg);
   }
}
this.qwiz_times_histogram_highlight_leader = function (on_off, td_el, i_qwiz,
                                                       i_rank) {
   const $td = $ (td_el);
   const $qwiz_times_histogram = qwizdata[i_qwiz].$qwiz_times_histogram;
   const $marker_target = $qwiz_times_histogram.find ('div.qwiz_times_histogram_marker_target' + i_rank);
   if (on_off == 1) {
      $td.addClass ('qwiz_times_histogram_highlight');
      $marker_target.addClass ('qwiz_times_histogram_highlight');
   } else {
      $td.removeClass ('qwiz_times_histogram_highlight');
      $marker_target.removeClass ('qwiz_times_histogram_highlight');
   }
}
this.qwiz_times_histogram_graph_legend = function ($qwiz_times_histogram,
                                                   i_qwiz, i_taker) {
   var l = [];
   const taker_color = i_taker > -1 ? ' qwiz_times_histogram_taker_color' : '';
   l.push ('<div class="qwiz_times_histogram_legend_color' + taker_color + '">');
   l.push ('</div>');
   l.push ('<span class="qwiz_times_histogram_legend_student">');
   l.push (   'You');
   l.push ('</span>');
   l.push ('<br />');
   l.push ('<label>');
   l.push (   '<input type="checkbox" class="qwiz_times_histogram_color_by_date"    onchange="' + qname + '.qwiz_times_histogram_legend_change (this.className, this.checked, ' + i_qwiz + ', ' + i_taker + ')" style="margin-right: 3px; margin-left: 0;" />' + S ('When done'));
   l.push ('</label>');
   l.push ('&nbsp;');
   l.push ('<label>');
   l.push (   '<input type="checkbox" class="qwiz_times_histogram_show_bin_counts"  onchange="' + qname + '.qwiz_times_histogram_legend_change (this.className, this.checked, ' + i_qwiz + ', ' + i_taker + ')" style="margin-right: 3px;"                 />#/' + S ('bin'));
   l.push ('</label>');
   l.push ('&nbsp;');
   l.push ('<label>');
   l.push (   '<input type="checkbox" class="qwiz_times_histogram_show_bars"        onchange="' + qname + '.qwiz_times_histogram_legend_change (this.className, this.checked, ' + i_qwiz + ', ' + i_taker + ')" style="margin-right: 3px;"                 />' + S ('Bars'));
   l.push ('</label>');
   $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_content').html (l.join ('\n'));
   qwizdata[i_qwiz].i_taker_shown = i_taker;
}
this.qwiz_times_histogram_legend_change = function (classname, checked, i_qwiz, current_taker) {
   $qwiz_times_histogram = qwizdata[i_qwiz].$qwiz_times_histogram;
   if (classname == 'qwiz_times_histogram_color_by_date') {
      if (checked) {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_marker').removeClass ('qwiz_times_histogram_marker_gray qwiz_times_histogram_taker_color qwiz_times_histogram_taker_color0 qwiz_times_histogram_taker_color1 qwiz_times_histogram_taker_color2 qwiz_times_histogram_taker_color3 qwiz_times_histogram_taker_color4 qwiz_times_histogram_taker_color5 qwiz_times_histogram_taker_color6 qwiz_times_histogram_taker_color7 qwiz_times_histogram_taker_color8');
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_date_legend').show ();
      } else {
         const i_taker_shown = qwizdata[i_qwiz].i_taker_shown;
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_marker').addClass ('qwiz_times_histogram_marker_gray');
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_taker' + i_taker_shown).addClass ('qwiz_times_histogram_taker');
         const student_html = i_taker_shown == current_taker ? 'You' : 'Student #' + (i_taker_shown + 1);
         $qwiz_times_histogram.find ('span.qwiz_times_histogram_legend_student').html (student_html);
         const taker_color = i_taker_shown == current_taker ? '' : i_taker_shown % 9;
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_legend_color').attr ('class', 'qwiz_times_histogram_legend_color qwiz_times_histogram_taker_color' + taker_color);
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_date_legend').hide ();
      }
      qwizdata[i_qwiz].qwiz_times_histogram_color_by_date = checked;
   } else if (classname == 'qwiz_times_histogram_show_bin_counts') {
      if (checked) {
         if (qwizdata[i_qwiz].qwiz_times_histogram_show_bars) {
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar_label').show ();
         } else {
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').show ();
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_marker').show ();
         }
      } else {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar_label').hide ();
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').hide ();
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_marker').hide ();
      }
      qwizdata[i_qwiz].qwiz_times_histogram_show_bin_counts = checked;
   } else if (classname == 'qwiz_times_histogram_show_bars') {
      if (checked) {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar').show ();
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_v_axis').show ();
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_marker').hide ();
         if (qwizdata[i_qwiz].qwiz_times_histogram_show_bin_counts) {
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar_label').show ();
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').hide ();
         } else {
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar_label').hide ();
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').hide ();
         }
      } else {
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_bar').hide ();
         $qwiz_times_histogram.find ('div.qwiz_times_histogram_v_axis').hide ();
         if (qwizdata[i_qwiz].qwiz_times_histogram_show_bin_counts) {
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_marker').show ();
            $qwiz_times_histogram.find ('div.qwiz_times_histogram_bin_label').show ();
         }
      }
      qwizdata[i_qwiz].qwiz_times_histogram_show_bars = checked;
   }
}
function stats (x_orig) {
   const x = [...x_orig].sort (function (a, b) {
                                  return b - a;
                               });
   const n   = x.length;
   const max = x[0];
   const min = x[n-1];
   var sum = 0;
   for (var i=0; i<n; i++) {
      sum += x[i];
   }
   var   median;
   if (n % 2) {
      const i = (n - 1)/2;
      median = x[i];
   } else {
      const i = n/2;
      median = 0.5*(x[i-1] + x[i]);
   }
   const mean = sum / n;
   return {min: min, max: max, median: median, mean: mean, sorted: x};
}
function shuffle (a) {
   var i = a.length - 1;
   while (i > 0) {
      const j = Math.floor (Math.random () * (i + 1));
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
      i--;
   }
   if (debug[0]) {
      console.log ('[shuffle] a:', a);
   }
}
function check_qwiz_tag_pairs (htm) {
   var new_htm = '';
   var matches = htm.match (/\[qwiz|\[\/qwiz\]/gm);
   if (matches) {
      var n_tags = matches.length;
      var error_b = false;
      if (n_tags % 2 != 0) {
         error_b = true;
      } else {
         for (var i=0; i<n_tags; i++) {
            if (i % 2 == 0) {
               if (matches[i] != '[qwiz') {
                  error_b = true;
                  break;
               }
            } else {
               if (matches[i] != '[/qwiz]') {
                  error_b = true;
                  break;
               }
            }
         }
      }
      if (error_b) {
         if (debug[0]) {
            console.log ('[check_qwiz_tag_pairs] (error_b) htm.substr (0, 1000):', htm.substr (0, 1000));
         }
         const pos_more = htm.search (/<[pa] class="more-link|<div class="(search|blog)-entry-readmore/);
         if (pos_more != -1) {
            const pos_qwiz = htm.indexOf ('[qwiz');
            if (pos_qwiz != -1) {
               new_htm = htm.substring (0, pos_qwiz) + htm.substr (pos_more);
            } else {
               new_htm = htm;
            }
         } else if (htm.indexOf ('class="entry-summary') != -1) {
            const pos_qwiz = htm.indexOf ('[qwiz');
            const pos_more = htm.search (/\s*\[\u2026\]/);
            if (pos_qwiz != -1 && pos_more != -1) {
               new_htm = htm.substring (0, pos_qwiz) + htm.substr (pos_more);
            } else {
               new_htm = htm;
            }
         } else {
            errmsgs.push (T ('Unmatched [qwiz] - [/qwiz] pairs.'));
            new_htm = 'NA';
         }
         if (debug[0]) {
            console.log ('[check_qwiz_tag_pairs] (error_b) new_htm:', new_htm);
         }
      }
   }
   return new_htm;
}
function create_radio_button_html (i_qwiz, i_question, i_choice, choice_tag) {
   var htm = '';
   var data_correct = '';
   var correct = 0;
   if (choice_tag == '[c*]') {
      data_correct = 'data-q="1" ';
      correct = 1;
   }
   var title   = '';
   var onclick = ' onclick="' + qname + '.process_choice (event, \'qwiz' + i_qwiz + '-q' + i_question + '-a' + i_choice + '\')"';
   if (q.qwizard_b) {
      title = ' title="' + T ('Click to see feedback for this answer choice') + '"';
   }
   htm += '<input type="radio" id="radio-qwiz' + i_qwiz + '-q' + i_question + '-a' + i_choice + '" name="qwiz' + i_qwiz + '-q' + i_question + '" ' + data_correct + ' class="qwiz_choice_radio"' + title + ' />\n';
   if (debug[1]) {
      console.log ('[create_radio_button_html] htm: ', htm);
   }
   return {'correct': correct,
           'htm':     htm};
}
this.process_choice = function (e, feedback_id, correct_b, got_it_more_practice_f) {
   if (e) {
      e.stopPropagation ();
   }
   var got_it_more_practice_f = got_it_more_practice_f ? 1 : 0;
   var matches = feedback_id.match (/(.*)-/);
   var qwizq_id = matches[1];
   var qwiz_id = feedback_id.match (/(qwiz.*?)-/)[1];
   i_qwiz = parseInt (qwiz_id.substr (4), 10);
   var i_question = feedback_id.match (/-q([0-9]+)-/)[1];
   if (debug[0]) {
      console.log ('[process_choice] feedback_id: ', feedback_id, ', qwizq_id: ', qwizq_id, ', i_qwiz: ', i_qwiz);
   }
   var record_start_delay = 10;
   if (! q.preview && qwizdata[i_qwiz].record_start_b && document_qwiz_user_logged_in_b) {
      record_start_delay = 500;
      qwizdata[i_qwiz].record_start_b = false;
      var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
   }
   if (q.qwizard_b) {
      var i_choice = feedback_id.match(/-a([0-9]+)$/)[1];
      var selector = 'span.choice-qwiz' + i_qwiz + '-q' + i_question + '-a' + i_choice;
      var $choice_text = $ (selector + ' span.qwiz-choice.qwiz_editable');
      $choice_text.css ({position: 'unset'});
      var choice_el = $choice_text[0];
      qw.answer_choice_focus (choice_el);
   }
   var secure_f = qwizdata[i_qwiz].qrecord_id
                   && qwizdata[i_qwiz].use_dataset
                   && ! qqc.isInteger (qwizdata[i_qwiz].dataset_id[i_question]);
   const mobile = feedback_id.substr (0, 7) == 'mobile_' ? 'mobile_' : '';
   const local_feedback_id = mobile ? feedback_id.substr (7) : feedback_id;
   var elm = document.getElementById ('radio-' + local_feedback_id);
   if (elm) {
      correct_b = !! $ ('#radio-' + local_feedback_id).data ('q');
   }
   var disabled;
   const choice_class = correct_b ? 'qwiz_correct_choice' : 'qwiz_incorrect_choice';
   const class_id     = mobile ? '#' : '.';
   if (mobile) {
      $ ('#' + qwizq_id + ' li.mobile_choice').hide ();
      $ ('#' + qwizq_id + ' .qwiz-feedback').hide ();
      if (! secure_f) {
         $ ('#' + feedback_id).show ();
         if (! q.qwizard_b) {
            $ (class_id + 'choice-' + feedback_id).addClass (choice_class);
         }
      }
      const $choice = $ ('#choice-' + feedback_id);
      $choice.show ();
      disabled = '';
   } else {
      disabled = $ ('input[name=' + qwizq_id + ']').attr ('disabled');
   }
   if (disabled == 'disabled') {
      return;
   }
   if (mobile) {
      feedback_id = feedback_id.substr (7);
      qwizq_id    = qwizq_id.substr (7);
   }
   $ ('#' + qwizq_id + ' .qwiz-feedback').hide ();
   process_choice_disable (feedback_id, qwizq_id);
   if (! secure_f) {
      $ ('#' + feedback_id).show ();
      if (! q.qwizard_b) {
         $ (class_id + 'choice-' + feedback_id).addClass (choice_class);
      }
   }
   if (qwizdata[i_qwiz].user_question_number == 1
               && (q.no_intro_b[i_qwiz] || qwizdata[i_qwiz].n_questions == 1)) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   if (secure_f || (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b)) {
      var i_choice = feedback_id.match(/-a([0-9]+)$/)[1];
      var choice_text = $ ('#' + qwizq_id + ' .choice-' + feedback_id).html ();
      if (choice_text) {
         choice_text = qqc.remove_tags_eols (choice_text);
      } else {
         choice_text = qqc.remove_tags_eols ($ ('#' + qwizq_id + ' button.qwiz_button').html ())
                       + '\t'
                       + qqc.remove_tags_eols ($ ('#' + feedback_id).html ());
      }
      var delay_jjax = function () {
         var data = {q_and_a_text:           btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                     q_and_a_crc32:          qwizdata[i_qwiz].q_and_a_crc32[i_question],
                     i_question:             qwizdata[i_qwiz].dataset_id[i_question],
                     unit:                   qwizdata[i_qwiz].unit[i_question],
                     type:                   'multiple_choice',
                     response:               choice_text,
                     i_choice:               i_choice,
                     correct_b:              correct_b ? 1 : '',
                     feedback_id:            mobile + feedback_id,
                     got_it_more_practice_f: got_it_more_practice_f,
                     confirm:                'js'};
         if (secure_f) {
            data.secure_f = 1;
         }
         if (q.preview_i_qwiz_plus1) {
            data.preview_no_record = 1;
         }
         if (qwizdata[i_qwiz].cv_index) {
            data.cv_index = qwizdata[i_qwiz].cv_index;
         }
         record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
      }
      setTimeout (delay_jjax, record_start_delay);
   }
   if (! secure_f) {
      q.process_choice2 (mobile + feedback_id, got_it_more_practice_f, correct_b, -1);
   }
};
function process_choice_disable (feedback_id, qwizq_id) {
   var mobile_b = feedback_id.substr (0, 6) == 'mobile';
   if (mobile_b) {
      feedback_id = feedback_id.substr (7);
      qwizq_id    = qwizq_id.substr (7);
   }
   var elm = document.getElementById ('radio-' + feedback_id);
   if (elm) {
      elm.checked = true;
      if (! q.qwizard_b && ! q.preview) {
         $ ('input[name=' + qwizq_id + ']').attr ('disabled', true);
      }
      $ (`#${qwizq_id} .choices-${qwizq_id}, #${qwizq_id} .choices-${qwizq_id} .qwiz-choice`)
         .css ({'cursor': 'auto', 'color': 'black'});
   }
}
this.process_choice2 = function (mobile_feedback_id, got_it_more_practice_f,
                                                     correct_b, feedback_html) {
   const i_qwiz     = mobile_feedback_id.match (/qwiz([0-9]+)-/)[1];
   const i_question = mobile_feedback_id.match (/-q([0-9]+)-/)[1];
   if (debug[0]) {
      console.log ('[process_choice2] correct_b:', correct_b, ', feedback_html:', feedback_html);
      console.log ('[process_choice2] i_question:', i_question);
   }
   const mobile_b     = mobile_feedback_id.substr (0, 6) == 'mobile';
   const choice_class = correct_b ? 'qwiz_correct_choice' : 'qwiz_incorrect_choice';
   const class_id     = mobile_b ? '#' : '.';
   if (feedback_html != -1) {
      if (preview_mode != 'show_answers') {
         $ ('#' + mobile_feedback_id).html (feedback_html).show ();
         $ (class_id + 'choice-' + mobile_feedback_id).addClass (choice_class);
      }
      if (mobile_b) {
         const feedback_id = mobile_feedback_id.substr (7);
         $ ('#' + feedback_id).html (feedback_html).show ();
         $ (class_id + 'choice-' + feedback_id).addClass (choice_class);
      }
   }
   if (! q.qwizard_b && ! q.preview) {
      qwizdata[i_qwiz].answered_correctly[i_question] = correct_b ? 1 : -1;
      if (correct_b) {
         qwizdata[i_qwiz].n_correct++;
         if (qwizdata[i_qwiz].n_qs_done) {
            qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
         }
      } else {
         qwizdata[i_qwiz].n_incorrect++;
      }
      update_topic_statistics (i_qwiz, i_question, correct_b);
   }
   if (got_it_more_practice_f == 1) {
      $ ('#' + document_qwiz_mobile + 'show_answer_got_it_or_not-qwiz' + i_qwiz + '-q' + i_question).hide ();
      $ ('#qwiz' + i_qwiz + '-q' + i_question).find ('button.show_the_answer').show ();
      if (! q.qwizard_b) {
         q.display_progress (i_qwiz);
      }
      q.next_question (i_qwiz);
   } else {
      update_progress_show_next (i_qwiz);
   }
};
this.show_answer_got_it_or_not = function (i_qwiz, i_question, show_me_button_el) {
   if (qwizdata[i_qwiz].user_question_number == 1) {
      $ ('div#icon_qwiz' + i_qwiz).hide ();
      alert_not_logged_in (i_qwiz);
      if (qwizdata[i_qwiz].qwiz_timer) {
         start_timers (i_qwiz);
      }
   }
   if (! q.qwizard_b) {
      show_me_button_el.style.display = 'none';
   }
   $ ('#' + document_qwiz_mobile + 'qwiz' + i_qwiz + '-q' + i_question + '-a0').show ();
   if (! q.preview && ! qwizdata[i_qwiz].bck_f) {
      $ ('#' + document_qwiz_mobile + 'show_answer_got_it_or_not-qwiz' + i_qwiz + '-q' + i_question).show ();
   }
}
function create_got_it_or_not (mobile_, i_qwiz, i_question) {
   var htm = '';
   htm += '<div id="' + mobile_ + 'show_answer_got_it_or_not-qwiz' + i_qwiz + '-q' + i_question + '" class="show_answer_got_it_or_not">\n';
   htm +=    '<button class="qwiz_button" onclick="' + qname + '.process_choice (event, \'qwiz' + i_qwiz + '-q' + i_question + '-a0\', false, 1)">\n';
   htm +=       T ('Show me again later');
   htm +=    '</button>\n';
   htm +=    '&emsp;';
   htm +=    '<button class="qwiz_button" onclick="' + qname + '.process_choice (event, \'qwiz' + i_qwiz + '-q' + i_question + '-a0\', true, 1)">\n';
   htm +=       T ('OK, I\'ve got it!');
   htm +=    '</button>\n';
   htm += '</div>\n';
   return htm;
}
function update_topic_statistics (i_qwiz, i_question, correct_b) {
   var question_topics = qwizdata[i_qwiz].question_topics[i_question];
   if (question_topics) {
      for (var ii=0; ii<question_topics.length; ii++) {
         var topic = question_topics[ii];
         if (correct_b) {
            qwizdata[i_qwiz].topic_statistics[topic].n_correct++;
         } else {
            qwizdata[i_qwiz].topic_statistics[topic].n_incorrect++;
         }
      }
   }
}
function update_progress_show_next (i_qwiz) {
   if (qwizdata[i_qwiz].question_time_limit) {
      stop_timer (i_qwiz, true, true);
   }
   if (qwizdata[i_qwiz].n_questions > 1 || qwizdata[i_qwiz].use_dataset) {
      q.display_progress (i_qwiz);
      var n_done = qwizdata[i_qwiz].n_correct;
      if (! qwizdata[i_qwiz].repeat_incorrect_b) {
         n_done += qwizdata[i_qwiz].n_incorrect;
      }
      if (n_done == qwizdata[i_qwiz].n_questions_for_done) {
         if (qwizdata[i_qwiz].summary_b) {
            $ ('#next_button_text-qwiz' + i_qwiz).html (T ('View summary report'));
         } else {
            $ ('#summary-qwiz' + i_qwiz).show ();
         }
         if (qwizdata[i_qwiz].qwiz_timer) {
            if (qwizdata[i_qwiz].n_qs) {
               if (qwizdata[i_qwiz].n_qs_done.size == qwizdata[i_qwiz].n_qs) {
                  stop_timer (i_qwiz);
                  qwizdata[i_qwiz].n_qs_done = new Set ();
               }
            } else {
               stop_timer (i_qwiz);
            }
         }
         if (qwizdata[i_qwiz].$question_timer) {
            qwizdata[i_qwiz].$question_timer.hide ();
         }
         if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
            if (   qwizdata[i_qwiz].use_dataset
                || qwizdata[i_qwiz].repeat_incorrect_b
                || qwizdata[i_qwiz].n_incorrect == 0  ) {
               var wait_completed = function () {
                  var data = {type: 'completed', confirm: 'js'};
                  record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
               }
               setTimeout (wait_completed, 2000);
            }
         }
      }
      if (n_done < qwizdata[i_qwiz].n_questions_for_done || qwizdata[i_qwiz].summary_b) {
         q.position_show_next_button (i_qwiz);
      }
      qwizdata[i_qwiz].next_button_show_b = true;
   }
   if (qwizdata[i_qwiz].n_questions == 1) {
      $( '#qwiz' + i_qwiz + ' div.single-question_exit').show ();
      const $overlay_times_up = $ ('div#overlay-times-up-qwiz' + i_qwiz);
      if (! $overlay_times_up.is (':visible')) {
         stop_timer (i_qwiz);
      }
   }
}
this.display_progress = function (i_qwiz, came_from_start_b) {
   if (debug[0]) {
      console.log ('[display_progress] qwizdata[i_qwiz].i_question:', qwizdata[i_qwiz].i_question, ', came_from_start_b:', came_from_start_b);
   }
   if (qwizdata[i_qwiz].hide_progress_b) {
      return;
   }
   var progress_html;
   var n_attempts = qwizdata[i_qwiz].n_correct + qwizdata[i_qwiz].n_incorrect;
   var n_done = qwizdata[i_qwiz].n_correct;
   if (! qwizdata[i_qwiz].repeat_incorrect_b) {
      n_done += qwizdata[i_qwiz].n_incorrect;
   }
   if (q.qwizard_b) {
      if (qwizdata[i_qwiz].i_question == -1 && ! came_from_start_b) {
         progress_html = T ('Questions in this quiz:') + ' ' + qwizdata[i_qwiz].n_questions;
      } else {
         var display_i_question = qwizdata[i_qwiz].i_question + 1;
         if (came_from_start_b) {
            display_i_question++;
         }
         progress_html = 'Question ' + display_i_question + ' of ' + qwizdata[i_qwiz].n_questions;
      }
   } else {
      const n_questions = qwizdata[i_qwiz].n_questions_for_done;
      const n_to_go = n_questions - n_done;
      if (n_attempts == 0) {
         const n_qs     = qwizdata[i_qwiz].n_qs
         const set = n_qs && n_questions < n_qs;
         if (set) {
            progress_html = T ('Questions in this set:');
         } else {
            progress_html = T ('Questions in this quiz:');
         }
         progress_html += ' ' + n_to_go;
      } else {
         var questions;
         var incorrect;
         if (document_qwiz_mobile || qwizdata[i_qwiz].qwiz_timer) {
            questions = T ('Qs');
            incorrect = T ('not');
         } else {
            questions = T ('questions');
            incorrect = T ('incorrect');
         }
         progress_html = n_questions + ' ' + questions + ', ' + n_attempts + ' ' + plural (T ('response'), T ('responses'), n_attempts) + ', ' + qwizdata[i_qwiz].n_correct + ' ' + T ('correct') + ', ' + qwizdata[i_qwiz].n_incorrect + ' ' + incorrect + ', ' + n_to_go + ' ' + T ('to go');
      }
   }
   $ ('#progress-qwiz' + i_qwiz).html (progress_html).show ();
}
this.display_diagram_progress = function (i_qwiz, prefix='Correctly labeled', n_hotspots=-1) {
   if (qwizdata[i_qwiz].hide_progress_b) {
      return;
   }
   var i_question  = qwizdata[i_qwiz].user_question_number;
   var n_questions = qwizdata[i_qwiz].n_questions_for_done;
   var progress_html = '';
   if (n_questions > 1) {
      progress_html = 'Q #' + i_question + '/' + n_questions + '; ';
   }
   var n_correct;
   var n_items;
   if (n_hotspots == -1) {
      n_correct = qwizdata[i_qwiz].n_labels_correct;
      n_items   = qwizdata[i_qwiz].n_label_targets;
   } else {
      n_correct = n_hotspots;
      n_items   = n_hotspots;
   }
   if (prefix == 'Correctly labeled') {
      prefix = S ('Correctly labeled');
   }
   progress_html += prefix + ' ' + n_correct + ' ' + S ('out of') + ' ' + n_items + ' ' + S ('items');
   $ ('#progress-qwiz' + i_qwiz).html (progress_html).show ();
}
function create_feedback_div_html (i_qwiz, i_question, i_item, item_html, c_x) {
   var local_c_x = '';
   if (c_x != undefined) {
      local_c_x = c_x;
   }
   var htm = '<div id="qwiz' + i_qwiz + '-q' + i_question + '-a' + i_item + local_c_x + '" class="qwiz-feedback">\n';
   if (! local_c_x) {
      htm += '<hr style="margin: 0px;" />\n';
   }
   var classname = '';
   if (local_c_x) {
      if (local_c_x == 'c') {
         classname = 'qwizzled-correct_feedback';
      } else {
         classname = 'qwizzled-incorrect_feedback';
      }
      htm += '<div class="' + classname + ' qwiz_editable" data-i_choice="' + i_item + '">' + item_html + '</div>';
   } else {
      if (q.qwizard_b) {
         item_html = qqc.shortcodes_to_video_elements (item_html);
      }
      item_html = create_restart_button (i_qwiz, item_html, true);
      htm += '<span class="qwiz-feedback-span qwiz_editable" data-i_choice="' + i_item + '">' + item_html + '</span>';
   }
   htm += '<div style="clear: both;"></div>\n';
   htm += '</div>\n';
   if (debug[2]) {
      console.log ('[create_feedback_div_html] htm: ', htm);
   }
   return htm;
}
this.canned_feedback = function (correct_b) {
   var response;
   if (correct_b) {
      var i = Math.floor (Math.random () * correct.length);
      response = correct[i];
   } else {
      var i = Math.floor (Math.random () * incorrect.length);
      response = incorrect[i];
   }
   response = '<p><strong>' + response + '</strong></p>';
   if (debug[0]) {
      console.log ('[canned_feedback] response:', response);
   }
   return response;
}
var find_matching_terms = function (request, response) {
   if (qwizdata[textentry_i_qwiz].user_question_number == 1) {
      $ ('div#icon_qwiz' + textentry_i_qwiz).hide ();
      alert_not_logged_in (textentry_i_qwiz);
      if (qwizdata[textentry_i_qwiz].qwiz_timer) {
         start_timers (textentry_i_qwiz);
      }
   }
   var entry = request.term.toLowerCase ();
   var entry_metaphone = qqc.metaphone (entry);
   if (debug[6]) {
      console.log ('[find_matching_terms] entry_metaphone; ', entry_metaphone);
   }
   var required_entry_length = 100;
   var required_metaphone_length = 100;
   var i_question = qwizdata[textentry_i_qwiz].i_question;
   var minlength = qwizdata[textentry_i_qwiz].textentry[i_question].textentry_minlength;
   for (var i=0; i<textentry_answer_metaphones[textentry_i_qwiz].length; i++) {
      if (entry[0] == textentry_answers[textentry_i_qwiz][i][0].toLowerCase ()) {
         required_entry_length = Math.min (required_entry_length, textentry_answers[textentry_i_qwiz][i].length);
         if (debug[6]) {
            console.log ('[find_matching_terms] entry[0]:', entry[0], ', textentry_answers[textentry_i_qwiz][i][0]:', textentry_answers[textentry_i_qwiz][i][0]);
         }
      }
      if (entry_metaphone[0] == textentry_answer_metaphones[textentry_i_qwiz][i][0]) {
         required_metaphone_length = Math.min (required_metaphone_length, textentry_answer_metaphones[textentry_i_qwiz][i].length);
         if (debug[6]) {
            console.log ('[find_matching_terms] textentry_answer_metaphones[textentry_i_qwiz][i]:', textentry_answer_metaphones[textentry_i_qwiz][i], ', required_metaphone_length:', required_metaphone_length);
         }
      }
   }
   if (required_entry_length == 100) {
      required_entry_length = minlength;
   } else {
      required_entry_length -= 2;
      required_entry_length = Math.min (minlength, required_entry_length);
   }
   if (required_metaphone_length != 100) {
      required_metaphone_length--;
      if (required_metaphone_length < 2) {
         required_metaphone_length = 2;
      } else if (required_metaphone_length > 4) {
         required_metaphone_length = 4;
      }
   }
   if (debug[6]) {
      console.log ('[find_matching_terms] required_entry_length:', required_entry_length, ', required_metaphone_length:', required_metaphone_length);
   }
   var deduped_entry = entry.replace (/(.)\1{2,}/gi, '\$1');
   if (deduped_entry.length < required_entry_length && entry_metaphone.length < required_metaphone_length) {
      textentry_matches[textentry_i_qwiz] = [];
      lc_textentry_matches[textentry_i_qwiz] = [];
      find_matching_terms2 (response, deduped_entry);
   } else {
      if (debug[6]) {
         console.log ('[find_matching_terms] request.term:', request.term,', entry_metaphone:', entry_metaphone, ', entry_metaphone.length:', entry_metaphone.length);
      }
      textentry_matches[textentry_i_qwiz]
            = $.map (current_question_textentry_terms_metaphones[textentry_i_qwiz],
                     function (term_i) {
         var ok_f;
         if (entry_metaphone == '') {
            ok_f = term_i[1] == ''
                             || term_i[0].toLowerCase ().indexOf (entry) === 0;
         } else {
            ok_f = term_i[1].indexOf (entry_metaphone) === 0
                             || term_i[0].toLowerCase ().indexOf (entry) === 0;
         }
         if (ok_f) {
            if (debug[6]) {
               console.log ('[find_matching_terms] term_i:', term_i);
            }
            return term_i[0];
         }
      });
      if (debug[6]) {
         console.log ('[find_matching_terms] textentry_matches[textentry_i_qwiz]:', textentry_matches[textentry_i_qwiz]);
      }
      if (qwizdata[textentry_i_qwiz].textentry[i_question].use_dict_b) {
         var plural_f = qwizdata[textentry_i_qwiz].textentry[i_question].textentry_plural_b ? 1 : 0;
         var data = {action:          'textentry_suggestions',
                     entry:           encodeURIComponent (entry),
                     entry_metaphone: encodeURIComponent (entry_metaphone),
                     n_hints:         qwizdata[textentry_i_qwiz].textentry_n_hints,
                     terms:           textentry_matches[textentry_i_qwiz],
                     plural_f:        plural_f};
         var url;
         if (qwizcards_page_f) {
            url = qqc.get_qwiz_param ('server_loc', 'http://qwizcards.com/admin') + '/qwizard_textentry_suggestions.php';
         } else {
            url = qqc.get_qwiz_param ('ajaxurl', '');
         }
         $.ajax ({
            type:       'POST',
            url:        url,
            data:       data,
            dataType:   'json',
            error:      function (xhr, desc) {
                           if (debug[0]) {
                              console.log ('[find_matching_terms] error desc:', desc);
                           }
                        },
            success:    function (data) {
                           textentry_matches[textentry_i_qwiz] = data;
                           find_matching_terms2 (response, deduped_entry);
                        }
         });
      } else {
         find_matching_terms2 (response, deduped_entry);
      }
   }
}
function find_matching_terms2 (response, deduped_entry) {
   if (textentry_matches[textentry_i_qwiz].length) {
      lc_textentry_matches[textentry_i_qwiz]
         = textentry_matches[textentry_i_qwiz].map (function (item) {
                                                       return item.toLowerCase ();
                                                    });
      if (debug[6]) {
         console.log ('[find_matching_terms2] textentry_matches[textentry_i_qwiz]:', textentry_matches[textentry_i_qwiz]);
      }
   }
   if (debug[6]) {
      console.log ('[find_matching_terms2] deduped_entry.length: ', deduped_entry.length, ', textentry_matches[textentry_i_qwiz].length: ', textentry_matches[textentry_i_qwiz].length, ', qwizdata[textentry_i_qwiz].textentry_n_hints: ', qwizdata[textentry_i_qwiz].textentry_n_hints);
   }
   var i_question = qwizdata[textentry_i_qwiz].i_question;
   var minlength = qwizdata[textentry_i_qwiz].textentry[i_question].textentry_minlength;
   if (deduped_entry.length >= minlength && qwizdata[textentry_i_qwiz].textentry_n_hints < 5) {
      var lc_first_correct_answer = qwizdata[textentry_i_qwiz].textentry[i_question].first_correct_answer.toLowerCase ();
      if (typeof (lc_textentry_matches[textentry_i_qwiz]) == 'undefined'
            || lc_textentry_matches[textentry_i_qwiz].indexOf (lc_first_correct_answer) == -1) {
         $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.qwiz_textentry_hint')
            .removeAttr ('disabled')
            .removeClass ('qwiz_button_disabled')
            .css ({display: 'inline-block'});
         if (q.qwizard_b) {
            $ ('#qwiz' + textentry_i_qwiz + '-q' + i_question + ' .qwiz-feedback').hide ();
         }
      }
   }
   response (textentry_matches[textentry_i_qwiz]);
}
function menu_closed (e) {
   var lc_entry = e.target.value.toLowerCase ();
   var i_question = qwizdata[textentry_i_qwiz].i_question;
   var n_hints = qwizdata[textentry_i_qwiz].textentry_n_hints;
   if (lc_entry.length < n_hints) {
      var textentry_hint_val = qwizdata[textentry_i_qwiz].textentry[i_question].first_correct_answer.substr (0, n_hints);
      e.target.value = textentry_hint_val;
   }
   if (! qwizdata[textentry_i_qwiz].check_answer_disabled_b) {
      if (debug[6]) {
         console.log ('[menu_closed] textentry_matches[textentry_i_qwiz]: ', textentry_matches[textentry_i_qwiz]);
      }
      if (typeof (lc_textentry_matches[textentry_i_qwiz]) == 'undefined'
           || lc_textentry_matches[textentry_i_qwiz].indexOf (lc_entry) == -1) {
         $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.textentry_check_answer')
            .addClass ('qwiz_button_disabled')
            .html (qwizdata[textentry_i_qwiz].check_answer);
         qwizdata[textentry_i_qwiz].check_answer_disabled_b = true;
         if (q.qwizard_b) {
            $ ('#qwiz' + textentry_i_qwiz + '-q' + i_question + ' .qwiz-feedback').hide ();
         }
      }
   }
   if (show_hint_timeout[textentry_i_qwiz]) {
      var $textentry = $ ('#textentry-qwiz' + textentry_i_qwiz + '-q' + i_question);
      var n_chars = $textentry.val ().length;
      var minlength = qwizdata[textentry_i_qwiz].textentry[i_question].textentry_minlength;
      if (n_chars >= minlength) {
         clearTimeout (show_hint_timeout[textentry_i_qwiz]);
         show_hint_timeout[textentry_i_qwiz] = 0;
      }
   }
}
function menu_shown (e) {
   if (qwizdata[textentry_i_qwiz].record_start_b && document_qwiz_user_logged_in_b) {
      qwizdata[textentry_i_qwiz].record_start_b = false;
      var data = {qrecord_id_ok: qwizdata[textentry_i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
      record_response (textentry_i_qwiz, qwizdata[textentry_i_qwiz].qrecord_id, data, true);
   }
   var lc_entry = e.target.value.toLowerCase ();
   var i_question = qwizdata[textentry_i_qwiz].i_question;
   var lc_first_correct_answer = qwizdata[textentry_i_qwiz].textentry[i_question].first_correct_answer.toLowerCase ();
   if (lc_textentry_matches[textentry_i_qwiz].indexOf (lc_first_correct_answer) != -1) {
      $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.qwiz_textentry_hint')
         .attr ('disabled', true)
         .addClass ('qwiz_button_disabled');
   }
   if (lc_textentry_matches[textentry_i_qwiz].indexOf (lc_entry) != -1) {
      $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.textentry_check_answer')
         .removeClass ('qwiz_button_disabled')
         .html (T ('Check answer'));
      qwizdata[textentry_i_qwiz].check_answer_disabled_b = false;
   } else {
      $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.textentry_check_answer')
         .addClass ('qwiz_button_disabled')
         .html (qwizdata[textentry_i_qwiz].check_answer);
      qwizdata[textentry_i_qwiz].check_answer_disabled_b = true;
   }
}
this.textentry_check_answer = function (i_qwiz, single_char_b, qwizard_i_choice) {
   var i_question = qwizdata[i_qwiz].i_question;
   var $textentry = $ ('#textentry-qwiz' + i_qwiz + '-q' + i_question);
   if (debug[6]) {
      entry = $textentry.val ();
      console.log ('[textentry_check_answer] $textentry.val ():', $textentry.val ());
   }
   if (! qwizdata[i_qwiz].textentry[i_question].textentry_suggest_b) {
      if (qwizdata[i_qwiz].record_start_b && document_qwiz_user_logged_in_b) {
         qwizdata[i_qwiz].record_start_b = false;
         var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
         record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
      }
      var entry = $textentry.val ();
      if (entry == '') {
         return false;
      }
   }
   if (! single_char_b) {
      if (! q.qwizard_b && ! q.preview) {
         if (qwizdata[i_qwiz].check_answer_disabled_b) {
            alert (Tcheck_answer_message);
            $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question + ' button.qwiz_textentry_hint')
               .removeAttr ('disabled')
               .removeClass ('qwiz_button_disabled')
               .css ({display: 'inline-block'});
            return;
         }
         $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question).hide ();
      }
   }
   $textentry.blur ();
   if (! q.qwizard_b && ! q.preview) {
      $textentry.attr ('disabled', true);
   }
   var entry = $textentry.val ().toLowerCase ();
   var i_choice = -1;
   var correct_b = false;
   var n_choices = qwizdata[i_qwiz].textentry[i_question].choices.length;
   var i_default_choice;
   for (var i=0; i<n_choices; i++) {
      var alts = qwizdata[i_qwiz].textentry[i_question].choices[i];
      if (alts[0] == '*') {
         i_default_choice = i;
      } else {
         var ok_f = false;
         if (q.qwizard_b && typeof (qwizard_i_choice) != 'undefined') {
            if (alts == 'Enter word' && i == qwizard_i_choice) {
               ok_f = true;
            }
         }
         if (! ok_f) {
            var lc_alts = alts.map (function (item) {
                                       return item.toLowerCase ();
                                    });
            ok_f = lc_alts.indexOf (entry) != -1;
         }
         if (ok_f) {
            correct_b = qwizdata[i_qwiz].textentry[i_question].choices_correct[i];
            i_choice = i;
            break;
         }
      }
   }
   if (i_choice == -1) {
      i_choice = i_default_choice;
   }
   if (preview_mode == 'questions_active') {
      $ ('#qwiz' + i_qwiz + '-q' + i_question + ' .qwiz-feedback').hide ();
   }
   $ ('#qwiz' + i_qwiz + '-q' + i_question + '-a' + i_choice).show ();
   if (! q.qwizard_b) {
      qwizdata[i_qwiz].answered_correctly[i_question] = correct_b ? 1 : -1;
      if (correct_b) {
         qwizdata[i_qwiz].n_correct++;
         if (qwizdata[i_qwiz].n_qs_done) {
            qwizdata[i_qwiz].n_qs_done.add (qwizdata[i_qwiz].dataset_id[i_question]);
         }
      } else {
         qwizdata[i_qwiz].n_incorrect++;
      }
      if (qwizdata[i_qwiz].qrecord_id && document_qwiz_user_logged_in_b) {
         var data = {q_and_a_text:  btoa (encodeURIComponent (qwizdata[i_qwiz].q_and_a_text[i_question])),
                     q_and_a_crc32: qwizdata[i_qwiz].q_and_a_crc32[i_question],
                     i_question:    qwizdata[i_qwiz].dataset_id[i_question],
                     unit:          qwizdata[i_qwiz].unit[i_question],
                     type:          'textentry',
                     response:      entry,
                     i_choice:      -1,
                     correct_b:     correct_b ? 1 : '',
                     confirm:       'js'};
         record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data);
      }
      update_topic_statistics (i_qwiz, i_question, correct_b);
   }
   update_progress_show_next (i_qwiz);
}
this.textentry_hint = function (i_qwiz) {
   clearTimeout (show_hint_timeout[i_qwiz]);
   show_hint_timeout[i_qwiz] = 0;
   qwizdata[i_qwiz].textentry_n_hints++;
   var i_question = qwizdata[i_qwiz].i_question;
   var textentry_hint_val = qwizdata[i_qwiz].textentry[i_question].first_correct_answer.substr (0, qwizdata[i_qwiz].textentry_n_hints);
   $ ('#textentry-qwiz' + i_qwiz + '-q' + i_question).val (textentry_hint_val).focus ().trigger ('keydown');
   $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question + ' button.qwiz_textentry_hint').attr ('disabled', true)
      .addClass ('qwiz_button_disabled')
      .html ('Another hint');
   var $check_answer = $ ('#textentry_check_answer_div-qwiz' + i_qwiz+ '-q' + i_question );
   var show_hint_button = function () {
      $check_answer.find ('button.qwiz_textentry_hint')
         .removeAttr ('disabled')
         .removeClass ('qwiz_button_disabled');
   }
   if (hint_timeout_sec >= 0) {
      show_hint_timeout[i_qwiz] = setTimeout (show_hint_button, hint_timeout_sec*1000);
   }
}
this.set_textentry_i_qwiz = function (e, input_el) {
   var id = input_el.id;
   textentry_i_qwiz = id.match (/[0-9]+/)[0];
   if (debug[6]) {
      console.log ('[set_textentry_i_qwiz] textentry_i_qwiz: ', textentry_i_qwiz);
   }
   e.stopPropagation ();
   if (q.qwizard_b) {
      var qwizq = id.match (/qwiz.*/)[0];
      $ ('#' + qwizq + ' .qwiz-feedback').hide ();
   }
}
this.item_selected = function () {
   var i_question = qwizdata[textentry_i_qwiz].i_question;
   $ ('#textentry_check_answer_div-qwiz' + textentry_i_qwiz + '-q' + i_question + ' button.textentry_check_answer')
      .removeClass ('qwiz_button_disabled')
      .html (T ('Check answer'));
   qwizdata[textentry_i_qwiz].check_answer_disabled_b = false;
}
this.keep_next_button_active = function () {
   next_button_active_b = true;
   $ ('.next_button').show ();
}
this.position_show_next_button = function (i_qwiz) {
   var $next_button = $ ('#next_button-qwiz' + i_qwiz);
   $next_button.show ();
}
this.hide_menu_and_display_login = function (i_qwiz, add_team_member_f,
                                            login_alt, msg, proceed_to_pay,
                                            pay_now_sign_up) {
   var $container = $ ('div.qwiz_icon_and_menu_container.qwiz' + i_qwiz + ' div.qwiz_icon_trigger_and_menu');
   $container.removeClass ('qwiz-hover');
   q.display_login (i_qwiz, add_team_member_f, login_alt, msg, proceed_to_pay,
                    pay_now_sign_up);
   var delay_reset = function () {
      $container.addClass ('qwiz-hover');
   }
   setTimeout (delay_reset, 500);
}
this.display_login = function (i_qwiz, add_team_member_f, login_alt, msg,
                               proceed_to_pay, pay_now_sign_up) {
   if (! login_alt) {
      login_alt = '';
   }
   if (! add_team_member_f && ! login_alt) {
      $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   }
   var i_question = qwizdata[i_qwiz].i_question;
   if (i_question == -1) {
      $ ('.intro-qwiz' + i_qwiz).hide ();
      if (! q.no_intro_b[i_qwiz]) {
         $ ('div#icon_qwiz' + i_qwiz).hide ();
      }
   } else if (i_question >= qwizdata[i_qwiz].n_questions) {
      $ ('#summary-qwiz' + i_qwiz).hide ();
   } else {
      $textentry_check_answer_div = $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_question);
      if ($textentry_check_answer_div.is (':visible')) {
         $textentry_check_answer_div.hide ();
         qwizdata[i_qwiz].textentry_check_answer_show_b = true;
      } else {
         qwizdata[i_qwiz].textentry_check_answer_show_b = false;
      }
      hide_current_question (i_qwiz, qwizdata[i_qwiz].i_user_question);
      $ ('.bbfe-qwiz' + i_qwiz).css ({visibility: 'hidden'});
      $ ('span.question-number-qwiz' + i_qwiz).css ({visibility: 'hidden'});
   }
   $ ('#next_button-qwiz' + i_qwiz).hide ();
   if (login_alt == 'progress_bars' || login_alt == 'leaderboard') {
      const display_pay_screen = qwizdata[i_qwiz].display_pay_screen;
      if (display_pay_screen == 'register' || display_pay_screen == 'subscribe' || display_pay_screen == 'free_trial') {
         $ ('.intro-qwiz' + i_qwiz).show ();
      } else {
         qwizdata[i_qwiz].leaderboard_class_everyone = 0;
         qqc.create_progress_bars (qname, qwizdata, i_qwiz, login_alt);
      }
   } else if (login_alt == 'feedback') {
      qqc.create_provide_feedback_screen (qname, i_qwiz, qwizdata[i_qwiz].i_question);
   } else if (login_alt == 'use_dataset_options') {
      qqc.create_use_dataset_options (qname, qwizdata, i_qwiz);
   } else if (login_alt == 'pay') {
      qqc.create_pay_screen (qname, qwizdata, i_qwiz, msg, pay_now_sign_up);
   } else if (login_alt == 'maker_pay') {
      qqc.create_maker_pay_screen (qname, qwizdata, i_qwiz, msg);
   } else if (login_alt == 'enroll') {
      qqc.create_enroll_screen (qname, i_qwiz);
   } else if (login_alt == 'register') {
      qqc.create_register_taker_screen (qname, i_qwiz, proceed_to_pay, msg);
   } else if (login_alt == 'free_trial') {
      qqc.create_paypal_subscription_screen (qname, i_qwiz);
   } else if (login_alt == 'special_offer') {
      qqc.create_paypal_subscription_screen (qname, i_qwiz, true);
   } else if (document_qwiz_wp_user_session_id) {
      qqc.create_refresh_page_notice (qname, i_qwiz);
   } else {
      $ ('#qwiz_login-qwiz' + i_qwiz).html (get_login_html (i_qwiz, add_team_member_f, msg, proceed_to_pay)).show ();
      qqc.init_hide_show_password ('#qwiz_password-qwiz' + i_qwiz);
      if (! qwizdata[i_qwiz].display_pay_screen) {
         $ ('#qwiz_username-qwiz' + i_qwiz).focus ();
      }
   }
   qwizdata[i_qwiz].login_show_b = true;
}
this.login = function (i_qwiz, add_team_member_f, proceed_to_pay) {
   add_team_member_f = add_team_member_f ? 1 : 0;
   proceed_to_pay  = proceed_to_pay ? 1 : 0;
   $.removeCookie ('qwiz_declined_login', {path: '/'});
   document_qwiz_declined_login_b = false;
   var $username = $ ('#qwiz_username-qwiz' + i_qwiz);
   var username = $username.val ();
   if (! username ) {
      alert (T ('Please enter Login name'));
      $username.focus ();
      return false;
   }
   if (add_team_member_f) {
      var usernames = document_qwiz_username.split ('; ');
      if (usernames.indexOf (username) != -1) {
         alert ('User ' + username + ' is already on your team.');
         return false;
      }
   }
   var $password = $ ('#qwiz_password-qwiz' + i_qwiz);
   var password = $password.val ();
   if (! password) {
      alert (T ('Please enter Password'));
      $password.focus ();
      return false;
   }
   $password.blur ();
   var sha3_password = CryptoJS.SHA3 (password).toString ();
   var remember_f;
   if (add_team_member_f) {
      remember_f = document_qwiz_remember_f;
   } else {
      remember_f = $ ('#qwiz_login-qwiz' + i_qwiz + ' input[type="checkbox"]').prop('checked') ? 1 : 0;
      document_qwiz_remember_f = remember_f;
   }
   var data = {username: username, sha3_password: sha3_password, remember_f: remember_f, add_team_member_f: add_team_member_f};
   if (add_team_member_f) {
      data.previous_username = document_qwiz_username;
   }
   if (proceed_to_pay) {
      data.proceed_to_pay_f = '1';
   }
   qqc.jjax (qname, i_qwiz, qwizdata[i_qwiz].qrecord_id, 'login', data);
   return false;
}
this.login_ok = function (i_qwiz, session_id, remember_f, proceed_to_pay) {
   var options = {path: '/'};
   if (remember_f == 1) {
      options.expires = 1;
   }
   $.cookie ('qwiz_session_id', document_qwiz_session_id, options);
   options.expires = 30;
   $.cookie ('qwiz_user_login', 1, options);
   document_qwiz_user_logged_in_b = true;
   var login_timeout_min = qqc.get_qwiz_param ('login_timeout_min', 40);
   options.expires = login_timeout_min/(24.0*60.0);
   $.cookie ('qwiz_current_login_lt_nmin_ago', 1, options);
   qqc.set_user_menus_and_icons ();
   if (qwiz_ && qwiz_.any_pay_quiz_f) {
      qwiz_.pay_lock_settings ();
   }
   if (qcard_ && qcard_.any_pay_deck_f) {
      qcard_.pay_lock_settings ();
   }
   $ ('#qwiz_login-qwiz' + i_qwiz).hide ();
   qwizdata[i_qwiz].login_show_b = false;
   if (q.qrecord_b) {
      for (var ii_qwiz=0; ii_qwiz<n_qwizzes; ii_qwiz++) {
         if (qwizdata[ii_qwiz].qrecord_id) {
            qwizdata[ii_qwiz].record_start_b = true;
         }
         if (qwizdata[ii_qwiz].qrecord_id) {
            qwizdata[ii_qwiz].qrecord_id_ok = 'check credit';
         }
      }
   }
   if (qwizdata[i_qwiz].display_pay_screen == 'special_offer') {
      document.location = document.location;
      return false;
   }
   if (proceed_to_pay) {
      if (qwizdata[i_qwiz].pay_quiz_ok == 'paid') {
         proceed_to_pay = false;
      }
   }
   if (proceed_to_pay) {
      q.display_login (i_qwiz, false, 'pay');
   } else {
      if (qwizdata[i_qwiz].display_pay_screen) {
         $ ('.intro-qwiz' + i_qwiz).show ();
      } else {
         q.login_ok_start_quiz (i_qwiz);
      }
   }
   return false;
}
this.login_ok_start_quiz = function (i_qwiz) {
   var i_user_question = qwizdata[i_qwiz].i_user_question;
   if (i_user_question == -1) {
      q.next_question (i_qwiz);
   } else {
      redisplay_current_question (i_qwiz, i_user_question);
      qwizdata[i_qwiz].record_start_b = false;
      var data = {qrecord_id_ok: qwizdata[i_qwiz].qrecord_id_ok, type: 'start', confirm: 'js'};
      record_response (i_qwiz, qwizdata[i_qwiz].qrecord_id, data, true);
      if (qwizdata[i_qwiz].next_button_show_b) {
         q.position_show_next_button (i_qwiz);
      }
      if (qwizdata[i_qwiz].textentry_check_answer_show_b) {
         $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_user_question).css ({display: 'inline-block'});
      }
   }
}
this.login_not_ok = function (i_qwiz, errmsg) {
   if (! errmsg) {
      errmsg = T ('Login incorrect. Please try again');
   }
   $ ('#qwiz_login-qwiz' + i_qwiz + ' p.login_error').html (errmsg).show ();
   if (debug[0]) {
      console.log ('[login_not_ok] $ (\'#qwiz_login-qwiz' + i_qwiz + ' p.login_error\'):', $ ('#qwiz_login-qwiz' + i_qwiz + ' p.login_error'));
   }
}
this.no_login = function (i_qwiz, add_team_member_f, progress_bars_f) {
   if (! (add_team_member_f || progress_bars_f)) {
      if ($ ('#qwiz_login-qwiz' + i_qwiz + ' input[type="checkbox"]').prop('checked')) {
         $.cookie ('qwiz_declined_login', 1, {path: '/'});
         document_qwiz_declined_login_b = true;
      }
      $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   }
   $ ('#qwiz_login-qwiz' + i_qwiz).hide ();
   qwizdata[i_qwiz].login_show_b = false;
   var i_user_question = qwizdata[i_qwiz].i_user_question;
   if (i_user_question == -1) {
      if (progress_bars_f) {
         $ ('.intro-qwiz' + i_qwiz).show ();
         $ ('#next_button-qwiz' + i_qwiz).show ();
      } else {
         q.next_question (i_qwiz, true);
      }
   } else {
      redisplay_current_question (i_qwiz, i_user_question);
      if (qwizdata[i_qwiz].next_button_show_b) {
         q.position_show_next_button (i_qwiz);
      }
      if (qwizdata[i_qwiz].textentry_check_answer_show_b) {
         $ ('#textentry_check_answer_div-qwiz' + i_qwiz + '-q' + i_user_question).show ();
      }
   }
   return false;
}
function alert_not_logged_in (i_qwiz) {
   if (q.no_intro_b[i_qwiz] && qwizdata[i_qwiz].qrecord_id && $.cookie ('qwiz_user_login')) {
      const user_logged_in_b
                     =    typeof (document_qwiz_user_logged_in_b) != 'undefined'
                        && document_qwiz_user_logged_in_b
                        && typeof (document_qwiz_username) != 'undefined';
      if (! user_logged_in_b) {
         if (! document_qwiz_declined_login_b
                   && ! document_qwiz_not_logged_in_alerted && ! q.qwizard_b ) {
            if (qwizdata[i_qwiz].qrecord_id.indexOf ('finish_times_demo') == -1) {
               alert ('Note: you are not logged in. You must be logged in to receive credit.');
               document_qwiz_not_logged_in_alerted = true;
            }
         }
      }
   }
}
this.icon_no_login = function (i_qwiz, add_team_member_f) {
   $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   if (! add_team_member_f) {
      if ($ ('#usermenu-qwiz' + i_qwiz + ' input[type="checkbox"]').prop('checked')) {
         $.cookie ('qwiz_declined_login', 1, {path: '/'});
         document_qwiz_declined_login_b = true;
      }
   }
}
function redisplay_current_question (i_qwiz, i_question) {
   if (i_question < qwizdata[i_qwiz].n_questions) {
      if (document_qwiz_mobile) {
         var $mobile_qwizq = $ ('#mobile_qwiz' + i_qwiz + '-q' + i_question);
         if ($mobile_qwizq.length) {
            $mobile_qwizq.show ();
         } else {
            $ ('#qwiz' + i_qwiz + '-q' + i_question).show ();
         }
      } else {
         $ ('#qwiz' + i_qwiz + '-q' + i_question).show ();
      }
   } else {
      $ ('#summary-qwiz' + i_qwiz).show ();
   }
   $ ('.bbfe-qwiz' + i_qwiz).css ({visibility: 'visible'});
   $ ('span.question-number-qwiz' + i_qwiz).css ({visibility: 'visible'});
}
function get_attr (htm, attr_name, plural_ok_b) {
   var attr_value = qqc.get_attr (htm, attr_name);
   if (plural_ok_b && ! attr_value) {
      attr_value = qqc.get_attr (htm, attr_name + 's');
   }
   return attr_value;
}
this.get_qwizdata = function (i_qwiz, variable) {
   return qwizdata[i_qwiz][variable];
}
this.set_qwizdata = function (i_qwiz, variable, value) {
   if (i_qwiz == -1) {
      var s = variable + ' = ' + value;
      eval (s);
   } else {
      qwizdata[i_qwiz][variable] = value;
   }
}
function S (string) {
   return qqc.T (string);
}
function T (string) {
   return qqc.T (string);
}
function plural (word, plural_word, n) {
   return qqc.plural (word, plural_word, n);
}
function inarray0 (array_of_arrays, query) {
   var len = array_of_arrays.length;
   for (var i=0; i<len; i++) {
      if (array_of_arrays[i][0] == query) {
         return true;
      }
   }
   return false;
}
};
qwizf.call (qwiz_);
