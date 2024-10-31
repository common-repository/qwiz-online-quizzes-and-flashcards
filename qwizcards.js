if (! window.console) {
   window.console = {log: function(){} };
}
qcard_ = {};
var qcardf = function () {
var qname = 'qcard_';
var debug = [];
debug.push (false);    // 0 - general.
debug.push (false);    // 1 - process_card_input ().
debug.push (false);    // 2 - answer (card back) html.
debug.push (false);    // 3 - old/new html dump.
debug.push (false);    // 4 - card tags/topics.
debug.push (false);    // 5 - "next" buttons, element objects.
debug.push (false);    // 6 - [textentry] w/ required input.
debug.push (false);    // 7 - Enter -> click.
debug.push (false);    // 8 - unused.
debug.push (false);    // 9 - [hangman].
debug.push (false);    // 10 - unused.
debug.push (false);    // 11 - use_dataset.
debug.push (false);    // 12 - QWizard.
debug.push (false);    // 13 - set_container_width_height ().
var $ = jQuery;
this.no_intro_b = [];
this.qwizard_b = false;
this.qrecord_b = false;
this.dataset_b = false;
this.ruled_lines = 'img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf4AAAE2CAIAAAAPtmerAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEnklEQVR4nO3YMW1AMRQEwTgyf3ix9Mm8sLCLnUFw1Ra3ZuYHgJLf1wMAuE36AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIEf6AXKkHyBH+gFypB8gR/oBcqQfIGf//P293gDAVWtmXm8A4CqHD0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+Ts883rDQBctWakH6DF4QOQI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA5+3zzegMAV60Z6QdocfgA5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9Azj7fvN4AwFVrRvoBWhw+ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkLPPN683AHDVmpF+gBaHD0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+Ts883rDQBctWakH6DF4QOQI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA5+3zzegMAV60Z6QdocfgA5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9Azj7fvN4AwFVrRvoBWhw+ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkLPPN683AHDVmpF+gBaHD0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+RIP0CO9APkSD9AjvQD5Eg/QI70A+Ts883rDQBctWakH6DF4QOQI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA50g+QI/0AOdIPkCP9ADnSD5Aj/QA5/8mNPTHI1j+2AAAAAElFTkSuQmCC';
this.preview = false;
this.any_pay_deck_f = false;
this.n_textentry_hangman = 1;
var q = this;
var qqc;
q.processing_complete_b = false;
var regular_page_f              = true;
var content                     = 'body';
var default_use_dict            = 'true';
var default_use_terms           = 'true';
var hint_timeout_sec            = 20;
var default_hangman_max_hints   = 2;
var errmsgs = [];
var n_decks = 0;
var qwizcards_page_f = false;
var deck_id;
var deckdata = [];
var next_button_active_b  = false;
var textentry_i_deck;
var loaded_metaphone_js_b = false;
var default_textentry_terms_metaphones;
var current_card_textentry_terms_metaphones = {};
var textentry_answers = {};
var textentry_answer_metaphones = {};
var textentry_matches = {};
var lc_textentry_matches = {};
var Tcheck_answer_message;
var show_hint_timeout = {};
var suppress_hangman_hint_b = false;
var q_and_a_text = '';
var panel_exit_mobile_open_b = false;
var panel_exit_mobile_just_closed_b;
var non_mobile_scrollLeft;
var non_mobile_scrollTop;
var mobile_i_deck;
var qw;
var set_qwizard_data_b = false;
var chromebook_b = navigator.appVersion.indexOf ('CrOS') != -1;
$ (document).ready (function () {
   qqc = qwiz_qcards_common;
   qqc.qdebug (debug);
   var preview_i_deck = $.cookie ('deck_preview');
   if (typeof preview_i_deck != 'undefined') {
      q.preview_i_deck_plus1 = parseInt (preview_i_deck, 10) + 1;
      document_qwiz_username = $.cookie ('qwiz_preview_username');
      $.removeCookie ('deck_preview', {path: '/'});
   }
   var page_url = document.location.href;
   qwizcards_page_f =    page_url.indexOf ('qwizcards.com/u/') != -1
                      || page_url.indexOf ('qwizcards.com/admin/') != -1
                      || page_url.indexOf ('qwizcards.net/u/')     != -1
                      || page_url.indexOf ('qwizcards.net/admin/') != -1
                      || page_url.indexOf ('localhost/u/') != -1
                      || page_url.indexOf ('localhost/admin/') != -1
                      || page_url.indexOf ('192.168.1.120/u/') != -1
                      || page_url.indexOf ('192.168.1.120/admin/') != -1;
   if (typeof (document_qwizard_user_page) == 'undefined'
            && window.location.href.indexOf ('action=edit') == -1
                           && window.location.href.indexOf ('post-new') == -1) {
      q.qdeck_init ();
   } else {
      regular_page_f = false;
   }
});
this.qdeck_init = function (skip_error_check_f, only_get_qwiz_param_f) {
   content                   = qqc.get_qwiz_param ('content', 'body');
   default_use_dict          = qqc.get_qwiz_param ('use_dict', 'true');
   default_use_terms         = qqc.get_qwiz_param ('use_terms', 'true');
   default_hangman_max_hints = parseInt (qqc.get_qwiz_param ('hangman_hints', 2));
   hint_timeout_sec          = qqc.get_qwiz_param ('hint_timeout_sec', 20);
   document_qwiz_mobile_enabled = qqc.get_qwiz_param ('mobile_enabled', 'Always');
   if (document_qwiz_mobile_enabled == 'Enabled') {
      document_qwiz_mobile_enabled = 'Always';
   }
   Tcheck_answer_message = T ('Need help?  Try the "hint" button');
   q.n_textentry_hangman = 1;
   if (only_get_qwiz_param_f) {
      return;
   }
   qqc.set_force_mobile ();
   process_html ();
   if (errmsgs.length && ! skip_error_check_f) {
      if (! q.qwizard_b) {
         if (qqc.get_qwiz_param ('regular_page_error_check')) {
            alert (plural (T ('Error found'), T ('Errors found'), errmsgs.length) + ':\n\n' + errmsgs.join ('\n'));
         } else {
            console.log ('Errors found:\n', errmsgs.join ('\n'));
         }
      }
   }
   if (n_decks) {
      if (! q.$dialog_no_credit) {
         $ ('body').append (dialog_no_credit_html ());
         q.$usernames_is_are = $ ('#qwizcards_usernames_is_are');
         q.$dialog_no_credit = $ ('#qwizcards_dialog_no_credit').dialog ({
            height:        400,
            width:         550,
            modal:         true,
            autoOpen:      false,
            open:          function () {
                              $ ('div#qcard_request_assign_to_class_feedback').html ('');
                              $ ('button#qcard_request_assign_to_class').removeClass ('qwiz_button_disabled').removeAttr ('disabled');
                           },
            buttons:       {'Close':  function () {
                                          q.$dialog_no_credit.dialog ('close');
                                       }
                           }
         });
      }
      q.qdeck_init2 (n_decks);
   }
}
this.qdeck_init2 = function (n_decks, new_qwizard_deck_f,
                                          qwizard_process_dataset_questions_f) {
   for (var i_deck=0; i_deck<n_decks; i_deck++) {
      if (typeof deckdata[i_deck].cards == 'undefined') {
         continue;
      }
      const mobile_enabled = deckdata[i_deck].mobile_enabled;
      if (mobile_enabled == 'Always'
             || (mobile_enabled == 'Small screens only'
                                           && qqc.is_mobile (mobile_enabled))) {
         $ ('.go-mobile-qdeck' + i_deck).show ();
      }
      init_element_pointers (i_deck);
      q.init_card_order (i_deck);
      deckdata[i_deck].i_card      = -1;
      deckdata[i_deck].i_user_card = -1;
      deckdata[i_deck].ii_card     =  0;
      if (deckdata[i_deck].qrecord_id) {
         deckdata[i_deck].record_start_b = true;
      }
      set_header (i_deck, 'qcard-front', true);
      var header_height = deckdata[i_deck].$header.outerHeight ();
      deckdata[i_deck].qcard_window_margin = 60 + header_height;
      deckdata[i_deck].header_height       = header_height;
      deckdata[i_deck].$qcard_window.css ({'margin-bottom': deckdata[i_deck].qcard_window_margin + 'px'});
      var use_dataset_card_html = deckdata[i_deck].use_dataset_card_html;
      if (use_dataset_card_html && ! qwizard_process_dataset_questions_f) {
         use_dataset_card_html = qqc.replace_smart_quotes (use_dataset_card_html);
         var use_dataset_card_id = get_attr (use_dataset_card_html, 'use_dataset_card');
         var pos_bar = use_dataset_card_id.indexOf ('|');
         var use_dataset = use_dataset_card_id.substr (0, pos_bar);
         qqc.get_dataset_questions (use_dataset, qname,
                                    i_deck, deckdata[i_deck].qrecord_id,
                                    [], [], 10000,
                                    deckdata[i_deck].dataset_questions_to_do,
                                    false,    // deckdata[i_deck].random_b,
                                    use_dataset_card_html);
      } else if (   ! new_qwizard_deck_f
                 && ! deckdata[i_deck].use_dataset
                 && (q.no_intro_b[i_deck] || deckdata[i_deck].n_cards == 1)) {
         q.start_deck2 (i_deck);
      } else {
         deckdata[i_deck].no_flip_b = deckdata[i_deck].click_flip_b;
         if (q.qwizard_b) {
            if (! new_qwizard_deck_f) {
               q.set_editable_parts_front (i_deck, -1, deckdata[i_deck].intro_html);
            }
         } else {
            var $front = q.get_card_front (i_deck, -1, false, true);
            $front.html (qqc.decode_image_tags (deckdata[i_deck].intro_html));
            deckdata[i_deck].first_display_f = false;
            var card_height_setting = deckdata[i_deck].card_height_setting;
            if (card_height_setting) {
               card_height_setting = card_height_setting.replace ('px', '');
            } else {
               card_height_setting = deckdata[i_deck].$qcard_container.outerHeight ();
            }
            center_vertical ($front, card_height_setting);
         }
         if (! q.preview) {
            if (! deckdata[i_deck].hide_qwizcards_icon_b) {
               var qwiz_icon_div = create_qwiz_icon_div (i_deck);
               deckdata[i_deck].$qcard_card.append (qwiz_icon_div);
            }
            q.qwiz_icon_stop_propagation (i_deck);
         }
         q.set_container_width_height (i_deck);
         if (deckdata[i_deck].scroll_b || document_qwiz_mobile) {
            var $qcard_card = deckdata[i_deck].$qcard_card;
            $qcard_card.find ('div.qcard-front, div.qcard-back').css ({overflow: 'auto'});
         }
      }
      if (q.qwizard_b) {
         if (debug[0]) {
            console.log ('[qdeck_init2] $ (\'div#qcard_front-part1-qdeck\' + i_deck):', $ ('div#qcard_front-part1-qdeck' + i_deck));
         }
         qwizard.init_tinymce ('div#qcard_header-qdeck' + i_deck);
         qwizard.init_tinymce ('div#qcard_front-part1-qdeck' + i_deck);
         qwizard.init_tinymce ('div#qcard_front-part2-qdeck' + i_deck);
         qwizard.init_tinymce ('div#qcard_back-part1-qdeck' + i_deck);
      }
   }
   if (document_qwiz_force_mobile_f) {
      q.go_mobile (0);
   }
   if (q.preview_i_deck_plus1) {
      const i_preview_deck = q.preview_i_deck_plus1 - 1;
      if (! deckdata[i_preview_deck].use_dataset) {
         init_preview (i_preview_deck);
      }
   } else {
      if (q.preview && ! q.qwizard_b) {
         init_preview (0);
      }
   }
   set_flip ();
}
function set_flip () {
   $ ('div.qcard_card').flip ({
      front:         'div.qcard-front',
      back:          'div.qcard-back',
      autoSize:      false,
      speed:         700,
      trigger:       'manual'
   });
}
function dialog_no_credit_html () {
   htm = [];
   htm.push ('<div id="qwizcards_dialog_no_credit" title="' + T ('Flashcard deck not assigned in your class') + '">');
   htm.push (   '<p style="margin-bottom: 1em;">');
   htm.push (      T ('Note: this flashcard deck has not been assigned as work you need to do.')); //DKTMP '<span id="qwizcards_usernames_is_are"></span> ');
   htm.push (      T ('Your work will be recorded, but it may not count for your class.'));
   htm.push (   '</p>');
   htm.push (   '<p>');
   htm.push (      T ('You can send a request message to your teacher asking them to include this quiz in your class.'));
   htm.push (      '<br />');
   htm.push (      '<br />');
   htm.push (      '<button id="qcard_request_assign_to_class" class="qwiz_button" onclick="qwiz_qcards_common.request_assign_to_class (0)">');
   htm.push (         T ('Send request'));
   htm.push (      '</button>');
   htm.push (   '</p>');
   htm.push (   '<br />');
   htm.push (   '<div id="qcard_request_assign_to_class_feedback">');
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
   $ ('div.qcard_reg_code_errmsg').html ('').hide ();
}
function init_preview (i_deck) {
   deckdata[i_deck].no_flip_b = false;
   var n_cards = deckdata[i_deck].n_cards;
   for (var i_card=0; i_card<n_cards; i_card++) {
      deckdata[i_deck].i_card = i_card;
      q.set_card_front_and_back (i_deck, i_card, true);
   }
   if (! q.no_intro_b[i_deck]) {
      var $front = q.get_card_front (i_deck, -1, false, true);
      $front.html (qqc.decode_image_tags (deckdata[i_deck].intro_html));
      $front.find ('button').attr ('disabled', true);
   }
   if (n_cards > 1) {
      q.done (i_deck);
   }
   var delay_sum_height = function () {
      var sum_height = 0;
      var i_beg = q.no_intro_b[i_deck] ? 0 : -1;
      for (var i_card=i_beg; i_card<n_cards; i_card++) {
         var $qcard_container      = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card);
         var card_container_height = $qcard_container.outerHeight ();
         sum_height += card_container_height;
      }
      if (n_cards > 1) {
         var $qcard_container      = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + n_cards);
         var card_container_height = $qcard_container.outerHeight ();
         sum_height += card_container_height;
      }
      var $qcard_window = deckdata[i_deck].$qcard_window;
      $qcard_window.height (sum_height);
   };
   setTimeout (delay_sum_height, 300);
   $ ('div.card-container').on ('mouseenter', q.set_i_deck_i_card);
   $ ('button.qcard_flip').removeAttr ('disabled').removeClass ('qwiz_button_disabled');
   deckdata[i_deck].check_answer_disabled_b = false;
   $ ('div.card-container').css ({'margin-top': '10px'});
}
this.set_i_deck_i_card = function () {
   if (debug[0]) {
      console.log ('[set_i_deck_i_card] this:', this);
   }
   var classes = this.className;
   var i_deck = classes.match ('preview-qdeck([0-9]+)')[1];
   var i_card = classes.match ('preview-qcard([-0-9]+)')[1];
   deckdata[i_deck].i_card = i_card
}
function button_flip_selector (i_deck) {
   var selector = 'button.flip-qdeck' + i_deck;
   if (q.preview) {
      selector += '-qcard' + deckdata[i_deck].i_card;
   }
   return selector;
}
this.get_card_front = function (i_deck, i_card, rev_b, no_switch) {
   if (! no_switch && deckdata[i_deck].showing_first == 'back') {
      return get_card_back (i_deck, i_card, rev_b, true);
   }
   if (typeof (i_card) == 'undefined') {
      i_card = deckdata[i_deck].i_user_card;
   }
   var alt_b = q.qwizard_b && deckdata[i_deck].use_dataset_card_ids[i_card];
   if (rev_b) {
      alt_b = ! alt_b;
   }
   var $qcard_card_front;
   if (q.preview) {
      if (alt_b) {
         $qcard_card_front = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard-front div.qcard_content_size_alt');
      } else {
         $qcard_card_front = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard-front div.qcard_content_size');
      }
   } else {
      if (alt_b) {
         $qcard_card_front = deckdata[i_deck].$qcard_card_front_alt;
      } else {
         $qcard_card_front = deckdata[i_deck].$qcard_card_front;
      }
   }
   return $qcard_card_front;
}
function get_card_back (i_deck, i_card, rev_b, no_switch) {
   if (! no_switch && deckdata[i_deck].showing_first == 'back') {
      return q.get_card_front (i_deck, i_card, rev_b, true);
   }
   if (typeof (i_card) == 'undefined') {
      i_card = deckdata[i_deck].i_user_card;
   }
   var alt_b = q.qwizard_b && deckdata[i_deck].use_dataset_card_ids[i_card];
   if (rev_b) {
      alt_b = ! alt_b;
   }
   var $qcard_card_back;
   if (q.preview) {
      if (alt_b) {
         $qcard_card_back = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard-back  div.qcard_content_size_alt');
      } else {
         $qcard_card_back = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard-back  div.qcard_content_size');
      }
   } else {
      if (alt_b) {
         $qcard_card_back = deckdata[i_deck].$qcard_card_back_alt;
      } else {
         $qcard_card_back = deckdata[i_deck].$qcard_card_back;
      }
   }
   return $qcard_card_back;
}
function process_html () {
   $ ('p:contains("[!]"), :header:contains("[!]")').each (function () {
      var comment_htm = $ (this).html ();
      if (comment_htm.search (/\s*(<.+?>)*\s*\[!+\][^]*?\[\/!+\]\s*(<.+?>)*\s*$/m) == 0) {
         $ (this).remove ();
      }
   });
   $ ('p:contains("qdeck"), :header:contains("qdeck")').each (function () {
      var tag_htm = $ (this).html ();
      if (tag_htm.search (/\s*\[\/{0,1}qdeck[^\]]*\]\s*/m) == 0) {
         $ (this).replaceWith (tag_htm);
      }
   });
   var div_html_selector = '';
   var $qdeck_divs = $ ('div.qdeck_wrapper');
   var $fallback_wrappers = $ ('div.qdeck_wrapper_fallback');
   if ($qdeck_divs.length) {
      div_html_selector = 'div.qdeck_wrapper';
      $fallback_wrappers.css ({display: 'none'});
   } else {
      if ($fallback_wrappers.length == 0) {
         var style =   '<style type="text/css">\n'
                     +    '.qdeck_wrapper_fallback_visible {\n'
                     +       'visibility: visible;\n'
                     +    '}\n'
                     + '</style>\n';
         $ ('head').append (style);
      }
      div_html_selector = content;
   }
   n_decks = 0;
   var i_deck = 0;
   $ (div_html_selector).each (function () {
      var htm = $(this).html ();
      if (! htm) {
      } else {
         var qdeck_pos = htm.indexOf ('[qdeck') || htm.indexOf ('[/qdeck');
         if (qdeck_pos != -1) {
            var r = q.process_html2 (htm, i_deck);
            htm    = r.htm;
            i_deck = r.i_deck;
            if (q.qdeckdemos) {
               var n_qdeckdemos = q.qdeckdemos.length;
               for (var i_qdeckdemo=0; i_qdeckdemo< n_qdeckdemos; i_qdeckdemo++) {
                  var qdeckdemo_i = q.qdeckdemos[i_qdeckdemo];
                  var len = qdeckdemo_i.length;
                  qdeckdemo_i = qdeckdemo_i.substring (11, len - 12);
                  htm = htm.replace ('<qdeckdemo></qdeckdemo>', qdeckdemo_i);
               }
            }
            if (r.replace_body) {
               const i_preview_deck = q.preview_i_deck_plus1 - 1;
               var h =  '<div class="preview_header">'
                      +    '<h2 style="margin-bottom: 10px;">Preview deck</h2>'
                      +    '<a href="javascript: void (0)" style="float: right; margin-right: 50px;" onclick="' + qname + '.reset_preview (' + i_preview_deck + ')">Reload preview</a>';
               $ ('body').html (h + htm);
               $ ('div.qcard_window').css ({margin: 'auto'});
            } else {
               $ (this).html (htm);
            }
            $ (this).find ('div.qcard_window')
               .on ('mouseenter',
                    function (e) {
                       if (e.target.className.toLowerCase () == 'qcard_window') {
                          document_active_qwiz_qdeck = e.target;
                       } else {
                          var $qdeckdiv = $ (e.target).parents ('div.qcard_window');
                          if ($qdeckdiv.length) {
                             document_active_qwiz_qdeck = $qdeckdiv[0];
                          }
                       }
                       if (debug[7]) {
                          console.log ('[qcard_window mouseenter] e.target:', e.target);
                          console.log ('[qcard_window mouseenter] document_active_qwiz_qdeck:', document_active_qwiz_qdeck);
                       }
                    });
         }
         if ($qdeck_divs.length) {
            $ (this).contents ().unwrap ();
         }
      }
      n_decks = i_deck;
   });
   $ ('div.qdeck_wrapper').removeClass ('qwiz_shortcodes_hidden');
   for (var i_deck=0; i_deck<n_decks; i_deck++) {
      if (deckdata[i_deck].qrecord_id) {
         var n_cards = deckdata[i_deck].n_cards;
         var data = {qwiz_qdeck: 'qdeck', n_questions_cards: n_cards};
         qqc.jjax (qname, i_deck, deckdata[i_deck].qrecord_id, 'check_registered', data);
      }
   }
   if (n_decks && ! q.qwizard_b) {
      qqc.init_enter_intercept ();
   }
   if (q.qrecord_b) {
      qqc.set_user_menus_and_icons ();
   }
   q.processing_complete_b = true;
}
this.process_html2 = function (htm, i_deck, qwizard_b, create_qwizard_json_f) {
   var qdeckdemo_re = new RegExp ('\\[qdeckdemo\\][\\s\\S]*?\\[\\/qdeckdemo\\]', 'gm');
   q.qdeckdemos = htm.match (qdeckdemo_re);
   if (q.qdeckdemos) {
      htm = htm.replace (qdeckdemo_re, '<qdeckdemo></qdeckdemo>');
      if (debug[0]) {
         console.log ('[process_html2] q.qdeckdemos.length: ', q.qdeckdemos.length);
      }
   }
   htm = htm.replace (/<!--[^]*?-->/gm, '');
   htm = htm.replace (/\[!+\][^]*?\[\/!+\]/gm, '');
   var local_n_decks = 0;
   var do_not_process_htm = check_qdeck_tag_pairs (htm);
   if (do_not_process_htm) {
      htm = do_not_process_htm;
      if (typeof qwizard != 'undefined') {
         qwizard.errmsgs = errmsgs;
      }
   } else {
      var qdeck_matches = htm.match (/\[qdeck[^]*?\[\/qdeck\]/gm);
      if (qdeck_matches) {
         var local_n_decks = qdeck_matches.length;
         if (debug[0]) {
            console.log ('[process_html2] local_n_decks: ', local_n_decks);
            console.log ('                qdeck_matches[0]: ', qdeck_matches[0]);
         }
         if (q.preview_i_deck_plus1) {
            q.preview = true;
         }
         var do_qdeck_pair = true;
         var replace_body  = false;
         q.decks_cards = [];
         for (var ii_deck=0; ii_deck<local_n_decks; ii_deck++) {
            if (q.preview_i_deck_plus1) {
               if (q.preview_i_deck_plus1 == i_deck + 1) {
                  replace_body = true;
                  do_qdeck_pair = true;
               } else {
                  do_qdeck_pair = false;
               }
            }
            if (do_qdeck_pair) {
               var new_deck_html
                         = q.process_qdeck_pair (qdeck_matches[ii_deck], i_deck,
                                                 qwizard_b,
                                                 create_qwizard_json_f,
                                                 create_qwizard_json_f);
               if (create_qwizard_json_f) {
                  if (qwizard.questions_cards && qwizard.questions_cards.length) {
                     qwizard.questions_cards[0].dataset_b = qwizard.questions_cards_dataset_b;
                     q.decks_cards[i_deck] = JSON.parse (JSON.stringify (qwizard.questions_cards));
                  }
                  if (debug[0]) {
                     console.log ('[process_html2] i_deck:', i_deck, ', qwizard.questions_cards:', qwizard.questions_cards);
                     if (qwizard.questions_cards) {
                        console.log ('[process_html2] JSON.stringify (qwizard.questions_cards):', JSON.stringify (qwizard.questions_cards));
                        console.log ('[process_html2] qwizard.questions_cards.length:', qwizard.questions_cards.length);
                     }
                  }
               }
               htm = htm.replace (/(<[ph][^>]*>\s*)*?\[qdeck[^]*?\[\/qdeck\]/m, new_deck_html);
            } else {
               deckdata[i_deck] = {};
            }
            i_deck++;
         }
         if (debug[0] && q.decks_cards.length) {
            var n = q.decks_cards.length;
            for (var i=0; i<n; i++) {
               console.log ('[process_html2] q.decks_cards[' + i + ']:', q.decks_cards[i]);
            }
         }
         if (debug[3]) {
            console.log ('[process_html2] htm:', htm);
         }
      }
   }
   return {'htm': htm, 'i_deck': i_deck, 'replace_body': replace_body};
}
this.reset_preview = function (i_deck) {
   $.cookie ('deck_preview', i_deck, {path: '/'});
   window.location = window.location.href;
}
this.init_textentry_autocomplete = function (i_deck, i_card) {
   if (debug[0]) {
      console.log ('[init_textentry_autocomplete] i_card:', i_card);
   }
   var card = deckdata[i_deck].cards[i_card];
   var minlength = card.textentry_minlength;
   if (card.all_choices[0].length < minlength) {
      minlength = card.all_choices[0].length;
   }
   var $qcard_card = q.get_card_front (i_deck);
   if (card.single_char_b) {
      $qcard_card.find ('input.qcard_single_char_entry').keyup (single_char_textentry_keyup);
   } else {
      var $textentry = $qcard_card.find ('input.textentry-qdeck' + i_deck);
      $textentry.autocomplete ({
         minLength:     minlength,
         source:        find_matching_terms,
         close:         menu_closed,
         open:          menu_shown,
         select:        q.item_selected
      });
      $textentry.keyup (menu_closed);
   }
   const show_first = deckdata[i_deck].showing_first;
   if (card.single_char_b) {
      if (show_first == 'front') {
         $ (button_flip_selector (i_deck)).addClass ('qwiz_button_disabled').attr ('disabled', true);
         deckdata[i_deck].check_answer_disabled_b = true;
      }
      card.check_answer = 'Check answer';
   } else {
      if (deckdata[i_deck].terms) {
         if (! deckdata[i_deck].textentry_terms_metaphones) {
            deckdata[i_deck].textentry_terms_metaphones = qqc.process_textentry_terms (deckdata[i_deck].terms);
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
               terms_data = qqc.get_textentry_terms (plugin_url + 'terms.txt', deckdata);
            }
            default_textentry_terms_metaphones = qqc.process_textentry_terms (terms_data);
         }
      }
      if (deckdata[i_deck].add_terms) {
         if (! deckdata[i_deck].add_textentry_terms_metaphones) {
            deckdata[i_deck].add_textentry_terms_metaphones = qqc.process_textentry_terms (deckdata[i_deck].add_terms);
         }
      }
      if (card.use_terms_b) {
         var singular_plural;
         if (card.textentry_plural_b) {
            singular_plural = 'plural';
         } else {
            singular_plural = 'singular';
         }
         if (deckdata[i_deck].terms) {
            current_card_textentry_terms_metaphones[i_deck]
                  = deckdata[i_deck].textentry_terms_metaphones[singular_plural];
         } else {
            current_card_textentry_terms_metaphones[i_deck]
                  = default_textentry_terms_metaphones[singular_plural];
         }
         if (deckdata[i_deck].add_terms) {
            current_card_textentry_terms_metaphones[i_deck]
               = current_card_textentry_terms_metaphones[i_deck]
                  .concat (deckdata[i_deck].add_textentry_terms_metaphones[singular_plural]);
         }
      } else {
         current_card_textentry_terms_metaphones[i_deck] = [];
      }
      textentry_answers[i_deck] = card.all_choices;
      textentry_answer_metaphones[i_deck]
         = textentry_answers[i_deck].map (function (answer) {
                                             answer = answer.replace (/\s*(\S+)\s.*/, '\$1');
                                             return qqc.metaphone (answer);
                                          });
      var textentry_answers_metaphones
         = textentry_answers[i_deck].map (function (answer) {
                                     return [answer, qqc.metaphone (answer)];
                                  });
      if (debug[6]) {
         console.log ('[init_textentry_autocomplete] textentry_answers_metaphones: ', textentry_answers_metaphones);
      }
      current_card_textentry_terms_metaphones[i_deck]
         = current_card_textentry_terms_metaphones[i_deck]
                                       .concat (textentry_answers_metaphones);
      current_card_textentry_terms_metaphones[i_deck]
         = qqc.sort_dedupe_terms_metaphones (current_card_textentry_terms_metaphones[i_deck]);
      if (debug[6]) {
         console.log ('[init_textentry_autocomplete] current_card_textentry_terms_metaphones[i_deck].length: ', current_card_textentry_terms_metaphones[i_deck].length);
         console.log ('[init_textentry_autocomplete] current_card_textentry_terms_metaphones[i_deck].slice (0, 10): ', current_card_textentry_terms_metaphones[i_deck].slice (0, 10));
         var i_start = current_card_textentry_terms_metaphones[i_deck].length - 10;
         if (i_start > 0) {
            console.log ('[init_textentry_autocomplete] current_card_textentry_terms_metaphones[i_deck].slice (' + i_start + '): ', current_card_textentry_terms_metaphones[i_deck].slice (i_start));
         }
      }
      if (! deckdata[i_deck].bck_f) {
         if (i_card  == deckdata[i_deck].i_card && ! deckdata[i_deck].card_reviewed_b) {
            if (! card.saved_textentry_ok) {
               var placeholder;
               var check_answer;
               if (minlength <= 1) {
                  placeholder = T ('Type a letter/number');
                  check_answer = T ('Type a letter');
               } else {
                  minlength = Math.max (minlength, 3);
                  placeholder = T ('Type %s+ letters/numbers');
                  placeholder = placeholder.replace ('%s', minlength);
                  check_answer = T ('Type %s+ letters');
                  check_answer = check_answer.replace ('%s', minlength);
               }
               $textentry.attr ('placeholder', placeholder);
               if (show_first == 'front') {
                  $ (button_flip_selector (i_deck)).html (check_answer);
               }
               card.save_check_answer = check_answer;
               card.check_answer      = check_answer;
               card.textentry_minlength = minlength;
               if (show_first == 'front') {
                  $ (button_flip_selector (i_deck)).addClass ('qwiz_button_disabled').attr ('title', Tcheck_answer_message);
                  deckdata[i_deck].check_answer_disabled_b = true;
               }
            }
         }
      }
      deckdata[i_deck].textentry_n_hints = 0;
      if (deckdata[i_deck].n_reviewed == 0
                        && (q.no_intro_b[i_deck] || deckdata[i_deck].n_cards == 1)) {
         deckdata[i_deck].$qcard_window.attr ('onmouseenter', qname + '.start_hint_timeout (' + i_deck + ')');
      } else {
         q.start_hint_timeout (i_deck);
      }
   }
   if (deckdata[i_deck].click_flip_b) {
      $ ('#textentry_hint-qdeck' + i_deck).click (function (event) {
         event.stopPropagation ();
         if (debug[0]) {
            console.log ('[init_textentry_autocomplete] click event:', event);
         }
      });
   }
}
this.start_hint_timeout = function (i_deck) {
   if (debug[0]) {
      console.log ('[start_hint_timeout] i_deck:', i_deck);
   }
   deckdata[i_deck].$qcard_window.removeAttr ('onmouseenter');
   var show_hint_button = function () {
      $ ('#textentry_hint-qdeck' + i_deck)
         .removeAttr ('disabled')
         .removeClass ('qwiz_button_disabled')
         .show ();
   }
   $ ('#textentry_hint-qdeck' + i_deck).html ('Hint').hide ();
   if (hint_timeout_sec >= 0) {
      show_hint_timeout[i_deck] = setTimeout (show_hint_button, hint_timeout_sec*1000);
   }
}
this.process_qdeck_pair = function (htm, i_deck, qwizard_b,
                                    existing_qdeck_to_qwizard_f,
                                    qwizard_process_dataset_questions_f) {
   if (debug[0]) {
      console.log ('[process_qdeck_pair] htm:', htm);
      console.log ('[process_qdeck_pair] i_deck:', i_deck);
   }
   q.qwizard_b = qwizard_b;
   if (typeof qwizard != 'undefined') {
      qw = qwizard;
   }
   if (existing_qdeck_to_qwizard_f) {
      n_decks = 1;
      set_qwizard_data_b = true;
      q.no_intro_b = [];
   }
   deckdata.push ({});
   deckdata[i_deck].cards = [];
   deckdata[i_deck].first_display_f = true;
   deckdata[i_deck].answered_correctly = {};  // Used only for hangman.
   deckdata[i_deck].showing_front_b = true;
   deckdata[i_deck].i_card     = 0;
   deckdata[i_deck].n_reviewed = 0;
   deckdata[i_deck].n_got_it   = 0;
   deckdata[i_deck].exit_html = '';
   deckdata[i_deck].align = '';
   deckdata[i_deck].hangman = {};
   deckdata[i_deck].use_dataset = '';
   deckdata[i_deck].dataset_id = {};
   deckdata[i_deck].use_dataset_card_ids = {};
   deckdata[i_deck].qrecord_id = '';
   deckdata[i_deck].qrecord_id_ok = 'check credit';
   deckdata[i_deck].unit = [];
   deckdata[i_deck].default_card_back_background = '';
   deckdata[i_deck].card_back_background = [];
   deckdata[i_deck].click_flip_b = true;
   var m = htm.match (/(<[^\/][^>]*>\s*)*?\[qdeck([^\]]*)\]/m);
   var qdeck_tag  = m[0];
   var attributes = m[2];
   qdeck_tag  = qqc.replace_smart_quotes (qdeck_tag);
   attributes = qqc.replace_smart_quotes (attributes);
   if (debug[0]) {
      console.log ('[process_qdeck_pair] qdeck_tag: ', qdeck_tag);
      console.log ('[process_qdeck_pair] attributes: ', attributes);
   }
   if (set_qwizard_data_b) {
      qw.set_qwizard_data ('qwiz_deck_attributes', attributes);
   }
   var use_dataset_cards_b = false;
   deckdata[i_deck].summary_b = get_attr (qdeck_tag, 'summary') != 'false';
   var use_dataset = get_attr (qdeck_tag, 'use_dataset');
   if (! use_dataset) {
      const dataset = get_attr (qdeck_tag, 'dataset');
      if (dataset) {
         if (regular_page_f) {
            use_dataset = dataset;
         } else {
            deckdata[i_deck].dataset = dataset;
         }
      }
   }
   if (use_dataset) {
      deckdata[i_deck].use_dataset = use_dataset;
      var dataset_intro_f = get_attr (qdeck_tag, 'dataset_intro');
      if (! dataset_intro_f || dataset_intro_f == 'true') {
         dataset_intro_f = true;
      } else if (dataset_intro_f == 'false') {
         dataset_intro_f = false;
      }
      deckdata[i_deck].dataset_intro_f = dataset_intro_f;
      var spaced_repetition_f = get_attr (qdeck_tag, 'spaced_repetition') != 'false';
      deckdata[i_deck].dataset_questions_to_do = spaced_repetition_f ? 'spaced_repetition' : 'all';
      const random_b = get_attr (qdeck_tag, 'random') == 'true';
      deckdata[i_deck].random_b = random_b;
      if (q.qwizard_b) {
         deckdata[i_deck].attr_random_b = random_b;
      }
      var m = qdeck_tag.match (/\sstyle\s*=\s*"[^"]+"/gm);
      if (m) {
         var len = m.length;
         for (var i=0; i<len; i++) {
            var encoded_style = encodeURIComponent (m[i]);
            qdeck_tag = qdeck_tag.replace (m[i], encoded_style);
         }
      }
      var display_name = get_attr (qdeck_tag, 'display_name');
      if (display_name) {
         deckdata[i_deck].use_dataset_options_display_name = decodeURIComponent (display_name);
         var qdeck_tag = qdeck_tag.replace (/\sdisplay_name\s*=\s*"[^"]*?"/, '');
      }
      qdeck_tag = decodeURIComponent (qdeck_tag);
   }
   const reshow_after = get_attr (qdeck_tag, 'reshow_after');
   if (reshow_after) {
      deckdata[i_deck].reshow_after = reshow_after;
   }
   var show_first = get_attr (qdeck_tag, 'show_first');
   if (! show_first) {
      show_first = 'front';
   }
   deckdata[i_deck].show_first = show_first;
   const cards_to_show = parseInt (get_attr (qdeck_tag, 'cards_to_show'));
   if (qqc.isInteger (cards_to_show) && cards_to_show > 0) {
      deckdata[i_deck].cards_to_show = cards_to_show;
   }
   var align = get_attr (attributes, 'align');
   if (align == 'center' || align == 'right' || align == 'tiled') {
      deckdata[i_deck].align = align;
      if (align == 'tiled') {
         deckdata[i_deck].spacing = 20;
      }
   }
   var spacing = parseInt (get_attr (attributes, 'spacing'));
   if (qqc.isInteger (spacing)) {
      deckdata[i_deck].spacing = spacing;
   }
   var qrecord_id = get_attr (attributes, 'qrecord_id');
   if (qrecord_id) {
      deckdata[i_deck].qrecord_id = qrecord_id;
      deckdata[i_deck].q_and_a_text = {};
      if (! q.qrecord_b) {
         q.qrecord_b = true;
         if (typeof (document_qwiz_user_logged_in_b) == 'undefined'
                              || document_qwiz_user_logged_in_b == 'not ready') {
            qqc.check_session_id (i_deck);
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
   const card_time_limit = get_attr (attributes, 'card_time_limit');
   if (card_time_limit) {
      deckdata[i_deck].card_time_limit = parseInt (card_time_limit);
   }
   const deck_timer = get_attr (attributes, 'deck_timer') == 'true';
   if (deck_timer) {
      deckdata[i_deck].deck_timer = deck_timer;
   }
   var unit = get_attr (attributes, 'unit');
   if (unit) {
      deckdata[i_deck].default_unit = unit;
      if (set_qwizard_data_b) {
         qw.set_qwizard_data ('default_unit', unit);
      }
   } else {
      deckdata[i_deck].default_unit = 'null';
   }
   if (q.qwizard_b) {
         deckdata[i_deck].click_flip_b = false;
   } else {
      const click_flip_val = get_attr (attributes, 'click_flip');
      if (click_flip_val) {
         deckdata[i_deck].click_flip_b = ! (click_flip_val == 'false');
      }
   }
   deckdata[i_deck].font_weight_normal = get_attr (attributes, 'bold_text') == 'false';
   var card_back_background = get_attr (attributes, 'card_back');
   if (card_back_background) {
      deckdata[i_deck].default_card_back_background = card_back_background;
   } else {
      card_back_background = get_attr (attributes, 'card_back_image');
      if (card_back_background) {
         deckdata[i_deck].default_card_back_background = 'img:' + card_back_background;
      } else {
         deckdata[i_deck].default_card_back_background = '';
      }
   }
   deckdata[i_deck].scroll_b = get_attr (attributes, 'scroll') == 'true';
   deckdata[i_deck].hide_forward_back_b = get_attr (attributes, 'hide_forward_back') == 'true';
   deckdata[i_deck].hide_progress_b = get_attr (attributes, 'hide_progress') == 'true';
   deckdata[i_deck].hide_qwizcards_icon_b = get_attr (attributes, 'hide_qwizcards_icon') == 'true';
   var mobile_enabled = get_attr (attributes, 'mobile_enabled');
   if (! mobile_enabled) {
      mobile_enabled = document_qwiz_mobile_enabled;
   }
   deckdata[i_deck].mobile_enabled = mobile_enabled;
   deckdata[i_deck].hide_flip_b = get_attr (attributes, 'hide_flip') == 'true';
   deckdata[i_deck].hide_gotit_b = get_attr (attributes, 'hide_gotit') == 'true';
   deckdata[i_deck].gotit_active = get_attr (attributes, 'gotit_active') == 'true';
   deckdata[i_deck].hide_shuffle_b = get_attr (attributes, 'hide_shuffle') == 'true';
   var flip_axis = get_attr (attributes, 'flip_direction');
   if (flip_axis == '' || flip_axis == 'random') {
      flip_axis = '';
   } else if (flip_axis == 'up_down') {
      flip_axis = 'x';
   } else {
      flip_axis = 'y';
   }
   deckdata[i_deck].flip_axis = flip_axis;
   var new_html = '';
   var no_intro_i_b = false;
   var m = htm.match (/\[qdeck[^\]]*\]((<\/[^>]+>\s*)*)/m, '');
   if (m) {
      var initial_closing_tags = m[1];
      new_html += initial_closing_tags;
   }
   htm = htm.replace (/\[qdeck[^\]]*\]((<\/[^>]+>\s*)*)/m, '');
   htm = htm.replace (/(<(p|h[1-6]|span)[^>]*>)*\[\/qdeck\]$/, '');
   htm = qqc.trim (htm);
   var no_click_flip_msg = qqc.check_pairs ('[no_click_flip]', '[/no_click_flip]', htm);
   if (no_click_flip_msg) {
      if (no_click_flip_msg == 'ok') {
         htm = htm.replace (/\[no_click_flip\]/g, '<div class="qwiz_no_click_flip">');
         htm = htm.replace (/\[\/no_click_flip\]/g, '</div>');
      } else {
         errmsgs.push (no_click_flip_msg + '.  qdeck: ' + (i_deck + 1));
      }
   }
   var n_cards = -1;
   if (! use_dataset && htm.search (/\[q([^\]]*)\]/m) == -1) {
      errmsgs.push (T ('Did not find question tags ("[q]")') + '.  qdeck: ' + (i_deck + 1));
      n_cards = 0;
   }
   htm = qqc.process_inline_textentry_terms (htm, 'terms', deckdata, i_deck);
   errmsgs = errmsgs.concat (deckdata.additional_errmsgs);
   htm = qqc.process_inline_textentry_terms (htm, 'add_terms', deckdata, i_deck);
   errmsgs = errmsgs.concat (deckdata.additional_errmsgs);
   var whitespace = qqc.parse_html_block (htm.substr (0, 2000), ['^'], ['[h]', '[i]', '[q]', '[q '], 'return whitespace');
   if (whitespace) {
      htm = htm.replace (whitespace, '');
   }
   htm = process_header (htm, i_deck, true);
   if (set_qwizard_data_b && deckdata[i_deck].header_html) {
      qw.set_qwizard_data ('header_text', deckdata[i_deck].header_html);
   }
   var intro_html = qqc.parse_html_block (htm.substr (0, 2000), ['[i]'], ['[q]', '[q ', '[x]'], true);
   if (intro_html == 'NA') {
      intro_html = qqc.parse_html_block (htm.substr (0, 2000), ['^'], ['[q]', '[q ', '[x]'], true);
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
         errmsgs.push (T ('Text before intro') + ' ("[i]").  qdeck: ' + (i_deck + 1));
      }
      intro_html = intro_html.replace (/\[i\]/, '');
   }
   var intro_text = '';
   if (intro_html != '') {
      intro_html = qqc.balance_closing_tag (intro_html);
      intro_text = intro_html;
      var start_button_html = '<button id="start_button-qdeck' + i_deck + '" class="qwiz_button" onclick="' + qname + '.start_deck (' + i_deck + ')">' + T ('Start reviewing cards') + '</button>';
      if (intro_html.indexOf ('[start]') != -1) {
         intro_html = intro_html.replace ('[start]', start_button_html);
      } else {
         intro_html += start_button_html;
         intro_text += '[start]';
      }
   }
   if (set_qwizard_data_b) {
      intro_text = qqc.remove_empty_opening_tags (intro_text);
      qw.set_qwizard_data ('intro_text', intro_text);
   }
   deckdata[i_deck].intro_html = intro_html;
   var card_html = htm;
   if (n_cards != 0) {
      var i_pos = qqc.opening_tag_shortcode_pos ('([q |[q])', htm);
      card_html = htm.substr (i_pos);
   }
   var exit_mobile_button_html =
         '<button class="summary_exit_mobile_deck qwiz_button" onclick="' + qname + '.exit_mobile (' + i_deck + ')">\n'
       +    'Return to page view'
       + '</button>\n';
   var exit_html = qqc.parse_html_block (htm, ['[x]'], []);
   if (exit_html != 'NA') {
      exit_html = exit_html.replace (/\[x\]/, '');
      exit_html = qqc.balance_closing_tag (exit_html);
   } else {
      exit_html = '';
   }
   if (set_qwizard_data_b) {
      qw.set_qwizard_data ('exit_text', qqc.remove_empty_opening_tags (exit_html));
   }
   if (exit_html) {
      if (exit_html.indexOf ('[unpaid') != -1 && exit_html.indexOf ('[/unpaid]') != -1) {
         exit_html = exit_html.replace ('[unpaid]', '<span class="unpaid_msg">');
         exit_html = exit_html.replace ('[/unpaid]', '</span>');
      } else {
         if (deckdata[i_deck].pay_quiz_deck_id) {
            exit_html += '<span class="unpaid_msg_payment_type unpaid_msg"></span>';
         }
      }
   } else {
      if (deckdata[i_deck].pay_quiz_deck_id) {
         exit_html += '<span class="unpaid_msg_payment_type unpaid_msg"></span>';
      }
   }
   if (deckdata[i_deck].use_dataset) {
      if (exit_html.indexOf ('[restart') == -1) {
         exit_html += '<br />[restart]';
      }
   }
   if (exit_html) {
      var label;
      if (deckdata[i_deck].use_dataset && deckdata[i_deck].dataset_intro_f) {
         label = T ('Practice more flashcards');
      } else {
         label = T ('Review this flashcard stack again');
      }
      var restart = exit_html.match (/\[restart[^\]]*\]/);
      if (restart) {
         var attr = qqc.replace_smart_quotes (restart[0]);
         var custom_label = get_attr (attr, 'label');
         if (custom_label) {
            label = custom_label;
         }
      }
      var restart_button_html =
                       '    <button class="qwiz_button qwiz_restart"'
                     + '            onclick="' + qname + '.start_deck (' + i_deck + ', true)">\n'
                     +          label + '\n'
                     + '    </button>\n';
      exit_html = exit_html.replace (restart, restart_button_html);
      exit_html += '<br />' + exit_mobile_button_html;
      var i_pos_exit_opening = qqc.opening_tag_shortcode_pos ('[x]', card_html);
      card_html = card_html.substr (0, i_pos_exit_opening);
   } else {
      exit_html = exit_mobile_button_html;
   }
   deckdata[i_deck].exit_html = exit_html;
   if (! use_dataset) {
      if (htm.search (/use_dataset_card\s*=\s*/) != -1) {
         use_dataset_cards_b = true;
         deckdata[i_deck].use_dataset_card_html = card_html;
      }
   }
   if (n_cards && ! use_dataset
            && (! use_dataset_cards_b || qwizard_process_dataset_questions_f)) {
      n_cards = q.process_cards (card_html, i_deck);
   } else {
      if (qwizard_process_dataset_questions_f) {
         qwizard.questions_cards_dataset_b = false;
      }
      if (debug[0]) {
         console.log ('[process_qdeck_pair] (not calling process_cards ()) qwizard_process_dataset_questions_f:', qwizard_process_dataset_questions_f);
      }
   }
   q.no_intro_b[i_deck] = no_intro_i_b;
   if (! use_dataset && ! use_dataset_cards_b) {
      deckdata[i_deck].n_cards = n_cards;
      if (set_qwizard_data_b) {
         qw.set_qwizard_data ('n_questions', n_cards);
      }
      const cards_to_show = deckdata[i_deck].cards_to_show;
      if (cards_to_show && cards_to_show < n_cards) {
         deckdata[i_deck].n_to_go          = cards_to_show;
         deckdata[i_deck].n_cards_for_done = cards_to_show;
         deckdata[i_deck].random_b         = true;
      } else {
         deckdata[i_deck].n_to_go          = n_cards;
         deckdata[i_deck].n_cards_for_done = n_cards;
      }
   }
   new_html = create_qdeck_divs (i_deck, qdeck_tag);
   if (debug[3]) {
      console.log ('                    new_html: ', new_html);
   }
   if (typeof qwizard != 'undefined') {
      if (typeof qwizard != 'undefined') {
         qwizard.errmsgs = errmsgs;
      }
   }
   set_qwizard_data_b = false;
   return new_html;
}
this.process_cards = function (card_html, i_deck, i_qwizard_card, set_qwizard_f) {
   if (debug[0]) {
      console.log ('[process_cards] card_html:', card_html, ', i_qwizard_card:', i_qwizard_card);
   }
   if (set_qwizard_f) {
      qw = qwizard;
      n_decks = 1;
      set_qwizard_data_b = true;
      q.qwizard_b = true;
   }
   if (typeof (i_qwizard_card) != 'undefined') {
      number_first_card = i_qwizard_card;
   } else {
      number_first_card = 0;
   }
   if (! set_qwizard_data_b) {
      if (card_html.indexOf ('[!') != -1) {
         card_html = card_html.replace (/\[!+\][^]*?\[\/!+\]/gm, '');
      }
   }
   var card_tags = card_html.match (/\[(q\]|q\s+[^\]]*\])/gm);
   if (debug[4]) {
      console.log ('[process_cards] card_tags[0]: ', card_tags[0]);
   }
   if (card_tags.length) {
      q.process_card_attributes (i_deck, card_tags, number_first_card);
      const dataset_ids = Object.values (deckdata[i_deck].dataset_id);
      if (dataset_ids.length > 1) {
         dataset_ids.sort ();
         const l = dataset_ids.length;
         var dup_err = false;
         for (var i=1; i<l; i++) {
            if (dataset_ids[i] == dataset_ids[i - 1]) {
               errmsgs.push (T ('Duplicate') + ' dataset_id: ' + dataset_ids[i] + '.  qdeck: ' + (i_deck + 1));
               dup_err = true;
            }
         }
         if (dup_err) {
            errmsgs.push (T ('Please delete the duplicate dataset_id="..." attribute(s); new IDs will be created'));
         }
      }
   }
   var cards_html = [];
   var qtags = ['[q]', '[q '];
   var remaining_card_html = card_html;
   while (true) {
      var card_i_html = qqc.parse_html_block (remaining_card_html, qtags, qtags);
      if (card_i_html == 'NA') {
         break;
      }
      remaining_card_html = remaining_card_html.substr (card_i_html.length);
      card_i_html = card_i_html.replace (/\[q[^\]]*\]/, '');
      card_i_html = card_i_html.replace (/^\s*(<\/[^>]+>)+/, '');
      cards_html.push (card_i_html);
   }
   if (debug[0]) {
      console.log ('[process_cards] cards_html: ', cards_html);
   }
   var n_cards = cards_html.length;
   if (debug[0]) {
      console.log ('[process_cards] n_cards: ', n_cards);
   }
   for (var ii=0; ii<n_cards; ii++) {
      var i_card = ii + number_first_card;
      var card;
      if (cards_html[ii].search (/\[hangman|qdeck_hangman|hangman_img_wrapper/m) != -1) {
         card = process_hangman (i_deck, i_card, cards_html[ii]);
      } else if (cards_html[ii].search (/\[c\]|\[c\*\]/m) != -1) {
         card = process_textentry (i_deck, i_card, cards_html[ii]);
      } else {
         card = process_card_input (i_deck, i_card, cards_html[ii]);
      }
      deckdata[i_deck].cards[i_card] = card;
   }
   return n_cards;
}
function create_qwiz_icon_div (i_deck) {
   var divs = [];
   divs.push ('<div id="icon_qdeck' + i_deck + '" class="icon_qdeck">');
   var icon_qwiz = qqc.get_qwiz_param ('icon_qwiz');
   if (icon_qwiz != 'Not displayed') {
      var title = T ('Want to use this flashcard deck in your own class?');
      if (icon_qwiz != 'Icon only') {
         divs.push ('<a href="mailto:support@qwizcards.com" style="border: none; box-shadow: none;" target="_blank">');
      }
      var title = T ('Questions, comments, suggestions?') + ' support@qwizcards.com';
      divs.push ('      <img class="icon_qdeck" style="border: none;" title="' + title + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAIAAAALACogAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABP0lEQVR4nGP8//8/AymAiSTV5GhgwSZ4rcRrxRooW3futlBnJDlGND/cXzXVccFLVP0oepiwqtZJyH2wrenBtogQBgYGhsv9q15j9cO1qTDVW8JEGRgYGBi0PJ0YGBgYrjzCpuH+qv1rGBgYGHQLoaoZGBgYlOTEGRgYGB68uY+h4fXuQy8ZGBgYnLSRvXjv0UsGBgYGBRFFdA1Prm+6x8DAwBBio4XsyO37GBgYGHTkEHaixYO4mszrWTl1CjmH7iMcKe5nhdAAi4cnL6/A3HbrHgMDw56pJ0QYIOHr5JgmgzASZoOFdggDAwPDy03HRCEhs6YJEne6c0uQHYkUcXt76pL3oTqQQbxqVjay8Sh+cC5pmuuEpkFMWQZNBCNpwMDrWTmT2+5hCCu54EqtomkVLjqYwgoiuGzACWifgQDhK2rq5bcX2gAAAABJRU5ErkJggg==" />');
      if (icon_qwiz != 'Icon only') {
         divs.push ('</a>');
      }
   }
   divs.push ('</div>');
   return divs.join ('');
}
this.qwiz_icon_stop_propagation = function (i_deck) {
   $ ('#icon_qdeck' + i_deck).click (function (event) {
      event.stopPropagation ();
   });
}
function process_card_input (i_deck, i_card, htm) {
   var card = {};
   card.got_it = false;
   var card_front_and_back_html = htm;
   if (debug[1]) {
      console.log ('[process_card_input] card_front_and_back_html: ', card_front_and_back_html);
   }
   var i_answer_pos = qqc.opening_tag_shortcode_pos ('[a]', card_front_and_back_html);
   var card_front_html = card_front_and_back_html.substr (0, i_answer_pos);
   if (deckdata[i_deck].qrecord_id) {
      if (qqc.isInteger (deckdata[i_deck].dataset_id[i_card])) {
         var q_and_a_text = qqc.remove_tags_eols (card_front_and_back_html);
         deckdata[i_deck].q_and_a_text[i_card] = qqc.q_and_a_hash (q_and_a_text);
      } else {
         deckdata[i_deck].q_and_a_text[i_card] = deckdata[i_deck].dataset_id[i_card];
      }
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].type = 'simple_card';
      qw.questions_cards[i_card].question_text = card_front_html;
   }
   var front_textentry_b = false;
   if (card_front_html.indexOf ('[textentry') != -1) {
      card_front_html = card_front_textentry_html (card_front_html, i_deck);
      front_textentry_b = true;
      if (set_qwizard_data_b) {
         qw.questions_cards[i_card].type = 'optional_textentry';
      }
   }
   card.card_front = card_front_html;
   var card_back_html = card_front_and_back_html.substr (i_answer_pos);
   if (debug[0]) {
      console.log ('[process_card_input] card_back_html: ', card_back_html);
   }
   var a_opening_tags = '';
   if (! card_back_html) {
      if (! deckdata[i_deck].use_dataset_card_ids[i_card]) {
         var dotdotdot = htm.length > 150 ? ' ...' : '';
         errmsgs.push (T ('Did not find answer ("[a]" -- card back)') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (i_card + 1) + '\n' + htm.substr (0, 150) + dotdotdot);
         card_back_html = '';
      }
   } else {
      var shortcode_pos = card_back_html.indexOf ('[a]');
      a_opening_tags = card_back_html.substr (0, shortcode_pos);
      card_back_html = card_back_html.substr (shortcode_pos + 3);
      if (qqc.is_only_tags_and_whitespace (card_back_html)) {
         errmsgs.push (T ('Did not enter answer text -- card back') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (i_card + 1) + '\n' + htm);
      }
   }
   if (q.qwizard_b) {
      if (card_back_html.indexOf ('<span class="qwizard_placeholder">') != -1) {
         errmsgs.push (T ('Did not enter answer text -- card back') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (i_card + 1) + '\n' + htm);
      }
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].answer_text = a_opening_tags + card_back_html;
   }
   var card_back_items = card_back_html.split (/\[a\]/);
   if (card_back_items.length != 1) {
      errmsgs.push (T ('Got more than one answer ("[a]") -- card back') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card) + '\n' + htm);
   }
   if (deckdata[i_deck].qrecord_id) {
      if (qqc.isInteger (deckdata[i_deck].dataset_id[i_card])) {
         var q_and_a_text = qqc.q_and_a_hash (qqc.remove_tags_eols (card_back_items[0]));
         deckdata[i_deck].q_and_a_text[i_card] += '\n' + q_and_a_text;
      }
   }
   card.card_back = create_card_back_html (i_deck, i_card, card_back_items[0],
                                           a_opening_tags, front_textentry_b);
   return card;
}
function process_textentry (i_deck, i_card, htm) {
   var card = {};
   card.got_it = false;
   var question_text = '';
   var i_pos = qqc.opening_tag_shortcode_pos ('([c]|[c*])', htm);
   if (i_pos == htm.length) {
      errmsgs.push (T ('No answer-word given') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card));
   } else {
      question_text = htm.substr (0, i_pos);
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].question_text = question_text;
      qw.questions_cards[i_card].choices = [];
      qw.questions_cards[i_card].correct_choice_fs = [];
      qw.questions_cards[i_card].feedbacks = [];
   }
   var textentry_plural_b = false;
   var textentry_minlength = 3;
   var use_dict_b  = default_use_dict == 'true';
   var use_terms_b = default_use_terms == 'true';
   var single_char_b = false;
   var m = question_text.match (/\[textentry([^\]]*)\]/m);
   if (! m) {
      errmsgs.push (T ('Free-form input choices [c] or [c*] card does not have [textentry]')+ '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card));
   } else {
      var attributes = m[1];
      if (attributes) {
         attributes = qqc.replace_smart_quotes (attributes);
         textentry_plural_b = get_attr (attributes, 'plural') == 'true';
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
      qw.questions_cards[i_card].type = single_char_b ? 'one_letter_answer' : 'textentry';
      qw.questions_cards[i_card].textentry_attributes = attributes;
   }
   var classname;
   var style = '';
   if (single_char_b) {
      classname = 'qcard_single_char_entry';
      style = 'style="width: 2em;" ';
   } else {
      classname = 'qcard_textentry';
   }
   var input_and_button_htm =   '<div class="' + classname + '">\n'
                              +    '<input type="text" class="textentry-qdeck' + i_deck + ' autocomplete="off" ' + classname + '" ' + style + 'onfocus="' + qname + '.set_textentry_i_deck (this)" />\n'
                              +    '<button id="textentry_hint-qdeck' + i_deck + '" class="qwiz_button textentry_hint" onclick="' + qname + '.textentry_hint (' + i_deck + ')" disabled>'
                              +        T ('Hint')
                              +    '</button>\n'
                              + '</div><!-- END -->\n';
   htm = htm.replace (/\[textentry([^\]]*)\]/, input_and_button_htm);
   if (debug[0]) {
      console.log ('[process_textentry] htm:', htm);
   }
   var choice_start_tags = ['[c]', '[c*]'];
   var choice_next_tags  = ['[c]', '[c*]', '[x]'];
   var got_feedback_b = false;
   var c_pos = qqc.opening_tag_shortcode_pos ('([c]|[c*])', htm);
   var remaining_htm = htm.substr (c_pos);
   htm = htm.substr (0, c_pos);
   card.card_front = htm;
   card.textentry_required_b = true;
   if (deckdata[i_deck].qrecord_id) {
      if (qqc.isInteger (deckdata[i_deck].dataset_id[i_card])) {
         var q_and_a_text = htm.replace (/<button[^]*Hint.[^]?<\/button>/, '');
         q_and_a_text = qqc.remove_tags_eols (q_and_a_text + remaining_htm);
         deckdata[i_deck].q_and_a_text[i_card] = qqc.q_and_a_hash (q_and_a_text);
      } else {
         deckdata[i_deck].q_and_a_text[i_card] = deckdata[i_deck].dataset_id[i_card];
      }
   }
   card.choices = [];
   card.textentry_plural_b = textentry_plural_b;
   card.textentry_minlength = textentry_minlength;
   card.use_terms_b = use_terms_b;
   card.use_dict_b = use_dict_b;
   card.single_char_b = single_char_b;
   card.feedback_htmls = [];
   card.all_choices = [];
   card.card_back = '';
   var card_back = '';
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].textentry_plural_b = textentry_plural_b;
   }
   var i_choice = 0;
   var default_choice_given_b = false;
   while (true) {
      var choice_html = qqc.parse_html_block (remaining_htm, choice_start_tags,
                                              choice_next_tags);
      if (choice_html == 'NA') {
         break;
      }
      remaining_htm = remaining_htm.substr (choice_html.length);
      var r = process_feedback_item (choice_html);
      choice_html  = r.choice_html;
      if (r.feedback_html) {
         got_feedback_b = true;
         card.feedback_htmls.push (r.feedback_html);
         var r_check = process_feedback_item (choice_html);
         if (r_check.feedback_html) {
            errmsgs.push (T ('More than one answer or feedback shortcode [a] or [f] given with [textentry] choice') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      } else {
         errmsgs.push (T ('Did not get answer/feedback [a] or [f] for [textentry] choice') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         card.feedback_htmls.push ('');
      }
      if (set_qwizard_data_b) {
         qw.questions_cards[i_card].feedbacks[i_choice] = r.feedback_html;
      }
      choice_html = choice_html.replace (/.*\[c\*{0,1}\]/m, '');
      choice_html = choice_html.replace (/<[^>]+>|\n|&nbsp;/g, '');
      if (choice_html.replace (';', '').search (/\S/) == -1) {
         errmsgs.push (T ('No text given for [textentry] choice') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (1 + i_card) + ', ' + T ('choice') + ' ' + (1 + i_choice));
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
         if (card.feedback_htmls[i_choice] == '') {
            errmsgs.push (T ('For [textentry] card, wildcard choice ("*", for any other user entry) must be accompanied by answer/feedback "[a] or [f]"') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (1 + i_card) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      }
      card.choices.push (nonblank_alts);
      if (set_qwizard_data_b) {
         qw.questions_cards[i_card].choices.push (nonblank_alts.join (';'));
      }
      var n_alts = nonblank_alts.length;
      for (var i=0; i<n_alts; i++) {
         if (card.all_choices.indexOf (nonblank_alts[i]) != -1) {
            errmsgs.push (T ('Entry given in more than one [textentry] choice') + ': ' + nonblank_alts[i] + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (1 + i_card) + ', ' + T ('choice') + ' ' + (1 + i_choice));
         }
      }
      card.all_choices = card.all_choices.concat (nonblank_alts);
      i_choice++;
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].n_choices = i_choice;
   }
   card.card_back = card_back;
   if (default_choice_given_b) {
      if (card.choices.length == 1) {
         errmsgs.push (T ('Need to define acceptable entries for [textentry] card in addition to "other entry" choice ([c] *)') + '.  qdeck: ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (1 + i_card));
      }
   }
   if (debug[6]) {
      console.log ('[process_textentry] card.choices:', card.choices);
      console.log ('[process_textentry] card.feedback_htmls:', card.feedback_htmls);
   }
   return card;
}
function process_hangman (i_deck, i_card, card_html) {
   var hangman_labeled_diagram_f = card_html.indexOf ('hangman_img_wrapper') != -1;
   var type = hangman_labeled_diagram_f ? 'hangman_labeled_diagram' : 'hangman';
   var card = {};
   card.got_it = false;
   card.type   = type;
   var card_front_html = card_html;
   card_front_html = card_front_html.replace (/(<[^\/][^>]*>\s*)*?\[a\][^]*/m, '');
   if (debug[0]) {
      console.log ('[process_hangman] card_front_html: ', card_front_html);
   }
   if (deckdata[i_deck].qrecord_id) {
      if (qqc.isInteger (deckdata[i_deck].dataset_id[i_card])) {
         var q_and_a_text = card_front_html.replace (/\[hangman[^\]]*\]/g, '_________');
         deckdata[i_deck].q_and_a_text[i_card] = qqc.q_and_a_hash (qqc.remove_tags_eols (q_and_a_text));
      } else {
         deckdata[i_deck].q_and_a_text[i_card] = deckdata[i_deck].dataset_id[i_card];
      }
   }
   var hangman_max_hints    = default_hangman_max_hints;
   var hangman_type_letters = true;
   var m = card_html.match (/\[hangman([^\]]*)\]/m);
   if (m) {
      var attributes = m[1];
      if (attributes) {
         attributes = qqc.replace_smart_quotes (attributes);
         var hints = get_attr (attributes, 'hints');
         if (hints) {
            if (hints.search (/[^0-9]/) == -1) {
               hangman_max_hints = parseInt (hints);
            } else {
               errmsgs.push (T ('"hints" for [hangman] should be a number') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card));
            }
         }
         hangman_type_letters = ! (get_attr (attributes, 'type_letters') == 'false');
      }
   }
   var question_htm;
   var c_pos = card_front_html.search (/(<[^\/][^>]*>\s*)*?\[c\*{0,1}\]/m);
   if (c_pos == -1) {
      errmsgs.push (T ('Did not get [c] or [c*] (hangman answer) with [hangman]') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card));
      c_pos = 0;
      question_htm = card_front_html;
   } else {
      question_htm = card_front_html.substr (0, c_pos);
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].type = type;
      qw.questions_cards[i_card].hangman_attributes = attributes;
      qw.questions_cards[i_card].question_text = question_htm;
      qw.questions_cards[i_card].choices = [];
      qw.questions_cards[i_card].feedbacks = [];
   }
   if (debug[9]) {
      console.log ('[process_hangman] question_htm:', question_htm);
   }
   var m = question_htm.match (/\[hangman/g);
   var n_hangman = m.length;
   var remaining_htm = card_front_html.substr (c_pos);
   var choice_start_tags = ['[c]', '[c*]'];
   var choice_next_tags  = ['[c]', '[c*]', '[x]'];
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
      var hangman_match = choice_html.match (/\[c\*{0,1}\]([^\[]*)/m);
      if (hangman_match) {
         hangman_answer = hangman_match[1];
         hangman_answer = hangman_answer.replace (/<[^>]+>|\n|&nbsp;/g, '');
         hangman_answer = qqc.trim (hangman_answer);
         hangman_answer_length = hangman_answer.length;
         if (debug[9]) {
            console.log ('[process_hangman] hangman_answer:', hangman_answer);
         }
      }
      if (typeof deckdata[i_deck].hangman[i_card] == 'undefined') {
         deckdata[i_deck].hangman[i_card] = {};
      }
      if (! deckdata[i_deck].hangman[i_card].hangman_answer) {
         deckdata[i_deck].hangman[i_card].hangman_answer          = [];
         deckdata[i_deck].hangman[i_card].hangman_final_entry     = [];
         deckdata[i_deck].hangman[i_card].hangman_current_entry   = [];
         deckdata[i_deck].hangman[i_card].hangman_incorrect_chars = [];
         deckdata[i_deck].hangman[i_card].hangman_n_hints         = [];
      }
      if (i_choice == 0) {
         deckdata[i_deck].hangman[i_card].n_hangman_done          = 0;
         deckdata[i_deck].hangman[i_card].hangman_max_hints       = hangman_max_hints;
         deckdata[i_deck].hangman[i_card].hangman_type_letters    = hangman_type_letters;
         deckdata[i_deck].hangman[i_card].n_hangman               = n_hangman;
         deckdata[i_deck].hangman[i_card].n_hangman_correct       = 0;
      }
      deckdata[i_deck].hangman[i_card].hangman_answer[i_choice] = hangman_answer;
      if (set_qwizard_data_b) {
         qw.questions_cards[i_card].choices[i_choice] = hangman_answer;
      }
      deckdata[i_deck].hangman[i_card].hangman_n_hints[i_choice] = 0;
      var hangman_final_entry = qqc.create_hangman_entry (hangman_answer);
      deckdata[i_deck].hangman[i_card].hangman_final_entry[i_choice] = hangman_final_entry;
      var input_value = new Array (hangman_answer_length).join ('&ensp;');
      var input_focus = q.qwizard_b ? ' onfocus="qwizard.update_hangman_options_menu_choice (this, ' + i_choice + ')"' : '';
      var disabled        = '';
      var disabled_class  = '';
      /*
      if (q.qwizard_b && hangman_answer == 'placeholder') {
         disabled       = ' disabled';
         disabled_class = ' qwiz_button_disabled';
      }
      */
      var hangman_span =  '<span class="qdeck_hangman qdeck_hangman_c' + i_choice + '" onkeyup="' + qname + '.hangman_show (this, true)" onmouseenter="' + qname + '.hangman_show (this)" onmouseleave="' + qname + '.hangman_hide (this)">'
                        +    '<span class="hangman_current_entry hangman_entry">'
                        +    '</span>'
                        +    '<input type="text" oninput="' + qname + '.hangman_keyup (this, event,\' ' + input_value + '\', ' + i_deck + ', ' + i_card + ', ' + i_choice + ')" onblur="' + qname + '.hangman_hide (this.parentElement)"' + input_focus + disabled +' />';
      if (hangman_max_hints) {
         var title = '';
         if (hangman_max_hints < hangman_answer.replace (/[a-z0-9]/i, '').length) {
            title = ' title="' + T ('You can get') + ' ' + qqc.number_to_word (hangman_max_hints) + ' ' + T ('hint') + ' ' + plural (T ('letter'), T ('letters'), hangman_max_hints) + '"';
         }
         hangman_span  +=    '<button id="hangman_hint-qdeck' + i_deck + '" class="qwiz_button hangman_hint' + disabled_class + '" onmouseenter="' + qname + '.hangman_show (this.parentElement)" onclick="' + qname + '.hangman_hint (' + i_deck + ', ' + i_card + ', ' + i_choice + ')" title="' + T ('You can get two hint letters') + '">'
                        +        T ('Hint')
                        +    '</button>\n';
      }
      if (hangman_type_letters && ! q.qwizard_b
                       && (! hangman_labeled_diagram_f
                             || (hangman_labeled_diagram_f && i_choice == 0))) {
         hangman_span  +=    '<span class="hangman_type_letters">'
                        +    '</span>';
      }
      hangman_span     +=   '<span class="hangman_status">'
                        +    '</span>'
                        + '</span><!-- END -->';
      question_htm = question_htm.replace (/\[hangman[^\]]*\]/, hangman_span);
      i_choice++;
   }
   if (i_choice != n_hangman) {
      errmsgs.push ('Number of [hangman] shortcodes does not match number of hangman words [c].  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card));
   }
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].n_choices = i_choice;
   }
   card.card_front = question_htm;
   var i_pos = qqc.opening_tag_shortcode_pos ('[a]', card_html);
   var card_back_html = card_html.substr (i_pos);
   if (debug[0]) {
      console.log ('[process_hangman] card_back_html: ', card_back_html);
   }
   var a_opening_tags = '';
   if (! card_back_html) {
      errmsgs.push (T ('Did not find answer ("[a]") -- card back -- for') + ' qdeck ' + (i_deck + 1) + ', ' + T ('card') + ' ' + (i_card + 1) + '\n' + card_html);
      card_back_html = '';
   } else {
      var shortcode_pos = card_back_html.indexOf ('[a]');
      a_opening_tags = card_back_html.substr (0, shortcode_pos);
      card_back_html = card_back_html.substr (shortcode_pos + 3);
   }
   var card_back_items = card_back_html.split (/\[a\]/);
   if (card_back_items.length != 1) {
      errmsgs.push (T ('Got more than one answer ("[a]" -- card back)') + '.  qdeck: ' + (1 + i_deck) + ', ' + T ('card') + ' ' + (1 + i_card) + '\n' + card_html);
   }
   if (deckdata[i_deck].qrecord_id) {
      if (qqc.isInteger (deckdata[i_deck].dataset_id[i_card])) {
         var q_and_a_text = qqc.remove_tags_eols (card_back_items[0]);
         deckdata[i_deck].q_and_a_text[i_card] += '\n' + qqc.q_and_a_hash (q_and_a_text);
      }
   }
   card.card_back = create_card_back_html (i_deck, i_card, card_back_items[0],
                                           a_opening_tags, false);
   if (set_qwizard_data_b) {
      qw.questions_cards[i_card].answer_text = a_opening_tags + card_back_items[0];
   }
   return card;
}
this.hangman_show = function (qdeck_hangman_el, keyup_f) {
   if (suppress_hangman_hint_b) {
      suppress_hangman_hint_b = false;
      return false;
   }
   var $qdeck_hangman = $ (qdeck_hangman_el);
   $qdeck_hangman.find ('span.hangman_type_letters').hide ();
   clearTimeout (qdeck_hangman_el.i_hint_timeout);
   if (keyup_f) {
      var hide_hint_button = function () {
         $qdeck_hangman.find ('button.hangman_hint, span.hangman_status').fadeOut (1000);
      }
      qdeck_hangman_el.i_hint_timeout = setTimeout (hide_hint_button, 2000);
   }
   if (! qdeck_hangman_el.done_f) {
      $qdeck_hangman.find ('button.hangman_hint').show ();
      var $hangman_status =  $qdeck_hangman.find ('span.hangman_status')
      if ($hangman_status.html ()) {
         $hangman_status.show ();
      }
   }
}
this.hangman_hide = function (qdeck_hangman_el) {
   var $qdeck_hangman = $ (qdeck_hangman_el);
   var hide_hint_button = function () {
      $qdeck_hangman.find ('button.hangman_hint, span.hangman_status').fadeOut (500);
   }
   qdeck_hangman_el.i_hint_timeout = setTimeout (hide_hint_button, 500);
}
this.hangman_keyup = function (input_el, event, default_value, i_deck, i_card, i_choice) {
   var key = event.keyCode;
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
   var current_entry = deckdata[i_deck].hangman[i_card].hangman_current_entry[i_choice];
   var final_entry   = deckdata[i_deck].hangman[i_card].hangman_final_entry[i_choice];
   var done_f;
   var n_chars = keychars.length;
   for (var i=0; i<n_chars; i++) {
      var keychar = keychars[i];
      done_f = update_hangman_input (keychar, current_entry, final_entry,
                                     i_deck, i_card, i_choice, input_el);
      if (done_f) {
         break;
      }
   }
   if (! done_f) {
      if (deckdata[i_deck].hangman[i_card].hangman_incorrect_chars[i_choice]) {
         var hangman_incorrect_chars_display
            = qqc.create_hangman_incorrect_chars_display (deckdata[i_deck].hangman[i_card].hangman_incorrect_chars[i_choice], 3);
         $ (input_el).siblings ('span.hangman_status').html (hangman_incorrect_chars_display).show ();
      }
   }
   return true;
}
function update_hangman_input (keychar, current_entry, final_entry,
                               i_deck, i_card, i_choice, input_el, hint_f) {
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
   var hangman = deckdata[i_deck].hangman[i_card];
   var hangman_incorrect_chars = hangman.hangman_incorrect_chars[i_choice];
   var done_f     = false;;
   var all_done_f = false;;
   if (good_char_b) {
      hangman.hangman_current_entry[i_choice] = current_entry;
      var local_current_entry = current_entry.replace (/\t/g, '&ensp;');
      $ (input_el).siblings ('span.hangman_current_entry').html (local_current_entry);
      done_f = current_entry.indexOf ('<u>\t</u>') == -1;
      all_done_f;
      if (done_f) {
         var n_hangman = hangman.n_hangman;
         hangman.n_hangman_done++;
         all_done_f = hangman.n_hangman_done == n_hangman;
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
      if (hangman_incorrect_chars.length <= 6
                                    && hangman.hangman_n_hints[i_choice] == 0) {
         hangman.n_hangman_correct++;
      }
      if (all_done_f) {
         if (! q.qwizard_b) {
            deckdata[i_deck].answered_correctly[i_card] = n_hangman == hangman.n_hangman_correct;
         }
         $ (button_flip_selector (i_deck))
            .removeAttr ('disabled')
            .removeClass ('qwiz_button_disabled')
            .html (T ('Check answer'));
         deckdata[i_deck].check_answer_disabled_b = false;
         if (! hint_f) {
            if (hangman.n_hangman_correct < hangman.n_hangman) {
               deckdata[i_deck].hangman_incorrect_chars_f = true;
            }
            q.qdeck_flip (i_deck, undefined, undefined, true);
         }
      } else {
         var first_f = true;
         for (var i_choice=0; i_choice<n_hangman; i_choice++) {
            if (hangman.hangman_current_entry[i_choice]
                                     != hangman.hangman_final_entry[i_choice]
                     && hangman.hangman_incorrect_chars[i_choice].length <= 6) {
               var $qdeck_hangman = q.get_card_front (i_deck).find('span.qdeck_hangman.qdeck_hangman_c' + i_choice);
               if (first_f) {
                  $qdeck_hangman.find ('input').focus ();
                  first_f = false;
               } else {
                  $qdeck_hangman.find ('span.hangman_type_letters').show ();
               }
            }
         }
      }
      done_f = true;
   }
   return done_f;
}
this.hangman_hint = function (i_deck, i_card, i_choice) {
   deckdata[i_deck].hangman[i_card].hangman_n_hints[i_choice]++;
   if (deckdata[i_deck].hangman[i_card].hangman_n_hints[i_choice] > deckdata[i_deck].hangman[i_card].hangman_max_hints) {
      return false;
   } else if (deckdata[i_deck].hangman[i_card].hangman_n_hints[i_choice] == deckdata[i_deck].hangman[i_card].hangman_max_hints) {
      $ ('#hangman_hint-qdeck' + i_deck + '-c' + i_choice)
         .attr ('disabled', true)
         .addClass ('qwiz_button_disabled');
   }
   var hangman_answer = deckdata[i_deck].hangman[i_card].hangman_answer[i_choice];
   var current_entry = deckdata[i_deck].hangman[i_card].hangman_current_entry[i_choice];
   var matches = current_entry.match (/<u>.<\/u>/g);
   var i_pos = matches.indexOf ('<u>\t</u>');
   if (debug[9]) {
      console.log ('[hangman_hint] matches:', matches);
      console.log ('[hangman_hint] i_pos:', i_pos);
   }
   if (i_pos != -1) {
      var final_entry = deckdata[i_deck].hangman[i_card].hangman_final_entry[i_choice];
      matches = final_entry.match (/<u>.<\/u>/g);
      var hint_char = matches[i_pos][3];
      var $hangman_input = q.get_card_front (i_deck).find ('span.qdeck_hangman.qdeck_hangman_c' + i_choice + ' input');
      var input_el = $hangman_input[0];
      update_hangman_input (hint_char, current_entry, final_entry,
                            i_deck, i_card, i_choice, input_el, true);
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
   var classes = input_el.className;
   var i_deck = classes.match (/textentry-qdeck([0-9]+)/)[1];
   q.qdeck_flip (i_deck, undefined, undefined, true);
}
function process_feedback_item (choice_html) {
   var feedback_start_tags = ['[a]', '[f]'];
   var feedback_next_tags  = ['[a]', '[f]', '[x]'];
   var feedback_html = qqc.parse_html_block (choice_html, feedback_start_tags,
                                             feedback_next_tags);
   if (feedback_html != 'NA') {
      choice_html = choice_html.replace (feedback_html, '');
      feedback_html = feedback_html.replace (/\[[af]\]/, '');
      if (debug[2]) {
         console.log ('[process_feedback_item] feedback_html: ', feedback_html);
      }
   } else {
      feedback_html = '';
   }
   if (debug[2]) {
      console.log ('[process_feedback_item] feedback_html:', feedback_html);
      console.log ('[process_feedback_item] choice_html:', choice_html);
   }
   return {'feedback_html':   feedback_html,
           'choice_html':     choice_html};
}
this.textentry_hint = function (i_deck) {
   clearTimeout (show_hint_timeout[i_deck]);
   show_hint_timeout[i_deck] = 0;
   deckdata[i_deck].textentry_n_hints++;
   var i_card = deckdata[i_deck].i_card;
   var card = deckdata[i_deck].cards[i_card];
   var textentry_hint = card.all_choices[0].substr (0, deckdata[i_deck].textentry_n_hints);
   var $textentry = $ ('input.textentry-qdeck' + i_deck);
   $textentry.val (textentry_hint).focus ();
   $textentry.autocomplete ('search');
   $ ('#textentry_hint-qdeck' + i_deck)
      .attr ('disabled', true)
      .addClass ('qwiz_button_disabled')
      .html ('Another<br />hint');
   var show_hint_button = function () {
      $ ('#textentry_hint-qdeck' + i_deck)
         .removeAttr ('disabled')
         .removeClass ('qwiz_button_disabled');
   }
   if (hint_timeout_sec >= 0) {
      show_hint_timeout[i_deck] = setTimeout (show_hint_button, hint_timeout_sec*1000);
   }
}
this.set_textentry_i_deck = function (input_el) {
   var classes = input_el.className;
   textentry_i_deck = classes.match (/textentry-qdeck([0-9]+)/)[1];
   if (debug[6]) {
      console.log ('[set_textentry_i_deck] textentry_i_deck: ', textentry_i_deck);
   }
}
function create_card_back_html (i_deck, i_card, htm, opening_tags, front_textentry_b) {
   var new_html = opening_tags + htm;
   if (htm.search (/\[.*textentry.*/) != -1) {
      if (! front_textentry_b) {
         errmsgs.push (T ('[textentry] on back of card, but not on front') + '.  qdeck: ' + (i_deck+1) + ', ' + T ('card') + ' ' + (i_card+1));
      }
      new_html = card_back_textentry_html (new_html, i_deck);
   } else {
      if (front_textentry_b) {
         var preview_qcard = '';
         if (q.preview) {
            preview_qcard = ' preview-qcard' + deckdata[i_deck].i_card;
         }
         var prepend_html = '<p class="back_textentry_p-qdeck' + i_deck + ' back_textentry_p' + preview_qcard + '">' + T ('You wrote') + ' &ldquo;<span class="back_qcard_textentry back_textentry-qdeck' + i_deck + preview_qcard + '">&emsp;&emsp;&emsp;&emsp;&emsp;</span>&rdquo;</p>';
         new_html = prepend_html + new_html;
      }
   }
   if (debug[2]) {
      console.log ('[create_card_back_html] new_html:', new_html);
   }
   return new_html;
}
function process_header (htm, i_deck, intro_b) {
   var qtags = ['[h]'];
   var qnext_tags = ['[q]', '[q '];
   if (intro_b != undefined) {
      qnext_tags.push ('[i]');
   }
   var header_html = qqc.parse_html_block (htm.substr (0, 1000), qtags, qnext_tags, true);
   if (header_html == 'NA') {
      header_html = '';
   }
   if (header_html) {
      var htmx = htm.substr (0, 200);
      htmx = qqc.trim (htmx);
      var i_pos = qqc.opening_tag_shortcode_pos ('[h]', htmx);
      htmx = htmx.substr (i_pos, 5);
      var header_htmlx = header_html.replace (/<br[^>]*>/g, '');
      header_htmlx = qqc.trim (header_htmlx).substr (0, 5);
      if (htmx != header_htmlx) {
         errmsgs.push (T ('Text before header') + ' [h].  qdeck: ' + (i_deck + 1));
      }
      htm = htm.replace (header_html, '');
      header_html = header_html.replace (/\[h\]/ig, '');
      header_html = qqc.balance_closing_tag (header_html);
      header_html = header_html.replace (/<(p|h[1-6])[^>]*><\/(p|h[1-6])>/g, '');
      header_html = qqc.decode_image_tags (header_html);
   }
   deckdata[i_deck].header_html = header_html;
   return htm;
}
function create_qdeck_divs (i_deck, qdeck_tag) {
   if (debug[0]) {
      console.log ('[create_qdeck_divs] i_deck:', i_deck);
   }
   var m = qdeck_tag.match (/\[qdeck([^\]]*)\]/m);
   var attributes = m[1];
   if (! (deckdata[i_deck].scroll_b || document_qwiz_mobile)) {
      deckdata[i_deck].card_width_setting = '500px';
      deckdata[i_deck].card_height_setting = '300px';
   }
   if (attributes) {
      attributes = qqc.replace_smart_quotes (attributes);
      if (attributes.search (/style\s*?=/m) != -1) {
         var re;
         if (attributes.search (/["\s;]width/) != -1) {
            re = new RegExp ('width\\s*:\\s*([^;\\s"]*)[;\\s"]');
            m = attributes.match (re);
            if (m) {
               deckdata[i_deck].card_width_setting = m[1];
               attributes = attributes.replace (re, '');
               if (m[0].slice (-1) == '"') {
                  attributes += '"';
               }
            }
         }
         if (attributes.search ('height') != -1) {
            re = new RegExp ('(min-)*height\\s*:\\s*([^;\\s]*)[;\\s"]');
            m = attributes.match (re);
            if (m) {
               deckdata[i_deck].card_height_setting = m[2];
               attributes = attributes.replace (re, '');
               if (m[0].slice (-1) == '"') {
                  attributes += '"';
               }
            }
         }
      }
      deckdata[i_deck].random_b = get_attr (attributes, 'random') == 'true';
      if (debug[0]) {
         console.log ('[create_qdeck_divs] random_b:', deckdata[i_deck].random_b);
      }
   }
   attributes = attributes.replace (/align\s*=\s*"[^"]*"/, '');
   if (debug[0]) {
      console.log ('[create_qdeck_divs] attributes: ', attributes);
   }
   const plugin_url = qqc.get_qwiz_param ('url', './');
   var divs = [];
   var style = '';
   if (! document_qwiz_mobile) {
      style = 'width: ' + deckdata[i_deck].card_width_setting + '; height: ' + deckdata[i_deck].card_height_setting + '; ';
   }
   style += 'z-index: ' + Math.max (99 - i_deck, 1) + ';';
   var align = deckdata[i_deck].align;
   if (align == 'center') {
      style += ' margin: auto;';
   } else if (align == 'right') {
      style += ' margin-left: auto;';
   } else if (align == 'tiled') {
      style += ' float: left;';
   }
   if (deckdata[i_deck].spacing) {
      style += ' margin-right: ' + deckdata[i_deck].spacing + 'px !important; margin-top: 0 !important;';
   }
   divs.push ('<div id="qcard_window-qdeck' + i_deck + '" class="qcard_window visibilityhidden" style="' + style + '">');
   divs.push (   '<div id="overlay-exit-mobile-qdeck' + i_deck + '" class="overlay-exit-mobile-qwiz" onclick="' + qname + '.close_panel_exit_mobile(this)">');
   divs.push (      '<div id="panel-exit-mobile-qdeck' + i_deck + '" class="panel-exit-mobile-qwiz">');
   divs.push (         '<button onclick="' + qname + '.exit_mobile (' + i_deck + ')">');
   divs.push (            T ('Back to page view'));
   divs.push (         '</button>');
   divs.push (         '<br />');
   divs.push (         '<span>');
   divs.push (            '(');
   divs.push (            T ('To return to this full-screen view, tap'));
   divs.push (            '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAk0lEQVR4nI3QMQ6EIBAF0BG2YLiGtjRcgt7EcBfDhShtbLwBHIgCJrPFbrGJqPvrl/k/MzAzPOUFAMYYRCSiaZpijGckAAARSynM3BVf1FpTSkkpQwiXaBzHnLNzbtu2Lhr+GS4exSUyxqzrCgDLssDnBefM87zv+3EcRHS3yVpba0XElFK/znsvhNBal1LuLv3mDbu1OYLB67+mAAAAAElFTkSuQmCC" />');
   divs.push (            ')');
   divs.push (         '</span>');
   divs.push (         '<div class="panel-icon-exit-mobile-qwiz" style="margin-left: -5px;"></div>');
   divs.push (      '</div>');
   divs.push (   '</div>');
   divs.push (   '<div id="icon-exit-mobile-qdeck' + i_deck + '" class="icon-exit-mobile-qwiz" onclick="' + qname + '.open_panel_exit_mobile (' + i_deck + ')"></div>');
   divs.push ('   <div id="qcard_progress-qdeck' + i_deck + '" class="qcard_progress">');
   if (! q.qwizard_b) {
      const title = T ('Full-screen view');
      divs.push (   '<div class="go-mobile-qdeck go-mobile-qdeck' + i_deck + '" onclick="' + qname + '.go_mobile (' + i_deck + ')" title="' + title + '">');
      divs.push (   '</div>');
      divs.push (   '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAKwmlDQ1BJQ0MgUHJvZmlsZQAASImVlwdUU9kWhs+96Y2WEAEpofcuXUroAZReRSUkgYQSY0JQsSviCCqKiAiWoQxVwUEpMhbEgm1QbNgnyKCiPgcLNlTeBYYw89567633r3XW/e6+++y9z1nnrLUvABQ8WyTKgJUAyBRmiSMCvBlx8QkM3O8AAligChSAHpsjETHDwkIAounn3/XhDuKN6KblRKx///5fpczlSTgAQGEIJ3MlnEyEjyHjNUckzgIAVY3Y9ZdliSb4IsI0MVIgwg8nOHWKRyY4eZLR6EmfqAgfhNUAwJPZbHEqAGQDxM7I5qQicci+CNsIuQIhwsg78ODw2VyEkbzAIjNzyQTLEDZJ/kuc1L/FTJbHZLNT5Ty1lknhfQUSUQZ7xf+5Hf9bmRnS6RxGyCDzxYERyJOO7Nnd9CXBchYmzw+dZgF30n+S+dLA6GnmSHwSppnL9g2Wz82YHzLNKQJ/ljxOFitqmnkSv8hpFi+JkOdKEfswp5ktnskrTY+W2/k8ljx+Dj8qdpqzBTHzp1mSHhk84+Mjt4ulEfL6ecIA75m8/vK1Z0r+sl4BSz43ix8VKF87e6Z+npA5E1MSJ6+Ny/P1m/GJlvuLsrzluUQZYXJ/XkaA3C7JjpTPzUIO5MzcMPkeprGDwqYZhIAAwADRIANkATFgIxwIkJOaxVs+cUaBzxLRCrEglZ/FYCK3jMdgCTlWFgw7GzsbACbu7NSReHd38i5CdPyMTYJ4uG5DjKIZ20IaAMf4AChwZmxGRch1JAFwNoEjFWdP2SauE8AAIlAENKAOtIE+MAGWwA44AjfgBfxAEAgFUSAeLAIcwAeZSOXLwCqwHuSBArAD7AZl4CCoAnXgMGgB7eAEOAMugCvgOrgNHgAZGAIvwQj4AMYgCMJBFIgKqUM6kCFkDtlBzpAH5AeFQBFQPJQEpUJCSAqtgjZCBVARVAZVQPXQz9Bx6Ax0CeqD7kED0DD0FvoCo2AyTIO1YCPYGnaGmXAwHAUvhFPhpXAOnAtvh0vhSvgQ3Aafga/At2EZ/BIeRQEUCUVH6aIsUc4oH1QoKgGVghKj1qDyUSWoSlQTqhPVg7qJkqFeoT6jsWgqmoG2RLuhA9HRaA56KXoNeiu6DF2HbkOfQ99ED6BH0N8xFIwmxhzjimFh4jCpmGWYPEwJpgbTijmPuY0ZwnzAYrF0rDHWCRuIjcemYVdit2L3Y5uxXdg+7CB2FIfDqePMce64UBwbl4XLw+3FHcKdxt3ADeE+4Ul4Hbwd3h+fgBfiN+BL8A34U/gb+Gf4MYISwZDgSgglcAkrCIWEakIn4RphiDBGVCYaE92JUcQ04npiKbGJeJ74kPiORCLpkVxI4SQBaR2plHSEdJE0QPpMViGbkX3IiWQpeTu5ltxFvkd+R6FQjChelARKFmU7pZ5ylvKY8kmBqmClwFLgKqxVKFdoU7ih8FqRoGioyFRcpJijWKJ4VPGa4islgpKRko8SW2mNUrnScaV+pVFlqrKtcqhypvJW5QblS8rPVXAqRip+KlyVXJUqlbMqg1QUVZ/qQ+VQN1KrqeepQzQszZjGoqXRCmiHab20EVUV1TmqMarLVctVT6rK6Ci6EZ1Fz6AX0lvod+hfZmnNYs7izdoyq2nWjVkf1Wareanx1PLVmtVuq31RZ6j7qaer71RvV3+kgdYw0wjXWKZxQOO8xqvZtNluszmz82e3zL6vCWuaaUZortSs0ryqOaqlrRWgJdLaq3VW65U2XdtLO027WPuU9rAOVcdDR6BTrHNa5wVDlcFkZDBKGecYI7qauoG6Ut0K3V7dMT1jvWi9DXrNeo/0ifrO+in6xfrd+iMGOgbzDFYZNBrcNyQYOhvyDfcY9hh+NDI2ijXabNRu9NxYzZhlnGPcaPzQhGLiabLUpNLklinW1Nk03XS/6XUz2MzBjG9WbnbNHDZ3NBeY7zfvs8BYuFgILSot+i3JlkzLbMtGywErulWI1QardqvX1gbWCdY7rXusv9s42GTYVNs8sFWxDbLdYNtp+9bOzI5jV253y55i72+/1r7D/s0c8zm8OQfm3HWgOsxz2OzQ7fDN0clR7NjkOOxk4JTktM+p35nmHOa81fmiC8bF22WtywmXz66OrlmuLa5/uFm6pbs1uD2fazyXN7d67qC7njvbvcJd5sHwSPL40UPmqevJ9qz0fOKl78X1qvF6xjRlpjEPMV9723iLvVu9P/q4+qz26fJF+Qb45vv2+qn4RfuV+T321/NP9W/0HwlwCFgZ0BWICQwO3BnYz9JicVj1rJEgp6DVQeeCycGRwWXBT0LMQsQhnfPgeUHzds17ON9wvnB+eygIZYXuCn0UZhy2NOyXcGx4WHh5+NMI24hVET2R1MjFkQ2RH6K8owqjHkSbREuju2MUYxJj6mM+xvrGFsXK4qzjVsddideIF8R3JOASYhJqEkYX+C3YvWAo0SExL/HOQuOFyxdeWqSxKGPRycWKi9mLjyZhkmKTGpK+skPZlezRZFbyvuQRjg9nD+cl14tbzB3mufOKeM9S3FOKUp6nuqfuSh3me/JL+K8EPoIywZu0wLSDaR/TQ9Nr08czYjOaM/GZSZnHhSrCdOG5JdpLli/pE5mL8kSypa5Ldy8dEQeLaySQZKGkI4uGNEdXpSbSTdKBbI/s8uxPy2KWHV2uvFy4/OoKsxVbVjzL8c/5aSV6JWdl9yrdVetXDaxmrq5YA61JXtO9Vn9t7tqhdQHr6tYT16ev/3WDzYaiDe83xm7szNXKXZc7uClgU2OeQp44r3+z2+aDP6B/EPzQu8V+y94t3/O5+ZcLbApKCr5u5Wy9vM12W+m28e0p23sLHQsP7MDuEO64s9NzZ12RclFO0eCuebvaihnF+cXvdy/efalkTsnBPcQ90j2y0pDSjr0Ge3fs/VrGL7td7l3evE9z35Z9H/dz99844HWg6aDWwYKDX34U/Hi3IqCirdKosqQKW5Vd9bQ6prrnJ+ef6ms0agpqvtUKa2V1EXXn6p3q6xs0Gwob4UZp4/ChxEPXD/se7miybKpopjcXHAFHpEde/Jz0852W4Jbuo85Hm44ZHtvXSm3Nb4PaVrSNtPPbZR3xHX3Hg453d7p1tv5i9UvtCd0T5SdVTxaeIp7KPTV+Ouf0aJeo69WZ1DOD3Yu7H5yNO3vrXPi53vPB5y9e8L9wtofZc/qi+8UTl1wvHb/sfLn9iuOVtqsOV1t/dfi1tdext+2a07WO6y7XO/vm9p264XnjzE3fmxdusW5duT3/dt+d6Dt3+xP7ZXe5d5/fy7j35n72/bEH6x5iHuY/UnpU8ljzceVvpr81yxxlJwd8B64+iXzyYJAz+PJ3ye9fh3KfUp6WPNN5Vv/c7vmJYf/h6y8WvBh6KXo59irvH8r/2Pfa5PWxP7z+uDoSNzL0Rvxm/O3Wd+rvat/Ped89Gjb6+EPmh7GP+Z/UP9V9dv7c8yX2y7OxZV9xX0u/mX7r/B78/eF45vi4iC1mT7YCKGTAKSkAvK0FgBIPAPU6AMQFUz31pKCp/4BJAv+Jp/ruSTkCgIQC0V0ATLRoVX+2tIrIe5gXAFFeALa3l48/JUmxt5uKRWpHWpOS8fF3SP+IMwXgW//4+Fj7+Pi3GqTY+wB0fZjq5SekjfxXLMADqHzTrZYB8K/6J1bAD27htQDfAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDY4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjQ2NjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrdRrnkAAADWklEQVRIDZ1VW08TQRT+uvRqCBoI5ckCD3JRjEALCfFNMJHfIH9B0V+BkIj6omgiEilPBiFyT+TRAAX1wQj0JpBIFYQaa6Db7WWcc8rWBKl2nWR2Z3bOfOf2nbMmfzAk1tfWYLfbkclkABN4KIqCpJZEs7sZ5eVOpFIpmExHh1mRwp53+/uFlMw7P3xcFRkhxGEiIVQtaXiaHQ4HW+LxtCAS2UZxcTHS6TS2IxG8np/HhfP1SEhPFJNSmMXHpJRMhowHYrEfUkEEaiKBcDgMr3cEl9vaEFcTx64Y2yp6zK1WG5wVFUglk4wwNPQMgVAYp+y2bG6M4eakFY6+3MbVOHZ3dqCqKmpqazE5MQGPTHAw/ImVUNj+ZyhWq5XvlZWVoae3F9FoFAG/Hw0NF/EzFkODzIHuicy1cR29fX3MIN/yirwvxIvRUd47nRVCesJrm80mAqGQSMvzQ9UYm/D23Xux6FtmcKIhUXJ0bIyBJf/FpcZGXkvTxe7evkhLgYO4WjBdQVYRaDyh5awjbS/Hxhn4rMvF74ePBvg8kUyxbKE1gd/AGltFIaBvNMZfTTD4wOMnIiWt0FLpHDjJHar/9sRElhzPHLWMoqIiULsIh0JwVVbCYrEgKSlM36ltyLzI4oOsG43ljmPo+xMV0KF0gGXsVgtkWHhPCgncIWvj294+Dg8OUFXpoijkVZK3/qmx0ZShYHBaUy1Q4UWj39F98waqqyqxHgjCYbPyWbalZY2jKLCRhSaLYk55iHzdEde7ujg35CjN1XU/pYzZRXKESSMpKYdCFRA1aSwsLjHouZoa0djUlFOkKyEiEOb07Kz4HPlSuAK6ROwiWk9OzzBwSUmJqD0qRt0TovzTwUE+f7OwaFyB7v7k1DSDyPYu6urreX2lvV303OnlNSn0rawYU6B7odfJ1JEnBFZXV5cDdrvdvF5c8om8LJKXThzEJhkFyh06O69hZm6O5YLBIFwuF6qqq+W/JZa9K+vEsAK6SfVANKR/VUfHVXTfus001TQNmxsboLeuwXy0MvQiD8xmM4N6h5/jwf17aGltRTwex+kzZ1BaWoqtra0sJsXV6KQcEFuGvSO5uEu0P9bEoryt4m8ukQfUkwKBALY2N7kv8R9Pxlwf0gK4PR78Ak4cQYObEn/YAAAAAElFTkSuQmCC" class="go-mobile-qdeck go-mobile-qdeck' + i_deck + '" />');
   }
   var title = T ('Exit full-screen view');
   divs.push (   '<div class="exit-mobile-qdeck exit-mobile-qdeck' + i_deck + '" onclick="' + qname + '.exit_mobile (' + i_deck + ')" title="' + title + '">');
   divs.push (   '</div>');
   divs.push (   '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAoVJREFUSA2lVj2PEkEY3plZV5I9Q3KBqzFHQkFJaCx0sTCxo6EnsfMPWPjBctqoueqMNf/CwtODxo7ySCxMaAjhgiRGiXjsh8+zzl5WKoZ7k+GdnZ33ed6PeWdRtVrtxnQ6jWxbvrUs8SCO449cq1Qqst1uWxBVr9fFaDSKW62WouaikTiO0xVCxBy2bXdpXC6Xb5ZKpZzv+xKkIp/PH3JuBMzN9FyD/4Fea5IjvmMk1FLKExAfc24sMH6tCQgeYgSa5BXB4MAz/ewbg6cG8M4niAZPotDPZ1ozdZ10v5GuVqsODTIkJGIkkQZn6q5qYwSOzbJYLEYsaBAEvlLqpQYQWq+h07leMlPS87wI4IIFhX4B8zMNGkAnRTaD/H+37Pf7PO+Xw+FwzYLidQPjUm9jBCSiRP+U4S+bJ44twaOoc570w+YcNUIjmkuSXzbRcrl8DPOfGOzUbEPR8z0QfFitVp8xNxNGsG2Hpo1nxmC4e1sSOo0DZO90BHO53H2cuIfw7RfGZjqJeWt/331/cfHjG+bmwoJvHoLss1LyHS9Ipl+ZwyeX3x0AeLD9re15EEIM9KrqhGH4BIQSV7vMhqf3bqVSOxu702bkldNH6o5Yp16v57CJd42ggQjuAZCec5CIchvpsyeTyWmhUFCLxcK6LgHTklyW0OwfAeK74JDz+fzUdd2UGK8MBACdTFGvrnSs8apPvyddQl4nAg8FfR5F0SOmhZ4DL4kCOsRzA9fPHkmMBXjHOIonNEwbD2tdHRWjSL4hIHhjDM4OPTjIH8JDwTn/GPB7QiCQpF9GfqB8ru2SInV+/vX7YDCwx+OxaDabAU8LCzqbzT7BaxcRfEEvPGV0fwEIA/zW345reQAAAABJRU5ErkJggg==" class="exit-mobile-qdeck exit-mobile-qdeck' + i_deck + '" />');
   var style = '';
   if ((   deckdata[i_deck].n_cards > 1
        || deckdata[i_deck].use_dataset
        || deckdata[i_deck].use_dataset_card_html) && ! q.preview) {
      if (deckdata[i_deck].hide_forward_back_b) {
         style = ' style="visibility: hidden;"';
      }
      if (deckdata[i_deck].use_dataset && deckdata[i_deck].dataset_intro_f) {
         title = T ('Go to &ldquo;Choose cards&rdquo;');
      } else {
         title = T ('Go to first card');
      }
      divs.push ('<span class="bbfe bbfe-qdeck' + i_deck + ' bck-card-qdeck' + i_deck + '"' + style + ' onclick="' + qname + '.bck_card (' + i_deck + ', true )" title="' + title + '">');
      divs.push (   '<img class="icon-beg-end-qwiz" src="' + plugin_url + '/images/icon_beg.svg">');
      divs.push ('</span>');
      divs.push ('<span class="bbfe bbfe-qdeck' + i_deck + ' bck-card-qdeck' + i_deck + '"' + style + ' onclick="' + qname + '.bck_card (' + i_deck + ', false)" title="' + T ('Go to previous card') + '">');
      divs.push (   '<img class="icon-bck-fwd-qwiz" src="' + plugin_url + '/images/icon_bck.svg">');
      divs.push ('</span>');
      divs.push ('<span class="card-number-qdeck card-number-qdeck' + i_deck + '"' + style + '>');
      divs.push ('</span>');
      divs.push ('<span class="bbfe bbfe-qdeck' + i_deck + ' fwd-card-qdeck' + i_deck + '"' + style + ' onclick="' + qname + '.fwd_card (' + i_deck + ', false)" title="' + T ('Go to next card') + '">');
      divs.push (   '<img class="icon-bck-fwd-qwiz" src="' + plugin_url + '/images/icon_fwd.svg">');
      divs.push ('</span>');
      divs.push ('<span class="bbfe bbfe-qdeck' + i_deck + ' fwd-card-qdeck' + i_deck + '"' + style + ' onclick="' + qname + '.fwd_card (' + i_deck + ', true )" title="' + T ('Go to most-recent card') + '">');
      divs.push (   '<img class="icon-beg-end-qwiz" src="' + plugin_url + '/images/icon_end.svg">');
      divs.push ('</span>');
   }
   var mmss = '';
   if (deckdata[i_deck].deck_timer && ! q.preview) {
      mmss = '0:00';
   }
   divs.push ('<span id="qdeck' + i_deck+ '-deck_timer" class="deck-timer">' + mmss + '</span>');
   if (deckdata[i_deck].qrecord_id) {
      divs.push ('&nbsp;');
      divs.push ('<span class="response_recorded_wrapper response_recorded_wrapper-qdeck' + i_deck + '">');
      divs.push (   '<span class="response_recorded response_recorded-qdeck' + i_deck + '">');
      divs.push (      `<img src="${plugin_url}/images/recording.svg" class="response_recording" >`);
      divs.push (   '</span>');
      divs.push ('</span>');
      divs.push ('<div class="qwiz_icon_and_menu_container lock_unlock qdeck' + i_deck + '">');
      divs.push (   '<div id="locked-deck' + i_deck + '" class="qwiz-locked qwiz_menu_icon">');
      divs.push (      `<img src="${plugin_url}/images/icon_locked.png" />`);
      divs.push (   '</div>');
      divs.push (   '<div id="unlocked-deck' + i_deck + '" class="qwiz-unlocked qwiz_menu_icon">');
      divs.push (      `<img src="${plugin_url}/images/icon_unlocked.png" />`);
      divs.push (   '</div>');
      divs.push (   '<div class="qwiz_icon_trigger_and_menu qwiz-hover">');
      divs.push (      '<div class="qwiz_icon_trigger">');
      divs.push (      '</div>');
      divs.push (      '<div id="pay_unlock_menu-qdeck' + i_deck + '" class="qdeck-pay_unlock_menu qwiz_menu">');
      divs.push (      '</div>');
      divs.push (   '</div>');
      divs.push ('</div>');
      var addclass = '';
      if (q.no_intro_b[i_deck] || deckdata[i_deck].n_cards == 1) {
         addclass = ' qwiz-usermenu_icon_no_intro';
      }
      divs.push ('<div class="qwiz_icon_and_menu_container qdeck' + i_deck + '">');
      divs.push (   '<div class="qwiz-usermenu_icon qwiz_menu_icon' + addclass + '">');
      divs.push (      '&#x25bc;');
      divs.push (   '</div>');
      divs.push (   '<div class="qwiz_icon_trigger_and_menu qwiz-hover">');
      divs.push (      '<div class="qwiz_icon_trigger" style="left: -12px; top: -4px;">');
      divs.push (      '</div>');
      divs.push (      '<div id="usermenu-qdeck' + i_deck + '" class="qdeck-usermenu qwiz_menu">');
      divs.push (      '</div>');
      divs.push (   '</div>');
      divs.push ('</div>');
   }
   style = '';
   if (deckdata[i_deck].hide_progress_b) {
      style = ' style="display: none;"';
   }
   divs.push (      '<span class="progress_text"' + style + '>');
   divs.push (      '</span>');
   divs.push (   '</div>');
   divs.push (   '<div id="qcard_header-qdeck' + i_deck + '" class="qcard_header qcard_editable">');
   divs.push (   '</div>');
   if (q.preview) {
      if (! q.no_intro_b[i_deck]) {
         divs = divs.concat (card_container_divs (i_deck, attributes, -1));
      }
      if (deckdata[i_deck].use_dataset) {
         divs.push ('<div class="preview-dataset-placeholder qwiz_display_none"></div>');
         deckdata[i_deck].attributes = attributes;
      } else {
         var n_cards = deckdata[i_deck].n_cards;
         for (var i_card=0; i_card<n_cards; i_card++) {
            divs = divs.concat (card_container_divs (i_deck, attributes, i_card));
         }
      }
      if (n_cards > 1) {
         divs = divs.concat (card_container_divs (i_deck, attributes, n_cards));
      }
   } else {
      divs = divs.concat (card_container_divs (i_deck, attributes));
   }
   if (! q.preview) {
      divs.push (   '<div id="qcard_next_buttons-qdeck' + i_deck + '" class="qcard_next_buttons">');
      divs.push (   '</div>');
   }
   divs.push ('   <div class="qdeck-focusable">');
   divs.push ('      <input type="text" />');
   divs.push ('   </div>');
   divs.push ('</div>');
   return divs.join ('\n');
}
function card_container_divs (i_deck, attributes, i_card) {
   if (debug[0]) {
      console.log ('[card_container_divs] i_card:', i_card);
   }
   var divs = [];
   var card_class = '';
   var onclick_i_card = '';
   if (typeof (i_card) != 'undefined') {
      card_class = ' preview-qdeck' + i_deck + ' preview-qcard' + i_card;
      onclick_i_card = ', ' + i_card;
   }
   var border_class;
   if (attributes.indexOf ('border') == -1) {
      border_class = " qcard-border-important";
   } else {
      border_class = " qcard-border";
   }
   var onclick = '';
   if (! q.qwizard_b && deckdata[i_deck].click_flip_b) {
      onclick = ' onclick="' + qname + '.qdeck_flip (' + i_deck + onclick_i_card + ')"';
   }
   var backface_visibility = '';
   if (chromebook_b) {
      backface_visibility = ' style="backface-visibility: visible;"';
   }
   const qwizard_line_height = q.qwizard_b ? ' qwizard_line_height' : '';
   const qcard_content_normal = deckdata[i_deck].font_weight_normal ? ' qcard_content-normal' : '';
   divs.push ('<div class="card-container' + card_class + '"> ');
   divs.push (   '<div class="qcard_card-qdeck' + i_deck + ' qcard_card"' + backface_visibility + '>');
   divs.push (      '<div class="qcard-front qcard-front-back' + border_class + '" ' + attributes + onclick + '>');
   divs.push (         '<div class="qcard_content' + qcard_content_normal + qwizard_line_height + '">');
   divs.push (            '<div class="qcard_content_size">');
   if (q.qwizard_b) {
      divs.push (            '<div id="qcard_front-part0-qdeck' + i_deck + '" class="qcard-part0" style="display: none;">');
      divs.push (            '</div>');
      divs.push (            '<div id="qcard_front-part1-qdeck' + i_deck + '" class="qcard_front-parts qcard-part1 qcard-inline qcard_editable" data-i_part="1">');
      divs.push (            '</div>');
      divs.push (            '<div id="qcard_front-input1-qdeck' + i_deck + '" class="qcard_front-inputs qcard-inline">');
      divs.push (            '</div>');
      divs.push (            '<div id="qcard_front-part2-qdeck' + i_deck + '" class="qcard_front-parts qcard-part2 qcard-inline qcard_editable" data-i_part="2">');
      divs.push (            '</div>');
      divs.push (         '</div>');
      divs.push (         '<div class="qcard_content_size_alt">');
   }
   divs.push (            '</div>');
   divs.push (         '</div>');
   divs.push (      '</div>');
   divs.push (      '<div class="qcard-back qcard-front-back' + border_class + '" ' + attributes + onclick + '>');
   divs.push (         '<div class="qcard_content' + qcard_content_normal + qwizard_line_height + '">');
   divs.push (            '<div class="qcard_content_size">');
   if (q.qwizard_b) {
      divs.push (            '<div id="qcard_back-echo-qdeck' + i_deck + '" class="qcard-inline">');
      divs.push (            '</div>');
      divs.push (            '<div id="qcard_back-part1-qdeck' + i_deck + '" class="qcard-part1 qcard-inline qcard_editable">');
      divs.push (            '</div>');
      divs.push (         '</div>');
      divs.push (         '<div class="qcard_content_size_alt">');
   }
   divs.push (            '</div>');
   divs.push (         '</div>');
   divs.push (      '</div>');
   divs.push (   '</div>');
   var mmss = '';
   if (deckdata[i_deck].card_time_limit && ! q.preview) {
      mmss = qqc.hhmmss_from_sec (deckdata[i_deck].card_time_limit);
   }
   divs.push ('<div id="qdeck' + i_deck+ '-card_timer" class="card-timer">' + mmss + '</div>');
   divs.push ('</div>');
   if (q.preview) {
      if (i_card >= 0 && i_card < deckdata[i_deck].n_cards) {
         divs.push ('<button class="qwiz_button qcard_flip flip-qdeck' + i_deck + '-qcard' + i_card + '" onclick="' + qname + '.qdeck_flip (' + i_deck + ', ' + i_card + ')" title="' + T ('Show the other side') + '">' + T ('Check answer') + '</button>');
      }
   }
   if (debug[0]) {
      console.log ('[card_container_divs] divs:', divs);
   }
   return divs;
}
this.flip_if_back = function (i_deck) {
   $ ('div.card-container').click (function (event) {
      event.preventDefault ();
      console.log ('[flip_if_back] > preventDefault');
   });
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck);
   }
   return false;
}
this.process_card_attributes = function (i_deck, card_tags, number_first_card) {
   var n_cards = card_tags.length;
   if (! deckdata[i_deck].card_topics) {
      deckdata[i_deck].card_topics = new Array (n_cards);
   }
   if (! deckdata[i_deck].units) {
      deckdata[i_deck].units = [];
   }
   if (! deckdata[i_deck].topics) {
      deckdata[i_deck].topics = [];
   }
   var add_other_b = false;
   for (var ii=0; ii<n_cards; ii++) {
      var i_card = ii + number_first_card;
      if (set_qwizard_data_b) {
         qw.questions_cards[i_card] = {};
      }
      var card_tag = card_tags[ii];
      deckdata[i_deck].dataset_id[i_card] = i_card;
      deckdata[i_deck].unit[i_card] = deckdata[i_deck].default_unit;
      var matches = card_tag.match (/\[q +([^\]]*)\]/);
      if (matches) {
         var attributes = matches[1];
         attributes = qqc.replace_smart_quotes (attributes);
         if (set_qwizard_data_b) {
            qw.questions_cards[i_card].question_attributes = attributes;
         }
         var card_topics = get_attr (attributes, 'topic', true);
         if (card_topics) {
            if (debug[4]) {
               console.log ('[process_card_attributes] card_topics: ', card_topics);
            }
            if (set_qwizard_data_b) {
               qw.questions_cards[i_card].topic = card_topics;
            }
            card_topics = card_topics.split (/; */);
            deckdata[i_deck].card_topics[i_card] = card_topics;
            for (var i=0; i<card_topics.length; i++) {
               var topic = card_topics[i];
               if (deckdata[i_deck].topics.indexOf (topic) == -1) {
                  deckdata[i_deck].topics.push (topic);
               }
            }
         } else {
            deckdata[i_deck].card_topics[i_card] = ['Other'];
            add_other_b = true;
         }
         if (deckdata[i_deck].use_dataset || deckdata[i_deck].dataset
                                  || deckdata[i_deck].use_dataset_card_ids[i_card]) {
            const dataset_id = get_attr (attributes, 'dataset_id');
            if (dataset_id) {
               deckdata[i_deck].dataset_id[i_card] = dataset_id;
            }
         }
         var unit = get_attr (attributes, 'unit');
         if (unit) {
            deckdata[i_deck].unit[i_card] = unit;
            if (set_qwizard_data_b) {
               qw.questions_cards[i_card].unit = unit;
               if (deckdata[i_deck].units.indexOf (unit) == -1) {
                  deckdata[i_deck].units.push (unit);
               }
            }
         }
         var card_back_background = get_attr (attributes, 'card_back');
         if (card_back_background) {
            deckdata[i_deck].card_back_background[i_card] = card_back_background;
         } else {
            card_back_background = get_attr (attributes, 'card_back_image');
            if (card_back_background) {
               deckdata[i_deck].card_back_background[i_card] = 'img:' + card_back_background;
            }
         }
         if (card_back_background) {
            if (! deckdata[i_deck].default_card_back_background) {
               deckdata[i_deck].default_card_back_background = q.ruled_lines;
            }
         }
         var use_dataset_card_id = get_attr (attributes, 'use_dataset_card');
         if (use_dataset_card_id) {
            deckdata[i_deck].use_dataset_card_ids[i_card] = use_dataset_card_id;
            deckdata[i_deck].dataset_id[i_card]           = use_dataset_card_id;
            if (set_qwizard_data_b) {
               qw.questions_cards[i_card].from_dataset_b = true;
            }
         }
      }
   }
   if (add_other_b) {
      if (deckdata[i_deck].topics.indexOf ('Other') == -1) {
         deckdata[i_deck].topics.push ('Other');
      }
   }
   if (debug[4]) {
      console.log ('[process_card_attributes] deckdata[i_deck].card_topics:', deckdata[i_deck].card_topics);
   }
   if (set_qwizard_data_b) {
      qw.unit_names  = deckdata[i_deck].units;
      qw.topic_names = deckdata[i_deck].topics;
   }
   deckdata[i_deck].topic_statistics = {};
   var n_topics = deckdata[i_deck].topics.length;
   for (var i_topic=0; i_topic<n_topics; i_topic++) {
      var topic = deckdata[i_deck].topics[i_topic];
      deckdata[i_deck].topic_statistics[topic] = {};
      deckdata[i_deck].topic_statistics[topic].n_cards = 0;
      deckdata[i_deck].topic_statistics[topic].n_reviewed = 0;
   }
   for (var i_card=0; i_card<n_cards; i_card++) {
      var card_topics = deckdata[i_deck].card_topics[i_card];
      if (card_topics) {
         if (debug[4]) {
            console.log ('[process_card_attributes] i_card:', i_card, ', card_topics: ' + card_topics);
         }
         var n_topics = card_topics.length;
         for (var i_topic=0; i_topic<n_topics; i_topic++) {
            var topic = card_topics[i_topic];
            deckdata[i_deck].topic_statistics[topic].n_cards++;
         }
      }
   }
}
this.start_deck = function (i_deck, no_login_b) {
   if (debug[0]) {
      console.log ('[start_deck] deckdata[i_deck].i_card:', deckdata[i_deck].i_card);
   }
   if (deckdata[i_deck].n_cards == 0) {
      return;
   }
   if (qqc.is_mobile (deckdata[i_deck].mobile_enabled)) {
      q.go_mobile (i_deck);
   }
   if (no_login_b) {
      deckdata[i_deck].deck_started_b = true;
   }
   if (! no_login_b && ! q.qwizard_b) {
      if (deckdata[i_deck].qrecord_id) {
         var user_logged_in_b
            =    typeof (document_qwiz_user_logged_in_b) != 'undefined'
                                                && document_qwiz_user_logged_in_b
              && typeof (document_qwiz_username) != 'undefined';
         if (   user_logged_in_b
             || (   typeof (document_qwiz_declined_login_b) != 'undefined'
                 && document_qwiz_declined_login_b)) {
            if (user_logged_in_b && ! document_qwiz_wp_user_session_id) {
               if (! $.cookie ('qwiz_current_login_lt_nmin_ago')) {
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
                     deckdata[i_deck].deck_started_b = true;
                     q.process_card (i_deck);
                     return false;
                  }
               } else {
                  if (document_qwiz_team_b) {
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
               }
               if (deckdata[i_deck].qrecord_id && document_qwiz_user_logged_in_b) {
                  deckdata[i_deck].record_start_b = false;
                  var now_sec = new Date ().getTime ()/1000.0;
                  var data = {qrecord_id_ok: deckdata[i_deck].qrecord_id_ok, type: 'start', now_sec: now_sec, confirm: 'js'};
                  record_qcard (i_deck, deckdata[i_deck].qrecord_id, data, true);
               }
            }
         } else {
            q.display_login (i_deck);
            return false;
         }
      }
   }
   if (deckdata[i_deck].use_dataset) {
      if (deckdata[i_deck].dataset_intro_f) {
         deckdata[i_deck].i_card = -1;
         q.display_login (i_deck, false, 'use_dataset_options');
      } else {
         deckdata[i_deck].i_card = 0;
         qqc.get_dataset_questions (deckdata[i_deck].use_dataset, qname,
                                    i_deck, deckdata[i_deck].qrecord_id,
                                    [], [], 10000,
                                    deckdata[i_deck].dataset_questions_to_do,
                                    false, // deckdata[i_deck].random_b,
                                    deckdata[i_deck].use_dataset_card_html);
      }
   } else {
      q.start_deck2 (i_deck);
   }
}
this.start_deck2 = function (i_deck, i_qwizard_card) {
   if (typeof (i_qwizard_card) != 'undefined') {
      deckdata[i_deck].i_card = i_qwizard_card;
   } else {
      deckdata[i_deck].i_card = 0;
   }
   deckdata[i_deck].n_got_it = 0;
   deckdata[i_deck].n_reviewed = 0;
   var n_cards = deckdata[i_deck].n_cards;
   const cards_to_show = deckdata[i_deck].cards_to_show;
   if (cards_to_show && cards_to_show < n_cards) {
      deckdata[i_deck].n_to_go          = cards_to_show;
      deckdata[i_deck].n_cards_for_done = cards_to_show;
      deckdata[i_deck].random_b         = true;
   } else {
      deckdata[i_deck].n_to_go          = n_cards;
      deckdata[i_deck].n_cards_for_done = n_cards;
   }
   if (q.preview && deckdata[i_deck].use_dataset) {
      const attributes = deckdata[i_deck].attributes;
      var divs = [];
      for (var i_card=0; i_card<n_cards; i_card++) {
         divs = divs.concat (card_container_divs (i_deck, attributes, i_card));
      }
      $ ('div.preview-dataset-placeholder').replaceWith (divs.join ('\n'));
      init_preview (i_deck);
      set_flip ();
      return;
   }
   var qcard_window_margin = 0;
   if (   n_cards > 1
       || ! deckdata[i_deck].click_flip_b
       || deckdata[i_deck].cards[0].textentry_required_b) {
      q.set_next_buttons (i_deck);
   } else {
      qcard_window_margin = deckdata[i_deck].header_height + 20;
   }
   if (qcard_window_margin || deckdata[i_deck].spacing) {
      if (qcard_window_margin) {
         if (deckdata[i_deck].spacing) {
            qcard_window_margin += deckdata[i_deck].spacing - 20;
         }
      } else {
         qcard_window_margin = qcard_window_margin + deckdata[i_deck].spacing;
      }
      deckdata[i_deck].$qcard_window.css ({'margin-bottom': qcard_window_margin + 'px'});
   }
   for (var ii_card=0; ii_card<n_cards; ii_card++) {
      deckdata[i_deck].cards[ii_card].got_it = false;
   }
   deckdata[i_deck].bck_f = false;
   deckdata[i_deck].user_card_number = 0;
   for (var ii_card=0; ii_card<n_cards; ii_card++) {
      var card = deckdata[i_deck].cards[ii_card];
      card.user_card_number   = undefined;
      card.i_user_next_card   = undefined;
      card.i_user_prev_card   = undefined;
      card.saved_textentry    = '';
      card.saved_textentry_ok = false;
   }
   if (deckdata[i_deck].reshow_after) {
      deckdata[i_deck].i_cards_done = [];
   }
   if (! deckdata[i_deck].hide_forward_back_b) {
      $ ('.bbfe-qdeck' + i_deck).css ({visibility: 'visible', opacity: 0.2}).removeClass ('hover');
      $ ('span.card-number-qdeck' + i_deck).css ({visibility: 'visible'}).html (1);
   }
   if (deckdata[i_deck].use_dataset && deckdata[i_deck].dataset_intro_f) {
      $ ('.bck-card-qdeck' + i_deck).first ().css ({opacity: 0.5}).addClass ('hover');
   }
   if (deckdata[i_deck].deck_timer) {
      if (! q.no_intro_b[i_deck]) {
         start_timers (i_deck);
      }
      if (deckdata[i_deck].$deck_timer) {
         deckdata[i_deck].$deck_timer.html ('0:00');
      }
   }
   var n_topics = deckdata[i_deck].topics.length;
   for (var i_topic=0; i_topic<n_topics; i_topic++) {
      var topic = deckdata[i_deck].topics[i_topic];
      deckdata[i_deck].topic_statistics[topic].n_reviewed = 0;
   }
   q.init_card_order (i_deck);
   deckdata[i_deck].deck_started_b = true;
   if (typeof (i_qwizard_card) != 'undefined') {
      if (deckdata[i_deck].i_card >=0 && deckdata[i_deck].i_card < n_cards) {
         deckdata[i_deck].no_flip_b = false;
      }
   }
   deckdata[i_deck].$qcard_card_back.css ({display: ''});
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck);
   }
   q.process_card (i_deck, false, true);
};
function record_qcard (i_deck, qrecord_id, data, no_spin_f) {
   if (! q.preview && ! q.qwizard_b && ! no_spin_f) {
      const hhmmss = DateFormat.format.date (new Date ().getTime (), 'h:mm:ss');
      $ ('span.response_recorded_wrapper-qdeck' + i_deck)
         .css ({display: 'inline-block'})
         .attr ('title', T ('Recording your response at') + ' ' + hhmmss + ' - ' + T ('not complete'));
      const $response_recording = $ (`span.response_recorded-qdeck${i_deck} img.response_recording`);
      $response_recording.addClass ('response_recording_spin').removeAttr ('title');
   }
   qqc.qjax (qname, i_deck, qrecord_id, 'record_qcard_v2', data);
}
this.show_response_recorded = function (i_deck) {
   if (! q.preview) {
      var i_card = deckdata[i_deck].i_card;
      var cards  = deckdata[i_deck].cards;
      var card   = cards[i_card];
      var hhmmss = DateFormat.format.date (new Date ().getTime (), 'h:mm:ss');
      const $response_recording = $ (`span.response_recorded-qdeck${i_deck} img.response_recording`);
      var i_prev_card = card.i_user_prev_card;
      var prev_user_card_number = cards[i_prev_card].user_card_number;
      $response_recording.removeClass ('response_recording_spin')
                         .attr ('title', T ('Response to card') + ' ' + prev_user_card_number + ' ' + T ('recorded') + ' ' + hhmmss)
   }
}
this.pay_lock_settings = function (do_i_qwiz_deck, i_login_qwiz,
                                   escaped_session_id, remember_f) {
   qqc.pay_lock_settings (qname, deckdata, n_decks, i_login_qwiz,
                          escaped_session_id, remember_f, do_i_qwiz_deck);
}
this.go_mobile = function (i_deck) {
   non_mobile_scrollLeft = window.scrollX;
   non_mobile_scrollTop  = window.scrollY;
   var $deck = deckdata[i_deck].$qcard_window;
   deckdata[i_deck].deck_style = $deck.attr ('style');
   $deck.removeAttr ('style').removeAttr ('width').removeClass ('qcard_window').addClass ('qdeck-mobile qwizard_qwiz_deck_div');
   var in_iframe_b = parent !== window;
   if (! in_iframe_b) {
      deckdata[i_deck].$next_buttons.find ('button').removeClass ('qwiz_button').addClass ('qwiz_button_small');
   }
   $deck.after ('<div id="deck_div_placeholder"></div>');
   $deck.appendTo ('body');
   window.scrollTo (0, 0);
   deckdata[i_deck].$qcard_window.css ({width: '', 'min-height': ''});
   $ ('body').css ({overflow: 'hidden'});
   if (qqc.is_mobile (deckdata[i_deck].mobile_enabled) || ! document_qwiz_force_mobile_f) {
      $ ('.go-mobile-qdeck' + i_deck).hide ();
      if (! document_qwiz_force_mobile_f) {
         $ ('.exit-mobile-qdeck' + i_deck).show ();
         $ ('#icon-exit-mobile-qdeck' + i_deck).show ();
         $ ('#summary-deck' + i_deck).find ('button.summary_exit_mobile_deck').show ();
         var ua = navigator.userAgent.toLowerCase ();
         if (ua.indexOf ('firefox') != -1 && ua.indexOf ('mobile') != -1) {
            $ ('div.qdeck-mobile').css ({'padding-bottom': '10vh'});
         }
         const $qcard_card = deckdata[i_deck].$qcard_card;
         $qcard_card.css ({transform: '', 'margin-bottom': deckdata[i_deck].qcard_window_margin} + 'px');
         const $qcard_window = deckdata[i_deck].$qcard_window;
         $qcard_window.find ('div.qcard_progress, div.qcard_header').css ({transform: ''});
      }
      document_qwiz_mobile = 'mobile_';
      mobile_i_deck = i_deck;
   }
}
this.open_panel_exit_mobile = function (i_deck) {
   $ ('#overlay-exit-mobile-qdeck' + i_deck)
      .show ()
      .animate ({top: '0px'}, 500);
   panel_exit_mobile_open_b = true;
   $ ('#icon-exit-mobile-qdeck' + i_deck).hide ();
}
this.close_panel_exit_mobile = function (overlay_el) {
   $ (overlay_el).animate ({top: '-100px'}, 500,
                           function () {
                              $ (this).hide ();
                              $ ('div.icon-exit-mobile-qwiz').show ();
                           });
   panel_exit_mobile_open_b = false;
   panel_exit_mobile_just_closed_b = true;
   return false;
}
this.exit_mobile = function (i_deck) {
   var $deck = deckdata[i_deck].$qcard_window;
   $deck.attr ('style', deckdata[i_deck].deck_style)
        .removeClass ('qdeck-mobile qwizard_qwiz_deck_div')
        .addClass ('qcard_window');
   deckdata[i_deck].$next_buttons.find ('button').removeClass ('qwiz_button_small').addClass ('qwiz_button');
   $ ('#deck_div_placeholder').replaceWith ($deck);
   $ ('body').css ({overflow: ''});
   window.scrollTo (non_mobile_scrollLeft, non_mobile_scrollTop);
   var $qcard_window = deckdata[i_deck].$qcard_window;
   $qcard_window.css ({'width':      deckdata[i_deck].card_width_setting,
                       'min-height': deckdata[i_deck].card_height_setting});
   $ ('#overlay-exit-mobile-qdeck' + i_deck).css ({top: '-100px', display: 'none'});
   $ (window).off ('scroll');
   $ ('div.icon-exit-mobile-qwiz, div.icon-panel-exit-mobile-qwiz').hide ();
   $ ('.exit-mobile-qdeck').hide ();
   $ ('button.summary_exit_mobile_deck').hide ();
   const mobile_enabled = deckdata[i_deck].mobile_enabled;
   if (mobile_enabled == 'Always'
                || (mobile_enabled == 'Small screens only'
                                           && qqc.is_mobile (mobile_enabled))) {
      $ ('.go-mobile-qdeck' + i_deck).show ();
   }
   document_qwiz_mobile = '';
   panel_exit_mobile_just_closed_b = false;
   q.set_container_width_height (i_deck);
}
function check_qdeck_tag_pairs (htm) {
   var new_htm = '';
   var matches = htm.match (/\[qdeck|\[\/qdeck\]/gm);
   if (matches) {
      var n_tags = matches.length;
      var error_b = false;
      if (n_tags % 2 != 0) {
         error_b = true;
      } else {
         for (var i=0; i<n_tags; i++) {
            if (i % 2 == 0) {
               if (matches[i] != '[qdeck') {
                  error_b = true;
                  break;
               }
            } else {
               if (matches[i] != '[/qdeck]') {
                  error_b = true;
                  break;
               }
            }
         }
      }
      if (error_b){
         const pos_more = htm.search (/<[pa] class="more-link|<div class="(search|blog)-entry-readmore/);
         if (pos_more != -1) {
            const pos_qdeck = htm.indexOf ('[qdeck');
            if (pos_qdeck != -1) {
               new_htm = htm.substring (0, pos_qdeck) + htm.substr (pos_more);
            } else {
               new_htm = htm;
            }
         } else if (htm.indexOf ('class="entry-summary') != -1) {
            const pos_qdeck = htm.indexOf ('[qdeck');
            const pos_more  = htm.search (/\s*\[\u2026\]/);
            if (pos_qdeck != -1 && pos_more != -1) {
               new_htm = htm.substring (0, pos_qdeck) + htm.substr (pos_more);
            } else {
               new_htm = htm;
            }
         } else {
            errmsgs.push (T ('Unmatched [qdeck] - [/qdeck] pairs.'));
            new_htm = 'NA';
         }
      }
   }
   return new_htm;
}
function card_front_textentry_html (htm, i_deck) {
   var input =   '<div class="qcard_textentry">'
               +    '<input id="qdeck-textentry" type="text" class="textentry-qdeck' + i_deck + ' qcard_textentry" />'
               + '</div><!-- END -->';
   htm = htm.replace (/\[textentry[^\]]*\]/, input);
   if (debug[0]) {
      console.log ('[card_front_textentry_html] htm: ', htm);
   }
   return htm;
}
function card_back_textentry_html (htm, i_deck) {
   var preview_qcard = '';
   if (q.preview) {
      preview_qcard = ' preview-qcard' + deckdata[i_deck].i_card;
   }
   if (htm.indexOf ('class="back_textentry"') != -1) {
      htm = htm.replace ('back_textentry', 'back_textentry-qdeck' + i_deck + preview_qcard);
   } else {
      htm = htm.replace ('textentry', '<span class="back_textentry-qdeck' + i_deck + preview_qcard + ' back_qdeck_textentry"></span>');
   }
   htm = htm.replace (/\[([^[]*textentry.*?)\]/, '<p class="back_textentry_p-qdeck' + i_deck + preview_qcard + ' back_textentry_p">$1</p>');
   if (debug[0]) {
      console.log ('[card_back_textentry_html] htm:', htm);
   }
   return htm;
}
function init_element_pointers (i_deck) {
   deckdata[i_deck].$qcard_window          = $ ('div#qcard_window-qdeck' + i_deck);
   deckdata[i_deck].$qcard_container       = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container');
   deckdata[i_deck].$progress              = $ ('div#qcard_progress-qdeck' + i_deck);
   deckdata[i_deck].$progress_text         = $ ('div#qcard_progress-qdeck' + i_deck + ' span.progress_text');
   deckdata[i_deck].$header                = $ ('div#qcard_header-qdeck' + i_deck);
   deckdata[i_deck].$qcard_card            = $ ('div.qcard_card-qdeck' + i_deck);
   deckdata[i_deck].$qcard_card_front_back = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-front-back');
   deckdata[i_deck].$qcard_card_front      = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-front div.qcard_content_size');
   deckdata[i_deck].$qcard_card_front_alt  = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-front div.qcard_content_size_alt');
   deckdata[i_deck].$qcard_card_back       = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-back  div.qcard_content_size');
   deckdata[i_deck].$qcard_card_back_alt   = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-back  div.qcard_content_size_alt');
   deckdata[i_deck].$next_buttons          = $ ('div#qcard_next_buttons-qdeck' + i_deck);
   if (q.qwizard_b) {
      deckdata[i_deck].$qcard_front_part1 = $ ('#qcard_front-part1-qdeck' + i_deck);
      deckdata[i_deck].$qcard_back_part1  = $ ('#qcard_back-part1-qdeck' + i_deck);
   }
   if (debug[5]) {
      console.log ('[init_element_pointers] $next_buttons:', deckdata[i_deck].$next_buttons);
   }
}
this.init_card_order = function (i_deck) {
   var n_cards = deckdata[i_deck].n_cards;
   deckdata[i_deck].card_order = new Array (n_cards);
   for (var i=0; i<n_cards; i++) {
      deckdata[i_deck].card_order[i] = i;
   }
   if (deckdata[i_deck].random_b) {
      deckdata[i_deck].card_order = qqc.shuffle (deckdata[i_deck].card_order);
      if (debug[0]) {
         console.log ('[init_card_order] deckdata[i_deck].card_order:', deckdata[i_deck].card_order);
      }
   }
}
this.set_next_buttons = function (i_deck) {
   var htm = '';
   var style  = '';
   var qwiz_button = 'qwiz_button ';
   if (qqc.is_mobile (deckdata[i_deck].mobile_enabled)) {
      var in_iframe_b = parent !== window;
      if (! in_iframe_b) {
         qwiz_button = 'qwiz_button_small ';
      }
   }
   var qclass = qwiz_button;
   var label  = 'Check answer';
   if (deckdata[i_deck].hide_flip_b) {
      if (q.qwizard_b) {
         qclass = 'qwizard_gray ';
         label  = 'Flip (click disabled)';
      } else {
         style = 'style="display: none;" ';
      }
   }
   htm += '<button class="' + qclass + 'flip flip-qdeck' + i_deck + '" ' + style + 'onclick="' + qname + '.qdeck_flip (' + i_deck + ')" title="' + T ('Show the other side') + '">' + T (label) + '</button> &nbsp; ';
   if (deckdata[i_deck].n_to_go > 1) {
      if (deckdata[i_deck].hide_gotit_b) {
         if (next_button_active_b || deckdata[i_deck].gotit_active) {
            htm += '<button class="' + qwiz_button +  'next_card-qdeck' + i_deck + '" onclick="' + qname + '.next_card (' + i_deck + ')" title="' + T ('Put this card at the bottom of the stack, show the next card') + '">' + T ('Next card') + '</button> &nbsp; ';
         } else {
            htm += '<button class="' + qwiz_button + 'qwiz_button_disabled next_card-qdeck' + i_deck + '" disabled="true" onclick="' + qname + '.next_card (' + i_deck + ')" title="' + T ('Put this card at the bottom of the stack, show the next card') + '">' + T ('Next card') + '</button> &nbsp; ';
         }
      } else {
         htm += '<button class="' + qwiz_button + 'qwiz_button_disabled next_card-qdeck' + i_deck + '" disabled="true" onclick="' + qname + '.next_card (' + i_deck + ')" title="' + T ('Put this card at the bottom of the stack, show the next card') + '">' + T ('Need more practice') + '</button> &nbsp; ';
      }
   }
   style = '';
   if (deckdata[i_deck].hide_gotit_b) {
      style = 'style="display: none;" ';
   }
   if (next_button_active_b || deckdata[i_deck].gotit_active) {
      const label = deckdata[i_deck].gotit_active ? T ('Skip') : T ('Got it!');
      htm += '<button class="' + qwiz_button + 'got_it got_it-qdeck' + i_deck + '" ' + style + 'onclick="' + qname + '.got_it (' + i_deck + ')" title="' + T ('Remove this card from the stack') + '">' + label + '</button> &nbsp; ';
   } else {
      htm += '<div class="got-it_wrapper">'
           +    '<button class="' + qwiz_button + 'qwiz_button_disabled got_it got_it-qdeck' + i_deck + '" ' + style + 'disabled="true" onclick="' + qname + '.got_it (' + i_deck + ')" title="' + T ('Remove this card from the stack') + '">' + T ('Got it!') + '</button> &nbsp; '
           +    '<span id="got-it_unavailable-qdeck' + i_deck + '" class="got-it_unavailable" style="display: none;">'
           +       'Unavailable - '
           +       '<span class="times_up">'
           +    '   </span>'
           +    '</span>'
           + '</div>';
   }
   if (deckdata[i_deck].n_to_go > 1) {
      style = '';
      if (deckdata[i_deck].hide_shuffle_b) {
         style = 'style="display: none;" ';
      }
      htm += '<button class="' + qwiz_button + 'shuffle-qdeck' + i_deck + '" ' + style + 'onclick="' + qname + '.shuffle_order (' + i_deck + ')" title="' + T ('Randomly shuffle the remaining cards') +'">' + T ('Shuffle') + '</button> &nbsp; ';
   }
   if (debug[5]) {
      console.log ('[set_next_buttons] htm:', htm);
   }
   deckdata[i_deck].$next_buttons.html (htm).css ({visibility: 'visible'});
};
this.process_card = function (i_deck, progress_bars_f, no_flip_f) {
   if (debug[0]) {
      console.log ('[process_card] i_deck:', i_deck);
   }
   if (deckdata[i_deck].n_to_go == 0 && ! q.qwizard_b) {
      if (deckdata[i_deck].n_cards > 1) {
         var i_user_card = deckdata[i_deck].i_user_card;
         var n_cards = deckdata[i_deck].n_cards;
         deckdata[i_deck].cards[n_cards] = {i_user_prev_card: i_user_card};
         deckdata[i_deck].cards[i_user_card].i_user_next_card = n_cards;
         q.done (i_deck, progress_bars_f);
      }
   } else {
      var i_prev_card = deckdata[i_deck].i_user_card;
      var i_card;
      var ii_card;
      while (true) {
         if (q.qwizard_b) {
            i_card = deckdata[i_deck].i_card;
         } else {
            ii_card = deckdata[i_deck].ii_card;
            if (debug[0]) {
               console.log ('[process_card] ii_card:', ii_card);
            }
            if (ii_card >= deckdata[i_deck].n_cards_for_done) {
               ii_card = 0;
               deckdata[i_deck].ii_card = 0;
            }
            i_card = deckdata[i_deck].card_order[ii_card];
         }
         if (! deckdata[i_deck].cards[i_card].got_it) {
            if (deckdata[i_deck].reshow_after) {
               const reshow_after = deckdata[i_deck].reshow_after;
               const i_cards_done = deckdata[i_deck].i_cards_done;
               const i_back       = i_cards_done.length - reshow_after;
               if (i_back >= 0) {
                  const i_card_back = i_cards_done[i_back];
                  if (! deckdata[i_deck].cards[i_card_back].got_it) {
                     i_card = i_card_back;
                  }
               }
               deckdata[i_deck].i_cards_done.push (i_card);
            }
            deckdata[i_deck].card_reviewed_b = false;
            deckdata[i_deck].times_up = false;
            if (deckdata[i_deck].qrecord_id) {
               deckdata[i_deck].current_first_flip_sec = 0;
               deckdata[i_deck].n_flips = 0;
               deckdata[i_deck].current_first_textentry_sec = 0;
            }
            if (! next_button_active_b && ! deckdata[i_deck].gotit_active) {
               $ ('button.got_it-qdeck' + i_deck + ', button.next_card-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
            }
            if (deckdata[i_deck].n_to_go == 1) {
               $ ('button.next_card-qdeck' + i_deck + ', button.shuffle-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
            }
            var card = deckdata[i_deck].cards[i_card];
            card.i_user_prev_card = i_prev_card;
            if (i_prev_card == -1) {
               deckdata[i_deck].i_dataset_intro_user_next_card = i_card;
            } else {
               var prev_card = deckdata[i_deck].cards[i_prev_card];
               prev_card.i_user_next_card = i_card;
               if (! q.qwizard_b) {
                  $ ('.bck-card-qdeck' + i_deck).css ({opacity: 0.5}).addClass ('hover');
               }
            }
            deckdata[i_deck].i_card      = i_card;
            deckdata[i_deck].i_user_card = i_card;
            if (typeof (card.user_card_number) == 'undefined') {
               deckdata[i_deck].user_card_number++;
               card.user_card_number = deckdata[i_deck].user_card_number;
            }
            if (! q.qwizard_b) {
               $ ('span.card-number-qdeck' + i_deck).html (card.user_card_number);
            }
            q.set_card_front_and_back (i_deck, i_card, no_flip_f);
            if (q.qwizard_b) {
               qwizard.set_qwizard_data ('i_question', i_card);
               qwizard.go_to_card2 ();
            }
            break;
         } else {
            deckdata[i_deck].ii_card++;
         }
      }
      deckdata[i_deck].ii_card++;
   }
};
this.done = function (i_deck, progress_bars_f) {
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck, undefined, true);
   }
   stop_timer (i_deck);
   stop_timer (i_deck, true);
   if (deckdata[i_deck].$card_timer) {
      deckdata[i_deck].$card_timer.hide ();
   }
   deckdata[i_deck].$progress_text.html ('&nbsp;');
   if (! q.qwizard_b) {
      $ ('.bck-card-qdeck' + i_deck).css ({opacity: 0.5}).addClass ('hover');
   }
   $ ('span.card-number-qdeck' + i_deck).html ('--');
   if (! q.preview) {
      deckdata[i_deck].$qcard_card_back.hide ();
      deckdata[i_deck].$next_buttons.css ({visibility: 'hidden'});
   }
   var report_html = [];
   report_html.push ('<div class="flashcard_summary">');
   var n_cards          = deckdata[i_deck].n_cards;
   var n_cards_for_done = deckdata[i_deck].n_cards_for_done;
   if (deckdata[i_deck].summary_b) {
      var   overall;
      const n_reviewed = deckdata[i_deck].n_reviewed;
      const n_retries = n_reviewed - n_cards_for_done;
      if (n_retries <= 0) {
         overall = T ('In this %s-flashcard stack, you clicked') + ' &ldquo;' + T ('Got it!') + '&rdquo; ' + T ('on the first try for every card') + '.';
      } else {
         overall = T ('This flashcard stack had %s cards.') + ' ';
         if (n_retries == 1) {
            if (n_cards_for_done == 1) {
               overall += T ('It took you one re-try overall until you clicked') + ' &ldquo;' + T ('Got it!') + '&rdquo; ' + T ('for this card') + '.';
            } else {
               overall += T ('It took you one re-try overall until you clicked') + ' &ldquo;' + T ('Got it!') + '&rdquo; ' + T ('on all cards') + '.';
            }
         } else {
            if (n_cards_for_done == 1) {
               overall += T ('It took you %s re-tries overall until you clicked') + ' &ldquo;' + T ('Got it!') + '&rdquo; ' + T ('for this card') + '.';
            } else {
               overall += T ('It took you %s re-tries overall until you clicked') + ' &ldquo;' + T ('Got it!') + '&rdquo; ' + T ('on all cards') + '.';
            }
         }
      }
      overall = overall.replace ('%s', qqc.number_to_word (n_cards_for_done));
      overall = overall.replace ('%s', qqc.number_to_word (n_retries));
      report_html.push ('<p>' + overall + '</p>');
      var n_topics = 0;
      if (deckdata[i_deck].topics) {
         n_topics = deckdata[i_deck].topics.length;
      }
      if (n_topics == 1) {
         var topic = deckdata[i_deck].topics[0];
         if (topic != 'Other') {
            var all_both_n;
            if (n_cards_for_done == 1) {
               all_both_n = T ('This');
            } else if (n_cards_for_done == 2) {
               all_both_n = T ('Both');
            } else {
               all_both_n = T ('All') + ' '+ qqc.number_to_word (n_cards_for_done);
            }
            report_html.push ('<p>' + all_both_n + ' ' + plural (T ('card was'), T ('cards were'), n_cards_for_done) + ' ' + T ('about topic') + ' &ldquo;' + topic + '.&rdquo;</p>');
         }
      } else if (n_topics > 1 && n_reviewed > n_cards_for_done) {
         var need_more_practice_topics = [];
         for (var i_topic=0; i_topic<n_topics; i_topic++) {
            var topic              = deckdata[i_deck].topics[i_topic];
            var i_topic_n_cards    = deckdata[i_deck].topic_statistics[topic].n_cards;
            var i_topic_n_reviewed = deckdata[i_deck].topic_statistics[topic].n_reviewed;
            if (debug[4]) {
               console.log ('[done] topic:', topic, ', i_topic_n_cards:', i_topic_n_cards, ', i_topic_n_reviewed:', i_topic_n_reviewed);
            }
            if (i_topic_n_reviewed > i_topic_n_cards) {
               var topic_text = '<strong>' + topic + '</strong>: ' + qqc.number_to_word (i_topic_n_cards) + ' ' + plural (T ('card'), T ('cards'), i_topic_n_cards) + ', ' + qqc.number_to_word (i_topic_n_reviewed) + ' ' + T ('views');
               need_more_practice_topics.push (topic_text);
            }
         }
         var n_need_more_practice_topics = need_more_practice_topics.length;
         var topic_list_html = '<p class="topic_list">';
         if (n_need_more_practice_topics > 1) {
            topic_list_html += T ('These are the topics of cards where you clicked');
            for (var i=0; i<n_need_more_practice_topics; i++) {
               need_more_practice_topics[i] = '&bull; ' + need_more_practice_topics[i];
            }
         } else {
            topic_list_html += T ('This is the only topic for which you clicked');
         }
         topic_list_html += ' &ldquo;' + T ('Need more practice') + '&rdquo;:&nbsp;';
         topic_list_html += need_more_practice_topics.join ('; ') + '.';
         topic_list_html += '</p>';
         report_html.push (topic_list_html);
      }
   }
   report_html.push ('</div>');
   report_html.push (deckdata[i_deck].exit_html);
   report_html = report_html.join ('\n');
   if (q.qwizard_b) {
      q.set_editable_parts_front (i_deck, -1, report_html);
   } else {
      report_html = qqc.decode_image_tags (report_html);
      if (q.preview) {
         q.get_card_front (i_deck, n_cards).html (report_html);
      } else {
         q.get_card_front (i_deck, undefined, false, true).html (report_html);
      }
      if (report_html.indexOf ('mjp-s-wrapper') != -1) {
         setTimeout (delay_mp3_player_reset, 200);
      }
   }
   deckdata[i_deck].i_card      = n_cards;
   deckdata[i_deck].i_user_card = n_cards_for_done;
   if (document_qwiz_mobile) {
      $ ('button.summary_exit_mobile_deck').show ();
   } else {
      $ ('button.summary_exit_mobile_deck').hide ();
   }
   var $unpaid_msg = $ ('div.qcard_card-qdeck' + i_deck + ' span.unpaid_msg');
   if ($unpaid_msg.length) {
      var pay_quiz_ok = deckdata[i_deck].pay_quiz_ok;
      if (pay_quiz_ok && pay_quiz_ok == 'paid') {
         $unpaid_msg.hide ();
      } else {
         $unpaid_msg.show ();
      }
   }
   var $unpaid_msg_payment_type = $ ('div.qcard_card-qdeck' + i_deck + ' span.unpaid_msg_payment_type');
   if ($unpaid_msg_payment_type.length) {
      if (deckdata[i_deck].pay_quiz_ok != 'paid') {
         var unpaid_msgs = deckdata[i_deck].taker_unpaid_msgs;
         if (unpaid_msgs.length) {
            var i_msg = Math.floor (Math.random ()*unpaid_msgs.length);
            $unpaid_msg_payment_type.html (unpaid_msgs[i_msg]);
         }
      }
   }
   if (! q.preview) {
      deckdata[i_deck].no_flip_b = true;
      deckdata[i_deck].deck_started_b = false;
   }
   q.set_container_width_height (i_deck);
   if (deckdata[i_deck].qrecord_id && document_qwiz_user_logged_in_b && ! progress_bars_f) {
      var wait_completed = function () {
         var now_sec = new Date ().getTime ()/1000.0;
         var data = {type: 'completed', now_sec: now_sec, confirm: 'js'};
         record_qcard (i_deck, deckdata[i_deck].qrecord_id, data, true);
      }
      setTimeout (wait_completed, 2000);
   }
}
this.display_progress = function (i_deck) {
   var progress_html;
   progress_html = '<p>' + deckdata[i_deck].n_cards_for_done + ' ' + T ('cards total') + ', ' + deckdata[i_deck].n_reviewed + ' ' + plural (T ('card'), T ('cards'), deckdata[i_deck].n_reviewed) + ' ' + T ('reviewed');
   if (! deckdata[i_deck].hide_gotit_b) {
      progress_html += ', ' + deckdata[i_deck].n_to_go + ' ' + plural (T ('card'), T ('cards'), deckdata[i_deck].n_to_go) + ' ' + T ('to go') + '</p>';
   }
   deckdata[i_deck].$progress_text.html (progress_html);
}
this.hide_menu_and_display_login = function (i_deck, add_team_member_f,
                                             login_alt, msg, proceed_to_pay_f,
                                             pay_now_sign_up) {
   var $container = $ ('div.qwiz_icon_and_menu_container.qdeck' + i_deck + ' div.qwiz_icon_trigger_and_menu');
   $container.removeClass ('qwiz-hover');
   q.display_login (i_deck, add_team_member_f, login_alt, msg, proceed_to_pay_f,
                    pay_now_sign_up);
   var delay_reset = function () {
      $container.addClass ('qwiz-hover');
   }
   setTimeout (delay_reset, 500);
}
this.display_login = function (i_deck, add_team_member_f, login_alt, msg,
                               proceed_to_pay_f, pay_now_sign_up) {
   if (! login_alt) {
      login_alt = '';
   }
   if (! add_team_member_f && ! login_alt) {
      $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   }
   if (! showing_front (i_deck)) {
      deckdata[i_deck].check_answer_disabled_b = false;
      deckdata[i_deck].no_flip_b = false;
      q.qdeck_flip (i_deck);
   }
   deckdata[i_deck].no_flip_b      = true;
   deckdata[i_deck].deck_started_b = false;
   $ ('.bbfe-qdeck' + i_deck).css ({visibility: 'hidden'});
   $ ('span.card-number-qdeck' + i_deck).css ({visibility: 'hidden'});
   $ ('span.response_recorded_wrapper-qdeck' + i_deck).css ({display: 'none'});
   if (login_alt == 'progress_bars' || login_alt == 'leaderboard') {
      qqc.create_progress_bars (qname, deckdata, i_deck, login_alt);
   } else if (login_alt == 'feedback') {
      qqc.create_provide_feedback_screen (qname, i_deck, deckdata[i_deck].i_card);
   } else if (login_alt == 'use_dataset_options') {
      qqc.create_use_dataset_options (qname, deckdata, i_deck);
   } else if (login_alt == 'pay') {
      qqc.create_pay_screen (qname, deckdata, i_deck, msg, pay_now_sign_up);
   } else if (login_alt == 'maker_pay') {
      qqc.create_maker_pay_screen (qname, deckdata, i_deck, msg);
   } else if (login_alt == 'enroll') {
      qqc.create_enroll_screen (qname, i_deck);
   } else if (login_alt == 'register') {
      qqc.create_register_taker_screen (qname, i_deck, undefined, msg);
   } else if (login_alt == 'free_trial') {
      qqc.create_paypal_subscription_screen (qname, i_deck);
   } else if (document_qwiz_wp_user_session_id) {
      qqc.create_refresh_page_notice (qname, i_deck);
   } else {
      deckdata[i_deck].$qcard_card_front.html (get_login_html (i_deck, add_team_member_f, msg, proceed_to_pay_f));
      deckdata[i_deck].deck_started_b = false;
      qqc.init_hide_show_password ('#qdeck_password-qdeck' + i_deck);
      $ ('#qdeck_username-qdeck' + i_deck).focus ();
   }
   deckdata[i_deck].$next_buttons.css ('visibility', 'hidden');
}
function get_login_html (i_deck, add_team_member_f, msg, proceed_to_pay_f) {
   add_team_member_f = add_team_member_f ? 1 : 0;
   proceed_to_pay_f  = proceed_to_pay_f  ? 1 : 0;
   var onfocus = 'onfocus="jQuery (\'#qdeck_login-qdeck' + i_deck + ' p.login_error\').css (\'display\', \'none\')"';
   var login_html =
       '<div id="qdeck_login-qdeck' + i_deck + '" class="qdeck-login">\n'
     +    '<p>';
   if (msg) {
      login_html += '<strong>' + msg + '</strong>';
   } else if (add_team_member_f) {
      login_html +=
             '<strong>' + T ('Add team member') + '</strong>';
   } else {
      login_html +=
             '<strong>' + T ('Record score/credit?') + '</strong>';
   }
   login_html += '</p>';
   login_html +=
      '<form action="nada" onSubmit="return qcard_.login (' + i_deck + ', ' + add_team_member_f + ', ' + proceed_to_pay_f + ')">\n'
     +    '<table>'
     +       '<tr>'
     +          '<td>'
     +             '<label for="qdeck_username-qdeck' + i_deck + '"><nobr>'+ T ('Login name') + '</nobr></label>'
     +          '</td>'
     +          '<td>'
     +             '<input type="text" id="qdeck_username-qdeck' + i_deck + '" ' + onfocus + ' />'
     +          '</td>'
     +       '</tr>'
     +       '<tr>'
     +          '<td>'
     +             '<label for="qdeck_password-qdeck' + i_deck + '">'+ T ('Password') + '</label>'
     +          '</td>'
     +          '<td>'
     +             '<input type="password" id="qdeck_password-qdeck' + i_deck + '" />'
     +          '</td>'
     +       '</tr>'
     +       '<tr>'
     +          '<td style="text-align: right;">'
     +             '<span class="qdeck-remember" title="' + T ('Save preference (do not use on shared computer)') + '">'
     +                '<label>'
     +                   '<span class="qdeck-remember">'
     +                      '<input type="checkbox" />&nbsp;' + T ('Remember')
     +                   '</span>'
     +                '</label>'
     +             '</span>'
     +          '</td>'
     +          '<td>'
     +             '<button type="submit" class="qwiz_button">'
     +                T ('Student login')
     +             '</button>'
     +             '&ensp;';
   if (! add_team_member_f) {
      login_html +=
                  '<span class="qwiz_button" onclick="qwiz_qcards_common.create_register_taker_screen (\'' + qname + '\', ' + i_deck + ', ' + proceed_to_pay_f + ')">'
     +               T ('New student - register')
     +            '</span>'
     +            '&ensp;';
   }
   login_html +=  '<span class="qwiz_button" onclick="' + qname + '.no_login (' + i_deck + ',' + add_team_member_f + ')">';
   if (add_team_member_f) {
      login_html +=   T ('Cancel');
   } else {
      login_html +=   T ('No thanks');
   }
   login_html +=
                   '</span>'
     +          '</td>'
     +       '</tr>';
   if (! add_team_member_f) {
      login_html +=
             '<tr>'
     +          '<td>'
     +          '</td>'
     +          '<td class="qdeck-smaller">'
     +             '<a href="' + qqc.get_qwiz_param ('server_loc', '//qwizcards.com/admin') + '/password_reset_request" target="_blank">'
     +                T ('Forgot password?') + '</a>'
     +          '</td>'
     +       '</tr>';
   }
   var register_page = 'new_account';
   if (window.location.href.indexOf ('learn-biology.com') != -1) {
      register_page = 'new_account_smv';
   }
   login_html +=
             '<tr>'
     +          '<td colspan="2">'
     +             '<hr style="margin: 5px;">'
     +          '</td>'
     +       '</tr>'
     +       '<tr>'
     +          '<td colspan="2" class="qdeck-center">'
     +             '<b>' + T ('Teachers: track your students&rsquo; progress on quizzes and flashcards') + '.&nbsp; '
     +                '<a href="' + qqc.get_qwiz_param ('secure_server_loc', 'https://qwizcards.com/admin') + '/' + register_page + '" target="_blank">'
     +                '<nobr>' + T ('Create teacher administrative account') + '</nobr></a></b>'
     +          '</td>'
     +       '</tr>'
     +    '</table>\n'
     + '</form>'
     + '<p class="login_error">'
     +    T ('Login incorrect. Please try again')
     + '</p>\n'
     + '</div>\n';
   return login_html;
}
this.qdeck_password_focus = function (el, i_deck) {
   el.qwiz_pw = '';
   el.value = '';
   $ ('#qdeck_login-qdeck' + i_deck + ' p.login_error').css ({display: 'none'});
}
this.login = function (i_deck, add_team_member_f, proceed_to_pay_f) {
   add_team_member_f = add_team_member_f ? 1 : 0;
   proceed_to_pay_f  = proceed_to_pay_f ? 1 : 0;
   $.removeCookie ('qwiz_declined_login', {path: '/'});
   document_qwiz_declined_login_b = false;
   var $username = $ ('#qdeck_username-qdeck' + i_deck);
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
   var $password = $ ('#qdeck_password-qdeck' + i_deck);
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
      remember_f = $ ('#qdeck_login-qdeck' + i_deck + ' input[type="checkbox"]').prop('checked') ? 1 : 0;
      document_qwiz_remember_f = remember_f;
   }
   var data = {username: username, sha3_password: sha3_password, remember_f: remember_f, add_team_member_f: add_team_member_f};
   if (add_team_member_f) {
      data.previous_username = document_qwiz_username;
   }
   if (proceed_to_pay_f) {
      data.proceed_to_pay_f = '1';
   }
   qqc.jjax (qname, i_deck, deckdata[i_deck].qrecord_id, 'login', data);
   return false;
}
this.login_ok = function (i_deck, session_id, remember_f, proceed_to_pay_f) {
   if (debug[0]) {
      console.log ('[login_ok] i_deck:', i_deck);
   }
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
   $ ('#qdeck_login-qdeck' + i_deck).hide ();
   if (q.qrecord_b) {
      for (var ii_deck=0; ii_deck<n_decks; ii_deck++) {
         if (deckdata[ii_deck].qrecord_id) {
            deckdata[ii_deck].record_start_b = true;
         }
         if (deckdata[ii_deck].qrecord_id) {
            deckdata[ii_deck].qrecord_id_ok = 'check credit';
         }
      }
   }
   if (proceed_to_pay_f) {
      if (deckdata[i_deck].pay_quiz_ok == 'paid') {
         proceed_to_pay_f = false;
      }
   }
   if (proceed_to_pay_f) {
      q.display_login (i_deck, false, 'pay');
   } else {
      if (deckdata[i_deck].i_card == -1) {
         deckdata[i_deck].$qcard_card_front.html (qqc.decode_image_tags (deckdata[i_deck].intro_html));
      } else {
         q.login_ok_start_deck (i_deck);
      }
   }
   return false;
}
this.login_ok_start_deck = function (i_deck) {
   var i_card = deckdata[i_deck].i_card;
   deckdata[i_deck].$next_buttons.css ('visibility', 'visible');
   if (i_card == 0) {
      q.start_deck (i_deck, true);
   } else {
      deckdata[i_deck].record_start_b = false;
      var now_sec = new Date ().getTime ()/1000.0;
      var data = {qrecord_id_ok: deckdata[i_deck].qrecord_id_ok, type: 'start', now_sec: now_sec, confirm: 'js'};
      record_qcard (i_deck, deckdata[i_deck].qrecord_id, data, true);
      if (i_card == -1) {
         var $front = q.get_card_front (i_deck, -1, false, true);
         $front.html (qqc.decode_image_tags (deckdata[i_deck].intro_html));
      } else {
         $ ('.bbfe-qdeck' + i_deck).css ({visibility: 'visible'});
         $ ('span.card-number-qdeck' + i_deck).css ({visibility: 'visible'});
         if (i_card >= deckdata[i_deck].n_cards) {
            q.done (i_deck);
         } else {
            q.set_card_front_and_back (i_deck, i_card, true);
            deckdata[i_deck].no_flip_b = false;
         }
      }
   }
}
this.login_not_ok = function (i_deck, errmsg) {
   if (! errmsg) {
      errmsg = T ('Login incorrect. Please try again');
   }
   $ ('#qdeck_login-qdeck' + i_deck + ' p.login_error').html (errmsg).css ('display', 'block');
   if (debug[0]) {
      console.log ('[login_not_ok] $ (\'#qdeck_login-qdeck' + i_deck + ' p.login_error\'):', $ ('#qdeck_login-qdeck' + i_deck + ' p.login_error'));
   }
}
this.no_login = function (i_deck, add_team_member_f, progress_bars_f, e) {
   if (debug[0]) {
      console.log ('[no_login] e:', e);
   }
   if (progress_bars_f && e) {
      e.stopPropagation ();
   }
   if (! (add_team_member_f || progress_bars_f)) {
      if ($ ('#qdeck_login-qdeck' + i_deck + ' input[type="checkbox"]').prop('checked')) {
         $.cookie ('qwiz_declined_login', 1, {path: '/'});
         document_qwiz_declined_login_b = true;
      }
   }
   $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   deckdata[i_deck].$next_buttons.css ('visibility', 'visible');
   var i_user_card = deckdata[i_deck].i_user_card;
   if (i_user_card == -1) {
      if (progress_bars_f) {
         var $front = q.get_card_front (i_deck, -1, false, true);
         $front.html (qqc.decode_image_tags (deckdata[i_deck].intro_html));
      } else {
         q.start_deck (i_deck, true);
      }
   } else {
      if (i_user_card == deckdata[i_deck].n_cards) {
         q.done (i_deck);
      } else {
         q.set_card_front_and_back (i_deck, i_user_card, true);
         deckdata[i_deck].no_flip_b = false;
      }
      $ ('.bbfe-qdeck' + i_deck).css ({visibility: 'visible'});
      $ ('span.card-number-qdeck' + i_deck).css ({visibility: 'visible'});
   }
   var delay_flip = function () {
      if (! showing_front (i_deck)) {
         deckdata[i_deck].check_answer_disabled_b = false;
         q.qdeck_flip (i_deck);
      }
   }
   setTimeout (delay_flip, 50);
}
function alert_not_logged_in (i_deck) {
   if (q.no_intro_b[i_deck] && deckdata[i_deck].qrecord_id && $.cookie ('qwiz_user_login')) {
      var user_logged_in_b
         =    typeof (document_qwiz_user_logged_in_b) != 'undefined'
                                   && document_qwiz_user_logged_in_b
           && typeof (document_qwiz_username) != 'undefined';
      if (! user_logged_in_b) {
         if (! document_qwiz_declined_login_b
                   && ! document_qwiz_not_logged_in_alerted && ! q.qwizard_b ) {
            alert ('Note: you are not logged in. You must be logged in to receive credit.');
            document_qwiz_not_logged_in_alerted = true;
         }
      }
   }
}
this.icon_no_login = function (i_deck) {
   $ ('div.qwiz-usermenu_icon').removeClass ('qwiz-icon-bounce');
   if ($ ('#usermenu-qdeck' + i_deck + ' input[type="checkbox"]').prop('checked')) {
      $.cookie ('qwiz_declined_login', 1, {path: '/'});
      document_qwiz_declined_login_b = true;
   }
   $ ('#usermenu-qdeck' + i_deck).hide ();
}
this.qdeck_flip = function (i_deck, i_card, done_f, no_start_timer) {
   if (debug[0]) {
      console.log ('[flip] i_deck:', i_deck, ', deckdata[i_deck].i_card:', deckdata[i_deck].i_card, ', deckdata[i_deck].no_flip_b:', deckdata[i_deck].no_flip_b);
   }
   if (typeof (i_card) != 'undefined') {
      if (i_card == -1 || i_card == deckdata[i_deck].n_cards) {
         return false;
      }
   } else {
      if (deckdata[i_deck].bck_f) {
         i_card = deckdata[i_deck].i_user_card;
      } else {
         i_card = deckdata[i_deck].i_card;
      }
   }
   if (deckdata[i_deck].no_flip_b) {
      if (deckdata[i_deck].deck_started_b) {
         deckdata[i_deck].no_flip_b = false;
      }
      return false;
   }
   var card = deckdata[i_deck].cards[i_card];
   if (! card.single_char_b) {
      if (deckdata[i_deck].check_answer_disabled_b) {
         if (card.textentry_required_b) {
            alert (Tcheck_answer_message);
            $ ('#textentry_hint-qdeck' + i_deck)
               .removeAttr ('disabled')
               .removeClass ('qwiz_button_disabled').show ();
         }
         return;
      }
   }
   if (deckdata[i_deck].n_cards == 1) {
      stop_timer (i_deck);
   } else {
      if (deckdata[i_deck].deck_timer && q.no_intro_b[i_deck]) {
         if (done_f) {
            if (deckdata[i_deck].$card_timer) {
               deckdata[i_deck].$card_timer.hide ();
            }
         } else {
            if (! no_start_timer && ! deckdata[i_deck].card_reviewed_b
                                               && ! deckdata[i_deck].times_up) {
               start_timers (i_deck);
            }
         }
      }
   }
   var $front;
   var $back;
   var $qcard_front;
   var $qcard_back;
   if (q.preview) {
      $front       = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard_card-qdeck' + i_deck + ' div.qcard-front');
      $back        = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' div.qcard_card-qdeck' + i_deck + ' div.qcard-back');
   } else {
      $front       = q.get_card_front (i_deck);
      $back        = get_card_back (i_deck);
      $qcard_front = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-front');
      $qcard_back  = $ ('div.qcard_card-qdeck' + i_deck + ' div.qcard-back');
   }
   var $textentry = $front.find ('input.textentry-qdeck' + i_deck);
   var set_front_back;
   var textentry = false;
   var preview_qcard = '';
   if (q.preview) {
      preview_qcard = ' preview-qcard' + deckdata[i_deck].i_card;
   }
   var   showing_front_f = showing_front (i_deck);
   const showing_first = deckdata[i_deck].showing_first;
   if (debug[0]) {
      console.log ('[qdeck_flip] showing_front_f:', showing_front_f, ', showing_first:', showing_first);
   }
   if (showing_first == 'back') {
      showing_front_f = ! showing_front_f;
      if (debug[0]) {
         console.log ('[qdeck_flip] showing_front_f:', showing_front_f);
      }
   }
   if (showing_front_f) {
      if (deckdata[i_deck].qrecord_id && document_qwiz_user_logged_in_b) {
         deckdata[i_deck].n_flips++;
         if (deckdata[i_deck].record_start_b && document_qwiz_user_logged_in_b) {
            deckdata[i_deck].record_start_b = false;
            var now_sec = new Date ().getTime ()/1000.0;
            var data = {qrecord_id_ok: deckdata[i_deck].qrecord_id_ok, type: 'start', now_sec: now_sec, confirm: 'js'};
            record_qcard (i_deck, deckdata[i_deck].qrecord_id, data, true);
         }
      }
      if (deckdata[i_deck].user_card_number == 1) {
         $ ('div#icon_qdeck' + i_deck).hide ();
         alert_not_logged_in (i_deck);
      }
      if (showing_first == 'front') {
         $ (button_flip_selector (i_deck)).html (T ('Flip back'))
            .removeClass ('qwiz_button_disabled')
            .attr ('disabled', false);
         /*
      } else {
         $ (button_flip_selector (i_deck)).html (T ('Check answer'))
            .addClass ('qwiz_button_disabled')
            .attr ('disabled', true);
            */
      }
      if (! deckdata[i_deck].bck_f) {
         if (deckdata[i_deck].times_up || deckdata[i_deck].hangman_incorrect_chars_f) {
            const time_limit_incorrect = deckdata[i_deck].hangman_incorrect_chars_f ? T ('too many incorrect letters') : T ('time limit');
            $ ('span#got-it_unavailable-qdeck' + i_deck + ' span.times_up').html (time_limit_incorrect);
            $ ('span#got-it_unavailable-qdeck' + i_deck).show ();
         } else {
            if (showing_first == 'front') {
               $ ('button.got_it-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
            } else {
               if (! card.textentry_required_b
                    && typeof deckdata[i_deck].hangman[i_card] == 'undefined') {
                  $ ('button.got_it-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
               } else {
                  $ ('button.got_it-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
               }
            }
         }
         if (showing_first == 'front') {
            $ ('button.next_card-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
         } else {
            if (! card.textentry_required_b
                    && typeof deckdata[i_deck].hangman[i_card] == 'undefined') {
               $ ('button.next_card-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
            } else {
               $ ('button.next_card-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
            }
         }
         if (deckdata[i_deck].card_time_limit) {
            stop_timer (i_deck, true);
         }
      }
      if (! deckdata[i_deck].card_reviewed_b && ! deckdata[i_deck].bck_f) {
         deckdata[i_deck].card_reviewed_b = true;
         deckdata[i_deck].n_reviewed++;
         var card_topics = deckdata[i_deck].card_topics[i_card];
         if (debug[4]) {
            console.log ('[flip] card_topics:', card_topics);
         }
         if (card_topics) {
            for (var ii=0; ii<card_topics.length; ii++) {
               var topic = card_topics[ii];
               deckdata[i_deck].topic_statistics[topic].n_reviewed++;
            }
         }
         if (deckdata[i_deck].n_cards > 1) {
            q.display_progress (i_deck);
         }
         if (deckdata[i_deck].gotit_active) {
            $ ('button.got_it-qdeck' + i_deck).html (T ('Got it!'));
         }
         if (deckdata[i_deck].qrecord_id) {
            var now_sec = new Date ().getTime ()/1000.0;
            deckdata[i_deck].current_first_flip_sec = now_sec;
         }
      }
      if ($textentry.length) {
         $textentry.blur ();
         if (card.textentry_required_b) {
            q.textentry_set_card_back (i_deck, i_card);
         } else {
            textentry = $textentry.val ();
            if (textentry) {
               card.saved_textentry = textentry;
               $ ('p.back_textentry_p-qdeck' + i_deck + preview_qcard).css ('visibility', 'visible');
               $ ('span.back_textentry-qdeck' + i_deck + preview_qcard).html (textentry);
            } else {
               $ ('p.back_textentry_p-qdeck' + i_deck + preview_qcard).css ('visibility', 'hidden');
            }
         }
      }
      set_front_back = 'back';
   } else {
      set_front_back = 'front';
      if (! deckdata[i_deck].bck_f) {
         if (showing_first == 'back') {
            if (! card.textentry_required_b
                    && typeof deckdata[i_deck].hangman[i_card] == 'undefined') {
               $ ('button.got_it-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
               $ ('button.next_card-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
            } else {
               $ ('button.got_it-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
               $ ('button.next_card-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
            }
         }
         $ (button_flip_selector (i_deck)).html (card.check_answer);
      }
   }
   if (q.preview) {
      var $qcard_card  = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard_card');
      $qcard_card.flip ('toggle');
   } else {
      if (deckdata[i_deck].flip_axis) {
         deckdata[i_deck].$qcard_card.flip ({axis: deckdata[i_deck].flip_axis});
         var wait_flip = function () {
            deckdata[i_deck].$qcard_card.flip ('toggle');
         }
         setTimeout (wait_flip, 20);
      } else {
         deckdata[i_deck].$qcard_card.flip ('toggle');
      }
   }
   if (deckdata[i_deck].showing_front_b) {
      setTimeout ('qcard_.set_container_width_height (' + i_deck + ', ' + i_card + ')', 700);
   }
   toggle_showing_front (i_deck);
   if (q.qwizard_b) {
      if (showing_front (i_deck)) {
         qqc.select_placeholder (deckdata[i_deck].$qcard_front_part1);
      } else {
         qqc.select_placeholder (deckdata[i_deck].$qcard_back_part1);
      }
   }
   return false;
};
function showing_front (i_deck) {
   var showing_front_b = true;
   if (q.preview) {
      if (deckdata[i_deck].showing_front_bs) {
         var i_card = deckdata[i_deck].i_card;
         if (typeof (deckdata[i_deck].showing_front_bs[i_card]) != 'undefined') {
            showing_front_b = deckdata[i_deck].showing_front_bs[i_card];
         }
      } else {
         deckdata[i_deck].showing_front_bs = [];
      }
   } else {
      showing_front_b = deckdata[i_deck].showing_front_b;
   }
   return showing_front_b;
}
function toggle_showing_front (i_deck) {
   if (q.preview) {
      var i_card = deckdata[i_deck].i_card;
      if (deckdata[i_deck].showing_front_bs) {
         if (typeof (deckdata[i_deck].showing_front_bs[i_card]) != 'undefined') {
            deckdata[i_deck].showing_front_bs[i_card] = ! deckdata[i_deck].showing_front_bs[i_card];
         } else {
            deckdata[i_deck].showing_front_bs[i_card] = false;
         }
      } else {
         deckdata[i_deck].showing_front_bs = [];
         deckdata[i_deck].showing_front_bs[i_card] = false;
      }
   } else {
      deckdata[i_deck].showing_front_b = ! deckdata[i_deck].showing_front_b;
   }
}
function set_header (i_deck, front_back, init_b) {
   if (init_b != undefined) {
      var header_html = deckdata[i_deck].header_html;
      if (header_html) {
         deckdata[i_deck].$header.html (header_html);
      } else {
         deckdata[i_deck].$header.hide ();
      }
   }
   var qcard_width = $ ('div.qcard_card-qdeck' + i_deck + ' div.' + front_back).outerWidth ();
   if (debug[0]) {
      console.log ('[set_header] qcard_width: ', qcard_width);
   }
   if (deckdata[i_deck].card_width_setting) {
      var card_width_setting = deckdata[i_deck].card_width_setting.replace ('px', '');
      if (qcard_width < card_width_setting) {
         qcard_width = card_width_setting;
      }
   }
   if (deckdata[i_deck].align == 'center' || deckdata[i_deck].align == 'right') {
      if (! document_qwiz_mobile) {
         deckdata[i_deck].$qcard_window.width (qcard_width);
      }
   }
   return qcard_width;
}
this.set_card_front_and_back = function (i_deck, i_card, no_flip_f,
                                                   reshow_hangman_textentry_f) {
   if (debug[0]) {
      console.log ('[set_card_front_and_back] i_deck:', i_deck, ', i_card:', i_card);
   }
   var $qcard_card_front_back;
   if (q.preview) {
      $qcard_card_front_back = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-front-back');
   } else {
      $qcard_card_front_back = deckdata[i_deck].$qcard_card_front_back;
   }
   /* DKTMP scroll
   if (! deckdata[i_deck].scroll_b) {
      $qcard_card_front_back.css ({'width':      deckdata[i_deck].card_width_setting,
                                   'min-height': deckdata[i_deck].card_height_setting});
   }
   */
   if (deckdata[i_deck].n_cards > 1) {
      q.display_progress (i_deck);
      if (deckdata[i_deck].card_time_limit) {
         if (! q.no_intro_b[i_deck]) {
            start_timers (i_deck);
         }
      }
   }
   var card = deckdata[i_deck].cards[i_card];
   $ (button_flip_selector (i_deck))
      .removeAttr ('disabled')
      .removeClass ('qwiz_button_disabled');
   deckdata[i_deck].check_answer_disabled_b = false;
   var $qcard_card_front;
   var $qcard_card_back;
   var show_first = 'front';
   if (! q.qwizard_b && ! q.preview) {
      show_first = deckdata[i_deck].show_first;
      if (show_first == 'random') {
         show_first = Math.random () < 0.5 ? 'front' : 'back';
      }
   }
   deckdata[i_deck].showing_first = show_first;
   var hangman_delay_focus_choice = -1;
   var $textentry_focus = '';
   var do_front = function () {
      if (q.preview) {
         $qcard_card_front            = q.get_card_front (i_deck, i_card);
      } else {
         $qcard_card_front            = q.get_card_front (i_deck);
         var $qcard_card_front_hidden = q.get_card_front (i_deck, i_card, true);
         $qcard_card_front_hidden.hide ();
      }
      $qcard_card_front.css ({display: 'inline-block'});
      var card_htm = card['card_front'];
      var typeset_latex_f;
      [card_htm, typeset_latex_f] = qqc.qlatex_convert (card_htm);
      if (q.qwizard_b && ! deckdata[i_deck].use_dataset_card_ids[i_card]) {
         q.set_editable_parts_front (i_deck, i_card, card_htm);
      } else {
         $qcard_card_front.html (qqc.decode_image_tags (card_htm));
      }
      if (q.no_intro_b[i_deck] && deckdata[i_deck].n_reviewed == 0) {
         if (! deckdata[i_deck].hide_qwizcards_icon_b) {
            var qwiz_icon_div = create_qwiz_icon_div (i_deck);
            deckdata[i_deck].$qcard_card.append (qwiz_icon_div);
         }
         q.qwiz_icon_stop_propagation (i_deck);
      }
      var $textentry = $qcard_card_front.find ('input.textentry-qdeck' + i_deck);
      if ($textentry.length) {
         var textentry_val = '';
         if (reshow_hangman_textentry_f) {
            if (card.saved_textentry) {
               textentry_val = card.saved_textentry;
               if (card.saved_textentry_ok) {
                  $ (button_flip_selector (i_deck))
                     .removeAttr ('disabled')
                     .removeClass ('qwiz_button_disabled')
                     .html (T ('Check answer'));
                  deckdata[i_deck].check_answer_disabled_b = false;
               }
            }
         }
         $textentry.val (textentry_val);
         if (deckdata[i_deck].n_reviewed != 0 || ! q.no_intro_b[i_deck]) {
            panel_exit_mobile_just_closed_b = true;
            $textentry_focus = $textentry;
         }
         if (deckdata[i_deck].click_flip_b) {
            $textentry.click (function (event) {
               event.stopPropagation ();
               if (debug[0]) {
                  console.log ('[set_card_front_and_back] click event:', event);
               }
            });
         }
      } else if (typeof deckdata[i_deck].hangman[i_card] != 'undefined') {
         var hangman               = deckdata[i_deck].hangman[i_card];
         var n_hangman             = hangman.n_hangman;
         hangman.n_hangman_done    = 0;
         hangman.n_hangman_correct = 0;
         var first_hangman_box_f   = true;
         var answered_correctly    = deckdata[i_deck].answered_correctly[i_card];
         for (var i_choice=0; i_choice<n_hangman; i_choice++) {
            var $hangman = $qcard_card_front.find ('span.qdeck_hangman.qdeck_hangman_c' + i_choice);
            var hangman_final_entry = hangman.hangman_final_entry[i_choice]
            if (reshow_hangman_textentry_f) {
               var hangman_current_entry = hangman.hangman_current_entry[i_choice];
               if (hangman_current_entry.indexOf ('<u>\t</u>') == -1) {
                  hangman.n_hangman_done++;
                  hangman.n_hangman_correct++;
               }
               hangman_current_entry = hangman_current_entry.replace (/\t/g, '&ensp;');
               $hangman.find ('span.hangman_current_entry').html (hangman_current_entry);
               $hangman.find ('span.hangman_type_letters').hide ();
               continue
            } else if ((n_hangman > 1
                        && (! answered_correctly && answered_correctly === false))) {
               $hangman.find ('span.hangman_current_entry').html (hangman_current_entry);
               if (hangman.hangman_incorrect_chars[i_choice].length <= 3
                                 && hangman.hangman_n_hints[i_choice] == 0) {
                  $hangman.find ('span.hangman_current_entry').html (hangman_final_entry);
                  $hangman.find ('span.hangman_type_letters').hide ();
                  hangman.n_hangman_done++;
                  hangman.n_hangman_correct++;
                  continue;
               }
            }
            var hangman_current_entry = hangman_final_entry.replace (/>[a-z0-9]</gi, '>&ensp;<');
            hangman.hangman_current_entry[i_choice] = hangman_current_entry.replace (/u>&ensp;</g, 'u>\t<');
            $hangman.find ('span.hangman_current_entry').html (hangman_current_entry);
            var $hangman_input = $hangman.find ('input');
            if (! q.qwizard_b || hangman.hangman_answer[i_choice] != 'placeholder') {
               $hangman_input.off ('mousedown');
               $ ('#hangman_hint-qdeck' + i_deck)
                  .removeAttr ('disabled')
                  .removeClass ('qwiz_button_disabled');
            }
            hangman.hangman_incorrect_chars[i_choice] = '';
            hangman.hangman_n_hints[i_choice] = 0;
            if (deckdata[i_deck].click_flip_b) {
               $hangman_input.click (function (event) {
                  event.stopPropagation ();
                  if (debug[0]) {
                     console.log ('[set_card_front_and_back] click event:', event);
                  }
               });
            }
            var msg;
            var hangman_answer = hangman.hangman_answer[i_choice];
            if (hangman_answer.search (/[a-z]/i) != -1) {
               msg = T ('Type letters in the box');
            } else {
               msg = T ('Type numbers in the box');
            }
            $hangman.find ('span.hangman_type_letters').html ('<span class="type_letters">' + msg + '</span>');
            if (first_hangman_box_f) {
               first_hangman_box_f = false;
               if (    deckdata[i_deck].n_reviewed != 0
                    || ! q.no_intro_b[i_deck]
                    || (! answered_correctly && answered_correctly === false)) {
                  panel_exit_mobile_just_closed_b = true;
                  hangman_delay_focus_choice = i_choice;
               }
            }
         }
         if (deckdata[i_deck].cards[i_card].type == 'hangman_labeled_diagram') {
            if (q.qwizard_b) {
               $qcard_card_front.find ('div.hangman_label').addClass ('ui-draggable ui-draggable-handle ui-resizable');
               qwizzled.reinit_dragging ($qcard_card_front);
            } else {
               $qcard_card_front.find ('div.hangman_label').each (function () {
                  var $this = $ (this);
                  var width = $this.outerWidth ();
                  $this.outerWidth (1.2 * width);
               });
            }
         }
      }
      if ($ ().mediaelementplayer) {
         $ ('div.qcard-front .wp-audio-shortcode, div.qcard-front .wp-video-shortcode')
               .not (".mejs-container")
               .filter (function () {
                           return ! $(this).parent().hasClass ('mejs-mediaelement')
                        })
               .mediaelementplayer ();
      }
      if (deckdata[i_deck].click_flip_b) {
         var delay_stop = function () {
            deckdata[i_deck].$qcard_card_front.find ('div.mejs-container, input[onclick^="play_mp3"], div.qwiz_no_click_flip, .mjp-s-wrapper')
               .click (function (event) {
                  event.stopPropagation ();
               });
         }
         setTimeout (delay_stop, 250);
      }
      init_code_highlight ($qcard_card_front);
      if (typeset_latex_f) {
         qqc.qlatex_init ($qcard_card_front);
      }
   };
   var do_back = function () {
      if (q.preview) {
         $qcard_card_back            = get_card_back (i_deck, i_card);
      } else {
         $qcard_card_back            = get_card_back (i_deck);
         var $qcard_card_back_hidden = get_card_back (i_deck, i_card, true);
         $qcard_card_back_hidden.hide ();
      }
      $qcard_card_back.css ({display: 'inline-block'});
      var card_htm = card['card_back'];
      var typeset_latex_f;
      [card_htm, typeset_latex_f] = qqc.qlatex_convert (card_htm);
      if (q.qwizard_b && ! deckdata[i_deck].use_dataset_card_ids[i_card]) {
         set_editable_parts_back (i_deck, card_htm);
      } else {
         $qcard_card_back.html (qqc.decode_image_tags (card_htm));
      }
      var background = deckdata[i_deck].default_card_back_background;
      var background_card_i = deckdata[i_deck].card_back_background[i_card];
      if (background_card_i) {
         background = background_card_i;
      }
      var css;
      if (background) {
         if (background.substr (0, 4) == 'img:') {
            css = {'background-image': 'url(' + background.substr (4) + ')'};
         } else {
            css = {'background':       background};
         }
         $qcard_card_back.parents ('.qcard-back').css (css);
      }
      if ($ ().mediaelementplayer) {
         $ ('div.qcard-back .wp-audio-shortcode, div.qcard-back .wp-video-shortcode')
               .not (".mejs-container")
               .filter (function () {
                           return ! $(this).parent().hasClass ('mejs-mediaelement')
                        })
               .mediaelementplayer ();
      }
      if (deckdata[i_deck].click_flip_b) {
         var delay_stop = function () {
            deckdata[i_deck].$qcard_card_back.find ('div.mejs-container, input[onclick^="play_mp3"], div.qwiz_no_click_flip, .mjp-s-wrapper')
               .click (function (event) {
                  event.stopPropagation ();
               });
         }
         setTimeout (delay_stop, 250);
      }
      init_code_highlight ($qcard_card_back);
      if (typeset_latex_f) {
         qqc.qlatex_init ($qcard_card_back);
      }
   };
   var do_rest = function () {
      var delay_set_min_width = function () {
         $ ('div.qcard-front-back .mejs-container').css ({'min-width': '300px'});
      }
      setTimeout (delay_set_min_width, 200);
      if (typeof deckdata[i_deck].hangman[i_card] != 'undefined') {
         if (! q.qwizard_b && ! deckdata[i_deck].bck_f && show_first == 'front') {
            $ (button_flip_selector (i_deck)).addClass ('qwiz_button_disabled').attr ('disabled', true);
            deckdata[i_deck].check_answer_disabled_b = true;
         }
      }
      if (document_active_qwiz_qdeck) {
         $ (document_active_qwiz_qdeck).find ('div.qdeck-focusable input').focus ().blur ();
      }
      if (card.textentry_required_b) {
         q.init_textentry_autocomplete (i_deck, i_card);
      } else {
         var flip = q.qwizard_b && deckdata[i_deck].hide_flip_b ? T ('Flip (click disabled)') : T ('Check answer');
         $ (button_flip_selector (i_deck)).html (T (flip)).attr ('title', T ('Show the other side'));
         card.check_answer = T (flip);
      }
      q.set_container_width_height (i_deck, i_card, card.textentry_required_b);
      if (deckdata[i_deck].scroll_b || document_qwiz_mobile) {
         var $qcard_card = deckdata[i_deck].$qcard_card;
         $qcard_card.find ('div.qcard-front, div.qcard-back').css ({overflow: 'auto'});
         deckdata[i_deck].$qcard_card_front_back.scrollLeft (0).scrollTop (0);
      }
   }
   if (showing_front (i_deck)) {
      if (debug[0]) {
         console.log ('[set_card_front_and_back] (showing front)');
      }
      do_front ();
      do_back ();
      do_rest ();
      if (hangman_delay_focus_choice >= 0) {
         hangman_focus (i_deck, hangman_delay_focus_choice);
      }
   } else {
      if (debug[0]) {
         console.log ('[set_card_front_and_back] (showing back)');
      }
      if (show_first == 'front') {
         do_front ();
      } else {
         do_back ();
      }
      var delay1 = function () {
         if (! no_flip_f) {
            q.qdeck_flip (i_deck);
         }
         var delay2 = function () {
            if (show_first == 'front') {
               do_back ();
            } else {
               do_front ();
            }
            do_rest ();
            if ($textentry_focus) {
               $textentry_focus.focus ();
            }
            if (hangman_delay_focus_choice >= 0) {
               hangman_focus (i_deck, hangman_delay_focus_choice);
            }
         }
         setTimeout (delay2, 700);
      }
      setTimeout (delay1, 100);
   }
   if (deckdata[i_deck].first_display_f) {
      deckdata[i_deck].first_display_f = false;
   } else {
      if (typeof MP3_JPLAYER != 'undefined') {
         if (   card['card_front'].indexOf ('mjp-s-wrapper') != -1
             || card['card_back'].indexOf ('mjp-s-wrapper')  != -1) {
            setTimeout (delay_mp3_player_reset, 200);
         }
      }
   }
}
function init_code_highlight ($card_front_back) {
   if (typeof Prism != 'undefined' || typeof hljs != 'undefined') {
      const htm = $card_front_back.html ();
      if (htm.indexOf ('<code') != -1) {
         if (typeof Prism != 'undefined') {
            Prism.highlightAllUnder ($card_front_back[0]);
         } else {
            $card_front_back.find ('code').each (function (i, e) {
                                                    hljs.highlightBlock (e);
                                                    this.style.display = 'inline-block';
                                                 });
         }
      }
   }
}
var mp3_jplayer_warning_f;
function delay_mp3_player_reset () {
   $ ('span.wrap_inline_mp3j, span.play-mjp').off ('click');
   if (MP3_JPLAYER.vars.play_f) {
      if (! mp3_jplayer_warning_f) {
         mp3_jplayer_warning_f = true;
         alert ('In order for MP3jPlayer to work with flashcards, the "Encode URLs" setting must be turned off.\n'
                + 'Please go to WordPress Dashboard > MP3jPlayer > Settings > Advanced.\n'
                + 'Under "Misc File Settings" unclick the checkbox and then click "Save All Changes"');
      }
   }
   /*
   if (typeof MP3jPLAYLISTS !== 'undefined') {
      for (var key in MP3jPLAYLISTS) {
         if (MP3jPLAYLISTS.hasOwnProperty (key)) {
            if (debug[0]) {
               console.log ('[delay_mp3_player_reset] key:', key);
            }
            var arr = MP3jPLAYLISTS[key];
            var len_arr = arr.length;
            for (var i=0; i<len_arr; i++) {
               var re = /[^A-Za-z0-9+\/]/;
               if (re.test (arr[i].mp3)) {
                  arr[i].mp3 = btoa (arr[i].mp3);
                  if (debug[0]) {
                     console.log ('[delay_mp3_player_reset > btoa]');
                  }
               }
            }
         }
      }
   }
   */
   var delay_mp3_player_init = function () {
      if (debug[0]) {
         console.log ('[delay_mp3_player_reset > MP3_JPLAYER.init ()]');
      }
      MP3_JPLAYER.init ();
   }
   setTimeout (delay_mp3_player_init, 1500);
}
function start_timers (i_deck) {
   if (debug[0]) {
      console.log ('[start_timers] i_deck:', i_deck);
   }
   if (q.preview) {
      return;
   }
   if (deckdata[i_deck].card_time_limit) {
      if (! deckdata[i_deck].card_timer_interval_id) {
         $ ('span#got-it_unavailable-qdeck' + i_deck).hide ();
         const time_limit_sec = deckdata[i_deck].card_time_limit;
         const hhmmss = qqc.hhmmss_from_sec (time_limit_sec);
         const $card_timer = $ ('#qdeck' + i_deck + '-card_timer');
         deckdata[i_deck].$card_timer = $card_timer;
         $card_timer.css ({display: 'inline-block'}).html (hhmmss);
         if (! q.qwizard_b) {
            deckdata[i_deck].card_timer_interval_id = setInterval (update_timer, 1000, i_deck, true);
            deckdata[i_deck].times_up_msec     = new Date ().getTime () + time_limit_sec*1000 + 500;
         }
      }
   }
   if (deckdata[i_deck].deck_timer) {
      if (! deckdata[i_deck].deck_timer_interval_id) {
         const $deck_timer = $ ('#qdeck' + i_deck + '-deck_timer');
         deckdata[i_deck].$deck_timer = $deck_timer;
         $deck_timer.css ({display: 'inline-block'}).html ('0:00');
         if (! q.qwizard_b) {
            deckdata[i_deck].deck_timer_interval_id = setInterval (update_timer, 1000, i_deck);
            deckdata[i_deck].timer_start_msec  = new Date ().getTime ();
         }
      }
   }
}
function stop_timer (i_deck, time_limit_f) {
   if (time_limit_f) {
      if (deckdata[i_deck].card_timer_interval_id) {
         clearInterval (deckdata[i_deck].card_timer_interval_id);
         deckdata[i_deck].card_timer_interval_id = '';
      }
   } else {
      if (deckdata[i_deck].deck_timer_interval_id) {
         clearInterval (deckdata[i_deck].deck_timer_interval_id);
         deckdata[i_deck].deck_timer_interval_id = '';
      }
   }
}
function update_timer (i_deck, time_limit_f) {
   var sec;
   if (time_limit_f) {
      sec = parseInt ((deckdata[i_deck].times_up_msec - new Date ().getTime ())/1000.0);
      if (sec <= 0) {
         times_up (i_deck);
         sec = 0;
      }
      const hhmmss = qqc.hhmmss_from_sec (sec);
      deckdata[i_deck].$card_timer.html (hhmmss);
   } else {
      sec = parseInt ((new Date ().getTime () - deckdata[i_deck].timer_start_msec)/1000.0);
      const hhmmss = qqc.hhmmss_from_sec (sec);
      deckdata[i_deck].$deck_timer.html (hhmmss);
   }
}
function times_up (i_deck) {
   stop_timer (i_deck, true);
   deckdata[i_deck].times_up = true;
}
function hangman_focus (i_deck, hangman_delay_focus_choice) {
   var $hangman_input = q.get_card_front (i_deck).find ('span.qdeck_hangman.qdeck_hangman_c' + hangman_delay_focus_choice + ' input');
   if (debug[0]) {
      console.log ('[hangman_focus] $hangman_input[0]:', $hangman_input[0]);
   }
   suppress_hangman_hint_b = true;
   $hangman_input.focus ();
}
this.set_editable_parts_front = function (i_deck, i_card, card_front) {
   if (debug[0]) {
      console.log ('[set_editable_parts_front] card_front:', card_front);
   }
   card_front = qqc.shortcodes_to_video_elements (card_front);
   var hangman_labeled_diagram_f = false;
   var hangman_fields_div;
   var re = '';
   var divs = [];
   var splits;
   if (card_front.indexOf ('qcard_textentry') != -1) {
      re = new RegExp ('<div class="qcard_textentry[^>]*[^]*?<\/div><!-- END -->', 'g');
   } else if (card_front.indexOf ('qcard_single_char_entry') != -1) {
      re = new RegExp ('<div class="qcard_single_char_entry[^>]*[^]*?<\/div><!-- END -->', 'g');
   } else if (card_front.indexOf ('hangman_img_wrapper') != -1) {
      hangman_labeled_diagram_f = true;
      var pos = card_front.search (/<div[^>]+hangman_labeled_diagram_fields/);
      hangman_fields_div = qqc.find_matching_block (card_front.substr (pos));
      card_front = card_front.replace (hangman_fields_div, '');
   } else if (card_front.indexOf ('qdeck_hangman') != -1) {
      re = new RegExp ('<span class="qdeck_hangman[^>]*[^]*?<\/span><!-- END -->', 'g');
      divs   = card_front.match (re);
      splits = card_front.split (re);
   }
   if (re) {
      divs   = card_front.match (re);
      splits = card_front.split (re);
   }
   if (divs.length) {
      if (debug[9]) {
         console.log ('[set_editable_parts_front] divs:', divs);
         console.log ('[set_editable_parts_front] splits:', splits);
      }
      var n_divs = divs.length;
      add_editable_parts (i_deck, n_divs);
      $ ('#qcard_front-part0-qdeck' + i_deck).hide ();
      $ ('div.qcard_front-parts, div.qcard_front-inputs').html ('').hide ();
      for (var i=0; i<n_divs; i++) {
         var i1 = i + 1;
         var split = qqc.remove_unmatched_tag (splits[i], i1 == 1);
         $ ('#qcard_front-part'  + i1 + '-qdeck' + i_deck).html (split).css ({display: ''});
         $ ('#qcard_front-input' + i1 + '-qdeck' + i_deck).html (divs[i]).css ({display: ''});
      }
      var i1 = n_divs + 1;
      var split = qqc.remove_unmatched_tag (splits[n_divs], false, true);
      $ ('#qcard_front-part'  + i1 + '-qdeck' + i_deck).html (split).css ({display: ''});
   } else {
      var i_part = 3;
      while (true) {
         var i_input = i_part - 1;
         var $input = $ ('div#qcard_front-input' + i_input + '-qdeck' + i_deck);
         if ($input.length == 0) {
            break;
         }
         $input.remove ();
         var $part = $ ('div#qcard_front-part' + i_part + '-qdeck' + i_deck);
         $part.remove ();
         i_part++;
      }
      var buttons_opening_pos = qqc.opening_tag_shortcode_pos ('<button', card_front);
      if (! hangman_labeled_diagram_f
                                   && buttons_opening_pos < card_front.length) {
         var part1 = card_front.substr (0, buttons_opening_pos);
         if (part1.indexOf ('<div class="flashcard_summary') != -1) {
            var summary_end_pos = part1.indexOf ('</div>') + 6;
            var summary = part1.substring (0, summary_end_pos);
            $ ('#qcard_front-part0-qdeck' + i_deck).html (summary).show ();
            part1 = part1.substr (summary_end_pos + 1);
         } else {
            $ ('#qcard_front-part0-qdeck' + i_deck).hide ();
         }
         var buttons = qqc.find_matching_block (card_front.substr (buttons_opening_pos));
         var part2 = card_front.substr (buttons_opening_pos + buttons.length);
         $ ('#qcard_front-part1-qdeck' + i_deck).html (part1).css ({display: ''});
         $ ('#qcard_front-input1-qdeck' + i_deck).html (buttons).show ();
         var part2 = delete_unmatched_p (part2);
         $ ('#qcard_front-part2-qdeck' + i_deck).html (part2).css ({display: ''});
      } else {
         $ ('#qcard_front-part0-qdeck' + i_deck).hide ();
         $ ('#qcard_front-part1-qdeck' + i_deck).html (card_front).css ({display: 'block'});
         $ ('#qcard_front-input1-qdeck' + i_deck).html ('').hide ();
         $ ('#qcard_front-part2-qdeck' + i_deck).html ('').hide ();
         if (hangman_labeled_diagram_f) {
            var $qcard_content_size = q.get_card_front (i_deck);
            q.save_remove_hangman_fields (i_deck, $qcard_content_size);
            $qcard_content_size.append (hangman_fields_div);
            var delay_set_data = function () {
                  $qcard_content_size.find ('div.hangman_labeled_diagram_fields')
                                     .attr ('data-qcard', i_card);
                  qwizard.position_hangman_fields_div ();
                  qwizard.set_hangman_label_width ($qcard_content_size);
            }
            setTimeout (delay_set_data, 100);
            $qcard_content_size.on ('keyup', function () {
                                                qwizard.position_hangman_fields_div ('', true);
                                             });
         }
      }
   }
   if (! hangman_labeled_diagram_f) {
      var $qcard_content_size = q.get_card_front (i_deck);
      q.save_remove_hangman_fields (i_deck, $qcard_content_size);
      var $qcard_content_size = q.get_card_front (i_deck);
      $qcard_content_size.off ('keyup');
   }
}
this.save_remove_hangman_fields = function (i_deck, $qcard_content_size,
                                                                  no_remove_f) {
   var $prev_hangman_fields_div = $qcard_content_size.find ('div.hangman_labeled_diagram_fields').first ();
   if ($prev_hangman_fields_div.length) {
      var i_prev_card = $prev_hangman_fields_div.data ('qcard');
      var hangman_fields = $prev_hangman_fields_div.html ();
      qwizard.questions_cards[i_prev_card].hangman_fields = hangman_fields;
      if (! no_remove_f) {
         $prev_hangman_fields_div.remove ();
      }
      var card_front = deckdata[i_deck].cards[i_prev_card].card_front;
      var pos = card_front.search (/<div[^>]+hangman_labeled_diagram_fields/);
      if (pos == -1) {
         deckdata[i_deck].cards[i_prev_card].card_front
                 += '<div class="hangman_labeled_diagram_fields" data-qcard="' + i_prev_card + '">'
                  +    hangman_fields
                  + '</div>';
      } else {
         var old_hangman_fields = qqc.find_matching_block (card_front.substr (pos));
         var m = old_hangman_fields.match (/>([^]*)<\/div>$/);
         if (m) {
            var old_hangman_fields_inner = m[1];
            deckdata[i_deck].cards[i_prev_card].card_front
                = card_front.replace (old_hangman_fields_inner, hangman_fields);
         }
      }
   }
}
function add_editable_parts (i_deck, n_textentry_hangman) {
   var $inputs = $ ('div.qcard-front-inputs');
   var n_existing = $inputs.length;
   if (debug[0]) {
      console.log ('[add_editable_parts] n_existing:', n_existing, ', n_textentry_hangman:', n_textentry_hangman);
   }
   for (var i=n_existing+1; i<=n_textentry_hangman; i++) {
      var input = '<div id="qcard_front-input' + i + '-qdeck' + i_deck + '" class="qcard_front-inputs qcard-inline"></div>';
      var i1 = i + 1;
      var part  = '<div id="qcard_front-part' + i1 + '-qdeck' + i_deck + '" class="qcard_front-parts qcard-part' + i1 + ' qcard-inline qcard_editable" data-i_part="' + i1 + '"></div>';
      $ ('div.qcard-front div.qcard_content_size').append (input + part);
      qwizard.init_tinymce ('div#qcard_front-part' + i1 + '-qdeck' + i_deck);
   }
   q.n_textentry_hangman = n_textentry_hangman;
}
function delete_unmatched_p (htm) {
   var i_pos = htm.indexOf ('<p');
   if (i_pos != -1) {
      if (htm.substr (i_pos).indexOf ('</p') == -1) {
         htm = htm.replace (/<p[^>]*>/, '');
      }
   }
   var htm_wo_tags = htm.replace (/<[^>]+>/gm, '');
   if (htm_wo_tags.search (/\S/) == -1) {
      htm += ' &emsp;';
   }
   return htm;
}
function set_editable_parts_back (i_deck, card_back, i_choice,
                                                           init_placeholder_f) {
   var delay_set = function () {
      if (debug[0]) {
         console.log ('[set_editable_parts_back > delay_set] i_choice:', i_choice);
      }
      card_back = qqc.shortcodes_to_video_elements (card_back);
      var $qcard_back_part1 = deckdata[i_deck].$qcard_back_part1;
      if (typeof i_choice != 'undefined') {
         var i_pos = card_back.indexOf ('<div id="qcard_back-part1');
         var you_entered_p = card_back.substr (0, i_pos);
         var part1_div = card_back.substr (i_pos);
         var maker_feedback = part1_div.replace (/<div[^>]*>/, '').replace (/<\/div>$/, '');
         $ ('#qcard_back-echo-qdeck'  + i_deck).html (you_entered_p).show ();
         $qcard_back_part1.html (maker_feedback).show ();
         if (init_placeholder_f) {
            var selector = '#qcard_back-part1-qdeck' + i_deck;
            qwizard.init_remove_placeholder (selector);
            qqc.select_placeholder ($ (selector));
         }
         $qcard_back_part1.data ('choice', i_choice);
      } else if (card_back.indexOf ('back_textentry_p') != -1) {
         var m = card_back.match (/([^]*?<p class="back_textentry_p[^]*?<\/p>)([^]*)/);
         $ ('#qcard_back-echo-qdeck'  + i_deck).html (m[1]).show ();
         $qcard_back_part1.html (m[2]).show ();
         $qcard_back_part1.removeData ('choice');
      } else {
         $ ('#qcard_back-echo-qdeck' +  i_deck).html ('').hide ();
         $qcard_back_part1.html (card_back).show ();
         $qcard_back_part1.removeData ('choice');
      }
   }
   setTimeout (delay_set, 100);
}
this.textentry_set_card_back = function (i_deck, i_card, local_i_choice,
                                                           init_placeholder_f) {
   if (debug[0]) {
      console.log ('[textentry_set_card_back] i_card:', i_card, ', local_i_choice:', local_i_choice);
   }
   var card = deckdata[i_deck].cards[i_card];
   var $qcard_card_back = get_card_back (i_deck);
   var i_choice;
   var entry;
   if (typeof local_i_choice != 'undefined') {
      i_choice = local_i_choice;
      entry = $qcard_card_back.find ('span.back_qcard_textentry').html ();
   } else {
      var $textentry;
      if (q.preview) {
         $textentry = $ ('div#qcard_window-qdeck' + i_deck + ' div.card-container.preview-qcard' + i_card + ' input.textentry-qdeck' + i_deck);
      } else {
         $textentry = $ ('input.textentry-qdeck' + i_deck);
      }
      entry = $textentry.val ();
      var lc_entry = entry.toLowerCase ();
      i_choice = -1;
      var n_choices = card.choices.length;
      var i_default_choice = 0;
      for (var i=0; i<n_choices; i++) {
         var alts = card.choices[i];
         if (alts[0] == '*') {
            i_default_choice = i;
         } else {
            var lc_alts = alts.map (function (item) {
                                       return item.toLowerCase ();
                                    });
            if (lc_alts.indexOf (lc_entry) != -1) {
               i_choice = i;
               break;
            }
         }
      }
      if (i_choice == -1) {
         i_choice = i_default_choice;
      }
   }
   if (! entry) {
      entry = '___________';
   }
   var preview_qcard = '';
   if (q.preview) {
      preview_qcard = ' preview-qcard' + i_card;
   }
   var card_back =  '<p class="back_textentry_p' + preview_qcard + '">'
                 +     T ('You entered') + ' &ldquo;'
                 +     '<span class="back_qcard_textentry' + preview_qcard + '">'
                 +        entry
                 +     '</span>&rdquo;'
                 +  '</p>'
                 +  '<div id="qcard_back-part1-qdeck' + i_deck + '" class="card_back_textentry">\n'
                 +     card.feedback_htmls[i_choice]
                 +  '</div>';
   if (q.qwizard_b && ! deckdata[i_deck].use_dataset_card_ids[i_card]) {
      set_editable_parts_back (i_deck, card_back, i_choice, init_placeholder_f);
   } else {
      get_card_back (i_deck).html (qqc.decode_image_tags (card_back));
   }
   /*
   var card_width  = $qcard_card_back.outerWidth ();
   var card_height = $qcard_card_back.outerHeight ();
   var div_width  = $qcard_card_back.find ('#qcard_back-part1-qdeck').outerWidth ();
   var div_height = $qcard_card_back.find ('#qcard_back-part1-qdeck').outerHeight ();
   var left = card_width/2  - div_width/2;
   var top  = card_height/2 - div_height/2
   $qcard_card_back.find ('#qcard_back-part1-qdeck' + i_deck).css ({display: 'block', left: left + 'px', top: top + 'px'});
   */
}
window.onorientationchange = function () {
   if (document_qwiz_mobile && typeof mobile_i_deck != 'undefined') {
      var delay_mobile_center_vertical = function () {
         mobile_center_vertical (mobile_i_deck);
      }
      setTimeout (delay_mobile_center_vertical, 100);
   }
}
function mobile_center_vertical (i_deck) {
   $qcard_card_front      = q.get_card_front (i_deck);
   $qcard_card_back       = get_card_back (i_deck);
   center_vertical ($qcard_card_front);
   center_vertical ($qcard_card_back);
}
this.set_container_width_height = function (i_deck, i_card, textentry_required_b) {
   if (document_qwiz_mobile) {
      mobile_center_vertical (i_deck);
      return;
   }
   var scroll_b = deckdata[i_deck].scroll_b;
   if (typeof i_card == 'undefined') {
      i_card = deckdata[i_deck].i_user_card;
   }
   var $qcard_window;
   var $qcard_container;
   var $qcard_card_front_back;
   var $qcard_card_front;
   var $qcard_card_back;
   if (q.preview) {
      $qcard_window          = $ ('div.card-window.preview-qdeck'    + i_deck + '.preview-qcard' + i_card);
      $qcard_container       = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card);
      $qcard_card_front_back = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-front-back');
      if (deckdata[i_deck].use_dataset_card_ids[i_card]) {
         $qcard_card_front      = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-front div.qcard_content_size_alt');
         $qcard_card_back       = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-back  div.qcard_content_size_alt');
      } else {
         $qcard_card_front      = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-front div.qcard_content_size');
         $qcard_card_back       = $ ('div.card-container.preview-qdeck' + i_deck + '.preview-qcard' + i_card + ' div.qcard-back  div.qcard_content_size');
      }
   } else {
      $qcard_window          = deckdata[i_deck].$qcard_window;
      $qcard_container       = deckdata[i_deck].$qcard_container;
      $qcard_card_front_back = deckdata[i_deck].$qcard_card_front_back;
      $qcard_card_front      = q.get_card_front (i_deck);
      $qcard_card_back       = get_card_back (i_deck);
   }
   var $qcard_card           = $qcard_container.find ('div.qcard_card');
   var n_delays = 0;
   var delay_set_container_width_height = function () {
      var $imgs = $qcard_card.find ('img');
      if ($imgs.length) {
         if ($imgs[0].width == 0) {
            if (debug[0]) {
               console.log ('[delay_set_container_width_height] zero-width img; n_delays:', n_delays);
            }
            if (n_delays < 10) {
               n_delays++;
               setTimeout (delay_set_container_width_height, 100);
               return false;
            }
         }
      }
      var card_width_setting;
      var card_height_setting;
      if (deckdata[i_deck].card_width_setting) {
         card_width_setting  = deckdata[i_deck].card_width_setting.replace ('px', '');
         card_height_setting = deckdata[i_deck].card_height_setting.replace ('px', '');
      }
      if (scroll_b) {
         if (card_width_setting) {
            card_width_setting  = deckdata[i_deck].card_width_setting.replace ('px', '');
            card_height_setting = deckdata[i_deck].card_height_setting.replace ('px', '');
            $qcard_window.width (card_width_setting);
            $qcard_window.height (card_height_setting);
         } else {
            card_width_setting  = $qcard_container.outerWidth ();
            card_height_setting = $qcard_container.outerHeight ();
         }
      } else {
         var width_front  = parseInt ($qcard_card_front.outerWidth ());
         var height_front = parseInt ($qcard_card_front.outerHeight ());
         var width_back   = parseInt ($qcard_card_back.outerWidth ());
         var height_back  = parseInt ($qcard_card_back.outerHeight ());
         var max_width  = Math.max (width_front,  width_back);
         var max_height = Math.max (height_front, height_back);
         if (debug[0]) {
            console.log ('[delay_set_container_width_height] width_front: ', width_front, ', width_back: ', width_back);
         }
         var new_width_front  = parseInt ($qcard_card_front.outerWidth ());
         var new_height_front = parseInt ($qcard_card_front.outerHeight ());
         if (debug[0]) {
            console.log ('[delay_set_container_width_height] i_deck:', i_deck, ', new_width_front: ', new_width_front, ', new_height_front: ', new_height_front);
         }
         var new_width_back  = 0;
         var new_height_back = 0;
         if (textentry_required_b) {
            var card = deckdata[i_deck].cards[i_card];
            var n_choices = card.choices.length;
            for (var i_choice=0; i_choice<n_choices; i_choice++) {
               q.textentry_set_card_back (i_deck, i_card, i_choice);
               var new_width_back_i  = parseInt ($qcard_card_back.find ('#qcard_back-part1-qdeck' + i_deck).outerWidth ());
               var new_height_back_i = parseInt ($qcard_card_back.find ('#qcard_back-part1-qdeck' + i_deck).outerHeight ());
               new_width_back  = Math.max (new_width_back,  new_width_back_i);
               new_height_back = Math.max (new_height_back, new_height_back_i);
            }
         } else {
            new_width_back  = parseInt ($qcard_card_back.outerWidth ());
            new_height_back = parseInt ($qcard_card_back.outerHeight ());
         }
         var new_max_width  = Math.max (new_width_front,  new_width_back);
         var new_max_height = Math.max (new_height_front, new_height_back);
         if (debug[13]) {
            console.log ('[delay_set_container_width_height] new_width_front: ', new_width_front, ', new_width_back: ', new_width_back);
            console.log ('[delay_set_container_width_height] new_height_front: ', new_height_front, ', new_height_back: ', new_height_back);
            console.log ('[delay_set_container_width_height] new_max_width: ', new_max_width, ', new_max_height: ', new_max_height);
         }
         if (textentry_required_b) {
            new_max_width  += 10;
            new_max_height += 10;
         }
         max_width  = Math.max ( max_width, new_max_width, card_width_setting);
         max_height = Math.max ( max_height, new_max_height, card_height_setting);
         if (debug[13]) {
            console.log ('[delay_set_container_width_height] max_width: ', max_width, ', max_height: ', max_height);
         }
      }
      if (q.preview) {
         $qcard_container.width (max_width).height (max_height);
         $qcard_window.width (max_width).height (max_height);
      } else {
         if (! scroll_b) {
            if (! document_qwiz_mobile && ! document_qwiz_force_mobile_f) {
               $qcard_card.width (max_width).height (max_height);
               $qcard_window.width (max_width).height (max_height);
               if (q.qwizard_b) {
                  $ ('div.qcard_card-qdeck' + i_deck)
                                  .css ({'width':  '' + max_width  + 'px',
                                         'height': '' + max_height + 'px'});
               }
            }
         }
      }
      center_vertical ($qcard_card_front, card_height_setting);
      center_vertical ($qcard_card_back,  card_height_setting);
      const $container = $qcard_window.parents ('div').first ();
      if ($container.length) {
         const container_width = $container.width ();
         if (max_width > container_width) {
            const scale_fac = container_width / max_width;
            const trans_pct = Math.round ((1.0 - scale_fac) * 50.0)
            const rtl_fac = getComputedStyle ($container[0]).direction == 'rtl' ? 1 : -1;
            const css = {'max-width': 'none', transform: 'translate(' + (rtl_fac*trans_pct) + '%, -' + trans_pct + '%) scale(' + scale_fac.toFixed (3) + ')'};
            $qcard_window.css (css);
            qqc.offset_height_rescale ($qcard_window, scale_fac, 80.0*scale_fac);
         } else {
            $qcard_window.css ({transform: ''});
         }
      }
      /*
      if (! q.preview && ! scroll_b) {
         var delay_set_header = function () {
            set_header (i_deck, 'qcard-front');
         }
         setTimeout (delay_set_header, 100);
      }
      */
   }
   setTimeout (delay_set_container_width_height, 300);
}
function center_vertical ($div, height_setting) {
   var center_f;
   if (document_qwiz_mobile) {
      center_f = $div.outerHeight () < $div.parents ('div.card-container').height ();
   } else {
      center_f = $div.outerHeight () < height_setting;
   }
   if (center_f) {
      $div.parent ().css ({'top':                 '50%',
                           'transform':           'translateY(-50%)',
                           '-webkit-transform':   'translateY(-50%)'});
   } else {
      $div.parent ().css ({'top':                 '',
                           'transform':           '',
                           '-webkit-transform':   ''});
   }
}
this.got_it = function (i_deck) {
   if (! q.qwizard_b) {
      var i_card  = deckdata[i_deck].i_card;
      deckdata[i_deck].cards[i_card].got_it = true;
      deckdata[i_deck].n_to_go--;
   }
   q.next_card (i_deck, true);
};
this.next_card = function (i_deck, got_it_f) {
   if (debug[0]) {
      console.log ('[next_card] deckdata[i_deck].i_card:', deckdata[i_deck].i_card);
   }
   if (deckdata[i_deck].bck_f) {
      q.fwd_card (i_deck, false);
      return;
   }
   var i_card = deckdata[i_deck].i_card;
   if (typeof deckdata[i_deck].hangman[i_card] != 'undefined') {
      if (! got_it_f) {
         deckdata[i_deck].answered_correctly[i_card] = false;
         var hangman = deckdata[i_deck].hangman[i_card];
         var n_hangman = hangman.n_hangman;
         for (var i_choice=0; i_choice<n_hangman; i_choice++) {
            hangman.hangman_n_hints[i_choice] = 1;
         }
         $ ('span#got-it_unavailable-qdeck' + i_deck).hide ();
         deckdata[i_deck].hangman_incorrect_chars_f = false;
      }
   } else {
      var card = deckdata[i_deck].cards[i_card];
      if (card.textentry_required_b) {
         if (! got_it_f) {
            $ ('span#got-it_unavailable-qdeck' + i_deck).hide ();
         }
      }
   }
   if (deckdata[i_deck].gotit_active) {
      $ ('button.got_it-qdeck' + i_deck).html (T ('Skip'));
   }
   if (! q.qwizard_b && deckdata[i_deck].qrecord_id && document_qwiz_user_logged_in_b) {
      var textentry = '';  // DKTMP
      var now_sec = new Date ().getTime ()/1000.0;
      got_it_f = got_it_f ? 1 : 0;
      var data = {type:                'flashcard',
                  i_card:              deckdata[i_deck].dataset_id[i_card],
                  unit:                deckdata[i_deck].unit[i_card],
                  q_and_a_text:        btoa (encodeURIComponent (deckdata[i_deck].q_and_a_text[i_card])),
                  first_flip_sec:      deckdata[i_deck].current_first_flip_sec,
                  n_flips:             deckdata[i_deck].n_flips,
                  first_textentry_sec: deckdata[i_deck].current_first_textentry_sec,
                  response:            textentry,
                  now_sec:             now_sec,
                  got_it_f:            got_it_f,
                  confirm:             'js'
                 };
      record_qcard (i_deck, deckdata[i_deck].qrecord_id, data);
   }
   deckdata[i_deck].i_user_card = i_card;
   var axis    = deckdata[i_deck].flip_axis;
   var reverse = false;
   if (! axis) {
      axis    = Math.random () > 0.5 ? 'x' : 'y';
      reverse = Math.random () > 0.5;
   }
   deckdata[i_deck].$qcard_card.flip ({axis: axis, reverse: reverse});
   if (deckdata[i_deck].pay_quiz_deck_id
             && (   deckdata[i_deck].pay_quiz_ok == 'preview_questions'
                 || deckdata[i_deck].pay_quiz_ok == 'preview_period_expired'
                 || deckdata[i_deck].pay_quiz_ok == 'no_free_trial')) {
      if (qqc.preview_limit ('deck', deckdata, i_deck)) {
         if (! showing_front (i_deck)) {
            q.qdeck_flip (i_deck);
         }
         return;
      }
   }
   q.process_card (i_deck);
};
this.bck_card = function (i_deck, go_to_beg_f) {
   if (! $ ('.bck-card-qdeck' + i_deck).hasClass ('hover')) {
      return;
   }
   deckdata[i_deck].bck_f = true;
   var i_user_card;
   if (go_to_beg_f) {
      if (deckdata[i_deck].use_dataset && deckdata[i_deck].dataset_intro_f) {
         deckdata[i_deck].saved_i_card = deckdata[i_deck].i_card;
         $ ('.bck-card-qdeck' + i_deck).css ({opacity: 0.2}).removeClass ('hover');
         $ ('.fwd-card-qdeck' + i_deck).css ({opacity: 0.5}).addClass ('hover');
         $ ('span.card-number-qdeck' + i_deck).html ('--');
         deckdata[i_deck].i_card = -1;
         q.display_login (i_deck, false, 'use_dataset_options');
         return;
      } else {
         i_user_card = deckdata[i_deck].card_order[0];
      }
   } else {
      i_user_card = deckdata[i_deck].i_user_card;
      i_user_card = deckdata[i_deck].cards[i_user_card].i_user_prev_card;
      if (i_user_card == -1) {
         return;
      }
   }
   deckdata[i_deck].i_user_card = i_user_card;
   var card = deckdata[i_deck].cards[i_user_card];
   if (go_to_beg_f || card.i_user_prev_card == -1) {
      var $bck = $ ('.bck-card-qdeck' + i_deck);
      if (deckdata[i_deck].use_dataset && deckdata[i_deck].dataset_intro_f) {
         $bck = $bck.last ();
      }
      $bck.css ({opacity: 0.2}).removeClass ('hover');
   }
   var user_card_number = card.user_card_number;
   $ ('span.card-number-qdeck' + i_deck).html (user_card_number);
   $ ('.fwd-card-qdeck' + i_deck).css ({opacity: 0.5}).addClass ('hover');
   deckdata[i_deck].$next_buttons.css ({visibility: 'visible'});
   deckdata[i_deck].no_flip_b = false;
   $ ('button.got_it-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
   $ ('button.next_card-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
   deckdata[i_deck].check_answer_disabled_b = false;
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck);
   }
   q.set_card_front_and_back (i_deck, i_user_card, false, true);
}
this.fwd_card = function (i_deck, go_to_end_f) {
   if (! $ ('.fwd-card-qdeck' + i_deck).hasClass ('hover')) {
      return;
   }
   var i_user_card;
   if (go_to_end_f) {
      if (deckdata[i_deck].i_card == -1) {
         deckdata[i_deck].i_card = deckdata[i_deck].saved_i_card;
      }
      i_user_card = deckdata[i_deck].i_card;
      deckdata[i_deck].no_flip_b = false;
      deckdata[i_deck].$next_buttons.css ({visibility: 'visible'});
   } else {
      if (deckdata[i_deck].i_card == -1) {
         i_user_card = deckdata[i_deck].i_dataset_intro_user_next_card;
         deckdata[i_deck].i_card = deckdata[i_deck].saved_i_card;
         deckdata[i_deck].no_flip_b = false;
         deckdata[i_deck].$next_buttons.css ({visibility: 'visible'});
      } else {
         i_user_card = deckdata[i_deck].i_user_card;
         i_user_card = deckdata[i_deck].cards[i_user_card].i_user_next_card;
      }
   }
   deckdata[i_deck].i_user_card = i_user_card;
   var card = deckdata[i_deck].cards[i_user_card];
   if (i_user_card == deckdata[i_deck].i_card) {
      deckdata[i_deck].bck_f = false;
      $ ('.fwd-card-qdeck' + i_deck).css ({opacity: 0.2}).removeClass ('hover');
      if (deckdata[i_deck].i_card == deckdata[i_deck].n_cards) {
         q.done (i_deck);
         return;
      } else {
         if (deckdata[i_deck].card_reviewed_b) {
            $ ('button.got_it-qdeck' + i_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
            deckdata[i_deck].check_answer_disabled_b = false;
         } else {
            $ ('button.next_card-qdeck' + i_deck).attr ('disabled', true).addClass ('qwiz_button_disabled');
            deckdata[i_deck].check_answer_disabled_b = true;
         }
      }
   }
   var user_card_number = card.user_card_number;
   $ ('span.card-number-qdeck' + i_deck).html (user_card_number);
   var $bck = $ ('.bck-card-qdeck' + i_deck);
   if (card.i_user_prev_card == -1) {
      $bck = $bck.first ();
   }
   $bck.css ({opacity: 0.5}).addClass ('hover');
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck);
   }
   q.set_card_front_and_back (i_deck, i_user_card, false, true);
}
this.shuffle_order = function (i_deck) {
   var i_card = deckdata[i_deck].i_card;
   var ii_card = deckdata[i_deck].card_order[i_card];
   while (true) {
      var new_ii_card = deckdata[i_deck].card_order[i_card];
      if (new_ii_card != ii_card && ! deckdata[i_deck].cards[new_ii_card].got_it) {
         break;
      }
      deckdata[i_deck].card_order = qqc.shuffle (deckdata[i_deck].card_order);
   }
   if (! showing_front (i_deck)) {
      q.qdeck_flip (i_deck);
   }
   q.process_card (i_deck);
};
var find_matching_terms = function (request, response) {
   var entry = request.term.toLowerCase ();
   var entry_metaphone = qqc.metaphone (entry);
   if (debug[6]) {
      console.log ('[find_matching_terms] entry_metaphone; ', entry_metaphone);
   }
   if (deckdata[textentry_i_deck].qrecord_id) {
      if (! deckdata[textentry_i_deck].current_first_textentry_sec) {
         var now_sec = new Date ().getTime ()/1000.0;
         deckdata[textentry_i_deck].current_first_textentry_sec = now_sec;
      }
   }
   var required_entry_length = 100;
   var required_metaphone_length = 100;
   var i_card = deckdata[textentry_i_deck].i_card;
   var card = deckdata[textentry_i_deck].cards[i_card];
   var minlength = card.textentry_minlength;
   for (var i=0; i<textentry_answer_metaphones[textentry_i_deck].length; i++) {
      if (entry[0] == textentry_answers[textentry_i_deck][i][0].toLowerCase ()) {
         required_entry_length = Math.min (required_entry_length, textentry_answers[textentry_i_deck][i].length);
         if (debug[6]) {
            console.log ('[find_matching_terms] entry[0]:', entry[0], ', textentry_answers[textentry_i_deck][i][0]:', textentry_answers[textentry_i_deck][i][0]);
         }
      }
      if (entry_metaphone[0] == textentry_answer_metaphones[textentry_i_deck][i][0]) {
         required_metaphone_length = Math.min (required_metaphone_length, textentry_answer_metaphones[textentry_i_deck][i].length);
         if (debug[6]) {
            console.log ('[find_matching_terms] textentry_answer_metaphones[textentry_i_deck][' + i + ']:', textentry_answer_metaphones[textentry_i_deck][i], ', textentry_answers[textentry_i_deck][' + i + '][0]:', textentry_answers[textentry_i_deck][i][0], ', required_metaphone_length:', required_metaphone_length);
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
      textentry_matches[textentry_i_deck] = [];
   } else {
      if (debug[6]) {
         console.log ('[find_matching_terms] request.term:', request.term, entry_metaphone, entry_metaphone.length);
      }
      textentry_matches[textentry_i_deck]
            = $.map (current_card_textentry_terms_metaphones[textentry_i_deck],
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
         console.log ('[find_matching_terms] textentry_matches[textentry_i_deck]:', textentry_matches[textentry_i_deck]);
      }
      if (card.use_dict_b) {
         var plural_f = card.textentry_plural_b ? 1 : 0;
         var data = {action:          'textentry_suggestions',
                     entry:           encodeURIComponent (entry),
                     entry_metaphone: encodeURIComponent (entry_metaphone),
                     n_hints:         deckdata[textentry_i_deck].textentry_n_hints,
                     terms:          textentry_matches[textentry_i_deck],
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
                           textentry_matches[textentry_i_deck] = data;
                           find_matching_terms2 (response, deduped_entry);
                        }
         });
      } else {
         find_matching_terms2 (response, deduped_entry);
      }
   }
}
function find_matching_terms2 (response, deduped_entry) {
   if (textentry_matches[textentry_i_deck].length) {
      lc_textentry_matches[textentry_i_deck]
         = textentry_matches[textentry_i_deck].map (function (item) {
                                                       return item.toLowerCase ();
                                                    });
      if (debug[6]) {
         console.log ('[find_matching_terms2] textentry_matches[textentry_i_deck]:', textentry_matches[textentry_i_deck]);
      }
   }
   if (debug[6]) {
      console.log ('[find_matching_terms] deduped_entry.length: ', deduped_entry.length, ', textentry_matches[textentry_i_deck].length: ', textentry_matches[textentry_i_deck].length, ', deckdata[textentry_i_deck].textentry_n_hints: ', deckdata[textentry_i_deck].textentry_n_hints);
   }
   var i_card = deckdata[textentry_i_deck].i_card;
   var card = deckdata[textentry_i_deck].cards[i_card];
   var minlength = card.textentry_minlength;
   if (deduped_entry.length >= minlength && deckdata[textentry_i_deck].textentry_n_hints < 5) {
      var lc_first_choice = card.all_choices[0];
      if (typeof (lc_textentry_matches[textentry_i_deck]) == 'undefined'
            || lc_textentry_matches[textentry_i_deck].indexOf (lc_first_choice) == -1) {
         $ ('#textentry_hint-qdeck' + textentry_i_deck)
            .removeAttr ('disabled')
            .removeClass ('qwiz_button_disabled').show ();
      }
   }
   response (textentry_matches[textentry_i_deck]);
}
function menu_closed (e) {
   var i_card = deckdata[textentry_i_deck].i_card;
   var card = deckdata[textentry_i_deck].cards[i_card];
   var lc_entry = e.target.value.toLowerCase ();
   var n_hints = deckdata[textentry_i_deck].textentry_n_hints;
   if (lc_entry.length < n_hints) {
      var textentry_hint = card.all_choices[0].substr (0, n_hints);
      e.target.value = textentry_hint;
   }
   card.saved_textentry = e.target.value;
   if (! deckdata[textentry_i_deck].check_answer_disabled_b) {
      if (debug[6]) {
         console.log ('[menu_closed] textentry_matches[textentry_i_deck]: ', textentry_matches[textentry_i_deck]);
      }
      if (! lc_textentry_matches[textentry_i_deck]
           || lc_textentry_matches[textentry_i_deck].indexOf (lc_entry) == -1) {
         $ (button_flip_selector (textentry_i_deck)).addClass ('qwiz_button_disabled');
         deckdata[textentry_i_deck].check_answer_disabled_b = true;
         card.saved_textentry_ok = false;
      }
   }
   if (show_hint_timeout[textentry_i_deck]) {
      var $textentry = $ ('input.textentry-qdeck' + textentry_i_deck);
      var n_chars = $textentry.val ().length;
      var minlength = card.textentry_minlength;
      if (n_chars >= minlength) {
         clearTimeout (show_hint_timeout[textentry_i_deck]);
         show_hint_timeout[textentry_i_deck] = 0;
      }
   }
}
function menu_shown (e) {
   if (debug[0]) {
      console.log ('[menu_shown] textentry_i_deck:', textentry_i_deck, ', document_qwiz_user_logged_in_b:', document_qwiz_user_logged_in_b);
      console.log ('[menu_shown] deckdata[textentry_i_deck].record_start_b:', deckdata[textentry_i_deck].record_start_b);
   }
   if (deckdata[textentry_i_deck].record_start_b && document_qwiz_user_logged_in_b) {
      deckdata[textentry_i_deck].record_start_b = false;
      var now_sec = new Date ().getTime ()/1000.0;
      var data = {qrecord_id_ok: deckdata[textentry_i_deck].qrecord_id_ok, type: 'start', now_sec: now_sec, confirm: 'js'};
      record_qcard (textentry_i_deck, deckdata[textentry_i_deck].qrecord_id, data, true);
   }
   var lc_entry = e.target.value.toLowerCase ();
   var i_card  = deckdata[textentry_i_deck].i_card;
   var card = deckdata[textentry_i_deck].cards[i_card];
   var lc_first_choice = card.all_choices[0];
   if (lc_textentry_matches[textentry_i_deck].indexOf (lc_first_choice) != -1) {
      $ ('#textentry_hint-qdeck' + textentry_i_deck)
         .attr ('disabled', true)
         .addClass ('qwiz_button_disabled');
   }
   if (lc_textentry_matches[textentry_i_deck].indexOf (lc_entry) != -1) {
      var flip = q.qwizard_b && deckdata[i_deck].hide_flip_b ? 'Flip (click disabled)' : 'Check answer';
      $ (button_flip_selector (textentry_i_deck))
         .removeAttr ('disabled')
         .removeClass ('qwiz_button_disabled')
         .html (T (flip));
      card.check_answer = T (flip);
      deckdata[textentry_i_deck].check_answer_disabled_b = false;
   } else {
      card.check_answer = card.save_check_answer;
      $ (button_flip_selector (textentry_i_deck))
         .addClass ('qwiz_button_disabled')
         .html (card.check_answer);
      deckdata[textentry_i_deck].check_answer_disabled_b = true;
   }
}
this.item_selected = function (e) {
   $ (button_flip_selector (textentry_i_deck))
      .removeAttr ('disabled')
      .removeClass ('qwiz_button_disabled')
      .html (T ('Check answer'));
   deckdata[textentry_i_deck].check_answer_disabled_b = false;
   var i_card = deckdata[textentry_i_deck].i_card;
   var card = deckdata[textentry_i_deck].cards[i_card];
   if (e) {
      card.saved_textentry = e.target.value;
   }
   card.saved_textentry_ok = true;
}
this.keep_next_button_active = function () {
   next_button_active_b = true;
   $ ('button.got_it').attr ('disabled', false).removeClass ('qwiz_button_disabled');
   for (var ii_deck=0; ii_deck<n_decks; ii_deck++) {
      if (deckdata[ii_deck].hide_gotit_b) {
         $ ('button.next_card-qdeck' + ii_deck).attr ('disabled', false).removeClass ('qwiz_button_disabled');
      }
   }
}
function get_attr (htm, attr_name, plural_ok_b) {
   var attr_value = qqc.get_attr (htm, attr_name, plural_ok_b);
   if (plural_ok_b && ! attr_value) {
      attr_value = qqc.get_attr (htm, attr_name + 's');
   }
   return attr_value;
}
this.get_deckdata = function (i_deck, variable) {
   return deckdata[i_deck][variable];
}
this.set_deckdata = function (i_deck, variable, value) {
   if (i_deck == -1) {
      var s = variable + ' = ' + value;
      eval (s);
   } else {
      deckdata[i_deck][variable] = value;
   }
}
this.set_carddata = function (i_deck, i_card, variable, value, i_choice) {
   if (debug[0]) {
      console.log ('[set_carddata] i_card:', i_card, ', variable:', variable, ', value:', value);
   }
   if (typeof (i_choice) == 'undefined') {
      deckdata[i_deck].cards[i_card][variable] = value;
   } else {
      deckdata[i_deck].cards[i_card][variable][i_choice] = value;
   }
}
function T (string) {
   return qqc.T (string);
}
function plural (word, plural_word, n) {
   return qqc.plural (word, plural_word, n);
}
};
qcardf.call (qcard_);
/*! flip - v1.1.2 - 2016-10-20
* github.com/nnattawat/flip
* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
(function( $ ) {
  /*
   * Private attributes and method
   */
  var whichTransitionEvent = function() {
    var t, el = document.createElement("fakeelement"),
    transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  };
  /*
   * Model declaration
   */
  var Flip = function($el, options, callback) {
    this.setting = {
      axis: "y",
      reverse: false,
      trigger: "click",
      speed: 500,
      forceHeight: false,
      forceWidth: false,
      autoSize: true,
      front: '.front',
      back: '.back'
    };
    this.setting = $.extend(this.setting, options);
    if (typeof options.axis === 'string' && (options.axis.toLowerCase() === 'x' || options.axis.toLowerCase() === 'y')) {
      this.setting.axis = options.axis.toLowerCase();
    }
    if (typeof options.reverse === "boolean") {
      this.setting.reverse = options.reverse;
    }
    if (typeof options.trigger === 'string') {
      this.setting.trigger = options.trigger.toLowerCase();
    }
    var speed = parseInt(options.speed);
    if (!isNaN(speed)) {
      this.setting.speed = speed;
    }
    if (typeof options.forceHeight === "boolean") {
      this.setting.forceHeight = options.forceHeight;
    }
    if (typeof options.forceWidth === "boolean") {
      this.setting.forceWidth = options.forceWidth;
    }
    if (typeof options.autoSize === "boolean") {
      this.setting.autoSize = options.autoSize;
    }
    if (typeof options.front === 'string' || options.front instanceof $) {
      this.setting.front = options.front;
    }
    if (typeof options.back === 'string' || options.back instanceof $) {
      this.setting.back = options.back;
    }
    this.element = $el;
    this.frontElement = this.getFrontElement();
    this.backElement = this.getBackElement();
    this.isFlipped = false;
    this.init(callback);
  };
  /*
   * Public methods
   */
  $.extend(Flip.prototype, {
    flipDone: function(callback) {
      var self = this;
      self.element.one(whichTransitionEvent(), function() {
        self.element.trigger('flip:done');
        if (typeof callback === 'function') {
          callback.call(self.element);
        }
      });
    },
    flip: function(callback) {
      if (this.isFlipped) {
        return;
      }
      this.isFlipped = true;
      var rotateAxis = "rotate" + this.setting.axis;
      this.frontElement.css({
        transform: rotateAxis + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
        "z-index": "0"
      });
      this.backElement.css({
        transform: rotateAxis + "(0deg)",
        "z-index": "1"
      });
      this.flipDone(callback);
    },
    unflip: function(callback) {
      if (!this.isFlipped) {
        return;
      }
      this.isFlipped = false;
      var rotateAxis = "rotate" + this.setting.axis;
      this.frontElement.css({
        transform: rotateAxis + "(0deg)",
        "z-index": "1"
      });
      this.backElement.css({
        transform: rotateAxis + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
        "z-index": "0"
      });
      this.flipDone(callback);
    },
    getFrontElement: function() {
      if (this.setting.front instanceof $) {
        return this.setting.front;
      } else {
        return this.element.find(this.setting.front);
      }
    },
    getBackElement: function() {
      if (this.setting.back instanceof $) {
        return this.setting.back;
      } else {
        return this.element.find(this.setting.back);
      }
    },
    init: function(callback) {
      var self = this;
      var faces = self.frontElement.add(self.backElement);
      var rotateAxis = "rotate" + self.setting.axis;
      var perspective = self.element["outer" + (rotateAxis === "rotatex" ? "Height" : "Width")]() * 2;
      perspective = Math.max (perspective, 800);
      var elementCss = {
        'perspective': perspective,
        'position': 'relative'
      };
      var backElementCss = {
        "transform": rotateAxis + "(" + (self.setting.reverse ? "180deg" : "-180deg") + ")",
        "z-index": "0",
        "position": "relative"
      };
      var faceElementCss = {
        "backface-visibility": "hidden",
        "transform-style": "preserve-3d",
        "position": "absolute",
        "z-index": "1"
      };
      if (self.setting.forceHeight) {
        faces.outerHeight(self.element.height());
      } else if (self.setting.autoSize) {
        faceElementCss.height = '100%';
      }
      if (self.setting.forceWidth) {
        faces.outerWidth(self.element.width());
      } else if (self.setting.autoSize) {
        faceElementCss.width = '100%';
      }
      if ((window.chrome || (window.Intl && Intl.v8BreakIterator)) && 'CSS' in window) {
        elementCss["-webkit-transform-style"] = "preserve-3d";
      }
      faces.css(faceElementCss).find('*').not ('tbody').css({
        "backface-visibility": "hidden"
      });
      self.element.css(elementCss);
      self.backElement.css(backElementCss);
      setTimeout(function() {
        var speedInSec = self.setting.speed / 1000 || 0.5;
        faces.css({
          "transition": "all " + speedInSec + "s ease-out"
        });
        if (typeof callback === 'function') {
          callback.call(self.element);
        }
      }, 20);
      self.attachEvents();
    },
    clickHandler: function(event) {
      if (!event) { event = window.event; }
      if (this.element.find($(event.target).closest('button, a, input[type="submit"]')).length) {
        return;
      }
      if (this.isFlipped) {
        this.unflip();
      } else {
        this.flip();
      }
    },
    hoverHandler: function() {
      var self = this;
      self.element.off('mouseleave.flip');
      self.flip();
      setTimeout(function() {
        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
        if (!self.element.is(":hover")) {
          self.unflip();
        }
      }, (self.setting.speed + 150));
    },
    attachEvents: function() {
      var self = this;
      if (self.setting.trigger === "click") {
        self.element.on($.fn.tap ? "tap.flip" : "click.flip", $.proxy(self.clickHandler, self));
      } else if (self.setting.trigger === "hover") {
        self.element.on('mouseenter.flip', $.proxy(self.hoverHandler, self));
        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
      }
    },
    flipChanged: function(callback) {
      this.element.trigger('flip:change');
      if (typeof callback === 'function') {
        callback.call(this.element);
      }
    },
    changeSettings: function(options, callback) {
      var self = this;
      var changeNeeded = false;
      if (options.axis !== undefined && self.setting.axis !== options.axis.toLowerCase()) {
        self.setting.axis = options.axis.toLowerCase();
        changeNeeded = true;
      }
      if (options.reverse !== undefined && self.setting.reverse !== options.reverse) {
        self.setting.reverse = options.reverse;
        changeNeeded = true;
      }
      if (changeNeeded) {
        var faces = self.frontElement.add(self.backElement);
        var savedTrans = faces.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);
        faces.css({
          transition: "none"
        });
        var rotateAxis = "rotate" + self.setting.axis;
        if (self.isFlipped) {
          self.frontElement.css({
            transform: rotateAxis + (self.setting.reverse ? "(-180deg)" : "(180deg)"),
            "z-index": "0"
          });
        } else {
          self.backElement.css({
            transform: rotateAxis + (self.setting.reverse ? "(180deg)" : "(-180deg)"),
            "z-index": "0"
          });
        }
        setTimeout(function() {
          faces.css(savedTrans);
          self.flipChanged(callback);
        }, 0);
      } else {
        self.flipChanged(callback);
      }
    }
  });
  /*
   * jQuery collection methods
   */
  $.fn.flip = function (options, callback) {
    if (typeof options === 'function') {
      callback = options;
    }
    if (typeof options === "string" || typeof options === "boolean") {
      this.each(function() {
        var flip = $(this).data('flip-model');
        if (options === "toggle") {
          options = !flip.isFlipped;
        }
        if (options) {
          flip.flip(callback);
        } else {
          flip.unflip(callback);
        }
      });
    } else {
      this.each(function() {
        if ($(this).data('flip-model')) { // The element has been initiated, all we have to do is change applicable settings
          var flip = $(this).data('flip-model');
          if (options && (options.axis !== undefined || options.reverse !== undefined)) {
            flip.changeSettings(options, callback);
          }
        } else { // Init
          $(this).data('flip-model', new Flip($(this), (options || {}), callback));
        }
      });
    }
    return this;
  };
}( jQuery ));
