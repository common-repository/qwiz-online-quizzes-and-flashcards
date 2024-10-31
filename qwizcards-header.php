<?php
/**
 * Plugin Name: Qwizcards | online quizzes and flashcards
 * Plugin URI: http://qwizcards.net
 * Description: Easy online quizzes and flashcards - interactive editor
 * Version: 3.89
 * Author: Dan Kirshner
 * Author URI: https://qwizcards.net
 * License: GPL2
 */

/*  Copyright 2023  Dan Kirshner  (email : dan_kirshner@yahoo.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

$qp_f = true;
if (! isset ($sp_f)) {
   $sp_f = false;
}

// Debug and server loc settings - vary with environment.
require_once 'globals.php';
require_once 'qwizcards-plugin.php';
