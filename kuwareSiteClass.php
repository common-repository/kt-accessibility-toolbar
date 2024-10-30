<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class KTAT_Site {
    function __construct() {
        add_action( 'wp_enqueue_scripts', [$this, 'ktat_site_scripts'] );
        add_action( 'wp_head', [$this, 'ktat_toolbarPopup'] );
    }

    /**
     * the plugin instance
     */
    private static $instance = NULL;

    /**
     * get the plugin instance
     *
     * @return Kuware Accessibility Toolbar
     */
    public static function get_instance() {
        if ( NULL === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    function ktat_site_scripts() {
        $ktat_enable = ( get_option( 'ktat_enable', 0 ) == 1 ) ? true : false;
        if ($ktat_enable == 1) {   
            wp_enqueue_style( 'preconnect', 'https://fonts.gstatic.com', array(), null ); 
            wp_enqueue_style( 'twd-googlefonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap', array(), null ); 
            wp_enqueue_style('custom_style', KTAT_PLUGIN_URL . 'css/custom_style.css');
            wp_enqueue_script('custom_script', KTAT_PLUGIN_URL . 'js/custom_script.js', array('jquery'));      
                
        }         
    }

    function ktat_is_elementor(){
        if(class_exists('\Elementor\Plugin')){
            return \Elementor\Plugin::$instance->editor->is_edit_mode() || \Elementor\Plugin::$instance->preview->is_preview_mode();
        }
        return false;
    }

    function ktat_toolbarPopup() {
        $ktat_enable = ( get_option( 'ktat_enable', 0 ) == 1 ) ? true : false;
        if ($ktat_enable == 1) {
            require_once('toolbar.php');
        }
    }

}
