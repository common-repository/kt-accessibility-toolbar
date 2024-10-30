<?php
/**
 * Plugin Name: KT Accessibility Toolbar
 * Plugin URI:  https://kuware.com
 * Description: This plug-in helps to improve the common accessibility problems in WordPress themes.
 * Version: 	1.0
 * Author:      Kuware Team
 * Author URI:  https://kuware.com/about-us/about/
 * License: 	GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: KT Accessibility Toolbar
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

define('KTAT_TITLE', 'KT Accessibility Toolbar');
define('KTAT_PLUGIN_URL', plugin_dir_url(__FILE__));

if (is_admin()) {
    require_once('kuwareAdminClass.php');
    $kuAdmin = new KTAT_Admin();
} else {
    require_once('kuwareSiteClass.php');
    $KuSite = new KTAT_Site();
}
