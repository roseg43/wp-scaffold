/**
 * Example-block
 * Custom title block -- feel free to delete
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import block from './block.json';

/* Uncomment for CSS overrides in the admin */
// import './index.css';

/**
 * Register block
 */
registerBlockType(block.name, {
	title: __('Author Byline'),
	description: __("Displays the post author as well as the author's avatar"),
	edit,
	save,
});
