<?php
function qwiz_update_datasets ($html, $post_id, $prev_text, $qwizard_page) {
   global $qwiz_debug, $qwiz_options;
   $html = preg_replace ('/\[<code><\/code>([ql])/', '[$1', $html, -1, $count);
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_update_datasets] $count: ' . $count);
   }
   list ($qwiz_qdeck_poss, $qwiz_qdeck_lens, $qdata, $any_dataset_id_f,
         $any_no_dataset_id_f, $maker_session_id, $force_update_all)
                               = qwiz_parse_dataset_questions ($html, $post_id);
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_update_datasets] $force_update_all: ' . $force_update_all);
   }
   if (! $qdata || ! $qdata['htmls']) {
      if ($qwiz_debug[5]) {
         error_log ('[qwiz_update_datasets] $html:' . $html);
      }
      return $html;
   } else {
      if ($any_dataset_id_f) {
         if (! $force_update_all) {
            if ($post_id) {
               $prev_html = qwiz_get_previous_version ($post_id);
            } else {
               $prev_html = $prev_text;
            }
            if ($qwiz_debug[5]) {
               error_log ('[qwiz_update_datasets] prev_html: ' . $prev_html);
            }
            list ($u, $u, $prev_qdata, $prev_any_dataset_id_f, $u, $u, $u)
                                    = qwiz_parse_dataset_questions ($prev_html, 0);
            list ($qdata, $any_renumber_or_no_json_f)
                      = qwiz_compare_dataset_questions ($qdata, $prev_qdata,
                                                        $prev_any_dataset_id_f);
         } else {
            $n_questions = count ($qdata['dataset_ids']);
            for ($i_question=0; $i_question<$n_questions; $i_question++) {
               $qdata['new_modified'][$i_question] = true;
            }
            $any_renumber_or_no_json_f = true;
         }
      }
      if ($post_id) {
         $permalink = get_permalink ($post_id);
      } else {
         $permalink = $qwizard_page;
      }
      $dataset_ids_to_blank
                  = qwiz_find_deleted_dataset_questions ($permalink,
                                                         $qdata['dataset_ids']);
      if (count ($dataset_ids_to_blank)) {
         qwiz_blank_deleted_dataset_questions ($dataset_ids_to_blank, $qdata);
      }
      if ($any_no_dataset_id_f || $any_renumber_or_no_json_f) {
         qwiz_update_dataset_ids ($qwiz_qdeck_poss, $qwiz_qdeck_lens, $qdata,
                                  $html);
      }
      $qwiz_syntax_check_manual_only = '';
      if (isset ($qwiz_options['qwiz_syntax_check_manual_only'])) {
         $qwiz_syntax_check_manual_only = $qwiz_options['qwiz_syntax_check_manual_only'];
      }
      if ($qwiz_debug[0]) {
         error_log ('[qwiz_update_datasets] $qdata[\'new_modified\']: ' . print_r ($qdata['new_modified'], true));
         error_log ('[qwiz_update_datasets] $qwiz_syntax_check_manual_only: ' . $qwiz_syntax_check_manual_only);
      }
      if ($qdata['new_modified']) {
         if ($maker_session_id) {
            qwiz_dataset_questions_to_db ($qdata, $post_id, $maker_session_id,
                                          $permalink);
         } else {
            if ($qwiz_syntax_check_manual_only) {
               $update_msg = 'Warning: dataset questions/cards not added to/updated in Qwizcards database.  '
                             . 'Click the "Q" icon and select "Check shortcode syntax, save dataset questions"';
            } else {
               $update_msg = 'Warning: dataset questions/cards not added to/updated in Qwizcards database.  '
                             . 'You must log in to do so.  Please click the "Q" icon. ';
            }
            if ($post_id) {
               qwiz_save_dataset_update_msg ($post_id, $update_msg);
            }
         }
      }
   }
   return $html;
}
function qwiz_parse_dataset_questions ($html, $post_id) {
   global $qwiz_debug;
   if ($post_id) {
      list ($maker_session_id, $qwizzes_questions, $qdecks_cards)
                                             = qwiz_get_dataset_json ($post_id);
      if ($qwiz_debug[5]) {
         error_log ('[qwiz_parse_dataset_questions] $qwizzes_questions: ' . print_r ($qwizzes_questions, true));
      }
   } else {
      $qwizzes_questions = '';
      $qdecks_cards      = '';
      $maker_session_id  = '';
   }
   $any_dataset_id_f    = false;
   $any_no_dataset_id_f = false;
   $qwiz_qdeck_poss = array ();
   $qwiz_qdeck_lens = array ();
   $qdata = array ('i_qwiz_qdecks'          => array (),
                   'i_qwiz_qdeck_questions' => array (),
                   'htmls'                  => array (),
                   'jsons'                  => array (),
                   'qwiz_qdecks'            => array (),
                   'datasets'               => array (),
                   'dataset_ids'            => array (),
                   'question_numbers'       => array (),
                   'units'                  => array (),
                   'topics'                 => array (),
                   'difficulties'           => array (),
                   'new_modified'           => array ()
                  );
   $i_qwiz_qdeck   = 0;
   $i_qwiz         = 0;
   $i_deck         = 0;
   $remaining_html = $html;
   $n_before_remaining = 0;
   while (preg_match ('/(\[qwiz|\[qdeck)[^\]]*?\sdataset="([^"]+)/',
                      $remaining_html, $matches, PREG_OFFSET_CAPTURE)) {
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $matches: ' . print_r ($matches, true));
      }
      $i_qwiz_qdeck_question = 0;
      $remaining_html_qwiz_deck_pos = $matches[0][1];
      $qwiz_qdeck_pos               = $n_before_remaining + $remaining_html_qwiz_deck_pos;
      $qwiz_qdeck                   = $matches[1][0];
      $dataset                      = $matches[2][0];
      $remaining_html = substr ($remaining_html, $remaining_html_qwiz_deck_pos);
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $remaining_html: ' . $remaining_html);
      }
      $n_before_remaining += $remaining_html_qwiz_deck_pos;
      $offset = strpos ($remaining_html, ']');
      $m = preg_match ('/((<[^\/][^>]*>\s*)*?)(\[q\]|\[q )/', $remaining_html,
                       $question_card_matches, PREG_OFFSET_CAPTURE, $offset);
      if ($m) {
         $questions_cards_pos = $question_card_matches[1][1];
         $opening_tags = $question_card_matches[1][0];
         $img_input_match_f = preg_match ('/.*<(img|input)[^>]+>\s*/', $opening_tags,
                                          $img_input_matches);
         if ($img_input_matches) {
            if ($qwiz_debug[6]) {
               error_log ('[qwiz_parse_dataset_questions] $question_card_matches: ' . print_r ($question_card_matches, true));
               error_log ('[qwiz_parse_dataset_questions] $opening_tags: ' . print_r ($opening_tags, true));
               error_log ('[qwiz_parse_dataset_questions] $img_input_matches: ' . print_r ($img_input_matches, true));
            }
            $questions_cards_pos += strlen ($img_input_matches[0]);
         }
      } else {
         error_log ('[qwiz_parse_dataset_questions] $remaining_html: ' . $remaining_html);
         $remaining_html = '';
      }
      $qwiz_qdeck_shortcode = substr ($remaining_html, 0, $questions_cards_pos);
      $default_unit       = qwiz_get_attr ($qwiz_qdeck_shortcode, 'unit');
      $default_topic      = qwiz_get_attr ($qwiz_qdeck_shortcode, 'topic');
      $default_difficulty = qwiz_get_attr ($qwiz_qdeck_shortcode, 'difficulty');
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $qwiz_qdeck_shortcode: ' . $qwiz_qdeck_shortcode);
         error_log ('[qwiz_parse_dataset_questions] $default_unit: ' . $default_unit);
      }
      $remaining_html = substr ($remaining_html, $questions_cards_pos);
      $n_before_remaining += $questions_cards_pos;
      $end_match_f = preg_match ('/(\[\/qwiz\]|\[\/qdeck\])/', $remaining_html,
                                 $end_matches, PREG_OFFSET_CAPTURE);
      $end_questions_cards_pos = $end_matches[0][1];
      $qwiz_qdeck_end = $n_before_remaining + $end_questions_cards_pos;
      $qwiz_qdeck_html = substr ($remaining_html, 0, $end_questions_cards_pos);
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $end_matches: ' . print_r ($end_matches, true));
         error_log ('                               $qwiz_qdeck_html: ' . $qwiz_qdeck_html);
      }
      $remaining_html = substr ($remaining_html, $end_questions_cards_pos);
      $n_before_remaining += $end_questions_cards_pos;
      $qwiz_qdeck = substr ($qwiz_qdeck, 1);
      $qwiz_qdeck_len = $qwiz_qdeck_end - $qwiz_qdeck_pos;
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $qwiz_qdeck_len: ' . $qwiz_qdeck_len);
         error_log ('                               strlen ($qwiz_qdeck_html): ' . strlen ($qwiz_qdeck_html));
      }
      $qwiz_qdeck_poss[] = $qwiz_qdeck_pos;
      $qwiz_qdeck_lens[] = $qwiz_qdeck_len;
      $pieces = preg_split ('/((<[^\/][^>]*>\s*)*?)(\[q\]|\[q [^\]]+\]|\[x\])/',
                            $qwiz_qdeck_html, 0, PREG_SPLIT_NO_EMPTY);
      $n_splits
          = preg_match_all ('/((<[^\/][^>]*>\s*)*?)(\[q\]|\[q [^\]]+\]|\[x\])/',
                            $qwiz_qdeck_html, $splitters, PREG_PATTERN_ORDER);
      if ($qwiz_debug[6]) {
         error_log ('[qwiz_parse_dataset_questions] $pieces:    ' . print_r ($pieces, true));
         error_log ('[qwiz_parse_dataset_questions] $splitters: ' . print_r ($splitters, true));
      }
      if ($n_splits) {
         $splitters = $splitters[0];
      } else {
         $splitters = [''];
      }
      $n_pieces = count ($pieces);
      $i_piece  = 0;
      $question_html = '';
      for ($i_piece=0; $i_piece<$n_pieces; $i_piece++) {
         $piece    = $pieces[$i_piece];
         $splitter = $splitters[$i_piece];
         if (strpos ($splitter, '[x]') !== false) {
            continue;
         }
         $question_html .= $splitter;
         $dataset_id = qwiz_get_attr ($splitter, 'dataset_id');
         if ($dataset_id) {
            preg_match ('/[^|]+/', $dataset_id, $dmatches);
            $id_dataset_name = $dmatches[0];
            if ($id_dataset_name != $dataset) {
               $dataset_id = '';
               $any_no_dataset_id_f = true;
            } else {
               $any_dataset_id_f = true;
            }
         } else {
            $any_no_dataset_id_f = true;
         }
         $question_number = qwiz_get_attr ($splitter, 'question_number');
         $unit            = qwiz_get_attr ($splitter, 'unit');
         if (! $unit) {
            $unit = $default_unit;
         }
         $topic           = qwiz_get_attr ($splitter, 'topic');
         if (! $topic) {
            $topic = $default_topic;
         }
         $difficulty      = qwiz_get_attr ($splitter, 'difficulty');
         if (! $difficulty) {
            $difficulty = $default_difficulty;
         }
         if ($i_piece == $n_pieces - 1) {
            if (substr ($piece, -7) == '[/qwiz]') {
               $i_remove = 7;
            } else if (substr ($piece, -8) == '[/qcard]') {
               $i_remove = 8;
            } else {
               $i_remove = 0;
            }
            if ($i_remove) {
               $piece = substr ($piece, 0, -$i_remove);
            }
         }
         $question_html .= $piece;
         if ($i_piece + 1 < $n_pieces) {
            $next_splitter = $splitters[$i_piece+1];
            $img_input_match_f = preg_match ('/.*<(img|input)[^>]+>/',
                                             $next_splitter, $img_input_matches);
            if ($img_input_match_f) {
               $question_html .= $img_input_matches[0];
               $splitters[$i_piece+1] = str_replace ($img_input_matches[0], '', $next_splitter);
               if ($qwiz_debug[6]) {
                  error_log ('[qwiz_parse_dataset_questions] $img_input_matches[0]: ' . $img_input_matches[0]);
               }
            }
         }
         if ($post_id != 0) {
            $question_html = preg_replace ('/(\[q\s[^\]]*?)(\s*json=.true.\s*)*([^\]]*\])/', '$1json="true" $3', $question_html);
         }
         $qdata['i_qwiz_qdecks'][]          = $i_qwiz_qdeck;
         $qdata['i_qwiz_qdeck_questions'][] = $i_qwiz_qdeck_question;
         $qdata['htmls'][]                  = $question_html;
         $qdata['qwiz_qdecks'][]            = $qwiz_qdeck;
         $qdata['datasets'][]               = $dataset;
         $qdata['dataset_ids'][]            = $dataset_id;
         $qdata['question_numbers'][]       = $question_number;
         $qdata['units'][]                  = $unit;
         $qdata['topics'][]                 = $topic;
         $qdata['difficulties'][]           = $difficulty;
         if ($qwiz_qdeck == 'qwiz') {
            if ($qwiz_debug[5]) {
               error_log ("[qwiz_parse_dataset_questions] i_qwiz: $i_qwiz, i_qwiz_qdeck_question: $i_qwiz_qdeck_question");
            }
            if ($qwizzes_questions) {
               $qdata['jsons'][]            = $qwizzes_questions[$i_qwiz][$i_qwiz_qdeck_question];
            } else {
               $qdata['jsons'][]            = '';
            }
         } else {
            if ($qwiz_debug[5]) {
               error_log ("[qwiz_parse_dataset_questions] i_deck: $i_deck, i_qwiz_qdeck_question: $i_qwiz_qdeck_question");
            }
            if ($qdecks_cards) {
               $qdata['jsons'][]            = $qdecks_cards[$i_deck][$i_qwiz_qdeck_question];
            } else {
               $qdata['jsons'][]            = '';
            }
         }
         $i_qwiz_qdeck_question++;
         $question_html = '';
      }
      $i_qwiz_qdeck++;
      if ($qwiz_qdeck == 'qwiz') {
         $i_qwiz++;
      } else {
         $i_deck++;
      }
   }
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_parse_dataset_questions] $qwiz_qdeck_poss: ' . print_r ($qwiz_qdeck_poss, true));
      error_log ('[qwiz_parse_dataset_questions] $qdata: ' . print_r ($qdata, true));
      error_log ('[qwiz_parse_dataset_questions] $any_dataset_id_f: ' . $any_dataset_id_f);
      error_log ('[qwiz_parse_dataset_questions] $any_no_dataset_id_f: ' . $any_no_dataset_id_f);
      error_log ('[qwiz_parse_dataset_questions] $maker_session_id: ' . $maker_session_id);
   }
   $force_update_all = false;
   if ($i_qwiz) {
      $n_qwizzes = $i_qwiz;
      $n_qwizzes_questions = count ((array) $qwizzes_questions);
      if ($n_qwizzes_questions > $n_qwizzes) {
         $force_update_all = true;
      }
      if ($qwiz_debug[5]) {
         error_log ('[qwiz_parse_dataset_questions] $n_qwizzes: ' . $n_qwizzes . ', n_qwizzes_questions: ' . $n_qwizzes_questions);
      }
   } else if ($i_deck) {
      $n_decks = $i_deck + 1;
      $n_qdecks_cards = count ((array) $qdecks_cards);
      if ($n_qdecks_cards > $n_decks) {
         $force_update_all = true;
      }
   }
   return array ($qwiz_qdeck_poss, $qwiz_qdeck_lens, $qdata, $any_dataset_id_f, $any_no_dataset_id_f, $maker_session_id,
                 $force_update_all);
}
function qwiz_compare_dataset_questions ($qdata, $prev_qdata, $prev_any_dataset_id_f) {
   global $qwiz_debug, $qwiz_options;
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_compare_dataset_questions] $qdata: ' . print_r ($qdata, true));
      error_log ('[qwiz_compare_dataset_questions] $prev_qdata: ' . print_r ($prev_qdata, true));
   }
   $qwiz_syntax_check_manual_only = '';
   if (isset ($qwiz_options['qwiz_syntax_check_manual_only'])) {
      $qwiz_syntax_check_manual_only = $qwiz_options['qwiz_syntax_check_manual_only'];
   }
   $any_renumber_or_no_json_f = false;
   $n_questions = count ($qdata['dataset_ids']);
   for ($i_question=0; $i_question<$n_questions; $i_question++) {
      $dataset_id = $qdata['dataset_ids'][$i_question];
      if ($dataset_id) {
         $i_prev_question = false;
         if ($prev_any_dataset_id_f) {
            $i_prev_question = array_search ($dataset_id, $prev_qdata['dataset_ids']);
         }
         $question_number_change_f = false;
         $no_json_f                = false;
         if ($i_prev_question !== false) {
            $question_number      = $qdata['question_numbers'][$i_question];
            $prev_question_number = $prev_qdata['question_numbers'][$i_prev_question];
            if (! $question_number || $question_number != $prev_question_number) {
               $qdata['new_modified'][$i_question] = true;
               $question_number_change_f = true;
               $qdata['question_numbers'][$i_question] = $i_question + 1;
            }
            $n = preg_match ('/json=.true./', $prev_qdata['htmls'][$i_prev_question]);
            if (! $n) {
               $no_json_f = true;
            }
            if ($question_number_change_f || $no_json_f) {
               $any_renumber_or_no_json_f = true;
            } else {
               if ($qwiz_syntax_check_manual_only) {
                  $qdata['new_modified'][$i_question] = true;
               } else {
                  $html      = $qdata['htmls'][$i_question];
                  $prev_html = $prev_qdata['htmls'][$i_prev_question];
                  if ($qwiz_debug[5] && $i_question == 0) {
                     error_log ('[qwiz_compare_dataset_questions] $html: ' . $html);
                     error_log ('[qwiz_compare_dataset_questions] $prev_html: ' . $prev_html);
                  }
                  if ($html != $prev_html) {
                     $qdata['new_modified'][$i_question] = true;
                  }
               }
            }
         } else {
            $qdata['new_modified'][$i_question] = true;
            $any_renumber_or_no_json_f = true;
            if ($qwiz_debug[5]) {
               error_log ('[qwiz_compare_dataset_questions] not there - $i_question: ' .$i_question);
            }
         }
      }
   }
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_compare_dataset_questions] $qdata[\'new_modified\']: ' . print_r ($qdata['new_modified'], true));
      error_log ('[qwiz_compare_dataset_questions] $any_renumber_or_no_json_f: ' . $any_renumber_or_no_json_f);
   }
   return array ($qdata, $any_renumber_or_no_json_f);
}
function qwiz_update_dataset_ids ($qwiz_qdeck_poss, $qwiz_qdeck_lens,
                                                              &$qdata, &$html) {
   global $qwiz_debug;
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_update_dataset_ids] $qwiz_qdeck_poss: ' . print_r ($qwiz_qdeck_poss, true));
      error_log ('[qwiz_update_dataset_ids] $qdata: ' . print_r ($qdata, true));
   }
   $n_questions = count ($qdata['dataset_ids']);
   $prev_qwiz_qdeck = -1;
   for ($i_question=$n_questions-1; $i_question>=0; $i_question--) {
      $i_qwiz_qdeck = $qdata['i_qwiz_qdecks'][$i_question];
      if ($i_qwiz_qdeck == -1) {
         continue;
      }
      if ($i_qwiz_qdeck != $prev_qwiz_qdeck) {
         if ($qwiz_debug[5]) {
            error_log ('[qwiz_update_dataset_ids] $i_qwiz_qdeck: ' . $i_qwiz_qdeck);
         }
         if ($prev_qwiz_qdeck != -1) {
            $html = $before_qwiz_qdeck . $qwiz_qdeck_html . $after_qwiz_qdeck;
         }
         $qwiz_qdeck_pos = $qwiz_qdeck_poss[$i_qwiz_qdeck];
         $qwiz_qdeck_len = $qwiz_qdeck_lens[$i_qwiz_qdeck];
         $before_qwiz_qdeck = substr ($html, 0, $qwiz_qdeck_pos);
         $qwiz_qdeck_html   = substr ($html, $qwiz_qdeck_pos, $qwiz_qdeck_len);
         $after_qwiz_qdeck  = substr ($html, $qwiz_qdeck_pos + $qwiz_qdeck_len);
         $prev_qwiz_qdeck = $i_qwiz_qdeck;
         $n_matches = preg_match_all ('/\[q\]|\[q [^\]]+\]/', $qwiz_qdeck_html,
                                      $matches, PREG_OFFSET_CAPTURE, PREG_SET_ORDER);
         if ($qwiz_debug[5]) {
            error_log ('[qwiz_update_dataset_ids] $qwiz_qdeck_html: ' . substr ($qwiz_qdeck_html, 0, 200) . "\n ...\n " . substr ($qwiz_qdeck_html, -200));
            error_log ('[qwiz_update_dataset_ids] $matches: ' . print_r ($matches, true));
         }
      }
      $i_qwiz_qdeck_question = $qdata['i_qwiz_qdeck_questions'][$i_question];
      $shortcode = $matches[0][$i_qwiz_qdeck_question][0];
      $pos       = $matches[0][$i_qwiz_qdeck_question][1];
      $len = strlen ($shortcode);
      $before = substr ($qwiz_qdeck_html, 0, $pos);
      $after  = substr ($qwiz_qdeck_html, $pos + $len);
      $jsons_i = $qdata['jsons'][$i_question];
      if (isset ($jsons_i['question_attributes'])) {
         $json_question_attributes = $jsons_i['question_attributes'];
      } else {
         $json_question_attributes = '';
      }
      if (! $qdata['dataset_ids'][$i_question]) {
         $dataset_id = qwiz_create_dataset_id ($qdata['datasets'][$i_question]);
         $qdata['dataset_ids'][$i_question] = $dataset_id;
         $qdata['new_modified'][$i_question] = true;
         $new_dataset_attr = 'dataset_id="' . $dataset_id . '"';
         if (strpos ($shortcode, 'dataset_id=') !== false) {
            $shortcode                = preg_replace ('/dataset_id="[^"]+"/', $new_dataset_attr, $shortcode);
            $json_question_attributes = preg_replace ('/dataset_id="[^"]+"/', $new_dataset_attr, $json_question_attributes);
         } else {
            $shortcode                 = substr ($shortcode, 0, -1) . ' ' . $new_dataset_attr . ']';
            $json_question_attributes .= ' ' . $new_dataset_attr;
         }
      }
      $i_question_number = $qdata['i_qwiz_qdeck_questions'][$i_question] + 1;
      $new_question_number_attr = 'question_number="' . $i_question_number . '"';
      if (strpos ($shortcode, 'question_number=') !== false) {
         $old_shortcode = $shortcode;
         $shortcode                = preg_replace ('/question_number="[^"]+"/', $new_question_number_attr, $shortcode);
         $json_question_attributes = preg_replace ('/question_number="[^"]+"/', $new_question_number_attr, $json_question_attributes);
         if ($shortcode != $old_shortcode) {
            $qdata['new_modified'][$i_question] = true;
         }
      } else {
         $shortcode                 = substr ($shortcode, 0, -1) . ' ' . $new_question_number_attr . ']';
         $json_question_attributes .= ' ' . $new_question_number_attr;
         $qdata['new_modified'][$i_question] = true;
      }
      $qdata['question_numbers'][$i_question] = $i_question_number;
      $shortcode = preg_replace ('/(\[q\s[^\]]*?)(\s*json=.true.\s*)*([^\]]*\])/', '$1json="true" $3', $shortcode);
      $qwiz_qdeck_html = $before . $shortcode . $after;
      $qdata['htmls'][$i_question] = preg_replace ('/\[q\]|\[q [^\]]+\]/', $shortcode,
                                                   $qdata['htmls'][$i_question]);
      $qdata['jsons'][$i_question]['question_attributes'] = $json_question_attributes;
   }
   $html = $before_qwiz_qdeck . $qwiz_qdeck_html . $after_qwiz_qdeck;
   if ($qwiz_debug[6]) {
      error_log ('[qwiz_update_dataset_ids] $html: ' . $html);
   }
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_update_dataset_ids] $qdata[\'dataset_ids\']: ' . print_r ($qdata['dataset_ids'], true));
      error_log ('[qwiz_update_dataset_ids] $qdata[\'new_modified\']: ' . print_r ($qdata['new_modified'], true));
   }
}
function qwiz_create_dataset_id ($dataset) {
   $dataset_name = preg_replace ('/["|]/', '', $dataset);
   $string = microtime ();
   $string = substr ($string, 2, 6) . substr ($string, 11);
   $int_microtime = $string + 0;
   $dataset_id = $dataset_name . '|' . sprintf ('%x', $int_microtime);
   return $dataset_id;
}
function qwiz_blank_deleted_dataset_questions ($dataset_ids_to_blank, &$qdata) {
   foreach ($dataset_ids_to_blank as $dataset_id) {
      $i_pos = strpos ($dataset_id, '|');
      $dataset = substr ($dataset_id, 0, $i_pos);
      $i_question = count ($qdata['datasets']);
      $qdata['new_modified'][$i_question] = true;
      $qdata['i_qwiz_qdecks'][]          = -1;
      $qdata['i_qwiz_qdeck_questions'][] = '';
      $qdata['htmls'][]                  = '';
      $qdata['jsons'][]                  = '';
      $qdata['qwiz_qdecks'][]            = '';
      $qdata['datasets'][]               = $dataset;
      $qdata['dataset_ids'][]            = $dataset_id;
      $qdata['question_numbers'][]       = '';
      $qdata['units'][]                  = '';
      $qdata['topics'][]                 = '';
      $qdata['difficulties'][]           = '';
   }
}
function qwiz_parse_qrecord_ids ($html) {
   global $qwiz_debug;
   $n_matches = preg_match_all ('/(\[qwiz|\[qdeck)[^\]]*?\sqrecord_id\s*=\s*"[^"]+[\s\S]*?(\[\/qwiz\]|\[\/qdeck\])/',
                                $html, $matches, PREG_SET_ORDER);
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_parse_qrecord_ids] $matches: ' . print_r ($matches, true));
   }
   if (! $n_matches) {
      return array ('', '', '');
   }
   $qrecord_ids            = array ();
   $use_dataset_datasets   = array ();
   $qrecord_id_n_questions = array ();
   for ($i_qwiz_qdeck=0; $i_qwiz_qdeck<$n_matches; $i_qwiz_qdeck++) {
      $match = $matches[$i_qwiz_qdeck][0];
      $shortcode_end_pos = strpos ($match, ']');
      if ($shortcode_end_pos === false) {
         $shortcode = '';
      } else {
         $shortcode = substr ($match, 0, $shortcode_end_pos);
      }
      $qrecord_id    = qwiz_get_attr ($shortcode, 'qrecord_id');
      $use_dataset   = qwiz_get_attr ($shortcode, 'use_dataset');
      $qrecord_ids[] = $qrecord_id;
      if ($use_dataset) {
         $use_dataset_datasets[] = $use_dataset;
         $qrecord_id_n_questions[$qrecord_id] = '';
      } else {
         $use_dataset_datasets[] = '';
         $qrecord_id_n_questions[$qrecord_id] = array ();
         $default_unit = qwiz_get_attr ($shortcode, 'unit');
         if ($qwiz_debug[5]) {
            error_log ("[qwiz_parse_qrecord_ids] qrecord_id: $qrecord_id, default_unit: $default_unit");
         }
         $n_q_matches = preg_match_all ('/\[q\]|\[q\s[^\]]*/', $match, $q_matches);
         if ($qwiz_debug[5]) {
            error_log ('[qwiz_parse_qrecord_ids] q_matches: ' . print_r ($q_matches, true));
         }
         for ($i_question=0; $i_question<$n_q_matches; $i_question++) {
            $unit = qwiz_get_attr ($q_matches[0][$i_question], 'unit');
            if (! $unit) {
               $unit = $default_unit;
            }
            if (! isset ($qrecord_id_n_questions[$qrecord_id][$unit])) {
               $qrecord_id_n_questions[$qrecord_id][$unit] = 0;
            }
            $qrecord_id_n_questions[$qrecord_id][$unit]++;
         }
      }
   }
   if ($qwiz_debug[5]) {
      error_log ('[qwiz_parse_qrecord_ids] $qrecord_ids: ' . print_r ($qrecord_ids, true));
      error_log ('[qwiz_parse_qrecord_ids] $use_dataset_datasets: ' . print_r ($use_dataset_datasets, true));
      error_log ('[qwiz_parse_qrecord_ids] $qrecord_id_n_questions: ' . print_r ($qrecord_id_n_questions, true));
   }
   return array ($qrecord_ids,
                 $use_dataset_datasets,
                 $qrecord_id_n_questions);
}
