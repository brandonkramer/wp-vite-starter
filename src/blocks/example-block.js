/**
 * JS for the example block
 */
import './example-block.pcss';
import blockMeta from './example-block.json';

const {registerBlockType} = wp.blocks; // Registers a new block.
const {useBlockProps, RichText} = wp.blockEditor; // React hook that is used to mark the block wrapper element.
const {__} = wp.i18n; // Retrieves the translation of text.

/**
 * Registers the block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(blockMeta.name, {
    ...blockMeta, ...{
        edit: ({attributes, setAttributes}) => {
            {
                return (
                    <div {...useBlockProps()}>
                        <p>
                            {__(
                                'My Awesome Block - Hello from the editor!',
                                'my-custom-project'
                            )}
                        </p>
                        <RichText
                            tagName="p"
                            onChange={(newContent) => setAttributes({content: newContent})}
                            allowedFormats={['core/bold', 'core/italic']}
                            value={attributes.content}
                            placeholder={__('Write your text...')}
                        />
                    </div>
                );
            }
        },
    }
});