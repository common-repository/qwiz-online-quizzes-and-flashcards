=== Qwizcards | online quizzes and flashcards ===
Contributors: dan_kirshner
Tags: interactive quiz, quiz, flashcards, labeled diagrams
Tested up to: 6.6
Stable tag: 3.89
License: GPL2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Create quizzes and flashcard decks using an interactive WYSIWYG editor; record scores

== Description ==
Online quizzes and flashcards for WordPress.  Qwizcards lets you create fill-in-the-blank questions with "autocomplete" suggestion lists.  You can include images, and labels that can be dragged-and-dropped to hot-spot targets on the images.  Qwizcards includes progress and reporting features -- students can log in when they take a quiz, and you can get score reports by student.  See <a href="https://qwizcards.net">https://qwizcards.net</a>

An interactive what-you-see-is-what-you-get (WYSIWYG) "wizard" makes it easy to create quizzes and flashcard decks, and/or you can edit the shortcodes directly.  Online demo: <a href="https://qwizcards.net/wizard">https://qwizcards.net/wizard</a>

In the WordPress Block Editor, open a Classic paragraph or block and click the "Q" icon to get started!  (In either the "Block Editor" or the "Classic Editor" you may have to click the "Toolbar Toggle" icon to see the "Q" - it's in the second row.)

== Installation ==
Dashboard > Plugins > Add New

In the WordPress Block editor, open a Classic paragraph or block and click the "Q" icon to get started!

== Screenshots ==

== Changelog ==

= 3.89 =
2024-08-14
Qwizcards wizard compatibility with WordPress 6.6 block editor.
Multiple-choice mobile formatting fixed for break-separated choice input.
Settings > Qwizcards: translate-strings fixes; option to show all phrases.

= 3.88 =
2023-10-11
reshow_after="" option.
display_pay_screen="subscribe" option.

= 3.87 =
2023-08-25
Add missing strings-to-translate.
Fix spacing when custom-sized flashcard decks on page.
Timed quiz dataset - finishing a subset is not sufficient for leaderboard.
Dataset edit > update - check for duplicate dataset IDs.

= 3.86 =
2023-04-15
Option for "Got it!" always active - "Skip".
Option for force-update dataset questions.

= 3.85 =
2023-02-20
Settings option for automatic login based on WordPress user's role.

= 3.84 =
2023-01-13
Wizard fix - "add question/card" option for new quiz/deck.

= 3.83 =
2023-01-08
Fix for datasets on remote servers -- wp_unslash ().

= 3.82 =
2022-12-22
Fix for back-first card flip.

= 3.81 =
2022-12-20
Wizard - speed-ups for large quizzes/decks, and options for > 100 cards.
Wizard - add option to show/hide summary in exit text.
Option to show card backs first, or front/back randomly first.
Periodic table widget.

= 3.80 =
2022-11-20
Allow both a quiz/deck timer and question/card time limits on a quiz or deck.

= 3.79 =
2022-11-17
Fix card time limit.

= 3.78 =
2022-11-17
Flashcard deck timer (deck_timer="true")
Latex-MathJax shortcodes ([qlatex], [qlatexinline]).
Limit number of questions shown for a quiz/deck on a teacher-specific basis.

= 3.77 =
2022-10-22
Fixes to dataset parsing.

= 3.76 =
2022-10-20
Fix problem with updates to posts.
Add pop-up help, etc. to WP admin bar menu for Qwizcards.
Fixes to hangman labeled diagrams; color-matched fields/words in WP editor.

= 3.75 =
2022-08-17
Fix feedback/show next-question button when hangman hint used in a quiz.

= 3.74 =
2022-08-13
Fix compatibility with Publish / pre-publish check in Block Editor.

= 3.73 =
2022-08-04
Fix quiz feedback -- number incorrect.

= 3.72 =
2022-07-29
Options for questions_to_show/cards_to_show.
Compatibility with Block Editor (WordPress v. 6.01).
Fix wizard input text fields (dataset, qrecord_id) -- weren't allowing input.
Visibility of "Show me the answer" button text in WordPress editor and wizard.

= 3.71 =
2022-07-17
Restore specified width after full-screen and back.
Qwizcards settings - option to see all translatable phrases.
Longer phrases for translation -- so can alter word order.
Improvements in scaling for small screens.

= 3.70 =
2022-05-14
Hotspot options - borders, highlighting.
Option for default normal font-weight on flashcards.
Leaderboard option for "everyone".
Leaderboard - enter initials, emojis.
Leaderboard - option for teachers to delete entries.

= 3.69 =
2022-02-21
Fix mobile flashcards display, especially right-to-left language.
Better scaling of desktop and mobile quizzes and flashcards.
Fix globals debug vars, global server vars.
Fix dataset json question attributes save.

= 3.68 =
2022-02-06
Fix errors in qwiz_update_datasets.
Incorporate hints used in hangman feedback.

= 3.67 =
2022-02-05
Try to recover from unmatched pairs (qwizcards-plugin.php).
Errors on Publish/Update for flashcards.
Handle non-Qwizcards instances of init_tinymce.js

2022-02-04
Handle Twenty-Twenty-Two theme post excerpts (search, etc.).
"Request assign to classes" user dialog.
"Teachers only: assign to classes" user menu option.
Hotspot sparsemap option.
Quiz/deck-specific show/hide full-screen icon.

= 3.66 =
2022-01-04
Relax wp-includes/formatting.php preg_split backtrack_limit.
Settings: provide list of phrases to translate.
Inline choices: default spacing.
Hangman: more incorrect letters; but don't show word.

= 3.65 =
2021-11-22
Fastest finish times leaderboard/graph.
Hotspot diagram wizard fixes/improvements.

= 3.64 =
2021-11-02
Additional hotspot diagram user interactions, options.
Hotspot labels resizable.
Fix selecting units to do in datasets.
Fix error in wizard for flashcard decks re: timed (quizzes only!).

= 3.63 =
2021-10-15
Question/card time limit option.
Quiz elapsed time display option.
Datasets behave the same as use_dataset="" quizzes/decks.

= 3.62 =
2021-10-07
Hotspot diagrams.
Browse dataset questions improvements.
Further security fixes.

= 3.61 =
2021-09-27
Fix vulnerability in Settings > Qwizcards-content HTML element(s).

= 3.60 =
2021-09-16
Handle prism.js and highlight.js code highlighting on delayed loads (flashcards and datasets).
Fix problem with image-only question choice (need something other than tags).
Sanitize translation strings input on qwiz_admin.

= 3.59 =
2021-08-08
Fix bug/type in flashcards audio/video player initialization (mediaelementplayer).

= 3.58 =
2021-05-31
Hangman labeled diagrams: show "Type letters..." on first hangman label.
Hangman labeled diagrams: labels are draggable in WordPress editor (outside wizard).

= 3.57 =
2021-03-07
Show dataset number of questions, number correct when no topics.
Simplify "this quiz is not assigned to your class" message.
Improve multiple-choice formating, especially datasets/feedback.
"Try again?" button on slow dataset loads.

= 3.56 =
2021-01-24
If no syntax check each page, show any errors in console.
Catch "no choice marked correct" errors in wizard.
Don't let process_choice () get called on incorrect nesting (stopPropagation).
Restore question count.
Fix audio flip on first card.
Fix drag ("unscale") on rescaled labeled diagrams.
Accommodate bottom toolbar on Firefox mobile.

= 3.55 =
2020-12-30
Accommodate changed label of WP 5.6 Block editor "More tools & options" button.
Syntax check each page default = off; admin option to change.
Labeled diagram elements - Chrome "inset" to "top: ... left:" for Safari.
Rescale too-large images/labels to fit container.
More complete preview; additional options.
Option to turn off hangman "Type letters in box" callout.
Discount by school automatically applied.
Fix wizard z-index issues (bubblebar, Gutenberg sidebar).

= 3.54 =
2020-11-11
Admin option for manual syntax check only.
Improved Publish/Update.

= 3.53 =
2020-10-28
Preview quizzes option for licensed teachers.
Fix dataset and recording dialogs in wizard.
Secure quizzes in test mode.
"Not logged in" warning message.
Wizard questions from database: insert question as editable text, not link.
Units/topics search of database questions.
Style compatibility with WordPress 2020 Theme.

= 3.52 =
2020-06-21
Option for align="tiled" and spacing="20".
Option - hide_qwizcards_icon
[simply-random] shortcodes.

= 3.51 =
2020-06-06
Back-forward buttons.
Fix show textentry autocomplete suggestions on mobile (z-index).
Fix - no vertical centering of tall flashcard on mobile.
Restore force jQuery load option.
Fix enter-intercept conflict with WordPress Search entry.
Fix browse dataset questions/cards (qjax_bypass).

= 3.50 =
2020-05-17
Options for flip direction, Flip, Got-it, Shuffle buttons.
Smaller flashcard buttons on mobile.
Fix random="false" with use_dataset.
Fix json data save for new dataset questions.

= 3.49 =
2020-04-07
Fix "enable progress recording" -- qrecord_id not sent from qwizzled.js
Progress for single quiz/deck -- fix zero questions result (send qrecord_id).

= 3.48 =
2020-03-30
Re-initialize mp3-jplayer on new flashcards.

= 3.47 =
2020-03-21
Fix qwizzled jjax.

= 3.46 =
2020-03-20
Make sure qwiz/qdeck images have opacity = 1 (workaround theme fade-in).
Add class mjp-s-wrapper to audio player click-disabled list in qwizcards.js
Fix qwizzled replace_smart_quotes.

= 3.45 =
2020-03-17
Override theme's button width: 100%.
Wider qwizard menu for some themes.
Improve hint-button positioning.
Fix textentry choices: show in suggestions list.

= 3.44 =
2020-03-12
Handle unicode characters in qjax when no bypass.

= 3.43 =
2020-03-08
Don't run dbdelta () (database table structure update) if not needed.
Count information-only questions as "correct."
Display_pay_screen="register" option.
Feedback option on qwiz user login menu.
Show/hide password.
Warning if question/flashcard score not recorded.

= 3.42 =
2020-01-20
Hangman labeled diagram quiz questions and flashcards.
Compatibility with Gutenberg update.
Resolve conflicts with WordPress editor link-insert searches, Media Library image editing.

= 3.41 =
2019-11-20
Fix card flip - no brief show of next back.
Full use of qjax; add WP_error_object catches.
New free-trial license; confirm email for free trial.

= 3.40 =
2019-09-29
Fix editing in Gutenberg - allow "bogus" breaks except in Wizard.
Higher-resolution icons.
Login -> New student - registration process is local; finishes with auto-login.

= 3.39 =
2019-09-14
Correct positioning of mobile div (fixed, not absolute).
Improve unique identification of questions/cards for recording scores.

= 3.38 =
2019-09-13
Add qbutton style to disabled "Need more practice" and "Got it" buttons.
Improve styling of textentry suggestions when other jquery-ui.css present.

= 3.37 =
2019-09-08
Enroll in school/class menu option for independent students.
Background image for quiz questions.
Wizard - fix tinymce bubblebar.
Feedback on dataset questions updated in Block Editor.
[no_click_flip] shortcode.
No flip on click for "Compact WP Audio Player".

= 3.36 =
2019-07-11
Fix bug in flashcard flip.

= 3.35 =
2019-07-10
Improve flashcard flip.

= 3.34 =
2019-07-03
Revise Publish/Update (overlay to intercept click).
Handle angle-quotes (French, Spanish) in attributes.

= 3.33 =
2019-06-22
Allow [restart] for single-question quizzes and in multiple-choice feedback.
Allow re-do of labeled diagram in single-question quiz.
Fix scroll="true", card_back="none" for card backs.
Bypass Mod_security issues in question and card text (via encode).

= 3.32 =
2019-03-09
Support Qwizcards editing menu/Wizard in Gutenberg classic paragraphs/blocks.
Improved handling of audio/video/media embed in editor(s), Wizard.

= 3.30 =
2019-01-23
Multiple hangman fields per question/card.
Check for quiz/flashcard errors on "Publish" or "Update".
Pay-quiz/deck options.
New card "flip" code, especially "backface-visibility".
Option for no summary ("Congratulations, you're done...") on quizzes.

= 3.29 =
2018-02-19
Fix: "incorrect login; please try again" message not showing.
Do not alter images inside caption shortcodes (delayed load scheme).

= 3.28 =
2018-01-29
Browse dataset questions: changes for demo use.
Single-card deck with buttons: fix "Got it" infinite loop.
Single-card deck with required textentry: show buttons.
Fix for changed TinyMCE selected_text behavior (labeled diagrams).
Add link to admin registration to login display.
Fix flashcard backside scrolling.

= 3.27 =
2018-01-16
Fix document_qwiz_username undefined check - lost from 3.25 in 3.26.

= 3.26 =
2018-01-14
Use fallback (simple) flip in Chrome - all platforms.
Flashcards - initialize mediaelement.js (audio/video shortcodes) each card.
Full dictionary for suggestions available on Qwizcards wizard user pages.
"Save as dataset" option available to students in online wizard.
Qwizcards wizard user pages option to set page/tab title.

= 3.25 =
2017-11-26
"Embed codes" options in online wizard (http://qwizcards.com/wizard).

2017-11-14
Option to "Browse dataset questions" in wizard.
Fix http:/https: issues.

= 3.24 =
2017-08-31
Fix wizard eating spaces at end of text on input.
Wizard labeled diagrams: text-as-target option.
Avoid triggering Firefox "insecure" warnings for user logins.
Register-for-class-by-code option.

= 3.23 =
2017-07-27
Fix labeled diagrams editing in WordPress editor.
"Clone question/card" feature in wizard.

= 3.22 =
2017-07-09
Fixes - "legacy" labeled diagrams, wizard resizable targets.
Fix - labeled diagram "Change Image" getting 0 x 0 width x height.
Fix - inserting labeled diagram trying to get canvas html that isn't there.
Properly parse blocks having <br /> and <hr /> with attributes (style, class).
Allow <Enter> to do card flip when simple textentry box has focus.

= 3.21 =
2017-07-06
Fixes to wizard, including Add Media and correct insertion of typed text
(without click on editing field).

= 3.20 =
2017-06-24
Page load speedup - delay image loads, question/card processing until displayed.
Use dataset intro - options for spaced repetition, new, old questions/cards.
Use dataset new default: questions/cards in source order (previously: random).
Single-card flashcard deck -- no buttons/progress; only click to flip.
Comments ([!] ... [/!]) remain visible in wizard.

= 3.19 =
2017-05-06
Wizard - more options (enable progress recording, scroll vs. expand); fixes.
Flashcards - scroll= option.
Datasets - mark deleted in database when deleted from dataset source.
Preview - all at once - in instructor view of student-created quizzes/decks.

= 3.18 =
2017-01-27
Wizard - fix quiz/deck initial style setting.
Wizard - add width and height options.

= 3.17 =
2017-01-26
Wizard starts with choosing first question/card (default no intro).
Fix wizard - problem editing existing deck with [qdeck] attributes.
Border options in wizard.

= 3.16 =
2017-01-15
Wizard - user-specified directory name and page name.
"Forgot password?" - mail link to reset-password page.
Card-back option.
"My account" settings page.
Wizard for flashcards.
Dataset intro on/off option.

= 3.13 (renamed to 3.15) =
2016-09-11
Exit mobile icon, option for no-go mobile.
Spaced repetition for datasets.
Qwiz wizard beta.
Dataset/use dataset for flashcards.

= 3.12 =
2016-05-11
Refresh option for leaderboard.
Handle video/audio embeds - flashcards and datasets.
"pre-qwizzled.js" - don't load editing menu javascript unless needed.

= 3.11 =
2016-04-23
Register quizzes/decks - wasn't allowing flashcard decks to be registered.

= 3.10 =
2016-04-20
Hangman "hint" button.
Leaderboard.
Datasets -- create and use via edit menu.

= 3.03 =
2016-01-28
No-suggestions textentry -- suggest="false" option.
"My progress" option on user menu -- progress bars by unit.
Fix multi-site updating of textentry suggestions dictionary.

= 3.02 =
2015-12-22
"Got it!" and "Need more practice" for "show-the-answer" type question.
Format login, other for Twentysixteen theme.
Fix login -> question view mobile/non-mobile.

= 3.01 =
2015-12-14
Disable [textentry] after answer.
Quizzes: do not require topic for information-only question.
[textentry plural="true"] works for dictionary words.
Quizzes: blur hangman focus on complete so <Return> can trigger next-button click.
Mobile view, including click-click alternative to drag-and-drop.
Default options for use_dict and use_terms on Settings > Qwizcards admin page.
Qwiz icon - link to sharing.
Usermenu icon - quizzes shifted with bounces in WordPress 4.4.  Fix.
Quiz/deck registration - fix URL capture in WordPress 4.4.

= 3.00 =
2015-10-25
Progress recording/reporting.
Fix - <Enter> working for login.
Check if quiz or deck with qrecord_id registered.
Check if user will get credit for quiz or deck.
Login option to register (independent student).
Timeout/warning for login session expiration.
"Forgot password?" link.
[qscores] - link to login/view scores.
[hangman].
Dictionary for textentry suggestions.
[qwiz] or [qdeck] attribute: "align=" (center or right).
[textentry] attributes: "single_char=...", "use_terms=...", "use_dict=...".

= 2.35 =
2015-10-08
Information-only "question."
"Create a decoy target" option.
Class "summary" --> "qwiz_summary" (interfered with, e.g., WooCommerce).

= 2.33 =
2015-08-31
Correction to usage count collection frequency.

= 2.32 =
2015-08-31
Mouseenter starts timer for show hint on first card of no-intro quiz or deck.
Flashcard fix - Firefox focus-blur (for keydown event) BEFORE textentry focus.
Flip front/back on click.
Record page hits, quiz/deck hits.  Opt-out/in on Settings > Qwizcards.
Set WordPress default image links option to "none".

= 2.31 =
2015-06-27
Fix bug - labels were getting pre-placed after "Take quiz again".

= 2.30 =
2015-06-26
Team login.
Login timeout.
Check that attributes have a value given in double quotes.
Set textentry minlength for short answer choices.
Let zero-length entry metaphones match zero-length term metaphones.
Required-input textentry "Check answer" text changes with entry state.
<Enter> works for "Check answer", "Next question", and "Login".
[fx] feedback applies to all incorrect choices.
Hint button appears after timeout, or after gray "Check answer" click.
Qwiz settings option for hint-button timeout.
On re-do of a labeled diagram, restore previously-correctly-placed labels.
Fix bug - labeled diagrams - "Next" button not showing.

= 2.29 =
2015-04-26
Word-wrap normal for labels (problem in Firefox).
Don't use <code></code> for already-wrapped [q] and [l].
Fix bug -- hint required matching first character.
textentry minlength= option.
Sort numeric for textentry suggestions.
Login/recording capabilities.
topic= for flashcards.
Recording for flashcards.
Briefer topic summary report for quizzes (matches flashcards topic summary).

= 2.28 =
2015-02-03
"the_content" filter: allow JavaScript to detect mismatched [qwiz]-[/qwiz] pairs.
Error messages returned from qwiz_qcards_common.js.
Correct content='body' for standalone flashcard decks.
Resize flashcard front/back to larger of two (including alternate textentry backs).
Hide Qwiz icon when autocomplete starts.
Remove resizing handles in labeled diagrams (now have images that would show).
Free-form input ([textentry]) with suggestions/hints for quizzes and flashcards.
Create qwiz_qcards_common.js to hold common code.
random="true" option for quizzes.

= 2.27 =
2015-01-05
Make sure labeled-diagram questions contain matching opening/closing divs.
Just count targets, not labels.
Toolbar option - keep "next" button active.
Check for allow_url_fopen, check version number.
Don't increment number of cards reviewed until "Check answer"/flip.
Feedback interleaved with choices, optional.

= 2.26 =
2014-12-21
Avoid clobbering other plugins' events - WP content filter creates divs for each qwiz/qdeck - rewrite only those divs.
On back side of card, "Flip"/"Check answer" -> "Flip back".
Gray-out/disable "Need more practice" and "Got it!" until user clicks "Check answer".
Take xqwiz sizing div out of flow.


= 2.25 =
2014-12-16
Fix search for any [qwiz] or [qdeck] shortcodes.
Reorder flashcard buttons, default translation: "Flip" -> "Check answer".

= 2.24 =
2014-12-15
Alternate edit-area iframe id: wpb_tinymce_content_ifr.
Make $ (= jQuery) private.
Use jQuery rather than $ in qwizscripts.js.

= 2.23 =
2014-12-13
Explicit visible/hidden for card front/back. (Chrome backface-visibility?)

= 2.22 =
2014-12-07
Multiple targets for a single label.
Accommodate image resizing (resize wrapper, reposition targets).
Tolerate whitespace before [h].
Fix check for paragraph with header plus something else -- don't delete.
Qwiz icon within <td> - keep the icon inside the border.
Reinstate containment for labels -- by table size.
qtarget_sibs-... instead of text_target_wrapper (except for backwards compatibility).
Don't allow draggable labels to be "underneath" already-placed labels.
Keep [!] comments at end of labeled-diagram question outside the question div.
Fix: made headers into labels.

= 2.21 =
2014-12-02
Workaround for Firefox 33.1 problem with long regular expression and long
string in intro parse.

= 2.20 =
2014-11-20
Handle "smart quotes" in attributes.

= 2.19 =
2014-11-19
Hide shortcodes until finished processing.
Option to deploy beta.
Add "Q #1/4" to labeled diagram progress.


= 2.18 =
2014-11-16
Admin/settings: beta capability, revert capability.
More backwards compatibility fixes (labeled diagrams assoc_id).
Move comments ([!] ... [/!] after labels, delete trailing whitespace in labels.

= 2.17 =
2014-11-13
Bug fix - "text before intro"

= 2.16 =
2014-11-12
Delete question and label divs with nothing in them.
Nicer formatting of labeled diagram borders in editor.
Delete <br> in header.
Separate out "Got it!" from summary text.
Editing: improve backwards compatibility with data- (identify labels having targets).

= 2.15 =
2014-11-09
Nicer qwiz icon, hover effect.  Hide icon with flip.
Ignore empty paragraphs when no [i]: handle multiple paragraphs.
Fix choice highlighting when multiple choices within one paragraph.
Admin page: option to hide qwiz icon, or display without link, option to 
change content div location; option to replace button labels.
Handle left- and right-double-quotes in labels="top", etc.
Flashcards: correct sizing of larger of front and back (border showing through in
Firefox).

= 2.14 =
2014-11-04
Restore missing double quote -- couldn't split on labeled diagrams.

= 2.13 =
2014-11-04
Delete php closing tags in .php files.

= 2.12 =
2014-11-03
A few minor fixes.

= 2.11 =
2014-11-03
Use classes for labeled-diagram target/label borders - avoid "flash" on page
load.  (Fixes newly-created labeled diagrams only.)
Ignore empty paragraphs (with "&nbsp;") in intro without "[i]".
Qwiz icon/link on intro or first question only.
If labeled diagram is wide, reset qwiz div/borders to match.
'div.container' as content option.
Use class "qtarget_assocNNN..." instead of data-...; some implementations
eat data-...

= 2.10 =
2014-10-28
Fix topic= for labeled diagram questions.
Add labels="top", etc. options for labeled diagram questions.

= 2.09 =
2014-10-12
Fix "Mode" not showing after labeled diagram.
Labeled diagram not "correct" until labels placed correctly on first try.
Add random="true" option for flashcard decks - initial order randomized.
Warn/prevent use of images with captions for labeled diagrams.
A few more strings for internationalization.

= 2.08 =
2014-10-05
Add internationalization - use .po and .mo files.
Add div.post-entry as page content location.

= 2.07 =
2014-10-01
Suppress errors, delete source in page/post excerpts.

= 2.06 =
2014-09-29
Bug fix - lost "next" button.

= 2.05 =
2014-09-29
Apply gray-out to label children, too (overwrite specific settings).
[qwizdemo] tags in qwizcards.js, too.

= 2.04 =
2014-09-29
Labels list vertical-align top.
Fix label placement progress when multiple quizzes.
-webkit-user-select none - improves Android Chrome drag.
[qwizdemo] tags.

= 2.03 =
2014-09-26
Vertical-center labels in targets.
jquery.ui.touch-punch for phone drag-and-drop.

= 2.02 =
2014-09-21
Re-initialize diagrams (to clone of orig) on restart.
Restart button correct in sinqle-question labeled diagram.

= 2.01 =
2014-09-16
Fix highlighting of choices when no intro.
If question with only one choice, "Show the answer" button, not radio. 
Modify menu header for Safari on Mac.

= 2.00 =
2014-09-14
Position targets where click.
Error message if no questions when click menu.
Raise menu z-index (TinyMCE 4.0).
"Took n tries" feedback on labeled diagram.
Border around labels; labels bulleted.

= 1.1b05 =
2014-09-12
While editing, mark bottom border of labeled-diagram question.
Cancel fadeout of instruction if new click.
In labeled diagrams, ignore max-width of images set by WordPress.
Make WordPress consistent in use of standard box-sizing model.
Position editing menu fixed.

= 1.1b01-4 =
2014-09-07
Labeled-diagrams capability, including interactive editing.
Chrome on Mac: fallback for Flashcards; others: prevent sub/sup showing 
through.
Don't focus on textarea if first Flashcard initially displayed.

= 1.02 =
2014-08-16
Turn off debugs!

= 1.01 =
2014-08-16
Remove paragraph marks and headers that contain only [!] ... [/!] comments.  Paragraph marks that remained after comments were deleted were taking space.

qwizcards: Remove breaks after textentry.

qwizcards: Remove spacing/margins from back side.

= 1.0 =
Initial WordPress release 2014-07-31

