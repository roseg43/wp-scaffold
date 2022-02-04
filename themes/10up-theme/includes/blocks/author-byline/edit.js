/* eslint-disable prettier/prettier */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Spinner, ColorPalette } from '@wordpress/components';
import { useSelect } from '@wordpress/data';


/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                                The block props.
 * @param {Object}   props.attributes                     Block attributes.
 * @param {string}   props.attributes.showAvatar          Whether or not to show the author's avatar
 * @param {string}	 props.attributes.avatarBorderColor   Color to use for the border around the avatar
 * @param {string}   props.className                      Class name for the block.
 * @param {Function} props.setAttributes                  Sets the value for block attributes.
 * @return {Function} Render the edit screen
 */
const colorPaletteColors = [
	{
	name: 'Apricot',
	className: 'is-border-style-apricot',
	color: '#FFCAB1',
	},
	{
	name: 'Cadet Blue',
	className: 'is-border-style-cadet-blue',
	color: '#69A2B0',
	},
	{
		name: 'Russian Green',
		className: 'is-border-style-russian-green',
		color: '#659157',
	},
	{
		name: 'Olivine',
		className: 'is-border-style-olivine',
		color: '#A1C084',
	},
	{
		name: 'Paradise Pink',
		className: 'is-border-style-paradise-pink',
		color: '#E05263',
	},

];


/**
 * Gets the name of a color in the color palette based on its value.
 *
 * @param {string} colorVal A hex code that matches one of the defined colors in the palette
 * @return {string} The name of the color
 */
const lookupColorClassNameByValue = (colorVal) => {
	return colorPaletteColors.find(colorOption => colorOption.color === colorVal)?.className;
};

/**
 * Gets the value of a color in the color palette based on its classname.
 *
 * @param {string} colorClassName A string that matches the classname of one of the defined colors in the palette
 * @return {string} The hex value of the color
 */
const lookupColorValueByClassName = (colorClassName) => {
	return colorPaletteColors.find(colorOption => colorOption.className === colorClassName)?.color;
}

const AuthorByline = ({ attributes: { showAvatar, avatarBorderColor }, className, setAttributes }) => {

	// Get avatar border color to pass into the ColorPalette
	const avatarBorderColorHex = lookupColorValueByClassName(avatarBorderColor);

	// Get Author info
	const { author } = useSelect('core/editor').getCurrentPost();
	const postAuthor = useSelect((select) => {
		const authors = select('core').getUsers({ who: 'authors', include: [author]});
		// Return only the author object
		return Array.isArray(authors) && authors[0];
	}, [author]);

	return (
  <div className={className}>
    { !postAuthor && (<Spinner />) }
    { postAuthor && (
    <>
      { showAvatar && (
      <figure className={`wp-block-tenup-author-byline__gravatar wp-block-image is-style-rounded ${avatarBorderColor}`}>
        <img
          src={postAuthor?.avatar_urls['96']}
          alt={`Gravatar of ${postAuthor.name}`}
          width="96"
          height="96"
        />
      </figure>
			)}
      <h3 className="wp-block-tenup-author-byline__author-name">{postAuthor.name}</h3>
    </>
		)}
    <InspectorControls>
      <PanelBody>
        <ToggleControl
          label={__('Show author avatar')}
          checked={showAvatar}
          onChange={() => setAttributes({ showAvatar: !showAvatar })}
        />
        <ColorPalette
          colors={colorPaletteColors}
          disableCustomColors="true"
          value={avatarBorderColorHex}
          onChange={(newValue) => setAttributes({avatarBorderColor: lookupColorClassNameByValue(newValue)})}
        />
      </PanelBody>
    </InspectorControls>
  </div>
	);
};
export default AuthorByline;
