import GetExpandedChildWidth from './GetExpandedChildWidth.js';
import GetExpandedChildHeight from './GetExpandedChildHeight.js';
import ResizeGameObject from '../utils/ResizeGameObject.js';
import GlobZone from '../../../plugins/utils/align/GlobZone.js';

const AlignIn = Phaser.Display.Align.In.QuickSet;

var Layout = function (parent, newWidth, newHeight) {
    // Skip invisible sizer
    if (!this.visible) {
        return this;
    }

    this.layoutInit(parent);

    // Set size
    if (newWidth === undefined) {
        newWidth = Math.max(this.childrenWidth, this.minWidth);
    }
    if (newHeight === undefined) {
        newHeight = Math.max(this.childrenHeight, this.minHeight);
    }
    this.resize(newWidth, newHeight);

    // Layout children
    var child, childConfig, padding;
    var startX = this.left,
        startY = this.top;
    var x, y, width, height; // Align zone
    var newChildWidth, newChildHeight;

    // Layout current page
    child = this.currentPage;
    if (child) {
        childConfig = child.rexSizer;
        padding = childConfig.padding;

        // Set size
        if (child.isRexSizer) {
            child.layout(
                this,
                GetExpandedChildWidth(this, child),
                GetExpandedChildHeight(this, child));
        } else {
            newChildWidth = undefined;
            newChildHeight = undefined;
            if (childConfig.expand) { // Expand height
                newChildHeight = this.height - padding.top - padding.bottom;
                newChildWidth = this.width - padding.left - padding.right;
            }
            ResizeGameObject(child, newChildWidth, newChildHeight);
        }

        // Set position
        x = (startX + padding.left);
        width = this.width - padding.left - padding.right;
        y = (startY + padding.top);
        height = this.height - padding.top - padding.bottom;
        GlobZone.setPosition(x, y).setSize(width, height);
        AlignIn(child, GlobZone, childConfig.align);
        this.resetChildState(child);
    }

    // Layout background children
    this.layoutBackgrounds();

    return this;
}

export default Layout;