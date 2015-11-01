(function(context) {

  /**
   *
   * @param element {Element|{getClientRects: Function}}
   * @param [offsetParent] {Element}
   * @returns {{top: number, left: number, height: number, width: number}[]}
   */
  var getDomElementClientRectangles = function (element, offsetParent) {

    var rectangles = [];
    var body = document.body;
    var docElement = document.documentElement;
    //TODO for all browsers need polyfill https://github.com/mathiasbynens/document.scrollingElement
    var scrollingElement = document['scrollingElement'] || body;

    var rootScrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var rootScrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;

    var rootClientTop = docElement.clientTop || body.clientTop || 0;
    var rootClientLeft = docElement.clientLeft || body.clientLeft || 0;

    var elementRectangles = element.getClientRects();


    if (offsetParent) {

      var offsetParentBox = offsetParent.getBoundingClientRect();
    }

    for (var i = 0; i != elementRectangles.length; i++) {

      var rectangle = elementRectangles[i];
      var top;
      var left;

      if (offsetParent) {

        top = rectangle.top + rootScrollTop - offsetParentBox.top + offsetParent.scrollTop - rootClientTop;
        left = rectangle.left + rootScrollLeft - offsetParentBox.left + offsetParent.scrollLeft - rootClientLeft;

      } else {

        top = rectangle.top + rootScrollTop - rootClientTop;
        left = rectangle.left + rootScrollLeft - rootClientLeft;
      }
      if (scrollingElement !== offsetParent) {

        top = top - scrollingElement.scrollTop;
        left = left - scrollingElement.scrollLeft;
      }
      rectangles.push({
        top: top,
        left: left,
        height: rectangle.height,
        width: rectangle.width
      });
    }

    return rectangles;
  };

  if (typeof module !== 'undefined') {
    /**
     *
     * @type {getDomElementClientRectangles|Function}
     */
    module.exports = getDomElementClientRectangles;

  } else {

    if (typeof define === 'function' && define.amd) {

      define(function() {return getDomElementClientRectangles;});
    }
    context.domElementClientRectangles = getDomElementClientRectangles;
  }


}(this));
