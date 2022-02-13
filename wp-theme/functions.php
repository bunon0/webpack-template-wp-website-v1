<?php

function my_setup()
{
  add_theme_support("post-thumbnails");
  add_theme_support("automatic-feed-links");
  add_theme_support("title-tag");
  add_theme_support(
    "html5",
    array(
      "search-form",
      "comment-form",
      "comment-list",
      "gallery",
      "caption",
    )
  );
}
add_action("after_setup_theme", "my_setup");

function my_script_init()
{

  wp_enqueue_style('my_styles', get_template_directory_uri() . '/assets/css/styles.css', array(), '1.0.0', 'all');

  wp_enqueue_script('my_script', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'my_script_init');
