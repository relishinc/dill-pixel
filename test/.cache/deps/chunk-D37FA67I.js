import {
  isMobile
} from "./chunk-IF2C3KLE.js";
import {
  AbstractBitmapFont,
  BitmapFontManager,
  Cache,
  CanvasTextMetrics,
  Graphics,
  GraphicsContext,
  HTMLTextStyle,
  ImageSource,
  LoaderParserPriority,
  MeshGeometry,
  NineSliceGeometry,
  PlaneGeometry,
  Polygon,
  Resolver,
  TextStyle,
  VideoSource,
  convertToList,
  copySearchParams,
  detectVideoAlphaMode,
  isSingleItem,
  measureHtmlText,
  path
} from "./chunk-AYLFXNJK.js";
import {
  AbstractRenderer,
  ApplicationInitHook,
  Filter
} from "./chunk-ULUUGPA3.js";
import {
  Bounds,
  Color,
  Container,
  DOMAdapter,
  ExtensionType,
  Geometry,
  GlProgram,
  GpuProgram,
  Matrix,
  ObservablePoint,
  Point,
  Rectangle,
  RendererType,
  Sprite,
  State,
  Texture,
  TexturePool,
  TextureSource,
  Ticker,
  UPDATE_PRIORITY,
  UniformGroup,
  ViewContainer,
  __commonJS,
  __toESM,
  assignWithIgnore,
  bgr2rgb,
  definedProps,
  deprecation,
  eventemitter3_default,
  extensions,
  getGlobalBounds,
  require_earcut,
  v8_0_0,
  warn
} from "./chunk-5TVQ26FI.js";

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function assign(target, source7) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source7) {
        if (Object.prototype.hasOwnProperty.call(source7, key)) {
          target[key] = source7[key];
        }
      }
      return target;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see DOMParser.SupportedType.isHTML
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * Helper method to check a mime type if it indicates an HTML document
       *
       * @param {string} [value]
       * @returns {boolean}
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/html`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * Checks if `uri` equals `NAMESPACE.HTML`.
       *
       * @param {string} [uri]
       *
       * @see NAMESPACE.HTML
       */
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign;
    exports.find = find;
    exports.freeze = freeze;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    var conventions = require_conventions();
    var find = conventions.find;
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input) return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt2 = Class.prototype;
      if (!(pt2 instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt2, t2);
        Class.prototype = pt2 = t2;
      }
      if (pt2.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt2.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message) this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
       * @standard level1
       */
      length: 0,
      /**
       * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
       * @standard level1
       * @param index  unsigned long
       *   Index into the collection.
       * @return Node
       * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      },
      /**
       * @private
       * @param {function (Node):boolean} predicate
       * @returns {Node[]}
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * @private
       * @param {Node} item
       * @returns {number}
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls2 = list._refresh(list._node);
        __set__(list, "length", ls2.length);
        if (!list.$$length || ls2.length < list.$$length) {
          for (var i = ls2.length; i in list; i++) {
            if (Object.prototype.hasOwnProperty.call(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls2, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
      //for level2
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
       * The different implementations fairly diverged in what kind of features were reported.
       * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
       *
       * @deprecated It is deprecated and modern browsers return true in all cases.
       *
       * @param {string} feature
       * @param {string} [version]
       * @returns {boolean} always true
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates an XML Document object of the specified type with its document element.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
       * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string|null} namespaceURI
       * @param {string} qualifiedName
       * @param {DocumentType=null} doctype
       * @returns {Document}
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
       *
       * __This behavior is slightly different from the in the specs__:
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string} qualifiedName
       * @param {string} [publicId]
       * @param {string} [systemId]
       * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
       * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      // Modified in DOM Level 2:
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      // Modified in DOM Level 2:
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      // Introduced in DOM Level 2:
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      // Introduced in DOM Level 2:
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
       *
       * @param {string | null} namespaceURI
       * @returns {string | null}
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (Object.prototype.hasOwnProperty.call(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
      this.ownerDocument = this;
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns2 = newAttr.namespaceURI;
      if (ns2 === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns2 = newAttr.namespaceURI;
      if (ns2 === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs2 = el.childNodes;
        if (newChild) {
          cs2[cs2.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs2[i++] = child;
            child = child.nextSibling;
          }
          cs2.length = i;
          delete cs2[cs2.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
      ) {
        throw new DOMException(
          HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild2 = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    function _appendSingleChild(parentNode, newChild) {
      if (newChild.parentNode) {
        newChild.parentNode.removeChild(newChild);
      }
      newChild.parentNode = parentNode;
      newChild.previousSibling = parentNode.lastChild;
      newChild.nextSibling = null;
      if (newChild.previousSibling) {
        newChild.previousSibling.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      //implementation : null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @readonly
       * @type DocumentType
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      // Introduced in DOM Level 2:
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * The `getElementsByClassName` method of `Document` interface returns an array-like object
       * of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
       *
       *
       * Warning: This is a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls2 = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls2.push(node);
                  }
                }
              }
            });
          }
          return ls2;
        });
      },
      //document factory method:
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text2();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      //four real opeartion method
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls2 = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls2.push(node);
            }
          });
          return ls2;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls2 = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls2.push(node);
            }
          });
          return ls2;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text2() {
    }
    Text2.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text2, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns2 = visibleNamespaces[i];
        if (ns2.prefix === prefix) {
          return ns2.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai2 = 0; ai2 < attrs.length; ai2++) {
              if (attrs.item(ai2).name === "xmlns") {
                defaultNS = attrs.item(ai2).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(
            node.data.replace(/[<&>]/g, _xmlEncoder)
          );
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        if (Object.prototype.hasOwnProperty.call(node, n)) {
          var v2 = node[n];
          if (typeof v2 != "object") {
            if (v2 != node2[n]) {
              node2[n] = v2;
            }
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.DocumentType = DocumentType;
    exports.DOMException = DOMException;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Node = Node;
    exports.NodeList = NodeList;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: "\n",
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source7, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(
          source7,
          defaultNSMap,
          entityMap,
          domBuilder,
          this.errorHandler
        );
        domBuilder.endDocument();
      }
    };
    function parse(source7, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k2 = a2.slice(1, -1);
        if (Object.hasOwnProperty.call(entityMap, k2)) {
          return entityMap[k2];
        } else if (k2.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k2.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source7.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m3) {
        while (p >= lineEnd && (m3 = linePattern.exec(source7))) {
          lineStart = m3.index;
          lineEnd = lineStart + m3[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source7.indexOf("<", start);
          if (tagStart < 0) {
            if (!source7.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source7.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source7.charAt(tagStart + 1)) {
            case "/":
              var end = source7.indexOf(">", tagStart + 3);
              var tagName = source7.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config3 = parseStack.pop();
              if (end < 0) {
                tagName = source7.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config3.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config3.localNSMap;
              var endMatch = config3.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config3.tagName && config3.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config3.uri, config3.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                      domBuilder.endPrefixMapping(prefix);
                    }
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config3.tagName);
                }
              } else {
                parseStack.push(config3);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source7, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source7, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source7, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source7, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source7, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source7, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source7.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source7.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source7.slice(start, p);
              }
              start = p + 1;
              p = source7.indexOf(c, start);
              if (p > 0) {
                value = source7.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source7.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source7.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source7.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source7.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source7.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source7.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source7.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source7.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns2 = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns2, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns2, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source7, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source7.indexOf("</" + tagName + ">", elStartEnd);
        var text = source7.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source7, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source7.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source7.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source7, target) {
      for (var n in source7) {
        if (Object.prototype.hasOwnProperty.call(source7, n)) {
          target[n] = source7[n];
        }
      }
    }
    function parseDCC(source7, start, domBuilder, errorHandler) {
      var next = source7.charAt(start + 2);
      switch (next) {
        case "-":
          if (source7.charAt(start + 3) === "-") {
            var end = source7.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source7, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source7.substr(start + 3, 6) == "CDATA[") {
            var end = source7.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source7, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source7, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source7, start, domBuilder) {
      var end = source7.indexOf("?>", start);
      if (end) {
        var match = source7.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    function split(source7, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source7);
      while (match = reg.exec(source7)) {
        buf.push(match);
        if (match[1]) return buf;
      }
    }
    exports.XMLReader = XMLReader;
    exports.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser2(options) {
      this.options = options || { locator: {} };
    }
    DOMParser2.prototype.parseFromString = function(source7, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var normalize3 = options.normalizeLineEndings || normalizeLineEndings;
      if (source7 && typeof source7 === "string") {
        sax2.parse(
          normalize3(source7),
          defaultNSMap,
          entityMap
        );
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn2 = errorImpl[key];
        if (!fn2 && isCallback) {
          fn2 = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn2 && function(msg) {
          fn2("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      /**
       * @see org.xml.sax.ErrorHandler
       * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports.__DOMHandler = DOMHandler;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.DOMParser = DOMParser2;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    var dom = require_dom();
    exports.DOMImplementation = dom.DOMImplementation;
    exports.XMLSerializer = dom.XMLSerializer;
    exports.DOMParser = require_dom_parser().DOMParser;
  }
});

// node_modules/pixi.js/lib/environment-browser/browserExt.mjs
var browserExt = {
  extension: {
    type: ExtensionType.Environment,
    name: "browser",
    priority: -1
  },
  test: () => true,
  load: async () => {
    await import("./browserAll-HAZIGKTY.js");
  }
};

// node_modules/pixi.js/lib/environment-webworker/webworkerExt.mjs
var webworkerExt = {
  extension: {
    type: ExtensionType.Environment,
    name: "webworker",
    priority: 0
  },
  test: () => typeof self !== "undefined" && self.WorkerGlobalScope !== void 0,
  load: async () => {
    await import("./webworkerAll-T5G3ILZ3.js");
  }
};

// node_modules/pixi.js/lib/filters/blend-modes/blend-template.frag.mjs
var blendTemplateFrag = "\nin vec2 vTextureCoord;\nin vec4 vColor;\n\nout vec4 finalColor;\n\nuniform float uBlend;\n\nuniform sampler2D uTexture;\nuniform sampler2D uBackTexture;\n\n{FUNCTIONS}\n\nvoid main()\n{ \n    vec4 back = texture(uBackTexture, vTextureCoord);\n    vec4 front = texture(uTexture, vTextureCoord);\n    float blendedAlpha = front.a + back.a * (1.0 - front.a);\n    \n    {MAIN}\n}\n";

// node_modules/pixi.js/lib/filters/blend-modes/blend-template.vert.mjs
var blendTemplateVert = "in vec2 aPosition;\nout vec2 vTextureCoord;\nout vec2 backgroundUv;\n\nuniform vec4 uInputSize;\nuniform vec4 uOutputFrame;\nuniform vec4 uOutputTexture;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;\n    \n    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aPosition * (uOutputFrame.zw * uInputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

// node_modules/pixi.js/lib/filters/blend-modes/blend-template.wgsl.mjs
var blendTemplate = "\nstruct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct BlendUniforms {\n  uBlend:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n@group(0) @binding(3) var uBackTexture: texture_2d<f32>;\n\n@group(1) @binding(0) var<uniform> blendUniforms : BlendUniforms;\n\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  \n}\n  \n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition)\n  );\n}\n\n{FUNCTIONS}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>\n) -> @location(0) vec4<f32> {\n\n\n   var back =  textureSample(uBackTexture, uSampler, uv);\n   var front = textureSample(uTexture, uSampler, uv);\n   var blendedAlpha = front.a + back.a * (1.0 - front.a);\n   \n   var out = vec4<f32>(0.0,0.0,0.0,0.0);\n\n   {MAIN}\n\n   return out;\n}";

// node_modules/pixi.js/lib/filters/blend-modes/BlendModeFilter.mjs
var BlendModeFilter = class extends Filter {
  constructor(options) {
    const gpuOptions = options.gpu;
    const gpuSource = compileBlendModeShader({ source: blendTemplate, ...gpuOptions });
    const gpuProgram = GpuProgram.from({
      vertex: {
        source: gpuSource,
        entryPoint: "mainVertex"
      },
      fragment: {
        source: gpuSource,
        entryPoint: "mainFragment"
      }
    });
    const glOptions = options.gl;
    const glSource = compileBlendModeShader({ source: blendTemplateFrag, ...glOptions });
    const glProgram = GlProgram.from({
      vertex: blendTemplateVert,
      fragment: glSource
    });
    const uniformGroup = new UniformGroup({
      uBlend: {
        value: 1,
        type: "f32"
      }
    });
    super({
      gpuProgram,
      glProgram,
      blendRequired: true,
      resources: {
        blendUniforms: uniformGroup,
        uBackTexture: Texture.EMPTY
      }
    });
  }
};
function compileBlendModeShader(options) {
  const { source: source7, functions, main } = options;
  return source7.replace("{FUNCTIONS}", functions).replace("{MAIN}", main);
}

// node_modules/pixi.js/lib/filters/blend-modes/hls/GLhls.mjs
var hslgl = `
	float getLuminosity(vec3 c) {
		return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
	}

	vec3 setLuminosity(vec3 c, float lum) {
		float modLum = lum - getLuminosity(c);
		vec3 color = c.rgb + vec3(modLum);

		// clip back into legal range
		modLum = getLuminosity(color);
		vec3 modLumVec = vec3(modLum);

		float cMin = min(color.r, min(color.g, color.b));
		float cMax = max(color.r, max(color.g, color.b));

		if(cMin < 0.0) {
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0) {
			color = mix(modLumVec, color, (1.0 - modLum) / (cMax - modLum));
		}

		return color;
	}

	float getSaturation(vec3 c) {
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	vec3 setSaturationMinMidMax(vec3 cSorted, float s) {
		vec3 colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x) {
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else {
			colorSorted.y = 0.0;
			colorSorted.z = 0.0;
		}

		colorSorted.x = 0.0;

		return colorSorted;
	}

	vec3 setSaturation(vec3 c, float s) {
		vec3 color = c;

		if(color.r <= color.g && color.r <= color.b) {
			if(color.g <= color.b) {
				color = setSaturationMinMidMax(color.rgb, s).rgb;
			}
			else {
				color = setSaturationMinMidMax(color.rbg, s).rbg;
			}
		}
		else if(color.g <= color.r && color.g <= color.b) {
			if(color.r <= color.b) {
				color = setSaturationMinMidMax(color.grb, s).grb;
			}
			else {
				color = setSaturationMinMidMax(color.gbr, s).gbr;
			}
		}
		else {
			// Using bgr for both fixes part of hue
			if(color.r <= color.g) {
				color = setSaturationMinMidMax(color.brg, s).brg;
			}
			else {
				color = setSaturationMinMidMax(color.bgr, s).bgr;
			}
		}

		return color;
	}
    `;

// node_modules/pixi.js/lib/filters/blend-modes/hls/GPUhls.mjs
var hslgpu = `
	fn getLuminosity(c: vec3<f32>) -> f32
	{
		return 0.3*c.r + 0.59*c.g + 0.11*c.b;
	}

	fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32>
	{
		var modLum: f32 = lum - getLuminosity(c);
		var color: vec3<f32> = c.rgb + modLum;

		// clip back into legal range
		modLum = getLuminosity(color);
		let modLumVec = vec3<f32>(modLum);

		let cMin: f32 = min(color.r, min(color.g, color.b));
		let cMax: f32 = max(color.r, max(color.g, color.b));

		if(cMin < 0.0)
		{
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0)
		{
			color = mix(modLumVec, color, (1 - modLum) / (cMax - modLum));
		}

		return color;
	}

	fn getSaturation(c: vec3<f32>) -> f32
	{
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32>
	{
		var colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x)
		{
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else
		{
			colorSorted.y = 0;
			colorSorted.z = 0;
		}

		colorSorted.x = 0;

		return colorSorted;
	}

	fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32>
	{
		var color = c;

		if (color.r <= color.g && color.r <= color.b)
		{
			if (color.g <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rgb, s)).rgb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rbg, s)).rbg;
			}
		}
		else if (color.g <= color.r && color.g <= color.b)
		{
			if (color.r <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.grb, s)).grb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.gbr, s)).gbr;
			}
		}
		else
		{
			// Using bgr for both fixes part of hue
			if (color.r <= color.g)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.brg, s)).brg;
			}
			else
			{
				color  = vec3<f32>(setSaturationMinMidMax(color.bgr, s)).bgr;
			}
		}

		return color;
	}
	`;

// node_modules/pixi.js/lib/advanced-blend-modes/ColorBlend.mjs
var ColorBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                ${hslgl}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                ${hslgpu}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
ColorBlend.extension = {
  name: "color",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/ColorBurnBlend.mjs
var ColorBurnBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendColorBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
ColorBurnBlend.extension = {
  name: "color-burn",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/ColorDodgeBlend.mjs
var ColorDodgeBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float colorDodge(float base, float blend)
                {
                    return base / (1.0 - blend);
                }

                vec3 blendColorDodge(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendColorDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return base / (1.0 - blend);
                }

                fn blendColorDodge(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                    out = vec4<f32>(blendColorDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
ColorDodgeBlend.extension = {
  name: "color-dodge",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/DarkenBlend.mjs
var DarkenBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 blendDarken(vec3 base, vec3 blend, float opacity)
                {
                    return (min(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendDarken(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn blendDarken(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (min(blend,base) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendDarken(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
DarkenBlend.extension = {
  name: "darken",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/DifferenceBlend.mjs
var DifferenceBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendDifference(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
DifferenceBlend.extension = {
  name: "difference",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/DivideBlend.mjs
var DivideBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float divide(float base, float blend)
                {
                    return (blend > 0.0) ? clamp(base / blend, 0.0, 1.0) : 1.0;
                }

                vec3 blendDivide(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendDivide(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn divide(base: f32, blend: f32) -> f32
                {
                    return select(1.0, clamp(base / blend, 0.0, 1.0), blend > 0.0);
                }

                fn blendDivide(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendDivide(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
DivideBlend.extension = {
  name: "divide",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/ExclusionBlend.mjs
var ExclusionBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 exclusion(vec3 base, vec3 blend)
                {
                    return base + blend - 2.0 * base * blend;
                }

                vec3 blendExclusion(vec3 base, vec3 blend, float opacity)
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendExclusion(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn exclusion(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return base+blend-2.0*base*blend;
                }

                fn blendExclusion(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendExclusion(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
ExclusionBlend.extension = {
  name: "exclusion",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/HardLightBlend.mjs
var HardLightBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float hardLight(float base, float blend)
                {
                    return (blend < 0.5) ? 2.0 * base * blend : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
                }

                vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendHardLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                fn hardLight(base: f32, blend: f32) -> f32
                {
                    return select(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, blend < 0.5);
                }

                fn blendHardLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendHardLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
HardLightBlend.extension = {
  name: "hard-light",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/HardMixBlend.mjs
var HardMixBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float hardMix(float base, float blend)
                {
                    return (base + blend >= 1.0) ? 1.0 : 0.0;
                }

                vec3 blendHardMix(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blended = vec3(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendHardMix(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                fn hardMix(base: f32, blend: f32) -> f32
                {
                    return select(0.0, 1.0, base + blend >= 1.0);
                }

                fn blendHardMix(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendHardMix(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
HardMixBlend.extension = {
  name: "hard-mix",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/LightenBlend.mjs
var LightenBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 blendLighten(vec3 base, vec3 blend, float opacity)
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendLighten(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn blendLighten(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendLighten(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
LightenBlend.extension = {
  name: "lighten",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/LinearBurnBlend.mjs
var LinearBurnBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float linearBurn(float base, float blend)
                {
                    return max(0.0, base + blend - 1.0);
                }

                vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendLinearBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn blendLinearBurn(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendLinearBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
LinearBurnBlend.extension = {
  name: "linear-burn",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/LinearDodgeBlend.mjs
var LinearDodgeBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendLinearDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1, base + blend);
                }

                fn blendLinearDodge(base:vec3<f32>, blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendLinearDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
LinearDodgeBlend.extension = {
  name: "linear-dodge",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/LinearLightBlend.mjs
var LinearLightBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float linearBurn(float base, float blend) {
                    return max(0.0, base + blend - 1.0);
                }

                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                float linearLight(float base, float blend) {
                    return (blend <= 0.5) ? linearBurn(base,2.0*blend) : linearBurn(base,2.0*(blend-0.5));
                }

                vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendLinearLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base + blend);
                }

                fn linearLight(base: f32, blend: f32) -> f32
                {
                    return select(linearBurn(base,2.0*(blend-0.5)), linearBurn(base,2.0*blend), blend <= 0.5);
                }

                fn blendLinearLightOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendLinearLightOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
LinearLightBlend.extension = {
  name: "linear-light",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/LuminosityBlend.mjs
var LuminosityBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                ${hslgl}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                ${hslgpu}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
LuminosityBlend.extension = {
  name: "luminosity",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/NegationBlend.mjs
var NegationBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendNegation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
NegationBlend.extension = {
  name: "negation",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/OverlayBlend.mjs
var OverlayBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float overlay(float base, float blend)
                {
                    return (base < 0.5) ? (2.0*base*blend) : (1.0-2.0*(1.0-base)*(1.0-blend));
                }

                vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );
   
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendOverlay(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn overlay(base: f32, blend: f32) -> f32
                {
                    return select((1.0-2.0*(1.0-base)*(1.0-blend)), (2.0*base*blend), base < 0.5);
                }

                fn blendOverlay(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendOverlay(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
OverlayBlend.extension = {
  name: "overlay",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/PinLightBlend.mjs
var PinLightBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float pinLight(float base, float blend)
                {
                    return (blend <= 0.5) ? min(base, 2.0 * blend) : max(base, 2.0 * (blend - 0.5));
                }

                vec3 blendPinLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn pinLight(base: f32, blend: f32) -> f32
                {
                    return select(max(base,2.0*(blend-0.5)), min(base,2.0*blend), blend <= 0.5);
                }

                fn blendPinLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
PinLightBlend.extension = {
  name: "pin-light",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/SaturationBlend.mjs
var SaturationBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                ${hslgl}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                ${hslgpu}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `
      }
    });
  }
};
SaturationBlend.extension = {
  name: "saturation",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/SoftLightBlend.mjs
var SoftLightBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float softLight(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
                }

                vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn softLight(base: f32, blend: f32) -> f32
                {
                    return select(2.0 * base * blend + base * base * (1.0 - 2.0 * blend), sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), blend < 0.5);
                }

                fn blendSoftLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
SoftLightBlend.extension = {
  name: "soft-light",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/SubtractBlend.mjs
var SubtractBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float subtract(float base, float blend)
                {
                    return max(0.0, base - blend);
                }

                vec3 blendSubtract(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                finalColor = vec4(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `
      },
      gpu: {
        functions: `
                fn subtract(base: f32, blend: f32) -> f32
                {
                    return max(0, base - blend);
                }

                fn blendSubtract(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
SubtractBlend.extension = {
  name: "subtract",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/advanced-blend-modes/VividLightBlend.mjs
var VividLightBlend = class extends BlendModeFilter {
  constructor() {
    super({
      gl: {
        functions: `
                float colorBurn(float base, float blend)
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                float colorDodge(float base, float blend)
                {
                    return min(1.0, base / (1.0-blend));
                }

                float vividLight(float base, float blend)
                {
                    return (blend < 0.5) ? colorBurn(base,(2.0*blend)) : colorDodge(base,(2.0*(blend-0.5)));
                }

                vec3 blendVividLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,
        main: `
                finalColor = vec4(blendVividLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `
      },
      gpu: {
        functions: `
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base / (1.0-blend));
                }

                fn vividLight(base: f32, blend: f32) -> f32
                {
                    return select(colorDodge(base,(2.0*(blend-0.5))), colorBurn(base,(2.0*blend)), blend<0.5);
                }

                fn blendVividLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,
        main: `
                out = vec4<f32>(blendVividLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `
      }
    });
  }
};
VividLightBlend.extension = {
  name: "vivid-light",
  type: ExtensionType.BlendMode
};

// node_modules/pixi.js/lib/utils/browser/isWebGLSupported.mjs
var _isWebGLSupported;
function isWebGLSupported(failIfMajorPerformanceCaveat) {
  if (_isWebGLSupported !== void 0)
    return _isWebGLSupported;
  _isWebGLSupported = (() => {
    const contextOptions = {
      stencil: true,
      failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat ?? AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat
    };
    try {
      if (!DOMAdapter.get().getWebGLRenderingContext()) {
        return false;
      }
      const canvas = DOMAdapter.get().createCanvas();
      let gl = canvas.getContext("webgl", contextOptions);
      const success = !!gl?.getContextAttributes()?.stencil;
      if (gl) {
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      gl = null;
      return success;
    } catch (_e2) {
      return false;
    }
  })();
  return _isWebGLSupported;
}

// node_modules/pixi.js/lib/utils/browser/isWebGPUSupported.mjs
var _isWebGPUSupported;
async function isWebGPUSupported(options = {}) {
  if (_isWebGPUSupported !== void 0)
    return _isWebGPUSupported;
  _isWebGPUSupported = await (async () => {
    const gpu = DOMAdapter.get().getNavigator().gpu;
    if (!gpu) {
      return false;
    }
    try {
      const adapter = await gpu.requestAdapter(options);
      await adapter.requestDevice();
      return true;
    } catch (_e2) {
      return false;
    }
  })();
  return _isWebGPUSupported;
}

// node_modules/pixi.js/lib/rendering/renderers/autoDetectRenderer.mjs
var renderPriority = ["webgl", "webgpu", "canvas"];
async function autoDetectRenderer(options) {
  let preferredOrder = [];
  if (options.preference) {
    preferredOrder.push(options.preference);
    renderPriority.forEach((item) => {
      if (item !== options.preference) {
        preferredOrder.push(item);
      }
    });
  } else {
    preferredOrder = renderPriority.slice();
  }
  let RendererClass;
  let finalOptions = {};
  for (let i = 0; i < preferredOrder.length; i++) {
    const rendererType = preferredOrder[i];
    if (rendererType === "webgpu" && await isWebGPUSupported()) {
      const { WebGPURenderer: WebGPURenderer2 } = await import("./WebGPURenderer-UOMWUPXY.js");
      RendererClass = WebGPURenderer2;
      finalOptions = { ...options, ...options.webgpu };
      break;
    } else if (rendererType === "webgl" && isWebGLSupported(
      options.failIfMajorPerformanceCaveat ?? AbstractRenderer.defaultOptions.failIfMajorPerformanceCaveat
    )) {
      const { WebGLRenderer: WebGLRenderer2 } = await import("./WebGLRenderer-QZD5H7ON.js");
      RendererClass = WebGLRenderer2;
      finalOptions = { ...options, ...options.webgl };
      break;
    } else if (rendererType === "canvas") {
      finalOptions = { ...options };
      throw new Error("CanvasRenderer is not yet implemented");
    }
  }
  delete finalOptions.webgpu;
  delete finalOptions.webgl;
  if (!RendererClass) {
    throw new Error("No available renderer for the current environment");
  }
  const renderer = new RendererClass();
  await renderer.init(finalOptions);
  return renderer;
}

// node_modules/pixi.js/lib/app/Application.mjs
var _Application = class _Application2 {
  /** @ignore */
  constructor(...args) {
    this.stage = new Container();
    if (args[0] !== void 0) {
      deprecation(v8_0_0, "Application constructor options are deprecated, please use Application.init() instead.");
    }
  }
  /**
   * @param options - The optional application and renderer parameters.
   */
  async init(options) {
    options = { ...options };
    this.renderer = await autoDetectRenderer(options);
    _Application2._plugins.forEach((plugin) => {
      plugin.init.call(this, options);
    });
  }
  /** Render the current stage. */
  render() {
    this.renderer.render({ container: this.stage });
  }
  /**
   * Reference to the renderer's canvas element.
   * @readonly
   * @member {HTMLCanvasElement}
   */
  get canvas() {
    return this.renderer.canvas;
  }
  /**
   * Reference to the renderer's canvas element.
   * @member {HTMLCanvasElement}
   * @deprecated since 8.0.0
   */
  get view() {
    deprecation(v8_0_0, "Application.view is deprecated, please use Application.canvas instead.");
    return this.renderer.canvas;
  }
  /**
   * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
   * @readonly
   */
  get screen() {
    return this.renderer.screen;
  }
  /**
   * Destroys the application and all of its resources.
   * @param {object|boolean}[rendererDestroyOptions=false] - The options for destroying the renderer.
   * @param {boolean}[rendererDestroyOptions.removeView=false] - Removes the Canvas element from the DOM.
   * @param {object|boolean} [options=false] - The options for destroying the stage.
   * @param {boolean} [options.children=false] - If set to true, all the children will have their destroy method
   * called as well. `options` will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites.
   * If options.children is set to true,
   * it should destroy the texture of the child sprite.
   * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
   *  If options.children is set to true,
   * it should destroy the texture source of the child sprite.
   * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
   * If options.children is set to true,
   * it should destroy the context of the child graphics.
   */
  destroy(rendererDestroyOptions = false, options = false) {
    const plugins = _Application2._plugins.slice(0);
    plugins.reverse();
    plugins.forEach((plugin) => {
      plugin.destroy.call(this);
    });
    this.stage.destroy(options);
    this.stage = null;
    this.renderer.destroy(rendererDestroyOptions);
    this.renderer = null;
  }
};
_Application._plugins = [];
var Application = _Application;
extensions.handleByList(ExtensionType.Application, Application._plugins);
extensions.add(ApplicationInitHook);

// node_modules/pixi.js/lib/scene/text-bitmap/BitmapFont.mjs
var BitmapFont = class extends AbstractBitmapFont {
  constructor(options, url) {
    super();
    const { textures, data } = options;
    Object.keys(data.pages).forEach((key) => {
      const pageData = data.pages[parseInt(key, 10)];
      const texture = textures[pageData.id];
      this.pages.push({ texture });
    });
    Object.keys(data.chars).forEach((key) => {
      const charData = data.chars[key];
      const {
        frame: textureFrame,
        source: textureSource
      } = textures[charData.page];
      const frameReal = new Rectangle(
        charData.x + textureFrame.x,
        charData.y + textureFrame.y,
        charData.width,
        charData.height
      );
      const texture = new Texture({
        source: textureSource,
        frame: frameReal
      });
      this.chars[key] = {
        id: key.codePointAt(0),
        xOffset: charData.xOffset,
        yOffset: charData.yOffset,
        xAdvance: charData.xAdvance,
        kerning: charData.kerning ?? {},
        texture
      };
    });
    this.baseRenderedFontSize = data.fontSize;
    this.baseMeasurementFontSize = data.fontSize;
    this.fontMetrics = {
      ascent: 0,
      descent: 0,
      fontSize: data.fontSize
    };
    this.baseLineOffset = data.baseLineOffset;
    this.lineHeight = data.lineHeight;
    this.fontFamily = data.fontFamily;
    this.distanceField = data.distanceField ?? {
      type: "none",
      range: 0
    };
    this.url = url;
  }
  /** Destroys the BitmapFont object. */
  destroy() {
    super.destroy();
    for (let i = 0; i < this.pages.length; i++) {
      const { texture } = this.pages[i];
      texture.destroy(true);
    }
    this.pages = null;
  }
  /**
   * Generates a bitmap-font for the given style and character set
   * @param options - Setup options for font generation.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.install('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText({ text: 'This is the title', fontFamily: 'TitleFont' });
   */
  static install(options) {
    BitmapFontManager.install(options);
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  static uninstall(name) {
    BitmapFontManager.uninstall(name);
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/asset/bitmapFontTextParser.mjs
var bitmapFontTextParser = {
  test(data) {
    return typeof data === "string" && data.startsWith("info face=");
  },
  parse(txt) {
    const items = txt.match(/^[a-z]+\s+.+$/gm);
    const rawData = {
      info: [],
      common: [],
      page: [],
      char: [],
      chars: [],
      kerning: [],
      kernings: [],
      distanceField: []
    };
    for (const i in items) {
      const name = items[i].match(/^[a-z]+/gm)[0];
      const attributeList = items[i].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm);
      const itemData = {};
      for (const i2 in attributeList) {
        const split = attributeList[i2].split("=");
        const key = split[0];
        const strValue = split[1].replace(/"/gm, "");
        const floatValue = parseFloat(strValue);
        const value = isNaN(floatValue) ? strValue : floatValue;
        itemData[key] = value;
      }
      rawData[name].push(itemData);
    }
    const font = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    };
    const [info] = rawData.info;
    const [common] = rawData.common;
    const [distanceField] = rawData.distanceField ?? [];
    if (distanceField) {
      font.distanceField = {
        range: parseInt(distanceField.distanceRange, 10),
        type: distanceField.fieldType
      };
    }
    font.fontSize = parseInt(info.size, 10);
    font.fontFamily = info.face;
    font.lineHeight = parseInt(common.lineHeight, 10);
    const page = rawData.page;
    for (let i = 0; i < page.length; i++) {
      font.pages.push({
        id: parseInt(page[i].id, 10) || 0,
        file: page[i].file
      });
    }
    const map = {};
    font.baseLineOffset = font.lineHeight - parseInt(common.base, 10);
    const char = rawData.char;
    for (let i = 0; i < char.length; i++) {
      const charNode = char[i];
      const id = parseInt(charNode.id, 10);
      let letter = charNode.letter ?? charNode.char ?? String.fromCharCode(id);
      if (letter === "space")
        letter = " ";
      map[id] = letter;
      font.chars[letter] = {
        id,
        // texture deets..
        page: parseInt(charNode.page, 10) || 0,
        x: parseInt(charNode.x, 10),
        y: parseInt(charNode.y, 10),
        width: parseInt(charNode.width, 10),
        height: parseInt(charNode.height, 10),
        xOffset: parseInt(charNode.xoffset, 10),
        yOffset: parseInt(charNode.yoffset, 10),
        xAdvance: parseInt(charNode.xadvance, 10),
        kerning: {}
      };
    }
    const kerning = rawData.kerning || [];
    for (let i = 0; i < kerning.length; i++) {
      const first = parseInt(kerning[i].first, 10);
      const second = parseInt(kerning[i].second, 10);
      const amount = parseInt(kerning[i].amount, 10);
      font.chars[map[second]].kerning[map[first]] = amount;
    }
    return font;
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/asset/bitmapFontXMLParser.mjs
var bitmapFontXMLParser = {
  test(data) {
    const xml = data;
    return typeof xml !== "string" && "getElementsByTagName" in xml && xml.getElementsByTagName("page").length && xml.getElementsByTagName("info")[0].getAttribute("face") !== null;
  },
  parse(xml) {
    const data = {
      chars: {},
      pages: [],
      lineHeight: 0,
      fontSize: 0,
      fontFamily: "",
      distanceField: null,
      baseLineOffset: 0
    };
    const info = xml.getElementsByTagName("info")[0];
    const common = xml.getElementsByTagName("common")[0];
    const distanceField = xml.getElementsByTagName("distanceField")[0];
    if (distanceField) {
      data.distanceField = {
        type: distanceField.getAttribute("fieldType"),
        range: parseInt(distanceField.getAttribute("distanceRange"), 10)
      };
    }
    const page = xml.getElementsByTagName("page");
    const char = xml.getElementsByTagName("char");
    const kerning = xml.getElementsByTagName("kerning");
    data.fontSize = parseInt(info.getAttribute("size"), 10);
    data.fontFamily = info.getAttribute("face");
    data.lineHeight = parseInt(common.getAttribute("lineHeight"), 10);
    for (let i = 0; i < page.length; i++) {
      data.pages.push({
        id: parseInt(page[i].getAttribute("id"), 10) || 0,
        file: page[i].getAttribute("file")
      });
    }
    const map = {};
    data.baseLineOffset = data.lineHeight - parseInt(common.getAttribute("base"), 10);
    for (let i = 0; i < char.length; i++) {
      const charNode = char[i];
      const id = parseInt(charNode.getAttribute("id"), 10);
      let letter = charNode.getAttribute("letter") ?? charNode.getAttribute("char") ?? String.fromCharCode(id);
      if (letter === "space")
        letter = " ";
      map[id] = letter;
      data.chars[letter] = {
        id,
        // texture deets..
        page: parseInt(charNode.getAttribute("page"), 10) || 0,
        x: parseInt(charNode.getAttribute("x"), 10),
        y: parseInt(charNode.getAttribute("y"), 10),
        width: parseInt(charNode.getAttribute("width"), 10),
        height: parseInt(charNode.getAttribute("height"), 10),
        // render deets..
        xOffset: parseInt(charNode.getAttribute("xoffset"), 10),
        yOffset: parseInt(charNode.getAttribute("yoffset"), 10),
        // + baseLineOffset,
        xAdvance: parseInt(charNode.getAttribute("xadvance"), 10),
        kerning: {}
      };
    }
    for (let i = 0; i < kerning.length; i++) {
      const first = parseInt(kerning[i].getAttribute("first"), 10);
      const second = parseInt(kerning[i].getAttribute("second"), 10);
      const amount = parseInt(kerning[i].getAttribute("amount"), 10);
      data.chars[map[second]].kerning[map[first]] = amount;
    }
    return data;
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/asset/bitmapFontXMLStringParser.mjs
var bitmapFontXMLStringParser = {
  test(data) {
    if (typeof data === "string" && data.includes("<font>")) {
      return bitmapFontXMLParser.test(DOMAdapter.get().parseXML(data));
    }
    return false;
  },
  parse(data) {
    return bitmapFontXMLParser.parse(DOMAdapter.get().parseXML(data));
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/asset/loadBitmapFont.mjs
var validExtensions = [".xml", ".fnt"];
var bitmapFontCachePlugin = {
  extension: {
    type: ExtensionType.CacheParser,
    name: "cacheBitmapFont"
  },
  test: (asset) => asset instanceof BitmapFont,
  getCacheableAssets(keys, asset) {
    const out = {};
    keys.forEach((key) => {
      out[key] = asset;
      out[`${key}-bitmap`] = asset;
    });
    out[`${asset.fontFamily}-bitmap`] = asset;
    return out;
  }
};
var loadBitmapFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Normal
  },
  name: "loadBitmapFont",
  test(url) {
    return validExtensions.includes(path.extname(url).toLowerCase());
  },
  async testParse(data) {
    return bitmapFontTextParser.test(data) || bitmapFontXMLStringParser.test(data);
  },
  async parse(asset, data, loader) {
    const bitmapFontData = bitmapFontTextParser.test(asset) ? bitmapFontTextParser.parse(asset) : bitmapFontXMLStringParser.parse(asset);
    const { src } = data;
    const { pages } = bitmapFontData;
    const textureUrls = [];
    const textureOptions = bitmapFontData.distanceField ? {
      scaleMode: "linear",
      alphaMode: "premultiply-alpha-on-upload",
      autoGenerateMipmaps: false,
      resolution: 1
    } : {};
    for (let i = 0; i < pages.length; ++i) {
      const pageFile = pages[i].file;
      let imagePath = path.join(path.dirname(src), pageFile);
      imagePath = copySearchParams(imagePath, src);
      textureUrls.push({
        src: imagePath,
        data: textureOptions
      });
    }
    const loadedTextures = await loader.load(textureUrls);
    const textures = textureUrls.map((url) => loadedTextures[url.src]);
    const bitmapFont = new BitmapFont({
      data: bitmapFontData,
      textures
    }, src);
    return bitmapFont;
  },
  async load(url, _options) {
    const response = await DOMAdapter.get().fetch(url);
    return await response.text();
  },
  async unload(bitmapFont, _resolvedAsset, loader) {
    await Promise.all(bitmapFont.pages.map((page) => loader.unload(page.texture.source._sourceOrigin)));
    bitmapFont.destroy();
  }
};

// node_modules/pixi.js/lib/assets/BackgroundLoader.mjs
var BackgroundLoader = class {
  /**
   * @param loader
   * @param verbose - should the loader log to the console
   */
  constructor(loader, verbose = false) {
    this._loader = loader;
    this._assetList = [];
    this._isLoading = false;
    this._maxConcurrent = 1;
    this.verbose = verbose;
  }
  /**
   * Adds an array of assets to load.
   * @param assetUrls - assets to load
   */
  add(assetUrls) {
    assetUrls.forEach((a) => {
      this._assetList.push(a);
    });
    if (this.verbose) {
      console.log("[BackgroundLoader] assets: ", this._assetList);
    }
    if (this._isActive && !this._isLoading) {
      void this._next();
    }
  }
  /**
   * Loads the next set of assets. Will try to load as many assets as it can at the same time.
   *
   * The max assets it will try to load at one time will be 4.
   */
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = true;
      const toLoad = [];
      const toLoadAmount = Math.min(this._assetList.length, this._maxConcurrent);
      for (let i = 0; i < toLoadAmount; i++) {
        toLoad.push(this._assetList.pop());
      }
      await this._loader.load(toLoad);
      this._isLoading = false;
      void this._next();
    }
  }
  /**
   * Activate/Deactivate the loading. If set to true then it will immediately continue to load the next asset.
   * @returns whether the class is active
   */
  get active() {
    return this._isActive;
  }
  set active(value) {
    if (this._isActive === value)
      return;
    this._isActive = value;
    if (value && !this._isLoading) {
      void this._next();
    }
  }
};

// node_modules/pixi.js/lib/assets/cache/parsers/cacheTextureArray.mjs
var cacheTextureArray = {
  extension: {
    type: ExtensionType.CacheParser,
    name: "cacheTextureArray"
  },
  test: (asset) => Array.isArray(asset) && asset.every((t) => t instanceof Texture),
  getCacheableAssets: (keys, asset) => {
    const out = {};
    keys.forEach((key) => {
      asset.forEach((item, i) => {
        out[key + (i === 0 ? "" : i + 1)] = item;
      });
    });
    return out;
  }
};

// node_modules/pixi.js/lib/assets/detections/utils/testImageFormat.mjs
async function testImageFormat(imageData) {
  if ("Image" in globalThis) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(true);
      };
      image.onerror = () => {
        resolve(false);
      };
      image.src = imageData;
    });
  }
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const blob = await (await fetch(imageData)).blob();
      await createImageBitmap(blob);
    } catch (_e2) {
      return false;
    }
    return true;
  }
  return false;
}

// node_modules/pixi.js/lib/assets/detections/parsers/detectAvif.mjs
var detectAvif = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 1
  },
  test: async () => testImageFormat(
    // eslint-disable-next-line max-len
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
  ),
  add: async (formats) => [...formats, "avif"],
  remove: async (formats) => formats.filter((f) => f !== "avif")
};

// node_modules/pixi.js/lib/assets/detections/parsers/detectDefaults.mjs
var imageFormats = ["png", "jpg", "jpeg"];
var detectDefaults = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: -1
  },
  test: () => Promise.resolve(true),
  add: async (formats) => [...formats, ...imageFormats],
  remove: async (formats) => formats.filter((f) => !imageFormats.includes(f))
};

// node_modules/pixi.js/lib/assets/detections/utils/testVideoFormat.mjs
var inWorker = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function testVideoFormat(mimeType) {
  if (inWorker) {
    return false;
  }
  const video = document.createElement("video");
  return video.canPlayType(mimeType) !== "";
}

// node_modules/pixi.js/lib/assets/detections/parsers/detectMp4.mjs
var detectMp4 = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/mp4"),
  add: async (formats) => [...formats, "mp4", "m4v"],
  remove: async (formats) => formats.filter((f) => f !== "mp4" && f !== "m4v")
};

// node_modules/pixi.js/lib/assets/detections/parsers/detectOgv.mjs
var detectOgv = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/ogg"),
  add: async (formats) => [...formats, "ogv"],
  remove: async (formats) => formats.filter((f) => f !== "ogv")
};

// node_modules/pixi.js/lib/assets/detections/parsers/detectWebm.mjs
var detectWebm = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testVideoFormat("video/webm"),
  add: async (formats) => [...formats, "webm"],
  remove: async (formats) => formats.filter((f) => f !== "webm")
};

// node_modules/pixi.js/lib/assets/detections/parsers/detectWebp.mjs
var detectWebp = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 0
  },
  test: async () => testImageFormat(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  ),
  add: async (formats) => [...formats, "webp"],
  remove: async (formats) => formats.filter((f) => f !== "webp")
};

// node_modules/pixi.js/lib/assets/loader/Loader.mjs
var Loader = class {
  constructor() {
    this._parsers = [];
    this._parsersValidated = false;
    this.parsers = new Proxy(this._parsers, {
      set: (target, key, value) => {
        this._parsersValidated = false;
        target[key] = value;
        return true;
      }
    });
    this.promiseCache = {};
  }
  /** function used for testing */
  reset() {
    this._parsersValidated = false;
    this.promiseCache = {};
  }
  /**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */
  _getLoadPromiseAndParser(url, data) {
    const result = {
      promise: null,
      parser: null
    };
    result.promise = (async () => {
      let asset = null;
      let parser = null;
      if (data.loadParser) {
        parser = this._parserHash[data.loadParser];
        if (!parser) {
          warn(`[Assets] specified load parser "${data.loadParser}" not found while loading ${url}`);
        }
      }
      if (!parser) {
        for (let i = 0; i < this.parsers.length; i++) {
          const parserX = this.parsers[i];
          if (parserX.load && parserX.test?.(url, data, this)) {
            parser = parserX;
            break;
          }
        }
        if (!parser) {
          warn(`[Assets] ${url} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`);
          return null;
        }
      }
      asset = await parser.load(url, data, this);
      result.parser = parser;
      for (let i = 0; i < this.parsers.length; i++) {
        const parser2 = this.parsers[i];
        if (parser2.parse) {
          if (parser2.parse && await parser2.testParse?.(asset, data, this)) {
            asset = await parser2.parse(asset, data, this) || asset;
            result.parser = parser2;
          }
        }
      }
      return asset;
    })();
    return result;
  }
  async load(assetsToLoadIn, onProgress) {
    if (!this._parsersValidated) {
      this._validateParsers();
    }
    let count = 0;
    const assets = {};
    const singleAsset = isSingleItem(assetsToLoadIn);
    const assetsToLoad = convertToList(assetsToLoadIn, (item) => ({
      alias: [item],
      src: item,
      data: {}
    }));
    const total = assetsToLoad.length;
    const promises = assetsToLoad.map(async (asset) => {
      const url = path.toAbsolute(asset.src);
      if (!assets[asset.src]) {
        try {
          if (!this.promiseCache[url]) {
            this.promiseCache[url] = this._getLoadPromiseAndParser(url, asset);
          }
          assets[asset.src] = await this.promiseCache[url].promise;
          if (onProgress)
            onProgress(++count / total);
        } catch (e) {
          delete this.promiseCache[url];
          delete assets[asset.src];
          throw new Error(`[Loader.load] Failed to load ${url}.
${e}`);
        }
      }
    });
    await Promise.all(promises);
    return singleAsset ? assets[assetsToLoad[0].src] : assets;
  }
  /**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */
  async unload(assetsToUnloadIn) {
    const assetsToUnload = convertToList(assetsToUnloadIn, (item) => ({
      alias: [item],
      src: item
    }));
    const promises = assetsToUnload.map(async (asset) => {
      const url = path.toAbsolute(asset.src);
      const loadPromise = this.promiseCache[url];
      if (loadPromise) {
        const loadedAsset = await loadPromise.promise;
        delete this.promiseCache[url];
        await loadPromise.parser?.unload?.(loadedAsset, asset, this);
      }
    });
    await Promise.all(promises);
  }
  /** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */
  _validateParsers() {
    this._parsersValidated = true;
    this._parserHash = this._parsers.filter((parser) => parser.name).reduce((hash, parser) => {
      if (!parser.name) {
        warn(`[Assets] loadParser should have a name`);
      } else if (hash[parser.name]) {
        warn(`[Assets] loadParser name conflict "${parser.name}"`);
      }
      return { ...hash, [parser.name]: parser };
    }, {});
  }
};

// node_modules/pixi.js/lib/assets/utils/checkDataUrl.mjs
function checkDataUrl(url, mimes) {
  if (Array.isArray(mimes)) {
    for (const mime of mimes) {
      if (url.startsWith(`data:${mime}`))
        return true;
    }
    return false;
  }
  return url.startsWith(`data:${mimes}`);
}

// node_modules/pixi.js/lib/assets/utils/checkExtension.mjs
function checkExtension(url, extension) {
  const tempURL = url.split("?")[0];
  const ext = path.extname(tempURL).toLowerCase();
  if (Array.isArray(extension)) {
    return extension.includes(ext);
  }
  return ext === extension;
}

// node_modules/pixi.js/lib/assets/loader/parsers/loadJson.mjs
var validJSONExtension = ".json";
var validJSONMIME = "application/json";
var loadJson = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  name: "loadJson",
  test(url) {
    return checkDataUrl(url, validJSONMIME) || checkExtension(url, validJSONExtension);
  },
  async load(url) {
    const response = await DOMAdapter.get().fetch(url);
    const json = await response.json();
    return json;
  }
};

// node_modules/pixi.js/lib/assets/loader/parsers/loadTxt.mjs
var validTXTExtension = ".txt";
var validTXTMIME = "text/plain";
var loadTxt = {
  name: "loadTxt",
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low,
    name: "loadTxt"
  },
  test(url) {
    return checkDataUrl(url, validTXTMIME) || checkExtension(url, validTXTExtension);
  },
  async load(url) {
    const response = await DOMAdapter.get().fetch(url);
    const txt = await response.text();
    return txt;
  }
};

// node_modules/pixi.js/lib/assets/loader/parsers/loadWebFont.mjs
var validWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
var validFontExtensions = [".ttf", ".otf", ".woff", ".woff2"];
var validFontMIMEs = [
  "font/ttf",
  "font/otf",
  "font/woff",
  "font/woff2"
];
var CSS_IDENT_TOKEN_REGEX = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function getFontFamilyName(url) {
  const ext = path.extname(url);
  const name = path.basename(url, ext);
  const nameWithSpaces = name.replace(/(-|_)/g, " ");
  const nameTokens = nameWithSpaces.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  let valid = nameTokens.length > 0;
  for (const token of nameTokens) {
    if (!token.match(CSS_IDENT_TOKEN_REGEX)) {
      valid = false;
      break;
    }
  }
  let fontFamilyName = nameTokens.join(" ");
  if (!valid) {
    fontFamilyName = `"${fontFamilyName.replace(/[\\"]/g, "\\$&")}"`;
  }
  return fontFamilyName;
}
var validURICharactersRegex = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function encodeURIWhenNeeded(uri) {
  if (validURICharactersRegex.test(uri)) {
    return uri;
  }
  return encodeURI(uri);
}
var loadWebFont = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low
  },
  name: "loadWebFont",
  test(url) {
    return checkDataUrl(url, validFontMIMEs) || checkExtension(url, validFontExtensions);
  },
  async load(url, options) {
    const fonts = DOMAdapter.get().getFontFaceSet();
    if (fonts) {
      const fontFaces = [];
      const name = options.data?.family ?? getFontFamilyName(url);
      const weights = options.data?.weights?.filter((weight) => validWeights.includes(weight)) ?? ["normal"];
      const data = options.data ?? {};
      for (let i = 0; i < weights.length; i++) {
        const weight = weights[i];
        const font = new FontFace(name, `url(${encodeURIWhenNeeded(url)})`, {
          ...data,
          weight
        });
        await font.load();
        fonts.add(font);
        fontFaces.push(font);
      }
      Cache.set(`${name}-and-url`, {
        url,
        fontFaces
      });
      return fontFaces.length === 1 ? fontFaces[0] : fontFaces;
    }
    warn("[loadWebFont] FontFace API is not supported. Skipping loading font");
    return null;
  },
  unload(font) {
    (Array.isArray(font) ? font : [font]).forEach((t) => {
      Cache.remove(`${t.family}-and-url`);
      DOMAdapter.get().getFontFaceSet().delete(t);
    });
  }
};

// node_modules/pixi.js/lib/utils/network/getResolutionOfUrl.mjs
function getResolutionOfUrl(url, defaultValue2 = 1) {
  const resolution = Resolver.RETINA_PREFIX?.exec(url);
  if (resolution) {
    return parseFloat(resolution[1]);
  }
  return defaultValue2;
}

// node_modules/pixi.js/lib/assets/loader/parsers/textures/utils/createTexture.mjs
function createTexture(source7, loader, url) {
  source7.label = url;
  source7._sourceOrigin = url;
  const texture = new Texture({
    source: source7,
    label: url
  });
  const unload = () => {
    delete loader.promiseCache[url];
    if (Cache.has(url)) {
      Cache.remove(url);
    }
  };
  texture.source.once("destroy", () => {
    if (loader.promiseCache[url]) {
      warn("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource.");
      unload();
    }
  });
  texture.once("destroy", () => {
    if (!source7.destroyed) {
      warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture.");
      unload();
    }
  });
  return texture;
}

// node_modules/pixi.js/lib/assets/loader/parsers/textures/loadSVG.mjs
var validSVGExtension = ".svg";
var validSVGMIME = "image/svg+xml";
var loadSvg = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low,
    name: "loadSVG"
  },
  name: "loadSVG",
  config: {
    crossOrigin: "anonymous",
    parseAsGraphicsContext: false
  },
  test(url) {
    return checkDataUrl(url, validSVGMIME) || checkExtension(url, validSVGExtension);
  },
  async load(url, asset, loader) {
    if (asset.data.parseAsGraphicsContext ?? this.config.parseAsGraphicsContext) {
      return loadAsGraphics(url);
    }
    return loadAsTexture(url, asset, loader, this.config.crossOrigin);
  },
  unload(asset) {
    asset.destroy(true);
  }
};
async function loadAsTexture(url, asset, loader, crossOrigin2) {
  const response = await DOMAdapter.get().fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const image = new Image();
  image.src = blobUrl;
  image.crossOrigin = crossOrigin2;
  await image.decode();
  URL.revokeObjectURL(blobUrl);
  const canvas = document.createElement("canvas");
  const context3 = canvas.getContext("2d");
  const resolution = asset.data?.resolution || getResolutionOfUrl(url);
  const width = asset.data?.width ?? image.width;
  const height = asset.data?.height ?? image.height;
  canvas.width = width * resolution;
  canvas.height = height * resolution;
  context3.drawImage(image, 0, 0, width * resolution, height * resolution);
  const { parseAsGraphicsContext: _p, ...rest } = asset.data;
  const base = new ImageSource({
    resource: canvas,
    alphaMode: "premultiply-alpha-on-upload",
    resolution,
    ...rest
  });
  return createTexture(base, loader, url);
}
async function loadAsGraphics(url) {
  const response = await DOMAdapter.get().fetch(url);
  const svgSource = await response.text();
  const context3 = new GraphicsContext();
  context3.svg(svgSource);
  return context3;
}

// node_modules/pixi.js/lib/_virtual/checkImageBitmap.worker.mjs
var WORKER_CODE = `(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;
var WORKER_URL = null;
var WorkerInstance = class {
  constructor() {
    if (!WORKER_URL) {
      WORKER_URL = URL.createObjectURL(new Blob([WORKER_CODE], { type: "application/javascript" }));
    }
    this.worker = new Worker(WORKER_URL);
  }
};
WorkerInstance.revokeObjectURL = function revokeObjectURL() {
  if (WORKER_URL) {
    URL.revokeObjectURL(WORKER_URL);
    WORKER_URL = null;
  }
};

// node_modules/pixi.js/lib/_virtual/loadImageBitmap.worker.mjs
var WORKER_CODE2 = '(function () {\n    \'use strict\';\n\n    async function loadImageBitmap(url, alphaMode) {\n      const response = await fetch(url);\n      if (!response.ok) {\n        throw new Error(`[WorkerManager.loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);\n      }\n      const imageBlob = await response.blob();\n      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);\n    }\n    self.onmessage = async (event) => {\n      try {\n        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);\n        self.postMessage({\n          data: imageBitmap,\n          uuid: event.data.uuid,\n          id: event.data.id\n        }, [imageBitmap]);\n      } catch (e) {\n        self.postMessage({\n          error: e,\n          uuid: event.data.uuid,\n          id: event.data.id\n        });\n      }\n    };\n\n})();\n';
var WORKER_URL2 = null;
var WorkerInstance2 = class {
  constructor() {
    if (!WORKER_URL2) {
      WORKER_URL2 = URL.createObjectURL(new Blob([WORKER_CODE2], { type: "application/javascript" }));
    }
    this.worker = new Worker(WORKER_URL2);
  }
};
WorkerInstance2.revokeObjectURL = function revokeObjectURL2() {
  if (WORKER_URL2) {
    URL.revokeObjectURL(WORKER_URL2);
    WORKER_URL2 = null;
  }
};

// node_modules/pixi.js/lib/assets/loader/workers/WorkerManager.mjs
var UUID = 0;
var MAX_WORKERS;
var WorkerManagerClass = class {
  constructor() {
    this._initialized = false;
    this._createdWorkers = 0;
    this._workerPool = [];
    this._queue = [];
    this._resolveHash = {};
  }
  isImageBitmapSupported() {
    if (this._isImageBitmapSupported !== void 0)
      return this._isImageBitmapSupported;
    this._isImageBitmapSupported = new Promise((resolve) => {
      const { worker } = new WorkerInstance();
      worker.addEventListener("message", (event) => {
        worker.terminate();
        WorkerInstance.revokeObjectURL();
        resolve(event.data);
      });
    });
    return this._isImageBitmapSupported;
  }
  loadImageBitmap(src, asset) {
    return this._run("loadImageBitmap", [src, asset?.data?.alphaMode]);
  }
  async _initWorkers() {
    if (this._initialized)
      return;
    this._initialized = true;
  }
  _getWorker() {
    if (MAX_WORKERS === void 0) {
      MAX_WORKERS = navigator.hardwareConcurrency || 4;
    }
    let worker = this._workerPool.pop();
    if (!worker && this._createdWorkers < MAX_WORKERS) {
      this._createdWorkers++;
      worker = new WorkerInstance2().worker;
      worker.addEventListener("message", (event) => {
        this._complete(event.data);
        this._returnWorker(event.target);
        this._next();
      });
    }
    return worker;
  }
  _returnWorker(worker) {
    this._workerPool.push(worker);
  }
  _complete(data) {
    if (data.error !== void 0) {
      this._resolveHash[data.uuid].reject(data.error);
    } else {
      this._resolveHash[data.uuid].resolve(data.data);
    }
    this._resolveHash[data.uuid] = null;
  }
  async _run(id, args) {
    await this._initWorkers();
    const promise = new Promise((resolve, reject) => {
      this._queue.push({ id, arguments: args, resolve, reject });
    });
    this._next();
    return promise;
  }
  _next() {
    if (!this._queue.length)
      return;
    const worker = this._getWorker();
    if (!worker) {
      return;
    }
    const toDo = this._queue.pop();
    const id = toDo.id;
    this._resolveHash[UUID] = { resolve: toDo.resolve, reject: toDo.reject };
    worker.postMessage({
      data: toDo.arguments,
      uuid: UUID++,
      id
    });
  }
};
var WorkerManager = new WorkerManagerClass();

// node_modules/pixi.js/lib/assets/loader/parsers/textures/loadTextures.mjs
var validImageExtensions = [".jpeg", ".jpg", ".png", ".webp", ".avif"];
var validImageMIMEs = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
];
async function loadImageBitmap(url, asset) {
  const response = await DOMAdapter.get().fetch(url);
  if (!response.ok) {
    throw new Error(`[loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  const imageBlob = await response.blob();
  return asset?.data?.alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
}
var loadTextures = {
  name: "loadTextures",
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
    name: "loadTextures"
  },
  config: {
    preferWorkers: true,
    preferCreateImageBitmap: true,
    crossOrigin: "anonymous"
  },
  test(url) {
    return checkDataUrl(url, validImageMIMEs) || checkExtension(url, validImageExtensions);
  },
  async load(url, asset, loader) {
    let src = null;
    if (globalThis.createImageBitmap && this.config.preferCreateImageBitmap) {
      if (this.config.preferWorkers && await WorkerManager.isImageBitmapSupported()) {
        src = await WorkerManager.loadImageBitmap(url, asset);
      } else {
        src = await loadImageBitmap(url, asset);
      }
    } else {
      src = await new Promise((resolve) => {
        src = new Image();
        src.crossOrigin = this.config.crossOrigin;
        src.src = url;
        if (src.complete) {
          resolve(src);
        } else {
          src.onload = () => {
            resolve(src);
          };
        }
      });
    }
    const base = new ImageSource({
      resource: src,
      alphaMode: "premultiply-alpha-on-upload",
      resolution: asset.data?.resolution || getResolutionOfUrl(url),
      ...asset.data
    });
    return createTexture(base, loader, url);
  },
  unload(texture) {
    texture.destroy(true);
  }
};

// node_modules/pixi.js/lib/assets/loader/parsers/textures/loadVideoTextures.mjs
var validVideoExtensions = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"];
var validVideoMIMEs = validVideoExtensions.map((ext) => `video/${ext.substring(1)}`);
function crossOrigin(element, url, crossorigin) {
  if (crossorigin === void 0 && !url.startsWith("data:")) {
    element.crossOrigin = determineCrossOrigin(url);
  } else if (crossorigin !== false) {
    element.crossOrigin = typeof crossorigin === "string" ? crossorigin : "anonymous";
  }
}
function preloadVideo(element) {
  return new Promise((resolve, reject) => {
    element.addEventListener("canplaythrough", loaded);
    element.addEventListener("error", error);
    element.load();
    function loaded() {
      cleanup();
      resolve();
    }
    function error(err) {
      cleanup();
      reject(err);
    }
    function cleanup() {
      element.removeEventListener("canplaythrough", loaded);
      element.removeEventListener("error", error);
    }
  });
}
function determineCrossOrigin(url, loc = globalThis.location) {
  if (url.startsWith("data:")) {
    return "";
  }
  loc || (loc = globalThis.location);
  const parsedUrl = new URL(url, document.baseURI);
  if (parsedUrl.hostname !== loc.hostname || parsedUrl.port !== loc.port || parsedUrl.protocol !== loc.protocol) {
    return "anonymous";
  }
  return "";
}
var loadVideoTextures = {
  name: "loadVideo",
  extension: {
    type: ExtensionType.LoadParser,
    name: "loadVideo"
  },
  test(url) {
    const isValidDataUrl = checkDataUrl(url, validVideoMIMEs);
    const isValidExtension = checkExtension(url, validVideoExtensions);
    return isValidDataUrl || isValidExtension;
  },
  async load(url, asset, loader) {
    const options = {
      ...VideoSource.defaultOptions,
      resolution: asset.data?.resolution || getResolutionOfUrl(url),
      alphaMode: asset.data?.alphaMode || await detectVideoAlphaMode(),
      ...asset.data
    };
    const videoElement = document.createElement("video");
    const attributeMap = {
      preload: options.autoLoad !== false ? "auto" : void 0,
      "webkit-playsinline": options.playsinline !== false ? "" : void 0,
      playsinline: options.playsinline !== false ? "" : void 0,
      muted: options.muted === true ? "" : void 0,
      loop: options.loop === true ? "" : void 0,
      autoplay: options.autoPlay !== false ? "" : void 0
    };
    Object.keys(attributeMap).forEach((key) => {
      const value = attributeMap[key];
      if (value !== void 0)
        videoElement.setAttribute(key, value);
    });
    if (options.muted === true) {
      videoElement.muted = true;
    }
    crossOrigin(videoElement, url, options.crossorigin);
    const sourceElement = document.createElement("source");
    let mime;
    if (url.startsWith("data:")) {
      mime = url.slice(5, url.indexOf(";"));
    } else if (!url.startsWith("blob:")) {
      const ext = url.split("?")[0].slice(url.lastIndexOf(".") + 1).toLowerCase();
      mime = VideoSource.MIME_TYPES[ext] || `video/${ext}`;
    }
    sourceElement.src = url;
    if (mime) {
      sourceElement.type = mime;
    }
    return new Promise((resolve) => {
      const onCanPlay = async () => {
        const base = new VideoSource({ ...options, resource: videoElement });
        videoElement.removeEventListener("canplay", onCanPlay);
        if (asset.data.preload) {
          await preloadVideo(videoElement);
        }
        resolve(createTexture(base, loader, url));
      };
      videoElement.addEventListener("canplay", onCanPlay);
      videoElement.appendChild(sourceElement);
    });
  },
  unload(texture) {
    texture.destroy(true);
  }
};

// node_modules/pixi.js/lib/assets/resolver/parsers/resolveTextureUrl.mjs
var resolveTextureUrl = {
  extension: {
    type: ExtensionType.ResolveParser,
    name: "resolveTexture"
  },
  test: loadTextures.test,
  parse: (value) => ({
    resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
    format: value.split(".").pop(),
    src: value
  })
};

// node_modules/pixi.js/lib/assets/resolver/parsers/resolveJsonUrl.mjs
var resolveJsonUrl = {
  extension: {
    type: ExtensionType.ResolveParser,
    priority: -2,
    name: "resolveJson"
  },
  test: (value) => Resolver.RETINA_PREFIX.test(value) && value.endsWith(".json"),
  parse: resolveTextureUrl.parse
};

// node_modules/pixi.js/lib/assets/Assets.mjs
var AssetsClass = class {
  constructor() {
    this._detections = [];
    this._initialized = false;
    this.resolver = new Resolver();
    this.loader = new Loader();
    this.cache = Cache;
    this._backgroundLoader = new BackgroundLoader(this.loader);
    this._backgroundLoader.active = true;
    this.reset();
  }
  /**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Assets class to work, only if you want to set any initial properties
   * @param options - options to initialize the Assets manager with
   */
  async init(options = {}) {
    if (this._initialized) {
      warn("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
      return;
    }
    this._initialized = true;
    if (options.defaultSearchParams) {
      this.resolver.setDefaultSearchParams(options.defaultSearchParams);
    }
    if (options.basePath) {
      this.resolver.basePath = options.basePath;
    }
    if (options.bundleIdentifier) {
      this.resolver.setBundleIdentifier(options.bundleIdentifier);
    }
    if (options.manifest) {
      let manifest = options.manifest;
      if (typeof manifest === "string") {
        manifest = await this.load(manifest);
      }
      this.resolver.addManifest(manifest);
    }
    const resolutionPref = options.texturePreference?.resolution ?? 1;
    const resolution = typeof resolutionPref === "number" ? [resolutionPref] : resolutionPref;
    const formats = await this._detectFormats({
      preferredFormats: options.texturePreference?.format,
      skipDetections: options.skipDetections,
      detections: this._detections
    });
    this.resolver.prefer({
      params: {
        format: formats,
        resolution
      }
    });
    if (options.preferences) {
      this.setPreferences(options.preferences);
    }
  }
  /**
   * Allows you to specify how to resolve any assets load requests.
   * There are a few ways to add things here as shown below:
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Simple
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.png'});
   * const bunny = await Assets.load('bunnyBooBoo');
   *
   * // Multiple keys:
   * Assets.add({alias: ['burger', 'chicken'], src: 'bunny.png'});
   *
   * const bunny = await Assets.load('burger');
   * const bunny2 = await Assets.load('chicken');
   *
   * // passing options to to the object
   * Assets.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny.{png,webp}',
   *     data: { scaleMode: SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * // Multiple assets
   *
   * // The following all do the same thing:
   *
   * Assets.add({alias: 'bunnyBooBoo', src: 'bunny.{png,webp}'});
   *
   * Assets.add({
   *     alias: 'bunnyBooBoo',
   *     src: [
   *         'bunny.png',
   *         'bunny.webp',
   *    ],
   * });
   *
   * const bunny = await Assets.load('bunnyBooBoo'); // Will try to load WebP if available
   * @param assets - the unresolved assets to add to the resolver
   */
  add(assets) {
    this.resolver.add(assets);
  }
  async load(urls, onProgress) {
    if (!this._initialized) {
      await this.init();
    }
    const singleAsset = isSingleItem(urls);
    const urlArray = convertToList(urls).map((url) => {
      if (typeof url !== "string") {
        const aliases = this.resolver.getAlias(url);
        if (aliases.some((alias) => !this.resolver.hasKey(alias))) {
          this.add(url);
        }
        return Array.isArray(aliases) ? aliases[0] : aliases;
      }
      if (!this.resolver.hasKey(url))
        this.add({ alias: url, src: url });
      return url;
    });
    const resolveResults = this.resolver.resolve(urlArray);
    const out = await this._mapLoadToResolve(resolveResults, onProgress);
    return singleAsset ? out[urlArray[0]] : out;
  }
  /**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(bundleId, assets) {
    this.resolver.addBundle(bundleId, assets);
  }
  /**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * await Assets.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */
  async loadBundle(bundleIds, onProgress) {
    if (!this._initialized) {
      await this.init();
    }
    let singleAsset = false;
    if (typeof bundleIds === "string") {
      singleAsset = true;
      bundleIds = [bundleIds];
    }
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    const out = {};
    const keys = Object.keys(resolveResults);
    let count = 0;
    let total = 0;
    const _onProgress = () => {
      onProgress?.(++count / total);
    };
    const promises = keys.map((bundleId) => {
      const resolveResult = resolveResults[bundleId];
      total += Object.keys(resolveResult).length;
      return this._mapLoadToResolve(resolveResult, _onProgress).then((resolveResult2) => {
        out[bundleId] = resolveResult2;
      });
    });
    await Promise.all(promises);
    return singleAsset ? out[bundleIds[0]] : out;
  }
  /**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your initial load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */
  async backgroundLoad(urls) {
    if (!this._initialized) {
      await this.init();
    }
    if (typeof urls === "string") {
      urls = [urls];
    }
    const resolveResults = this.resolver.resolve(urls);
    this._backgroundLoader.add(Object.values(resolveResults));
  }
  /**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */
  async backgroundLoadBundle(bundleIds) {
    if (!this._initialized) {
      await this.init();
    }
    if (typeof bundleIds === "string") {
      bundleIds = [bundleIds];
    }
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    Object.values(resolveResults).forEach((resolveResult) => {
      this._backgroundLoader.add(Object.values(resolveResult));
    });
  }
  /**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */
  reset() {
    this.resolver.reset();
    this.loader.reset();
    this.cache.reset();
    this._initialized = false;
  }
  get(keys) {
    if (typeof keys === "string") {
      return Cache.get(keys);
    }
    const assets = {};
    for (let i = 0; i < keys.length; i++) {
      assets[i] = Cache.get(keys[i]);
    }
    return assets;
  }
  /**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */
  async _mapLoadToResolve(resolveResults, onProgress) {
    const resolveArray = [...new Set(Object.values(resolveResults))];
    this._backgroundLoader.active = false;
    const loadedAssets = await this.loader.load(resolveArray, onProgress);
    this._backgroundLoader.active = true;
    const out = {};
    resolveArray.forEach((resolveResult) => {
      const asset = loadedAssets[resolveResult.src];
      const keys = [resolveResult.src];
      if (resolveResult.alias) {
        keys.push(...resolveResult.alias);
      }
      keys.forEach((key) => {
        out[key] = asset;
      });
      Cache.set(keys, asset);
    });
    return out;
  }
  /**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */
  async unload(urls) {
    if (!this._initialized) {
      await this.init();
    }
    const urlArray = convertToList(urls).map((url) => typeof url !== "string" ? url.src : url);
    const resolveResults = this.resolver.resolve(urlArray);
    await this._unloadFromResolved(resolveResults);
  }
  /**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */
  async unloadBundle(bundleIds) {
    if (!this._initialized) {
      await this.init();
    }
    bundleIds = convertToList(bundleIds);
    const resolveResults = this.resolver.resolveBundle(bundleIds);
    const promises = Object.keys(resolveResults).map((bundleId) => this._unloadFromResolved(resolveResults[bundleId]));
    await Promise.all(promises);
  }
  async _unloadFromResolved(resolveResult) {
    const resolveArray = Object.values(resolveResult);
    resolveArray.forEach((resolveResult2) => {
      Cache.remove(resolveResult2.src);
    });
    await this.loader.unload(resolveArray);
  }
  /**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */
  async _detectFormats(options) {
    let formats = [];
    if (options.preferredFormats) {
      formats = Array.isArray(options.preferredFormats) ? options.preferredFormats : [options.preferredFormats];
    }
    for (const detection of options.detections) {
      if (options.skipDetections || await detection.test()) {
        formats = await detection.add(formats);
      } else if (!options.skipDetections) {
        formats = await detection.remove(formats);
      }
    }
    formats = formats.filter((format, index) => formats.indexOf(format) === index);
    return formats;
  }
  /** All the detection parsers currently added to the Assets class. */
  get detections() {
    return this._detections;
  }
  /**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */
  setPreferences(preferences) {
    this.loader.parsers.forEach((parser) => {
      if (!parser.config)
        return;
      Object.keys(parser.config).filter((key) => key in preferences).forEach((key) => {
        parser.config[key] = preferences[key];
      });
    });
  }
};
var Assets = new AssetsClass();
extensions.handleByList(ExtensionType.LoadParser, Assets.loader.parsers).handleByList(ExtensionType.ResolveParser, Assets.resolver.parsers).handleByList(ExtensionType.CacheParser, Assets.cache.parsers).handleByList(ExtensionType.DetectionParser, Assets.detections);
extensions.add(
  cacheTextureArray,
  detectDefaults,
  detectAvif,
  detectWebp,
  detectMp4,
  detectOgv,
  detectWebm,
  loadJson,
  loadTxt,
  loadWebFont,
  loadSvg,
  loadTextures,
  loadVideoTextures,
  loadBitmapFont,
  bitmapFontCachePlugin,
  resolveTextureUrl,
  resolveJsonUrl
);
var assetKeyMap = {
  loader: ExtensionType.LoadParser,
  resolver: ExtensionType.ResolveParser,
  cache: ExtensionType.CacheParser,
  detection: ExtensionType.DetectionParser
};
extensions.handle(ExtensionType.Asset, (extension) => {
  const ref = extension.ref;
  Object.entries(assetKeyMap).filter(([key]) => !!ref[key]).forEach(([key, type]) => extensions.add(Object.assign(
    ref[key],
    // Allow the function to optionally define it's own
    // ExtensionMetadata, the use cases here is priority for LoaderParsers
    { extension: ref[key].extension ?? type }
  )));
}, (extension) => {
  const ref = extension.ref;
  Object.keys(assetKeyMap).filter((key) => !!ref[key]).forEach((key) => extensions.remove(ref[key]));
});

// node_modules/pixi.js/lib/compressed-textures/basis/detectBasis.mjs
var detectBasis = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 3
  },
  test: async () => {
    if (await isWebGPUSupported())
      return true;
    if (isWebGLSupported())
      return true;
    return false;
  },
  add: async (formats) => [...formats, "basis"],
  remove: async (formats) => formats.filter((f) => f !== "basis")
};

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/sources/CompressedSource.mjs
var CompressedSource = class extends TextureSource {
  constructor(options) {
    super(options);
    this.uploadMethodId = "compressed";
    this.resource = options.resource;
    this.mipLevelCount = this.resource.length;
  }
};

// node_modules/pixi.js/lib/rendering/renderers/gl/texture/utils/getSupportedGlCompressedTextureFormats.mjs
var supportedGLCompressedTextureFormats;
function getSupportedGlCompressedTextureFormats() {
  if (supportedGLCompressedTextureFormats)
    return supportedGLCompressedTextureFormats;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return [];
  }
  supportedGLCompressedTextureFormats = [
    // BC compressed formats usable if "texture-compression-bc" is both
    // supported by the device/user agent and enabled in requestDevice.
    // 'bc6h-rgb-ufloat'
    // 'bc6h-rgb-float'
    // 'bc7-rgba-unorm',
    // 'bc7-rgba-unorm-srgb',
    ...gl.getExtension("EXT_texture_compression_bptc") ? [
      "bc6h-rgb-ufloat",
      "bc6h-rgb-float",
      "bc7-rgba-unorm",
      "bc7-rgba-unorm-srgb"
    ] : [],
    // BC compressed formats usable if "texture-compression-bc" is both
    // supported by the device/user agent and enabled in requestDevice.
    // 'bc1-rgba-unorm',
    // 'bc1-rgba-unorm-srgb',
    // 'bc4-r-unorm'
    // 'bc4-r-snorm'
    // 'bc5-rg-unorm'
    // 'bc5-rg-snorm'
    ...gl.getExtension("WEBGL_compressed_texture_s3tc") ? [
      "bc1-rgba-unorm",
      "bc2-rgba-unorm",
      "bc3-rgba-unorm"
    ] : [],
    ...gl.getExtension("WEBGL_compressed_texture_s3tc_srgb") ? [
      "bc1-rgba-unorm-srgb",
      "bc2-rgba-unorm-srgb",
      "bc3-rgba-unorm-srgb"
    ] : [],
    ...gl.getExtension("EXT_texture_compression_rgtc") ? [
      "bc4-r-unorm",
      "bc4-r-snorm",
      "bc5-rg-unorm",
      "bc5-rg-snorm"
    ] : [],
    // ETC2 compressed formats usable if "texture-compression-etc2" is both
    // supported by the device/user agent and enabled in requestDevice.
    ...gl.getExtension("WEBGL_compressed_texture_etc") ? [
      "etc2-rgb8unorm",
      "etc2-rgb8unorm-srgb",
      "etc2-rgba8unorm",
      "etc2-rgba8unorm-srgb",
      "etc2-rgb8a1unorm",
      "etc2-rgb8a1unorm-srgb",
      "eac-r11unorm",
      "eac-rg11unorm"
    ] : [],
    // 'eac-r11snorm',
    // 'eac-rg11snorm',
    // ASTC compressed formats usable if "texture-compression-astc" is both
    // supported by the device/user agent and enabled in requestDevice.
    ...gl.getExtension("WEBGL_compressed_texture_astc") ? [
      "astc-4x4-unorm",
      "astc-4x4-unorm-srgb",
      "astc-5x4-unorm",
      "astc-5x4-unorm-srgb",
      "astc-5x5-unorm",
      "astc-5x5-unorm-srgb",
      "astc-6x5-unorm",
      "astc-6x5-unorm-srgb",
      "astc-6x6-unorm",
      "astc-6x6-unorm-srgb",
      "astc-8x5-unorm",
      "astc-8x5-unorm-srgb",
      "astc-8x6-unorm",
      "astc-8x6-unorm-srgb",
      "astc-8x8-unorm",
      "astc-8x8-unorm-srgb",
      "astc-10x5-unorm",
      "astc-10x5-unorm-srgb",
      "astc-10x6-unorm",
      "astc-10x6-unorm-srgb",
      "astc-10x8-unorm",
      "astc-10x8-unorm-srgb",
      "astc-10x10-unorm",
      "astc-10x10-unorm-srgb",
      "astc-12x10-unorm",
      "astc-12x10-unorm-srgb",
      "astc-12x12-unorm",
      "astc-12x12-unorm-srgb"
    ] : []
  ];
  return supportedGLCompressedTextureFormats;
}

// node_modules/pixi.js/lib/rendering/renderers/gpu/texture/utils/getSupportedGPUCompressedTextureFormats.mjs
var supportedGPUCompressedTextureFormats;
async function getSupportedGPUCompressedTextureFormats() {
  if (supportedGPUCompressedTextureFormats)
    return supportedGPUCompressedTextureFormats;
  const adapter = await DOMAdapter.get().getNavigator().gpu.requestAdapter();
  supportedGPUCompressedTextureFormats = [
    ...adapter.features.has("texture-compression-bc") ? [
      // BC compressed formats usable if "texture-compression-bc" is both
      // supported by the device/user agent and enabled in requestDevice.
      "bc1-rgba-unorm",
      "bc1-rgba-unorm-srgb",
      "bc2-rgba-unorm",
      "bc2-rgba-unorm-srgb",
      "bc3-rgba-unorm",
      "bc3-rgba-unorm-srgb",
      "bc4-r-unorm",
      "bc4-r-snorm",
      "bc5-rg-unorm",
      "bc5-rg-snorm",
      "bc6h-rgb-ufloat",
      "bc6h-rgb-float",
      "bc7-rgba-unorm",
      "bc7-rgba-unorm-srgb"
    ] : [],
    ...adapter.features.has("texture-compression-etc2") ? [
      // ETC2 compressed formats usable if "texture-compression-etc2" is both
      // supported by the device/user agent and enabled in requestDevice.
      "etc2-rgb8unorm",
      "etc2-rgb8unorm-srgb",
      "etc2-rgb8a1unorm",
      "etc2-rgb8a1unorm-srgb",
      "etc2-rgba8unorm",
      "etc2-rgba8unorm-srgb",
      "eac-r11unorm",
      "eac-r11snorm",
      "eac-rg11unorm",
      "eac-rg11snorm"
    ] : [],
    ...adapter.features.has("texture-compression-astc") ? [
      // ASTC compressed formats usable if "texture-compression-astc" is both
      // supported by the device/user agent and enabled in requestDevice.
      "astc-4x4-unorm",
      "astc-4x4-unorm-srgb",
      "astc-5x4-unorm",
      "astc-5x4-unorm-srgb",
      "astc-5x5-unorm",
      "astc-5x5-unorm-srgb",
      "astc-6x5-unorm",
      "astc-6x5-unorm-srgb",
      "astc-6x6-unorm",
      "astc-6x6-unorm-srgb",
      "astc-8x5-unorm",
      "astc-8x5-unorm-srgb",
      "astc-8x6-unorm",
      "astc-8x6-unorm-srgb",
      "astc-8x8-unorm",
      "astc-8x8-unorm-srgb",
      "astc-10x5-unorm",
      "astc-10x5-unorm-srgb",
      "astc-10x6-unorm",
      "astc-10x6-unorm-srgb",
      "astc-10x8-unorm",
      "astc-10x8-unorm-srgb",
      "astc-10x10-unorm",
      "astc-10x10-unorm-srgb",
      "astc-12x10-unorm",
      "astc-12x10-unorm-srgb",
      "astc-12x12-unorm",
      "astc-12x12-unorm-srgb"
    ] : []
  ];
  return supportedGPUCompressedTextureFormats;
}

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/getSupportedCompressedTextureFormats.mjs
var supportedCompressedTextureFormats;
async function getSupportedCompressedTextureFormats() {
  if (supportedCompressedTextureFormats !== void 0)
    return supportedCompressedTextureFormats;
  supportedCompressedTextureFormats = await (async () => {
    const _isWebGPUSupported2 = await isWebGPUSupported();
    const _isWebGLSupported2 = isWebGLSupported();
    if (_isWebGPUSupported2 && _isWebGLSupported2) {
      const gpuTextureFormats = await getSupportedGPUCompressedTextureFormats();
      const glTextureFormats = getSupportedGlCompressedTextureFormats();
      return gpuTextureFormats.filter((format) => glTextureFormats.includes(format));
    } else if (_isWebGPUSupported2) {
      return await getSupportedGPUCompressedTextureFormats();
    } else if (_isWebGLSupported2) {
      return getSupportedGlCompressedTextureFormats();
    }
    return [];
  })();
  return supportedCompressedTextureFormats;
}

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/utils/getSupportedTextureFormats.mjs
var nonCompressedFormats = [
  // 8-bit formats
  "r8unorm",
  "r8snorm",
  "r8uint",
  "r8sint",
  // 16-bit formats
  "r16uint",
  "r16sint",
  "r16float",
  "rg8unorm",
  "rg8snorm",
  "rg8uint",
  "rg8sint",
  // 32-bit formats
  "r32uint",
  "r32sint",
  "r32float",
  "rg16uint",
  "rg16sint",
  "rg16float",
  "rgba8unorm",
  "rgba8unorm-srgb",
  "rgba8snorm",
  "rgba8uint",
  "rgba8sint",
  "bgra8unorm",
  "bgra8unorm-srgb",
  // Packed 32-bit formats
  "rgb9e5ufloat",
  "rgb10a2unorm",
  "rg11b10ufloat",
  // 64-bit formats
  "rg32uint",
  "rg32sint",
  "rg32float",
  "rgba16uint",
  "rgba16sint",
  "rgba16float",
  // 128-bit formats
  "rgba32uint",
  "rgba32sint",
  "rgba32float",
  // Depth/stencil formats
  "stencil8",
  "depth16unorm",
  "depth24plus",
  "depth24plus-stencil8",
  "depth32float",
  // "depth32float-stencil8" feature
  "depth32float-stencil8"
];
var supportedTextureFormats;
async function getSupportedTextureFormats() {
  if (supportedTextureFormats !== void 0)
    return supportedTextureFormats;
  const compressedTextureFormats = await getSupportedCompressedTextureFormats();
  supportedTextureFormats = [
    ...nonCompressedFormats,
    ...compressedTextureFormats
  ];
  return supportedTextureFormats;
}

// node_modules/pixi.js/lib/_virtual/basis.worker.mjs
var WORKER_CODE3 = '(function () {\n    \'use strict\';\n\n    function createLevelBuffers(basisTexture, basisTranscoderFormat) {\n      const images = basisTexture.getNumImages();\n      const levels = basisTexture.getNumLevels(0);\n      const success = basisTexture.startTranscoding();\n      if (!success) {\n        throw new Error("startTranscoding failed");\n      }\n      const levelBuffers = [];\n      for (let levelIndex = 0; levelIndex < levels; ++levelIndex) {\n        for (let sliceIndex = 0; sliceIndex < images; ++sliceIndex) {\n          const transcodeSize = basisTexture.getImageTranscodedSizeInBytes(sliceIndex, levelIndex, basisTranscoderFormat);\n          const levelBuffer = new Uint8Array(transcodeSize);\n          const success2 = basisTexture.transcodeImage(levelBuffer, sliceIndex, levelIndex, basisTranscoderFormat, 1, 0);\n          if (!success2) {\n            throw new Error("transcodeImage failed");\n          }\n          levelBuffers.push(levelBuffer);\n        }\n      }\n      return levelBuffers;\n    }\n\n    const gpuFormatToBasisTranscoderFormatMap = {\n      "bc3-rgba-unorm": 3,\n      // cTFBC3_RGBA\n      "bc7-rgba-unorm": 6,\n      // cTFBC7_RGBA,\n      "etc2-rgba8unorm": 1,\n      // cTFETC2_RGBA,\n      "astc-4x4-unorm": 10,\n      // cTFASTC_4x4_RGBA,\n      // Uncompressed\n      rgba8unorm: 13,\n      // cTFRGBA32,\n      rgba4unorm: 16\n      // cTFRGBA4444,\n    };\n    function gpuFormatToBasisTranscoderFormat(transcoderFormat) {\n      const format = gpuFormatToBasisTranscoderFormatMap[transcoderFormat];\n      if (format) {\n        return format;\n      }\n      throw new Error(`Unsupported transcoderFormat: ${transcoderFormat}`);\n    }\n\n    const settings = {\n      jsUrl: "basis/basis_transcoder.js",\n      wasmUrl: "basis/basis_transcoder.wasm"\n    };\n    let basisTranscoderFormat;\n    let basisTranscodedTextureFormat;\n    let basisPromise;\n    async function getBasis() {\n      if (!basisPromise) {\n        const absoluteJsUrl = new URL(settings.jsUrl, location.origin).href;\n        const absoluteWasmUrl = new URL(settings.wasmUrl, location.origin).href;\n        importScripts(absoluteJsUrl);\n        basisPromise = new Promise((resolve) => {\n          BASIS({\n            locateFile: (_file) => absoluteWasmUrl\n          }).then((module) => {\n            module.initializeBasis();\n            resolve(module.BasisFile);\n          });\n        });\n      }\n      return basisPromise;\n    }\n    async function fetchBasisTexture(url, BasisTexture) {\n      const basisResponse = await fetch(url);\n      if (basisResponse.ok) {\n        const basisArrayBuffer = await basisResponse.arrayBuffer();\n        return new BasisTexture(new Uint8Array(basisArrayBuffer));\n      }\n      throw new Error(`Failed to load Basis texture: ${url}`);\n    }\n    const preferredTranscodedFormat = [\n      "bc7-rgba-unorm",\n      "astc-4x4-unorm",\n      "etc2-rgba8unorm",\n      "bc3-rgba-unorm",\n      "rgba8unorm"\n    ];\n    async function load(url) {\n      const BasisTexture = await getBasis();\n      const basisTexture = await fetchBasisTexture(url, BasisTexture);\n      const levelBuffers = createLevelBuffers(basisTexture, basisTranscoderFormat);\n      return {\n        width: basisTexture.getImageWidth(0, 0),\n        height: basisTexture.getImageHeight(0, 0),\n        format: basisTranscodedTextureFormat,\n        resource: levelBuffers,\n        alphaMode: "no-premultiply-alpha"\n      };\n    }\n    async function init(jsUrl, wasmUrl, supportedTextures) {\n      if (jsUrl)\n        settings.jsUrl = jsUrl;\n      if (wasmUrl)\n        settings.wasmUrl = wasmUrl;\n      basisTranscodedTextureFormat = preferredTranscodedFormat.filter((format) => supportedTextures.includes(format))[0];\n      basisTranscoderFormat = gpuFormatToBasisTranscoderFormat(basisTranscodedTextureFormat);\n      await getBasis();\n    }\n    const messageHandlers = {\n      init: async (data) => {\n        const { jsUrl, wasmUrl, supportedTextures } = data;\n        await init(jsUrl, wasmUrl, supportedTextures);\n      },\n      load: async (data) => {\n        try {\n          const textureOptions = await load(data.url);\n          return {\n            type: "load",\n            url: data.url,\n            success: true,\n            textureOptions,\n            transferables: textureOptions.resource?.map((arr) => arr.buffer)\n          };\n        } catch (e) {\n          throw e;\n        }\n      }\n    };\n    self.onmessage = async (messageEvent) => {\n      const message = messageEvent.data;\n      const response = await messageHandlers[message.type](message);\n      if (response) {\n        self.postMessage(response, response.transferables);\n      }\n    };\n\n})();\n';
var WORKER_URL3 = null;
var WorkerInstance3 = class {
  constructor() {
    if (!WORKER_URL3) {
      WORKER_URL3 = URL.createObjectURL(new Blob([WORKER_CODE3], { type: "application/javascript" }));
    }
    this.worker = new Worker(WORKER_URL3);
  }
};
WorkerInstance3.revokeObjectURL = function revokeObjectURL3() {
  if (WORKER_URL3) {
    URL.revokeObjectURL(WORKER_URL3);
    WORKER_URL3 = null;
  }
};

// node_modules/pixi.js/lib/compressed-textures/basis/utils/setBasisTranscoderPath.mjs
var basisTranscoderUrls = {
  jsUrl: "https://files.pixijs.download/transcoders/basis/basis_transcoder.js",
  wasmUrl: "https://files.pixijs.download/transcoders/basis/basis_transcoder.wasm"
};

// node_modules/pixi.js/lib/compressed-textures/basis/worker/loadBasisOnWorker.mjs
var basisWorker;
var urlHash = {};
function getBasisWorker(supportedTextures) {
  if (!basisWorker) {
    basisWorker = new WorkerInstance3().worker;
    basisWorker.onmessage = (messageEvent) => {
      const { success, url, textureOptions } = messageEvent.data;
      if (!success) {
        console.warn("Failed to load Basis texture", url);
      }
      urlHash[url](textureOptions);
    };
    basisWorker.postMessage({
      type: "init",
      jsUrl: basisTranscoderUrls.jsUrl,
      wasmUrl: basisTranscoderUrls.wasmUrl,
      supportedTextures
    });
  }
  return basisWorker;
}
function loadBasisOnWorker(url, supportedTextures) {
  const ktxWorker2 = getBasisWorker(supportedTextures);
  return new Promise((resolve) => {
    urlHash[url] = resolve;
    ktxWorker2.postMessage({ type: "load", url });
  });
}

// node_modules/pixi.js/lib/compressed-textures/basis/loadBasis.mjs
var loadBasis = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
    name: "loadBasis"
  },
  name: "loadBasis",
  test(url) {
    return checkExtension(url, [".basis"]);
  },
  async load(url, _asset, loader) {
    const supportedTextures = await getSupportedTextureFormats();
    const textureOptions = await loadBasisOnWorker(url, supportedTextures);
    const compressedTextureSource = new CompressedSource(textureOptions);
    return createTexture(compressedTextureSource, loader, url);
  },
  unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};

// node_modules/pixi.js/lib/compressed-textures/dds/const.mjs
var DDS_HEADER_FIELDS = {
  MAGIC: 0,
  SIZE: 1,
  FLAGS: 2,
  HEIGHT: 3,
  WIDTH: 4,
  MIPMAP_COUNT: 7,
  PIXEL_FORMAT: 19,
  PF_FLAGS: 20,
  FOURCC: 21,
  RGB_BITCOUNT: 22,
  R_BIT_MASK: 23,
  G_BIT_MASK: 24,
  B_BIT_MASK: 25,
  A_BIT_MASK: 26
};
var DDS_DX10_FIELDS = {
  DXGI_FORMAT: 0,
  RESOURCE_DIMENSION: 1,
  MISC_FLAG: 2,
  ARRAY_SIZE: 3,
  MISC_FLAGS2: 4
};
var DXGI_FORMAT = ((DXGI_FORMAT2) => {
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_UNKNOWN"] = 0] = "DXGI_FORMAT_UNKNOWN";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_TYPELESS"] = 1] = "DXGI_FORMAT_R32G32B32A32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_FLOAT"] = 2] = "DXGI_FORMAT_R32G32B32A32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_UINT"] = 3] = "DXGI_FORMAT_R32G32B32A32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32A32_SINT"] = 4] = "DXGI_FORMAT_R32G32B32A32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_TYPELESS"] = 5] = "DXGI_FORMAT_R32G32B32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_FLOAT"] = 6] = "DXGI_FORMAT_R32G32B32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_UINT"] = 7] = "DXGI_FORMAT_R32G32B32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32B32_SINT"] = 8] = "DXGI_FORMAT_R32G32B32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_TYPELESS"] = 9] = "DXGI_FORMAT_R16G16B16A16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_FLOAT"] = 10] = "DXGI_FORMAT_R16G16B16A16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_UNORM"] = 11] = "DXGI_FORMAT_R16G16B16A16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_UINT"] = 12] = "DXGI_FORMAT_R16G16B16A16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_SNORM"] = 13] = "DXGI_FORMAT_R16G16B16A16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16B16A16_SINT"] = 14] = "DXGI_FORMAT_R16G16B16A16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_TYPELESS"] = 15] = "DXGI_FORMAT_R32G32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_FLOAT"] = 16] = "DXGI_FORMAT_R32G32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_UINT"] = 17] = "DXGI_FORMAT_R32G32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G32_SINT"] = 18] = "DXGI_FORMAT_R32G32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32G8X24_TYPELESS"] = 19] = "DXGI_FORMAT_R32G8X24_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D32_FLOAT_S8X24_UINT"] = 20] = "DXGI_FORMAT_D32_FLOAT_S8X24_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS"] = 21] = "DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_X32_TYPELESS_G8X24_UINT"] = 22] = "DXGI_FORMAT_X32_TYPELESS_G8X24_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_TYPELESS"] = 23] = "DXGI_FORMAT_R10G10B10A2_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_UNORM"] = 24] = "DXGI_FORMAT_R10G10B10A2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10A2_UINT"] = 25] = "DXGI_FORMAT_R10G10B10A2_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R11G11B10_FLOAT"] = 26] = "DXGI_FORMAT_R11G11B10_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_TYPELESS"] = 27] = "DXGI_FORMAT_R8G8B8A8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UNORM"] = 28] = "DXGI_FORMAT_R8G8B8A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UNORM_SRGB"] = 29] = "DXGI_FORMAT_R8G8B8A8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_UINT"] = 30] = "DXGI_FORMAT_R8G8B8A8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_SNORM"] = 31] = "DXGI_FORMAT_R8G8B8A8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8B8A8_SINT"] = 32] = "DXGI_FORMAT_R8G8B8A8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_TYPELESS"] = 33] = "DXGI_FORMAT_R16G16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_FLOAT"] = 34] = "DXGI_FORMAT_R16G16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_UNORM"] = 35] = "DXGI_FORMAT_R16G16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_UINT"] = 36] = "DXGI_FORMAT_R16G16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_SNORM"] = 37] = "DXGI_FORMAT_R16G16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16G16_SINT"] = 38] = "DXGI_FORMAT_R16G16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_TYPELESS"] = 39] = "DXGI_FORMAT_R32_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D32_FLOAT"] = 40] = "DXGI_FORMAT_D32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_FLOAT"] = 41] = "DXGI_FORMAT_R32_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_UINT"] = 42] = "DXGI_FORMAT_R32_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R32_SINT"] = 43] = "DXGI_FORMAT_R32_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R24G8_TYPELESS"] = 44] = "DXGI_FORMAT_R24G8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D24_UNORM_S8_UINT"] = 45] = "DXGI_FORMAT_D24_UNORM_S8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R24_UNORM_X8_TYPELESS"] = 46] = "DXGI_FORMAT_R24_UNORM_X8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_X24_TYPELESS_G8_UINT"] = 47] = "DXGI_FORMAT_X24_TYPELESS_G8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_TYPELESS"] = 48] = "DXGI_FORMAT_R8G8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_UNORM"] = 49] = "DXGI_FORMAT_R8G8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_UINT"] = 50] = "DXGI_FORMAT_R8G8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_SNORM"] = 51] = "DXGI_FORMAT_R8G8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_SINT"] = 52] = "DXGI_FORMAT_R8G8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_TYPELESS"] = 53] = "DXGI_FORMAT_R16_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_FLOAT"] = 54] = "DXGI_FORMAT_R16_FLOAT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_D16_UNORM"] = 55] = "DXGI_FORMAT_D16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_UNORM"] = 56] = "DXGI_FORMAT_R16_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_UINT"] = 57] = "DXGI_FORMAT_R16_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_SNORM"] = 58] = "DXGI_FORMAT_R16_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R16_SINT"] = 59] = "DXGI_FORMAT_R16_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_TYPELESS"] = 60] = "DXGI_FORMAT_R8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_UNORM"] = 61] = "DXGI_FORMAT_R8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_UINT"] = 62] = "DXGI_FORMAT_R8_UINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_SNORM"] = 63] = "DXGI_FORMAT_R8_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8_SINT"] = 64] = "DXGI_FORMAT_R8_SINT";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_A8_UNORM"] = 65] = "DXGI_FORMAT_A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R1_UNORM"] = 66] = "DXGI_FORMAT_R1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R9G9B9E5_SHAREDEXP"] = 67] = "DXGI_FORMAT_R9G9B9E5_SHAREDEXP";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R8G8_B8G8_UNORM"] = 68] = "DXGI_FORMAT_R8G8_B8G8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_G8R8_G8B8_UNORM"] = 69] = "DXGI_FORMAT_G8R8_G8B8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_TYPELESS"] = 70] = "DXGI_FORMAT_BC1_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_UNORM"] = 71] = "DXGI_FORMAT_BC1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC1_UNORM_SRGB"] = 72] = "DXGI_FORMAT_BC1_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_TYPELESS"] = 73] = "DXGI_FORMAT_BC2_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_UNORM"] = 74] = "DXGI_FORMAT_BC2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC2_UNORM_SRGB"] = 75] = "DXGI_FORMAT_BC2_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_TYPELESS"] = 76] = "DXGI_FORMAT_BC3_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_UNORM"] = 77] = "DXGI_FORMAT_BC3_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC3_UNORM_SRGB"] = 78] = "DXGI_FORMAT_BC3_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_TYPELESS"] = 79] = "DXGI_FORMAT_BC4_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_UNORM"] = 80] = "DXGI_FORMAT_BC4_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC4_SNORM"] = 81] = "DXGI_FORMAT_BC4_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_TYPELESS"] = 82] = "DXGI_FORMAT_BC5_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_UNORM"] = 83] = "DXGI_FORMAT_BC5_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC5_SNORM"] = 84] = "DXGI_FORMAT_BC5_SNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B5G6R5_UNORM"] = 85] = "DXGI_FORMAT_B5G6R5_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B5G5R5A1_UNORM"] = 86] = "DXGI_FORMAT_B5G5R5A1_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_UNORM"] = 87] = "DXGI_FORMAT_B8G8R8A8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_UNORM"] = 88] = "DXGI_FORMAT_B8G8R8X8_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM"] = 89] = "DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_TYPELESS"] = 90] = "DXGI_FORMAT_B8G8R8A8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8A8_UNORM_SRGB"] = 91] = "DXGI_FORMAT_B8G8R8A8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_TYPELESS"] = 92] = "DXGI_FORMAT_B8G8R8X8_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B8G8R8X8_UNORM_SRGB"] = 93] = "DXGI_FORMAT_B8G8R8X8_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_TYPELESS"] = 94] = "DXGI_FORMAT_BC6H_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_UF16"] = 95] = "DXGI_FORMAT_BC6H_UF16";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC6H_SF16"] = 96] = "DXGI_FORMAT_BC6H_SF16";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_TYPELESS"] = 97] = "DXGI_FORMAT_BC7_TYPELESS";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_UNORM"] = 98] = "DXGI_FORMAT_BC7_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_BC7_UNORM_SRGB"] = 99] = "DXGI_FORMAT_BC7_UNORM_SRGB";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_AYUV"] = 100] = "DXGI_FORMAT_AYUV";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y410"] = 101] = "DXGI_FORMAT_Y410";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y416"] = 102] = "DXGI_FORMAT_Y416";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_NV12"] = 103] = "DXGI_FORMAT_NV12";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P010"] = 104] = "DXGI_FORMAT_P010";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P016"] = 105] = "DXGI_FORMAT_P016";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_420_OPAQUE"] = 106] = "DXGI_FORMAT_420_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_YUY2"] = 107] = "DXGI_FORMAT_YUY2";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y210"] = 108] = "DXGI_FORMAT_Y210";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_Y216"] = 109] = "DXGI_FORMAT_Y216";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_NV11"] = 110] = "DXGI_FORMAT_NV11";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_AI44"] = 111] = "DXGI_FORMAT_AI44";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_IA44"] = 112] = "DXGI_FORMAT_IA44";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P8"] = 113] = "DXGI_FORMAT_P8";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_A8P8"] = 114] = "DXGI_FORMAT_A8P8";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_B4G4R4A4_UNORM"] = 115] = "DXGI_FORMAT_B4G4R4A4_UNORM";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_P208"] = 116] = "DXGI_FORMAT_P208";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_V208"] = 117] = "DXGI_FORMAT_V208";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_V408"] = 118] = "DXGI_FORMAT_V408";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE"] = 119] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE"] = 120] = "DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE";
  DXGI_FORMAT2[DXGI_FORMAT2["DXGI_FORMAT_FORCE_UINT"] = 121] = "DXGI_FORMAT_FORCE_UINT";
  return DXGI_FORMAT2;
})(DXGI_FORMAT || {});
var D3D10_RESOURCE_DIMENSION = ((D3D10_RESOURCE_DIMENSION2) => {
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE1D"] = 2] = "DDS_DIMENSION_TEXTURE1D";
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE2D"] = 3] = "DDS_DIMENSION_TEXTURE2D";
  D3D10_RESOURCE_DIMENSION2[D3D10_RESOURCE_DIMENSION2["DDS_DIMENSION_TEXTURE3D"] = 6] = "DDS_DIMENSION_TEXTURE3D";
  return D3D10_RESOURCE_DIMENSION2;
})(D3D10_RESOURCE_DIMENSION || {});
function fourCCToInt32(value) {
  return value.charCodeAt(0) + (value.charCodeAt(1) << 8) + (value.charCodeAt(2) << 16) + (value.charCodeAt(3) << 24);
}
var D3DFMT = ((D3DFMT2) => {
  D3DFMT2[D3DFMT2["UNKNOWN"] = 0] = "UNKNOWN";
  D3DFMT2[D3DFMT2["R8G8B8"] = 20] = "R8G8B8";
  D3DFMT2[D3DFMT2["A8R8G8B8"] = 21] = "A8R8G8B8";
  D3DFMT2[D3DFMT2["X8R8G8B8"] = 22] = "X8R8G8B8";
  D3DFMT2[D3DFMT2["R5G6B5"] = 23] = "R5G6B5";
  D3DFMT2[D3DFMT2["X1R5G5B5"] = 24] = "X1R5G5B5";
  D3DFMT2[D3DFMT2["A1R5G5B5"] = 25] = "A1R5G5B5";
  D3DFMT2[D3DFMT2["A4R4G4B4"] = 26] = "A4R4G4B4";
  D3DFMT2[D3DFMT2["R3G3B2"] = 27] = "R3G3B2";
  D3DFMT2[D3DFMT2["A8"] = 28] = "A8";
  D3DFMT2[D3DFMT2["A8R3G3B2"] = 29] = "A8R3G3B2";
  D3DFMT2[D3DFMT2["X4R4G4B4"] = 30] = "X4R4G4B4";
  D3DFMT2[D3DFMT2["A2B10G10R10"] = 31] = "A2B10G10R10";
  D3DFMT2[D3DFMT2["A8B8G8R8"] = 32] = "A8B8G8R8";
  D3DFMT2[D3DFMT2["X8B8G8R8"] = 33] = "X8B8G8R8";
  D3DFMT2[D3DFMT2["G16R16"] = 34] = "G16R16";
  D3DFMT2[D3DFMT2["A2R10G10B10"] = 35] = "A2R10G10B10";
  D3DFMT2[D3DFMT2["A16B16G16R16"] = 36] = "A16B16G16R16";
  D3DFMT2[D3DFMT2["A8P8"] = 40] = "A8P8";
  D3DFMT2[D3DFMT2["P8"] = 41] = "P8";
  D3DFMT2[D3DFMT2["L8"] = 50] = "L8";
  D3DFMT2[D3DFMT2["A8L8"] = 51] = "A8L8";
  D3DFMT2[D3DFMT2["A4L4"] = 52] = "A4L4";
  D3DFMT2[D3DFMT2["V8U8"] = 60] = "V8U8";
  D3DFMT2[D3DFMT2["L6V5U5"] = 61] = "L6V5U5";
  D3DFMT2[D3DFMT2["X8L8V8U8"] = 62] = "X8L8V8U8";
  D3DFMT2[D3DFMT2["Q8W8V8U8"] = 63] = "Q8W8V8U8";
  D3DFMT2[D3DFMT2["V16U16"] = 64] = "V16U16";
  D3DFMT2[D3DFMT2["A2W10V10U10"] = 67] = "A2W10V10U10";
  D3DFMT2[D3DFMT2["Q16W16V16U16"] = 110] = "Q16W16V16U16";
  D3DFMT2[D3DFMT2["R16F"] = 111] = "R16F";
  D3DFMT2[D3DFMT2["G16R16F"] = 112] = "G16R16F";
  D3DFMT2[D3DFMT2["A16B16G16R16F"] = 113] = "A16B16G16R16F";
  D3DFMT2[D3DFMT2["R32F"] = 114] = "R32F";
  D3DFMT2[D3DFMT2["G32R32F"] = 115] = "G32R32F";
  D3DFMT2[D3DFMT2["A32B32G32R32F"] = 116] = "A32B32G32R32F";
  D3DFMT2[D3DFMT2["UYVY"] = fourCCToInt32("UYVY")] = "UYVY";
  D3DFMT2[D3DFMT2["R8G8_B8G8"] = fourCCToInt32("RGBG")] = "R8G8_B8G8";
  D3DFMT2[D3DFMT2["YUY2"] = fourCCToInt32("YUY2")] = "YUY2";
  D3DFMT2[D3DFMT2["D3DFMT_G8R8_G8B8"] = fourCCToInt32("GRGB")] = "D3DFMT_G8R8_G8B8";
  D3DFMT2[D3DFMT2["DXT1"] = fourCCToInt32("DXT1")] = "DXT1";
  D3DFMT2[D3DFMT2["DXT2"] = fourCCToInt32("DXT2")] = "DXT2";
  D3DFMT2[D3DFMT2["DXT3"] = fourCCToInt32("DXT3")] = "DXT3";
  D3DFMT2[D3DFMT2["DXT4"] = fourCCToInt32("DXT4")] = "DXT4";
  D3DFMT2[D3DFMT2["DXT5"] = fourCCToInt32("DXT5")] = "DXT5";
  D3DFMT2[D3DFMT2["ATI1"] = fourCCToInt32("ATI1")] = "ATI1";
  D3DFMT2[D3DFMT2["AT1N"] = fourCCToInt32("AT1N")] = "AT1N";
  D3DFMT2[D3DFMT2["ATI2"] = fourCCToInt32("ATI2")] = "ATI2";
  D3DFMT2[D3DFMT2["AT2N"] = fourCCToInt32("AT2N")] = "AT2N";
  D3DFMT2[D3DFMT2["BC4U"] = fourCCToInt32("BC4U")] = "BC4U";
  D3DFMT2[D3DFMT2["BC4S"] = fourCCToInt32("BC4S")] = "BC4S";
  D3DFMT2[D3DFMT2["BC5U"] = fourCCToInt32("BC5U")] = "BC5U";
  D3DFMT2[D3DFMT2["BC5S"] = fourCCToInt32("BC5S")] = "BC5S";
  D3DFMT2[D3DFMT2["DX10"] = fourCCToInt32("DX10")] = "DX10";
  return D3DFMT2;
})(D3DFMT || {});
var FOURCC_TO_TEXTURE_FORMAT = {
  [D3DFMT.DXT1]: "bc1-rgba-unorm",
  [D3DFMT.DXT2]: "bc2-rgba-unorm",
  [D3DFMT.DXT3]: "bc2-rgba-unorm",
  [D3DFMT.DXT4]: "bc3-rgba-unorm",
  [D3DFMT.DXT5]: "bc3-rgba-unorm",
  [D3DFMT.ATI1]: "bc4-r-unorm",
  [D3DFMT.BC4U]: "bc4-r-unorm",
  [D3DFMT.BC4S]: "bc4-r-snorm",
  [D3DFMT.ATI2]: "bc5-rg-unorm",
  [D3DFMT.BC5U]: "bc5-rg-unorm",
  [D3DFMT.BC5S]: "bc5-rg-snorm",
  [
    36
    /* A16B16G16R16 */
  ]: "rgba16uint",
  [
    110
    /* Q16W16V16U16 */
  ]: "rgba16sint",
  [
    111
    /* R16F */
  ]: "r16float",
  [
    112
    /* G16R16F */
  ]: "rg16float",
  [
    113
    /* A16B16G16R16F */
  ]: "rgba16float",
  [
    114
    /* R32F */
  ]: "r32float",
  [
    115
    /* G32R32F */
  ]: "rg32float",
  [
    116
    /* A32B32G32R32F */
  ]: "rgba32float"
};
var DXGI_TO_TEXTURE_FORMAT = {
  [
    70
    /* DXGI_FORMAT_BC1_TYPELESS */
  ]: "bc1-rgba-unorm",
  [
    71
    /* DXGI_FORMAT_BC1_UNORM */
  ]: "bc1-rgba-unorm",
  [
    72
    /* DXGI_FORMAT_BC1_UNORM_SRGB */
  ]: "bc1-rgba-unorm-srgb",
  [
    73
    /* DXGI_FORMAT_BC2_TYPELESS */
  ]: "bc2-rgba-unorm",
  [
    74
    /* DXGI_FORMAT_BC2_UNORM */
  ]: "bc2-rgba-unorm",
  [
    75
    /* DXGI_FORMAT_BC2_UNORM_SRGB */
  ]: "bc2-rgba-unorm-srgb",
  [
    76
    /* DXGI_FORMAT_BC3_TYPELESS */
  ]: "bc3-rgba-unorm",
  [
    77
    /* DXGI_FORMAT_BC3_UNORM */
  ]: "bc3-rgba-unorm",
  [
    78
    /* DXGI_FORMAT_BC3_UNORM_SRGB */
  ]: "bc3-rgba-unorm-srgb",
  [
    79
    /* DXGI_FORMAT_BC4_TYPELESS */
  ]: "bc4-r-unorm",
  [
    80
    /* DXGI_FORMAT_BC4_UNORM */
  ]: "bc4-r-unorm",
  [
    81
    /* DXGI_FORMAT_BC4_SNORM */
  ]: "bc4-r-snorm",
  [
    82
    /* DXGI_FORMAT_BC5_TYPELESS */
  ]: "bc5-rg-unorm",
  [
    83
    /* DXGI_FORMAT_BC5_UNORM */
  ]: "bc5-rg-unorm",
  [
    84
    /* DXGI_FORMAT_BC5_SNORM */
  ]: "bc5-rg-snorm",
  [
    94
    /* DXGI_FORMAT_BC6H_TYPELESS */
  ]: "bc6h-rgb-ufloat",
  [
    95
    /* DXGI_FORMAT_BC6H_UF16 */
  ]: "bc6h-rgb-ufloat",
  [
    96
    /* DXGI_FORMAT_BC6H_SF16 */
  ]: "bc6h-rgb-float",
  [
    97
    /* DXGI_FORMAT_BC7_TYPELESS */
  ]: "bc7-rgba-unorm",
  [
    98
    /* DXGI_FORMAT_BC7_UNORM */
  ]: "bc7-rgba-unorm",
  [
    99
    /* DXGI_FORMAT_BC7_UNORM_SRGB */
  ]: "bc7-rgba-unorm-srgb",
  [
    28
    /* DXGI_FORMAT_R8G8B8A8_UNORM */
  ]: "rgba8unorm",
  [
    29
    /* DXGI_FORMAT_R8G8B8A8_UNORM_SRGB */
  ]: "rgba8unorm-srgb",
  [
    87
    /* DXGI_FORMAT_B8G8R8A8_UNORM */
  ]: "bgra8unorm",
  [
    91
    /* DXGI_FORMAT_B8G8R8A8_UNORM_SRGB */
  ]: "bgra8unorm-srgb",
  [
    41
    /* DXGI_FORMAT_R32_FLOAT */
  ]: "r32float",
  [
    49
    /* DXGI_FORMAT_R8G8_UNORM */
  ]: "rg8unorm",
  [
    56
    /* DXGI_FORMAT_R16_UNORM */
  ]: "r16uint",
  [
    61
    /* DXGI_FORMAT_R8_UNORM */
  ]: "r8unorm",
  [
    24
    /* DXGI_FORMAT_R10G10B10A2_UNORM */
  ]: "rgb10a2unorm",
  [
    11
    /* DXGI_FORMAT_R16G16B16A16_UNORM */
  ]: "rgba16uint",
  [
    13
    /* DXGI_FORMAT_R16G16B16A16_SNORM */
  ]: "rgba16sint",
  [
    10
    /* DXGI_FORMAT_R16G16B16A16_FLOAT */
  ]: "rgba16float",
  [
    54
    /* DXGI_FORMAT_R16_FLOAT */
  ]: "r16float",
  [
    34
    /* DXGI_FORMAT_R16G16_FLOAT */
  ]: "rg16float",
  [
    16
    /* DXGI_FORMAT_R32G32_FLOAT */
  ]: "rg32float",
  [
    2
    /* DXGI_FORMAT_R32G32B32A32_FLOAT */
  ]: "rgba32float"
};
var DDS = {
  MAGIC_VALUE: 542327876,
  MAGIC_SIZE: 4,
  HEADER_SIZE: 124,
  HEADER_DX10_SIZE: 20,
  PIXEL_FORMAT_FLAGS: {
    // PIXEL_FORMAT flags
    // https://github.com/Microsoft/DirectXTex/blob/main/DirectXTex/DDS.h
    // https://learn.microsoft.com/en-us/windows/win32/direct3ddds/dds-pixelformat
    ALPHAPIXELS: 1,
    ALPHA: 2,
    FOURCC: 4,
    RGB: 64,
    RGBA: 65,
    YUV: 512,
    LUMINANCE: 131072,
    LUMINANCEA: 131073
  },
  RESOURCE_MISC_TEXTURECUBE: 4,
  HEADER_FIELDS: DDS_HEADER_FIELDS,
  HEADER_DX10_FIELDS: DDS_DX10_FIELDS,
  DXGI_FORMAT,
  D3D10_RESOURCE_DIMENSION,
  D3DFMT
};
var TEXTURE_FORMAT_BLOCK_SIZE = {
  "bc1-rgba-unorm": 8,
  "bc1-rgba-unorm-srgb": 8,
  "bc2-rgba-unorm": 16,
  "bc2-rgba-unorm-srgb": 16,
  "bc3-rgba-unorm": 16,
  "bc3-rgba-unorm-srgb": 16,
  "bc4-r-unorm": 8,
  "bc4-r-snorm": 8,
  "bc5-rg-unorm": 16,
  "bc5-rg-snorm": 16,
  "bc6h-rgb-ufloat": 16,
  "bc6h-rgb-float": 16,
  "bc7-rgba-unorm": 16,
  "bc7-rgba-unorm-srgb": 16
};

// node_modules/pixi.js/lib/compressed-textures/dds/parseDDS.mjs
function parseDDS(arrayBuffer, supportedFormats) {
  const {
    format,
    fourCC,
    width,
    height,
    dataOffset,
    mipmapCount
  } = parseDDSHeader(arrayBuffer);
  if (!supportedFormats.includes(format)) {
    throw new Error(`Unsupported texture format: ${fourCC} ${format}, supported: ${supportedFormats}`);
  }
  if (mipmapCount <= 1) {
    return {
      format,
      width,
      height,
      resource: [new Uint8Array(arrayBuffer, dataOffset)],
      alphaMode: "no-premultiply-alpha"
    };
  }
  const levelBuffers = getMipmapLevelBuffers(format, width, height, dataOffset, mipmapCount, arrayBuffer);
  const textureOptions = {
    format,
    width,
    height,
    resource: levelBuffers,
    alphaMode: "no-premultiply-alpha"
  };
  return textureOptions;
}
function getMipmapLevelBuffers(format, width, height, dataOffset, mipmapCount, arrayBuffer) {
  const levelBuffers = [];
  const blockBytes = TEXTURE_FORMAT_BLOCK_SIZE[format];
  let mipWidth = width;
  let mipHeight = height;
  let offset = dataOffset;
  for (let level = 0; level < mipmapCount; ++level) {
    const byteLength = blockBytes ? Math.max(4, mipWidth) / 4 * Math.max(4, mipHeight) / 4 * blockBytes : mipWidth * mipHeight * 4;
    const levelBuffer = new Uint8Array(arrayBuffer, offset, byteLength);
    levelBuffers.push(levelBuffer);
    offset += byteLength;
    mipWidth = Math.max(mipWidth >> 1, 1);
    mipHeight = Math.max(mipHeight >> 1, 1);
  }
  return levelBuffers;
}
function parseDDSHeader(buffer) {
  const header = new Uint32Array(buffer, 0, DDS.HEADER_SIZE / Uint32Array.BYTES_PER_ELEMENT);
  if (header[DDS.HEADER_FIELDS.MAGIC] !== DDS.MAGIC_VALUE) {
    throw new Error("Invalid magic number in DDS header");
  }
  const height = header[DDS.HEADER_FIELDS.HEIGHT];
  const width = header[DDS.HEADER_FIELDS.WIDTH];
  const mipmapCount = Math.max(1, header[DDS.HEADER_FIELDS.MIPMAP_COUNT]);
  const flags = header[DDS.HEADER_FIELDS.PF_FLAGS];
  const fourCC = header[DDS.HEADER_FIELDS.FOURCC];
  const format = getTextureFormat(header, flags, fourCC, buffer);
  const dataOffset = DDS.MAGIC_SIZE + DDS.HEADER_SIZE + (fourCC === DDS.D3DFMT.DX10 ? DDS.HEADER_DX10_SIZE : 0);
  return {
    format,
    fourCC,
    width,
    height,
    dataOffset,
    mipmapCount
  };
}
function getTextureFormat(header, flags, fourCC, buffer) {
  if (flags & DDS.PIXEL_FORMAT_FLAGS.FOURCC) {
    if (fourCC === DDS.D3DFMT.DX10) {
      const dx10Header = new Uint32Array(
        buffer,
        DDS.MAGIC_SIZE + DDS.HEADER_SIZE,
        // there is a 20-byte DDS_HEADER_DX10 after DDS_HEADER
        DDS.HEADER_DX10_SIZE / Uint32Array.BYTES_PER_ELEMENT
      );
      const miscFlag = dx10Header[DDS.HEADER_DX10_FIELDS.MISC_FLAG];
      if (miscFlag === DDS.RESOURCE_MISC_TEXTURECUBE) {
        throw new Error("DDSParser does not support cubemap textures");
      }
      const resourceDimension = dx10Header[DDS.HEADER_DX10_FIELDS.RESOURCE_DIMENSION];
      if (resourceDimension === DDS.D3D10_RESOURCE_DIMENSION.DDS_DIMENSION_TEXTURE3D) {
        throw new Error("DDSParser does not supported 3D texture data");
      }
      const dxgiFormat = dx10Header[DDS.HEADER_DX10_FIELDS.DXGI_FORMAT];
      if (dxgiFormat in DXGI_TO_TEXTURE_FORMAT) {
        return DXGI_TO_TEXTURE_FORMAT[dxgiFormat];
      }
      throw new Error(`DDSParser cannot parse texture data with DXGI format ${dxgiFormat}`);
    }
    if (fourCC in FOURCC_TO_TEXTURE_FORMAT) {
      return FOURCC_TO_TEXTURE_FORMAT[fourCC];
    }
    throw new Error(`DDSParser cannot parse texture data with fourCC format ${fourCC}`);
  }
  if (flags & DDS.PIXEL_FORMAT_FLAGS.RGB || flags & DDS.PIXEL_FORMAT_FLAGS.RGBA) {
    return getUncompressedTextureFormat(header);
  }
  if (flags & DDS.PIXEL_FORMAT_FLAGS.YUV) {
    throw new Error("DDSParser does not supported YUV uncompressed texture data.");
  }
  if (flags & DDS.PIXEL_FORMAT_FLAGS.LUMINANCE || flags & DDS.PIXEL_FORMAT_FLAGS.LUMINANCEA) {
    throw new Error("DDSParser does not support single-channel (lumninance) texture data!");
  }
  if (flags & DDS.PIXEL_FORMAT_FLAGS.ALPHA || flags & DDS.PIXEL_FORMAT_FLAGS.ALPHAPIXELS) {
    throw new Error("DDSParser does not support single-channel (alpha) texture data!");
  }
  throw new Error("DDSParser failed to load a texture file due to an unknown reason!");
}
function getUncompressedTextureFormat(header) {
  const bitCount = header[DDS.HEADER_FIELDS.RGB_BITCOUNT];
  const rBitMask = header[DDS.HEADER_FIELDS.R_BIT_MASK];
  const gBitMask = header[DDS.HEADER_FIELDS.G_BIT_MASK];
  const bBitMask = header[DDS.HEADER_FIELDS.B_BIT_MASK];
  const aBitMask = header[DDS.HEADER_FIELDS.A_BIT_MASK];
  switch (bitCount) {
    case 32:
      if (rBitMask === 255 && gBitMask === 65280 && bBitMask === 16711680 && aBitMask === 4278190080) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R8G8B8A8_UNORM];
      }
      if (rBitMask === 16711680 && gBitMask === 65280 && bBitMask === 255 && aBitMask === 4278190080) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_B8G8R8A8_UNORM];
      }
      if (rBitMask === 1072693248 && gBitMask === 1047552 && bBitMask === 1023 && aBitMask === 3221225472) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R10G10B10A2_UNORM];
      }
      if (rBitMask === 65535 && gBitMask === 4294901760 && bBitMask === 0 && aBitMask === 0) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R16G16_UNORM];
      }
      if (rBitMask === 4294967295 && gBitMask === 0 && bBitMask === 0 && aBitMask === 0) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R32_FLOAT];
      }
      break;
    case 24:
      if (rBitMask === 16711680 && gBitMask === 65280 && bBitMask === 255 && aBitMask === 32768) {
      }
      break;
    case 16:
      if (rBitMask === 31744 && gBitMask === 992 && bBitMask === 31 && aBitMask === 32768) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_B5G5R5A1_UNORM];
      }
      if (rBitMask === 63488 && gBitMask === 2016 && bBitMask === 31 && aBitMask === 0) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_B5G6R5_UNORM];
      }
      if (rBitMask === 3840 && gBitMask === 240 && bBitMask === 15 && aBitMask === 61440) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_B4G4R4A4_UNORM];
      }
      if (rBitMask === 255 && gBitMask === 0 && bBitMask === 0 && aBitMask === 65280) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R8G8_UNORM];
      }
      if (rBitMask === 65535 && gBitMask === 0 && bBitMask === 0 && aBitMask === 0) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R16_UNORM];
      }
      break;
    case 8:
      if (rBitMask === 255 && gBitMask === 0 && bBitMask === 0 && aBitMask === 0) {
        return DXGI_TO_TEXTURE_FORMAT[DDS.DXGI_FORMAT.DXGI_FORMAT_R8_UNORM];
      }
      break;
  }
  throw new Error(`DDSParser does not support uncompressed texture with configuration:
                bitCount = ${bitCount}, rBitMask = ${rBitMask}, gBitMask = ${gBitMask}, aBitMask = ${aBitMask}`);
}

// node_modules/pixi.js/lib/compressed-textures/dds/loadDDS.mjs
var loadDDS = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
    name: "loadDDS"
  },
  name: "loadDDS",
  test(url) {
    return checkExtension(url, [".dds"]);
  },
  async load(url, _asset, loader) {
    const supportedTextures = await getSupportedTextureFormats();
    const ddsResponse = await fetch(url);
    const ddsArrayBuffer = await ddsResponse.arrayBuffer();
    const textureOptions = parseDDS(ddsArrayBuffer, supportedTextures);
    const compressedTextureSource = new CompressedSource(textureOptions);
    return createTexture(compressedTextureSource, loader, url);
  },
  unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};

// node_modules/pixi.js/lib/compressed-textures/ktx2/const.mjs
var GL_INTERNAL_FORMAT = ((GL_INTERNAL_FORMAT2) => {
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["RGBA8_SNORM"] = 36759] = "RGBA8_SNORM";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["RGBA"] = 6408] = "RGBA";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["RGBA8UI"] = 36220] = "RGBA8UI";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["RGBA8I"] = 36238] = "RGBA8I";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["RGBA8"] = 32856] = "RGBA8";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RED_RGTC1_EXT"] = 36283] = "COMPRESSED_RED_RGTC1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SIGNED_RED_RGTC1_EXT"] = 36284] = "COMPRESSED_SIGNED_RED_RGTC1_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RED_GREEN_RGTC2_EXT"] = 36285] = "COMPRESSED_RED_GREEN_RGTC2_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT"] = 36286] = "COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_4x4_KHR"] = 37808] = "COMPRESSED_RGBA_ASTC_4x4_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_5x4_KHR"] = 37809] = "COMPRESSED_RGBA_ASTC_5x4_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_5x5_KHR"] = 37810] = "COMPRESSED_RGBA_ASTC_5x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_6x5_KHR"] = 37811] = "COMPRESSED_RGBA_ASTC_6x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_6x6_KHR"] = 37812] = "COMPRESSED_RGBA_ASTC_6x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_8x5_KHR"] = 37813] = "COMPRESSED_RGBA_ASTC_8x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_8x6_KHR"] = 37814] = "COMPRESSED_RGBA_ASTC_8x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_8x8_KHR"] = 37815] = "COMPRESSED_RGBA_ASTC_8x8_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_10x5_KHR"] = 37816] = "COMPRESSED_RGBA_ASTC_10x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_10x6_KHR"] = 37817] = "COMPRESSED_RGBA_ASTC_10x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_10x8_KHR"] = 37818] = "COMPRESSED_RGBA_ASTC_10x8_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_10x10_KHR"] = 37819] = "COMPRESSED_RGBA_ASTC_10x10_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_12x10_KHR"] = 37820] = "COMPRESSED_RGBA_ASTC_12x10_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_ASTC_12x12_KHR"] = 37821] = "COMPRESSED_RGBA_ASTC_12x12_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR"] = 37840] = "COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR"] = 37841] = "COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR"] = 37842] = "COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR"] = 37843] = "COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR"] = 37844] = "COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR"] = 37845] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR"] = 37846] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR"] = 37847] = "COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR"] = 37848] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR"] = 37849] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR"] = 37850] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR"] = 37851] = "COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR"] = 37852] = "COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR"] = 37853] = "COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGBA_BPTC_UNORM_EXT"] = 36492] = "COMPRESSED_RGBA_BPTC_UNORM_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT"] = 36493] = "COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT"] = 36494] = "COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT";
  GL_INTERNAL_FORMAT2[GL_INTERNAL_FORMAT2["COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT"] = 36495] = "COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT";
  return GL_INTERNAL_FORMAT2;
})(GL_INTERNAL_FORMAT || {});
var GL_FORMATS = ((GL_FORMATS22) => {
  GL_FORMATS22[GL_FORMATS22["RGBA"] = 6408] = "RGBA";
  GL_FORMATS22[GL_FORMATS22["RGB"] = 6407] = "RGB";
  GL_FORMATS22[GL_FORMATS22["RG"] = 33319] = "RG";
  GL_FORMATS22[GL_FORMATS22["RED"] = 6403] = "RED";
  GL_FORMATS22[GL_FORMATS22["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
  GL_FORMATS22[GL_FORMATS22["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
  GL_FORMATS22[GL_FORMATS22["RG_INTEGER"] = 33320] = "RG_INTEGER";
  GL_FORMATS22[GL_FORMATS22["RED_INTEGER"] = 36244] = "RED_INTEGER";
  GL_FORMATS22[GL_FORMATS22["ALPHA"] = 6406] = "ALPHA";
  GL_FORMATS22[GL_FORMATS22["LUMINANCE"] = 6409] = "LUMINANCE";
  GL_FORMATS22[GL_FORMATS22["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
  GL_FORMATS22[GL_FORMATS22["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
  GL_FORMATS22[GL_FORMATS22["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
  return GL_FORMATS22;
})(GL_FORMATS || {});
var GL_TYPES = ((GL_TYPES22) => {
  GL_TYPES22[GL_TYPES22["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  GL_TYPES22[GL_TYPES22["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  GL_TYPES22[GL_TYPES22["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
  GL_TYPES22[GL_TYPES22["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
  GL_TYPES22[GL_TYPES22["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
  GL_TYPES22[GL_TYPES22["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  GL_TYPES22[GL_TYPES22["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
  GL_TYPES22[GL_TYPES22["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
  GL_TYPES22[GL_TYPES22["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
  GL_TYPES22[GL_TYPES22["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
  GL_TYPES22[GL_TYPES22["BYTE"] = 5120] = "BYTE";
  GL_TYPES22[GL_TYPES22["SHORT"] = 5122] = "SHORT";
  GL_TYPES22[GL_TYPES22["INT"] = 5124] = "INT";
  GL_TYPES22[GL_TYPES22["FLOAT"] = 5126] = "FLOAT";
  GL_TYPES22[GL_TYPES22["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
  GL_TYPES22[GL_TYPES22["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
  return GL_TYPES22;
})(GL_TYPES || {});
var INTERNAL_FORMAT_TO_TEXTURE_FORMATS = {
  [
    33776
    /* COMPRESSED_RGB_S3TC_DXT1_EXT */
  ]: "bc1-rgba-unorm",
  // TODO: ???
  [
    33777
    /* COMPRESSED_RGBA_S3TC_DXT1_EXT */
  ]: "bc1-rgba-unorm",
  [
    33778
    /* COMPRESSED_RGBA_S3TC_DXT3_EXT */
  ]: "bc2-rgba-unorm",
  [
    33779
    /* COMPRESSED_RGBA_S3TC_DXT5_EXT */
  ]: "bc3-rgba-unorm",
  [
    35916
    /* COMPRESSED_SRGB_S3TC_DXT1_EXT */
  ]: "bc1-rgba-unorm-srgb",
  // TODO: ???
  [
    35917
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT */
  ]: "bc1-rgba-unorm-srgb",
  [
    35918
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT */
  ]: "bc2-rgba-unorm-srgb",
  [
    35919
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT */
  ]: "bc3-rgba-unorm-srgb",
  [
    36283
    /* COMPRESSED_RED_RGTC1_EXT */
  ]: "bc4-r-unorm",
  [
    36284
    /* COMPRESSED_SIGNED_RED_RGTC1_EXT */
  ]: "bc4-r-snorm",
  [
    36285
    /* COMPRESSED_RED_GREEN_RGTC2_EXT */
  ]: "bc5-rg-unorm",
  [
    36286
    /* COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT */
  ]: "bc5-rg-snorm",
  [
    37488
    /* COMPRESSED_R11_EAC */
  ]: "eac-r11unorm",
  // [GL_INTERNAL_FORMAT.COMPRESSED_SIGNED_R11_EAC]: 'eac-r11snorm',
  [
    37490
    /* COMPRESSED_RG11_EAC */
  ]: "eac-rg11snorm",
  // [GL_INTERNAL_FORMAT.COMPRESSED_SIGNED_RG11_EAC]: 'eac-rg11unorm',
  [
    37492
    /* COMPRESSED_RGB8_ETC2 */
  ]: "etc2-rgb8unorm",
  [
    37496
    /* COMPRESSED_RGBA8_ETC2_EAC */
  ]: "etc2-rgba8unorm",
  [
    37493
    /* COMPRESSED_SRGB8_ETC2 */
  ]: "etc2-rgb8unorm-srgb",
  [
    37497
    /* COMPRESSED_SRGB8_ALPHA8_ETC2_EAC */
  ]: "etc2-rgba8unorm-srgb",
  [
    37494
    /* COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 */
  ]: "etc2-rgb8a1unorm",
  [
    37495
    /* COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 */
  ]: "etc2-rgb8a1unorm-srgb",
  [
    37808
    /* COMPRESSED_RGBA_ASTC_4x4_KHR */
  ]: "astc-4x4-unorm",
  [
    37840
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR */
  ]: "astc-4x4-unorm-srgb",
  [
    37809
    /* COMPRESSED_RGBA_ASTC_5x4_KHR */
  ]: "astc-5x4-unorm",
  [
    37841
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR */
  ]: "astc-5x4-unorm-srgb",
  [
    37810
    /* COMPRESSED_RGBA_ASTC_5x5_KHR */
  ]: "astc-5x5-unorm",
  [
    37842
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR */
  ]: "astc-5x5-unorm-srgb",
  [
    37811
    /* COMPRESSED_RGBA_ASTC_6x5_KHR */
  ]: "astc-6x5-unorm",
  [
    37843
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR */
  ]: "astc-6x5-unorm-srgb",
  [
    37812
    /* COMPRESSED_RGBA_ASTC_6x6_KHR */
  ]: "astc-6x6-unorm",
  [
    37844
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR */
  ]: "astc-6x6-unorm-srgb",
  [
    37813
    /* COMPRESSED_RGBA_ASTC_8x5_KHR */
  ]: "astc-8x5-unorm",
  [
    37845
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR */
  ]: "astc-8x5-unorm-srgb",
  [
    37814
    /* COMPRESSED_RGBA_ASTC_8x6_KHR */
  ]: "astc-8x6-unorm",
  [
    37846
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR */
  ]: "astc-8x6-unorm-srgb",
  [
    37815
    /* COMPRESSED_RGBA_ASTC_8x8_KHR */
  ]: "astc-8x8-unorm",
  [
    37847
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR */
  ]: "astc-8x8-unorm-srgb",
  [
    37816
    /* COMPRESSED_RGBA_ASTC_10x5_KHR */
  ]: "astc-10x5-unorm",
  [
    37848
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR */
  ]: "astc-10x5-unorm-srgb",
  [
    37817
    /* COMPRESSED_RGBA_ASTC_10x6_KHR */
  ]: "astc-10x6-unorm",
  [
    37849
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR */
  ]: "astc-10x6-unorm-srgb",
  [
    37818
    /* COMPRESSED_RGBA_ASTC_10x8_KHR */
  ]: "astc-10x8-unorm",
  [
    37850
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR */
  ]: "astc-10x8-unorm-srgb",
  [
    37819
    /* COMPRESSED_RGBA_ASTC_10x10_KHR */
  ]: "astc-10x10-unorm",
  [
    37851
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR */
  ]: "astc-10x10-unorm-srgb",
  [
    37820
    /* COMPRESSED_RGBA_ASTC_12x10_KHR */
  ]: "astc-12x10-unorm",
  [
    37852
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR */
  ]: "astc-12x10-unorm-srgb",
  [
    37821
    /* COMPRESSED_RGBA_ASTC_12x12_KHR */
  ]: "astc-12x12-unorm",
  [
    37853
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR */
  ]: "astc-12x12-unorm-srgb",
  [
    36492
    /* COMPRESSED_RGBA_BPTC_UNORM_EXT */
  ]: "bc7-rgba-unorm",
  [
    36493
    /* COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT */
  ]: "bc7-rgba-unorm-srgb",
  [
    36494
    /* COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT */
  ]: "bc6h-rgb-float",
  [
    36495
    /* COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT */
  ]: "bc6h-rgb-ufloat",
  [
    35907
    /* SRGB8_ALPHA8 */
  ]: "rgba8unorm-srgb",
  [
    36759
    /* RGBA8_SNORM */
  ]: "rgba8snorm",
  [
    36220
    /* RGBA8UI */
  ]: "rgba8uint",
  [
    36238
    /* RGBA8I */
  ]: "rgba8sint",
  [
    6408
    /* RGBA */
  ]: "rgba8unorm"
  // [GL_INTERNAL_FORMAT.RGBA8]: 'bgra8unorm'
};
var FILE_IDENTIFIER = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10];
var FIELDS = {
  FILE_IDENTIFIER: 0,
  ENDIANNESS: 12,
  GL_TYPE: 16,
  GL_TYPE_SIZE: 20,
  GL_FORMAT: 24,
  GL_INTERNAL_FORMAT: 28,
  GL_BASE_INTERNAL_FORMAT: 32,
  PIXEL_WIDTH: 36,
  PIXEL_HEIGHT: 40,
  PIXEL_DEPTH: 44,
  NUMBER_OF_ARRAY_ELEMENTS: 48,
  NUMBER_OF_FACES: 52,
  NUMBER_OF_MIPMAP_LEVELS: 56,
  BYTES_OF_KEY_VALUE_DATA: 60
};
var FILE_HEADER_SIZE = 64;
var ENDIANNESS = 67305985;
var TYPES_TO_BYTES_PER_COMPONENT = {
  [
    5121
    /* UNSIGNED_BYTE */
  ]: 1,
  [
    5123
    /* UNSIGNED_SHORT */
  ]: 2,
  [
    5124
    /* INT */
  ]: 4,
  [
    5125
    /* UNSIGNED_INT */
  ]: 4,
  [
    5126
    /* FLOAT */
  ]: 4,
  [
    36193
    /* HALF_FLOAT */
  ]: 8
};
var FORMATS_TO_COMPONENTS = {
  [
    6408
    /* RGBA */
  ]: 4,
  [
    6407
    /* RGB */
  ]: 3,
  [
    33319
    /* RG */
  ]: 2,
  [
    6403
    /* RED */
  ]: 1,
  [
    6409
    /* LUMINANCE */
  ]: 1,
  [
    6410
    /* LUMINANCE_ALPHA */
  ]: 2,
  [
    6406
    /* ALPHA */
  ]: 1
};
var TYPES_TO_BYTES_PER_PIXEL = {
  [
    32819
    /* UNSIGNED_SHORT_4_4_4_4 */
  ]: 2,
  [
    32820
    /* UNSIGNED_SHORT_5_5_5_1 */
  ]: 2,
  [
    33635
    /* UNSIGNED_SHORT_5_6_5 */
  ]: 2
};
var INTERNAL_FORMAT_TO_BYTES_PER_PIXEL = {
  [
    33776
    /* COMPRESSED_RGB_S3TC_DXT1_EXT */
  ]: 0.5,
  [
    33777
    /* COMPRESSED_RGBA_S3TC_DXT1_EXT */
  ]: 0.5,
  [
    33778
    /* COMPRESSED_RGBA_S3TC_DXT3_EXT */
  ]: 1,
  [
    33779
    /* COMPRESSED_RGBA_S3TC_DXT5_EXT */
  ]: 1,
  [
    35916
    /* COMPRESSED_SRGB_S3TC_DXT1_EXT */
  ]: 0.5,
  [
    35917
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT */
  ]: 0.5,
  [
    35918
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT */
  ]: 1,
  [
    35919
    /* COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT */
  ]: 1,
  [
    36283
    /* COMPRESSED_RED_RGTC1_EXT */
  ]: 0.5,
  [
    36284
    /* COMPRESSED_SIGNED_RED_RGTC1_EXT */
  ]: 0.5,
  [
    36285
    /* COMPRESSED_RED_GREEN_RGTC2_EXT */
  ]: 1,
  [
    36286
    /* COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT */
  ]: 1,
  [
    37488
    /* COMPRESSED_R11_EAC */
  ]: 0.5,
  [
    37489
    /* COMPRESSED_SIGNED_R11_EAC */
  ]: 0.5,
  [
    37490
    /* COMPRESSED_RG11_EAC */
  ]: 1,
  [
    37491
    /* COMPRESSED_SIGNED_RG11_EAC */
  ]: 1,
  [
    37492
    /* COMPRESSED_RGB8_ETC2 */
  ]: 0.5,
  [
    37496
    /* COMPRESSED_RGBA8_ETC2_EAC */
  ]: 1,
  [
    37493
    /* COMPRESSED_SRGB8_ETC2 */
  ]: 0.5,
  [
    37497
    /* COMPRESSED_SRGB8_ALPHA8_ETC2_EAC */
  ]: 1,
  [
    37494
    /* COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 */
  ]: 0.5,
  [
    37495
    /* COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 */
  ]: 0.5,
  [
    37808
    /* COMPRESSED_RGBA_ASTC_4x4_KHR */
  ]: 1,
  [
    37840
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR */
  ]: 1,
  [
    37809
    /* COMPRESSED_RGBA_ASTC_5x4_KHR */
  ]: 0.8,
  [
    37841
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR */
  ]: 0.8,
  [
    37810
    /* COMPRESSED_RGBA_ASTC_5x5_KHR */
  ]: 0.64,
  [
    37842
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR */
  ]: 0.64,
  [
    37811
    /* COMPRESSED_RGBA_ASTC_6x5_KHR */
  ]: 0.53375,
  [
    37843
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR */
  ]: 0.53375,
  [
    37812
    /* COMPRESSED_RGBA_ASTC_6x6_KHR */
  ]: 0.445,
  [
    37844
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR */
  ]: 0.445,
  [
    37813
    /* COMPRESSED_RGBA_ASTC_8x5_KHR */
  ]: 0.4,
  [
    37845
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR */
  ]: 0.4,
  [
    37814
    /* COMPRESSED_RGBA_ASTC_8x6_KHR */
  ]: 0.33375,
  [
    37846
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR */
  ]: 0.33375,
  [
    37815
    /* COMPRESSED_RGBA_ASTC_8x8_KHR */
  ]: 0.25,
  [
    37847
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR */
  ]: 0.25,
  [
    37816
    /* COMPRESSED_RGBA_ASTC_10x5_KHR */
  ]: 0.32,
  [
    37848
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR */
  ]: 0.32,
  [
    37817
    /* COMPRESSED_RGBA_ASTC_10x6_KHR */
  ]: 0.26625,
  [
    37849
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR */
  ]: 0.26625,
  [
    37818
    /* COMPRESSED_RGBA_ASTC_10x8_KHR */
  ]: 0.2,
  [
    37850
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR */
  ]: 0.2,
  [
    37819
    /* COMPRESSED_RGBA_ASTC_10x10_KHR */
  ]: 0.16,
  [
    37851
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR */
  ]: 0.16,
  [
    37820
    /* COMPRESSED_RGBA_ASTC_12x10_KHR */
  ]: 0.13375,
  [
    37852
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR */
  ]: 0.13375,
  [
    37821
    /* COMPRESSED_RGBA_ASTC_12x12_KHR */
  ]: 0.11125,
  [
    37853
    /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR */
  ]: 0.11125,
  [
    36492
    /* COMPRESSED_RGBA_BPTC_UNORM_EXT */
  ]: 1,
  [
    36493
    /* COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT */
  ]: 1,
  [
    36494
    /* COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT */
  ]: 1,
  [
    36495
    /* COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT */
  ]: 1
};
var KTX = {
  FILE_HEADER_SIZE,
  FILE_IDENTIFIER,
  FORMATS_TO_COMPONENTS,
  INTERNAL_FORMAT_TO_BYTES_PER_PIXEL,
  INTERNAL_FORMAT_TO_TEXTURE_FORMATS,
  FIELDS,
  TYPES_TO_BYTES_PER_COMPONENT,
  TYPES_TO_BYTES_PER_PIXEL,
  ENDIANNESS
};

// node_modules/pixi.js/lib/compressed-textures/ktx/parseKTX.mjs
function parseKTX(arrayBuffer, supportedFormats) {
  const dataView = new DataView(arrayBuffer);
  if (!validate(dataView)) {
    throw new Error("Invalid KTX identifier in header");
  }
  const {
    littleEndian,
    glType,
    glFormat,
    glInternalFormat,
    pixelWidth,
    pixelHeight,
    numberOfMipmapLevels,
    offset
  } = parseKTXHeader(dataView);
  const textureFormat = KTX.INTERNAL_FORMAT_TO_TEXTURE_FORMATS[glInternalFormat];
  if (!textureFormat) {
    throw new Error(`Unknown texture format ${glInternalFormat}`);
  }
  if (!supportedFormats.includes(textureFormat)) {
    throw new Error(`Unsupported texture format: ${textureFormat}, supportedFormats: ${supportedFormats}`);
  }
  const imagePixelByteSize = getImagePixelByteSize(glType, glFormat, glInternalFormat);
  const imageBuffers = getImageBuffers(
    dataView,
    glType,
    imagePixelByteSize,
    pixelWidth,
    pixelHeight,
    offset,
    numberOfMipmapLevels,
    littleEndian
  );
  return {
    format: textureFormat,
    width: pixelWidth,
    height: pixelHeight,
    resource: imageBuffers,
    alphaMode: "no-premultiply-alpha"
  };
}
function getImageBuffers(dataView, glType, imagePixelByteSize, pixelWidth, pixelHeight, offset, numberOfMipmapLevels, littleEndian) {
  const alignedWidth = pixelWidth + 3 & ~3;
  const alignedHeight = pixelHeight + 3 & ~3;
  let imagePixels = pixelWidth * pixelHeight;
  if (glType === 0) {
    imagePixels = alignedWidth * alignedHeight;
  }
  let mipByteSize = imagePixels * imagePixelByteSize;
  let mipWidth = pixelWidth;
  let mipHeight = pixelHeight;
  let alignedMipWidth = alignedWidth;
  let alignedMipHeight = alignedHeight;
  let imageOffset = offset;
  const imageBuffers = new Array(numberOfMipmapLevels);
  for (let mipmapLevel = 0; mipmapLevel < numberOfMipmapLevels; mipmapLevel++) {
    const imageSize = dataView.getUint32(imageOffset, littleEndian);
    let elementOffset = imageOffset + 4;
    imageBuffers[mipmapLevel] = new Uint8Array(dataView.buffer, elementOffset, mipByteSize);
    elementOffset += mipByteSize;
    imageOffset += imageSize + 4;
    imageOffset = imageOffset % 4 !== 0 ? imageOffset + 4 - imageOffset % 4 : imageOffset;
    mipWidth = mipWidth >> 1 || 1;
    mipHeight = mipHeight >> 1 || 1;
    alignedMipWidth = mipWidth + 4 - 1 & ~(4 - 1);
    alignedMipHeight = mipHeight + 4 - 1 & ~(4 - 1);
    mipByteSize = alignedMipWidth * alignedMipHeight * imagePixelByteSize;
  }
  return imageBuffers;
}
function getImagePixelByteSize(glType, glFormat, glInternalFormat) {
  let imagePixelByteSize = KTX.INTERNAL_FORMAT_TO_BYTES_PER_PIXEL[glInternalFormat];
  if (glType !== 0) {
    if (KTX.TYPES_TO_BYTES_PER_COMPONENT[glType]) {
      imagePixelByteSize = KTX.TYPES_TO_BYTES_PER_COMPONENT[glType] * KTX.FORMATS_TO_COMPONENTS[glFormat];
    } else {
      imagePixelByteSize = KTX.TYPES_TO_BYTES_PER_PIXEL[glType];
    }
  }
  if (imagePixelByteSize === void 0) {
    throw new Error("Unable to resolve the pixel format stored in the *.ktx file!");
  }
  return imagePixelByteSize;
}
function parseKTXHeader(dataView) {
  const littleEndian = dataView.getUint32(KTX.FIELDS.ENDIANNESS, true) === KTX.ENDIANNESS;
  const glType = dataView.getUint32(KTX.FIELDS.GL_TYPE, littleEndian);
  const glFormat = dataView.getUint32(KTX.FIELDS.GL_FORMAT, littleEndian);
  const glInternalFormat = dataView.getUint32(KTX.FIELDS.GL_INTERNAL_FORMAT, littleEndian);
  const pixelWidth = dataView.getUint32(KTX.FIELDS.PIXEL_WIDTH, littleEndian);
  const pixelHeight = dataView.getUint32(KTX.FIELDS.PIXEL_HEIGHT, littleEndian) || 1;
  const pixelDepth = dataView.getUint32(KTX.FIELDS.PIXEL_DEPTH, littleEndian) || 1;
  const numberOfArrayElements = dataView.getUint32(KTX.FIELDS.NUMBER_OF_ARRAY_ELEMENTS, littleEndian) || 1;
  const numberOfFaces = dataView.getUint32(KTX.FIELDS.NUMBER_OF_FACES, littleEndian);
  const numberOfMipmapLevels = dataView.getUint32(KTX.FIELDS.NUMBER_OF_MIPMAP_LEVELS, littleEndian);
  const bytesOfKeyValueData = dataView.getUint32(KTX.FIELDS.BYTES_OF_KEY_VALUE_DATA, littleEndian);
  if (pixelHeight === 0 || pixelDepth !== 1) {
    throw new Error("Only 2D textures are supported");
  }
  if (numberOfFaces !== 1) {
    throw new Error("CubeTextures are not supported by KTXLoader yet!");
  }
  if (numberOfArrayElements !== 1) {
    throw new Error("WebGL does not support array textures");
  }
  return {
    littleEndian,
    glType,
    glFormat,
    glInternalFormat,
    pixelWidth,
    pixelHeight,
    numberOfMipmapLevels,
    offset: KTX.FILE_HEADER_SIZE + bytesOfKeyValueData
  };
}
function validate(dataView) {
  for (let i = 0; i < KTX.FILE_IDENTIFIER.length; i++) {
    if (dataView.getUint8(i) !== KTX.FILE_IDENTIFIER[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/pixi.js/lib/compressed-textures/ktx/loadKTX.mjs
var loadKTX = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
    name: "loadKTX"
  },
  name: "loadKTX",
  test(url) {
    return checkExtension(url, ".ktx");
  },
  async load(url, _asset, loader) {
    const supportedTextures = await getSupportedTextureFormats();
    const ktxResponse = await fetch(url);
    const ktxArrayBuffer = await ktxResponse.arrayBuffer();
    const textureOptions = parseKTX(ktxArrayBuffer, supportedTextures);
    const compressedTextureSource = new CompressedSource(textureOptions);
    return createTexture(compressedTextureSource, loader, url);
  },
  unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};

// node_modules/pixi.js/lib/_virtual/ktx.worker.mjs
var WORKER_CODE4 = '(function () {\n    \'use strict\';\n\n    const converters = {\n      rgb8unorm: {\n        convertedFormat: "rgba8unorm",\n        convertFunction: convertRGBtoRGBA\n      },\n      "rgb8unorm-srgb": {\n        convertedFormat: "rgba8unorm-srgb",\n        convertFunction: convertRGBtoRGBA\n      }\n    };\n    function convertFormatIfRequired(textureOptions) {\n      const format = textureOptions.format;\n      if (converters[format]) {\n        const convertFunction = converters[format].convertFunction;\n        const levelBuffers = textureOptions.resource;\n        for (let i = 0; i < levelBuffers.length; i++) {\n          levelBuffers[i] = convertFunction(levelBuffers[i]);\n        }\n        textureOptions.format = converters[format].convertedFormat;\n      }\n    }\n    function convertRGBtoRGBA(levelBuffer) {\n      const pixelCount = levelBuffer.byteLength / 3;\n      const levelBufferWithAlpha = new Uint32Array(pixelCount);\n      for (let i = 0; i < pixelCount; ++i) {\n        levelBufferWithAlpha[i] = levelBuffer[i * 3] + (levelBuffer[i * 3 + 1] << 8) + (levelBuffer[i * 3 + 2] << 16) + 4278190080;\n      }\n      return new Uint8Array(levelBufferWithAlpha.buffer);\n    }\n\n    function createLevelBuffersFromKTX(ktxTexture) {\n      const levelBuffers = [];\n      for (let i = 0; i < ktxTexture.numLevels; i++) {\n        const imageData = ktxTexture.getImageData(i, 0, 0);\n        const levelBuffer = new Uint8Array(imageData.byteLength);\n        levelBuffer.set(imageData);\n        levelBuffers.push(levelBuffer);\n      }\n      return levelBuffers;\n    }\n\n    const glFormatToGPUFormatMap = {\n      6408: "rgba8unorm",\n      32856: "bgra8unorm",\n      //\n      32857: "rgb10a2unorm",\n      33189: "depth16unorm",\n      33190: "depth24plus",\n      33321: "r8unorm",\n      33323: "rg8unorm",\n      33325: "r16float",\n      33326: "r32float",\n      33327: "rg16float",\n      33328: "rg32float",\n      33329: "r8sint",\n      33330: "r8uint",\n      33331: "r16sint",\n      33332: "r16uint",\n      33333: "r32sint",\n      33334: "r32uint",\n      33335: "rg8sint",\n      33336: "rg8uint",\n      33337: "rg16sint",\n      33338: "rg16uint",\n      33339: "rg32sint",\n      33340: "rg32uint",\n      33778: "bc2-rgba-unorm",\n      33779: "bc3-rgba-unorm",\n      34836: "rgba32float",\n      34842: "rgba16float",\n      35056: "depth24plus-stencil8",\n      35898: "rg11b10ufloat",\n      35901: "rgb9e5ufloat",\n      35907: "rgba8unorm-srgb",\n      // bgra8unorm-srgb\n      36012: "depth32float",\n      36013: "depth32float-stencil8",\n      36168: "stencil8",\n      36208: "rgba32uint",\n      36214: "rgba16uint",\n      36220: "rgba8uint",\n      36226: "rgba32sint",\n      36232: "rgba16sint",\n      36238: "rgba8sint",\n      36492: "bc7-rgba-unorm",\n      36756: "r8snorm",\n      36757: "rg8snorm",\n      36759: "rgba8snorm",\n      37496: "etc2-rgba8unorm",\n      37808: "astc-4x4-unorm"\n    };\n    function glFormatToGPUFormat(glInternalFormat) {\n      const format = glFormatToGPUFormatMap[glInternalFormat];\n      if (format) {\n        return format;\n      }\n      throw new Error(`Unsupported glInternalFormat: ${glInternalFormat}`);\n    }\n\n    const vkFormatToGPUFormatMap = {\n      23: "rgb8unorm",\n      // VK_FORMAT_R8G8B8_UNORM\n      37: "rgba8unorm",\n      // VK_FORMAT_R8G8B8A8_UNORM\n      43: "rgba8unorm-srgb"\n      // VK_FORMAT_R8G8B8A8_SRGB\n      // TODO add more!\n    };\n    function vkFormatToGPUFormat(vkFormat) {\n      const format = vkFormatToGPUFormatMap[vkFormat];\n      if (format) {\n        return format;\n      }\n      throw new Error(`Unsupported VkFormat: ${vkFormat}`);\n    }\n\n    function getTextureFormatFromKTXTexture(ktxTexture) {\n      if (ktxTexture.classId === 2) {\n        return vkFormatToGPUFormat(ktxTexture.vkFormat);\n      }\n      return glFormatToGPUFormat(ktxTexture.glInternalformat);\n    }\n\n    const gpuFormatToBasisTranscoderFormatMap = {\n      "bc3-rgba-unorm": "BC3_RGBA",\n      "bc7-rgba-unorm": "BC7_M5_RGBA",\n      "etc2-rgba8unorm": "ETC2_RGBA",\n      "astc-4x4-unorm": "ASTC_4x4_RGBA",\n      // Uncompressed\n      rgba8unorm: "RGBA32",\n      rg11b10ufloat: "R11F_G11F_B10F"\n    };\n    function gpuFormatToKTXBasisTranscoderFormat(transcoderFormat) {\n      const format = gpuFormatToBasisTranscoderFormatMap[transcoderFormat];\n      if (format) {\n        return format;\n      }\n      throw new Error(`Unsupported transcoderFormat: ${transcoderFormat}`);\n    }\n\n    const settings = {\n      jsUrl: "",\n      wasmUrl: ""\n    };\n    let basisTranscoderFormat;\n    let basisTranscodedTextureFormat;\n    let ktxPromise;\n    async function getKTX() {\n      if (!ktxPromise) {\n        const absoluteJsUrl = new URL(settings.jsUrl, location.origin).href;\n        const absoluteWasmUrl = new URL(settings.wasmUrl, location.origin).href;\n        importScripts(absoluteJsUrl);\n        ktxPromise = new Promise((resolve) => {\n          LIBKTX({\n            locateFile: (_file) => absoluteWasmUrl\n          }).then((libktx) => {\n            resolve(libktx);\n          });\n        });\n      }\n      return ktxPromise;\n    }\n    async function fetchKTXTexture(url, ktx) {\n      const ktx2Response = await fetch(url);\n      if (ktx2Response.ok) {\n        const ktx2ArrayBuffer = await ktx2Response.arrayBuffer();\n        return new ktx.ktxTexture(new Uint8Array(ktx2ArrayBuffer));\n      }\n      throw new Error(`Failed to load KTX(2) texture: ${url}`);\n    }\n    const preferredTranscodedFormat = [\n      "bc7-rgba-unorm",\n      "astc-4x4-unorm",\n      "etc2-rgba8unorm",\n      "bc3-rgba-unorm",\n      "rgba8unorm"\n    ];\n    async function load(url) {\n      const ktx = await getKTX();\n      const ktxTexture = await fetchKTXTexture(url, ktx);\n      let format;\n      if (ktxTexture.needsTranscoding) {\n        format = basisTranscodedTextureFormat;\n        const transcodeFormat = ktx.TranscodeTarget[basisTranscoderFormat];\n        const result = ktxTexture.transcodeBasis(transcodeFormat, 0);\n        if (result !== ktx.ErrorCode.SUCCESS) {\n          throw new Error("Unable to transcode basis texture.");\n        }\n      } else {\n        format = getTextureFormatFromKTXTexture(ktxTexture);\n      }\n      const levelBuffers = createLevelBuffersFromKTX(ktxTexture);\n      const textureOptions = {\n        width: ktxTexture.baseWidth,\n        height: ktxTexture.baseHeight,\n        format,\n        mipLevelCount: ktxTexture.numLevels,\n        resource: levelBuffers,\n        alphaMode: "no-premultiply-alpha"\n      };\n      convertFormatIfRequired(textureOptions);\n      return textureOptions;\n    }\n    async function init(jsUrl, wasmUrl, supportedTextures) {\n      if (jsUrl)\n        settings.jsUrl = jsUrl;\n      if (wasmUrl)\n        settings.wasmUrl = wasmUrl;\n      basisTranscodedTextureFormat = preferredTranscodedFormat.filter((format) => supportedTextures.includes(format))[0];\n      basisTranscoderFormat = gpuFormatToKTXBasisTranscoderFormat(basisTranscodedTextureFormat);\n      await getKTX();\n    }\n    const messageHandlers = {\n      init: async (data) => {\n        const { jsUrl, wasmUrl, supportedTextures } = data;\n        await init(jsUrl, wasmUrl, supportedTextures);\n      },\n      load: async (data) => {\n        try {\n          const textureOptions = await load(data.url);\n          return {\n            type: "load",\n            url: data.url,\n            success: true,\n            textureOptions,\n            transferables: textureOptions.resource?.map((arr) => arr.buffer)\n          };\n        } catch (e) {\n          throw e;\n        }\n      }\n    };\n    self.onmessage = async (messageEvent) => {\n      const message = messageEvent.data;\n      const response = await messageHandlers[message.type]?.(message);\n      if (response) {\n        self.postMessage(response, response.transferables);\n      }\n    };\n\n})();\n';
var WORKER_URL4 = null;
var WorkerInstance4 = class {
  constructor() {
    if (!WORKER_URL4) {
      WORKER_URL4 = URL.createObjectURL(new Blob([WORKER_CODE4], { type: "application/javascript" }));
    }
    this.worker = new Worker(WORKER_URL4);
  }
};
WorkerInstance4.revokeObjectURL = function revokeObjectURL4() {
  if (WORKER_URL4) {
    URL.revokeObjectURL(WORKER_URL4);
    WORKER_URL4 = null;
  }
};

// node_modules/pixi.js/lib/compressed-textures/ktx2/utils/setKTXTranscoderPath.mjs
var ktxTranscoderUrls = {
  jsUrl: "https://files.pixijs.download/transcoders/ktx/libktx.js",
  wasmUrl: "https://files.pixijs.download/transcoders/ktx/libktx.wasm"
};

// node_modules/pixi.js/lib/compressed-textures/ktx2/worker/loadKTX2onWorker.mjs
var ktxWorker;
var urlHash2 = {};
function getKTX2Worker(supportedTextures) {
  if (!ktxWorker) {
    ktxWorker = new WorkerInstance4().worker;
    ktxWorker.onmessage = (messageEvent) => {
      const { success, url, textureOptions } = messageEvent.data;
      if (!success) {
        console.warn("Failed to load KTX texture", url);
      }
      urlHash2[url](textureOptions);
    };
    ktxWorker.postMessage({
      type: "init",
      jsUrl: ktxTranscoderUrls.jsUrl,
      wasmUrl: ktxTranscoderUrls.wasmUrl,
      supportedTextures
    });
  }
  return ktxWorker;
}
function loadKTX2onWorker(url, supportedTextures) {
  const ktxWorker2 = getKTX2Worker(supportedTextures);
  return new Promise((resolve) => {
    urlHash2[url] = resolve;
    ktxWorker2.postMessage({ type: "load", url });
  });
}

// node_modules/pixi.js/lib/compressed-textures/ktx2/loadKTX2.mjs
var loadKTX2 = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
    name: "loadKTX2"
  },
  name: "loadKTX2",
  test(url) {
    return checkExtension(url, ".ktx2");
  },
  async load(url, _asset, loader) {
    const supportedTextures = await getSupportedTextureFormats();
    const textureOptions = await loadKTX2onWorker(url, supportedTextures);
    const compressedTextureSource = new CompressedSource(textureOptions);
    return createTexture(compressedTextureSource, loader, url);
  },
  async unload(texture) {
    if (Array.isArray(texture)) {
      texture.forEach((t) => t.destroy(true));
    } else {
      texture.destroy(true);
    }
  }
};

// node_modules/pixi.js/lib/compressed-textures/shared/resolveCompressedTextureUrl.mjs
var validFormats = ["basis", "bc7", "bc6h", "astc", "etc2", "bc5", "bc4", "bc3", "bc2", "bc1", "eac"];
var resolveCompressedTextureUrl = {
  extension: ExtensionType.ResolveParser,
  test: (value) => checkExtension(value, [".ktx", ".ktx2", ".dds"]),
  parse: (value) => {
    let format;
    const splitValue = value.split(".");
    if (splitValue.length > 2) {
      const newFormat = splitValue[splitValue.length - 2];
      if (validFormats.includes(newFormat)) {
        format = newFormat;
      }
    } else {
      format = splitValue[splitValue.length - 1];
    }
    return {
      resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? "1"),
      format,
      src: value
    };
  }
};

// node_modules/pixi.js/lib/compressed-textures/shared/detectCompressed.mjs
var compressedTextureExtensions;
var detectCompressed = {
  extension: {
    type: ExtensionType.DetectionParser,
    priority: 2
  },
  test: async () => {
    if (await isWebGPUSupported())
      return true;
    if (isWebGLSupported())
      return true;
    return false;
  },
  add: async (formats) => {
    const supportedCompressedTextureFormats2 = await getSupportedCompressedTextureFormats();
    compressedTextureExtensions = extractExtensionsForCompressedTextureFormats(supportedCompressedTextureFormats2);
    return [...compressedTextureExtensions, ...formats];
  },
  remove: async (formats) => {
    if (compressedTextureExtensions) {
      return formats.filter((f) => !(f in compressedTextureExtensions));
    }
    return formats;
  }
};
function extractExtensionsForCompressedTextureFormats(formats) {
  const extensions2 = ["basis"];
  const dupeMap = {};
  formats.forEach((format) => {
    const extension = format.split("-")[0];
    if (extension && !dupeMap[extension]) {
      dupeMap[extension] = true;
      extensions2.push(extension);
    }
  });
  extensions2.sort((a, b3) => {
    const aIndex = validFormats.indexOf(a);
    const bIndex = validFormats.indexOf(b3);
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });
  return extensions2;
}

// node_modules/pixi.js/lib/culling/Culler.mjs
var tempBounds = new Bounds();
var _Culler = class _Culler2 {
  /**
   * Culls the children of a specific container based on the given view. This will also cull items that are not
   * being explicitly managed by the culler.
   * @param container - The container to cull.
   * @param view - The view rectangle.
   * @param skipUpdateTransform - Whether to skip updating the transform.
   */
  cull(container, view, skipUpdateTransform = true) {
    this._cullRecursive(container, view, skipUpdateTransform);
  }
  _cullRecursive(container, view, skipUpdateTransform = true) {
    if (container.cullable && container.measurable && container.includeInBuild) {
      const bounds = container.cullArea ?? getGlobalBounds(container, skipUpdateTransform, tempBounds);
      container.culled = bounds.x >= view.x + view.width || bounds.y >= view.y + view.height || bounds.x + bounds.width <= view.x || bounds.y + bounds.height <= view.y;
    } else {
      container.culled = false;
    }
    if (!container.cullableChildren || container.culled || !container.renderable || !container.measurable || !container.includeInBuild)
      return;
    for (let i = 0; i < container.children.length; i++) {
      this._cullRecursive(container.children[i], view, skipUpdateTransform);
    }
  }
};
_Culler.shared = new _Culler();
var Culler = _Culler;

// node_modules/pixi.js/lib/culling/CullerPlugin.mjs
var CullerPlugin = class {
  static init() {
    this._renderRef = this.render.bind(this);
    this.render = () => {
      Culler.shared.cull(this.stage, this.renderer.screen);
      this.renderer.render({ container: this.stage });
    };
  }
  static destroy() {
    this.render = this._renderRef;
  }
};
CullerPlugin.extension = {
  priority: 10,
  type: ExtensionType.Application,
  name: "culler"
};

// node_modules/pixi.js/lib/environment-webworker/WebWorkerAdapter.mjs
var import_xmldom = __toESM(require_lib(), 1);

// node_modules/pixi.js/lib/filters/defaults/defaultFilter.vert.mjs
var vertex = "in vec2 aPosition;\nout vec2 vTextureCoord;\n\nuniform vec4 uInputSize;\nuniform vec4 uOutputFrame;\nuniform vec4 uOutputTexture;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;\n    \n    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aPosition * (uOutputFrame.zw * uInputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n";

// node_modules/pixi.js/lib/filters/defaults/alpha/alpha.frag.mjs
var fragment = "\nin vec2 vTextureCoord;\n\nout vec4 finalColor;\n\nuniform float uAlpha;\nuniform sampler2D uTexture;\n\nvoid main()\n{\n    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;\n}\n";

// node_modules/pixi.js/lib/filters/defaults/alpha/alpha.wgsl.mjs
var source = "struct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct AlphaUniforms {\n  uAlpha:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n\n@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  \n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n  \n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition)\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @builtin(position) position: vec4<f32>\n) -> @location(0) vec4<f32> {\n \n    var sample = textureSample(uTexture, uSampler, uv);\n    \n    return sample * alphaUniforms.uAlpha;\n}";

// node_modules/pixi.js/lib/filters/defaults/alpha/AlphaFilter.mjs
var _AlphaFilter = class _AlphaFilter2 extends Filter {
  constructor(options) {
    options = { ..._AlphaFilter2.defaultOptions, ...options };
    const gpuProgram = GpuProgram.from({
      vertex: {
        source,
        entryPoint: "mainVertex"
      },
      fragment: {
        source,
        entryPoint: "mainFragment"
      }
    });
    const glProgram = GlProgram.from({
      vertex,
      fragment,
      name: "alpha-filter"
    });
    const { alpha, ...rest } = options;
    const alphaUniforms = new UniformGroup({
      uAlpha: { value: alpha, type: "f32" }
    });
    super({
      ...rest,
      gpuProgram,
      glProgram,
      resources: {
        alphaUniforms
      }
    });
  }
  /**
   * Coefficient for alpha multiplication
   * @default 1
   */
  get alpha() {
    return this.resources.alphaUniforms.uniforms.uAlpha;
  }
  set alpha(value) {
    this.resources.alphaUniforms.uniforms.uAlpha = value;
  }
};
_AlphaFilter.defaultOptions = {
  /** Amount of alpha from 0 to 1, where 0 is transparent */
  alpha: 1
};

// node_modules/pixi.js/lib/filters/defaults/blur/const.mjs
var GAUSSIAN_VALUES = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
};

// node_modules/pixi.js/lib/filters/defaults/blur/gl/generateBlurFragSource.mjs
var fragTemplate = [
  "in vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uTexture;",
  "out vec4 finalColor;",
  "void main(void)",
  "{",
  "    finalColor = vec4(0.0);",
  "    %blur%",
  "}"
].join("\n");
function generateBlurFragSource(kernelSize) {
  const kernel = GAUSSIAN_VALUES[kernelSize];
  const halfLength = kernel.length;
  let fragSource = fragTemplate;
  let blurLoop = "";
  const template = "finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";
  let value;
  for (let i = 0; i < kernelSize; i++) {
    let blur = template.replace("%index%", i.toString());
    value = i;
    if (i >= halfLength) {
      value = kernelSize - i - 1;
    }
    blur = blur.replace("%value%", kernel[value].toString());
    blurLoop += blur;
    blurLoop += "\n";
  }
  fragSource = fragSource.replace("%blur%", blurLoop);
  fragSource = fragSource.replace("%size%", kernelSize.toString());
  return fragSource;
}

// node_modules/pixi.js/lib/filters/defaults/blur/gl/generateBlurVertSource.mjs
var vertTemplate = `
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;
function generateBlurVertSource(kernelSize, x) {
  const halfLength = Math.ceil(kernelSize / 2);
  let vertSource = vertTemplate;
  let blurLoop = "";
  let template;
  if (x) {
    template = "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);";
  } else {
    template = "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";
  }
  for (let i = 0; i < kernelSize; i++) {
    let blur = template.replace("%index%", i.toString());
    blur = blur.replace("%sampleIndex%", `${i - (halfLength - 1)}.0`);
    blurLoop += blur;
    blurLoop += "\n";
  }
  vertSource = vertSource.replace("%blur%", blurLoop);
  vertSource = vertSource.replace("%size%", kernelSize.toString());
  vertSource = vertSource.replace("%dimension%", x ? "z" : "w");
  return vertSource;
}

// node_modules/pixi.js/lib/filters/defaults/blur/gl/generateBlurGlProgram.mjs
function generateBlurGlProgram(horizontal, kernelSize) {
  const vertex5 = generateBlurVertSource(kernelSize, horizontal);
  const fragment7 = generateBlurFragSource(kernelSize);
  return GlProgram.from({
    vertex: vertex5,
    fragment: fragment7,
    name: `blur-${horizontal ? "horizontal" : "vertical"}-pass-filter`
  });
}

// node_modules/pixi.js/lib/filters/defaults/blur/gpu/blur-template.wgsl.mjs
var source2 = "\n\nstruct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct BlurUniforms {\n  uStrength:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n\n@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;\n\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    %blur-struct%\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  \n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n\n\n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n\n  let filteredCord = filterTextureCoord(aPosition);\n\n  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;\n\n  return VSOutput(\n   filterVertexPosition(aPosition),\n    %blur-vertex-out%\n  );\n}\n\n@fragment\nfn mainFragment(\n  @builtin(position) position: vec4<f32>,\n  %blur-fragment-in%\n) -> @location(0) vec4<f32> {\n\n    var   finalColor = vec4(0.0);\n\n    %blur-sampling%\n\n    return finalColor;\n}";

// node_modules/pixi.js/lib/filters/defaults/blur/gpu/generateBlurProgram.mjs
function generateBlurProgram(horizontal, kernelSize) {
  const kernel = GAUSSIAN_VALUES[kernelSize];
  const halfLength = kernel.length;
  const blurStructSource = [];
  const blurOutSource = [];
  const blurSamplingSource = [];
  for (let i = 0; i < kernelSize; i++) {
    blurStructSource[i] = `@location(${i}) offset${i}: vec2<f32>,`;
    if (horizontal) {
      blurOutSource[i] = `filteredCord + vec2(${i - halfLength + 1} * pixelStrength, 0.0),`;
    } else {
      blurOutSource[i] = `filteredCord + vec2(0.0, ${i - halfLength + 1} * pixelStrength),`;
    }
    const kernelIndex = i < halfLength ? i : kernelSize - i - 1;
    const kernelValue = kernel[kernelIndex].toString();
    blurSamplingSource[i] = `finalColor += textureSample(uTexture, uSampler, offset${i}) * ${kernelValue};`;
  }
  const blurStruct = blurStructSource.join("\n");
  const blurOut = blurOutSource.join("\n");
  const blurSampling = blurSamplingSource.join("\n");
  const finalSource = source2.replace("%blur-struct%", blurStruct).replace("%blur-vertex-out%", blurOut).replace("%blur-fragment-in%", blurStruct).replace("%blur-sampling%", blurSampling).replace("%dimension%", horizontal ? "z" : "w");
  return GpuProgram.from({
    vertex: {
      source: finalSource,
      entryPoint: "mainVertex"
    },
    fragment: {
      source: finalSource,
      entryPoint: "mainFragment"
    }
  });
}

// node_modules/pixi.js/lib/filters/defaults/blur/BlurFilterPass.mjs
var _BlurFilterPass = class _BlurFilterPass2 extends Filter {
  /**
   * @param options
   * @param options.horizontal - Do pass along the x-axis (`true`) or y-axis (`false`).
   * @param options.strength - The strength of the blur filter.
   * @param options.quality - The quality of the blur filter.
   * @param options.kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */
  constructor(options) {
    options = { ..._BlurFilterPass2.defaultOptions, ...options };
    const glProgram = generateBlurGlProgram(options.horizontal, options.kernelSize);
    const gpuProgram = generateBlurProgram(options.horizontal, options.kernelSize);
    super({
      glProgram,
      gpuProgram,
      resources: {
        blurUniforms: {
          uStrength: { value: 0, type: "f32" }
        }
      },
      ...options
    });
    this.horizontal = options.horizontal;
    this._quality = 0;
    this.quality = options.quality;
    this.blur = options.strength;
    this._uniforms = this.resources.blurUniforms.uniforms;
  }
  /**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */
  apply(filterManager, input, output, clearMode) {
    this._uniforms.uStrength = this.strength / this.passes;
    if (this.passes === 1) {
      filterManager.applyFilter(this, input, output, clearMode);
    } else {
      const tempTexture = TexturePool.getSameSizeTexture(input);
      let flip = input;
      let flop = tempTexture;
      this._state.blend = false;
      const shouldClear = filterManager.renderer.type === RendererType.WEBGPU;
      for (let i = 0; i < this.passes - 1; i++) {
        filterManager.applyFilter(this, flip, flop, i === 0 ? true : shouldClear);
        const temp = flop;
        flop = flip;
        flip = temp;
      }
      this._state.blend = true;
      filterManager.applyFilter(this, flip, output, clearMode);
      TexturePool.returnTexture(tempTexture);
    }
  }
  /**
   * Sets the strength of both the blur.
   * @default 16
   */
  get blur() {
    return this.strength;
  }
  set blur(value) {
    this.padding = 1 + Math.abs(value) * 2;
    this.strength = value;
  }
  /**
   * Sets the quality of the blur by modifying the number of passes. More passes means higher
   * quality blurring but the lower the performance.
   * @default 4
   */
  get quality() {
    return this._quality;
  }
  set quality(value) {
    this._quality = value;
    this.passes = value;
  }
};
_BlurFilterPass.defaultOptions = {
  /** The strength of the blur filter. */
  strength: 8,
  /** The quality of the blur filter. */
  quality: 4,
  /** The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15. */
  kernelSize: 5
};
var BlurFilterPass = _BlurFilterPass;

// node_modules/pixi.js/lib/filters/defaults/blur/BlurFilter.mjs
var BlurFilter = class extends Filter {
  constructor(...args) {
    let options = args[0] ?? {};
    if (typeof options === "number") {
      deprecation(v8_0_0, "BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }");
      options = { strength: options };
      if (args[1] !== void 0)
        options.quality = args[1];
      if (args[2] !== void 0)
        options.resolution = args[2] || "inherit";
      if (args[3] !== void 0)
        options.kernelSize = args[3];
    }
    options = { ...BlurFilterPass.defaultOptions, ...options };
    const { strength, strengthX, strengthY, quality, ...rest } = options;
    super({
      ...rest,
      compatibleRenderers: RendererType.BOTH,
      resources: {}
    });
    this._repeatEdgePixels = false;
    this.blurXFilter = new BlurFilterPass({ horizontal: true, ...options });
    this.blurYFilter = new BlurFilterPass({ horizontal: false, ...options });
    this.quality = quality;
    this.strengthX = strengthX ?? strength;
    this.strengthY = strengthY ?? strength;
    this.repeatEdgePixels = false;
  }
  /**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */
  apply(filterManager, input, output, clearMode) {
    const xStrength = Math.abs(this.blurXFilter.strength);
    const yStrength = Math.abs(this.blurYFilter.strength);
    if (xStrength && yStrength) {
      const tempTexture = TexturePool.getSameSizeTexture(input);
      this.blurXFilter.blendMode = "normal";
      this.blurXFilter.apply(filterManager, input, tempTexture, true);
      this.blurYFilter.blendMode = this.blendMode;
      this.blurYFilter.apply(filterManager, tempTexture, output, clearMode);
      TexturePool.returnTexture(tempTexture);
    } else if (yStrength) {
      this.blurYFilter.blendMode = this.blendMode;
      this.blurYFilter.apply(filterManager, input, output, clearMode);
    } else {
      this.blurXFilter.blendMode = this.blendMode;
      this.blurXFilter.apply(filterManager, input, output, clearMode);
    }
  }
  updatePadding() {
    if (this._repeatEdgePixels) {
      this.padding = 0;
    } else {
      this.padding = Math.max(Math.abs(this.blurXFilter.blur), Math.abs(this.blurYFilter.blur)) * 2;
    }
  }
  /**
   * Sets the strength of both the blurX and blurY properties simultaneously
   * @default 8
   */
  get strength() {
    if (this.strengthX !== this.strengthY) {
      throw new Error("BlurFilter's strengthX and strengthY are different");
    }
    return this.strengthX;
  }
  set strength(value) {
    this.blurXFilter.blur = this.blurYFilter.blur = value;
    this.updatePadding();
  }
  /**
   * Sets the number of passes for blur. More passes means higher quality bluring.
   * @default 1
   */
  get quality() {
    return this.blurXFilter.quality;
  }
  set quality(value) {
    this.blurXFilter.quality = this.blurYFilter.quality = value;
  }
  /**
   * Sets the strength of horizontal blur
   * @default 8
   */
  get strengthX() {
    return this.blurXFilter.blur;
  }
  set strengthX(value) {
    this.blurXFilter.blur = value;
    this.updatePadding();
  }
  /**
   * Sets the strength of the vertical blur
   * @default 8
   */
  get strengthY() {
    return this.blurYFilter.blur;
  }
  set strengthY(value) {
    this.blurYFilter.blur = value;
    this.updatePadding();
  }
  /**
   * Sets the strength of both the blurX and blurY properties simultaneously
   * @default 2
   * @deprecated since 8.3.0
   * @see BlurFilter.strength
   */
  get blur() {
    deprecation("8.3.0", "BlurFilter.blur is deprecated, please use BlurFilter.strength instead.");
    return this.strength;
  }
  set blur(value) {
    deprecation("8.3.0", "BlurFilter.blur is deprecated, please use BlurFilter.strength instead.");
    this.strength = value;
  }
  /**
   * Sets the strength of the blurX property
   * @default 2
   * @deprecated since 8.3.0
   * @see BlurFilter.strengthX
   */
  get blurX() {
    deprecation("8.3.0", "BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead.");
    return this.strengthX;
  }
  set blurX(value) {
    deprecation("8.3.0", "BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead.");
    this.strengthX = value;
  }
  /**
   * Sets the strength of the blurY property
   * @default 2
   * @deprecated since 8.3.0
   * @see BlurFilter.strengthY
   */
  get blurY() {
    deprecation("8.3.0", "BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead.");
    return this.strengthY;
  }
  set blurY(value) {
    deprecation("8.3.0", "BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead.");
    this.strengthY = value;
  }
  /**
   * If set to true the edge of the target will be clamped
   * @default false
   */
  get repeatEdgePixels() {
    return this._repeatEdgePixels;
  }
  set repeatEdgePixels(value) {
    this._repeatEdgePixels = value;
    this.updatePadding();
  }
};
BlurFilter.defaultOptions = {
  /** The strength of the blur filter. */
  strength: 8,
  /** The quality of the blur filter. */
  quality: 4,
  /** The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15. */
  kernelSize: 5
};

// node_modules/pixi.js/lib/filters/defaults/noise/noise.frag.mjs
var fragment4 = "\nin vec2 vTextureCoord;\nin vec4 vColor;\n\nout vec4 finalColor;\n\nuniform float uNoise;\nuniform float uSeed;\nuniform sampler2D uTexture;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture(uTexture, vTextureCoord);\n    float randomValue = rand(gl_FragCoord.xy * uSeed);\n    float diff = (randomValue - 0.5) *  uNoise;\n\n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n    }\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    // Premultiply alpha again.\n    color.rgb *= color.a;\n\n    finalColor = color;\n}\n";

// node_modules/pixi.js/lib/filters/defaults/noise/noise.wgsl.mjs
var source5 = "\n\nstruct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct NoiseUniforms {\n  uNoise:f32,\n  uSeed:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n\n@group(1) @binding(0) var<uniform> noiseUniforms : NoiseUniforms;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  \n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n  \n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition)\n  );\n}\n\nfn rand(co:vec2<f32>) -> f32\n{\n  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\n\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @builtin(position) position: vec4<f32>\n) -> @location(0) vec4<f32> {\n\n    var pixelPosition =  globalTextureCoord(position.xy);// / (getSize());//-  gfu.uOutputFrame.xy);\n  \n    \n    var sample = textureSample(uTexture, uSampler, uv);\n    var randomValue =  rand(pixelPosition.xy * noiseUniforms.uSeed);\n    var diff = (randomValue - 0.5) * noiseUniforms.uNoise;\n  \n    // Un-premultiply alpha before applying the color matrix. See issue #3539.\n    if (sample.a > 0.0) {\n      sample.r /= sample.a;\n      sample.g /= sample.a;\n      sample.b /= sample.a;\n    }\n\n    sample.r += diff;\n    sample.g += diff;\n    sample.b += diff;\n\n    // Premultiply alpha again.\n    sample.r *= sample.a;\n    sample.g *= sample.a;\n    sample.b *= sample.a;\n    \n    return sample;\n}";

// node_modules/pixi.js/lib/filters/defaults/noise/NoiseFilter.mjs
var _NoiseFilter = class _NoiseFilter2 extends Filter {
  /**
   * @param options - The options of the noise filter.
   */
  constructor(options = {}) {
    options = { ..._NoiseFilter2.defaultOptions, ...options };
    const gpuProgram = GpuProgram.from({
      vertex: {
        source: source5,
        entryPoint: "mainVertex"
      },
      fragment: {
        source: source5,
        entryPoint: "mainFragment"
      }
    });
    const glProgram = GlProgram.from({
      vertex,
      fragment: fragment4,
      name: "noise-filter"
    });
    const { noise, seed, ...rest } = options;
    super({
      ...rest,
      gpuProgram,
      glProgram,
      resources: {
        noiseUniforms: new UniformGroup({
          uNoise: { value: 1, type: "f32" },
          uSeed: { value: 1, type: "f32" }
        })
      }
    });
    this.noise = noise;
    this.seed = seed ?? Math.random();
  }
  /**
   * The amount of noise to apply, this value should be in the range (0, 1].
   * @default 0.5
   */
  get noise() {
    return this.resources.noiseUniforms.uniforms.uNoise;
  }
  set noise(value) {
    this.resources.noiseUniforms.uniforms.uNoise = value;
  }
  /** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */
  get seed() {
    return this.resources.noiseUniforms.uniforms.uSeed;
  }
  set seed(value) {
    this.resources.noiseUniforms.uniforms.uSeed = value;
  }
};
_NoiseFilter.defaultOptions = {
  noise: 0.5
};

// node_modules/pixi.js/lib/maths/point/pointInTriangle.mjs
function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  const v2x = x3 - x1;
  const v2y = y3 - y1;
  const v1x = x2 - x1;
  const v1y = y2 - y1;
  const v0x = px - x1;
  const v0y = py - y1;
  const dot00 = v2x * v2x + v2y * v2y;
  const dot01 = v2x * v1x + v2y * v1y;
  const dot02 = v2x * v0x + v2y * v0y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v0x + v1y * v0y;
  const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
  const u2 = (dot11 * dot02 - dot01 * dot12) * invDenom;
  const v2 = (dot00 * dot12 - dot01 * dot02) * invDenom;
  return u2 >= 0 && v2 >= 0 && u2 + v2 < 1;
}

// node_modules/pixi.js/lib/prepare/PrepareBase.mjs
var _PrepareBase = class _PrepareBase2 {
  /**
   * @param {rendering.Renderer} renderer - A reference to the current renderer
   */
  constructor(renderer) {
    this._tick = () => {
      this.timeout = setTimeout(this._processQueue, 0);
    };
    this._processQueue = () => {
      const { queue } = this;
      let itemsProcessed = 0;
      while (queue.length && itemsProcessed < _PrepareBase2.uploadsPerFrame) {
        const queueItem = queue.shift();
        this.uploadQueueItem(queueItem);
        itemsProcessed++;
      }
      if (queue.length) {
        Ticker.system.addOnce(this._tick, this, UPDATE_PRIORITY.UTILITY);
      } else {
        this._resolve();
      }
    };
    this.renderer = renderer;
    this.queue = [];
    this.resolves = [];
  }
  /**
   * Return a copy of the queue
   * @returns {PrepareQueueItem[]} The queue
   */
  getQueue() {
    return [...this.queue];
  }
  /**
   * Add a textures or graphics resource to the queue
   * @param {PrepareSourceItem | PrepareSourceItem[]} resource
   */
  add(resource) {
    const resourceArray = Array.isArray(resource) ? resource : [resource];
    for (const resourceItem of resourceArray) {
      if (resourceItem instanceof Container) {
        this._addContainer(resourceItem);
      } else {
        this.resolveQueueItem(resourceItem, this.queue);
      }
    }
    return this;
  }
  /**
   * Recursively add a container and its children to the queue
   * @param {Container} container - The container to add to the queue
   */
  _addContainer(container) {
    this.resolveQueueItem(container, this.queue);
    for (const child of container.children) {
      this._addContainer(child);
    }
  }
  /**
   * Upload all the textures and graphics to the GPU (optionally add more resources to the queue first)
   * @param {PrepareSourceItem | PrepareSourceItem[] | undefined} resource
   */
  upload(resource) {
    if (resource) {
      this.add(resource);
    }
    return new Promise((resolve) => {
      if (this.queue.length) {
        this.resolves.push(resolve);
        this.dedupeQueue();
        Ticker.system.addOnce(this._tick, this, UPDATE_PRIORITY.UTILITY);
      } else {
        resolve();
      }
    });
  }
  /** eliminate duplicates before processing */
  dedupeQueue() {
    const hash = /* @__PURE__ */ Object.create(null);
    let nextUnique = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const current = this.queue[i];
      if (!hash[current.uid]) {
        hash[current.uid] = true;
        this.queue[nextUnique++] = current;
      }
    }
    this.queue.length = nextUnique;
  }
  /** Call all the resolve callbacks */
  _resolve() {
    const { resolves } = this;
    const array = resolves.slice(0);
    resolves.length = 0;
    for (const resolve of array) {
      resolve();
    }
  }
};
_PrepareBase.uploadsPerFrame = 4;
var PrepareBase = _PrepareBase;

// node_modules/pixi.js/lib/scene/mesh/shared/Mesh.mjs
var Mesh = class extends ViewContainer {
  constructor(...args) {
    let options = args[0];
    if (options instanceof Geometry) {
      deprecation(v8_0_0, "Mesh: use new Mesh({ geometry, shader }) instead");
      options = {
        geometry: options,
        shader: args[1]
      };
      if (args[3]) {
        deprecation(v8_0_0, "Mesh: drawMode argument has been removed, use geometry.topology instead");
        options.geometry.topology = args[3];
      }
    }
    const { geometry, shader, texture, roundPixels, state, ...rest } = options;
    super({
      label: "Mesh",
      ...rest
    });
    this.renderPipeId = "mesh";
    this._shader = null;
    this.allowChildren = false;
    this.shader = shader ?? null;
    this.texture = texture ?? shader?.texture ?? Texture.WHITE;
    this.state = state ?? State.for2d();
    this._geometry = geometry;
    this._geometry.on("update", this.onViewUpdate, this);
    this.roundPixels = roundPixels ?? false;
  }
  /** Alias for {@link scene.Mesh#shader}. */
  get material() {
    deprecation(v8_0_0, "mesh.material property has been removed, use mesh.shader instead");
    return this._shader;
  }
  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   */
  set shader(value) {
    if (this._shader === value)
      return;
    this._shader = value;
    this.onViewUpdate();
  }
  get shader() {
    return this._shader;
  }
  /**
   * Includes vertex positions, face indices, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh objects.
   */
  set geometry(value) {
    if (this._geometry === value)
      return;
    this._geometry?.off("update", this.onViewUpdate, this);
    value.on("update", this.onViewUpdate, this);
    this._geometry = value;
    this.onViewUpdate();
  }
  get geometry() {
    return this._geometry;
  }
  /** The texture that the Mesh uses. Null for non-MeshMaterial shaders */
  set texture(value) {
    value || (value = Texture.EMPTY);
    const currentTexture = this._texture;
    if (currentTexture === value)
      return;
    if (currentTexture && currentTexture.dynamic)
      currentTexture.off("update", this.onViewUpdate, this);
    if (value.dynamic)
      value.on("update", this.onViewUpdate, this);
    if (this.shader) {
      this.shader.texture = value;
    }
    this._texture = value;
    this.onViewUpdate();
  }
  get texture() {
    return this._texture;
  }
  get batched() {
    if (this._shader)
      return false;
    if ((this.state.data & 12) !== 0)
      return false;
    if (this._geometry instanceof MeshGeometry) {
      if (this._geometry.batchMode === "auto") {
        return this._geometry.positions.length / 2 <= 100;
      }
      return this._geometry.batchMode === "batch";
    }
    return false;
  }
  /**
   * The local bounds of the mesh.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._geometry.bounds;
  }
  /**
   * Update local bounds of the mesh.
   * @private
   */
  updateBounds() {
    this._bounds = this._geometry.bounds;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    const { x, y } = point;
    if (!this.bounds.containsPoint(x, y))
      return false;
    const vertices = this.geometry.getBuffer("aPosition").data;
    const step = this.geometry.topology === "triangle-strip" ? 3 : 1;
    if (this.geometry.getIndex()) {
      const indices = this.geometry.getIndex().data;
      const len = indices.length;
      for (let i = 0; i + 2 < len; i += step) {
        const ind0 = indices[i] * 2;
        const ind1 = indices[i + 1] * 2;
        const ind2 = indices[i + 2] * 2;
        if (pointInTriangle(
          x,
          y,
          vertices[ind0],
          vertices[ind0 + 1],
          vertices[ind1],
          vertices[ind1 + 1],
          vertices[ind2],
          vertices[ind2 + 1]
        )) {
          return true;
        }
      }
    } else {
      const len = vertices.length / 2;
      for (let i = 0; i + 2 < len; i += step) {
        const ind0 = i * 2;
        const ind1 = (i + 1) * 2;
        const ind2 = (i + 2) * 2;
        if (pointInTriangle(
          x,
          y,
          vertices[ind0],
          vertices[ind0 + 1],
          vertices[ind1],
          vertices[ind1 + 1],
          vertices[ind2],
          vertices[ind2 + 1]
        )) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options) {
    super.destroy(options);
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._geometry?.off("update", this.onViewUpdate, this);
    this._texture = null;
    this._geometry = null;
    this._shader = null;
  }
};

// node_modules/pixi.js/lib/scene/sprite-animated/AnimatedSprite.mjs
var AnimatedSprite = class _AnimatedSprite extends Sprite {
  /** @ignore */
  constructor(...args) {
    let options = args[0];
    if (Array.isArray(args[0])) {
      options = {
        textures: args[0],
        autoUpdate: args[1]
      };
    }
    const { textures, autoUpdate, ...rest } = options;
    const [firstFrame] = textures;
    super({
      ...rest,
      texture: firstFrame instanceof Texture ? firstFrame : firstFrame.texture
    });
    this._textures = null;
    this._durations = null;
    this._autoUpdate = autoUpdate ?? true;
    this._isConnectedToTicker = false;
    this.animationSpeed = 1;
    this.loop = true;
    this.updateAnchor = false;
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
    this._currentTime = 0;
    this._playing = false;
    this._previousFrame = null;
    this.textures = textures;
  }
  /** Stops the AnimatedSprite. */
  stop() {
    if (!this._playing) {
      return;
    }
    this._playing = false;
    if (this._autoUpdate && this._isConnectedToTicker) {
      Ticker.shared.remove(this.update, this);
      this._isConnectedToTicker = false;
    }
  }
  /** Plays the AnimatedSprite. */
  play() {
    if (this._playing) {
      return;
    }
    this._playing = true;
    if (this._autoUpdate && !this._isConnectedToTicker) {
      Ticker.shared.add(this.update, this, UPDATE_PRIORITY.HIGH);
      this._isConnectedToTicker = true;
    }
  }
  /**
   * Stops the AnimatedSprite and goes to a specific frame.
   * @param frameNumber - Frame index to stop at.
   */
  gotoAndStop(frameNumber) {
    this.stop();
    this.currentFrame = frameNumber;
  }
  /**
   * Goes to a specific frame and begins playing the AnimatedSprite.
   * @param frameNumber - Frame index to start at.
   */
  gotoAndPlay(frameNumber) {
    this.currentFrame = frameNumber;
    this.play();
  }
  /**
   * Updates the object transform for rendering.
   * @param ticker - the ticker to use to update the object.
   */
  update(ticker) {
    if (!this._playing) {
      return;
    }
    const deltaTime = ticker.deltaTime;
    const elapsed = this.animationSpeed * deltaTime;
    const previousFrame = this.currentFrame;
    if (this._durations !== null) {
      let lag = this._currentTime % 1 * this._durations[this.currentFrame];
      lag += elapsed / 60 * 1e3;
      while (lag < 0) {
        this._currentTime--;
        lag += this._durations[this.currentFrame];
      }
      const sign = Math.sign(this.animationSpeed * deltaTime);
      this._currentTime = Math.floor(this._currentTime);
      while (lag >= this._durations[this.currentFrame]) {
        lag -= this._durations[this.currentFrame] * sign;
        this._currentTime += sign;
      }
      this._currentTime += lag / this._durations[this.currentFrame];
    } else {
      this._currentTime += elapsed;
    }
    if (this._currentTime < 0 && !this.loop) {
      this.gotoAndStop(0);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (this._currentTime >= this._textures.length && !this.loop) {
      this.gotoAndStop(this._textures.length - 1);
      if (this.onComplete) {
        this.onComplete();
      }
    } else if (previousFrame !== this.currentFrame) {
      if (this.loop && this.onLoop) {
        if (this.animationSpeed > 0 && this.currentFrame < previousFrame || this.animationSpeed < 0 && this.currentFrame > previousFrame) {
          this.onLoop();
        }
      }
      this._updateTexture();
    }
  }
  /** Updates the displayed texture to match the current frame index. */
  _updateTexture() {
    const currentFrame = this.currentFrame;
    if (this._previousFrame === currentFrame) {
      return;
    }
    this._previousFrame = currentFrame;
    this.texture = this._textures[currentFrame];
    if (this.updateAnchor) {
      this.anchor.copyFrom(this.texture.defaultAnchor);
    }
    if (this.onFrameChange) {
      this.onFrameChange(this.currentFrame);
    }
  }
  /** Stops the AnimatedSprite and destroys it. */
  destroy() {
    this.stop();
    super.destroy();
    this.onComplete = null;
    this.onFrameChange = null;
    this.onLoop = null;
  }
  /**
   * A short hand way of creating an AnimatedSprite from an array of frame ids.
   * @param frames - The array of frames ids the AnimatedSprite will use as its texture frames.
   * @returns - The new animated sprite with the specified frames.
   */
  static fromFrames(frames) {
    const textures = [];
    for (let i = 0; i < frames.length; ++i) {
      textures.push(Texture.from(frames[i]));
    }
    return new _AnimatedSprite(textures);
  }
  /**
   * A short hand way of creating an AnimatedSprite from an array of image ids.
   * @param images - The array of image urls the AnimatedSprite will use as its texture frames.
   * @returns The new animate sprite with the specified images as frames.
   */
  static fromImages(images) {
    const textures = [];
    for (let i = 0; i < images.length; ++i) {
      textures.push(Texture.from(images[i]));
    }
    return new _AnimatedSprite(textures);
  }
  /**
   * The total number of frames in the AnimatedSprite. This is the same as number of textures
   * assigned to the AnimatedSprite.
   * @readonly
   * @default 0
   */
  get totalFrames() {
    return this._textures.length;
  }
  /** The array of textures used for this AnimatedSprite. */
  get textures() {
    return this._textures;
  }
  set textures(value) {
    if (value[0] instanceof Texture) {
      this._textures = value;
      this._durations = null;
    } else {
      this._textures = [];
      this._durations = [];
      for (let i = 0; i < value.length; i++) {
        this._textures.push(value[i].texture);
        this._durations.push(value[i].time);
      }
    }
    this._previousFrame = null;
    this.gotoAndStop(0);
    this._updateTexture();
  }
  /** The AnimatedSprite's current frame index. */
  get currentFrame() {
    let currentFrame = Math.floor(this._currentTime) % this._textures.length;
    if (currentFrame < 0) {
      currentFrame += this._textures.length;
    }
    return currentFrame;
  }
  set currentFrame(value) {
    if (value < 0 || value > this.totalFrames - 1) {
      throw new Error(`[AnimatedSprite]: Invalid frame index value ${value}, expected to be between 0 and totalFrames ${this.totalFrames}.`);
    }
    const previousFrame = this.currentFrame;
    this._currentTime = value;
    if (previousFrame !== this.currentFrame) {
      this._updateTexture();
    }
  }
  /**
   * Indicates if the AnimatedSprite is currently playing.
   * @readonly
   */
  get playing() {
    return this._playing;
  }
  /** Whether to use Ticker.shared to auto update animation time. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    if (value !== this._autoUpdate) {
      this._autoUpdate = value;
      if (!this._autoUpdate && this._isConnectedToTicker) {
        Ticker.shared.remove(this.update, this);
        this._isConnectedToTicker = false;
      } else if (this._autoUpdate && !this._isConnectedToTicker && this._playing) {
        Ticker.shared.add(this.update, this);
        this._isConnectedToTicker = true;
      }
    }
  }
};

// node_modules/pixi.js/lib/utils/misc/Transform.mjs
var Transform = class {
  /**
   * @param options - Options for the transform.
   * @param options.matrix - The matrix to use.
   * @param options.observer - The observer to use.
   */
  constructor({ matrix, observer } = {}) {
    this.dirty = true;
    this._matrix = matrix ?? new Matrix();
    this.observer = observer;
    this.position = new ObservablePoint(this, 0, 0);
    this.scale = new ObservablePoint(this, 1, 1);
    this.pivot = new ObservablePoint(this, 0, 0);
    this.skew = new ObservablePoint(this, 0, 0);
    this._rotation = 0;
    this._cx = 1;
    this._sx = 0;
    this._cy = 0;
    this._sy = 1;
  }
  /**
   * This matrix is computed by combining this Transforms position, scale, rotation, skew, and pivot
   * properties into a single matrix.
   * @readonly
   */
  get matrix() {
    const lt2 = this._matrix;
    if (!this.dirty)
      return lt2;
    lt2.a = this._cx * this.scale.x;
    lt2.b = this._sx * this.scale.x;
    lt2.c = this._cy * this.scale.y;
    lt2.d = this._sy * this.scale.y;
    lt2.tx = this.position.x - (this.pivot.x * lt2.a + this.pivot.y * lt2.c);
    lt2.ty = this.position.y - (this.pivot.x * lt2.b + this.pivot.y * lt2.d);
    this.dirty = false;
    return lt2;
  }
  /**
   * Called when a value changes.
   * @param point
   * @internal
   * @private
   */
  _onUpdate(point) {
    this.dirty = true;
    if (point === this.skew) {
      this.updateSkew();
    }
    this.observer?._onUpdate(this);
  }
  /** Called when the skew or the rotation changes. */
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y);
    this._sx = Math.sin(this._rotation + this.skew.y);
    this._cy = -Math.sin(this._rotation - this.skew.x);
    this._sy = Math.cos(this._rotation - this.skew.x);
    this.dirty = true;
  }
  toString() {
    return `[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
  }
  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */
  setFromMatrix(matrix) {
    matrix.decompose(this);
    this.dirty = true;
  }
  /** The rotation of the object in radians. */
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    if (this._rotation !== value) {
      this._rotation = value;
      this._onUpdate(this.skew);
    }
  }
};

// node_modules/pixi.js/lib/scene/sprite-tiling/TilingSprite.mjs
var _TilingSprite = class _TilingSprite2 extends ViewContainer {
  constructor(...args) {
    let options = args[0] || {};
    if (options instanceof Texture) {
      options = { texture: options };
    }
    if (args.length > 1) {
      deprecation(v8_0_0, "use new TilingSprite({ texture, width:100, height:100 }) instead");
      options.width = args[1];
      options.height = args[2];
    }
    options = { ..._TilingSprite2.defaultOptions, ...options };
    const {
      texture,
      anchor,
      tilePosition,
      tileScale,
      tileRotation,
      width,
      height,
      applyAnchorToTexture,
      roundPixels,
      ...rest
    } = options ?? {};
    super({
      label: "TilingSprite",
      ...rest
    });
    this.renderPipeId = "tilingSprite";
    this.batched = true;
    this.allowChildren = false;
    this._anchor = new ObservablePoint(
      {
        _onUpdate: () => {
          this.onViewUpdate();
        }
      }
    );
    this.applyAnchorToTexture = applyAnchorToTexture;
    this.texture = texture;
    this._width = width ?? texture.width;
    this._height = height ?? texture.height;
    this._tileTransform = new Transform({
      observer: {
        _onUpdate: () => this.onViewUpdate()
      }
    });
    if (anchor)
      this.anchor = anchor;
    this.tilePosition = tilePosition;
    this.tileScale = tileScale;
    this.tileRotation = tileRotation;
    this.roundPixels = roundPixels ?? false;
  }
  /**
   * Creates a new tiling sprite.
   * @param source - The source to create the texture from.
   * @param options - The options for creating the tiling sprite.
   * @returns A new tiling sprite.
   */
  static from(source7, options = {}) {
    if (typeof source7 === "string") {
      return new _TilingSprite2({
        texture: Cache.get(source7),
        ...options
      });
    }
    return new _TilingSprite2({
      texture: source7,
      ...options
    });
  }
  /**
   * @see {@link scene.TilingSpriteOptions.applyAnchorToTexture}
   * @deprecated since 8.0.0
   */
  get uvRespectAnchor() {
    warn("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead");
    return this.applyAnchorToTexture;
  }
  set uvRespectAnchor(value) {
    warn("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead");
    this.applyAnchorToTexture = value;
  }
  /**
   * Changes frame clamping in corresponding textureMatrix
   * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
   * @default 0.5
   * @member {number}
   */
  get clampMargin() {
    return this._texture.textureMatrix.clampMargin;
  }
  set clampMargin(value) {
    this._texture.textureMatrix.clampMargin = value;
  }
  /**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { TilingSprite } from 'pixi.js';
   *
   * const sprite = new TilingSprite({texture: Texture.WHITE});
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    typeof value === "number" ? this._anchor.set(value) : this._anchor.copyFrom(value);
  }
  /** The offset of the image that is being tiled. */
  get tilePosition() {
    return this._tileTransform.position;
  }
  set tilePosition(value) {
    this._tileTransform.position.copyFrom(value);
  }
  /** The scaling of the image that is being tiled. */
  get tileScale() {
    return this._tileTransform.scale;
  }
  set tileScale(value) {
    typeof value === "number" ? this._tileTransform.scale.set(value) : this._tileTransform.scale.copyFrom(value);
  }
  set tileRotation(value) {
    this._tileTransform.rotation = value;
  }
  /** The rotation of the image that is being tiled. */
  get tileRotation() {
    return this._tileTransform.rotation;
  }
  /** The transform of the image that is being tiled. */
  get tileTransform() {
    return this._tileTransform;
  }
  set texture(value) {
    value || (value = Texture.EMPTY);
    const currentTexture = this._texture;
    if (currentTexture === value)
      return;
    if (currentTexture && currentTexture.dynamic)
      currentTexture.off("update", this.onViewUpdate, this);
    if (value.dynamic)
      value.on("update", this.onViewUpdate, this);
    this._texture = value;
    this.onViewUpdate();
  }
  /** The texture that the sprite is using. */
  get texture() {
    return this._texture;
  }
  /** The width of the tiling area. */
  set width(value) {
    this._width = value;
    this.onViewUpdate();
  }
  get width() {
    return this._width;
  }
  set height(value) {
    this._height = value;
    this.onViewUpdate();
  }
  /** The height of the tiling area. */
  get height() {
    return this._height;
  }
  /**
   * Sets the size of the TilingSprite to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(value, height) {
    if (typeof value === "object") {
      height = value.height ?? value.width;
      value = value.width;
    }
    this._width = value;
    this._height = height ?? value;
    this.onViewUpdate();
  }
  /**
   * Retrieves the size of the TilingSprite as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the TilingSprite.
   */
  getSize(out) {
    out || (out = {});
    out.width = this._width;
    out.height = this._height;
    return out;
  }
  /**
   * @private
   */
  updateBounds() {
    const bounds = this._bounds;
    const anchor = this._anchor;
    const width = this._width;
    const height = this._height;
    bounds.maxX = -anchor._x * width;
    bounds.minX = bounds.maxX + width;
    bounds.maxY = -anchor._y * height;
    bounds.minY = bounds.maxY + height;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    const width = this._width;
    const height = this._height;
    const x1 = -width * this._anchor._x;
    let y1 = 0;
    if (point.x >= x1 && point.x <= x1 + width) {
      y1 = -height * this._anchor._y;
      if (point.y >= y1 && point.y <= y1 + height)
        return true;
    }
    return false;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options = false) {
    super.destroy(options);
    this._anchor = null;
    this._tileTransform = null;
    this._bounds = null;
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._texture = null;
  }
};
_TilingSprite.defaultOptions = {
  /** The texture to use for the sprite. */
  texture: Texture.EMPTY,
  /** The anchor point of the sprite */
  anchor: { x: 0, y: 0 },
  /** The offset of the image that is being tiled. */
  tilePosition: { x: 0, y: 0 },
  /** Scaling of the image that is being tiled. */
  tileScale: { x: 1, y: 1 },
  /** The rotation of the image that is being tiled. */
  tileRotation: 0,
  /**
   * Flags whether the tiling pattern should originate from the origin instead of the top-left corner in
   * local space.
   *
   * This will make the texture coordinates assigned to each vertex dependent on the value of the anchor. Without
   * this, the top-left corner always gets the (0, 0) texture coordinate.
   * @default false
   */
  applyAnchorToTexture: false
};
var TilingSprite = _TilingSprite;

// node_modules/pixi.js/lib/scene/text/AbstractText.mjs
var AbstractText = class extends ViewContainer {
  constructor(options, styleClass) {
    const { text, resolution, style, anchor, width, height, roundPixels, ...rest } = options;
    super({
      ...rest
    });
    this.batched = true;
    this._resolution = null;
    this._autoResolution = true;
    this._didTextUpdate = true;
    this._styleClass = styleClass;
    this.text = text ?? "";
    this.style = style;
    this.resolution = resolution ?? null;
    this.allowChildren = false;
    this._anchor = new ObservablePoint(
      {
        _onUpdate: () => {
          this.onViewUpdate();
        }
      }
    );
    if (anchor)
      this.anchor = anchor;
    this.roundPixels = roundPixels ?? false;
    if (width !== void 0)
      this.width = width;
    if (height !== void 0)
      this.height = height;
  }
  /**
   * The anchor sets the origin point of the text.
   * The default is `(0,0)`, this means the text's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Text } from 'pixi.js';
   *
   * const text = new Text('hello world');
   * text.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(value) {
    typeof value === "number" ? this._anchor.set(value) : this._anchor.copyFrom(value);
  }
  /** Set the copy for the text object. To split a line you can use '\n'. */
  set text(value) {
    value = value.toString();
    if (this._text === value)
      return;
    this._text = value;
    this.onViewUpdate();
  }
  get text() {
    return this._text;
  }
  /**
   * The resolution / device pixel ratio of the canvas.
   * @default 1
   */
  set resolution(value) {
    this._autoResolution = value === null;
    this._resolution = value;
    this.onViewUpdate();
  }
  get resolution() {
    return this._resolution;
  }
  get style() {
    return this._style;
  }
  /**
   * Set the style of the text.
   *
   * Set up an event listener to listen for changes on the style object and mark the text as dirty.
   *
   * If setting the `style` can also be partial {@link AnyTextStyleOptions}.
   * @type {
   * text.TextStyle |
   * Partial<text.TextStyle> |
   * text.TextStyleOptions |
   * text.HTMLTextStyle |
   * Partial<text.HTMLTextStyle> |
   * text.HTMLTextStyleOptions
   * }
   */
  set style(style) {
    style || (style = {});
    this._style?.off("update", this.onViewUpdate, this);
    if (style instanceof this._styleClass) {
      this._style = style;
    } else {
      this._style = new this._styleClass(style);
    }
    this._style.on("update", this.onViewUpdate, this);
    this.onViewUpdate();
  }
  /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return Math.abs(this.scale.x) * this.bounds.width;
  }
  set width(value) {
    this._setWidth(value, this.bounds.width);
  }
  /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return Math.abs(this.scale.y) * this.bounds.height;
  }
  set height(value) {
    this._setHeight(value, this.bounds.height);
  }
  /**
   * Retrieves the size of the Text as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the Text.
   */
  getSize(out) {
    out || (out = {});
    out.width = Math.abs(this.scale.x) * this.bounds.width;
    out.height = Math.abs(this.scale.y) * this.bounds.height;
    return out;
  }
  /**
   * Sets the size of the Text to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(value, height) {
    if (typeof value === "object") {
      height = value.height ?? value.width;
      value = value.width;
    } else {
      height ?? (height = value);
    }
    value !== void 0 && this._setWidth(value, this.bounds.width);
    height !== void 0 && this._setHeight(height, this.bounds.height);
  }
  /**
   * Checks if the text contains the given point.
   * @param point - The point to check
   */
  containsPoint(point) {
    const width = this.bounds.width;
    const height = this.bounds.height;
    const x1 = -width * this.anchor.x;
    let y1 = 0;
    if (point.x >= x1 && point.x <= x1 + width) {
      y1 = -height * this.anchor.y;
      if (point.y >= y1 && point.y <= y1 + height)
        return true;
    }
    return false;
  }
  onViewUpdate() {
    if (!this.didViewUpdate)
      this._didTextUpdate = true;
    super.onViewUpdate();
  }
  _getKey() {
    return `${this.text}:${this._style.styleKey}:${this._resolution}`;
  }
  /**
   * Destroys this text renderable and optionally its style texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the texture of the text style
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the text style
   * @param {boolean} [options.style=false] - Should it destroy the style of the text
   */
  destroy(options = false) {
    super.destroy(options);
    this.owner = null;
    this._bounds = null;
    this._anchor = null;
    if (typeof options === "boolean" ? options : options?.style) {
      this._style.destroy(options);
    }
    this._style = null;
    this._text = null;
  }
};
function ensureOptions(args, name) {
  let options = args[0] ?? {};
  if (typeof options === "string" || args[1]) {
    deprecation(v8_0_0, `use new ${name}({ text: "hi!", style }) instead`);
    options = {
      text: options,
      style: args[1]
    };
  }
  return options;
}

// node_modules/pixi.js/lib/scene/text/Text.mjs
var Text = class extends AbstractText {
  constructor(...args) {
    const options = ensureOptions(args, "Text");
    super(options, TextStyle);
    this.renderPipeId = "text";
  }
  /** @private */
  updateBounds() {
    const bounds = this._bounds;
    const anchor = this._anchor;
    const canvasMeasurement = CanvasTextMetrics.measureText(
      this._text,
      this._style
    );
    const { width, height } = canvasMeasurement;
    bounds.minX = -anchor._x * width;
    bounds.maxX = bounds.minX + width;
    bounds.minY = -anchor._y * height;
    bounds.maxY = bounds.minY + height;
  }
};

// node_modules/pixi.js/lib/prepare/PrepareQueue.mjs
var PrepareQueue = class extends PrepareBase {
  /**
   * Resolve the given resource type and return an item for the queue
   * @param source
   * @param queue
   */
  resolveQueueItem(source7, queue) {
    if (source7 instanceof Container) {
      this.resolveContainerQueueItem(source7, queue);
    } else if (source7 instanceof TextureSource || source7 instanceof Texture) {
      queue.push(source7.source);
    } else if (source7 instanceof GraphicsContext) {
      queue.push(source7);
    }
    return null;
  }
  /**
   * Resolve the given container and return an item for the queue
   * @param container
   * @param queue
   */
  resolveContainerQueueItem(container, queue) {
    if (container instanceof Sprite || container instanceof TilingSprite || container instanceof Mesh) {
      queue.push(container.texture.source);
    } else if (container instanceof Text) {
      queue.push(container);
    } else if (container instanceof Graphics) {
      queue.push(container.context);
    } else if (container instanceof AnimatedSprite) {
      container.textures.forEach((textureOrFrame) => {
        if (textureOrFrame.source) {
          queue.push(textureOrFrame.source);
        } else {
          queue.push(textureOrFrame.texture.source);
        }
      });
    }
  }
  /**
   * Resolve the given graphics context and return an item for the queue
   * @param graphicsContext
   */
  resolveGraphicsContextQueueItem(graphicsContext) {
    this.renderer.graphicsContext.getContextRenderData(graphicsContext);
    const { instructions } = graphicsContext;
    for (const instruction of instructions) {
      if (instruction.action === "texture") {
        const { image } = instruction.data;
        return image.source;
      } else if (instruction.action === "fill") {
        const { texture } = instruction.data.style;
        return texture.source;
      }
    }
    return null;
  }
};

// node_modules/pixi.js/lib/scene/text-bitmap/BitmapText.mjs
var BitmapText = class extends AbstractText {
  constructor(...args) {
    var _a;
    const options = ensureOptions(args, "BitmapText");
    options.style ?? (options.style = options.style || {});
    (_a = options.style).fill ?? (_a.fill = 16777215);
    super(options, TextStyle);
    this.renderPipeId = "bitmapText";
  }
  /** @private */
  updateBounds() {
    const bounds = this._bounds;
    const anchor = this._anchor;
    const bitmapMeasurement = BitmapFontManager.measureText(this.text, this._style);
    const scale = bitmapMeasurement.scale;
    const offset = bitmapMeasurement.offsetY * scale;
    let width = bitmapMeasurement.width * scale;
    let height = bitmapMeasurement.height * scale;
    const stroke = this._style._stroke;
    if (stroke) {
      width += stroke.width;
      height += stroke.width;
    }
    bounds.minX = -anchor._x * width;
    bounds.maxX = bounds.minX + width;
    bounds.minY = -anchor._y * (height + offset);
    bounds.maxY = bounds.minY + height;
  }
  /**
   * The resolution / device pixel ratio of the canvas.
   * @default 1
   */
  set resolution(value) {
    if (value !== null) {
      warn(
        // eslint-disable-next-line max-len
        "[BitmapText] dynamically updating the resolution is not supported. Resolution should be managed by the BitmapFont."
      );
    }
  }
  get resolution() {
    return this._resolution;
  }
};

// node_modules/pixi.js/lib/scene/text-html/HTMLText.mjs
var HTMLText = class extends AbstractText {
  constructor(...args) {
    const options = ensureOptions(args, "HtmlText");
    super(options, HTMLTextStyle);
    this.renderPipeId = "htmlText";
  }
  /** @private */
  updateBounds() {
    const bounds = this._bounds;
    const anchor = this._anchor;
    const htmlMeasurement = measureHtmlText(this.text, this._style);
    const { width, height } = htmlMeasurement;
    bounds.minX = -anchor._x * width;
    bounds.maxX = bounds.minX + width;
    bounds.minY = -anchor._y * height;
    bounds.maxY = bounds.minY + height;
  }
};

// node_modules/pixi.js/lib/prepare/PrepareUpload.mjs
var PrepareUpload = class extends PrepareQueue {
  /**
   * Upload the given queue item
   * @param item
   */
  uploadQueueItem(item) {
    if (item instanceof TextureSource) {
      this.uploadTextureSource(item);
    } else if (item instanceof Text) {
      this.uploadText(item);
    } else if (item instanceof HTMLText) {
      this.uploadHTMLText(item);
    } else if (item instanceof BitmapText) {
      this.uploadBitmapText(item);
    } else if (item instanceof GraphicsContext) {
      this.uploadGraphicsContext(item);
    }
  }
  uploadTextureSource(textureSource) {
    this.renderer.texture.initSource(textureSource);
  }
  uploadText(_text) {
    this.renderer.renderPipes.text.initGpuText(_text);
  }
  uploadBitmapText(_text) {
    this.renderer.renderPipes.bitmapText.initGpuText(_text);
  }
  uploadHTMLText(_text) {
    this.renderer.renderPipes.htmlText.initGpuText(_text);
  }
  /**
   * Resolve the given graphics context and return an item for the queue
   * @param graphicsContext
   */
  uploadGraphicsContext(graphicsContext) {
    this.renderer.graphicsContext.getContextRenderData(graphicsContext);
    const { instructions } = graphicsContext;
    for (const instruction of instructions) {
      if (instruction.action === "texture") {
        const { image } = instruction.data;
        this.uploadTextureSource(image.source);
      } else if (instruction.action === "fill") {
        const { texture } = instruction.data.style;
        this.uploadTextureSource(texture.source);
      }
    }
    return null;
  }
};

// node_modules/pixi.js/lib/prepare/PrepareSystem.mjs
var PrepareSystem = class extends PrepareUpload {
  /** Destroys the plugin, don't use after this. */
  destroy() {
    clearTimeout(this.timeout);
    this.renderer = null;
    this.queue = null;
    this.resolves = null;
  }
};
PrepareSystem.extension = {
  type: [
    ExtensionType.WebGLSystem,
    ExtensionType.WebGPUSystem
  ],
  name: "prepare"
};

// node_modules/pixi.js/lib/rendering/renderers/shared/geometry/const.mjs
var DEPRECATED_DRAW_MODES = {
  POINTS: "point-list",
  LINES: "line-list",
  LINE_STRIP: "line-strip",
  TRIANGLES: "triangle-list",
  TRIANGLE_STRIP: "triangle-strip"
};
var DRAW_MODES = new Proxy(DEPRECATED_DRAW_MODES, {
  get(target, prop) {
    deprecation(v8_0_0, `DRAW_MODES.${prop} is deprecated, use '${DEPRECATED_DRAW_MODES[prop]}' instead`);
    return target[prop];
  }
});

// node_modules/pixi.js/lib/rendering/renderers/shared/renderTarget/viewportFromFrame.mjs
var fullFrame = new Rectangle(0, 0, 1, 1);

// node_modules/pixi.js/lib/rendering/renderers/shared/texture/const.mjs
var MSAA_QUALITY = ((MSAA_QUALITY2) => {
  MSAA_QUALITY2[MSAA_QUALITY2["NONE"] = 0] = "NONE";
  MSAA_QUALITY2[MSAA_QUALITY2["LOW"] = 2] = "LOW";
  MSAA_QUALITY2[MSAA_QUALITY2["MEDIUM"] = 4] = "MEDIUM";
  MSAA_QUALITY2[MSAA_QUALITY2["HIGH"] = 8] = "HIGH";
  return MSAA_QUALITY2;
})(MSAA_QUALITY || {});
var DEPRECATED_WRAP_MODES = ((DEPRECATED_WRAP_MODES2) => {
  DEPRECATED_WRAP_MODES2["CLAMP"] = "clamp-to-edge";
  DEPRECATED_WRAP_MODES2["REPEAT"] = "repeat";
  DEPRECATED_WRAP_MODES2["MIRRORED_REPEAT"] = "mirror-repeat";
  return DEPRECATED_WRAP_MODES2;
})(DEPRECATED_WRAP_MODES || {});
var WRAP_MODES = new Proxy(DEPRECATED_WRAP_MODES, {
  get(target, prop) {
    deprecation(v8_0_0, `DRAW_MODES.${prop} is deprecated, use '${DEPRECATED_WRAP_MODES[prop]}' instead`);
    return target[prop];
  }
});
var DEPRECATED_SCALE_MODES = ((DEPRECATED_SCALE_MODES2) => {
  DEPRECATED_SCALE_MODES2["NEAREST"] = "nearest";
  DEPRECATED_SCALE_MODES2["LINEAR"] = "linear";
  return DEPRECATED_SCALE_MODES2;
})(DEPRECATED_SCALE_MODES || {});
var SCALE_MODES = new Proxy(DEPRECATED_SCALE_MODES, {
  get(target, prop) {
    deprecation(v8_0_0, `DRAW_MODES.${prop} is deprecated, use '${DEPRECATED_SCALE_MODES[prop]}' instead`);
    return target[prop];
  }
});

// node_modules/pixi.js/lib/scene/mesh-perspective/utils/applyProjectiveTransformationToPlane.mjs
function applyProjectiveTransformationToPlane(width, height, geometry, transformationMatrix) {
  const buffer = geometry.buffers[0];
  const vertices = buffer.data;
  const { verticesX, verticesY } = geometry;
  const sizeX = width / (verticesX - 1);
  const sizeY = height / (verticesY - 1);
  let index = 0;
  const a00 = transformationMatrix[0];
  const a01 = transformationMatrix[1];
  const a02 = transformationMatrix[2];
  const a10 = transformationMatrix[3];
  const a11 = transformationMatrix[4];
  const a12 = transformationMatrix[5];
  const a20 = transformationMatrix[6];
  const a21 = transformationMatrix[7];
  const a22 = transformationMatrix[8];
  for (let i = 0; i < vertices.length; i += 2) {
    const x = index % verticesX * sizeX;
    const y = (index / verticesX | 0) * sizeY;
    const newX = a00 * x + a01 * y + a02;
    const newY = a10 * x + a11 * y + a12;
    const w2 = a20 * x + a21 * y + a22;
    vertices[i] = newX / w2;
    vertices[i + 1] = newY / w2;
    index++;
  }
  buffer.update();
}

// node_modules/pixi.js/lib/scene/mesh-perspective/utils/compute2DProjections.mjs
function computeAdjugate(out, matrix) {
  const a00 = matrix[0];
  const a01 = matrix[1];
  const a02 = matrix[2];
  const a10 = matrix[3];
  const a11 = matrix[4];
  const a12 = matrix[5];
  const a20 = matrix[6];
  const a21 = matrix[7];
  const a22 = matrix[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function multiplyMatrix3x3(out, a, b3) {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a10 = a[3];
  const a11 = a[4];
  const a12 = a[5];
  const a20 = a[6];
  const a21 = a[7];
  const a22 = a[8];
  const b00 = b3[0];
  const b01 = b3[1];
  const b02 = b3[2];
  const b10 = b3[3];
  const b11 = b3[4];
  const b12 = b3[5];
  const b20 = b3[6];
  const b21 = b3[7];
  const b22 = b3[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function multiplyMatrixAndVector(out, m3, v2) {
  const x = v2[0];
  const y = v2[1];
  const z = v2[2];
  out[0] = m3[0] * x + m3[1] * y + m3[2] * z;
  out[1] = m3[3] * x + m3[4] * y + m3[5] * z;
  out[2] = m3[6] * x + m3[7] * y + m3[8] * z;
  return out;
}
var tempMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var tempVec = [0, 0, 0];
var tempVec2 = [0, 0, 0];
function generateBasisToPointsMatrix(out, x1, y1, x2, y2, x3, y3, x4, y4) {
  const m3 = tempMatrix;
  m3[0] = x1;
  m3[1] = x2;
  m3[2] = x3;
  m3[3] = y1;
  m3[4] = y2;
  m3[5] = y3;
  m3[6] = 1;
  m3[7] = 1;
  m3[8] = 1;
  const adjugateM = computeAdjugate(
    out,
    // reusing out as adjugateM is only used once
    m3
  );
  tempVec2[0] = x4;
  tempVec2[1] = y4;
  tempVec2[2] = 1;
  const v2 = multiplyMatrixAndVector(
    tempVec,
    adjugateM,
    tempVec2
  );
  const diagonalMatrix = out;
  out[0] = v2[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v2[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = v2[2];
  return multiplyMatrix3x3(out, diagonalMatrix, m3);
}
var tempSourceMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var tempDestinationMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
function compute2DProjection(out, x1s, y1s, x1d, y1d, x2s, y2s, x2d, y2d, x3s, y3s, x3d, y3d, x4s, y4s, x4d, y4d) {
  const sourceMatrix = generateBasisToPointsMatrix(
    tempSourceMatrix,
    x1s,
    y1s,
    x2s,
    y2s,
    x3s,
    y3s,
    x4s,
    y4s
  );
  const destinationMatrix = generateBasisToPointsMatrix(
    tempDestinationMatrix,
    x1d,
    y1d,
    x2d,
    y2d,
    x3d,
    y3d,
    x4d,
    y4d
  );
  return multiplyMatrix3x3(
    out,
    computeAdjugate(sourceMatrix, sourceMatrix),
    destinationMatrix
  );
}

// node_modules/pixi.js/lib/scene/mesh-perspective/PerspectivePlaneGeometry.mjs
var PerspectivePlaneGeometry = class extends PlaneGeometry {
  /**
   * @param options - Options to be applied to MeshPlane
   * @param options.width - The width of the plane
   * @param options.height - The height of the plane
   * @param options.verticesX - The amount of vertices on the x axis
   * @param options.verticesY - The amount of vertices on the y axis
   */
  constructor(options) {
    super(options);
    this._projectionMatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const { width, height } = options;
    this.corners = [0, 0, width, 0, width, height, 0, height];
  }
  /**
   * Will set the corners of the quad to the given coordinates
   * Calculating the perspective so it looks correct!
   * @param x0 - x coordinate of the first corner
   * @param y0 - y coordinate of the first corner
   * @param x1 - x coordinate of the second corner
   * @param y1 - y coordinate of the second corner
   * @param x2 - x coordinate of the third corner
   * @param y2 - y coordinate of the third corner
   * @param x3 - x coordinate of the fourth corner
   * @param y3 - y coordinate of the fourth corner
   */
  setCorners(x0, y0, x1, y1, x2, y2, x3, y3) {
    const corners = this.corners;
    corners[0] = x0;
    corners[1] = y0;
    corners[2] = x1;
    corners[3] = y1;
    corners[4] = x2;
    corners[5] = y2;
    corners[6] = x3;
    corners[7] = y3;
    this.updateProjection();
  }
  /** Update the projection matrix based on the corners */
  updateProjection() {
    const { width, height } = this;
    const corners = this.corners;
    const projectionMatrix = compute2DProjection(
      this._projectionMatrix,
      0,
      0,
      // top-left source
      corners[0],
      corners[1],
      // top-left dest
      width,
      0,
      // top-right source
      corners[2],
      corners[3],
      // top-right dest
      width,
      height,
      // bottom-right source
      corners[4],
      corners[5],
      // bottom-right dest
      0,
      height,
      // bottom-left source
      corners[6],
      corners[7]
      // bottom-left dest
    );
    applyProjectiveTransformationToPlane(
      width,
      height,
      this,
      projectionMatrix
    );
  }
};

// node_modules/pixi.js/lib/scene/mesh-perspective/PerspectiveMesh.mjs
var _PerspectiveMesh = class _PerspectiveMesh2 extends Mesh {
  /**
   * @param options - Options to be applied to PerspectiveMesh
   */
  constructor(options) {
    options = { ..._PerspectiveMesh2.defaultOptions, ...options };
    const { texture, verticesX, verticesY, ...rest } = options;
    const planeGeometry = new PerspectivePlaneGeometry(definedProps({
      width: texture.width,
      height: texture.height,
      verticesX,
      verticesY
    }));
    super(definedProps({ ...rest, geometry: planeGeometry }));
    this._texture = texture;
    this.geometry.setCorners(
      options.x0,
      options.y0,
      options.x1,
      options.y1,
      options.x2,
      options.y2,
      options.x3,
      options.y3
    );
  }
  /** Update the geometry when the texture is updated */
  textureUpdated() {
    const geometry = this.geometry;
    if (!geometry)
      return;
    const { width, height } = this.texture;
    if (geometry.width !== width || geometry.height !== height) {
      geometry.width = width;
      geometry.height = height;
      geometry.updateProjection();
    }
  }
  set texture(value) {
    if (this._texture === value)
      return;
    super.texture = value;
    this.textureUpdated();
  }
  /** The texture that the mesh uses */
  get texture() {
    return this._texture;
  }
  /**
   * Set the corners of the quad to the given coordinates
   * The mesh will then calculate the perspective so it looks correct!
   * @param x0 - x coordinate of the first corner
   * @param y0 - y coordinate of the first corner
   * @param x1 - x coordinate of the second corner
   * @param y1 - y coordinate of the second corner
   * @param x2 - x coordinate of the third corner
   * @param y2 - y coordinate of the third corner
   * @param x3 - x coordinate of the fourth corner
   * @param y3 - y coordinate of the fourth corner
   */
  setCorners(x0, y0, x1, y1, x2, y2, x3, y3) {
    this.geometry.setCorners(x0, y0, x1, y1, x2, y2, x3, y3);
  }
};
_PerspectiveMesh.defaultOptions = {
  texture: Texture.WHITE,
  verticesX: 10,
  verticesY: 10,
  x0: 0,
  y0: 0,
  x1: 100,
  y1: 0,
  x2: 100,
  y2: 100,
  x3: 0,
  y3: 100
};

// node_modules/pixi.js/lib/scene/mesh-simple/RopeGeometry.mjs
var _RopeGeometry = class _RopeGeometry2 extends MeshGeometry {
  /**
   * @param options - Options to be applied to rope geometry
   */
  constructor(options) {
    const { width, points, textureScale } = { ..._RopeGeometry2.defaultOptions, ...options };
    super({
      positions: new Float32Array(points.length * 4),
      uvs: new Float32Array(points.length * 4),
      indices: new Uint32Array((points.length - 1) * 6)
    });
    this.points = points;
    this._width = width;
    this.textureScale = textureScale;
    this._build();
  }
  /**
   * The width (i.e., thickness) of the rope.
   * @readonly
   */
  get width() {
    return this._width;
  }
  /** Refreshes Rope indices and uvs */
  _build() {
    const points = this.points;
    if (!points)
      return;
    const vertexBuffer = this.getBuffer("aPosition");
    const uvBuffer = this.getBuffer("aUV");
    const indexBuffer = this.getIndex();
    if (points.length < 1) {
      return;
    }
    if (vertexBuffer.data.length / 4 !== points.length) {
      vertexBuffer.data = new Float32Array(points.length * 4);
      uvBuffer.data = new Float32Array(points.length * 4);
      indexBuffer.data = new Uint16Array((points.length - 1) * 6);
    }
    const uvs = uvBuffer.data;
    const indices = indexBuffer.data;
    uvs[0] = 0;
    uvs[1] = 0;
    uvs[2] = 0;
    uvs[3] = 1;
    let amount = 0;
    let prev = points[0];
    const textureWidth = this._width * this.textureScale;
    const total = points.length;
    for (let i = 0; i < total; i++) {
      const index = i * 4;
      if (this.textureScale > 0) {
        const dx = prev.x - points[i].x;
        const dy = prev.y - points[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        prev = points[i];
        amount += distance / textureWidth;
      } else {
        amount = i / (total - 1);
      }
      uvs[index] = amount;
      uvs[index + 1] = 0;
      uvs[index + 2] = amount;
      uvs[index + 3] = 1;
    }
    let indexCount = 0;
    for (let i = 0; i < total - 1; i++) {
      const index = i * 2;
      indices[indexCount++] = index;
      indices[indexCount++] = index + 1;
      indices[indexCount++] = index + 2;
      indices[indexCount++] = index + 2;
      indices[indexCount++] = index + 1;
      indices[indexCount++] = index + 3;
    }
    uvBuffer.update();
    indexBuffer.update();
    this.updateVertices();
  }
  /** refreshes vertices of Rope mesh */
  updateVertices() {
    const points = this.points;
    if (points.length < 1) {
      return;
    }
    let lastPoint = points[0];
    let nextPoint;
    let perpX = 0;
    let perpY = 0;
    const vertices = this.buffers[0].data;
    const total = points.length;
    const halfWidth = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
    for (let i = 0; i < total; i++) {
      const point = points[i];
      const index = i * 4;
      if (i < points.length - 1) {
        nextPoint = points[i + 1];
      } else {
        nextPoint = point;
      }
      perpY = -(nextPoint.x - lastPoint.x);
      perpX = nextPoint.y - lastPoint.y;
      let ratio = (1 - i / (total - 1)) * 10;
      if (ratio > 1) {
        ratio = 1;
      }
      const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
      if (perpLength < 1e-6) {
        perpX = 0;
        perpY = 0;
      } else {
        perpX /= perpLength;
        perpY /= perpLength;
        perpX *= halfWidth;
        perpY *= halfWidth;
      }
      vertices[index] = point.x + perpX;
      vertices[index + 1] = point.y + perpY;
      vertices[index + 2] = point.x - perpX;
      vertices[index + 3] = point.y - perpY;
      lastPoint = point;
    }
    this.buffers[0].update();
  }
  /** Refreshes Rope indices and uvs */
  update() {
    if (this.textureScale > 0) {
      this._build();
    } else {
      this.updateVertices();
    }
  }
};
_RopeGeometry.defaultOptions = {
  /** The width (i.e., thickness) of the rope. */
  width: 200,
  /** An array of points that determine the rope. */
  points: [],
  /** Rope texture scale, if zero then the rope texture is stretched. */
  textureScale: 0
};
var RopeGeometry = _RopeGeometry;

// node_modules/pixi.js/lib/scene/mesh-simple/MeshRope.mjs
var _MeshRope = class _MeshRope2 extends Mesh {
  /**
   * Note: The wrap mode of the texture is set to REPEAT if `textureScale` is positive.
   * @param options
   * @param options.texture - The texture to use on the rope.
   * @param options.points - An array of {@link math.Point} objects to construct this rope.
   * @param {number} options.textureScale - Optional. Positive values scale rope texture
   * keeping its aspect ratio. You can reduce alpha channel artifacts by providing a larger texture
   * and downsampling here. If set to zero, texture will be stretched instead.
   */
  constructor(options) {
    const { texture, points, textureScale, ...rest } = { ..._MeshRope2.defaultOptions, ...options };
    const ropeGeometry = new RopeGeometry(definedProps({ width: texture.height, points, textureScale }));
    if (textureScale > 0) {
      texture.source.style.addressMode = "repeat";
    }
    super(definedProps({
      ...rest,
      texture,
      geometry: ropeGeometry
    }));
    this.autoUpdate = true;
    this.onRender = this._render;
  }
  _render() {
    const geometry = this.geometry;
    if (this.autoUpdate || geometry._width !== this.texture.height) {
      geometry._width = this.texture.height;
      geometry.update();
    }
  }
};
_MeshRope.defaultOptions = {
  textureScale: 0
};

// node_modules/pixi.js/lib/scene/particle-container/shared/Particle.mjs
var _Particle = class _Particle2 {
  constructor(options) {
    if (options instanceof Texture) {
      this.texture = options;
      assignWithIgnore(this, _Particle2.defaultOptions, {});
    } else {
      const combined = { ..._Particle2.defaultOptions, ...options };
      assignWithIgnore(this, combined, {});
    }
  }
  /** Gets or sets the alpha value of the particle. */
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    this._alpha = Math.min(Math.max(value, 0), 1);
    this._updateColor();
  }
  /** Gets or sets the tint color of the particle. */
  get tint() {
    return bgr2rgb(this._tint);
  }
  set tint(value) {
    if (typeof value === "number") {
      this._tint = value;
    } else {
      this._tint = Color.shared.setValue(value ?? 16777215).toBgrNumber();
    }
    this._updateColor();
  }
  _updateColor() {
    this.color = this._tint + ((this._alpha * 255 | 0) << 24);
  }
};
_Particle.defaultOptions = {
  anchorX: 0,
  anchorY: 0,
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  tint: 16777215,
  alpha: 1
};

// node_modules/pixi.js/lib/scene/particle-container/shared/particleData.mjs
var particleData = {
  vertex: {
    attributeName: "aVertex",
    format: "float32x2",
    code: `
            const texture = p.texture;
            const sx = p.scaleX;
            const sy = p.scaleY;
            const ax = p.anchorX;
            const ay = p.anchorY;
            const trim = texture.trim;
            const orig = texture.orig;

            if (trim)
            {
                w1 = trim.x - (ax * orig.width);
                w0 = w1 + trim.width;

                h1 = trim.y - (ay * orig.height);
                h0 = h1 + trim.height;
            }
            else
            {
                w1 = -ax * (orig.width);
                w0 = w1 + orig.width;

                h1 = -ay * (orig.height);
                h0 = h1 + orig.height;
            }

            f32v[offset] = w1 * sx;
            f32v[offset + 1] = h1 * sy;

            f32v[offset + stride] = w0 * sx;
            f32v[offset + stride + 1] = h1 * sy;

            f32v[offset + (stride * 2)] = w0 * sx;
            f32v[offset + (stride * 2) + 1] = h0 * sy;

            f32v[offset + (stride * 3)] = w1 * sx;
            f32v[offset + (stride * 3) + 1] = h0 * sy;
        `,
    dynamic: false
  },
  // positionData
  position: {
    attributeName: "aPosition",
    format: "float32x2",
    code: `
            var x = p.x;
            var y = p.y;

            f32v[offset] = x;
            f32v[offset + 1] = y;

            f32v[offset + stride] = x;
            f32v[offset + stride + 1] = y;

            f32v[offset + (stride * 2)] = x;
            f32v[offset + (stride * 2) + 1] = y;

            f32v[offset + (stride * 3)] = x;
            f32v[offset + (stride * 3) + 1] = y;
        `,
    dynamic: true
  },
  // rotationData
  rotation: {
    attributeName: "aRotation",
    format: "float32",
    code: `
            var rotation = p.rotation;

            f32v[offset] = rotation;
            f32v[offset + stride] = rotation;
            f32v[offset + (stride * 2)] = rotation;
            f32v[offset + (stride * 3)] = rotation;
        `,
    dynamic: false
  },
  // uvsData
  uvs: {
    attributeName: "aUV",
    format: "float32x2",
    code: `
            var uvs = p.texture.uvs;

            f32v[offset] = uvs.x0;
            f32v[offset + 1] = uvs.y0;

            f32v[offset + stride] = uvs.x1;
            f32v[offset + stride + 1] = uvs.y1;

            f32v[offset + (stride * 2)] = uvs.x2;
            f32v[offset + (stride * 2) + 1] = uvs.y2;

            f32v[offset + (stride * 3)] = uvs.x3;
            f32v[offset + (stride * 3) + 1] = uvs.y3;
        `,
    dynamic: false
  },
  // tintData
  color: {
    attributeName: "aColor",
    format: "unorm8x4",
    code: `
            const c = p.color;

            u32v[offset] = c;
            u32v[offset + stride] = c;
            u32v[offset + (stride * 2)] = c;
            u32v[offset + (stride * 3)] = c;
        `,
    dynamic: false
  }
};

// node_modules/pixi.js/lib/scene/particle-container/shared/ParticleContainer.mjs
var emptyBounds = new Bounds(0, 0, 0, 0);
var _ParticleContainer = class _ParticleContainer2 extends ViewContainer {
  /**
   * @param options - The options for creating the sprite.
   */
  constructor(options = {}) {
    options = {
      ..._ParticleContainer2.defaultOptions,
      ...options,
      dynamicProperties: {
        ..._ParticleContainer2.defaultOptions.dynamicProperties,
        ...options?.dynamicProperties
      }
    };
    const { dynamicProperties, shader, roundPixels, texture, particles, ...rest } = options;
    super({
      label: "ParticleContainer",
      ...rest
    });
    this.renderPipeId = "particle";
    this.batched = false;
    this._childrenDirty = false;
    this.texture = texture || null;
    this.shader = shader;
    this._properties = {};
    for (const key in particleData) {
      const property = particleData[key];
      const dynamic = dynamicProperties[key];
      this._properties[key] = {
        ...property,
        dynamic
      };
    }
    this.allowChildren = true;
    this.roundPixels = roundPixels ?? false;
    this.particleChildren = particles ?? [];
  }
  /**
   * Adds one or more particles to the container.
   *
   * Multiple items can be added like so: `myContainer.addParticle(thingOne, thingTwo, thingThree)`
   * @param {...IParticle} children - The Particle(s) to add to the container
   * @returns {IParticle} - The first child that was added.
   */
  addParticle(...children) {
    for (let i = 0; i < children.length; i++) {
      this.particleChildren.push(children[i]);
    }
    this.onViewUpdate();
    return children[0];
  }
  /**
   * Removes one or more particles from the container.
   * @param {...IParticle} children - The Particle(s) to remove
   * @returns {IParticle} The first child that was removed.
   */
  removeParticle(...children) {
    let didRemove = false;
    for (let i = 0; i < children.length; i++) {
      const index = this.particleChildren.indexOf(children[i]);
      if (index > -1) {
        this.particleChildren.splice(index, 1);
        didRemove = true;
      }
    }
    if (didRemove)
      this.onViewUpdate();
    return children[0];
  }
  /**
   * Updates the particle container.
   * Please call this when you modify the particleChildren array.
   * or any static properties of the particles.
   */
  update() {
    this._childrenDirty = true;
  }
  onViewUpdate() {
    this._childrenDirty = true;
    super.onViewUpdate();
  }
  /**
   * ParticleContainer does not calculated bounds as it would slow things down,
   * its up to you to set this via the boundsArea property
   */
  get bounds() {
    return emptyBounds;
  }
  /** @private */
  updateBounds() {
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options = false) {
    super.destroy(options);
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      const texture = this.texture ?? this.particleChildren[0]?.texture;
      if (texture) {
        texture.destroy(destroyTextureSource);
      }
    }
    this.texture = null;
    this.shader?.destroy();
  }
  /**
   * Removes all particles from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed particles
   */
  removeParticles(beginIndex, endIndex) {
    const children = this.particleChildren.splice(beginIndex, endIndex);
    this.onViewUpdate();
    return children;
  }
  /**
   * Removes a particle from the specified index position.
   * @param index - The index to get the particle from
   * @returns The particle that was removed.
   */
  removeParticleAt(index) {
    const child = this.particleChildren.splice(index, 1);
    this.onViewUpdate();
    return child[0];
  }
  /**
   * Adds a particle to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the particle is already in this container, it will be moved to the specified index.
   * @param {Container} child - The particle to add.
   * @param {number} index - The absolute index where the particle will be positioned at the end of the operation.
   * @returns {Container} The particle that was added.
   */
  addParticleAt(child, index) {
    this.particleChildren.splice(index, 0, child);
    this.onViewUpdate();
    return child;
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.addParticle()` instead.
   * @param {...any} _children
   * @throws {Error} Always throws an error as this method is not available.
   */
  addChild(..._children) {
    throw new Error(
      "ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   * Calling this method will throw an error. Please use `ParticleContainer.removeParticle()` instead.
   * @param {...any} _children
   * @throws {Error} Always throws an error as this method is not available.
   */
  removeChild(..._children) {
    throw new Error(
      "ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.removeParticles()` instead.
   * @param {number} [_beginIndex]
   * @param {number} [_endIndex]
   * @throws {Error} Always throws an error as this method is not available.
   */
  removeChildren(_beginIndex, _endIndex) {
    throw new Error(
      "ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.removeParticleAt()` instead.
   * @param {number} _index
   * @throws {Error} Always throws an error as this method is not available.
   */
  removeChildAt(_index) {
    throw new Error(
      "ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.getParticleAt()` instead.
   * @param {number} _index
   * @throws {Error} Always throws an error as this method is not available.
   */
  getChildAt(_index) {
    throw new Error(
      "ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.setParticleIndex()` instead.
   * @param {ContainerChild} _child
   * @param {number} _index
   * @throws {Error} Always throws an error as this method is not available.
   */
  setChildIndex(_child, _index) {
    throw new Error(
      "ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.getParticleIndex()` instead.
   * @param {ContainerChild} _child
   * @throws {Error} Always throws an error as this method is not available.
   */
  getChildIndex(_child) {
    throw new Error(
      "ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.addParticleAt()` instead.
   * @param {ContainerChild} _child
   * @param {number} _index
   * @throws {Error} Always throws an error as this method is not available.
   */
  addChildAt(_child, _index) {
    throw new Error(
      "ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error. Please use `ParticleContainer.swapParticles()` instead.
   * @param {ContainerChild} _child
   * @param {ContainerChild} _child2
   */
  swapChildren(_child, _child2) {
    throw new Error(
      "ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()"
    );
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error.
   * @param _child - The child to reparent
   * @throws {Error} Always throws an error as this method is not available.
   */
  reparentChild(..._child) {
    throw new Error("ParticleContainer.reparentChild() is not available with the particle container");
  }
  /**
   * This method is not available in ParticleContainer.
   *
   * Calling this method will throw an error.
   * @param _child - The child to reparent
   * @param _index - The index to reparent the child to
   * @throws {Error} Always throws an error as this method is not available.
   */
  reparentChildAt(_child, _index) {
    throw new Error("ParticleContainer.reparentChildAt() is not available with the particle container");
  }
};
_ParticleContainer.defaultOptions = {
  dynamicProperties: {
    vertex: false,
    // Indicates if vertex positions are dynamic.
    position: true,
    // Indicates if particle positions are dynamic.
    rotation: false,
    // Indicates if particle rotations are dynamic.
    uvs: false,
    // Indicates if UV coordinates are dynamic.
    color: false
    // Indicates if particle colors are dynamic.
  },
  roundPixels: false
  // Indicates if pixels should be rounded for rendering.
};
var ParticleContainer = _ParticleContainer;

// node_modules/pixi.js/lib/scene/sprite-nine-slice/NineSliceSprite.mjs
var _NineSliceSprite = class _NineSliceSprite2 extends ViewContainer {
  /**
   * @param {scene.NineSliceSpriteOptions|Texture} options - Options to use
   * @param options.texture - The texture to use on the NineSliceSprite.
   * @param options.leftWidth - Width of the left vertical bar (A)
   * @param options.topHeight - Height of the top horizontal bar (C)
   * @param options.rightWidth - Width of the right vertical bar (B)
   * @param options.bottomHeight - Height of the bottom horizontal bar (D)
   * @param options.width - Width of the NineSliceSprite,
   * setting this will actually modify the vertices and not the UV's of this plane.
   * @param options.height - Height of the NineSliceSprite,
   * setting this will actually modify the vertices and not UV's of this plane.
   */
  constructor(options) {
    if (options instanceof Texture) {
      options = { texture: options };
    }
    const {
      width,
      height,
      leftWidth,
      rightWidth,
      topHeight,
      bottomHeight,
      texture,
      roundPixels,
      ...rest
    } = options;
    super({
      label: "NineSliceSprite",
      ...rest
    });
    this.renderPipeId = "nineSliceSprite";
    this.batched = true;
    this._leftWidth = leftWidth ?? texture?.defaultBorders?.left ?? NineSliceGeometry.defaultOptions.leftWidth;
    this._topHeight = topHeight ?? texture?.defaultBorders?.top ?? NineSliceGeometry.defaultOptions.topHeight;
    this._rightWidth = rightWidth ?? texture?.defaultBorders?.right ?? NineSliceGeometry.defaultOptions.rightWidth;
    this._bottomHeight = bottomHeight ?? texture?.defaultBorders?.bottom ?? NineSliceGeometry.defaultOptions.bottomHeight;
    this.bounds.maxX = this._width = width ?? texture.width ?? NineSliceGeometry.defaultOptions.width;
    this.bounds.maxY = this._height = height ?? texture.height ?? NineSliceGeometry.defaultOptions.height;
    this.allowChildren = false;
    this.texture = texture ?? _NineSliceSprite2.defaultOptions.texture;
    this.roundPixels = roundPixels ?? false;
  }
  /** @private */
  updateBounds() {
  }
  /** The width of the NineSliceSprite, setting this will actually modify the vertices and UV's of this plane. */
  get width() {
    return this._width;
  }
  set width(value) {
    this.bounds.maxX = this._width = value;
    this.onViewUpdate();
  }
  /** The height of the NineSliceSprite, setting this will actually modify the vertices and UV's of this plane. */
  get height() {
    return this._height;
  }
  set height(value) {
    this.bounds.maxY = this._height = value;
    this.onViewUpdate();
  }
  /**
   * Sets the size of the NiceSliceSprite to the specified width and height.
   * setting this will actually modify the vertices and UV's of this plane
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(value, height) {
    if (typeof value === "object") {
      height = value.height ?? value.width;
      value = value.width;
    }
    this.bounds.maxX = this._width = value;
    this.bounds.maxY = this._height = height ?? value;
    this.onViewUpdate();
  }
  /**
   * Retrieves the size of the NineSliceSprite as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the NineSliceSprite.
   */
  getSize(out) {
    out || (out = {});
    out.width = this._width;
    out.height = this._height;
    return out;
  }
  /** The width of the left column (a) of the NineSliceSprite. */
  get leftWidth() {
    return this._leftWidth;
  }
  set leftWidth(value) {
    this._leftWidth = value;
    this.onViewUpdate();
  }
  /** The width of the right column (b) of the NineSliceSprite. */
  get topHeight() {
    return this._topHeight;
  }
  set topHeight(value) {
    this._topHeight = value;
    this.onViewUpdate();
  }
  /** The width of the right column (b) of the NineSliceSprite. */
  get rightWidth() {
    return this._rightWidth;
  }
  set rightWidth(value) {
    this._rightWidth = value;
    this.onViewUpdate();
  }
  /** The width of the right column (b) of the NineSliceSprite. */
  get bottomHeight() {
    return this._bottomHeight;
  }
  set bottomHeight(value) {
    this._bottomHeight = value;
    this.onViewUpdate();
  }
  /** The texture that the NineSliceSprite is using. */
  get texture() {
    return this._texture;
  }
  set texture(value) {
    value || (value = Texture.EMPTY);
    const currentTexture = this._texture;
    if (currentTexture === value)
      return;
    if (currentTexture && currentTexture.dynamic)
      currentTexture.off("update", this.onViewUpdate, this);
    if (value.dynamic)
      value.on("update", this.onViewUpdate, this);
    this._texture = value;
    this.onViewUpdate();
  }
  /** The original width of the texture */
  get originalWidth() {
    return this._texture.width;
  }
  /** The original height of the texture */
  get originalHeight() {
    return this._texture.height;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(options) {
    super.destroy(options);
    const destroyTexture = typeof options === "boolean" ? options : options?.texture;
    if (destroyTexture) {
      const destroyTextureSource = typeof options === "boolean" ? options : options?.textureSource;
      this._texture.destroy(destroyTextureSource);
    }
    this._texture = null;
  }
};
_NineSliceSprite.defaultOptions = {
  /** @default Texture.EMPTY */
  texture: Texture.EMPTY
};

// node_modules/pixi.js/lib/index.mjs
var import_earcut = __toESM(require_earcut(), 1);
extensions.add(browserExt, webworkerExt);

// node_modules/gsap/gsap-core.js
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
};
var _defaults = {
  duration: 0.5,
  overwrite: false,
  delay: 0
};
var _suppressOverwrites;
var _reverting;
var _context;
var _bigNum = 1e8;
var _tinyNum = 1 / _bigNum;
var _2PI = Math.PI * 2;
var _HALF_PI = _2PI / 4;
var _gsID = 0;
var _sqrt = Math.sqrt;
var _cos = Math.cos;
var _sin = Math.sin;
var _isString = function _isString2(value) {
  return typeof value === "string";
};
var _isFunction = function _isFunction2(value) {
  return typeof value === "function";
};
var _isNumber = function _isNumber2(value) {
  return typeof value === "number";
};
var _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
};
var _isObject = function _isObject2(value) {
  return typeof value === "object";
};
var _isNotFalse = function _isNotFalse2(value) {
  return value !== false;
};
var _windowExists = function _windowExists2() {
  return typeof window !== "undefined";
};
var _isFuncOrString = function _isFuncOrString2(value) {
  return _isFunction(value) || _isString(value);
};
var _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
};
var _isArray = Array.isArray;
var _strictNumExp = /(?:-?\.?\d|\.)+/gi;
var _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g;
var _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g;
var _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi;
var _relExp = /[+-]=-?[.\d]+/;
var _delimitedValueExp = /[^,'"\[\]\s]+/gi;
var _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i;
var _globalTimeline;
var _win;
var _coreInitted;
var _doc;
var _globals = {};
var _installScope = {};
var _coreReady;
var _install = function _install2(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
};
var _missingPlugin = function _missingPlugin2(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
};
var _warn = function _warn2(message, suppress) {
  return !suppress && console.warn(message);
};
var _addGlobal = function _addGlobal2(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
};
var _emptyFunc = function _emptyFunc2() {
  return 0;
};
var _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
};
var _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
};
var _revertConfig = {
  suppressEvents: true
};
var _reservedProps = {};
var _lazyTweens = [];
var _lazyLookup = {};
var _lastRenderedFrame;
var _plugins = {};
var _effects = {};
var _nextGCFrame = 30;
var _harnessPlugins = [];
var _callbackNames = "";
var _harness = function _harness2(targets) {
  var target = targets[0], harnessPlugin, i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);
  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;
    while (i-- && !_harnessPlugins[i].targetTest(target)) {
    }
    harnessPlugin = _harnessPlugins[i];
  }
  i = targets.length;
  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }
  return targets;
};
var _getCache = function _getCache2(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
};
var _getProperty = function _getProperty2(target, property, v2) {
  return (v2 = target[property]) && _isFunction(v2) ? target[property]() : _isUndefined(v2) && target.getAttribute && target.getAttribute(property) || v2;
};
var _forEachName = function _forEachName2(names, func) {
  return (names = names.split(",")).forEach(func) || names;
};
var _round = function _round2(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
};
var _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e7) / 1e7 || 0;
};
var _parseRelative = function _parseRelative2(start, value) {
  var operator = value.charAt(0), end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
};
var _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
  var l = toFind.length, i = 0;
  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
  }
  return i < l;
};
var _lazyRender = function _lazyRender2() {
  var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
  _lazyLookup = {};
  _lazyTweens.length = 0;
  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
};
var _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting && _lazyRender();
  animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
  _lazyTweens.length && !_reverting && _lazyRender();
};
var _numericIfPossible = function _numericIfPossible2(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
};
var _passThrough = function _passThrough2(p) {
  return p;
};
var _setDefaults = function _setDefaults2(obj, defaults2) {
  for (var p in defaults2) {
    p in obj || (obj[p] = defaults2[p]);
  }
  return obj;
};
var _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
  return function(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
    }
  };
};
var _merge = function _merge2(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }
  return base;
};
var _mergeDeep = function _mergeDeep2(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }
  return base;
};
var _copyExcluding = function _copyExcluding2(obj, excluding) {
  var copy = {}, p;
  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }
  return copy;
};
var _inheritDefaults = function _inheritDefaults2(vars) {
  var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }
  return vars;
};
var _arraysMatch = function _arraysMatch2(a1, a2) {
  var i = a1.length, match = i === a2.length;
  while (match && i-- && a1[i] === a2[i]) {
  }
  return i < 0;
};
var _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = parent[lastProp], t;
  if (sortBy) {
    t = child[sortBy];
    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }
  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }
  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }
  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
};
var _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = child._prev, next = child._next;
  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }
  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }
  child._next = child._prev = child.parent = null;
};
var _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
  child._act = 0;
};
var _uncache = function _uncache2(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    var a = animation;
    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }
  return animation;
};
var _recacheAncestors = function _recacheAncestors2(animation) {
  var parent = animation.parent;
  while (parent && parent.parent) {
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }
  return animation;
};
var _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
};
var _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
};
var _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
};
var _animationCycle = function _animationCycle2(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
};
var _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
};
var _setEnd = function _setEnd2(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
};
var _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
  var parent = animation._dp;
  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
    _setEnd(animation);
    parent._dirty || _uncache(parent, animation);
  }
  return animation;
};
var _postAddChecks = function _postAddChecks2(timeline2, child) {
  var t;
  if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
    t = _parentToChildTotalTime(timeline2.rawTime(), child);
    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  }
  if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
    if (timeline2._dur < timeline2.duration()) {
      t = timeline2;
      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime);
        t = t._dp;
      }
    }
    timeline2._zTime = -_tinyNum;
  }
};
var _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition(timeline2, position, child) : timeline2._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
  _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
  _isFromOrFromStart(child) || (timeline2._recent = child);
  skipChecks || _postAddChecks(timeline2, child);
  timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
  return timeline2;
};
var _scrollTrigger = function _scrollTrigger2(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
};
var _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);
  if (!tween._initted) {
    return 1;
  }
  if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);
    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
};
var _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
};
var _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
};
var _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt2, iteration, prevIteration;
  if (repeatDelay && tween._repeat) {
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }
  if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      return;
    }
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
    suppressEvents || (suppressEvents = totalTime && !prevIteration);
    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt2 = tween._pt;
    while (pt2) {
      pt2.r(ratio, pt2.d);
      pt2 = pt2._next;
    }
    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);
      if (!suppressEvents && !_reverting) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
};
var _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
  var child;
  if (time > prevTime) {
    child = animation._first;
    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }
      child = child._next;
    }
  } else {
    child = animation._last;
    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }
      child = child._prev;
    }
  }
};
var _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
};
var _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
};
var _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
};
var _parsePosition = function _parsePosition2(animation, position, percentAnimation) {
  var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur, i, offset, isPercent;
  if (_isString(position) && (isNaN(position) || position in labels)) {
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");
    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }
    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }
    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }
    return i > 1 ? _parsePosition2(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }
  return position == null ? clippedDuration : +position;
};
var _createTweenType = function _createTweenType2(type, params, timeline2) {
  var isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline2;
  if (type) {
    irVars = vars;
    parent = timeline2;
    while (parent && !("immediateRender" in irVars)) {
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }
    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
  }
  return new Tween(params[0], vars, params[varsIndex + 1]);
};
var _conditionalReturn = function _conditionalReturn2(value, func) {
  return value || value === 0 ? func(value) : func;
};
var _clamp = function _clamp2(min, max, value) {
  return value < min ? min : value > max ? max : value;
};
var getUnit = function getUnit2(value, v2) {
  return !_isString(value) || !(v2 = _unitExp.exec(value)) ? "" : v2[1];
};
var clamp = function clamp2(min, max, value) {
  return _conditionalReturn(value, function(v2) {
    return _clamp(min, max, v2);
  });
};
var _slice = [].slice;
var _isArrayLike = function _isArrayLike2(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
};
var _flatten = function _flatten2(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }
  return ar.forEach(function(value) {
    var _accumulator;
    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
};
var toArray = function toArray2(value, scope, leaveStrings) {
  return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
};
var selector = function selector2(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function(v2) {
    var el = value.current || value.nativeElement || value;
    return toArray(v2, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
};
var shuffle = function shuffle2(a) {
  return a.sort(function() {
    return 0.5 - Math.random();
  });
};
var distribute = function distribute2(v2) {
  if (_isFunction(v2)) {
    return v2;
  }
  var vars = _isObject(v2) ? v2 : {
    each: v2
  }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
  if (_isString(from)) {
    ratioX = ratioY = {
      center: 0.5,
      edges: 0.5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }
  return function(i, target, a) {
    var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
      if (!wrapAt) {
        max = -_bigNum;
        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
        }
        wrapAt < l && wrapAt--;
      }
      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;
      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }
      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0;
      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }
    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
  };
};
var _roundModifier = function _roundModifier2(v2) {
  var p = Math.pow(10, ((v2 + "").split(".")[1] || "").length);
  return function(raw) {
    var n = _roundPrecise(Math.round(parseFloat(raw) / v2) * v2 * p);
    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
  };
};
var snap = function snap2(snapTo, value) {
  var isArray = _isArray(snapTo), radius, is2D;
  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;
    if (snapTo.values) {
      snapTo = toArray(snapTo.values);
      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius;
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }
  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function(raw) {
    var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length, dx, dy;
    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }
      if (dx < min) {
        min = dx;
        closest = i;
      }
    }
    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
};
var random = function random2(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
};
var pipe = function pipe2() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }
  return function(value) {
    return functions.reduce(function(v2, f) {
      return f(v2);
    }, value);
  };
};
var unitize = function unitize2(func, unit) {
  return function(value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
};
var normalize = function normalize2(min, max, value) {
  return mapRange(min, max, 0, 1, value);
};
var _wrapArray = function _wrapArray2(a, wrapper, value) {
  return _conditionalReturn(value, function(index) {
    return a[~~wrapper(index)];
  });
};
var wrap = function wrap2(min, max, value) {
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
    return (range + (value2 - min) % range) % range + min;
  });
};
var wrapYoyo = function wrapYoyo2(min, max, value) {
  var range = max - min, total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
    value2 = (total + (value2 - min) % total) % total || 0;
    return min + (value2 > range ? total - value2 : value2);
  });
};
var _replaceRandom = function _replaceRandom2(value) {
  var prev = 0, s = "", i, nums, end, isArray;
  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }
  return s + value.substr(prev, value.length - prev);
};
var mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin, outRange = outMax - outMin;
  return _conditionalReturn(value, function(value2) {
    return outMin + ((value2 - inMin) / inRange * outRange || 0);
  });
};
var interpolate = function interpolate2(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function(p2) {
    return (1 - p2) * start + p2 * end;
  };
  if (!func) {
    var isString = _isString(start), master = {}, p, i, interpolators, l, il;
    progress === true && (mutate = 1) && (progress = null);
    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;
      for (i = 1; i < l; i++) {
        interpolators.push(interpolate2(start[i - 1], start[i]));
      }
      l--;
      func = function func2(p2) {
        p2 *= l;
        var i2 = Math.min(il, ~~p2);
        return interpolators[i2](p2 - i2);
      };
      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }
    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }
      func = function func2(p2) {
        return _renderPropTweens(p2, master) || (isString ? start.p : start);
      };
    }
  }
  return _conditionalReturn(progress, func);
};
var _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
  var labels = timeline2.labels, min = _bigNum, p, distance, label;
  for (p in labels) {
    distance = labels[p] - fromTime;
    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }
  return label;
};
var _callback = function _callback2(animation, type, executeLazyFirst) {
  var v2 = animation.vars, callback = v2[type], prevContext = _context, context3 = animation._ctx, params, scope, result;
  if (!callback) {
    return;
  }
  params = v2[type + "Params"];
  scope = v2.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender();
  context3 && (_context = context3);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context = prevContext;
  return result;
};
var _interrupt = function _interrupt2(animation) {
  _removeFromParent(animation);
  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
};
var _quickTween;
var _registerPluginQueue = [];
var _createPlugin = function _createPlugin2(config3) {
  if (!config3) return;
  config3 = !config3.name && config3["default"] || config3;
  if (_windowExists() || config3.headless) {
    var name = config3.name, isFunc = _isFunction(config3), Plugin = name && !isFunc && config3.init ? function() {
      this._props = [];
    } : config3, instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    }, statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };
    _wake();
    if (config3 !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults(Plugin, _setDefaults(_copyExcluding(config3, instanceDefaults), statics));
      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
      _plugins[Plugin.prop = name] = Plugin;
      if (config3.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }
    _addGlobal(name, Plugin);
    config3.register && config3.register(gsap, Plugin, PropTween);
  } else {
    _registerPluginQueue.push(config3);
  }
};
var _255 = 255;
var _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
};
var _hue = function _hue2(h, m1, m22) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m22 - m1) * h * 6 : h < 0.5 ? m22 : h * 3 < 2 ? m1 + (m22 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
};
var splitColor = function splitColor2(v2, toHSL, forceAlpha) {
  var a = !v2 ? _colorLookup.black : _isNumber(v2) ? [v2 >> 16, v2 >> 8 & _255, v2 & _255] : 0, r, g, b3, h, s, l, max, min, d, wasHSL;
  if (!a) {
    if (v2.substr(-1) === ",") {
      v2 = v2.substr(0, v2.length - 1);
    }
    if (_colorLookup[v2]) {
      a = _colorLookup[v2];
    } else if (v2.charAt(0) === "#") {
      if (v2.length < 6) {
        r = v2.charAt(1);
        g = v2.charAt(2);
        b3 = v2.charAt(3);
        v2 = "#" + r + r + g + g + b3 + b3 + (v2.length === 5 ? v2.charAt(4) + v2.charAt(4) : "");
      }
      if (v2.length === 9) {
        a = parseInt(v2.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v2.substr(7), 16) / 255];
      }
      v2 = parseInt(v2.substr(1), 16);
      a = [v2 >> 16, v2 >> 8 & _255, v2 & _255];
    } else if (v2.substr(0, 3) === "hsl") {
      a = wasHSL = v2.match(_strictNumExp);
      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1);
        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v2.indexOf("=")) {
        a = v2.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v2.match(_strictNumExp) || _colorLookup.transparent;
    }
    a = a.map(Number);
  }
  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b3 = a[2] / _255;
    max = Math.max(r, g, b3);
    min = Math.min(r, g, b3);
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b3) / d + (g < b3 ? 6 : 0) : max === g ? (b3 - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    a[0] = ~~(h + 0.5);
    a[1] = ~~(s * 100 + 0.5);
    a[2] = ~~(l * 100 + 0.5);
  }
  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
};
var _colorOrderData = function _colorOrderData2(v2) {
  var values = [], c = [], i = -1;
  v2.split(_colorExp).forEach(function(v3) {
    var a = v3.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
};
var _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
  var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
  if (!colors) {
    return s;
  }
  colors = colors.map(function(color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });
  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;
    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }
  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;
    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }
  return result + shell[l];
};
var _colorExp = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }
  return new RegExp(s + ")", "gi");
}();
var _hslExp = /hsl[a]?\(/;
var _colorStringFilter = function _colorStringFilter2(a) {
  var combined = a.join(" "), toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
    return true;
  }
};
var _tickerActive;
var _ticker = function() {
  var _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v2) {
    var elapsed = _getTime() - _lastUpdate, manual = v2 === true, overlap, dispatch, time, frame;
    (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;
    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1e3;
      _self.time = time = time / 1e3;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }
    manual || (_id = _req(_tick2));
    if (dispatch) {
      for (_i2 = 0; _i2 < _listeners2.length; _i2++) {
        _listeners2[_i2](time, _delta, frame, v2);
      }
    }
  };
  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1e3 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
          _registerPluginQueue.forEach(_createPlugin);
        }
        _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
        _id && _self.sleep();
        _req = _raf || function(f) {
          return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
        };
        _tickerActive = 1;
        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity;
      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1e3 / (_fps || 240);
      _nextTime = _self.time * 1e3 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function(t, d, f, v2) {
        callback(t, d, f, v2);
        _self.remove(func);
      } : callback;
      _self.remove(callback);
      _listeners2[prioritize ? "unshift" : "push"](func);
      _wake();
      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners2.indexOf(callback)) && _listeners2.splice(i, 1) && _i2 >= i && _i2--;
    },
    _listeners: _listeners2
  };
  return _self;
}();
var _wake = function _wake2() {
  return !_tickerActive && _ticker.wake();
};
var _easeMap = {};
var _customEaseExp = /^[\d.\-M][\d.\-,\s]/;
var _quotesExp = /["']/g;
var _parseObjectInString = function _parseObjectInString2(value) {
  var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }
  return obj;
};
var _valueInParentheses = function _valueInParentheses2(value) {
  var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
};
var _configEaseFromString = function _configEaseFromString2(name) {
  var split = (name + "").split("("), ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
};
var _invertEase = function _invertEase2(ease) {
  return function(p) {
    return 1 - ease(1 - p);
  };
};
var _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
  var child = timeline2._first, ease;
  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase2(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase2(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }
    child = child._next;
  }
};
var _parseEase = function _parseEase2(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
};
var _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut2(p) {
      return 1 - easeIn(1 - p);
    };
  }
  if (easeInOut === void 0) {
    easeInOut = function easeInOut2(p) {
      return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }
  var ease = {
    easeIn,
    easeOut,
    easeInOut
  }, lowercaseName;
  _forEachName(names, function(name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });
  return ease;
};
var _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
  return function(p) {
    return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
  };
};
var _configElastic = function _configElastic2(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);
  p2 = _2PI / p2;
  ease.config = function(amplitude2, period2) {
    return _configElastic2(type, amplitude2, period2);
  };
  return ease;
};
var _configBack = function _configBack2(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }
  var easeOut = function easeOut2(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);
  ease.config = function(overshoot2) {
    return _configBack2(type, overshoot2);
  };
  return ease;
};
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
  var power = i < 5 ? i + 1 : i;
  _insertEase(name + ",Power" + (power - 1), i ? function(p) {
    return Math.pow(p, power);
  } : function(p) {
    return p;
  }, function(p) {
    return 1 - Math.pow(1 - p, power);
  }, function(p) {
    return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function(n, c) {
  var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
  };
  _insertEase("Bounce", function(p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function(p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});
_insertEase("Circ", function(p) {
  return -(_sqrt(1 - p * p) - 1);
});
_insertEase("Sine", function(p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
    return function(p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
  return _callbackNames += name + "," + name + "Params,";
});
var GSCache = function GSCache2(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
var Animation = function() {
  function Animation2(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context) {
      this._ctx = _context;
      _context.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation2.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this);
      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      this._ts || (this._pTime = _totalTime);
      _lazySafeRender(this, _totalTime, suppressEvents);
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  };
  _proto.timeScale = function timeScale(value, suppressEvents) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts;
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
    this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
    _setEnd(this);
    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
        this._ts = this._act = 0;
      } else {
        _wake();
        this._ts = this._rts;
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp;
    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config3) {
    if (config3 === void 0) {
      config3 = _revertConfig;
    }
    var prevIsReverting = _reverting;
    _reverting = config3;
    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config3);
      this.totalTime(-0.01, config3.suppressEvents);
    }
    this.data !== "nested" && config3.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this, time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (Math.abs(animation._ts) || 1);
      animation = animation._dp;
    }
    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp, start = this._start, rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self2 = this;
    return new Promise(function(resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve2() {
        var _then = self2.then;
        self2.then = null;
        _isFunction(f) && (f = f(self2)) && (f.then || f === self2) && (self2.then = _then);
        resolve(f);
        self2.then = _then;
      };
      if (self2._initted && self2.totalProgress() === 1 && self2._ts >= 0 || !self2._tTime && self2._ts < 0) {
        _resolve();
      } else {
        self2._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation2;
}();
_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
var Timeline = function(_Animation) {
  _inheritsLoose(Timeline2, _Animation);
  function Timeline2(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline2.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  };
  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime);
        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime;
          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            return this;
          }
          dur = this._dur;
          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -1e-4;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          }
          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale;
      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0;
      }
      if (!prevTime && time && !suppressEvents && !iteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum);
              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time;
        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          this._start = prevStart;
          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
        if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
          if (!this._lock) {
            (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
            if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
              _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
              this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
            }
          }
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber(position) || (position = _parsePosition(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function(obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this;
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }
    var a = [], child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a;
  };
  _proto2.getById = function getById2(id) {
    var animations = this.getChildren(1, 1, 1), i = animations.length;
    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }
    _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
    var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive), children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }
      child = child._next;
    }
    return a;
  };
  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }
        _onStart && _onStart.apply(tween, onStartParams || []);
      }
    }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first, labels = this.labels, p;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first, next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0, self2 = this, child = self2._last, prevStart = _bigNum, prev, start, parent;
    if (arguments.length) {
      return self2.timeScale((self2._repeat < 0 ? self2.duration() : self2.totalDuration()) / (self2.reversed() ? -value : value));
    }
    if (self2._dirty) {
      parent = self2.parent;
      while (child) {
        prev = child._prev;
        child._dirty && child.totalDuration();
        start = child._start;
        if (start > prevStart && self2._sort && child._ts && !self2._lock) {
          self2._lock = 1;
          _addToTimeline(self2, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          max -= start;
          if (!parent && !self2._dp || parent && parent.smoothChildTiming) {
            self2._start += start / self2._ts;
            self2._time -= start;
            self2._tTime -= start;
          }
          self2.shiftChildren(-start, false, -Infinity);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self2, self2 === _globalTimeline && self2._time > max ? self2._time : max, 1, 1);
      self2._dirty = 0;
    }
    return self2._tDur;
  };
  Timeline2.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) {
        if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    }
  };
  return Timeline2;
}(Animation);
_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
  var pt2 = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
  pt2.b = start;
  pt2.e = end;
  start += "";
  end += "";
  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }
  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop);
    start = a[0];
    end = a[1];
  }
  startNums = start.match(_complexStringNumExp) || [];
  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);
    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }
    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0;
      pt2._pt = {
        _next: pt2._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }
  pt2.c = index < end.length ? end.substring(index, end.length) : "";
  pt2.fp = funcParam;
  if (_relExp.test(end) || hasRandom) {
    pt2.e = 0;
  }
  this._pt = pt2;
  return pt2;
};
var _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt2;
  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (end.charAt(1) === "=") {
      pt2 = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
      if (pt2 || pt2 === 0) {
        end = pt2;
      }
    }
  }
  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      pt2 = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt2.fp = funcParam);
      modifier && pt2.modifier(modifier, this, target);
      return this._pt = pt2;
    }
    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
};
var _processVars = function _processVars2(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }
  var copy = {}, p;
  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }
  return copy;
};
var _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
  var plugin, pt2, ptLookup, i;
  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt2 = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
      i = plugin._props.length;
      while (i--) {
        ptLookup[plugin._props[i]] = pt2;
      }
    }
  }
  return plugin;
};
var _overwritingTween;
var _forceAllPropTweens;
var _initTween = function _initTween2(tween, time, tTime) {
  var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline, cleanVars, i, p, pt2, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
  if (yoyoEase && tween._yoyo && !tween._repeat) {
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }
  tween._from = !tl && !!vars.runBackwards;
  if (!tl || keyframes && !vars.stagger) {
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop];
    cleanVars = _copyExcluding(vars, _reservedProps);
    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1);
      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
      prevStartAt._lazy = 0;
    }
    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate && function() {
          return _callback(tween, "onUpdate");
        },
        stagger: 0
      }, startAt)));
      tween._startAt._dp = 0;
      tween._startAt._sat = tween;
      time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          time && (tween._zTime = time);
          return;
        }
      }
    } else if (runBackwards && dur) {
      if (!prevStartAt) {
        time && (immediateRender = false);
        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent
          //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars);
        _removeFromParent(tween._startAt = Tween.set(targets, p));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;
        if (!immediateRender) {
          _initTween2(tween._startAt, _tinyNum, _tinyNum);
        } else if (!time) {
          return;
        }
      }
    }
    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;
    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
      index = fullTargets === targets ? i : fullTargets.indexOf(target);
      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt2 = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
        plugin._props.forEach(function(name) {
          ptLookup[name] = pt2;
        });
        plugin.priority && (hasPriority = 1);
      }
      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt2 = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }
      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;
        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
        overwritten = !tween.parent;
        _overwritingTween = 0;
      }
      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }
    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween);
  }
  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten;
  keyframes && time <= 0 && tl.render(_bigNum, true, true);
};
var _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt2, rootPT, lookup, i;
  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;
    while (i--) {
      pt2 = lookup[i][property];
      if (pt2 && pt2.d && pt2.d._pt) {
        pt2 = pt2.d._pt;
        while (pt2 && pt2.p !== property && pt2.fp !== property) {
          pt2 = pt2._next;
        }
      }
      if (!pt2) {
        _forceAllPropTweens = 1;
        tween.vars[property] = "+=0";
        _initTween(tween, time);
        _forceAllPropTweens = 0;
        return skipRecursion ? _warn(property + " not eligible for reset") : 1;
      }
      ptCache.push(pt2);
    }
  }
  i = ptCache.length;
  while (i--) {
    rootPT = ptCache[i];
    pt2 = rootPT._pt || rootPT;
    pt2.s = (start || start === 0) && !startIsRelative ? start : pt2.s + (start || 0) + ratio * pt2.c;
    pt2.c = value - pt2.s;
    rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
    rootPT.b && (rootPT.b = pt2.s + getUnit(rootPT.b));
  }
};
var _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
  if (!propertyAliases) {
    return vars;
  }
  copy = _merge({}, vars);
  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;
      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }
  return copy;
};
var _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut", p, a;
  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []);
    obj.forEach(function(value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
};
var _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
};
var _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert";
var _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
  return _staggerPropsToSkip[name] = 1;
});
var Tween = function(_Animation2) {
  _inheritsLoose(Tween2, _Animation2);
  function Tween2(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = [];
    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults2 || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject(stagger)) {
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }
        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i];
          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l === 1 && copy.delay) {
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0, a, kf, v2;
        if (_isArray(keyframes)) {
          keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration();
        } else {
          copy = {};
          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }
          for (p in copy) {
            a = copy[p].sort(function(a2, b3) {
              return a2.t - b3.t;
            });
            time = 0;
            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v2 = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v2[p] = kf.v;
              tl.to(parsedTargets, v2, time);
              time += v2.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          });
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0;
    }
    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum;
      _this3.render(Math.max(0, -delay) || 0);
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween2.prototype;
  _proto3.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt2, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      time = tTime;
      timeline2 = this.timeline;
      if (this._repeat) {
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);
          if (iteration && iteration === _roundPrecise(tTime / cycleDuration)) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
          if (this.vars.repeatRefresh && !isYoyo && !this._lock && this._time !== cycleDuration && this._initted) {
            this._lock = force = 1;
            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0;
          return this;
        }
        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
          return this;
        }
        if (dur !== this._dur) {
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1;
        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (time && !prevTime && !suppressEvents && !iteration) {
        _callback(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      pt2 = this._pt;
      while (pt2) {
        pt2.r(ratio, pt2.d);
        pt2 = pt2._next;
      }
      timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
        _callback(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur);
    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
      return this.resetTo(property, value, start, startIsRelative, 1);
    }
    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
      return this;
    }
    var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt2, i;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      if (_isString(vars)) {
        p = {};
        _forEachName(vars, function(name) {
          return p[name] = 1;
        });
        vars = p;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i = parsedTargets.length;
    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];
        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }
        for (p in props) {
          pt2 = curLookup && curLookup[p];
          if (pt2) {
            if (!("kill" in pt2.d) || pt2.d.kill(p) === true) {
              _removeLinkedListItem(this, pt2, "_pt");
            }
            delete curLookup[p];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this);
    return this;
  };
  Tween2.to = function to(targets, vars) {
    return new Tween2(targets, vars, arguments[2]);
  };
  Tween2.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween2(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };
  Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween2.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween2(targets, vars);
  };
  Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween2;
}(Animation);
_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
  Tween[name] = function() {
    var tl = new Timeline(), params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
var _setterPlain = function _setterPlain2(target, property, value) {
  return target[property] = value;
};
var _setterFunc = function _setterFunc2(target, property, value) {
  return target[property](value);
};
var _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
  return target[property](data.fp, value);
};
var _setterAttribute = function _setterAttribute2(target, property, value) {
  return target.setAttribute(property, value);
};
var _getSetter = function _getSetter2(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
};
var _renderPlain = function _renderPlain2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
};
var _renderBoolean = function _renderBoolean2(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
};
var _renderComplexString = function _renderComplexString2(ratio, data) {
  var pt2 = data._pt, s = "";
  if (!ratio && data.b) {
    s = data.b;
  } else if (ratio === 1 && data.e) {
    s = data.e;
  } else {
    while (pt2) {
      s = pt2.p + (pt2.m ? pt2.m(pt2.s + pt2.c * ratio) : Math.round((pt2.s + pt2.c * ratio) * 1e4) / 1e4) + s;
      pt2 = pt2._next;
    }
    s += data.c;
  }
  data.set(data.t, data.p, s, data);
};
var _renderPropTweens = function _renderPropTweens2(ratio, data) {
  var pt2 = data._pt;
  while (pt2) {
    pt2.r(ratio, pt2.d);
    pt2 = pt2._next;
  }
};
var _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
  var pt2 = this._pt, next;
  while (pt2) {
    next = pt2._next;
    pt2.p === property && pt2.modifier(modifier, tween, target);
    pt2 = next;
  }
};
var _killPropTweensOf = function _killPropTweensOf2(property) {
  var pt2 = this._pt, hasNonDependentRemaining, next;
  while (pt2) {
    next = pt2._next;
    if (pt2.p === property && !pt2.op || pt2.op === property) {
      _removeLinkedListItem(this, pt2, "_pt");
    } else if (!pt2.dep) {
      hasNonDependentRemaining = 1;
    }
    pt2 = next;
  }
  return !hasNonDependentRemaining;
};
var _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
};
var _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
  var pt2 = parent._pt, next, pt22, first, last;
  while (pt2) {
    next = pt2._next;
    pt22 = first;
    while (pt22 && pt22.pr > pt2.pr) {
      pt22 = pt22._next;
    }
    if (pt2._prev = pt22 ? pt22._prev : last) {
      pt2._prev._next = pt2;
    } else {
      first = pt2;
    }
    if (pt2._next = pt22) {
      pt22._prev = pt2;
    } else {
      last = pt2;
    }
    pt2 = next;
  }
  parent._pt = first;
};
var PropTween = function() {
  function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween2.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set;
    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target;
    this.tween = tween;
  };
  return PropTween2;
}();
_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [];
var _listeners = {};
var _emptyArray = [];
var _lastMediaTime = 0;
var _contextID = 0;
var _dispatch = function _dispatch2(type) {
  return (_listeners[type] || _emptyArray).map(function(f) {
    return f();
  });
};
var _onMediaChange = function _onMediaChange2() {
  var time = Date.now(), matches = [];
  if (time - _lastMediaTime > 2) {
    _dispatch("matchMediaInit");
    _media.forEach(function(c) {
      var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
      for (p in queries) {
        match = _win.matchMedia(queries[p]).matches;
        match && (anyMatch = 1);
        if (match !== conditions[p]) {
          conditions[p] = match;
          toggled = 1;
        }
      }
      if (toggled) {
        c.revert();
        anyMatch && matches.push(c);
      }
    });
    _dispatch("matchMediaRevert");
    matches.forEach(function(c) {
      return c.onMatch(c, function(func) {
        return c.add(null, func);
      });
    });
    _lastMediaTime = time;
    _dispatch("matchMedia");
  }
};
var Context = function() {
  function Context2(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = [];
    this.isReverted = false;
    this.id = _contextID++;
    func && this.add(func);
  }
  var _proto5 = Context2.prototype;
  _proto5.add = function add(name, func, scope) {
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }
    var self2 = this, f = function f2() {
      var prev = _context, prevSelector = self2.selector, result;
      prev && prev !== self2 && prev.data.push(self2);
      scope && (self2.selector = selector(scope));
      _context = self2;
      result = func.apply(self2, arguments);
      _isFunction(result) && self2._r.push(result);
      _context = prev;
      self2.selector = prevSelector;
      self2.isReverted = false;
      return result;
    };
    self2.last = f;
    return name === _isFunction ? f(self2, function(func2) {
      return self2.add(null, func2);
    }) : name ? self2[name] = f : f;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function(e) {
      return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia2) {
    var _this4 = this;
    if (revert) {
      (function() {
        var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
        while (i2--) {
          t = _this4.data[i2];
          if (t.data === "isFlip") {
            t.revert();
            t.getChildren(true, true, false).forEach(function(tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        }
        tweens.map(function(t2) {
          return {
            g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
            t: t2
          };
        }).sort(function(a, b3) {
          return b3.g - a.g || -Infinity;
        }).forEach(function(o) {
          return o.t.revert(revert);
        });
        i2 = _this4.data.length;
        while (i2--) {
          t = _this4.data[i2];
          if (t instanceof Timeline) {
            if (t.data !== "nested") {
              t.scrollTrigger && t.scrollTrigger.revert();
              t.kill();
            }
          } else {
            !(t instanceof Tween) && t.revert && t.revert(revert);
          }
        }
        _this4._r.forEach(function(f) {
          return f(revert, _this4);
        });
        _this4.isReverted = true;
      })();
    } else {
      this.data.forEach(function(e) {
        return e.kill && e.kill();
      });
    }
    this.clear();
    if (matchMedia2) {
      var i = _media.length;
      while (i--) {
        _media[i].id === this.id && _media.splice(i, 1);
      }
    }
  };
  _proto5.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  return Context2;
}();
var MatchMedia = function() {
  function MatchMedia2(scope) {
    this.contexts = [];
    this.scope = scope;
    _context && _context.data.push(this);
  }
  var _proto6 = MatchMedia2.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
    _context && !context3.selector && (context3.selector = _context.selector);
    this.contexts.push(context3);
    func = context3.add("onMatch", func);
    context3.queries = conditions;
    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);
        if (mq) {
          _media.indexOf(context3) < 0 && _media.push(context3);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context3, function(f) {
      return context3.add(null, f);
    });
    return this;
  };
  _proto6.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function(c) {
      return c.kill(revert, true);
    });
  };
  return MatchMedia2;
}();
var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function(config3) {
      return _createPlugin(config3);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]);
    var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function(property2, unit2, uncache2) {
      return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function(t) {
        return gsap.quickSetter(t, property, unit);
      }), l = setters.length;
      return function(value) {
        var i = l;
        while (i--) {
          setters[i](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
      var p2 = new Plugin();
      _quickTween._pt = 0;
      p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p2.render(1, p2);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);
    return Plugin ? setter : function(value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge22;
    var tween = gsap.to(target, _merge((_merge22 = {}, _merge22[property] = "+=0.1", _merge22.paused = true, _merge22), vars || {})), func = function func2(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config2(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function(pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function(targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults2), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function(targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars), child, next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0;
    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function(c) {
      var cond = c.conditions, found, p;
      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }
      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap,
    wrapYoyo,
    distribute,
    random,
    snap,
    normalize,
    getUnit,
    clamp,
    splitColor,
    toArray,
    selector,
    mapRange,
    pipe,
    unitize,
    interpolate,
    shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween,
    globals: _addGlobal,
    Tween,
    Timeline,
    Animation,
    getCache: _getCache,
    _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context2(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);
        toAdd._ctx = _context;
      }
      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
});
var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
  var pt2 = plugin._pt;
  while (pt2 && pt2.p !== prop && pt2.op !== prop && pt2.fp !== prop) {
    pt2 = pt2._next;
  }
  return pt2;
};
var _addModifiers = function _addModifiers2(tween, modifiers) {
  var targets = tween._targets, p, i, pt2;
  for (p in modifiers) {
    i = targets.length;
    while (i--) {
      pt2 = tween._ptLookup[i][p];
      if (pt2 && (pt2 = pt2.d)) {
        if (pt2._pt) {
          pt2 = _getPluginPropTween(pt2, p);
        }
        pt2 && pt2.modifier && pt2.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
};
var _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
  return {
    name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init4(target, vars, tween) {
      tween._onInit = function(tween2) {
        var temp, p;
        if (_isString(vars)) {
          temp = {};
          _forEachName(vars, function(name2) {
            return temp[name2] = 1;
          });
          vars = temp;
        }
        if (modifier) {
          temp = {};
          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }
          vars = temp;
        }
        _addModifiers(tween2, vars);
      };
    }
  };
};
var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt2, v2;
    this.tween = tween;
    for (p in vars) {
      v2 = target.getAttribute(p) || "";
      pt2 = this.add(target, "setAttribute", (v2 || 0) + "", vars[p], index, targets, 0, 0, p);
      pt2.op = p;
      pt2.b = v2;
      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt2 = data._pt;
    while (pt2) {
      _reverting ? pt2.set(pt2.t, pt2.p, pt2.b, pt2) : pt2.r(ratio, pt2.d);
      pt2 = pt2._next;
    }
  }
}, {
  name: "endArray",
  init: function init2(target, value) {
    var i = value.length;
    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
Tween.version = Timeline.version = gsap.version = "3.12.5";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0;
var Power1 = _easeMap.Power1;
var Power2 = _easeMap.Power2;
var Power3 = _easeMap.Power3;
var Power4 = _easeMap.Power4;
var Linear = _easeMap.Linear;
var Quad = _easeMap.Quad;
var Cubic = _easeMap.Cubic;
var Quart = _easeMap.Quart;
var Quint = _easeMap.Quint;
var Strong = _easeMap.Strong;
var Elastic = _easeMap.Elastic;
var Back = _easeMap.Back;
var SteppedEase = _easeMap.SteppedEase;
var Bounce = _easeMap.Bounce;
var Sine = _easeMap.Sine;
var Expo = _easeMap.Expo;
var Circ = _easeMap.Circ;

// node_modules/gsap/CSSPlugin.js
var _win2;
var _doc2;
var _docElement;
var _pluginInitted;
var _tempDiv;
var _tempDivStyler;
var _recentSetterPlugin;
var _reverting2;
var _windowExists3 = function _windowExists4() {
  return typeof window !== "undefined";
};
var _transformProps = {};
var _RAD2DEG = 180 / Math.PI;
var _DEG2RAD = Math.PI / 180;
var _atan2 = Math.atan2;
var _bigNum2 = 1e8;
var _capsExp = /([A-Z])/g;
var _horizontalExp = /(left|right|width|margin|padding|x)/i;
var _complexExp = /[\s,\(]\S/;
var _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
};
var _renderCSSProp = function _renderCSSProp2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
};
var _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
};
var _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
};
var _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
};
var _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
};
var _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
};
var _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
  return target.style[property] = value;
};
var _setterCSSProp = function _setterCSSProp2(target, property, value) {
  return target.style.setProperty(property, value);
};
var _setterTransform = function _setterTransform2(target, property, value) {
  return target._gsap[property] = value;
};
var _setterScale = function _setterScale2(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
};
var _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
};
var _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
};
var _transformProp = "transform";
var _transformOriginProp = _transformProp + "Origin";
var _saveStyle = function _saveStyle2(property, isNotCSS) {
  var _this = this;
  var target = this.target, style = target.style, cache = target._gsap;
  if (property in _transformProps && style) {
    this.tfm = this.tfm || {};
    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function(a) {
        return _this.tfm[a] = _get(target, a);
      }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
      property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
    } else {
      return _propertyAliases.transform.split(",").forEach(function(p) {
        return _saveStyle2.call(_this, p, isNotCSS);
      });
    }
    if (this.props.indexOf(_transformProp) >= 0) {
      return;
    }
    if (cache.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }
    property = _transformProp;
  }
  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
};
var _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
};
var _revertStyle = function _revertStyle2() {
  var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
  for (i = 0; i < props.length; i += 3) {
    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
  }
  if (this.tfm) {
    for (p in this.tfm) {
      cache[p] = this.tfm[p];
    }
    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }
    i = _reverting2();
    if ((!i || !i.isStart) && !style[_transformProp]) {
      _removeIndependentTransforms(style);
      if (cache.zOrigin && style[_transformOriginProp]) {
        style[_transformOriginProp] += " " + cache.zOrigin + "px";
        cache.zOrigin = 0;
        cache.renderTransform();
      }
      cache.uncache = 1;
    }
  }
};
var _getStyleSaver = function _getStyleSaver2(target, properties) {
  var saver = {
    target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || gsap.core.getCache(target);
  properties && properties.split(",").forEach(function(p) {
    return saver.save(p);
  });
  return saver;
};
var _supports3D;
var _createElement = function _createElement2(type, ns2) {
  var e = _doc2.createElementNS ? _doc2.createElementNS((ns2 || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc2.createElement(type);
  return e && e.style ? e : _doc2.createElement(type);
};
var _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
  var cs2 = getComputedStyle(target);
  return cs2[property] || cs2.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs2.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
};
var _prefixes = "O,Moz,ms,Ms,Webkit".split(",");
var _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
  var e = element || _tempDiv, s = e.style, i = 5;
  if (property in s && !preferPrefix) {
    return property;
  }
  property = property.charAt(0).toUpperCase() + property.substr(1);
  while (i-- && !(_prefixes[i] + property in s)) {
  }
  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
};
var _initCore = function _initCore2() {
  if (_windowExists3() && window.document) {
    _win2 = window;
    _doc2 = _win2.document;
    _docElement = _doc2.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
    _supports3D = !!_checkPropPrefix("perspective");
    _reverting2 = gsap.core.reverting;
    _pluginInitted = 1;
  }
};
var _getBBoxHack = function _getBBoxHack2(swapIfPossible) {
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText, bbox;
  _docElement.appendChild(svg);
  svg.appendChild(this);
  this.style.display = "block";
  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox;
      this.getBBox = _getBBoxHack2;
    } catch (e) {
    }
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }
  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }
  _docElement.removeChild(svg);
  this.style.cssText = oldCSS;
  return bbox;
};
var _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
  var i = attributesArray.length;
  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
};
var _getBBox = function _getBBox2(target) {
  var bounds;
  try {
    bounds = target.getBBox();
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }
  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
};
var _isSVG = function _isSVG2(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
};
var _removeProperty = function _removeProperty2(target, property) {
  if (property) {
    var style = target.style, first2Chars;
    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }
    if (style.removeProperty) {
      first2Chars = property.substr(0, 2);
      if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
        property = "-" + property;
      }
      style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      style.removeAttribute(property);
    }
  }
};
var _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt2 = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt2;
  pt2.b = beginning;
  pt2.e = end;
  plugin._props.push(property);
  return pt2;
};
var _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
};
var _nonStandardLayouts = {
  grid: 1,
  flex: 1
};
var _convertToUnit = function _convertToUnit2(target, property, value, unit) {
  var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }
  curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);
  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
  }
  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }
  if (!parent || parent === _doc2 || !parent.appendChild) {
    parent = _doc2.body;
  }
  cache = parent._gsap;
  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
    return _round(curValue / cache.width * amount);
  } else {
    if (toPercent && (property === "height" || property === "width")) {
      var v2 = target.style[property];
      target.style[property] = amount + unit;
      px = target[measureProperty];
      v2 ? target.style[property] = v2 : _removeProperty(target, property);
    } else {
      (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
    }
    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }
  return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
};
var _get = function _get2(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();
  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];
    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }
  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];
    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
    }
  }
  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
};
var _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
  if (!start || start === "none") {
    var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor");
    }
  }
  var pt2 = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
  pt2.b = start;
  pt2.e = end;
  start += "";
  end += "";
  if (end === "auto") {
    startValue = target.style[prop];
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
  }
  a = [start, end];
  _colorStringFilter(a);
  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];
  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }
      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;
        if (!endUnit) {
          endUnit = endUnit || _config.units[prop] || startUnit;
          if (index === end.length) {
            end += endUnit;
            pt2.e += endUnit;
          }
        }
        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        }
        pt2._pt = {
          _next: pt2._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }
    pt2.c = index < end.length ? end.substring(index, end.length) : "";
  } else {
    pt2.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }
  _relExp.test(end) && (pt2.e = 0);
  this._pt = pt2;
  return pt2;
};
var _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
};
var _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
  var split = value.split(" "), x = split[0], y = split[1] || "50%";
  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    value = x;
    x = y;
    y = value;
  }
  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
};
var _renderClearProps = function _renderClearProps2(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;
      while (--i > -1) {
        prop = props[i];
        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }
        _removeProperty(target, prop);
      }
    }
    if (clearTransforms) {
      _removeProperty(target, _transformProp);
      if (cache) {
        cache.svg && target.removeAttribute("transform");
        _parseTransform(target, 1);
        cache.uncache = 1;
        _removeIndependentTransforms(style);
      }
    }
  }
};
var _specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt2 = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt2.u = endValue;
      pt2.pr = -10;
      pt2.tween = tween;
      plugin._props.push(property);
      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
};
var _identity2DMatrix = [1, 0, 0, 1, 0, 0];
var _rotationalProperties = {};
var _isNullTransform = function _isNullTransform2(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
};
var _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
  var matrixString = _getComputedProperty(target, _transformProp);
  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
};
var _getMatrix = function _getMatrix2(target, force2D) {
  var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix;
    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;
    if (!parent || !target.offsetParent) {
      addedToDOM = 1;
      nextSibling = target.nextElementSibling;
      _docElement.appendChild(target);
    }
    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");
    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }
  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
};
var _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b3 = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b3 * c)) {
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b3 / determinant) + yOrigin * (a / determinant) - (a * ty - b3 * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }
  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b3 + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }
  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px";
  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
};
var _parseTransform = function _parseTransform2(target, uncache) {
  var cache = target._gsap || new GSCache(target);
  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }
  var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs2 = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b3, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  if (cs2.translate) {
    if (cs2.translate !== "none" || cs2.scale !== "none" || cs2.rotate !== "none") {
      style[_transformProp] = (cs2.translate !== "none" ? "translate3d(" + (cs2.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs2.rotate !== "none" ? "rotate(" + cs2.rotate + ") " : "") + (cs2.scale !== "none" ? "scale(" + cs2.scale.split(" ").join(",") + ") " : "") + (cs2[_transformProp] !== "none" ? cs2[_transformProp] : "");
    }
    style.scale = style.rotate = style.translate = "none";
  }
  matrix = _getMatrix(target, cache.svg);
  if (cache.svg) {
    if (cache.uncache) {
      t2 = target.getBBox();
      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin");
    }
    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }
  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;
  if (matrix !== _identity2DMatrix) {
    a = matrix[0];
    b3 = matrix[1];
    c = matrix[2];
    d = matrix[3];
    x = a12 = matrix[4];
    y = a22 = matrix[5];
    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b3 * b3);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b3 ? _atan2(b3, a) * _RAD2DEG : 0;
      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b3 + yOrigin * d);
      }
    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      }
      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b3 * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b3 = t2;
        c = t3;
      }
      angle = _atan2(b3, a);
      rotation = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b3 * sin;
        t2 = a12 * cos + a22 * sin;
        b3 = b3 * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }
      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }
      scaleX = _round(Math.sqrt(a * a + b3 * b3 + c * c));
      scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }
    if (cache.svg) {
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }
  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }
  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = _round(scaleX);
  cache.scaleY = _round(scaleY);
  cache.rotation = _round(rotation) + deg;
  cache.rotationX = _round(rotationX) + deg;
  cache.rotationY = _round(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;
  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }
  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
};
var _firstTwoOnly = function _firstTwoOnly2(value) {
  return (value = value.split(" "))[0] + " " + value[1];
};
var _addPxTranslate = function _addPxTranslate2(target, start, value) {
  var unit = getUnit(start);
  return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
};
var _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;
  _renderCSSTransforms(ratio, cache);
};
var _zeroDeg = "0deg";
var _zeroPx = "0px";
var _endParenthesis = ") ";
var _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
  var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }
  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }
  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }
  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }
  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }
  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }
  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }
  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }
  target.style[_transformProp] = transforms || "translate(0, 0)";
};
var _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
  var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);
  if (skewY) {
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }
  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;
    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;
      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }
    a11 = _round(a11);
    a21 = _round(a21);
    a12 = _round(a12);
    a22 = _round(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }
  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }
  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }
  if (xPercent || yPercent) {
    temp = target.getBBox();
    tx = _round(tx + xPercent / 100 * temp.width);
    ty = _round(ty + yPercent / 100 * temp.height);
  }
  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp);
};
var _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
  var cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt2;
  if (isString) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum2) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum2) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt2 = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt2.e = finalValue;
  pt2.u = "deg";
  plugin._props.push(property);
  return pt2;
};
var _assign = function _assign2(target, source7) {
  for (var p in source7) {
    target[p] = source7[p];
  }
  return target;
};
var _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
  var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    _removeProperty(target, _transformProp);
    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }
  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];
    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;
      plugin._props.push(p);
    }
  }
  _assign(endCache, startCache);
};
_forEachName("padding,margin,Width,Radius", function(name, index) {
  var t = "Top", r = "Right", b3 = "Bottom", l = "Left", props = (index < 3 ? [t, r, b3, l] : [t + l, t + r, b3 + r, b3 + l]).map(function(side) {
    return index < 2 ? name + side : "border" + side + name;
  });
  _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
    var a, vars;
    if (arguments.length < 4) {
      a = props.map(function(prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }
    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function(prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init3(target, vars, tween, index, targets) {
    var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
    _pluginInitted || _initCore();
    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }
      endValue = vars[p];
      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
        }
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
        } else {
          startValue = _get(target, p);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }
        isTransformRelated = p in _transformProps;
        if (isTransformRelated) {
          this.styles.save(p);
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
            transformPropTween.dep = 1;
          }
          if (p === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue);
            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0;
              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0);
          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (startUnit !== endUnit && endUnit !== "%") {
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else if (p !== "parseTransform") {
            _missingPlugin(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  render: function render2(ratio, data) {
    if (data.tween._time || !_reverting2()) {
      var pt2 = data._pt;
      while (pt2) {
        pt2.r(ratio, pt2.d);
        pt2 = pt2._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty,
    _getMatrix
  }
};
gsap.utils.checkPrefix = _checkPropPrefix;
gsap.core.getStyleSaver = _getStyleSaver;
(function(positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function(name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function(name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
  _config.units[name] = "px";
});
gsap.registerPlugin(CSSPlugin);

// node_modules/gsap/index.js
var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
var TweenMaxWithCSS = gsapWithCSS.core.Tween;

// node_modules/dill-pixel/lib/dill-pixel.mjs
var Pe = "development";
var W = Pe === "development";
var Rs = Pe === "production";
function Rt(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function Us(s) {
  return s.split(" ").map(Rt).join(" ");
}
var Ft = {
  log: "background: #74b64c; color: black;",
  warn: "background: yellow; color: black;",
  error: "background: orange; color: black;"
};
var b = class b2 {
  constructor(t) {
    b2._instance = this, b2.mode = t !== void 0 ? t : W ? "development" : "default", ["development", "default", "disabled"].includes(b2.mode) || (b2.mode = "default");
  }
  static get mode() {
    return b2._mode;
  }
  static set mode(t) {
    b2._mode = t;
  }
  static initialize(t) {
    if (b2._instance)
      throw new Error("Logger has already been instantiated.");
    b2._instance = new b2(t);
  }
  static log(...t) {
    b2.trace("log", ...t);
  }
  static warn(...t) {
    b2.trace("warn", ...t);
  }
  static error(...t) {
    b2.trace("error", ...t);
  }
  static trace(t = "log", ...e) {
    if (b2.mode !== "disabled") {
      if (b2.mode === "default")
        return console.log(`%c ${Rt(t)} `, Ft[t], ...e);
      console.groupCollapsed(`%c ${Rt(t)} `, Ft[t], ...e), console.trace("%c Stack ", Ft[t]), console.groupEnd();
    }
  }
};
b._instance = null, b._mode = "disabled";
var _ = b;
var ke = (s = 0) => new Promise((t) => setTimeout(t, s * 1e3));
var $s = (s = 0) => ke(s);
var Ee = (s) => s && typeof s.then == "function";
function si(...s) {
  return new ni(s);
}
var ni = class {
  /**
   * Creates a new Queue.
   * @param {(Promise<any> | (() => Promise<T>))[]} promises The promises to add to the queue.
   */
  constructor(t = []) {
    this._currentIndex = 0, this._isPaused = false, this._isCanceled = false, this._promises = t;
  }
  /**
   * Gets the results of the promises that have been resolved so far.
   * @returns {T[]} The results.
   */
  get results() {
    return this._results;
  }
  /**
   * Adds promises to the queue.
   * @param {...(Promise<any> | (() => Promise<T>))[]} args The promises to add.
   */
  add(...t) {
    this._promises.push(...t);
  }
  /**
   * Starts the execution of the promises in the queue.
   */
  start() {
    this._currentIndex === 0 && (this._results = [], this._next());
  }
  /**
   * Pauses the execution of the promises in the queue.
   */
  pause() {
    this._isPaused = true;
  }
  /**
   * Resumes the execution of the promises in the queue.
   */
  resume() {
    this._isPaused && (this._isPaused = false, this._next());
  }
  /**
   * Cancels the execution of the promises in the queue.
   */
  cancel() {
    this._isCanceled = true, this._promises = [];
  }
  /**
   * Executes the next promise in the queue.
   * @private
   * @returns {Promise<void>} A promise that resolves when the next promise in the queue has been executed.
   */
  async _next() {
    if (this._isPaused || this._isCanceled || this._currentIndex >= this._promises.length)
      return;
    const t = this._promises[this._currentIndex];
    try {
      const e = typeof t == "function" ? await t() : await t;
      this._results.push(e), this._currentIndex++, this._next();
    } catch (e) {
      _.error("Queue didn't complete due to an error:", e, "Cancelling Queue"), this._isCanceled = true;
    }
  }
};
function oi(s) {
  return typeof s == "function" && /^class\s/.test(Function.prototype.toString.call(s));
}
async function At(s) {
  let t, e;
  return Ee(s.module) ? (t = await s.module, e = s != null && s.namedExport ? t[s.namedExport] : t.default) : typeof s.module == "function" ? oi(s.module) ? (t = s.module, e = t) : (t = await s.module(), e = s != null && s.namedExport ? t[s.namedExport] : t.default) : (t = s.module, e = t), e;
}
function Jt(s) {
  if (s === void 0)
    return { width: 0, height: 0 };
  if (Array.isArray(s))
    return { width: s[0], height: s[1] === void 0 ? s[0] : s[1] };
  if (s instanceof Point)
    return { width: s.x, height: s.y };
  if (typeof s == "object") {
    const t = s;
    return { width: t.width || 0, height: t.height || 0 };
  } else
    return { width: s ?? 0, height: s ?? 0 };
}
function Ws(s, t) {
  let e;
  return function(...i) {
    e !== void 0 && clearTimeout(e), e = setTimeout(() => {
      s(...i);
    }, t);
  };
}
function Ut(s, t) {
  let e;
  for (const i of s) {
    if (i[0] === t)
      return e;
    e = i;
  }
}
function ri(s, t) {
  let e;
  const i = Array.from(s.entries());
  for (let n = i.length - 1; n >= 0; n--) {
    const o = i[n];
    if (o[0] === t)
      return e;
    e = o;
  }
}
function Ht(s) {
  return Array.from(s.entries()).pop();
}
function ai(s) {
  return Array.from(s.entries()).shift();
}
function Ks(s, t, e) {
  return Math.max(t, Math.min(e, s));
}
function hi(s, t, e) {
  return s + (t - s) * e;
}
function X(s, t) {
  return t.reduce((e, i) => i in s ? { ...e, [i]: s[i] } : e, {});
}
function $(s, t) {
  return Object.entries(t).filter(([e]) => !s.includes(e)).reduce((e, [i, n]) => ({ ...e, [i]: n }), {});
}
function js(s, t) {
  return new Point(s.x + t.x, s.y + t.y);
}
function Hs(s, t) {
  s.x += t.x, s.y += t.y;
}
function Gs(s, t) {
  return new Point(s.x - t.x, s.y - t.y);
}
function Vs(s, t) {
  s.x -= t.x, s.y -= t.y;
}
function Xs(s, t) {
  const e = new Point(s.x, s.y);
  return e.x *= t, e.y *= t, e;
}
function qs(s, t) {
  return hi(s.x, s.y, t);
}
function Ys(s, t) {
  return Math.sqrt(li(s, t));
}
function li(s, t) {
  return (t.x - s.x) * (t.x - s.x) + (t.y - s.y) * (t.y - s.y);
}
function Ns(s) {
  return Math.sqrt(s.x * s.x + s.y * s.y);
}
function I(s, t = false, e = 0, i = 0) {
  if (s instanceof Point)
    e = s.x, i = s.y;
  else if (Array.isArray(s))
    e = s[0], i = s[1] === void 0 ? s[0] : s[1];
  else if (typeof s == "object") {
    const n = s;
    e = n.x || 0, i = n.y || 0;
  } else
    e = s ?? e, i = s ?? i;
  return t ? new Point(e, i) : { x: e, y: i };
}
function Zs(s, t) {
  return s.x += t.x, s.y += t.y, s;
}
function Qs(s, t) {
  return t === void 0 && (t = new Point()), t.set(s.x + s.width * 0.5, s.y + s.height * 0.5), t;
}
function Js(s, t) {
  return s.x *= t, s.y *= t, s.width *= t, s.height *= t, s;
}
function tn(s, t) {
  return t === void 0 && (t = new Point()), t.set(s.width, s.height), t;
}
function ci(s, ...t) {
  t.forEach((e) => {
    const i = s[e];
    typeof i == "function" && (s[e] = i.bind(s));
  });
}
function ui(s, t = [], e = []) {
  let i = Object.getPrototypeOf(s);
  const n = [];
  for (; i; ) {
    const o = Object.getOwnPropertyNames(i).filter((r) => {
      const a = Object.getOwnPropertyDescriptor(i, r);
      return typeof (a == null ? void 0 : a.value) == "function" && r !== "constructor" && !t.some((h) => r.startsWith(h)) && !e.includes(r);
    });
    if (n.push(...o), i === Object.prototype || Object.prototype.hasOwnProperty.call(i.constructor, "__dill_pixel_method_binding_root"))
      break;
    i = Object.getPrototypeOf(i);
  }
  return n;
}
function w(s, t = [], e = []) {
  ui(s, t, e).forEach((i) => {
    s[i] = s[i].bind(s);
  });
}
function en(s, t, ...e) {
  typeof s[t] == "function" && s[t](...e);
}
function Le(s, t) {
  return s + Math.random() * (t - s);
}
function sn(s) {
  return Le(s.x, s.y);
}
function Gt(s, t) {
  return Math.floor(Le(s, t));
}
function nn(s) {
  return Gt(s.x, s.y);
}
function on() {
  return Math.random() < 0.5;
}
function rn(s) {
  let t, e;
  for (let i = 0; i < s.length; ++i)
    e = Gt(0, s.length), t = s[i], s[i] = s[e], s[e] = t;
}
function an(s) {
  return s[Gt(0, s.length)];
}
function wt(s, t) {
  return s >= 0 && s <= 1 ? s * t : s;
}
function bt(s) {
  if (Array.isArray(s))
    return {
      top: s[0],
      right: (s == null ? void 0 : s[1]) ?? s[0],
      bottom: (s == null ? void 0 : s[2]) ?? s[0],
      left: (s == null ? void 0 : s[3]) ?? (s == null ? void 0 : s[1]) ?? s[0] ?? 0
    };
  if (typeof s == "number")
    return { top: s, right: s, bottom: s, left: s };
  if (typeof s == "object") {
    const t = s;
    return t.x !== void 0 && t.y !== void 0 ? {
      top: t.y,
      right: t.x,
      bottom: t.y,
      left: t.x
    } : {
      top: s.top ?? 0,
      right: s.right ?? 0,
      bottom: s.bottom ?? 0,
      left: s.left ?? 0
    };
  } else
    return { top: 0, right: 0, bottom: 0, left: 0 };
}
var hn = window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(
  "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)"
).matches;
var Ot = "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator == null ? void 0 : navigator.maxTouchPoints) > 0;
var te = isMobile.any;
var ee = isMobile.android.device;
var di = isMobile.apple.device;
function fi(s, t = 0) {
  return s.toString().padStart(t, "0");
}
function pi(s, t) {
  const e = CanvasTextMetrics.measureText(s.text, s.style), i = e.lines, n = e.lineHeight, o = s.toLocal(new Point(t.pageX, t.pageY));
  let r = 0, a = 1 / 0, h = 0;
  for (let c = 0; c < i.length; c++) {
    const l = i[c];
    for (let d = 0; d <= l.length; d++) {
      const p = l.substring(0, d), H = CanvasTextMetrics.measureText(p, s.style).width, z = c * n, f = Math.hypot(H - o.x, z - o.y);
      f < a && (a = f, r = h + d);
    }
    h += l.length;
  }
  return r;
}
function ln(s) {
  return `#${s.toString(16)}`;
}
function cn(s) {
  return parseInt(s.replace(/^#/, ""), 16);
}
var m = class m2 {
  /**
   * A Color reresented by a red, green and blue component.
   * @param r The red component of the Color OR the full Color in HEX.
   * @param g The green component of the Color.
   * @param b The blue component of the Color.
   */
  constructor(t, e, i) {
    t !== void 0 && e === void 0 ? (this.r = (t & 255 << 16) >> 16, this.g = (t & 65280) >> 8, this.b = t & 255) : (this.r = t || 0, this.g = e || 0, this.b = i || 0);
  }
  /**
   * Creates a random Color.
   * @returns The new Color.
   */
  static random() {
    return new m2(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }
  /**
   * Converts the rgb values passed in to hex.
   * @param r The red component to convert.
   * @param g The green component to convert.
   * @param b The blue component to convert.
   * @returns The hex value.
   */
  static rgbToHex(t, e, i) {
    return t << 16 | e << 8 | i;
  }
  static rgbToHexString(t) {
    let e = Number(t).toString(16);
    return e.length < 2 && (e = "0" + e), e;
  }
  static rgbToFullHexString(t, e, i) {
    const n = m2.rgbToHexString(t), o = m2.rgbToHexString(e), r = m2.rgbToHexString(i);
    return n + o + r;
  }
  /**
   * Creates a new Color that is linearly interpolated from @var pA to @var b .
   * @param pA The start Color.
   * @param b The end Color.
   * @param pPerc The percentage on the path from @var pA to @var b .
   * @returns The new Color.
   */
  static lerp(t, e, i) {
    return new m2(t.r + i * (e.r - t.r), t.g + i * (e.g - t.g), t.b + i * (e.b - t.b));
  }
  /**
   * Creates a new hex Color that is linearly interpolated from @var pA to @var b .
   * @param pA The first Color hex.
   * @param b The second Color hex.
   * @param pPerc The percentage along the path from @var pA to @var b .
   * @returns The new hex Color.
   */
  static lerpHex(t, e, i) {
    const n = new m2(t), o = new m2(e);
    return m2.lerp(n, o, i).toHex();
  }
  /**
   * Convert this Color to hex.
   * @returns The Color in hex format.
   */
  toHex() {
    return m2.rgbToHex(this.r, this.g, this.b);
  }
  toHexString() {
    return m2.rgbToFullHexString(this.r, this.g, this.b);
  }
  /**
   * Converts the Color components to the 0...1 range.
   * @returns The new Color.
   */
  toWebGL() {
    return [this.r / 255, this.g / 255, this.b / 255];
  }
};
m.WHITE = new m(255, 255, 255), m.BLACK = new m(0, 0, 0), m.GREY = new m(127, 127, 127), m.RED = new m(255, 0, 0), m.GREEN = new m(0, 255, 0), m.BLUE = new m(0, 0, 255), m.YELLOW = new m(255, 255, 0), m.MAGENTA = new m(255, 0, 255), m.CYAN = new m(0, 255, 255);
var ie = m;
function un(s, t) {
  s.parent.worldTransform.apply(s.position, s.position), t.worldTransform.applyInverse(s.position, s.position), s.parent.removeChild(s), t.addChild(s);
}
function dn(s) {
  return Math.sqrt(s.width * s.width + s.height * s.height);
}
function fn(s) {
  const t = s.parent;
  t.removeChild(s), t.addChild(s);
}
function pn(s) {
  const t = s.parent;
  t.removeChild(s), t.addChildAt(s, 0);
}
function _n(s, t) {
  if (s instanceof Polygon) {
    for (let e = 0; e < s.points.length; e += 2)
      s.points[e] += t.x, s.points[e + 1] += t.y;
    return s;
  } else
    return s.x += t.x, s.y += t.y, s;
}
function gn(s, t) {
  return s.x += t.x, s.y += t.y, s;
}
function Me(s, t, e = "width") {
  const i = e === "width" ? "y" : "x", n = e === "width" ? "x" : "y";
  s[e] = t, s.scale[i] = s.scale[n];
}
function se(s, t) {
  Me(s, t, "width");
}
function ne(s, t) {
  Me(s, t, "height");
}
function mn(s, t, e = "width") {
  let i;
  t != null && t.width && (t != null && t.height) ? i = { x: t.width, y: t.height } : i = I(t), e === "width" ? (se(s, i.x), s.height < i.y && ne(s, i.y)) : (ne(s, i.y), s.width < i.x && se(s, i.x));
}
function yn(s) {
  const t = s.getContext("webgl");
  if (t) {
    const i = t.getExtension("WEBGL_lose_context");
    i && i.loseContext();
  }
  const e = s.getContext("2d");
  e && e.clearRect(0, 0, s.width, s.height), s instanceof OffscreenCanvas || s.parentNode && s.parentNode.removeChild(s), s.width = 0, s.height = 0, s = null;
}
function vn(s, t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of s)
    t(i) && e.add(i);
  return e;
}
function wn(s) {
  return s == null ? void 0 : s.values().next().value;
}
function bn(s) {
  let t;
  for (const e of s)
    t = e;
  return t;
}
async function _i(s) {
  const e = globalThis.getDillPixel("pluginsList") || [];
  return s.map((i) => {
    var r, a;
    const n = e.find((h) => h.id === i || h.id === i[0]);
    if (!n)
      return _.warn(`Plugin ${i} not found`), null;
    const o = i;
    return console.log({ p: n }), {
      id: n.id,
      path: n.path,
      module: n.module,
      options: (r = o[1]) == null ? void 0 : r.options,
      autoLoad: ((a = o[1]) == null ? void 0 : a.autoLoad) !== false
    };
  }).filter(Boolean);
}
async function gi(s) {
  const e = globalThis.getDillPixel("storageAdaptersList") || [];
  return s.map((i) => {
    var r, a;
    const n = e.find((h) => h.id === i || h.id === i[0]);
    if (!n)
      return _.warn(`Storage Adapter ${i} not found`), null;
    const o = i;
    return {
      id: n.id,
      path: n.path,
      module: n.module,
      options: (r = o[1]) == null ? void 0 : r.options,
      autoLoad: ((a = o[1]) == null ? void 0 : a.autoLoad) !== false
    };
  }).filter(Boolean);
}
function xn(s) {
  return {
    id: "DillPixelApplication",
    showStats: false,
    showSceneDebugMenu: false,
    useHash: false,
    useSpine: false,
    useVoiceover: false,
    defaultSceneLoadMethod: "immediate",
    data: {
      initial: {},
      backupAll: false
    },
    assets: {
      manifest: {},
      preload: {
        bundles: ["required"]
      },
      background: {
        bundles: []
      }
    },
    plugins: [],
    scenes: [],
    ...s
  };
}
var mi = "8.18.2";
var yi = "8.6.6";
function vi() {
  const s = `%c Dill Pixel Game Framework v${mi} | %cPixi.js v${yi} %c| %chttps://dillpixel.io `;
  console.log(
    s,
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #e91e63",
    "background: rgba(31, 41, 55, 1);color: #74b64c",
    "background: rgba(31, 41, 55, 1);color: #74b64c; font-weight: bold"
  );
}
var wi = "dill-pixel-game-container";
function bi(s) {
  const t = document.createElement("div");
  return t.setAttribute("id", s), document.body.appendChild(t), t;
}
async function Cn(s = { id: "DillPixelApplication" }, t = v, e = wi, i = true) {
  i && vi();
  let n = null;
  if (typeof e == "string" ? (n = document.getElementById(e), n || (n = bi(e))) : e instanceof HTMLElement ? n = e : e === window && (n = document.body), !n)
    throw new Error(
      "You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id."
    );
  s.resizeToContainer && (s.resizeTo = n), s.container = n;
  const o = new t();
  if (await o.initialize(s), n)
    n.appendChild(o.canvas), o.setContainer(n);
  else
    throw new Error("No element found to append the view to.");
  return await ke(0.01), await o.postInitialize(), o;
}
var Te = {};
var $t = {};
var xi = class {
  constructor() {
    this._adapters = /* @__PURE__ */ new Map();
  }
  /**
   * Registers a new storage adapter with the store.
   * @param {IStorageAdapter} adapter The adapter to register.
   * @param {any} adapterOptions The options to initialize the adapter with.
   * @returns {Promise<void>} A promise that resolves when the adapter has been registered and initialized.
   */
  async registerAdapter(t, e) {
    if (this._adapters.has(t.id))
      return _.error(`Storage Adapter with id "${t.id}" already registered. Not registering.`), Promise.resolve();
    this._adapters.set(t.id, t), await t.initialize(this._app, e);
  }
  /**
   * Retrieves a registered storage adapter.
   * @template T The type of the adapter.
   * @param {string} adapterId The ID of the adapter.
   * @returns {T} The adapter.
   */
  getAdapter(t) {
    const e = this._adapters.get(t);
    if (!e)
      throw new Error(`Adapter ${t} not found`);
    return e;
  }
  /**
   * Checks if a storage adapter is registered.
   * @param {string} adapterId The ID of the adapter.
   * @returns {boolean} True if the adapter is registered, false otherwise.
   */
  hasAdapter(t) {
    return this._adapters.has(t);
  }
  /**
   * Destroys the store and all its adapters.
   */
  destroy() {
    this._adapters.forEach((t) => {
      t.destroy();
    }), this._adapters.clear();
  }
  /**
   * Saves data with a storage adapter.
   * @param {string | string[] | Partial<AdapterSaveConfig> | Partial<AdapterSaveConfig>[]} adapterId The ID of the adapter, or an array of IDs, or an array of save configurations.
   * @param {string} key The key to save the data under.
   * @param {any} data The data to save.
   * @param {boolean} [awaitSave] Whether to wait for the save operation to complete before returning.
   * @returns {Promise<any>} A promise that resolves with the result of the save operation.
   */
  async save(t, e, i, n = true) {
    var a;
    let o = [];
    const r = [];
    Array.isArray(t) || (typeof t == "object" ? o = [t] : o = [t]), (o[0] === "*" || ((a = o[0]) == null ? void 0 : a.adapterId) === "*") && (o = Array.from(this._adapters.keys()));
    for (let h = 0; h < o.length; h++) {
      let c, l = false;
      if (typeof o[h] == "object") {
        const p = o[h];
        c = p.adapterId, l = p.awaitSave ?? false;
      } else
        c = o[h], l = n;
      const d = this._adapters.get(c);
      if (!d)
        throw new Error(`Adapter ${o[h]} not found`);
      l ? r.push(await d.save(e, i)) : r.push(void d.save(e, i));
    }
    return r;
  }
  /**
   * Loads data from a storage adapter.
   * @param {string} adapterId The ID of the adapter.
   * @param {string} key The key to load the data from.
   * @returns {Promise<any>} A promise that resolves with the loaded data.
   */
  async load(t, e) {
    const i = this._adapters.get(t);
    if (!i)
      throw new Error(`Adapter ${t} not found`);
    return await i.load(e);
  }
  initialize(t) {
    return this._app = t, this;
  }
};
var zt = {};
var et = {};
var oe;
function yt() {
  if (oe) return et;
  oe = 1, Object.defineProperty(et, "__esModule", { value: true }), et.Collector = void 0;
  let s = class {
    /**
     * Create a new collector.
     *
     * @param signal The signal to emit.
     */
    constructor(e) {
      this.emit = (...i) => {
        e.emitCollecting(this, i);
      };
    }
  };
  return et.Collector = s, et;
}
var it = {};
var re;
function Ci() {
  if (re) return it;
  re = 1, Object.defineProperty(it, "__esModule", { value: true }), it.CollectorArray = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = [];
    }
    handleResult(i) {
      return this.result.push(i), true;
    }
    /**
     * Get the list of results from the signal handlers.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result.length = 0;
    }
  };
  return it.CollectorArray = t, it;
}
var st = {};
var ae;
function Ai() {
  if (ae) return st;
  ae = 1, Object.defineProperty(st, "__esModule", { value: true }), st.CollectorLast = void 0;
  const s = yt();
  let t = class extends s.Collector {
    handleResult(i) {
      return this.result = i, true;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      delete this.result;
    }
  };
  return st.CollectorLast = t, st;
}
var nt = {};
var he;
function Si() {
  if (he) return nt;
  he = 1, Object.defineProperty(nt, "__esModule", { value: true }), nt.CollectorUntil0 = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = false;
    }
    handleResult(i) {
      return this.result = i, this.result;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result = false;
    }
  };
  return nt.CollectorUntil0 = t, nt;
}
var ot = {};
var le;
function Pi() {
  if (le) return ot;
  le = 1, Object.defineProperty(ot, "__esModule", { value: true }), ot.CollectorWhile0 = void 0;
  const s = yt();
  let t = class extends s.Collector {
    constructor() {
      super(...arguments), this.result = false;
    }
    handleResult(i) {
      return this.result = i, !this.result;
    }
    /**
     * Get the result of the last signal handler.
     */
    getResult() {
      return this.result;
    }
    /**
     * Reset the result
     */
    reset() {
      this.result = false;
    }
  };
  return ot.CollectorWhile0 = t, ot;
}
var rt = {};
var at = {};
var ce;
function ki() {
  if (ce) return at;
  ce = 1, Object.defineProperty(at, "__esModule", { value: true }), at.SignalConnectionImpl = void 0;
  class s {
    /**
     * @param link The actual link of the connection.
     * @param parentCleanup Callback to cleanup the parent signal when a connection is disconnected
     */
    constructor(e, i) {
      this.link = e, this.parentCleanup = i;
    }
    disconnect() {
      return this.link !== null ? (this.link.unlink(), this.link = null, this.parentCleanup(), this.parentCleanup = null, true) : false;
    }
    set enabled(e) {
      this.link && this.link.setEnabled(e);
    }
    get enabled() {
      return this.link !== null && this.link.isEnabled();
    }
  }
  return at.SignalConnectionImpl = s, at;
}
var ht = {};
var ue;
function Ei() {
  if (ue) return ht;
  ue = 1, Object.defineProperty(ht, "__esModule", { value: true }), ht.SignalLink = void 0;
  let s = class De {
    constructor(e = null, i = null, n = 0) {
      this.enabled = true, this.newLink = false, this.callback = null, this.prev = e ?? this, this.next = i ?? this, this.order = n;
    }
    isEnabled() {
      return this.enabled && !this.newLink;
    }
    setEnabled(e) {
      this.enabled = e;
    }
    unlink() {
      this.callback = null, this.next.prev = this.prev, this.prev.next = this.next;
    }
    insert(e, i) {
      let n = this.prev;
      for (; n !== this && !(n.order <= i); )
        n = n.prev;
      const o = new De(n, n.next, i);
      return o.callback = e, n.next = o, o.next.prev = o, o;
    }
  };
  return ht.SignalLink = s, ht;
}
var de;
function Li() {
  if (de) return rt;
  de = 1, Object.defineProperty(rt, "__esModule", { value: true }), rt.Signal = void 0;
  const s = ki(), t = Ei();
  class e {
    constructor() {
      this.head = new t.SignalLink(), this.hasNewLinks = false, this.emitDepth = 0, this.connectionsCount = 0;
    }
    /**
     * @returns The number of connections on this signal.
     */
    getConnectionsCount() {
      return this.connectionsCount;
    }
    /**
     * @returns true if this signal has connections.
     */
    hasConnections() {
      return this.connectionsCount > 0;
    }
    /**
     * Subscribe to this signal.
     *
     * @param callback This callback will be run when emit() is called.
     * @param order Handlers with a higher order value will be called later.
     */
    connect(n, o = 0) {
      this.connectionsCount++;
      const r = this.head.insert(n, o);
      return this.emitDepth > 0 && (this.hasNewLinks = true, r.newLink = true), new s.SignalConnectionImpl(r, () => this.decrementConnectionCount());
    }
    decrementConnectionCount() {
      this.connectionsCount--;
    }
    /**
     * Unsubscribe from this signal with the original callback instance.
     * While you can use this method, the SignalConnection returned by connect() will not be updated!
     *
     * @param callback The callback you passed to connect().
     */
    disconnect(n) {
      for (let o = this.head.next; o !== this.head; o = o.next)
        if (o.callback === n)
          return this.decrementConnectionCount(), o.unlink(), true;
      return false;
    }
    /**
     * Disconnect all handlers from this signal event.
     */
    disconnectAll() {
      for (; this.head.next !== this.head; )
        this.head.next.unlink();
      this.connectionsCount = 0;
    }
    /**
     * Publish this signal event (call all handlers).
     */
    emit(...n) {
      this.emitDepth++;
      for (let o = this.head.next; o !== this.head; o = o.next)
        o.isEnabled() && o.callback && o.callback.apply(null, n);
      this.emitDepth--, this.unsetNewLink();
    }
    emitCollecting(n, o) {
      this.emitDepth++;
      for (let r = this.head.next; r !== this.head; r = r.next)
        if (r.isEnabled() && r.callback) {
          const a = r.callback.apply(null, o);
          if (!n.handleResult(a))
            break;
        }
      this.emitDepth--, this.unsetNewLink();
    }
    unsetNewLink() {
      if (this.hasNewLinks && this.emitDepth === 0) {
        for (let n = this.head.next; n !== this.head; n = n.next)
          n.newLink = false;
        this.hasNewLinks = false;
      }
    }
  }
  return rt.Signal = e, rt;
}
var lt = {};
var fe;
function Mi() {
  if (fe) return lt;
  fe = 1, Object.defineProperty(lt, "__esModule", { value: true }), lt.SignalConnections = void 0;
  let s = class {
    constructor() {
      this.list = [];
    }
    /**
     * Add a connection to the list.
     * @param connection
     */
    add(e) {
      this.list.push(e);
    }
    /**
     * Disconnect all connections in the list and empty the list.
     */
    disconnectAll() {
      for (const e of this.list)
        e.disconnect();
      this.list = [];
    }
    /**
     * @returns The number of connections in this list.
     */
    getCount() {
      return this.list.length;
    }
    /**
     * @returns true if this list is empty.
     */
    isEmpty() {
      return this.list.length === 0;
    }
  };
  return lt.SignalConnections = s, lt;
}
var pe;
function Ti() {
  return pe || (pe = 1, function(s) {
    Object.defineProperty(s, "__esModule", { value: true }), s.SignalConnections = s.Signal = s.CollectorWhile0 = s.CollectorUntil0 = s.CollectorLast = s.CollectorArray = s.Collector = void 0;
    var t = yt();
    Object.defineProperty(s, "Collector", { enumerable: true, get: function() {
      return t.Collector;
    } });
    var e = Ci();
    Object.defineProperty(s, "CollectorArray", { enumerable: true, get: function() {
      return e.CollectorArray;
    } });
    var i = Ai();
    Object.defineProperty(s, "CollectorLast", { enumerable: true, get: function() {
      return i.CollectorLast;
    } });
    var n = Si();
    Object.defineProperty(s, "CollectorUntil0", { enumerable: true, get: function() {
      return n.CollectorUntil0;
    } });
    var o = Pi();
    Object.defineProperty(s, "CollectorWhile0", { enumerable: true, get: function() {
      return o.CollectorWhile0;
    } });
    var r = Li();
    Object.defineProperty(s, "Signal", { enumerable: true, get: function() {
      return r.Signal;
    } });
    var a = Mi();
    Object.defineProperty(s, "SignalConnections", { enumerable: true, get: function() {
      return a.SignalConnections;
    } });
  }(zt)), zt;
}
var R = Ti();
var Di = {
  highest: Number.MIN_SAFE_INTEGER,
  higher: -1e3,
  high: -100,
  normal: 0,
  low: 100,
  lower: 1e3,
  lowest: Number.MAX_SAFE_INTEGER
};
var u = class extends R.Signal {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  connectOnce(t, e) {
    const i = (...o) => {
      t(...o), n.disconnect();
    }, n = this.connect(i, e);
    return n;
  }
  connectNTimes(t, e, i) {
    let n = 0;
    const o = (...a) => {
      t(...a), n++, n >= e && r.disconnect();
    }, r = this.connect(o, i);
    return r;
  }
  /**
   * Subscribe to this signal.
   *
   * @param callback This callback will be run when emit() is called.
   * @param order Handlers with a higher order value will be called later.
   */
  connect(t, e = "normal") {
    const i = Di[e] ?? e;
    return super.connect(t, i);
  }
};
var O = class {
  constructor(t = "Plugin") {
    this.id = t, this._signalConnections = new R.SignalConnections(), w(this), this.__dill_pixel_method_binding_root = true;
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this._signalConnections.disconnectAll();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initialize(t, e) {
    return Promise.resolve(void 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async postInitialize(t) {
    return Promise.resolve(void 0);
  }
  /**
   * Add signal connections to the container.
   * @param args - The signal connections to add.
   */
  addSignalConnection(...t) {
    for (const e of t)
      this._signalConnections.add(e);
  }
  clearSignalConnections() {
    this._signalConnections.disconnectAll();
  }
  /**
   * @override
   * @protected
   */
  registerCoreFunctions() {
    this.getCoreFunctions().forEach((e) => {
      const i = e;
      $t[i] = this[e];
    });
  }
  /**
   * @override
   * @protected
   */
  registerCoreSignals() {
    this.getCoreSignals().forEach((e) => {
      const i = e;
      Te[i] = this[e];
    });
  }
  getCoreFunctions() {
    return [];
  }
  getCoreSignals() {
    return [];
  }
};
var Fi = class extends O {
  constructor() {
    super(...arguments), this.id = "actions", this.onActionContextChanged = new u(), this._context = "default", this._signals = /* @__PURE__ */ new Map(), this._actions = {}, this._debug = false;
  }
  set debug(t) {
    this._debug = t;
  }
  get debug() {
    return this._debug;
  }
  // getter / setter
  get context() {
    return this._context;
  }
  set context(t) {
    this._context !== t && (this._context = t, this.onActionContextChanged.emit(t));
  }
  initialize(t) {
    var e;
    this._actions = (e = t == null ? void 0 : t.config) != null && e.actions ? t.config.actions || {} : {}, console.log("ActionsPlugin initialized");
  }
  getAction(t) {
    return this._signals.has(t) || this._signals.set(t, new u()), this._signals.get(t);
  }
  getActions() {
    return this._actions;
  }
  sendAction(t, e) {
    var i, n, o, r;
    if (!this._actions[t]) {
      this._debug && _.warn(`Action ${t} is not defined`);
      return;
    }
    if (((i = this._actions[t]) == null ? void 0 : i.context) === "*" || ((n = this._actions[t]) == null ? void 0 : n.context) === this.context || (r = (o = this._actions[t]) == null ? void 0 : o.context) != null && r.includes(this.context))
      return this.getAction(t).emit({ id: t, context: this.context, data: e });
    this._debug && _.warn(`Action ${t} is not allowed for context ${this.context}`);
  }
  setActionContext(t) {
    return this.context = t, this.context;
  }
  getCoreFunctions() {
    return ["getAction", "sendAction", "setActionContext", "getActions"];
  }
  getCoreSignals() {
    return ["onActionContextChanged"];
  }
};
var Mn = {
  default: "default",
  menu: "menu",
  pause: "pause",
  popup: "popup",
  game: "game"
};
var Oi = ["default", "menu", "pause", "popup", "game"];
var zi = [
  "up",
  "down",
  "left",
  "right",
  "action",
  "pause",
  "unpause",
  "start",
  "select",
  "menu",
  "back",
  "next"
];
var Bi = {
  action: { context: "*" },
  back: { context: ["menu", "default", "popup"] },
  next: { context: ["menu", "default", "popup"] },
  select: { context: ["menu", "default", "popup"] },
  menu: { context: ["default"] },
  down: { context: ["menu", "default", "popup"] },
  up: { context: ["menu", "default", "popup"] },
  left: { context: ["menu", "default", "popup"] },
  right: { context: "*" },
  pause: { context: "*" },
  unpause: { context: "*" },
  start: { context: "*" }
};
var Tn = {
  __default_do_not_use__: "__default_do_not_use__"
};
function Dn(s) {
  return s ?? Oi;
}
function Fn(s, t, e = true) {
  return e && (t = { ...Bi, ...t }), t;
}
function On(s) {
  return s || [];
}
var Ii = {
  preferWorkers: !W,
  crossOrigin: "anonymous"
};
function _e(s) {
  var t;
  if (typeof s == "string") {
    if (!(s != null && s.includes(".svg")))
      return s;
    s = { src: s };
  } else if (Array.isArray(s.src) || !((t = s.src) != null && t.includes(".svg")))
    return s;
  return s.data || (s.data = {}), s.data.parseAsGraphicsContext = true, s;
}
function q(s) {
  return Array.isArray(s) || (s = [s]), s.map((t) => {
    if (typeof t == "string")
      return _e(t);
    if (typeof t == "object") {
      let e = (t == null ? void 0 : t.src) || [];
      return Array.isArray(e) || (e = [e]), t.ext ? (t.src && !Array.isArray(t.src) && (e.push(t.src), t.src = [t.src]), t.src = t.src.map((i) => `${i}.${t.ext}`), t.alias = [...e, ...t.src].filter(Boolean)) : _e(t), t;
    }
  });
}
var Ri = class extends O {
  constructor() {
    super(...arguments), this.id = "assets", this.onLoadStart = new u(), this.onLoadProgress = new u(), this.onLoadComplete = new u(), this.onBackgroundLoadStart = new u(), this.onBackgroundAssetLoaded = new u(), this.onBackgroundBundlesLoaded = new u(), this._loadedBundles = /* @__PURE__ */ new Set(), this._loadedAssets = /* @__PURE__ */ new Set(), this._required = {}, this._background = {};
  }
  initialize(t, e) {
    e != null && e.preload && (this._required = e.preload), e != null && e.background && (this._background = e.background), Assets.setPreferences({ ...Ii, ...e == null ? void 0 : e.assetPreferences });
  }
  async loadRequired() {
    return this._handleLoadStart(), this._handleLoadProgress(0), this._required && (this._required.assets && await Assets.load(q(this._required.assets), this._handleLoadProgress), this._required.bundles && await Assets.loadBundle(this._required.bundles, this._handleLoadProgress)), this._handleLoadComplete(), Promise.resolve();
  }
  loadBackground() {
    this.onBackgroundLoadStart.emit(), this._background && (this._background.assets && q(this._background.assets).forEach((e) => {
      if (e != null && e.src) {
        const i = e.src;
        if (i)
          return Assets.backgroundLoad(i);
      }
      return Assets.backgroundLoad(e).then(() => {
        this.onBackgroundAssetLoaded.emit(e);
      });
    }), this._background.bundles && Assets.backgroundLoadBundle(this._background.bundles).then(() => {
      this.onBackgroundBundlesLoaded.emit();
    }));
  }
  async loadAssets(t) {
    return t = q(t), await Assets.load(t, this._handleLoadProgress), this._markAssetsLoaded(t), Promise.resolve();
  }
  async loadBundles(t) {
    return await Assets.loadBundle(t, this._handleLoadProgress), this._markBundlesLoaded(t), Promise.resolve();
  }
  async unloadSceneAssets(t) {
    var e, i, n, o;
    if ((i = (e = t.assets) == null ? void 0 : e.preload) != null && i.assets) {
      const r = q(t.assets.preload.assets);
      Assets.unload(r).then(() => {
        this._markAssetsUnloaded(r);
      });
    }
    if ((o = (n = t.assets) == null ? void 0 : n.preload) != null && o.bundles) {
      const r = t.assets.preload.bundles;
      Assets.unloadBundle(r).then(() => {
        this._markBundlesUnloaded(r);
      });
    }
    return Promise.resolve();
  }
  async loadSceneAssets(t, e = false) {
    var i, n, o, r, a;
    if (e) {
      if ((i = t.assets) != null && i.background) {
        if (t.assets.background.assets) {
          const c = q(t.assets.background.assets).filter((l) => !this._isAssetLoaded(l));
          c.length && c.forEach((l) => {
            if (l != null && l.src) {
              const d = l.src;
              if (d)
                return Assets.backgroundLoad(d);
            }
            return Assets.backgroundLoad(l);
          });
        }
        if (t.assets.background.bundles) {
          let h = Array.isArray(t.assets.background.bundles) ? t.assets.background.bundles : [t.assets.background.bundles];
          h = h.filter((c) => !this._isBundleLoaded(c)), h.length && Assets.backgroundLoadBundle(h);
        }
      }
    } else {
      if (this._handleLoadStart(), this._handleLoadProgress(0), (o = (n = t.assets) == null ? void 0 : n.preload) != null && o.assets) {
        const h = q(t.assets.preload.assets), c = h.filter((l) => !this._isAssetLoaded(l));
        c.length && (await Assets.load(c, this._handleLoadProgress), this._markAssetsLoaded(h));
      }
      if ((a = (r = t.assets) == null ? void 0 : r.preload) != null && a.bundles) {
        let h = Array.isArray(t.assets.preload.bundles) ? t.assets.preload.bundles : [t.assets.preload.bundles];
        h = h.filter((c) => !this._isBundleLoaded(c)), h.length && (_.log("loading bundles", h), await Assets.loadBundle(h, this._handleLoadProgress), this._markBundlesLoaded(h));
      }
      this._handleLoadComplete();
    }
  }
  getCoreFunctions() {
    return ["loadSceneAssets", "unloadSceneAssets", "loadAssets", "loadBundles", "loadRequired"];
  }
  getCoreSignals() {
    return [
      "onLoadStart",
      "onLoadProgress",
      "onLoadComplete",
      "onBackgroundLoadStart",
      "onBackgroundAssetLoaded",
      "onBackgroundBundlesLoaded"
    ];
  }
  _isAssetLoaded(t) {
    return this._loadedAssets.has(t);
  }
  _isBundleLoaded(t) {
    return this._loadedBundles.has(t);
  }
  _markAssetsLoaded(t) {
    t.forEach((e) => {
      this._loadedAssets.add(e);
    });
  }
  _markBundlesLoaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedBundles.add(e);
    });
  }
  _markAssetsUnloaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedAssets.delete(e);
    });
  }
  _markBundlesUnloaded(t) {
    Array.isArray(t) || (t = [t]), t.forEach((e) => {
      this._loadedBundles.delete(e);
    });
  }
  _handleLoadStart() {
    this.onLoadStart.emit();
  }
  _handleLoadProgress(t) {
    this.onLoadProgress.emit(t);
  }
  _handleLoadComplete() {
    this._handleLoadProgress(1), this.onLoadComplete.emit();
  }
};
var Ui = class {
  constructor(t, e) {
    this.name = t, this.manager = e, this._sounds = /* @__PURE__ */ new Map(), this._muted = false, this._volume = 1, this.muted = this.manager.muted;
  }
  get instances() {
    return Array.from(this._sounds.values());
  }
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this._setMuted();
  }
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this.updateVolume();
  }
  add(t, e) {
    return this._sounds.set(t, e), e;
  }
  get(t) {
    return this._sounds.get(t);
  }
  remove(t) {
    const e = this._sounds.get(t);
    return e && (e.destroy(), this._sounds.delete(t)), e;
  }
  _setMuted() {
    this._sounds.forEach((t) => {
      t.muted = this._muted;
    });
  }
  updateVolume() {
    this._sounds.forEach((t) => {
      t.updateVolume();
    }), this.manager.onChannelVolumeChanged.emit({ channel: this, volume: this._volume });
  }
  destroy() {
  }
};
var ge = class {
  constructor(t, e, i) {
    this.id = t, this.channel = e, this.manager = i, this.onStart = new u(), this.onStop = new u(), this.onEnd = new u(), this.onPaused = new u(), this.onResumed = new u(), this.onProgress = new u(), this._volume = 1, this._muted = false, this._isPlaying = false, w(this), this.muted = this.channel.muted;
  }
  get media() {
    return this._media;
  }
  set media(t) {
    this._media = t, t && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume, this.muted && (this._media.muted = this.muted), this.addListeners());
  }
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this._media && (this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume);
  }
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this._media && (this._media.muted = this._muted);
  }
  get isPlaying() {
    return this._isPlaying;
  }
  set isPlaying(t) {
    this._isPlaying = t;
  }
  pause() {
    this._isPlaying = false, this._media && (this._media.paused = true);
  }
  resume() {
    this._isPlaying = true, this._media && (this._media.paused = false);
  }
  remove() {
    this._isPlaying = false, this.channel.remove(this.id);
  }
  stop() {
    this._media && this._media.stop(), this._isPlaying = false, this.onEnd.emit(this);
  }
  updateVolume() {
    this.volume = this._volume;
  }
  addListeners() {
    this.removeListeners(), this._media.on("end", this._handleMediaEnded), this._media.on("start", this._handleMediaStarted), this._media.on("stop", this._handleMediaStopped), this._media.on("pause", this._handleMediaPaused), this._media.on("progress", this._handleMediaProgress), this._media.on("resumed", this._handleMediaResumed);
  }
  removeListeners() {
    this.media && (this._media.off("end", this._handleMediaEnded), this._media.off("start", this._handleMediaStarted), this._media.off("stop", this._handleMediaStopped), this._media.off("pause", this._handleMediaPaused), this._media.off("progress", this._handleMediaProgress), this._media.off("resumed", this._handleMediaResumed));
  }
  destroy() {
    this.stop(), this.removeListeners();
  }
  fadeTo(t, e) {
    return gsapWithCSS.to(this.media, { volume: t, duration: e });
  }
  play(t) {
    this._isPlaying = true, t ? this.media.play({ start: t }) : this.media.play({});
  }
  _handleMediaEnded() {
    this._isPlaying = false, this.onEnd.emit(this);
  }
  _handleMediaStarted() {
    this._isPlaying = true, this.onStart.emit(this);
  }
  _handleMediaStopped() {
    this._isPlaying = false, this.onStop.emit(this);
  }
  _handleMediaPaused() {
    this._isPlaying = false, this.onPaused.emit(this);
  }
  _handleMediaProgress() {
    this.onProgress.emit(this);
  }
  _handleMediaResumed() {
    this._isPlaying = true, this.onResumed.emit(this);
  }
};
var Fe;
function $i(s) {
  return Fe = s, s;
}
function pt() {
  return Fe;
}
var Wt = class {
  /**
   * Dezippering is removed in the future Web Audio API, instead
   * we use the `setValueAtTime` method, however, this is not available
   * in all environments (e.g., Android webview), so we fallback to the `value` setter.
   * @param param - AudioNode parameter object
   * @param value - Value to set
   * @return The value set
   */
  static setParamValue(t, e) {
    if (t.setValueAtTime) {
      const i = pt().context;
      t.setValueAtTime(e, i.audioContext.currentTime);
    } else
      t.value = e;
    return e;
  }
};
var Wi = class extends eventemitter3_default {
  constructor() {
    super(...arguments), this.speed = 1, this.muted = false, this.volume = 1, this.paused = false;
  }
  /** Internal trigger when volume, mute or speed changes */
  refresh() {
    this.emit("refresh");
  }
  /** Internal trigger paused changes */
  refreshPaused() {
    this.emit("refreshPaused");
  }
  /**
   * HTML Audio does not support filters, this is non-functional API.
   */
  get filters() {
    return console.warn("HTML Audio does not support filters"), null;
  }
  set filters(t) {
    console.warn("HTML Audio does not support filters");
  }
  /**
   * HTML Audio does not support `audioContext`
   * @readonly
   * @type {AudioContext}
   */
  get audioContext() {
    return console.warn("HTML Audio does not support audioContext"), null;
  }
  /**
   * Toggles the muted state.
   * @return The current muted state.
   */
  toggleMute() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }
  /**
   * Toggles the paused state.
   * @return The current paused state.
   */
  togglePause() {
    return this.paused = !this.paused, this.refreshPaused(), this.paused;
  }
  /** Destroy and don't use after this */
  destroy() {
    this.removeAllListeners();
  }
};
var Ki = 0;
var Kt = class extends eventemitter3_default {
  /** @param parent - Parent element */
  constructor(s) {
    super(), this.id = Ki++, this.init(s);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set
   * @param value - Value to set property to
   */
  set(s, t) {
    if (this[s] === void 0)
      throw new Error(`Property with name ${s} does not exist.`);
    switch (s) {
      case "speed":
        this.speed = t;
        break;
      case "volume":
        this.volume = t;
        break;
      case "paused":
        this.paused = t;
        break;
      case "loop":
        this.loop = t;
        break;
      case "muted":
        this.muted = t;
        break;
    }
    return this;
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    const { currentTime: s } = this._source;
    return s / this._duration;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(s) {
    this._paused = s, this.refreshPaused();
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPlay() {
    this._playing = true;
  }
  /**
   * Reference: http://stackoverflow.com/a/40370077
   * @private
   */
  _onPause() {
    this._playing = false;
  }
  /**
   * Initialize the instance.
   * @param {htmlaudio.HTMLAudioMedia} media - Same as constructor
   */
  init(s) {
    this._playing = false, this._duration = s.source.duration;
    const t = this._source = s.source.cloneNode(false);
    t.src = s.parent.url, t.onplay = this._onPlay.bind(this), t.onpause = this._onPause.bind(this), s.context.on("refresh", this.refresh, this), s.context.on("refreshPaused", this.refreshPaused, this), this._media = s;
  }
  /**
   * Stop the sound playing
   * @private
   */
  _internalStop() {
    this._source && this._playing && (this._source.onended = null, this._source.pause());
  }
  /** Stop the sound playing */
  stop() {
    this._internalStop(), this._source && this.emit("stop");
  }
  /** Set the instance speed from 0 to 1 */
  get speed() {
    return this._speed;
  }
  set speed(s) {
    this._speed = s, this.refresh();
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(s) {
    this._volume = s, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(s) {
    this._loop = s, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(s) {
    this._muted = s, this.refresh();
  }
  /**
   * HTML Audio does not support filters, this is non-functional API.
   */
  get filters() {
    return console.warn("HTML Audio does not support filters"), null;
  }
  set filters(s) {
    console.warn("HTML Audio does not support filters");
  }
  /** Call whenever the loop, speed or volume changes */
  refresh() {
    const s = this._media.context, t = this._media.parent;
    this._source.loop = this._loop || t.loop;
    const e = s.volume * (s.muted ? 0 : 1), i = t.volume * (t.muted ? 0 : 1), n = this._volume * (this._muted ? 0 : 1);
    this._source.volume = n * e * i, this._source.playbackRate = this._speed * s.speed * t.speed;
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const s = this._media.context, t = this._media.parent, e = this._paused || t.paused || s.paused;
    e !== this._pausedReal && (this._pausedReal = e, e ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._source.currentTime,
      end: this._end,
      volume: this._volume,
      speed: this._speed,
      loop: this._loop
    })), this.emit("pause", e));
  }
  /** Start playing the sound/ */
  play(s) {
    const { start: t, end: e, speed: i, loop: n, volume: o, muted: r } = s;
    e && console.assert(e > t, "End time is before start time"), this._speed = i, this._volume = o, this._loop = !!n, this._muted = r, this.refresh(), this.loop && e !== null && (console.warn('Looping not support when specifying an "end" time'), this.loop = false), this._start = t, this._end = e || this._duration, this._start = Math.max(0, this._start - Kt.PADDING), this._end = Math.min(this._end + Kt.PADDING, this._duration), this._source.onloadedmetadata = () => {
      this._source && (this._source.currentTime = t, this._source.onloadedmetadata = null, this.emit("progress", t / this._duration, this._duration), Ticker.shared.add(this._onUpdate, this));
    }, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
  }
  /**
   * Handle time update on sound.
   * @private
   */
  _onUpdate() {
    this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
  }
  /**
   * Callback when completed.
   * @private
   */
  _onComplete() {
    Ticker.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
  }
  /** Don't use after this. */
  destroy() {
    Ticker.shared.remove(this._onUpdate, this), this.removeAllListeners();
    const s = this._source;
    s && (s.onended = null, s.onplay = null, s.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = false, this._end = null, this._start = 0, this._duration = 0, this._playing = false, this._pausedReal = false, this._paused = false, this._muted = false, this._media && (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), this._media = null);
  }
  /**
   * To string method for instance.
   * @return The string representation of instance.
   */
  toString() {
    return `[HTMLAudioInstance id=${this.id}]`;
  }
};
var Oe = Kt;
Oe.PADDING = 0.1;
var ji = class extends eventemitter3_default {
  init(t) {
    this.parent = t, this._source = t.options.source || new Audio(), t.url && (this._source.src = t.url);
  }
  // Implement create
  create() {
    return new Oe(this);
  }
  /**
   * If the audio media is playable (ready).
   * @readonly
   */
  get isPlayable() {
    return !!this._source && this._source.readyState === 4;
  }
  /**
   * THe duration of the media in seconds.
   * @readonly
   */
  get duration() {
    return this._source.duration;
  }
  /**
   * Reference to the context.
   * @readonly
   */
  get context() {
    return this.parent.context;
  }
  /** The collection of filters, does not apply to HTML Audio. */
  get filters() {
    return null;
  }
  set filters(t) {
    console.warn("HTML Audio does not support filters");
  }
  // Override the destroy
  destroy() {
    this.removeAllListeners(), this.parent = null, this._source && (this._source.src = "", this._source.load(), this._source = null);
  }
  /**
   * Get the audio source element.
   * @type {HTMLAudioElement}
   * @readonly
   */
  get source() {
    return this._source;
  }
  // Implement the method to being preloading
  load(t) {
    const e = this._source, i = this.parent;
    if (e.readyState === 4) {
      i.isLoaded = true;
      const h = i.autoPlayStart();
      t && setTimeout(() => {
        t(null, i, h);
      }, 0);
      return;
    }
    if (!i.url) {
      t(new Error("sound.url or sound.source must be set"));
      return;
    }
    e.src = i.url;
    const n = () => {
      a(), i.isLoaded = true;
      const h = i.autoPlayStart();
      t && t(null, i, h);
    }, o = () => {
      a(), t && t(new Error("Sound loading has been aborted"));
    }, r = () => {
      a();
      const h = `Failed to load audio element (code: ${e.error.code})`;
      t ? t(new Error(h)) : console.error(h);
    }, a = () => {
      e.removeEventListener("canplaythrough", n), e.removeEventListener("load", n), e.removeEventListener("abort", o), e.removeEventListener("error", r);
    };
    e.addEventListener("canplaythrough", n, false), e.addEventListener("load", n, false), e.addEventListener("abort", o, false), e.addEventListener("error", r, false), e.load();
  }
};
var Hi = class {
  /**
   * @param parent - The parent sound
   * @param options - Data associated with object.
   */
  constructor(t, e) {
    this.parent = t, Object.assign(this, e), this.duration = this.end - this.start, console.assert(this.duration > 0, "End time must be after start time");
  }
  /**
   * Play the sound sprite.
   * @param {Function} [complete] - Function call when complete
   * @return Sound instance being played.
   */
  play(t) {
    return this.parent.play({
      complete: t,
      speed: this.speed || this.parent.speed,
      end: this.end,
      start: this.start,
      loop: this.loop
    });
  }
  /** Destroy and don't use after this */
  destroy() {
    this.parent = null;
  }
};
var St = [
  "ogg",
  "oga",
  "opus",
  "m4a",
  "mp3",
  "mpeg",
  "wav",
  "aiff",
  "wma",
  "mid",
  "caf"
];
var Gi = [
  "audio/mpeg",
  "audio/ogg"
];
var Pt = {};
function Vi(s) {
  const t = {
    m4a: "audio/mp4",
    oga: "audio/ogg",
    opus: 'audio/ogg; codecs="opus"',
    caf: 'audio/x-caf; codecs="opus"'
  }, e = document.createElement("audio"), i = {}, n = /^no$/;
  St.forEach((o) => {
    const r = e.canPlayType(`audio/${o}`).replace(n, ""), a = t[o] ? e.canPlayType(t[o]).replace(n, "") : "";
    i[o] = !!r || !!a;
  }), Object.assign(Pt, i);
}
Vi();
var Xi = 0;
var qi = class extends eventemitter3_default {
  constructor(t) {
    super(), this.id = Xi++, this._media = null, this._paused = false, this._muted = false, this._elapsed = 0, this.init(t);
  }
  /**
   * Set a property by name, this makes it easy to chain values
   * @param name - Name of the property to set.
   * @param value - Value to set property to.
   */
  set(t, e) {
    if (this[t] === void 0)
      throw new Error(`Property with name ${t} does not exist.`);
    switch (t) {
      case "speed":
        this.speed = e;
        break;
      case "volume":
        this.volume = e;
        break;
      case "muted":
        this.muted = e;
        break;
      case "loop":
        this.loop = e;
        break;
      case "paused":
        this.paused = e;
        break;
    }
    return this;
  }
  /** Stops the instance, don't use after this. */
  stop() {
    this._source && (this._internalStop(), this.emit("stop"));
  }
  /** Set the instance speed from 0 to 1 */
  get speed() {
    return this._speed;
  }
  set speed(t) {
    this._speed = t, this.refresh(), this._update(true);
  }
  /** Get the set the volume for this instance from 0 to 1 */
  get volume() {
    return this._volume;
  }
  set volume(t) {
    this._volume = t, this.refresh();
  }
  /** `true` if the sound is muted */
  get muted() {
    return this._muted;
  }
  set muted(t) {
    this._muted = t, this.refresh();
  }
  /** If the sound instance should loop playback */
  get loop() {
    return this._loop;
  }
  set loop(t) {
    this._loop = t, this.refresh();
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(t) {
    var e;
    this._filters && ((e = this._filters) == null || e.filter((i) => i).forEach((i) => i.disconnect()), this._filters = null, this._source.connect(this._gain)), this._filters = t != null && t.length ? t.slice(0) : null, this.refresh();
  }
  /** Refresh loop, volume and speed based on changes to parent */
  refresh() {
    if (!this._source)
      return;
    const t = this._media.context, e = this._media.parent;
    this._source.loop = this._loop || e.loop;
    const i = t.volume * (t.muted ? 0 : 1), n = e.volume * (e.muted ? 0 : 1), o = this._volume * (this._muted ? 0 : 1);
    Wt.setParamValue(this._gain.gain, o * n * i), Wt.setParamValue(this._source.playbackRate, this._speed * e.speed * t.speed), this.applyFilters();
  }
  /** Connect filters nodes to audio context */
  applyFilters() {
    var t;
    if ((t = this._filters) != null && t.length) {
      this._source.disconnect();
      let e = this._source;
      this._filters.forEach((i) => {
        e.connect(i.destination), e = i;
      }), e.connect(this._gain);
    }
  }
  /** Handle changes in paused state, either globally or sound or instance */
  refreshPaused() {
    const t = this._media.context, e = this._media.parent, i = this._paused || e.paused || t.paused;
    i !== this._pausedReal && (this._pausedReal = i, i ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
      start: this._elapsed % this._duration,
      end: this._end,
      speed: this._speed,
      loop: this._loop,
      volume: this._volume
    })), this.emit("pause", i));
  }
  /**
   * Plays the sound.
   * @param options - Play options.
   */
  play(t) {
    const { start: e, end: i, speed: n, loop: o, volume: r, muted: a, filters: h } = t;
    i && console.assert(i > e, "End time is before start time"), this._paused = false;
    const { source: c, gain: l } = this._media.nodes.cloneBufferSource();
    this._source = c, this._gain = l, this._speed = n, this._volume = r, this._loop = !!o, this._muted = a, this._filters = h, this.refresh();
    const d = this._source.buffer.duration;
    this._duration = d, this._end = i, this._lastUpdate = this._now(), this._elapsed = e, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = i, this._source.loopStart = e, this._source.start(0, e)) : i ? this._source.start(0, e, i - e) : this._source.start(0, e), this.emit("start"), this._update(true), this.enableTicker(true);
  }
  /** Start the update progress. */
  enableTicker(t) {
    Ticker.shared.remove(this._updateListener, this), t && Ticker.shared.add(this._updateListener, this);
  }
  /** The current playback progress from 0 to 1. */
  get progress() {
    return this._progress;
  }
  /** Pauses the sound. */
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t, this.refreshPaused();
  }
  /** Don't use after this. */
  destroy() {
    var t;
    this.removeAllListeners(), this._internalStop(), this._gain && (this._gain.disconnect(), this._gain = null), this._media && (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), this._media = null), (t = this._filters) == null || t.forEach((e) => e.disconnect()), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = false, this._elapsed = 0, this._duration = 0, this._paused = false, this._muted = false, this._pausedReal = false;
  }
  /**
   * To string method for instance.
   * @return The string representation of instance.
   */
  toString() {
    return `[WebAudioInstance id=${this.id}]`;
  }
  /**
   * Get the current time in seconds.
   * @return Seconds since start of context
   */
  _now() {
    return this._media.context.audioContext.currentTime;
  }
  /** Callback for update listener */
  _updateListener() {
    this._update();
  }
  /** Internal update the progress. */
  _update(t = false) {
    if (this._source) {
      const e = this._now(), i = e - this._lastUpdate;
      if (i > 0 || t) {
        const n = this._source.playbackRate.value;
        this._elapsed += i * n, this._lastUpdate = e;
        const o = this._duration;
        let r;
        if (this._source.loopStart) {
          const a = this._source.loopEnd - this._source.loopStart;
          r = (this._source.loopStart + this._elapsed % a) / o;
        } else
          r = this._elapsed % o / o;
        this._progress = r, this.emit("progress", this._progress, o);
      }
    }
  }
  /** Initializes the instance. */
  init(t) {
    this._media = t, t.context.events.on("refresh", this.refresh, this), t.context.events.on("refreshPaused", this.refreshPaused, this);
  }
  /** Stops the instance. */
  _internalStop() {
    if (this._source) {
      this.enableTicker(false), this._source.onended = null, this._source.stop(0), this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (t) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
      }
      this._source = null;
    }
  }
  /** Callback when completed. */
  _onComplete() {
    if (this._source) {
      this.enableTicker(false), this._source.onended = null, this._source.disconnect();
      try {
        this._source.buffer = null;
      } catch (t) {
        console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
      }
    }
    this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
  }
};
var ze = class {
  /**
   * @param input - The source audio node
   * @param output - The output audio node
   */
  constructor(t, e) {
    this._output = e, this._input = t;
  }
  /** The destination output audio node */
  get destination() {
    return this._input;
  }
  /** The collection of filters. */
  get filters() {
    return this._filters;
  }
  set filters(t) {
    if (this._filters && (this._filters.forEach((e) => {
      e && e.disconnect();
    }), this._filters = null, this._input.connect(this._output)), t && t.length) {
      this._filters = t.slice(0), this._input.disconnect();
      let e = null;
      t.forEach((i) => {
        e === null ? this._input.connect(i.destination) : e.connect(i.destination), e = i;
      }), e.connect(this._output);
    }
  }
  /** Cleans up. */
  destroy() {
    this.filters = null, this._input = null, this._output = null;
  }
};
var Be = class extends ze {
  /**
   * @param context - The audio context.
   */
  constructor(s) {
    const t = s.audioContext, e = t.createBufferSource(), i = t.createGain(), n = t.createAnalyser();
    e.connect(n), n.connect(i), i.connect(s.destination), super(n, i), this.context = s, this.bufferSource = e, this.gain = i, this.analyser = n;
  }
  /**
   * Get the script processor node.
   * @readonly
   */
  get script() {
    return this._script || (this._script = this.context.audioContext.createScriptProcessor(Be.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
  }
  /** Cleans up. */
  destroy() {
    super.destroy(), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
  }
  /**
   * Clones the bufferSource. Used just before playing a sound.
   * @returns {SourceClone} The clone AudioBufferSourceNode.
   */
  cloneBufferSource() {
    const s = this.bufferSource, t = this.context.audioContext.createBufferSource();
    t.buffer = s.buffer, Wt.setParamValue(t.playbackRate, s.playbackRate.value), t.loop = s.loop;
    const e = this.context.audioContext.createGain();
    return t.connect(e), e.connect(this.destination), { source: t, gain: e };
  }
  /**
   * Get buffer size of `ScriptProcessorNode`.
   * @readonly
   */
  get bufferSize() {
    return this.script.bufferSize;
  }
};
var Ie = Be;
Ie.BUFFER_SIZE = 0;
var Yi = class {
  /**
   * Re-initialize without constructing.
   * @param parent - - Instance of parent Sound container
   */
  init(t) {
    this.parent = t, this._nodes = new Ie(this.context), this._source = this._nodes.bufferSource, this.source = t.options.source;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this.parent = null, this._nodes.destroy(), this._nodes = null;
    try {
      this._source.buffer = null;
    } catch (t) {
      console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t);
    }
    this._source = null, this.source = null;
  }
  // Implement create
  create() {
    return new qi(this);
  }
  // Implement context
  get context() {
    return this.parent.context;
  }
  // Implement isPlayable
  get isPlayable() {
    return !!this._source && !!this._source.buffer;
  }
  // Implement filters
  get filters() {
    return this._nodes.filters;
  }
  set filters(t) {
    this._nodes.filters = t;
  }
  // Implements duration
  get duration() {
    return console.assert(this.isPlayable, "Sound not yet playable, no duration"), this._source.buffer.duration;
  }
  /** Gets and sets the buffer. */
  get buffer() {
    return this._source.buffer;
  }
  set buffer(t) {
    this._source.buffer = t;
  }
  /** Get the current chained nodes object */
  get nodes() {
    return this._nodes;
  }
  // Implements load
  load(t) {
    this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t ? t(new Error("sound.url or sound.source must be set")) : console.error("sound.url or sound.source must be set");
  }
  /** Loads a sound using XHMLHttpRequest object. */
  async _loadUrl(t) {
    const e = this.parent.url, i = await DOMAdapter.get().fetch(e);
    this._decode(await i.arrayBuffer(), t);
  }
  /**
   * Decodes the array buffer.
   * @param arrayBuffer - From load.
   * @param {Function} callback - Callback optional
   */
  _decode(t, e) {
    const i = (n, o) => {
      if (n)
        e && e(n);
      else {
        this.parent.isLoaded = true, this.buffer = o;
        const r = this.parent.autoPlayStart();
        e && e(null, this.parent, r);
      }
    };
    t instanceof AudioBuffer ? i(null, t) : this.parent.context.decode(t, i);
  }
};
var N = class {
  /**
   * Create a new sound instance from source.
   * @param source - Either the path or url to the source file.
   *        or the object of options to use.
   * @return Created sound instance.
   */
  static from(s) {
    let t = {};
    typeof s == "string" ? t.url = s : s instanceof ArrayBuffer || s instanceof AudioBuffer || s instanceof HTMLAudioElement ? t.source = s : Array.isArray(s) ? t.url = s : t = s, t = {
      autoPlay: false,
      singleInstance: false,
      url: null,
      source: null,
      preload: false,
      volume: 1,
      speed: 1,
      complete: null,
      loaded: null,
      loop: false,
      ...t
    }, Object.freeze(t);
    const e = pt().useLegacy ? new ji() : new Yi();
    return new N(e, t);
  }
  /**
   * Use `Sound.from`
   * @ignore
   */
  constructor(s, t) {
    this.media = s, this.options = t, this._instances = [], this._sprites = {}, this.media.init(this);
    const e = t.complete;
    this._autoPlayOptions = e ? { complete: e } : null, this.isLoaded = false, this._preloadQueue = null, this.isPlaying = false, this.autoPlay = t.autoPlay, this.singleInstance = t.singleInstance, this.preload = t.preload || this.autoPlay, this.url = Array.isArray(t.url) ? this.preferUrl(t.url) : t.url, this.speed = t.speed, this.volume = t.volume, this.loop = t.loop, t.sprites && this.addSprites(t.sprites), this.preload && this._preload(t.loaded);
  }
  /**
   * Internal help for resolving which file to use if there are multiple provide
   * this is especially helpful for working with bundlers (non Assets loading).
   */
  preferUrl(s) {
    const [t] = s.map((e) => ({ url: e, ext: path.extname(e).slice(1) })).filter(({ ext: e }) => Pt[e]).sort((e, i) => St.indexOf(e.ext) - St.indexOf(i.ext));
    if (!t)
      throw new Error("No supported file type found");
    return t.url;
  }
  /** Instance of the media context. */
  get context() {
    return pt().context;
  }
  /** Stops all the instances of this sound from playing. */
  pause() {
    return this.isPlaying = false, this.paused = true, this;
  }
  /** Resuming all the instances of this sound from playing */
  resume() {
    return this.isPlaying = this._instances.length > 0, this.paused = false, this;
  }
  /** Stops all the instances of this sound from playing. */
  get paused() {
    return this._paused;
  }
  set paused(s) {
    this._paused = s, this.refreshPaused();
  }
  /** The playback rate. */
  get speed() {
    return this._speed;
  }
  set speed(s) {
    this._speed = s, this.refresh();
  }
  /** Set the filters. Only supported with WebAudio. */
  get filters() {
    return this.media.filters;
  }
  set filters(s) {
    this.media.filters = s;
  }
  /**
   * @ignore
   */
  addSprites(s, t) {
    if (typeof s == "object") {
      const i = {};
      for (const n in s)
        i[n] = this.addSprites(n, s[n]);
      return i;
    }
    console.assert(!this._sprites[s], `Alias ${s} is already taken`);
    const e = new Hi(this, t);
    return this._sprites[s] = e, e;
  }
  /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
  destroy() {
    this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
  }
  /**
   * Remove a sound sprite.
   * @param alias - The unique name of the sound sprite, if alias is omitted, removes all sprites.
   */
  removeSprites(s) {
    if (s) {
      const t = this._sprites[s];
      t !== void 0 && (t.destroy(), delete this._sprites[s]);
    } else
      for (const t in this._sprites)
        this.removeSprites(t);
    return this;
  }
  /** If the current sound is playable (loaded). */
  get isPlayable() {
    return this.isLoaded && this.media && this.media.isPlayable;
  }
  /** Stops all the instances of this sound from playing. */
  stop() {
    if (!this.isPlayable)
      return this.autoPlay = false, this._autoPlayOptions = null, this;
    this.isPlaying = false;
    for (let s = this._instances.length - 1; s >= 0; s--)
      this._instances[s].stop();
    return this;
  }
  // Overloaded function
  play(s, t) {
    let e;
    if (typeof s == "string" ? e = { sprite: s, loop: this.loop, complete: t } : typeof s == "function" ? (e = {}, e.complete = s) : e = s, e = {
      complete: null,
      loaded: null,
      sprite: null,
      end: null,
      start: 0,
      volume: 1,
      speed: 1,
      muted: false,
      loop: false,
      ...e || {}
    }, e.sprite) {
      const n = e.sprite;
      console.assert(!!this._sprites[n], `Alias ${n} is not available`);
      const o = this._sprites[n];
      e.start = o.start + (e.start || 0), e.end = o.end, e.speed = o.speed || 1, e.loop = o.loop || e.loop, delete e.sprite;
    }
    if (e.offset && (e.start = e.offset), !this.isLoaded)
      return this._preloadQueue ? new Promise((n) => {
        this._preloadQueue.push(() => {
          n(this.play(e));
        });
      }) : (this._preloadQueue = [], this.autoPlay = true, this._autoPlayOptions = e, new Promise((n, o) => {
        this._preload((r, a, h) => {
          this._preloadQueue.forEach((c) => c()), this._preloadQueue = null, r ? o(r) : (e.loaded && e.loaded(r, a, h), n(h));
        });
      }));
    (this.singleInstance || e.singleInstance) && this._removeInstances();
    const i = this._createInstance();
    return this._instances.push(i), this.isPlaying = true, i.once("end", () => {
      e.complete && e.complete(this), this._onComplete(i);
    }), i.once("stop", () => {
      this._onComplete(i);
    }), i.play(e), i;
  }
  /** Internal only, speed, loop, volume change occured. */
  refresh() {
    const s = this._instances.length;
    for (let t = 0; t < s; t++)
      this._instances[t].refresh();
  }
  /** Handle changes in paused state. Internal only. */
  refreshPaused() {
    const s = this._instances.length;
    for (let t = 0; t < s; t++)
      this._instances[t].refreshPaused();
  }
  /** Gets and sets the volume. */
  get volume() {
    return this._volume;
  }
  set volume(s) {
    this._volume = s, this.refresh();
  }
  /** Gets and sets the muted flag. */
  get muted() {
    return this._muted;
  }
  set muted(s) {
    this._muted = s, this.refresh();
  }
  /** Gets and sets the looping. */
  get loop() {
    return this._loop;
  }
  set loop(s) {
    this._loop = s, this.refresh();
  }
  /** Starts the preloading of sound. */
  _preload(s) {
    this.media.load(s);
  }
  /** Gets the list of instances that are currently being played of this sound. */
  get instances() {
    return this._instances;
  }
  /** Get the map of sprites. */
  get sprites() {
    return this._sprites;
  }
  /** Get the duration of the audio in seconds. */
  get duration() {
    return this.media.duration;
  }
  /** Auto play the first instance. */
  autoPlayStart() {
    let s;
    return this.autoPlay && (s = this.play(this._autoPlayOptions)), s;
  }
  /** Removes all instances. */
  _removeInstances() {
    for (let s = this._instances.length - 1; s >= 0; s--)
      this._poolInstance(this._instances[s]);
    this._instances.length = 0;
  }
  /**
   * Sound instance completed.
   * @param instance
   */
  _onComplete(s) {
    if (this._instances) {
      const t = this._instances.indexOf(s);
      t > -1 && this._instances.splice(t, 1), this.isPlaying = this._instances.length > 0;
    }
    this._poolInstance(s);
  }
  /** Create a new instance. */
  _createInstance() {
    if (N._pool.length > 0) {
      const s = N._pool.pop();
      return s.init(this.media), s;
    }
    return this.media.create();
  }
  /**
   * Destroy/recycling the instance object.
   * @param instance - Instance to recycle
   */
  _poolInstance(s) {
    s.destroy(), N._pool.indexOf(s) < 0 && N._pool.push(s);
  }
};
var kt = N;
kt._pool = [];
var _t = class __t extends ze {
  constructor() {
    const t = window, e = new __t.AudioContext(), i = e.createDynamicsCompressor(), n = e.createAnalyser();
    n.connect(i), i.connect(e.destination), super(n, i), this.autoPause = true, this._ctx = e, this._offlineCtx = new __t.OfflineAudioContext(
      1,
      2,
      t.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, e.sampleRate)) : 44100
    ), this.compressor = i, this.analyser = n, this.events = new eventemitter3_default(), this.volume = 1, this.speed = 1, this.muted = false, this.paused = false, this._locked = e.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), this._locked && (this._unlock(), this._unlock = this._unlock.bind(this), document.addEventListener("mousedown", this._unlock, true), document.addEventListener("touchstart", this._unlock, true), document.addEventListener("touchend", this._unlock, true)), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), globalThis.addEventListener("focus", this.onFocus), globalThis.addEventListener("blur", this.onBlur);
  }
  /** Handle mobile WebAudio context resume */
  onFocus() {
    if (!this.autoPause)
      return;
    const t = this._ctx.state;
    (t === "suspended" || t === "interrupted" || !this._locked) && (this.paused = this._pausedOnBlur, this.refreshPaused());
  }
  /** Handle mobile WebAudio context suspend */
  onBlur() {
    this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = true, this.refreshPaused()));
  }
  /**
   * Try to unlock audio on iOS. This is triggered from either WebAudio plugin setup (which will work if inside of
   * a `mousedown` or `touchend` event stack), or the first document touchend/mousedown event. If it fails (touchend
   * will fail if the user presses for too long, indicating a scroll event instead of a click event.
   *
   * Note that earlier versions of iOS supported `touchstart` for this, but iOS9 removed this functionality. Adding
   * a `touchstart` event to support older platforms may preclude a `mousedown` even from getting fired on iOS9, so we
   * stick with `mousedown` and `touchend`.
   */
  _unlock() {
    this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, true), document.removeEventListener("touchend", this._unlock, true), document.removeEventListener("touchstart", this._unlock, true), this._locked = false));
  }
  /**
   * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
   * require the first sound to be played inside of a user initiated event (touch/click).
   */
  playEmptySound() {
    const t = this._ctx.createBufferSource();
    t.buffer = this._ctx.createBuffer(1, 1, 22050), t.connect(this._ctx.destination), t.start(0, 0, 0), t.context.state === "suspended" && t.context.resume();
  }
  /**
   * Get AudioContext class, if not supported returns `null`
   * @type {AudioContext}
   * @readonly
   */
  static get AudioContext() {
    const t = window;
    return t.AudioContext || t.webkitAudioContext || null;
  }
  /**
   * Get OfflineAudioContext class, if not supported returns `null`
   * @type {OfflineAudioContext}
   * @readonly
   */
  static get OfflineAudioContext() {
    const t = window;
    return t.OfflineAudioContext || t.webkitOfflineAudioContext || null;
  }
  /** Destroy this context. */
  destroy() {
    super.destroy();
    const t = this._ctx;
    typeof t.close < "u" && t.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
  }
  /**
   * The WebAudio API AudioContext object.
   * @readonly
   * @type {AudioContext}
   */
  get audioContext() {
    return this._ctx;
  }
  /**
   * The WebAudio API OfflineAudioContext object.
   * @readonly
   * @type {OfflineAudioContext}
   */
  get offlineContext() {
    return this._offlineCtx;
  }
  /**
   * Pauses all sounds, even though we handle this at the instance
   * level, we'll also pause the audioContext so that the
   * time used to compute progress isn't messed up.
   * @default false
   */
  set paused(t) {
    t && this._ctx.state === "running" ? this._ctx.suspend() : !t && this._ctx.state === "suspended" && this._ctx.resume(), this._paused = t;
  }
  get paused() {
    return this._paused;
  }
  /** Emit event when muted, volume or speed changes */
  refresh() {
    this.events.emit("refresh");
  }
  /** Emit event when muted, volume or speed changes */
  refreshPaused() {
    this.events.emit("refreshPaused");
  }
  /**
   * Toggles the muted state.
   * @return The current muted state.
   */
  toggleMute() {
    return this.muted = !this.muted, this.refresh(), this.muted;
  }
  /**
   * Toggles the paused state.
   * @return The current muted state.
   */
  togglePause() {
    return this.paused = !this.paused, this.refreshPaused(), this._paused;
  }
  /**
   * Decode the audio data
   * @param arrayBuffer - Buffer from loader
   * @param callback - When completed, error and audioBuffer are parameters.
   */
  decode(t, e) {
    const i = (o) => {
      e(new Error((o == null ? void 0 : o.message) || "Unable to decode file"));
    }, n = this._offlineCtx.decodeAudioData(
      t,
      (o) => {
        e(null, o);
      },
      i
    );
    n && n.catch(i);
  }
};
var Ni = class {
  constructor() {
    this.init();
  }
  /**
   * Re-initialize the sound library, this will
   * recreate the AudioContext. If there's a hardware-failure
   * call `close` and then `init`.
   * @return Sound instance
   */
  init() {
    return this.supported && (this._webAudioContext = new _t()), this._htmlAudioContext = new Wi(), this._sounds = {}, this.useLegacy = !this.supported, this;
  }
  /**
   * The global context to use.
   * @readonly
   */
  get context() {
    return this._context;
  }
  /**
   * Apply filters to all sounds. Can be useful
   * for setting global planning or global effects.
   * **Only supported with WebAudio.**
   * @example
   * import { sound, filters } from '@pixi/sound';
   * // Adds a filter to pan all output left
   * sound.filtersAll = [
   *     new filters.StereoFilter(-1)
   * ];
   */
  get filtersAll() {
    return this.useLegacy ? [] : this._context.filters;
  }
  set filtersAll(t) {
    this.useLegacy || (this._context.filters = t);
  }
  /**
   * `true` if WebAudio is supported on the current browser.
   */
  get supported() {
    return _t.AudioContext !== null;
  }
  /**
   * @ignore
   */
  add(t, e) {
    if (typeof t == "object") {
      const o = {};
      for (const r in t) {
        const a = this._getOptions(
          t[r],
          e
        );
        o[r] = this.add(r, a);
      }
      return o;
    }
    if (console.assert(!this._sounds[t], `Sound with alias ${t} already exists.`), e instanceof kt)
      return this._sounds[t] = e, e;
    const i = this._getOptions(e), n = kt.from(i);
    return this._sounds[t] = n, n;
  }
  /**
   * Internal methods for getting the options object
   * @private
   * @param source - The source options
   * @param overrides - Override default options
   * @return The construction options
   */
  _getOptions(t, e) {
    let i;
    return typeof t == "string" ? i = { url: t } : Array.isArray(t) ? i = { url: t } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? i = { source: t } : i = t, i = { ...i, ...e || {} }, i;
  }
  /**
   * Do not use WebAudio, force the use of legacy. This **must** be called before loading any files.
   */
  get useLegacy() {
    return this._useLegacy;
  }
  set useLegacy(t) {
    this._useLegacy = t, this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext;
  }
  /**
   * This disables auto-pause all playback when the window blurs (WebAudio only).
   * This is helpful to keep from playing sounds when the user switches tabs.
   * However, if you're running content within an iframe, this may be undesirable
   * and you should disable (set to `true`) this behavior.
   * @default false
   */
  get disableAutoPause() {
    return !this._webAudioContext.autoPause;
  }
  set disableAutoPause(t) {
    this._webAudioContext.autoPause = !t;
  }
  /**
   * Removes a sound by alias.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  remove(t) {
    return this.exists(t, true), this._sounds[t].destroy(), delete this._sounds[t], this;
  }
  /**
   * Set the global volume for all sounds. To set per-sound volume see {@link SoundLibrary#volume}.
   */
  get volumeAll() {
    return this._context.volume;
  }
  set volumeAll(t) {
    this._context.volume = t, this._context.refresh();
  }
  /**
   * Set the global speed for all sounds. To set per-sound speed see {@link SoundLibrary#speed}.
   */
  get speedAll() {
    return this._context.speed;
  }
  set speedAll(t) {
    this._context.speed = t, this._context.refresh();
  }
  /**
   * Toggle paused property for all sounds.
   * @return `true` if all sounds are paused.
   */
  togglePauseAll() {
    return this._context.togglePause();
  }
  /**
   * Pauses any playing sounds.
   * @return Instance for chaining.
   */
  pauseAll() {
    return this._context.paused = true, this._context.refreshPaused(), this;
  }
  /**
   * Resumes any sounds.
   * @return Instance for chaining.
   */
  resumeAll() {
    return this._context.paused = false, this._context.refreshPaused(), this;
  }
  /**
   * Toggle muted property for all sounds.
   * @return `true` if all sounds are muted.
   */
  toggleMuteAll() {
    return this._context.toggleMute();
  }
  /**
   * Mutes all playing sounds.
   * @return Instance for chaining.
   */
  muteAll() {
    return this._context.muted = true, this._context.refresh(), this;
  }
  /**
   * Unmutes all playing sounds.
   * @return Instance for chaining.
   */
  unmuteAll() {
    return this._context.muted = false, this._context.refresh(), this;
  }
  /**
   * Stops and removes all sounds. They cannot be used after this.
   * @return Instance for chaining.
   */
  removeAll() {
    for (const t in this._sounds)
      this._sounds[t].destroy(), delete this._sounds[t];
    return this;
  }
  /**
   * Stops all sounds.
   * @return Instance for chaining.
   */
  stopAll() {
    for (const t in this._sounds)
      this._sounds[t].stop();
    return this;
  }
  /**
   * Checks if a sound by alias exists.
   * @param alias - Check for alias.
   * @param assert - Whether enable console.assert.
   * @return true if the sound exists.
   */
  exists(t, e = false) {
    const i = !!this._sounds[t];
    return e && console.assert(i, `No sound matching alias '${t}'.`), i;
  }
  /**
   * Convenience function to check to see if any sound is playing.
   * @returns `true` if any sound is currently playing.
   */
  isPlaying() {
    for (const t in this._sounds)
      if (this._sounds[t].isPlaying)
        return true;
    return false;
  }
  /**
   * Find a sound by alias.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  find(t) {
    return this.exists(t, true), this._sounds[t];
  }
  /**
   * Plays a sound.
   * @method play
   * @instance
   * @param {string} alias - The sound alias reference.
   * @param {string} sprite - The alias of the sprite to play.
   * @return {IMediaInstance|null} The sound instance, this cannot be reused
   *         after it is done playing. Returns `null` if the sound has not yet loaded.
   */
  /**
   * Plays a sound.
   * @param alias - The sound alias reference.
   * @param {PlayOptions|Function} options - The options or callback when done.
   * @return The sound instance,
   *        this cannot be reused after it is done playing. Returns a Promise if the sound
   *        has not yet loaded.
   */
  play(t, e) {
    return this.find(t).play(e);
  }
  /**
   * Stops a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  stop(t) {
    return this.find(t).stop();
  }
  /**
   * Pauses a sound.
   * @param alias - The sound alias reference.
   * @return Sound object.
   */
  pause(t) {
    return this.find(t).pause();
  }
  /**
   * Resumes a sound.
   * @param alias - The sound alias reference.
   * @return Instance for chaining.
   */
  resume(t) {
    return this.find(t).resume();
  }
  /**
   * Get or set the volume for a sound.
   * @param alias - The sound alias reference.
   * @param volume - Optional current volume to set.
   * @return The current volume.
   */
  volume(t, e) {
    const i = this.find(t);
    return e !== void 0 && (i.volume = e), i.volume;
  }
  /**
   * Get or set the speed for a sound.
   * @param alias - The sound alias reference.
   * @param speed - Optional current speed to set.
   * @return The current speed.
   */
  speed(t, e) {
    const i = this.find(t);
    return e !== void 0 && (i.speed = e), i.speed;
  }
  /**
   * Get the length of a sound in seconds.
   * @param alias - The sound alias reference.
   * @return The current duration in seconds.
   */
  duration(t) {
    return this.find(t).duration;
  }
  /**
   * Closes the sound library. This will release/destroy
   * the AudioContext(s). Can be used safely if you want to
   * initialize the sound library later. Use `init` method.
   */
  close() {
    return this.removeAll(), this._sounds = null, this._webAudioContext && (this._webAudioContext.destroy(), this._webAudioContext = null), this._htmlAudioContext && (this._htmlAudioContext.destroy(), this._htmlAudioContext = null), this._context = null, this;
  }
};
var me = (s) => {
  var i;
  const t = s.src;
  let e = (i = s == null ? void 0 : s.alias) == null ? void 0 : i[0];
  return (!e || s.src === e) && (e = path.basename(t, path.extname(t))), e;
};
var Zi = {
  extension: ExtensionType.Asset,
  detection: {
    test: async () => true,
    add: async (s) => [...s, ...St.filter((t) => Pt[t])],
    remove: async (s) => s.filter((t) => s.includes(t))
  },
  loader: {
    name: "sound",
    extension: {
      type: [ExtensionType.LoadParser],
      priority: LoaderParserPriority.High
    },
    /** Should we attempt to load this file? */
    test(s) {
      const t = path.extname(s).slice(1);
      return !!Pt[t] || Gi.some((e) => s.startsWith(`data:${e}`));
    },
    /** Load the sound file, this is mostly handled by Sound.from() */
    async load(s, t) {
      const e = await new Promise((i, n) => kt.from({
        ...t.data,
        url: s,
        preload: true,
        loaded(o, r) {
          var a, h;
          o ? n(o) : i(r), (h = (a = t.data) == null ? void 0 : a.loaded) == null || h.call(a, o, r);
        }
      }));
      return pt().add(me(t), e), e;
    },
    /** Remove the sound from the library */
    async unload(s, t) {
      pt().remove(me(t));
    }
  }
};
extensions.add(Zi);
var P = $i(new Ni());
var Qi = class extends O {
  /**
   * Creates a new AudioManager instance.
   * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
   */
  constructor(t = "audio") {
    super(t), this.onSoundStarted = new u(), this.onSoundEnded = new u(), this.onMuted = new u(), this.onMasterVolumeChanged = new u(), this.onChannelVolumeChanged = new u(), this._storedVolume = void 0, this._paused = false, this._idMap = /* @__PURE__ */ new Map(), this._masterVolume = 1, this._muted = false, this._channels = /* @__PURE__ */ new Map(), this.createChannel("music"), this.createChannel("sfx"), this.createChannel("voiceover");
  }
  /**
   * Gets the master volume.
   * @returns {number} The master volume.
   */
  get masterVolume() {
    return this._masterVolume;
  }
  /**
   * Sets the master volume.
   * @param {number} value - The new master volume.
   */
  set masterVolume(t) {
    this._masterVolume = t, this._channels.forEach((e) => e.updateVolume());
  }
  /**
   * Gets whether the audio is muted.
   * @returns {boolean} True if the audio is muted, false otherwise.
   */
  get muted() {
    return this._muted;
  }
  /**
   * Sets whether the audio is muted.
   * @param {boolean} value - True to mute the audio, false to unmute.
   */
  set muted(t) {
    this._muted = t, this._setMuted();
  }
  /**
   * Gets the map of audio channels.
   * @returns {Map<string, IAudioChannel>} The map of audio channels.
   */
  get channels() {
    return this._channels;
  }
  get music() {
    return this._channels.get("music");
  }
  get sfx() {
    return this._channels.get("sfx");
  }
  get voiceover() {
    return this._channels.get("voiceover");
  }
  get vo() {
    return this._channels.get("voiceover");
  }
  destroy() {
    this._channels.forEach((t) => {
      t.destroy();
    }), this._channels.clear(), this.onSoundStarted.disconnectAll(), this.onSoundEnded.disconnectAll(), this.onMuted.disconnectAll(), this.onMasterVolumeChanged.disconnectAll(), this.onChannelVolumeChanged.disconnectAll(), super.destroy();
  }
  /**
   * Initializes the AudioManager.
   * @param {IApplication} app
   * @returns {Promise<void>}
   */
  initialize(t) {
    return typeof (t == null ? void 0 : t.manifest) == "object" && this.addAllFromManifest(t.manifest), Promise.resolve(void 0);
  }
  /**
   * Creates a new audio channel.
   * @param {string} name
   */
  createChannel(t) {
    if (this._channels.has(t))
      throw new Error(`Channel with name ${t} already exists.`);
    const e = new Ui(t, this);
    this._channels.set(t, e);
  }
  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName|ChannelName[]} channelName
   * @param {number} volume
   */
  setChannelVolume(t, e) {
    Array.isArray(t) || (t = [t]), t.forEach((i) => this._setChannelVolume(i, e));
  }
  /**
   * Gets the audio channel with the specified name.
   * @param {C} name
   * @returns {IAudioChannel | undefined}
   */
  getChannel(t) {
    return this._channels.get(t);
  }
  /**
   * Mutes the audio.
   */
  mute() {
    this._muted = true, this._setMuted();
  }
  /**
   * Unmutes the audio.
   */
  unmute() {
    this._muted = false, this._setMuted();
  }
  /**
   * Pauses the audio.
   */
  pause() {
    this._paused = true, this._setPaused();
  }
  /**
   * Resumes the audio.
   */
  resume() {
    this._paused = false, this._setPaused();
  }
  /**
   * Adds all sound assets from the specified manifest.
   * @param {AssetsManifest} manifest
   */
  addAllFromManifest(t) {
    t.bundles.forEach((e) => {
      this.addAllFromBundle(e.name, t);
    });
  }
  /**
   * Adds all sound assets from the specified bundle.
   * @param {string} bundleName
   * @param {AssetsManifest | string | undefined} manifest
   */
  addAllFromBundle(t, e) {
    if (e || (e = this.app.manifest), e === void 0 || typeof e == "string")
      throw new Error("Manifest is not available");
    const i = e.bundles.find((n) => n.name === t);
    if (i === void 0)
      throw new Error(`Bundle with name ${t} does not exist.`);
    Array.isArray(i == null ? void 0 : i.assets) || (i.assets = [i.assets]), i.assets.forEach((n) => {
      let o = n.src;
      Array.isArray(o) && (o = o[0]);
      const r = o.split(".").pop();
      (r === "mp3" || r === "ogg" || r === "wav" || r === "webm") && this.add(n);
    });
  }
  /**
   * Adds a sound asset to the AudioManager.
   * @param {UnresolvedAsset} soundAsset
   */
  add(t) {
    let e = t.alias;
    if (Array.isArray(t.alias) || (e = [t.alias]), e) {
      const i = {};
      e.forEach((n) => {
        n !== void 0 && (i[n] = t.src);
      }), P.add(i);
    }
  }
  isPlaying(t, e) {
    var n;
    const i = this._channels.get(e);
    return i ? ((n = i.get(t)) == null ? void 0 : n.isPlaying) === true : false;
  }
  /**
   * Plays a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {PlayOptions} options
   * @returns {Promise<IAudioInstance>}
   */
  async play(t, e = "sfx", i) {
    this._idMap.has(t) && (t = this._idMap.get(t));
    const n = this._channels.get(e);
    if (n) {
      t = this._verifySoundId(t);
      const o = n.add(
        t,
        new ge(t, n, this)
      ), r = await P.play(t, i);
      return o.media = r, (i == null ? void 0 : i.volume) !== void 0 && (r.volume = i.volume, o.onStart.connect(() => {
      }), o.onEnd.connect(() => {
      })), o.isPlaying = true, o;
    } else
      throw new Error(`Channel ${e} does not exist.`);
  }
  /**
   * Stops a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @returns {IAudioInstance | undefined}
   */
  stop(t, e = "sfx") {
    const i = this._channels.get(e);
    if (i)
      return i.remove(t);
    throw new Error(`Channel ${e} does not exist.`);
  }
  /**
   * Fades in a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {gsap.TweenVars} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeIn(t, e = "music", i) {
    const n = this._channels.get(e);
    n && (t = this._verifySoundId(t)), n != null && n.get(t) || await this.play(t, e, { volume: 0 }), (i == null ? void 0 : i.volume) === 0 && _.warn("fadeIn volume is 0", t, e, i);
    const o = Object.assign({ volume: (i == null ? void 0 : i.volume) ?? 1, duration: 1, ease: "linear.easeNone" }, i);
    return this.fade(t, e, o);
  }
  /**
   * Fades out a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {Partial<gsap.TweenVars>} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fadeOut(t, e = "music", i = { volume: 0 }) {
    i || (i = {}), (i == null ? void 0 : i.volume) === void 0 && (i.volume = 0), (i == null ? void 0 : i.volume) > 0 && _.warn("fadeOut volume should probably be 0", t, e, i);
    const n = Object.assign({ volume: 0, duration: 1, ease: "linear.easeNone" }, i);
    return this.fade(t, e, n, true);
  }
  /**
   * Crossfades between two sounds in the specified channel.
   * @param {string} outSoundId
   * @param {string} inSoundId
   * @param {ChannelName} channelName
   * @param {number} duration
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async crossFade(t, e, i = "music", n = 2) {
    const o = { duration: n, ease: "linear.easeNone" };
    return this.fadeOut(t, i, o), this.fadeIn(e, i, o);
  }
  /**
   * Fades a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {gsap.TweenVars} props
   * @param {boolean} stopOnComplete
   * @returns {Promise<gsap.core.Tween | null>}
   */
  async fade(t, e = "music", i, n = false) {
    const o = this._channels.get(e);
    o && (t = this._verifySoundId(t));
    const r = o == null ? void 0 : o.get(t);
    if (r) {
      const a = gsapWithCSS.to(r, i);
      return a.eventCallback("onComplete", () => {
        n && this.stop(t, e);
      }), a;
    }
    return null;
  }
  /**
   * Restores the audio state after it has been suspended.
   */
  async restore() {
    var e;
    const t = (e = P == null ? void 0 : P.context) == null ? void 0 : e.audioContext;
    t && await t.resume(), this._storedVolume !== void 0 && (this.masterVolume = this._storedVolume), this.muted = this._muted, this.resume();
  }
  /**
   * Suspends the audio by setting the master volume to 0 and pausing all sounds.
   */
  suspend() {
    this._storedVolume = this._masterVolume, this.masterVolume = 0, this.pause();
  }
  getAudioInstance(t, e = "sfx") {
    const i = this._channels.get(e);
    if (t = this._verifySoundId(t), i)
      return i.get(t);
    throw new Error(`Channel ${e} does not exist.`);
  }
  load(t, e = "sfx", i) {
    Array.isArray(t) || (t = [t]);
    for (let n of t) {
      this._idMap.has(n) && (t = this._idMap.get(n));
      const o = this._channels.get(e);
      if (o) {
        n = this._verifySoundId(n);
        const r = P.find(n);
        r.options = { ...i, autoPlay: false };
        const a = o.add(n, new ge(n, o, this));
        a.media = r.instances[0], a.pause();
      } else
        throw new Error(`Channel ${e} does not exist.`);
    }
  }
  stopAll(t = false, e = 1, i = {}) {
    if (t) {
      const n = [];
      this._channels.forEach((o) => {
        o.instances.forEach((r) => {
          r.isPlaying && (r.storedVolume = r.volume, n.push(r));
        });
      }), gsapWithCSS.to(n, {
        volume: 0,
        duration: e,
        ...i,
        onComplete: () => {
          n.forEach((o) => {
            o.stop(), o.volume = o.storedVolume;
          });
        }
      });
    } else
      P.stopAll();
  }
  getCoreSignals() {
    return ["onSoundStarted", "onSoundEnded", "onMuted", "onMasterVolumeChanged", "onChannelVolumeChanged"];
  }
  _verifySoundId(t) {
    const e = t;
    if (this._idMap.has(t))
      return this._idMap.get(t);
    if (!P.exists(t))
      if (P.exists(t + ".mp3"))
        t += ".mp3";
      else if (P.exists(t + ".ogg"))
        t += ".ogg";
      else if (P.exists(t + ".wav"))
        t += ".wav";
      else {
        t = e;
        let i = Assets.get(t);
        if (i || (t = e + ".mp3", i = Assets.get(t)), i || (t = e + ".ogg", i = Assets.get(t)), i || (t = e + ".wav", i = Assets.get(t)), i)
          this._findAndAddFromManifest(t, i);
        else
          throw new Error(`Sound with ID ${t} does not exist.`);
      }
    return this._idMap.set(t, t), t;
  }
  _findAndAddFromManifest(t, e) {
    const i = this.app.manifest;
    if (i === void 0 || typeof i == "string")
      throw new Error("Manifest is not available");
    for (let n = 0; n < i.bundles.length; n++) {
      const o = i.bundles[n];
      Array.isArray(o == null ? void 0 : o.assets) || (o.assets = [o.assets]);
      for (let r = 0; r < o.assets.length; r++) {
        const a = o.assets[r], h = a.src, c = e.url.split("/").pop() ?? "";
        if (Array.isArray(h))
          for (let l = 0; l < h.length; l++) {
            const d = h[l];
            let p;
            if (typeof d != "string" ? p = d.src : p = d, p.includes(c)) {
              this.add(a);
              return;
            }
          }
        else if (h != null && h.includes(c)) {
          this.add(a);
          return;
        }
      }
    }
  }
  /**
   * @private
   */
  _setMuted() {
    this._channels.forEach((t) => {
      t.muted = this._muted;
    }), this._muted ? P.muteAll() : P.unmuteAll(), this.onMuted.emit(this._muted);
  }
  /**
   * @private
   */
  _setPaused() {
    this._paused ? P.pauseAll() : P.resumeAll();
  }
  /**
   * Sets the volume of the specified channel.
   * @param {C} channelName
   * @param {number} volume
   * @private
   */
  _setChannelVolume(t, e) {
    const i = this._channels.get(t);
    if (i)
      i.volume = e;
    else
      throw new Error(`Channel ${t} does not exist.`);
  }
  /**
   * Sound started event handler. Emit the onSoundStarted signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {C} channelName
   * @private
   */
  _soundStarted(t, e, i) {
    this.onSoundStarted.emit({ id: t, instance: e, channelName: i });
  }
  /**
   * Sound ended event handler. Emit the onSoundEnded signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {C} channelName
   * @private
   */
  _soundEnded(t, e, i) {
    this.onSoundEnded.emit({ id: t, instance: e, channelName: i });
  }
};
var Ji = class extends Container {
  constructor(t) {
    super(), w(this), this._config = {
      color: 65535,
      shape: "rounded rectangle",
      radius: 8,
      lineWidth: 2,
      ...t
    }, this._graphics = new Graphics(), this.addChild(this._graphics);
  }
  draw(t) {
    this.clear(), this.setFocusTarget(t), this.focusTarget && (this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 }, this._config.shape === "rectangle" ? this._graphics.rect(0, 0, this.focusBounds.width, this.focusBounds.height) : this._graphics.roundRect(0, 0, this.focusBounds.width, this.focusBounds.height, this._config.radius), this._graphics.stroke());
  }
  clear() {
    this.clearFocusTarget();
  }
  destroy(t) {
    this.clear(), this._graphics.destroy(), super.destroy(t);
  }
  setFocusTarget(t) {
    t && (this.focusTarget = t, this.focusBounds = this.focusTarget.getFocusArea().clone(), v.getInstance().ticker.add(this.updatePosition));
  }
  clearFocusTarget() {
    this.focusTarget = null, v.getInstance().ticker.remove(this.updatePosition);
  }
  updatePosition() {
    if (!this.focusTarget)
      return;
    const t = this.focusTarget.getGlobalPosition(), e = this.focusTarget.getFocusPosition();
    if (e) {
      const i = I(e);
      t.x += i.x, t.y += i.y;
    }
    this.position.set(t.x, t.y);
  }
};
var ts = class {
  constructor(t) {
    this.id = t, this.currentFocusable = null, this.lastFocusable = null, this.defaultFocusable = null, this._focusables = [], this._currentIndex = 0, this._current = false;
  }
  set current(t) {
    this._current = t, this.setCurrent();
  }
  get availableFocusables() {
    return this._focusables.filter((t) => t.focusEnabled);
  }
  setCurrent() {
    if (this._current)
      this.defaultFocusable || (this.defaultFocusable = this._focusables[0]), this.sortFocusables();
    else
      for (let t = 0; t < this._focusables.length; t++)
        this._focusables[t].accessible = false;
  }
  hasFocusable(t) {
    return t ? this._focusables.indexOf(t) > -1 : false;
  }
  addFocusable(t, e = false) {
    this._focusables.push(t), e && (this.defaultFocusable = t), this._current && this.sortFocusables();
  }
  removeFocusable(t) {
    const e = this._focusables.indexOf(t);
    e !== -1 && (this._focusables.splice(e, 1), this.currentFocusable === t && (this.currentFocusable = null), this.lastFocusable === t && (this.lastFocusable = null), this.defaultFocusable === t && (this.defaultFocusable = null)), this._current && this.sortFocusables();
  }
  sortFocusables() {
    for (let t = 0; t < this._focusables.length; t++)
      this._focusables[t].accessible = this._current, this._focusables[t].tabIndex = this._current ? Math.max(t, 1) + 1 : -1, this._focusables[t] === this.defaultFocusable && (this._focusables[t].tabIndex = this._current ? 1 : -1);
    this._current && this._focusables.sort((t, e) => t.tabIndex - e.tabIndex);
  }
  sortFocusablesByPosition() {
    this._current && this._focusables.sort((t, e) => t.position.y !== e.position.y ? t.position.y - e.position.y : t.position.x - e.position.x);
  }
  setCurrentFocusable(t) {
    return t ? (this._currentIndex = this._focusables.indexOf(t), this.currentFocusable = t) : (this._currentIndex = -1, this.currentFocusable = null), this.currentFocusable;
  }
  next() {
    return this._currentIndex = this._currentIndex + 1, this._currentIndex >= this._focusables.length && (this._currentIndex = 0), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
  prev() {
    return this._currentIndex = this._currentIndex - 1, this._currentIndex < 0 && (this._currentIndex = this._focusables.length - 1), this.currentFocusable = this._focusables[this._currentIndex], this.currentFocusable;
  }
};
var es = class extends O {
  constructor() {
    super(...arguments), this.id = "focus", this.view = new Container(), this.onFocusManagerActivated = new u(), this.onFocusManagerDeactivated = new u(), this.onFocusLayerChange = new u(), this.onFocusChange = new u(), this._focusTarget = null, this._keyboardActive = false, this._layers = /* @__PURE__ */ new Map(), this._currentLayerId = null, this._active = false, this._enabled = true;
  }
  get layers() {
    return this._layers;
  }
  get currentLayerId() {
    return this._currentLayerId;
  }
  get currentLayer() {
    if (this._currentLayerId)
      return this._layers.get(this._currentLayerId);
  }
  get active() {
    return this._active;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    this._enabled = t;
  }
  get layerCount() {
    return this._layers.size;
  }
  sortFocusablesByPosition() {
    var t;
    (t = this._getCurrentLayer()) == null || t.sortFocusablesByPosition();
  }
  initialize(t) {
    var i;
    ci(this, "removeAllFocusLayers", "_handleGlobalMouseMove", "_handleGlobalPointerDown");
    const e = ((i = t.config) == null ? void 0 : i.focus) || {};
    e.usePixiAccessibility = e.usePixiAccessibility ?? false, this._focusOutliner = typeof (e == null ? void 0 : e.outliner) == "function" ? new e.outliner() : new Ji(e.outliner), this._options = e, this.view.addChild(this._focusOutliner), this._updatePixiAccessibility(), this._setupKeyboardListeners(), this._setupAppListeners();
  }
  destroy() {
    this._removeGlobalListeners(), this.deactivate(), this._focusOutliner.destroy(), this._layers.clear(), super.destroy();
  }
  deactivate() {
    this._setTarget(null), this._updateOutliner(), this._active = false;
  }
  add(t, e, i = false) {
    this.addFocusable(t, e, i);
  }
  addFocusable(t, e, i = false) {
    (e === void 0 || e == null) && (e = this._currentLayerId ?? null);
    const n = this._layers.get(e);
    if (!n) {
      _.error(`Layer with ID ${e} does not exist.`);
      return;
    }
    Array.isArray(t) || (t = [t]), t.forEach((o, r) => {
      n.addFocusable(o, r === 0 && i);
    }), this._active && i && this._setTarget(n.currentFocusable || n.defaultFocusable || null, !this._active);
  }
  remove(t) {
    this.removeFocusable(t);
  }
  removeFocusable(t) {
    Array.isArray(t) || (t = [t]), this._layers.forEach((e) => {
      t.forEach((i) => {
        e.removeFocusable(i);
      });
    }), this._focusTarget && t.includes(this._focusTarget) && this._setTarget(null);
  }
  setLayerOrder(t) {
    const e = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      if (!this._layers.has(i))
        throw new Error(`Layer with ID ${i} does not exist.`);
      e.set(i, this._layers.get(i));
    }), this._layers = e;
  }
  addFocusLayer(t, e = true, i) {
    t === void 0 && (t = this._layers.size);
    let n;
    return this._layers.has(t) ? (_.error(`Layer with ID ${t} already exists.`), n = this._layers.get(t)) : (n = new ts(t), this._layers.set(t, n)), (e || this._currentLayerId === null) && this.setFocusLayer(t), i && this.addFocusable(i, t), n;
  }
  removeFocusLayer(t, e = true) {
    var n;
    if (t === void 0 && e)
      return this._removeTopLayer();
    if (!this._layers.has(t))
      throw new Error(`Layer with ID ${t} does not exist.`);
    const i = (n = Ut(this._layers, t)) == null ? void 0 : n[0];
    this._layers.delete(t), this._postDelete(i);
  }
  restart(t = false) {
    var i, n, o;
    const e = this._getCurrentLayer();
    this._setTarget(
      t ? ((n = e == null ? void 0 : e.availableFocusables) == null ? void 0 : n[((i = e == null ? void 0 : e.availableFocusables) == null ? void 0 : i.length) - 1]) || null : ((o = e == null ? void 0 : e.availableFocusables) == null ? void 0 : o[0]) || null
    );
  }
  forceFocus(t) {
    this.focus(t);
  }
  setFocus(t) {
    this.focus(t);
  }
  focus(t) {
    this._setTarget(t);
  }
  setFocusLayer(t) {
    if (!this._layers.has(t))
      throw new Error(`Layer with ID ${t} does not exist.`);
    this._currentLayerId = t;
    const e = this._getCurrentLayer();
    e && (e.current = true, this._layers.forEach((i, n) => {
      i.current = n === t;
    }), e.sortFocusables(), this._setTarget(e.currentFocusable || e.defaultFocusable || null, !this._active)), this.onFocusLayerChange.emit(this._currentLayerId);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postInitialize(t) {
  }
  clearFocus() {
    this._setTarget(null);
  }
  removeAllFocusLayers() {
    this._layers.clear(), this._setTarget(null);
  }
  _onKeyDown(t) {
    if (!(!this._enabled || t.key !== "Tab" && t.key !== "Enter" && t.key !== " " && t.key !== "Space") && !this._options.usePixiAccessibility)
      if (t.key === "Tab") {
        t.preventDefault();
        const e = this._getCurrentLayer();
        if (!(e == null ? void 0 : e.availableFocusables))
          return;
        this._keyboardActive ? t.shiftKey ? this._prev() : this._next() : (this._activate(), this._setTarget(this._focusTarget || e.currentFocusable || e.defaultFocusable || null));
      } else (t.key === "Enter" || t.key === " " || t.key === "Space") && this._focusTarget && this._focusTarget.isFocused && this._focusTarget.emit("pointerdown", { type: "pointerdown" });
  }
  _onKeyUp(t) {
    var e, i;
    !this._enabled || t.key !== "Enter" && t.key !== " " && t.key !== "Space" || this._options.usePixiAccessibility || this._focusTarget && this._focusTarget.isFocused && ((e = this._focusTarget) == null || e.emit("click", { type: "click", originalEvent: t }), (i = this._focusTarget) == null || i.emit("pointerup", { type: "pointerup", originalEvent: t }));
  }
  _onMouseMove(t) {
    t.movementX === 0 && t.movementY === 0 || this._deactivate();
  }
  getCoreFunctions() {
    return [
      "addFocusable",
      "removeFocusable",
      "setLayerOrder",
      "addFocusLayer",
      "removeFocusLayer",
      "setFocusLayer",
      "setFocus",
      "focus",
      "clearFocus",
      "removeAllFocusLayers"
    ];
  }
  getCoreSignals() {
    return ["onFocusManagerActivated", "onFocusManagerDeactivated", "onFocusLayerChange", "onFocusChange"];
  }
  _next() {
    var e;
    const t = (e = this._getCurrentLayer()) == null ? void 0 : e.next();
    if (!t) {
      _.error("FocusManager:: _next():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(t);
  }
  _prev() {
    var e;
    const t = (e = this._getCurrentLayer()) == null ? void 0 : e.prev();
    if (!t) {
      _.error("FocusManager:: _prev():: No focusable found in the current layer.");
      return;
    }
    this._setTarget(t);
  }
  _deactivate() {
    this._keyboardActive && (this._keyboardActive = false);
  }
  _activate() {
    this._keyboardActive || (this._keyboardActive = true, globalThis.document.addEventListener("mousemove", this._onMouseMove, true));
  }
  _updatePixiAccessibility() {
    this.app.renderer.accessibility._div.setAttribute("id", "pixi-accessibility"), this._options.usePixiAccessibility || (this.app.renderer.accessibility._div.setAttribute("disabled", "disabled"), this.app.renderer.accessibility.destroy(), globalThis.addEventListener("keydown", this._onKeyDown, false), globalThis.addEventListener("keyup", this._onKeyUp, false));
  }
  _getCurrentLayer() {
    return this._currentLayerId != null && this._layers.get(this._currentLayerId) || null;
  }
  _removeTopLayer() {
    var i, n;
    const t = (i = Ht(this._layers)) == null ? void 0 : i[0], e = (n = Ut(this._layers, t)) == null ? void 0 : n[0];
    t !== void 0 && (this._layers.delete(t), this._postDelete(e));
  }
  _postDelete(t) {
    this._layers.size === 0 ? this._currentLayerId = null : t !== void 0 && this.setFocusLayer(t);
  }
  _setTarget(t, e = true) {
    const i = this._getCurrentLayer(), n = this._focusTarget;
    if (this._focusTarget = t, n && this._active && this._clearFocusTarget(n), this.app.renderer.accessibility.isActive || this._keyboardActive)
      this._focusTarget ? (this._active || (this._active = true), this._options.usePixiAccessibility && !this._focusTarget._accessibleDiv && this.app.renderer.accessibility.postrender(), this._options.usePixiAccessibility && this.app.ticker.addOnce(() => {
        var o, r;
        (r = (o = this._focusTarget) == null ? void 0 : o._accessibleDiv) == null || r.focus();
      }), i != null && i.hasFocusable(t) ? this._focusTarget && (this._focusTarget.focusIn(), this._focusTarget.isFocused = true, this._focusTarget.onFocusIn.emit(this._focusTarget), i.setCurrentFocusable(this._focusTarget), this._updateOutliner()) : _.warn(
        "The focusable",
        t,
        `does not exist on the current focus layer: ${this._currentLayerId}`
      )) : this._focusOutliner.clear();
    else if (this._focusOutliner.clear(), this._active && e) {
      this._active = false, this.onFocusManagerDeactivated.emit();
      return;
    }
    n !== t && this._active && this.onFocusChange.emit({ focusable: this._focusTarget, layer: this._currentLayerId });
  }
  _clearFocusTarget(t) {
    t && (t.focusOut(), t.isFocused = false, t.onFocusOut.emit(t), t.blur(), t.onBlur.emit(t));
  }
  _setupKeyboardListeners() {
    window.addEventListener("keydown", this._onKeyDown, false), this._addGlobalListeners();
  }
  _addGlobalListeners() {
    globalThis.document.addEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.addEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _removeGlobalListeners() {
    globalThis.document.removeEventListener("mousemove", this._handleGlobalMouseMove), globalThis.document.removeEventListener("pointerdown", this._handleGlobalPointerDown);
  }
  _handleGlobalMouseMove() {
    this._enabled && this._active && this.deactivate();
  }
  _handleGlobalPointerDown() {
    this._enabled && (this._active && this.deactivate(), (this.app.renderer.accessibility.isActive || this._keyboardActive) && (this.app.renderer.accessibility._deactivate(), this._deactivate()));
  }
  _setupAppListeners() {
    this.app.scenes.onSceneChangeStart.connect(this.removeAllFocusLayers);
  }
  _updateOutliner() {
    this._focusTarget ? (this._focusOutliner.position.set(this._focusTarget.position.x, this._focusTarget.position.y), this._focusOutliner.draw(this._focusTarget)) : this._focusOutliner.clear();
  }
};
var is = {
  defaultLocale: "en",
  locales: ["en"],
  loadAll: false,
  files: []
};
var ss = class extends O {
  constructor() {
    super(...arguments), this.id = "i18n", this.onLocaleChanged = new u(), this._dicts = {};
  }
  /**
   * Getter for locale.
   */
  get locale() {
    return this._locale;
  }
  get locales() {
    return this._options.locales;
  }
  /**
   * Initializes the i18n module.
   * sets the default locale and loads the locale files.
   * @param app The application instance.
   * @param options The i18n options.
   * @returns Promise<void>
   */
  async initialize(t, e) {
    if (super.initialize(t), this._options = { ...is, ...e }, this._locale = this._options.defaultLocale, this._options.loadAll && this._options.files.length > 0) {
      const i = this._options.files.filter((n) => this._options.locales.includes(n.id));
      for (const n of i)
        await this.loadLocale(n.id);
    } else this._options.files.length > 0 && await this.loadLocale(this._locale);
  }
  /**
   * Sets the locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to set.
   * @returns Promise<string>
   */
  async setLocale(t) {
    return this._locale = t, await this._loadAndSetLocale(t), this._locale;
  }
  /**
   * Translates a key into a string.
   * If the key is not found, it will return an empty string.
   * If the key is found, it will replace any placeholders in the string with the values from the params object.
   * If the key contains a variant, it will select a random variant if the variant param is set to 'random'.
   * If the key contains a number variant, it will select the variant based on the variant param.
   * @param key The key to translate.
   * @param params The parameters to replace in the string.
   * @param locale The locale to use for translation.
   * @returns The translated string.
   */
  t(t, e, i = this._locale) {
    const n = this._dicts[i];
    if (!n)
      return _.error(`i18n:: No dictionary loaded for current locale: ${i}`), "";
    let o = n[t];
    if (!o)
      return _.error(`i18n:: No result found for the key ${t} in the locale: ${this._locale}`), "";
    if (e) {
      if (typeof e.variant == "number" || e.variant === "random") {
        const r = /\[(.*?)\]/.exec(o);
        if (r) {
          const a = r[1].split("|"), h = e.variant === "random" ? Math.floor(Math.random() * a.length) : e.variant;
          o = o.replace(r[0], a[h]);
        }
      }
      for (const r in e) {
        const a = new RegExp(`{${r}}`, "g");
        o = o.replace(a, String(e[r]));
      }
    }
    return o;
  }
  /**
   * Parses the input string and replaces anything in between {} braces, assuming it is a key in the dictionary.
   * @param {string} input
   * @param locale
   * @returns {string}
   */
  parse(t, e = this._locale) {
    const i = this._dicts[e];
    if (!i)
      return _.error(`i18n:: No dictionary loaded for current locale: ${this._locale}`), "";
    let n = t;
    const o = n.match(/{(.*?)}/g);
    return o && o.forEach((r) => {
      const a = r.slice(1, -1);
      i[a] && (n = n.replace(r, i[a]));
    }), n;
  }
  /**
   * Loads a locale.
   * @param localeId The locale id to load.
   * @returns Promise<void>
   */
  async loadLocale(t) {
    const e = this._options.files.find((i) => t === i.id);
    if (!e) {
      _.error(`i18n:: Could not find locale file for ${t}`);
      return;
    }
    this._dicts[t] = e.json ? await Assets.load(e.json) : await At(e);
  }
  getCoreFunctions() {
    return ["t", "setLocale"];
  }
  getCoreSignals() {
    return ["onLocaleChanged"];
  }
  /**
   * Loads and sets a locale.
   * If the locale is not loaded, it will load it first.
   * @param localeId The locale id to load and set.
   */
  async _loadAndSetLocale(t) {
    this._dicts[t] || await this.loadLocale(t), this.onLocaleChanged.emit(t);
  }
};
var Z = ((s) => (s.Keyboard = "keyboard", s.GamePad = "gamepad", s.Mouse = "mouse", s.Touch = "touch", s))(Z || {});
function K(s) {
  return class extends s {
    constructor() {
      super(...arguments), this.signalConnections = new R.SignalConnections();
    }
    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    addSignalConnection(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    connectSignal(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    connectAction(...t) {
      for (const e of t)
        this.signalConnections.add(e);
    }
    destroy(t) {
      this.signalConnections.disconnectAll(), super.destroy(t);
    }
  };
}
function ns(s) {
  return class extends s {
    constructor() {
      super(...arguments), this.onAnimationStart = new u(), this.onAnimationUpdate = new u(), this.onAnimationComplete = new u(), this._activeTweens = [];
    }
    /**
     * Animate method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animate(t, e = this) {
      const i = gsapWithCSS.to(e, {
        ...t,
        onStart: () => {
          this._onAnimationStart(i);
        },
        onUpdate: () => {
          this._onAnimationUpdate(i);
        },
        onComplete: () => {
          this._onAnimationComplete(i), this._activeTweens = this._activeTweens.filter((n) => n !== i);
        }
      });
      return this._activeTweens.push(i), i;
    }
    /**
     * Animate from method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFrom(t, e = this) {
      const i = gsapWithCSS.from(e, {
        ...t,
        onStart: () => {
          this._onAnimationStart(i);
        },
        onUpdate: () => {
          this._onAnimationUpdate(i);
        },
        onComplete: () => {
          this._onAnimationComplete(i), this._activeTweens = this._activeTweens.filter((n) => n !== i);
        }
      });
      return this._activeTweens.push(i), i;
    }
    /**
     * Animate sequence method.
     * @param sequences - Array of animation sequences.
     * @param instance - Instance to animate.
     * @returns GSAP Timeline instance.
     */
    animateSequence(t, e = this) {
      return this._activeTimeline || (this._activeTimeline = gsapWithCSS.timeline({
        onStart: () => this._onAnimationStart(this._activeTimeline),
        onUpdate: () => this._onAnimationUpdate(this._activeTimeline),
        onComplete: () => {
          this._onAnimationComplete(this._activeTimeline), this._activeTimeline = void 0;
        }
      })), t.forEach((i) => {
        var n;
        (n = this._activeTimeline) == null || n.to(e, i);
      }), this._activeTimeline;
    }
    /**
     * Clear animations method.
     */
    destroyAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.kill()), this._activeTweens = [], (t = this._activeTimeline) == null || t.clear(), this._activeTimeline = void 0;
    }
    /**
     * Pause animations method.
     */
    pauseAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.pause()), (t = this._activeTimeline) == null || t.pause();
    }
    /**
     * Resume animations method.
     */
    resumeAnimations() {
      var t;
      this._activeTweens.forEach((e) => e.play()), (t = this._activeTimeline) == null || t.play();
    }
    /**
     * Animate from-to method.
     * @param fromProps - Animation properties for the start state.
     * @param toProps - Animation properties for the end state.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    animateFromTo(t, e, i = this) {
      const n = gsapWithCSS.fromTo(
        i,
        {
          ...t
        },
        {
          ...e
        }
      );
      return n.eventCallback("onStart", () => {
        this._onAnimationStart(n);
      }), n.eventCallback("onUpdate", () => {
        this._onAnimationUpdate(n);
      }), n.eventCallback("onComplete", () => {
        this._onAnimationComplete(n), this._activeTweens = this._activeTweens.filter((o) => o !== n);
      }), this._activeTweens.push(n), n;
    }
    /**
     * Reverses animations.
     */
    reverseAnimation() {
      var t;
      this._activeTweens.forEach((e) => e.reverse()), (t = this._activeTimeline) == null || t.reverse();
    }
    isAnimationPlaying() {
      var t;
      return ((t = this._activeTweens) == null ? void 0 : t.some((e) => !e.paused())) || this._activeTimeline && !this._activeTimeline.paused() || false;
    }
    // utility animations
    /**
     * Shake animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    shake(t = {}, e = this) {
      const { duration: i = 0.05, intensity: n = 12, times: o = 41 } = t, a = { x: e.x, y: e.y }.x, h = o % 2 === 0 ? o + 1 : o, c = gsapWithCSS.to(e, {
        x: a + gsapWithCSS.utils.random(-Math.max(n, 2), Math.max(n, 2)),
        repeat: h,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(c), c;
    }
    /**
     * Pulse animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    pulse(t = {}, e = this) {
      const { duration: i = 0.5, intensity: n = 1.2, times: o = 1 } = t, r = o * 2 - 1, a = gsapWithCSS.to(e == null ? void 0 : e.scale, {
        x: n,
        y: n,
        repeat: r,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(a), a;
    }
    /**
     * Bob animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    bob(t = {}, e = this) {
      const { duration: i = 0.5, intensity: n = 10 } = t, o = gsapWithCSS.to(e, {
        y: `-=${n}`,
        repeat: -1,
        yoyo: true,
        duration: i
      });
      return this._activeTweens.push(o), o;
    }
    /**
     * Private method for handling animation start event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationStart(t) {
      this.onAnimationStart.emit(t);
    }
    /**
     * Private method for handling animation update event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationUpdate(t) {
      this.onAnimationUpdate.emit(t);
    }
    /**
     * Private method for handling animation complete event.
     * @param animationEntity - Animation entity.
     */
    _onAnimationComplete(t) {
      this.onAnimationComplete.emit(t);
    }
  };
}
function Vt(s) {
  return class extends s {
    constructor(...t) {
      super(...t), this.isFocused = false, this.isKeyDown = false, this.focusEnabled = true, this.tabIndex = 0, this.accessible = false, this.accessibleType = "button", this.accessibleTitle = "Focusable", this.accessibleHint = "Press enter to focus", this.accessiblePointerEvents = "auto", this.accessibleChildren = true, this.onFocus = new u(), this.onFocusIn = new u(), this.onFocusOut = new u(), this.onBlur = new u(), this._eventsDisabled = false, this.eventMode = "static", this.on("mouseover", this._onMouseOver), this.on("mousedown", this._onMouseDown), this.on("click", this._handleClick), this.on("tap", this._handleClick);
    }
    get app() {
      return v.getInstance();
    }
    destroy(t) {
      this.off("mouseover", this._onMouseOver), this.off("mousedown", this._onMouseDown), this.off("click", this._handleClick), this.off("tap", this._handleClick), super.destroy(t);
    }
    focusIn() {
      this.app.focus.active && this.emit("pointerover", { type: "pointerover" });
    }
    blur() {
      this.isKeyDown || window.removeEventListener("keyup", this._handleKeyUp.bind(this));
    }
    focusOut() {
      this.isKeyDown || window.removeEventListener("keyup", this._handleKeyUp.bind(this)), this.app.focus.active && this.emit("pointerout", { type: "pointerout" });
    }
    click() {
    }
    getFocusPosition() {
      return null;
    }
    getFocusArea() {
      return this.getBounds();
    }
    getFocusSize() {
      return [this.getFocusArea().width, this.getFocusArea().height];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onMouseOver(t) {
      this.app.focus.setFocus(this);
    }
    _onMouseDown(t) {
      this._maybeEmit("pointerdown", t);
    }
    _handleClick(t) {
      this._maybeEmit("click", t), this.click();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _handleKeyUp(t) {
    }
    _maybeEmit(t, e) {
      this._eventsDisabled || e.type || (this._eventsDisabled = true, this.emit(t, { type: t }), this._eventsDisabled = false);
    }
  };
}
Vt.INITTED = false;
function Re(s) {
  return class extends s {
    constructor(...t) {
      super(...t), this._signals = /* @__PURE__ */ new Map(), this._emitSignal = this._emitSignal.bind(this), this.eventMode = "static";
    }
    /**
     * Handles interaction events and returns the corresponding signal.
     *
     * @param {InteractionEventName} eventName - The name of the interaction event.
     * @return {InteractionSignal} The signal associated with the interaction event.
     */
    onInteraction(t) {
      if (!this._signals.has(t)) {
        const e = new u();
        this._signals.set(t, e), this.on(t, this._emitSignal);
      }
      return this._signals.get(t);
    }
    destroy(t) {
      for (const e of this._signals.keys())
        this.off(e, this._emitSignal);
      this._signals.clear(), super.destroy(t);
    }
    /**
     * Emits a signal with the given event.
     *
     * @param {FederatedEvent} event - The event to emit.
     *
     * @return {void}
     */
    _emitSignal(t) {
      const e = t.type, i = this._signals.get(e);
      i && i.emit(t);
    }
  };
}
function ye(s, t, e) {
  const i = {};
  for (const n in s)
    i[n] = (...o) => {
      const r = s[n](...o);
      return e && t.addChild(r), r;
    };
  return i;
}
var ve = ["autoResize", "autoUpdate", "priority"];
var os = { autoResize: true, autoUpdate: false, priority: 0 };
var B = class extends ns(K(vt())) {
  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(t = {}) {
    super(), this.onDestroy = new u(), this.__dill_pixel_method_binding_root = true, this.__config = { ...os, ...t }, w(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  addColoredBackground(t = 0, e = 1) {
    const i = {
      color: 0,
      width: this.app.size.width,
      height: this.app.size.height,
      anchor: 0.5,
      alpha: 1,
      autoResize: true
    }, n = Object.assign(
      i,
      typeof t == "number" ? {
        color: t,
        alpha: e
      } : t
    );
    return this.__background = this.add.sprite({
      asset: Texture.WHITE,
      width: n.width,
      height: n.height,
      anchor: n.anchor,
      tint: n.color,
      alpha: n.alpha,
      resolution: 2
    }), this.setChildIndex(this.__background, 0), n.autoResize && this.addSignalConnection(this.app.signal.onResize.connect(this.__resizeBackground)), this.__background;
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(t) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(t) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(t) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.onDestroy.emit(), super.destroy(t);
  }
  removed() {
  }
  __resizeBackground() {
    this.__background.width = this.app.size.width, this.__background.height = this.app.size.height;
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoResize && this.addSignalConnection(this.app.onResize.connect(this.resize, this.__config.priority ?? "highest")), this.__config.autoUpdate && this.app.ticker.add(this.update, this, -999999), this.added();
  }
  _removed() {
    this.__config.autoResize && this.app.onResize.disconnect(this.resize), this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
};
var we = ["autoUpdate", "priority"];
var rs = { autoUpdate: true, priority: 0 };
var as = class extends ParticleContainer {
  /**
   * The constructor for the Container class.
   * @param config - The configuration for the container.
   */
  constructor(t = {}) {
    super(t), this.onDestroy = new u(), this.__dill_pixel_method_binding_root = true, this.__config = { ...rs, ...t }, w(this), this.on("added", this._added), this.on("removed", this._removed);
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  /**
   * Update the container. This method is meant to be overridden by subclasses.
   * @param ticker
   */
  update(t) {
  }
  /**
   * Resize the container. This method is meant to be overridden by subclasses.
   * @param size
   */
  resize(t) {
  }
  /**
   * This method is called when the container is added to the stage. It is meant to be overridden by subclasses.
   */
  added() {
  }
  destroy(t) {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.onDestroy.emit(), super.destroy(t);
  }
  removed() {
  }
  /**
   * This method is called when the container is added to the stage. It sets up auto-resizing and auto-updating if enabled.
   */
  _added() {
    this.__config.autoUpdate && this.app.ticker.add(this.update, this, this.__config.priority), this.added();
  }
  _removed() {
    this.__config.autoUpdate && this.app.ticker.remove(this.update, this), this.removed();
  }
};
var zn = class extends B {
  constructor() {
    super({ autoResize: true, autoUpdate: true, priority: "highest" }), this.autoUnloadAssets = false;
  }
  get assets() {
    return this._assets;
  }
  set assets(t) {
    this._assets = t;
  }
  async initialize() {
  }
  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  enter() {
    return Promise.resolve();
  }
  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  exit() {
    return Promise.resolve();
  }
  async start() {
  }
  /**
   * Called every frame
   * @param {Ticker} ticker
   */
  update(t) {
  }
  /**
   * Called when the window is resized
   * @param {Size} size
   * @override
   */
  resize(t) {
    _.log("Scene.resize", this, t);
  }
  destroy() {
    this.app.ticker.remove(this.update), super.destroy({ children: true });
  }
};
var Bn = class extends B {
  constructor(t = false) {
    super({ autoResize: true, autoUpdate: t, priority: -9999 }), this._active = false, this.addSignalConnection(
      this.app.assets.onLoadStart.connect(this.handleLoadStart),
      this.app.assets.onLoadProgress.connect(this.handleLoadProgress),
      this.app.assets.onLoadProgress.connect(this.handleLoadComplete)
    );
  }
  get active() {
    return this._active;
  }
  set active(t) {
    this._active = t;
  }
  get progress() {
    return this._progress;
  }
  set progress(t) {
    this._progress = t;
  }
  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  enter() {
    return Promise.resolve();
  }
  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  exit() {
    return Promise.resolve();
  }
  handleLoadStart() {
  }
  handleLoadProgress(t) {
    this._progress = t;
  }
  handleLoadComplete() {
  }
};
var hs = class extends Graphics {
  constructor(t) {
    super(typeof t == "string" ? Assets.get(t) : t);
    const e = this.getLocalBounds();
    this.pivot.set((e.x + e.width) / 2, (e.y + e.height) / 2);
  }
};
var ft = class _ft extends AnimatedSprite {
  constructor(t) {
    const e = (t == null ? void 0 : t.animations) ?? {}, i = (t == null ? void 0 : t.animation) ?? Object.keys(e)[0], n = e[i], o = t == null ? void 0 : t.sheet, r = (t == null ? void 0 : t.texturePrefix) || "", a = t == null ? void 0 : t.zeroPad;
    super(
      _ft.generateTexturesFromProps(
        i,
        n,
        r,
        o,
        a
      ),
      (t == null ? void 0 : t.autoUpdate) !== false
    ), this.config = t, this.onAnimationChange = new u(), this.onAnimationStart = new u(), this.onAnimationStop = new u(), this.onAnimationLoop = new u(), this.onAnimationComplete = new u(), this.onAnimationFrameChange = new u(), this.defaultTexturePrefix = "", this._paused = false, this._isReversed = false, w(this), this.defaultSheet = o, this.defaultTexturePrefix = r, this.defaultZeroPad = a, this._generateAnimations(), this.currentAnimation = this.defaultAnimation = i, this.autoPlay = (t == null ? void 0 : t.autoPlay) ?? true, this.loop = (t == null ? void 0 : t.loop) ?? true, this.updateAnchor = (t == null ? void 0 : t.updateAnchor) ?? false, this.animationSpeed = this.defaultAnimationSpeed = (t == null ? void 0 : t.animationSpeed) ?? 1, this.on("added", this._added);
  }
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t;
  }
  get speed() {
    return this.animationSpeed;
  }
  set speed(t) {
    this.animationSpeed = this.defaultAnimationSpeed = t;
  }
  get isReversed() {
    return this._isReversed;
  }
  static generateTexturesFromProps(t, e, i = "", n = void 0, o) {
    const r = [];
    let a = "";
    const h = (e == null ? void 0 : e.sheet) ?? n;
    if ((e == null ? void 0 : e.numFrames) > 1) {
      const c = (e == null ? void 0 : e.startIndex) ?? 0;
      for (let l = c; l < c + (e == null ? void 0 : e.numFrames); l++)
        a = `${i}${(e == null ? void 0 : e.texturePrefix) ?? t}${fi(l, (e == null ? void 0 : e.zeroPad) ?? o)}`, r.push(
          Mt({
            asset: a,
            sheet: h
          })
        );
    } else
      a = `${i}${(e == null ? void 0 : e.texturePrefix) ?? t}`, r.push(
        Mt({
          asset: a,
          sheet: h
        })
      );
    return r;
  }
  reverse() {
    this._isReversed = !this._isReversed, this._isReversed ? this.setAnimation(`${this.currentAnimation}_reverse`) : this.setAnimation(this.currentAnimation.split("_reverse")[0]);
  }
  setAnimation(t, e = true) {
    var n, o, r;
    if (!this._animations.has(t)) {
      _.error(`Animation ${t} does not exist`);
      return;
    }
    this.textures = this._animations.get(t), this.currentAnimation = t;
    const i = (r = (o = (n = this.config) == null ? void 0 : n.animations) == null ? void 0 : o[t.split("_reverse")[0]]) == null ? void 0 : r.animationSpeed;
    i ? this.animationSpeed = i : this.animationSpeed = this.defaultAnimationSpeed, this.onAnimationChange.emit(t), e && this.play();
  }
  play() {
    var t;
    super.play(), (t = this.onAnimationStart) == null || t.emit();
  }
  stop() {
    var t;
    super.stop(), (t = this.onAnimationStop) == null || t.emit();
  }
  nextAnimation() {
    const t = ri(this._animations, this.currentAnimation) ?? ai(this._animations);
    t && this.setAnimation(t[0]);
  }
  previousAnimation() {
    const t = Ut(this._animations, this.currentAnimation) ?? Ht(this._animations);
    t && this.setAnimation(t[0]);
  }
  update(t) {
    this._paused || super.update(t);
  }
  _generateAnimations() {
    var e, i;
    this._animations = /* @__PURE__ */ new Map();
    const t = ((e = this.config) == null ? void 0 : e.animations) ?? {};
    if (t) {
      for (const [n, o] of Object.entries(t))
        this._animations.set(
          n,
          _ft.generateTexturesFromProps(
            n,
            o,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad
          )
        );
      if ((i = this.config) != null && i.reversible)
        for (const [n, o] of Object.entries(t)) {
          const r = _ft.generateTexturesFromProps(
            n,
            o,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad
          );
          r.reverse(), this._animations.set(`${n}_reverse`, r);
        }
    }
  }
  _added() {
    this.onLoop = () => {
      this.onAnimationLoop.emit();
    }, this.onComplete = () => {
      this.onAnimationComplete.emit();
    }, this.onFrameChange = () => {
      this.onAnimationFrameChange.emit();
    }, this.autoPlay && this.play();
  }
};
var In = class extends Container {
  constructor(t) {
    return super({ isRenderGroup: true }), this.config = t, this.onZoom = new u(), this.onZoomComplete = new u(), this.minX = 0, this.minY = 0, this._zooming = false, this._zoomLerp = 0.1, this._targetPivot = new Point(0, 0), this._targetScale = new Point(1, 1), this._lerp = 0, this._target = null, this._followOffset = new Point(0, 0), w(this), t && (this.container = t.container, this.addChild(this.container), t.minX && (this.minX = t.minX), t.maxX && (this.maxX = t.maxX), t.minY && (this.minY = t.minY), this.viewportWidth = t.viewportWidth ?? this.app.size.width, this.viewportHeight = t.viewportHeight ?? this.app.size.width, this.worldWidth = t.worldWidth ?? this.viewportWidth, this.worldHeight = t.worldHeight ?? this.viewportHeight, this.maxX = t.maxX ?? this.worldWidth - this.viewportWidth, this.maxY = t.maxY ?? this.worldHeight - this.viewportHeight), this._targetPivot.set(this.viewportWidth * 0.5, this.viewportHeight * 0.5), t.target && (this.target = t.target), this._lerp = 1, this.update(), t.lerp && (this.lerp = t.lerp), this;
  }
  get zooming() {
    return this._zooming;
  }
  get zoomLerp() {
    return this._zoomLerp;
  }
  get targetPivot() {
    return this._targetPivot;
  }
  get targetScale() {
    return this._targetPivot;
  }
  get lerp() {
    return this._lerp;
  }
  set lerp(t) {
    (t < 0 || t > 1) && _.error("Camera lerp value must be in the range [0, 1]"), this._lerp = Math.max(0, Math.min(t, 1));
  }
  get target() {
    return this._target;
  }
  set target(t) {
    this._target = t, this._target && this.focusOn(this._target);
  }
  get followOffset() {
    return this._followOffset;
  }
  set followOffset(t) {
    this._followOffset = I(t, true);
  }
  get app() {
    return v.getInstance();
  }
  follow(t, e) {
    e || (e = { x: 0, y: 0 }), this.followOffset = e, this.target = t;
  }
  pan(t, e) {
    let i = this.pivot.x + t, n = this.pivot.y + e;
    i = Math.max(this.minX, Math.min(i, this.maxX)), n = Math.max(this.minY, Math.min(n, this.maxY)), this._targetPivot.set(i, n);
  }
  zoom(t, e = 0.1) {
    this._zoomLerp = e, this._zooming = true, this._targetScale.set(t, t);
  }
  update() {
    this.updateZoom(), this._target && this.focusOn(this._target), this.updatePosition(this._zooming), this._zooming && Math.abs(this.scale.x - this._targetScale.x) < 1e-3 && Math.abs(this.scale.y - this._targetScale.y) < 1e-3 ? (this.onZoom.emit(this), this._zooming = false, this.scale.set(this._targetScale.x, this._targetScale.y), this.onZoomComplete.emit(this)) : this._zooming && this.onZoom.emit(this);
  }
  focusOn(t) {
    const e = t.getGlobalPosition(), i = this.toLocal(e), n = this.position.x / this.scale.x - this.viewportWidth / 2, o = this.position.y / this.scale.y - this.viewportHeight / 2, r = this.followOffset.x / this.scale.x, a = this.followOffset.y / this.scale.y;
    this._targetPivot.x = (i.x * this.scale.x + this.viewportWidth / 2) * (1 / this.scale.x) + r;
    const h = this.viewportWidth / this.scale.x / 2 + n + this.minX - r, c = this.worldWidth - this.viewportWidth / this.scale.x / 2 + n + this.maxX + r;
    this._targetPivot.x < h ? this._targetPivot.x = h : this._targetPivot.x > c && (this._targetPivot.x = c), this._targetPivot.y = (i.y * this.scale.y + this.viewportHeight / 2) * (1 / this.scale.y) + a;
    const l = this.viewportHeight / this.scale.y / 2 + o + this.minY - a, d = this.worldHeight - this.viewportHeight / this.scale.y / 2 + o + this.maxY - a;
    this._targetPivot.y < l ? this._targetPivot.y = l : this._targetPivot.y > d && (this._targetPivot.y = d);
  }
  updateZoom() {
    const t = this.scale.x, e = this.scale.y, i = t + this._zoomLerp * (this._targetScale.x - t), n = e + this._zoomLerp * (this._targetScale.y - e);
    this.scale.set(Math.max(0, i), Math.max(0, n));
  }
  updatePosition(t = false) {
    if (this.lerp > 0 && !t) {
      const e = this.pivot.x, i = this.pivot.y, n = e + this.lerp * (this._targetPivot.x - e), o = i + this.lerp * (this._targetPivot.y - i);
      this.pivot.set(n, o);
    } else
      this.pivot.set(this._targetPivot.x, this._targetPivot.y);
    this.position.set(this.viewportWidth / 2, this.viewportHeight / 2);
  }
};
var Rn = class {
  constructor(t, e) {
    this.camera = t, this.interactiveArea = e, this.dragging = false, this.previousPointerPosition = null, w(this), this.camera = t, this.interactiveArea = e, this.app.keyboard.onKeyDown().connect(this.handleKeyDown), this.interactiveArea.on("pointerdown", this.onPointerDown.bind(this)), this.interactiveArea.on("pointermove", this.onPointerMove.bind(this)), this.app.stage.on("pointerup", this.onPointerUp.bind(this)), this.app.stage.on("pointerupoutside", this.onPointerUp.bind(this)), this.interactiveArea.on("touchstart", this.onPointerDown.bind(this)), this.interactiveArea.on("touchmove", this.onPointerMove.bind(this)), this.interactiveArea.on("touchend", this.onPointerUp.bind(this));
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this.interactiveArea.removeAllListeners(), this.app.stage.off("pointerup", this.onPointerUp.bind(this)), this.app.stage.off("pointerupoutside", this.onPointerUp.bind(this));
  }
  handleKeyDown(t) {
    switch (t.event.key) {
      case "ArrowUp":
        this.camera.pan(0, -10);
        break;
      case "ArrowDown":
        this.camera.pan(0, 10);
        break;
      case "ArrowLeft":
        this.camera.pan(-10, 0);
        break;
      case "ArrowRight":
        this.camera.pan(10, 0);
        break;
      case "+":
        this.camera.zoom(1.1);
        break;
      case "-":
        this.camera.zoom(1 / 1.1);
        break;
    }
  }
  onPointerDown(t) {
    this.dragging = true, this.previousPointerPosition = this.getEventPosition(t);
  }
  onPointerMove(t) {
    if (!this.dragging || !this.previousPointerPosition) return;
    const e = this.getEventPosition(t), i = e.x - this.previousPointerPosition.x, n = e.y - this.previousPointerPosition.y;
    this.camera.pan(i, n), this.previousPointerPosition = e;
  }
  onPointerUp() {
    this.dragging = false, this.previousPointerPosition = null;
  }
  getEventPosition(t) {
    return t instanceof TouchEvent ? new Point(t.touches[0].clientX, t.touches[0].clientY) : new Point(t.clientX, t.clientY);
  }
};
var ls = K(vt());
var cs = class extends ls {
  constructor(t) {
    super(), w(this);
    let e = t == null ? void 0 : t.data;
    if (this.paused = (t == null ? void 0 : t.paused) === true, typeof e == "string") {
      let i = e.slice(-5);
      i !== ".json" && i !== ".skel" ? i = ".json" : e = e.substring(0, e.length - 5), e = { skeleton: e + i, atlas: e + ".atlas" };
    }
    this.spine = window.Spine.from(e), this.add.existing(this.spine), t && (t.autoUpdate !== void 0 && (this.spine.autoUpdate = t.autoUpdate), t.animationName && this.setAnimation(t.animationName, t.loop, t.trackIndex ?? 0)), this.addSignalConnection(this.app.actions("toggle_pause").connect(this.togglePause));
  }
  get app() {
    return v.getInstance();
  }
  get animationNames() {
    return this.spine.state.data.skeletonData.animations.map((t) => t.name);
  }
  getCurrentAnimation(t = 0) {
    var e, i;
    return ((i = (e = this.spine.state.getCurrent(t)) == null ? void 0 : e.animation) == null ? void 0 : i.name) || "";
  }
  setAnimation(t, e = false, i = 0) {
    this.spine.state.setAnimation(i, t, e);
  }
  togglePause() {
    this.paused = !this.paused, this.spine.autoUpdate = !this.paused;
  }
};
var be = [
  "textures",
  "sounds",
  "actions",
  "cursor",
  "disabledCursor",
  "sheet",
  "enabled"
];
var us = Vt(Re(K(vt())));
var ds = class extends us {
  /**
   * @constructor
   * @param {Partial<ButtonConfig>} config - The configuration for the button.
   */
  constructor(t) {
    super(), this.onDown = new u(), this.onUp = new u(), this.onUpOutside = new u(), this.onOut = new u(), this.onOver = new u(), this.onClick = new u(), this.onEnabled = new u(), this.onDisabled = new u(), this.onKeyboardEvent = new u(), this.onDestroy = new u(), this._isDownCallbacks = /* @__PURE__ */ new Map(), this._isDownListenerAdded = false, w(this), this.config = Object.assign(
      {
        id: "button",
        textures: { default: "" },
        sheet: void 0,
        enabled: true,
        cursor: "default",
        disabledCursor: "not-allowed"
      },
      t
    ), this.id = this.config.id, this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet, anchor: 0.5 }), this.cursor = this.config.cursor, this.enabled = t.enabled !== false, this.addSignalConnection(
      this.onInteraction("pointerover").connect(this.handlePointerOver, -1),
      this.onInteraction("pointerout").connect(this.handlePointerOut, -1),
      this.onInteraction("pointerup").connect(this.handlePointerUp, -1),
      this.onInteraction("click").connect(this.handleClick, -1),
      this.onInteraction("tap").connect(this.handleClick, -1),
      this.onInteraction("pointerdown").connect(this.handlePointerDown, -1)
    );
  }
  /**
   * @description Sets the enabled state of the button.
   * @param {boolean} enabled - Whether the button is enabled.
   */
  set enabled(t) {
    this._enabled !== t && (this._enabled = t, this.cursor = this._enabled ? this.config.cursor : this.config.disabledCursor, this.focusEnabled = t, this._enabled ? (this.view.texture = this.make.texture({
      asset: this.config.textures.default,
      sheet: this.config.sheet
    }), this.onEnabled.emit()) : (this.view.texture = this.make.texture({
      asset: this.config.textures.disabled || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDisabled.emit()));
  }
  get app() {
    return v.getInstance();
  }
  destroy(t) {
    this.onDestroy.emit(), super.destroy(t);
  }
  focusOut() {
    super.focusOut(), this.isDown = false, this.isOver = false;
  }
  blur() {
    super.blur(), this.isDown = false, this.isOver = false;
  }
  getFocusArea() {
    return this.view.getBounds().clone();
  }
  getFocusPosition() {
    return [-this.width * 0.5, -this.height * 0.5];
  }
  addIsDownCallback(t, e) {
    this._isDownCallbacks.set(t, e), this._checkIsDownCallbacks();
  }
  removeIsDownCallback(t) {
    this._isDownCallbacks.delete(t);
  }
  setTexture(t, e) {
    this.config.textures[t] = e, t === "default" && (this.view.texture = this.make.texture({
      asset: this.config.textures.default,
      sheet: this.config.sheet
    }));
  }
  /**
   * @description Handles the pointer over event.
   * Sets the texture of the button to the hover texture and emits the onOver event.
   */
  handlePointerOver() {
    var t, e;
    this._enabled && (this.isOver || (this.isOver = true), !this.isDown && (this.view.texture = this.make.texture({
      asset: this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onOver.emit(), (t = this.config.sounds) != null && t.hover && this.app.audio.play(this.config.sounds.hover, "sfx"), (e = this.config.actions) != null && e.hover && this._doAction(this.config.actions.hover)));
  }
  /**
   * @description Handles the pointer out event.
   * Sets the texture of the button to the default texture and emits the onOut event.
   */
  handlePointerOut(t) {
    this.isOver = false, this._enabled && (this.isDown || (this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onOut.emit()));
  }
  /**
   * @description Handles the pointer down event.
   * Sets the isDown property to true and changes the texture of the button.
   */
  handlePointerDown(t) {
    var e, i, n;
    !this._enabled && !this.isKeyDown || !this.isDown && this._pointerId === void 0 && (this._pointerId = t.pointerId, window.removeEventListener("pointerup", this.handlePointerUpOutside), this.off("pointerupoutside", this.handlePointerUpOutside), window.addEventListener("pointerup", this.handlePointerUpOutside), this.on("pointerupoutside", this.handlePointerUpOutside), this.isDown = true, this.view.texture = this.make.texture({
      asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
      sheet: this.config.sheet
    }), this.onDown.emit(), (e = this.config.sounds) != null && e.down && this.app.audio.play(this.config.sounds.down, "sfx"), (i = this.config.actions) != null && i.down && (n = this.config.actions) != null && n.down && this._doAction(this.config.actions.down));
  }
  /**
   * @description Handles the pointer up event.
   * Removes the keyup event listener and emits the onPress and onUp events.
   */
  handlePointerUp(t) {
    var e, i;
    !this._enabled || !this.isOver || t.pointerId !== this._pointerId || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.onUp.emit(), (e = this.config.sounds) != null && e.up && this.app.audio.play(this.config.sounds.up, "sfx"), (i = this.config.actions) != null && i.up && this._doAction(this.config.actions.up), this._pointerId = void 0);
  }
  handleClick() {
    var t, e;
    this.isDown = false, this.onClick.emit(), (t = this.config.sounds) != null && t.click && this.app.audio.play(this.config.sounds.click, "sfx"), (e = this.config.actions) != null && e.click && this._doAction(this.config.actions.click);
  }
  /**
   * @description Handles the pointer up event.
   */
  handlePointerUpOutside(t) {
    var e, i;
    !this._enabled || t.pointerId !== this._pointerId || (window.removeEventListener("pointerup", this.handlePointerUpOutside), this.off("pointerupoutside", this.handlePointerUpOutside), this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet }), this.isDown = false, this.isOver = false, this.onUpOutside.emit(), (e = this.config.sounds) != null && e.up && this.app.audio.play(this.config.sounds.up, "sfx"), (i = this.config.actions) != null && i.up && this._doAction(this.config.actions.up), this._pointerId = void 0);
  }
  _doAction(t) {
    typeof t == "function" ? t() : (t.data.button || (t.data.button = this), this.app.action(t.id, t.data));
  }
  _checkIsDownCallbacks() {
    !this._isDownListenerAdded && this._isDownCallbacks.size > 0 ? (this._isDownListenerAdded = true, this.app.ticker.add(this._handleIsDownCallbacks)) : (this.app.ticker.remove(this._handleIsDownCallbacks), this._isDownListenerAdded = false);
  }
  _handleIsDownCallbacks() {
    this.isDown && this._isDownCallbacks.forEach((t) => {
      t();
    });
  }
};
var fs = K(vt());
var xe = [
  "width",
  "height",
  "bindTo",
  "bindToAppSize",
  "gap",
  "flexWrap",
  "flexDirection",
  "alignItems",
  "justifyContent"
];
var ps = {
  bindTo: null,
  width: 0,
  height: 0,
  gap: 0,
  flexWrap: "nowrap",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: 0
};
var Et = class _Et extends fs {
  constructor(t = {}) {
    super(), this.onLayoutComplete = new u(), this.debug = false, this.paddingLeft = 0, this.paddingRight = 0, this.paddingTop = 0, this.paddingBottom = 0, this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = true, this._flexChildren = [], this.removeChildren = () => {
      const e = this.flexChildren;
      return this.removeChild(...e), e;
    }, this.removeChildAt = (e) => this.removeChild(this.flexChildren[e]), this.addChildAt = (e, i) => {
      const n = this.add.existing(e);
      return this.setChildIndex(n, i), n;
    }, this.setChildIndex = (e, i) => {
      const n = this._childMap.get(e);
      n && (super.setChildIndex(n, i), this.setFlexChildren(), this.layout());
    }, this.getChildIndex = (e) => this._childMap.has(e) ? super.getChildIndex(e.parent) : super.getChildIndex(e), this.getChildAt = (e) => {
      var i;
      return (i = super.getChildAt(e)) == null ? void 0 : i.getChildAt(0);
    }, w(this), this.config = Object.assign({ ...ps }, t), this.on("added", this._added), this.on("childAdded", this.handleChildAdded), this.on("childRemoved", this.handleChildRemoved), this.layout();
  }
  get flexChildren() {
    return this._flexChildren;
  }
  get gap() {
    return this.config.gap;
  }
  set gap(t) {
    this.config.gap = t, this.layout();
  }
  get flexWrap() {
    return this.config.flexWrap;
  }
  set flexWrap(t) {
    this.config.flexWrap = t, this.layout();
  }
  get flexDirection() {
    return this.config.flexDirection;
  }
  set flexDirection(t) {
    this.config.flexDirection = t, this.layout();
  }
  get alignItems() {
    return this.config.alignItems;
  }
  set alignItems(t) {
    this.config.alignItems = t, this.layout();
  }
  get justifyContent() {
    return this.config.justifyContent;
  }
  set justifyContent(t) {
    this.config.justifyContent = t, this.layout();
  }
  get containerHeight() {
    return this.config.height;
  }
  set containerHeight(t) {
    this.config.height = t, this.layout();
  }
  get containerWidth() {
    return this.config.width;
  }
  set containerWidth(t) {
    this.config.width = t, this.layout();
  }
  get size() {
    return { width: this.config.width, height: this.config.height };
  }
  set size(t) {
    const { x: e, y: i } = I(t);
    this.config.width = e, this.config.height = i, this.layout();
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  destroy(t) {
    this.off("childAdded", this.handleChildAdded), this.off("childRemoved", this.handleChildRemoved), super.destroy(t);
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   * @param children
   */
  removeChild(...t) {
    if (this._reparentAddedChild)
      t.forEach((e) => {
        const i = this._childMap.get(e);
        if (i)
          return super.removeChild(i);
      });
    else
      return super.removeChild(...t);
    return t[0];
  }
  getChildByLabel(t, e = true) {
    for (let i = 0; i < this.flexChildren.length; i++) {
      const n = this.flexChildren[i];
      if (n.label) {
        if (t instanceof RegExp) {
          if (t.test(n.label))
            return n;
        } else if (n.label === t)
          return n;
      }
      if (e) {
        const o = n.getChildByLabel(t, e);
        if (o)
          return o;
      }
    }
    return null;
  }
  /**
   * Public method to manually trigger a layout
   */
  layout() {
    this.app.ticker.addOnce(this._layout, this);
  }
  resize() {
    this.layout();
  }
  update() {
  }
  added() {
  }
  /**
   * Ensures we delete the child from the map when it's removed
   * @protected
   */
  handleChildRemoved(t) {
    this._reparentAddedChild && (this.deleteChild(t) || (t = t.getChildAt(0), this.deleteChild(t)));
  }
  /**
   * Deletes a child from the map
   * @param {Container} child
   * @returns {boolean}
   * @protected
   */
  deleteChild(t) {
    if (this._childMap.has(t)) {
      if (t instanceof _Et)
        try {
          t.onLayoutComplete.disconnect(this.layout);
        } catch (i) {
          _.warn("FlexContainer:: Error disconnecting signal from removed child"), console.warn(i);
        }
      return this._childMap.delete(t), this.setFlexChildren(), this.layout(), true;
    }
    return false;
  }
  /**
   * Sorts the children in the container
   * Needed because we need to ensure re-parented children are sorted by their actual index in the container
   * @protected
   */
  setFlexChildren() {
    this._flexChildren = Array.from(this._childMap.keys()), this._flexChildren.sort((t, e) => this.getChildIndex(t) - this.getChildIndex(e)), this.cleanup();
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.flexChildren.length !== this.children.length && this.children.forEach((t) => {
      var e;
      (e = t == null ? void 0 : t.children) != null && e.length || super.removeChild(t);
    });
  }
  /**
   * Re-parent a child to account for e.g. sprite that are added with anchors
   * @param child
   * @protected
   */
  handleChildAdded(t) {
    if (!this._reparentAddedChild) return;
    this._reparentAddedChild = false;
    const e = this.add.container();
    e.add.existing(t);
    const i = e.getLocalBounds();
    i.x < 0 && (e.pivot.x = i.x), i.y < 0 && (e.pivot.y = i.y), t instanceof _Et && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this._childMap.set(t, e), this.setFlexChildren(), this._reparentAddedChild = true, this.app.render(), this.layout();
  }
  /**
   * Lay out the children according to the settings
   * Tries to follow the CSS Flexbox model as closely as possible
   * @private
   */
  _layout() {
    var Yt, Nt;
    this.config.bindTo && (this.config.width = ((Yt = this.config.bindTo) == null ? void 0 : Yt.width) ?? 0, this.config.height = ((Nt = this.config.bindTo) == null ? void 0 : Nt.height) ?? 0), this.config.bindToAppSize && (this.config.width = this.app.size.width, this.config.height = this.app.size.height);
    const t = ["flex-start"];
    let { width: e, height: i } = this.config;
    const { gap: n, flexDirection: o, flexWrap: r, alignItems: a, justifyContent: h } = this.config;
    this.config.flexDirection === "row" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) ? e = 1 / 0 : this.config.flexDirection === "column" && this.config.flexWrap === "nowrap" && t.includes(this.config.justifyContent) && (i = 1 / 0);
    let c = [], l = 0, d = 0, p = 0, U = 0, H = 0, z = 0;
    const f = [], F = this.children.filter(Boolean);
    let G = [], tt = 0;
    const Ke = (g, D, A) => o === "row" && D + g.width + n > e || o === "column" && A + g.height + n > i, je = () => {
      o === "row" ? H += p + n : z += U + n, l = 0, d = 0, p = 0, U = 0;
    }, He = (g) => {
      o === "row" ? (l += g.width + n, p = Math.max(p, g.height)) : (d += g.height + n, U = Math.max(U, g.width));
    }, Ge = (g) => o === "row" ? g : z, Ve = (g) => o === "column" ? g : H, Xt = (g, D, A, V) => {
      const S = (V === "row" ? e : i) - (A - D);
      g.forEach(({ index: Zt }, Dt) => {
        let j = 0;
        switch (h) {
          case "flex-start":
            break;
          case "flex-end":
            j = S;
            break;
          case "center":
            j = S / 2;
            break;
          case "space-between":
            j = g.length > 1 ? Dt * (S / (g.length - 1)) : 0;
            break;
          case "space-around":
            j = S / g.length * Dt + S / (2 * g.length);
            break;
          case "space-evenly":
            j = S / (g.length + 1) * (Dt + 1);
            break;
        }
        V === "row" ? f[Zt].x += j : f[Zt].y += j;
      });
    }, Xe = (g, D) => {
      g.forEach((A, V) => {
        const S = D[V];
        if (S)
          if (o === "row")
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                A.y += p - S.height;
                break;
              case "center":
                A.y += (p - S.height) / 2;
                break;
            }
          else
            switch (a) {
              case "flex-start":
                break;
              case "flex-end":
                A.x = e ? e - S.width : -S.width;
                break;
              case "center":
                A.x += (e - S.width) / 2;
                break;
            }
      });
    };
    F.forEach((g, D) => {
      if (!g) return;
      const A = g;
      r === "wrap" && Ke(A, l, d) && (Xt(G, tt, o === "column" ? d - n : l - n, o), je(), G = [], tt = l), G.push({ index: D, width: A.width, height: A.height }), f[D] = { x: Ge(l), y: Ve(d) }, He(A);
    }), Xt(G, tt, o === "column" ? d - n : l - n, o), Xe(f, F), c = f, F.forEach((g, D) => {
      const A = g, { x: V, y: S } = c[D] || { x: 0, y: 0 };
      A.position.set(V, S);
    });
    const qt = this.children.reduce((g, D) => Math.max(g, D.y + D.height), 0);
    this.children.forEach((g) => {
      if (this.config.flexDirection === "row")
        switch (this.config.alignItems) {
          case "center":
            g.y -= (qt - i) * 0.5;
            break;
          case "flex-end":
            g.y += i - qt;
            break;
        }
    }), this.onLayoutComplete.emit();
  }
  _added() {
    this.addSignalConnection(this.app.onResize.connect(this.layout, 0)), this.added();
  }
};
var Ce = ["debug", "padding", "size", "useAppSize"];
var _s = K(vt());
var Lt = class _Lt extends _s {
  constructor(t) {
    super(), this.settingsMap = /* @__PURE__ */ new Map(), this._childMap = /* @__PURE__ */ new Map(), this._reparentAddedChild = true, this._disableAddChildError = false, this._canvasChildren = [], this.removeChildren = (e, i) => this._inner.removeChildren(e, i), this.removeChildAt = (e) => this._inner.removeChildAt(e), this.addChildAt = (e, i) => {
      const n = this._inner.add.existing(e);
      return this._inner.setChildIndex(n, i), n;
    }, this.setChildIndex = (e, i) => {
      this._inner.setChildIndex(e, i), this.layout();
    }, this.getChildIndex = (e) => this._inner.getChildIndex(e), this.getChildAt = (e) => {
      var i;
      return (i = this._inner.getChildAt(e)) == null ? void 0 : i.getChildAt(0);
    }, w(this), this.config = {
      debug: t.debug === true,
      padding: bt((t == null ? void 0 : t.padding) ?? 0),
      size: t.size !== void 0 ? Jt(t.size) : { width: 0, height: 0 },
      useAppSize: t.useAppSize === true
    }, this._disableAddChildError = true, this._inner = this.add.container({ x: this.config.padding.left, y: this.config.padding.top }), this._disableAddChildError = false, this.addSignalConnection(this.app.onResize.connect(this.resize)), this.on("childRemoved", this._childRemoved), this.once("added", this._added);
  }
  get bounds() {
    return this._bounds || (this._bounds = this.getBounds()), this._bounds;
  }
  get canvasChildren() {
    return this._canvasChildren;
  }
  /**
   * Get the application instance.
   */
  get app() {
    return v.getInstance();
  }
  set size(t) {
    this.config.useAppSize = false, this.config.size = t === void 0 ? { width: 0, height: 0 } : Jt(t), this.resize();
  }
  set padding(t) {
    this.config.padding = bt(t), this._inner.position.set(this.config.padding.left, this.config.padding.top), this.resize();
  }
  static isFlexContainer(t) {
    return (t == null ? void 0 : t.flexChildren) !== void 0;
  }
  addChild(...t) {
    return this._disableAddChildError ? super.addChild(...t) : (_.warn(
      "UICanvas:: You probably shouldn't add children directly to UICanvas. Use .addElement(child, settings) instead, so you can pass alignment settings.",
      t,
      "will be added using the default 'top left' alignment'."
    ), this._inner.addChild(...t));
  }
  /**
   * Removes one or more children from the container
   * Override because we need to ensure it returns the proper re-parented children
   */
  removeChild(...t) {
    if (this._reparentAddedChild)
      t.forEach((e) => {
        const i = this._childMap.get(e);
        if (i)
          return this._inner.removeChild(i);
      });
    else
      return this._inner.removeChild(...t);
    return t[0];
  }
  resize() {
    const t = this.config.useAppSize ? this.app.size : this.config.size;
    this._displayBounds = this.__calculateBounds(t), this._outerBounds = this.__calculateOuterBounds(t), this.layout(), this.config.useAppSize && this.position.set(-t.width * 0.5, -t.height * 0.5), this.config.debug && this.app.ticker.addOnce(this.drawDebug);
  }
  layout() {
    this._inner.children.forEach((t) => {
      const e = t, i = this.settingsMap.get(e);
      i && this.applySettings(e, i);
    });
  }
  addElement(t, e) {
    const i = this._inner.add.container();
    i.addChild(t);
    const n = i.getLocalBounds();
    return n.x < 0 && (i.pivot.x = n.x), n.y < 0 && (i.pivot.y = n.y), t != null && t.flexChildren && this.addSignalConnection(t.onLayoutComplete.connect(this.layout)), this.settingsMap.set(i, {
      align: (e == null ? void 0 : e.align) ?? "top left",
      padding: e != null && e.padding ? bt(e.padding) : { top: 0, left: 0, bottom: 0, right: 0 }
    }), this._childMap.set(t, i), this._canvasChildren = Array.from(this._childMap.keys()), this.resize(), t;
  }
  /**
   * Ensure we don't leave empty containers after setting child indices or adding / removing children
   * @protected
   */
  cleanup() {
    this.canvasChildren.length !== this.children.length && this.children.forEach((t) => {
      var e;
      this.config.debug && t === this._debugGraphics || (e = t == null ? void 0 : t.children) != null && e.length || super.removeChild(t);
    });
  }
  __calculateBounds(t) {
    return new Rectangle(
      0,
      0,
      t.width - this.config.padding.left - this.config.padding.right,
      t.height - this.config.padding.top - this.config.padding.bottom
    );
  }
  __calculateOuterBounds(t) {
    return new Rectangle(0, 0, t.width, t.height);
  }
  _childRemoved(t) {
    this.settingsMap.delete(t), this._childMap.delete(t), this._canvasChildren = Array.from(this._childMap.keys());
  }
  _added() {
    this.layout();
  }
  applySettings(t, e) {
    if (!e) return;
    const i = this._displayBounds.width, n = this._displayBounds.height, o = t.getChildAt(0), r = _Lt.isFlexContainer(o) && o.containerWidth || t.width, a = _Lt.isFlexContainer(o) && o.containerHeight || t.height;
    switch (e.align) {
      case "top right":
        t.x = i - r, t.y = 0;
        break;
      case "top left":
        t.x = 0, t.y = 0;
        break;
      case "top center":
      case "top":
        t.x = (i - r) / 2, t.y = 0;
        break;
      case "bottom right":
        t.x = i - r, t.y = n - a;
        break;
      case "bottom left":
        t.x = 0, t.y = n - a;
        break;
      case "bottom center":
      case "bottom":
        t.x = (i - t.width) / 2, t.y = n - a;
        break;
      case "left top":
        t.x = 0, t.y = 0;
        break;
      case "left bottom":
        t.x = 0, t.y = n - a;
        break;
      case "left center":
      case "left":
        t.x = 0, t.y = (n - a) / 2;
        break;
      case "right top":
        t.x = i - r, t.y = 0;
        break;
      case "right bottom":
        t.x = i, t.y = n;
        break;
      case "right center":
      case "right":
        t.x = i - r, t.y = (n - a) / 2;
        break;
      case "center":
        t.x = (i - r) / 2, t.y = (n - a) / 2;
        break;
    }
    t.x += wt(e.padding.left, i) - wt(e.padding.right, i), t.y += wt(e.padding.top, n) - wt(e.padding.bottom, n);
  }
  drawDebug() {
    this._debugGraphics || (this._disableAddChildError = true, this._debugGraphics = this._inner.add.graphics(), this._disableAddChildError = false), this._debugGraphics.clear().rect(0, 0, this._displayBounds.width, this._displayBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).rect(-this.config.padding.left, -this.config.padding.top, this._outerBounds.width, this._outerBounds.height).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).moveTo(this._displayBounds.width / 2, this._displayBounds.height / 2 - 10).lineTo(this._displayBounds.width / 2, this._displayBounds.height / 2 + 10).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    }).moveTo(this._displayBounds.width / 2 - 10, this._displayBounds.height / 2).lineTo(this._displayBounds.width / 2 + 10, this._displayBounds.height / 2).stroke({
      width: 1,
      color: 16711680,
      alpha: 0.5,
      pixelLine: true
    });
  }
};
var gs = {
  color: 0,
  alpha: 0.75
};
var ms = { backing: true, closeOnEscape: true, closeOnPointerDownOutside: true };
var ct = class _ct extends B {
  /**
   * Create a new Popup
   * @param id - The unique identifier for the popup
   * @param config - The configuration for the popup
   */
  constructor(t, e = {}) {
    super(), this.id = t, this.isShowing = false, this.config = Object.assign({ id: t, ...ms }, e), this._initialize();
  }
  get data() {
    return this.config.data;
  }
  /**
   * Create a backing for the popup
   * @param config - The configuration for the backing
   * @param size - The size of the backing
   * @returns The backing container
   */
  static makeBacking(t, e) {
    let i = {};
    typeof t == "object" && (i = t);
    const n = Object.assign({ ...gs }, i);
    if (_ct.BACKING_TEXTURE === void 0) {
      const a = new Graphics();
      a.rect(0, 0, 100, 100).fill("white"), _ct.BACKING_TEXTURE = v.getInstance().renderer.generateTexture(a);
    }
    const o = new B();
    o.sortableChildren = false;
    const r = o.addChild(new Sprite(_ct.BACKING_TEXTURE));
    return r.anchor.set(0.5), r.alpha = n.alpha, r.tint = n.color, r.setSize(e.width, e.height), o;
  }
  initialize() {
  }
  beforeHide() {
    this.app.focus.removeFocusLayer(this.id);
  }
  destroy(t) {
    this.app.focus.removeFocusLayer(this.id), super.destroy(t);
  }
  async hide() {
    return this.visible = false, Promise.resolve();
  }
  async show() {
    return this.resize(), this.visible = true, Promise.resolve();
  }
  async start() {
  }
  afterShow() {
    this.firstFocusableEntity && (this.app.focus.add(this.firstFocusableEntity, this.id, true), this.app.focus.setFocus(this.firstFocusableEntity));
  }
  /**
   * End the popup
   */
  end() {
  }
  async close() {
    this.app.popups.hidePopup(this.id, this.config.data);
  }
  resize() {
    var t;
    (t = this.backing) == null || t.setSize(this.app.size.width, this.app.size.height);
  }
  /**
   * Initialize the popup
   * @private
   */
  _initialize() {
    this.app.focus.addFocusLayer(this.id, false), this.config.backing && (this.backing = this.add.existing(_ct.makeBacking(this.config.backing, this.app.size)), this.backing.eventMode = "static", this.config.closeOnPointerDownOutside && (this.backing.once("click", this.close), this.backing.once("tap", this.close))), this.view = this.add.container(), this.view.eventMode = "static";
  }
};
var Y = {
  value: "",
  type: "text",
  fixed: true,
  pattern: "",
  debug: false,
  minWidth: 200,
  padding: { top: 0, left: 0, bottom: 0, right: 0 },
  blurOnEnter: true,
  style: {
    fontFamily: "Arial",
    fill: "#000000",
    fontSize: 20,
    fontWeight: "bold"
  },
  bg: {
    radius: 5,
    fill: { color: 16777215 },
    stroke: { width: 1, color: 0 }
  },
  placeholder: {},
  selection: { color: 65280 },
  caret: {
    color: 0,
    alpha: 0.8
  },
  focusOverlay: {
    activeFilter: false,
    scale: 1,
    marginTop: 60
  }
};
var ys = ["text", "password", "number", "email", "tel", "url"];
var Ue = class _Ue extends Vt(Re(K(B))) {
  constructor(t, e = false, i = null) {
    var n, o, r, a;
    if (super({ autoUpdate: true, autoResize: !e }), this.isClone = e, this.clone = i, this.onEnter = new u(), this.onChange = new u(), this.onError = new u(), this._lastWidth = 0, this._lastHeight = 0, this._caretPosition = -1, this._value = "", this.options = {
      ...Y,
      ...t,
      style: {
        ...Y.style,
        ...(t == null ? void 0 : t.style) ?? {}
      },
      padding: bt(t.padding ?? Y.padding),
      bg: {
        ...Y.bg,
        ...t.bg ?? {}
      },
      focusOverlay: {
        ...Y.focusOverlay,
        ...t.focusOverlay ?? {}
      }
    }, this.options.placeholder || (this.options.placeholder = {
      color: Number((n = this.options.style) == null ? void 0 : n.fill) ?? 6710886
    }), this._inner = this.add.container(), this.addBg(), this._inputContainer = this._inner.add.container({ y: -2 }), this.addSelection(), this.addCaret(), this.addInput(), this.addPlaceholder(), this.placeholder.text = this.options.placeholder.text || `Enter ${this.options.type}`, this.input.eventMode = this.placeholder.eventMode = "none", Ot && this.addSignalConnection(this.onInteraction("pointertap").connect(this.handleClick, -1)), this.addSignalConnection(this.onInteraction("click").connect(this.handleClick, -1)), this.options.fixed) {
      const h = this.isClone ? ((a = (r = (o = this.clone) == null ? void 0 : o.options) == null ? void 0 : r.focusOverlay) == null ? void 0 : a.scale) ?? 1 : 1;
      this._mask = this._inner.add.graphics().rect(
        0,
        0,
        this.bg.width * h - this.options.padding.left - this.options.padding.right,
        this.bg.height * h - this.options.padding.top - this.options.padding.bottom
      ).fill({ color: 0 }), this._inputContainer.mask = this._mask;
    }
  }
  get caretPosition() {
    return this._caretPosition;
  }
  get selectionRect() {
    return this._selectionRect;
  }
  set regex(t) {
    this._regex = t;
  }
  get isValid() {
    let t = false;
    if (this.domElement)
      if (this._regex)
        t = this._regex.test(this._value);
      else {
        if (this.options.type === "text")
          return true;
        this.domElement.required = true, t = this.domElement.checkValidity(), this.domElement.required = false;
      }
    return t;
  }
  get value() {
    var t;
    return ((t = this._value) == null ? void 0 : t.trim()) ?? "";
  }
  set value(t) {
    if (this.domElement) {
      this.domElement.value = t;
      const e = new Event("input", {
        bubbles: true,
        cancelable: true
      });
      this.domElement.dispatchEvent(e);
    } else
      this._value = t, this.input.text = t;
  }
  resize() {
    super.resize(), this.cloneOverlay && this._positionCloneOverlay();
  }
  resetBg() {
    this.drawBg();
  }
  added() {
    super.added(), this.isClone && this.showCursor();
  }
  handleClick(t) {
    var i, n;
    if ((i = t == null ? void 0 : t.originalEvent) != null && i.key)
      return;
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer);
    const e = t ? pi(this.input, t) : ((n = this.input.text) == null ? void 0 : n.length) ?? 0;
    this.createDomElement(e);
  }
  focusIn() {
    this.handleClick();
  }
  _focusDomElement(t) {
    di ? this._triggerFocusAndSelection(t) : this._focusTimer = setTimeout(() => {
      this._triggerFocusAndSelection(t);
    }, 100);
  }
  _triggerFocusAndSelection(t) {
    var e, i;
    if (this.domElement) {
      try {
        this.domElement.focus(), this.domElement.click(), t === void 0 ? this.domElement.selectionStart = (i = (e = this.domElement) == null ? void 0 : e.value) == null ? void 0 : i.length : this.domElement.setSelectionRange(t, t, "none");
      } catch {
      }
      this._updateCaretAndSelection();
    }
  }
  _checkPointerDownOutside(t) {
    const e = this.toLocal(t.data.global);
    this.getBounds().rectangle.contains(e.x, e.y) ? this.focusIn() : this.focusOut();
  }
  focusOut() {
    var t;
    (t = this.domElement) == null || t.blur();
  }
  update() {
    var o, r, a, h, c;
    this.bg.x = 0, this.bg.y = 0;
    const t = this.input.getLocalBounds().y + this.input.style.fontSize + this.options.padding.top + this.options.padding.bottom, e = this.options.fixed ? this.options.minWidth : Math.max(this.options.minWidth, this.input.width) + this.options.padding.left + this.options.padding.right, i = this.options.minWidth - e + this.options.padding.left + this.options.padding.right, n = e - this.options.padding.left - this.options.padding.right;
    switch (this.input.style.align) {
      case "center":
        if (this.input.x = e / 2 - this.input.width / 2, this.placeholder.x = e / 2 - this.placeholder.width / 2, this._inner.x = i >= 0 ? 0 : i / 2, this.options.fixed) {
          const l = this.input.width - n;
          l > 0 && (this.input.x -= l / 2);
        }
        break;
      case "right":
        this.input.x = e - this.options.padding.right - this.input.width, this.placeholder.x = e - this.options.padding.right - this.placeholder.width, this._inner.x = i >= 0 ? 0 : i;
        break;
      default:
        if (this.input.x = this.options.padding.left, this.placeholder.x = this.options.padding.left, this._inner.x = 0, this.options.fixed) {
          const l = this.input.width - n;
          l > 0 && (this.input.x -= l);
        }
        break;
    }
    if (this.input.y = this.options.padding.top, this.placeholder.y = this.input.y, this.isClone && this.clone) {
      const l = ((r = (o = this.clone.options) == null ? void 0 : o.focusOverlay) == null ? void 0 : r.scale) ?? 1;
      this.error = this.clone.error, this._value = this.clone.input.text, this.input.text = this._value, this._selectionRect = this.clone.selectionRect.clone(), this._selectionRect.x *= l, this._selectionRect.y *= l, this._selectionRect.width *= l, this._selectionRect.height *= l, this._caretPosition = this.clone.caretPosition * l;
    }
    if (this.caret.x = this._caretPosition >= 0 ? this.input.x + this._caretPosition : this.input.x + this.input.width + 1, this.caret.y = this.input.y - 2, this.caret.height = this.input.style.fontSize * 1.15, this.value === "" ? this.placeholder.visible = true : this.placeholder.visible = false, this.options.fixed) {
      const l = this.isClone ? ((h = (a = this.options) == null ? void 0 : a.focusOverlay) == null ? void 0 : h.scale) ?? 1 : 1;
      this._mask && (this._mask.clear().rect(0, 0, (e - this.options.padding.left - this.options.padding.right) * l, t * l).fill({ color: 0 }), this._mask.position.set(this.options.padding.left * l, 0));
    }
    e !== this._lastWidth && this.drawBg(e, t), this._selectionRect ? this.drawSelection() : (c = this.selectionGraphics) == null || c.clear(), this.cloneOverlay && this._positionCloneOverlay();
  }
  drawSelection() {
    var e, i;
    const t = this._selectionRect;
    if (!t) {
      (e = this.selectionGraphics) == null || e.clear();
      return;
    }
    (i = this.selectionGraphics) == null || i.clear(), this.selectionGraphics.rect(t.left + this.input.x, this.caret.y, t.width, this.caret.height).fill({ color: this.options.selection.color });
  }
  drawBg(t = this._lastWidth, e = this._lastHeight) {
    var n, o, r;
    const i = (this.error || this.isClone && ((n = this.clone) != null && n.error)) && ((r = (o = this.options) == null ? void 0 : o.error) != null && r.bg) ? { ...this.options.bg, ...this.options.error.bg } : this.options.bg;
    this.bg.clear().roundRect(0, 0, t, e, (i == null ? void 0 : i.radius) ?? 0).fill(i.fill).stroke({ ...(i == null ? void 0 : i.stroke) || {}, alignment: 0 }), this._lastWidth = t, this._lastHeight = e;
  }
  destroy() {
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.app.stage.off("pointerdown", this._checkPointerDownOutside), this.hideCursor(), this.destroyDomElement(), super.destroy();
  }
  addBg() {
    var t, e;
    this.bg = this._inner.add.graphics().roundRect(0, 0, 100, 50, ((e = (t = this.options) == null ? void 0 : t.bg) == null ? void 0 : e.radius) ?? 0).fill(this.options.bg.fill);
  }
  addSelection() {
    this.selectionGraphics = this._inputContainer.add.graphics();
  }
  addCaret() {
    this.caret = this._inputContainer.add.sprite({
      asset: Texture.WHITE,
      width: 3,
      height: 10,
      tint: this.options.caret.color ?? 0,
      alpha: 0,
      visible: false
    });
  }
  addInput() {
    var t;
    this.input = this._inputContainer.add.text({
      ...this.options,
      style: { ...((t = this.options) == null ? void 0 : t.style) || {}, padding: 2 },
      text: this.options.value ?? "",
      label: "input",
      resolution: 2,
      roundPixels: true
    });
  }
  addPlaceholder() {
    var t;
    this.placeholder = this._inputContainer.add.text({
      ...this.options,
      ...this.options.placeholder,
      style: {
        ...this.options.style,
        fill: ((t = this.options.placeholder) == null ? void 0 : t.color) ?? 6710886
      },
      resolution: 2,
      label: "placeholder",
      roundPixels: true
    }), this.placeholder.style.align = this.input.style.align;
  }
  createDomElement(t) {
    var n, o, r, a, h;
    if (this.isClone && ((n = this.clone) != null && n.domElement)) {
      this.domElement = this.clone.domElement, this._addDomElementListeners();
      return;
    }
    clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.domElement = document.createElement("input"), this.domElement.type = "text", this.options.type && ys.includes(this.options.type) && (this.domElement.type = this.options.type), this.options.pattern && (this.domElement.pattern = this.options.pattern), this.options.regex && (this._regex = this.options.regex);
    const e = this.getGlobalPosition(), i = this.getBounds();
    i.x = e.x, i.y = e.y, i.width = this.width - this.options.padding.left, this.domElement.style.position = "fixed", this.domElement.style.border = "none", this.domElement.style.outline = "none", this.domElement.style.left = ee ? "0" : `${i.left}px`, this.domElement.style.top = ee ? "0" : `${i.top}px`, this.domElement.style.width = `${i.width}px`, this.domElement.style.height = `${i.height}px`, this.domElement.style.padding = "0", this.options.debug ? this.domElement.style.opacity = "0.8" : this.domElement.style.opacity = "0.0000001", (o = this.app.canvas.parentElement) == null || o.appendChild(this.domElement), this.domElement.value = this.value, this.domElement.setAttribute("placeholder", ((a = (r = this.options) == null ? void 0 : r.placeholder) == null ? void 0 : a.text) ?? ""), (h = this.options) != null && h.maxLength && this.domElement.setAttribute("maxLength", this.options.maxLength.toString()), this._addDomElementListeners(), this._focusDomElement(t);
  }
  destroyDomElement() {
    this.isClone || this.domElement && (this._removeDomElementListeners(), this.domElement.remove(), this.domElement = null);
  }
  showCursor() {
    this.caret.visible = true, this.blinkCaret();
  }
  hideCursor() {
    var t;
    (t = this.cursorAnimation) == null || t.kill(), this.caret.visible = false;
  }
  blinkCaret() {
    this.cursorAnimation && this.cursorAnimation.kill(), this.cursorAnimation = gsapWithCSS.fromTo(
      this.caret,
      { alpha: 0 },
      {
        duration: 0.5,
        alpha: 1,
        yoyo: true,
        repeat: -1,
        overwrite: true
      }
    );
  }
  validate() {
    var e, i, n, o, r, a, h, c, l;
    const t = this.error;
    this.isClone ? this.error = ((e = this.clone) == null ? void 0 : e.error) || false : (this.error = !this.isValid, this.error && this.error !== t && this.onError.emit({ input: this, domElement: this.domElement, value: this._value })), this.error !== t && (this.error && ((o = (n = (i = this.options) == null ? void 0 : i.error) == null ? void 0 : n.input) != null && o.fill) ? this.input.style.fill = (h = (a = (r = this.options) == null ? void 0 : r.error) == null ? void 0 : a.input) == null ? void 0 : h.fill : this.input.style.fill = ((l = (c = this.options.input) == null ? void 0 : c.style) == null ? void 0 : l.fill) || 0, this.drawBg()), this.cloneOverlay && this.cloneOverlay.validate();
  }
  _removeDomElementListeners() {
    this.domElement.removeEventListener("focus", this._handleDomElementFocus, false), this.domElement.removeEventListener("blur", this._handleDomElementBlur, false), this.domElement.removeEventListener("input", this._handleDomElementChange, false), this.domElement.removeEventListener("keyup", this._handleDomElementKeyup, false), this.domElement.removeEventListener("keydown", this._handleDomElementKeydown, false);
  }
  _addDomElementListeners() {
    this.isClone || (this._removeDomElementListeners(), this.domElement.addEventListener("focus", this._handleDomElementFocus, false), this.domElement.addEventListener("blur", this._handleDomElementBlur, false), this.domElement.addEventListener("input", this._handleDomElementChange, false), this.domElement.addEventListener("keyup", this._handleDomElementKeyup, false), this.domElement.addEventListener("keydown", this._handleDomElementKeydown, false));
  }
  _handleFocus() {
    var t, e, i, n, o, r, a, h, c, l, d, p;
    if (this._caretPosition = -1, this.showCursor(), clearTimeout(this._pointerDownTimer), !this.isClone) {
      this._pointerDownTimer = setTimeout(() => {
        this.app.stage.on("pointerdown", this._checkPointerDownOutside);
      }, 250);
      const U = !!this.options.focusOverlay.activeFilter;
      if (U) {
        this.cloneOverlay && this._removeCloneOverlay();
        const H = Array.isArray(this.options.focusOverlay.activeFilter);
        let z = false;
        if (H) {
          const f = this.options.focusOverlay.activeFilter;
          (te && f.includes("mobile") || Ot && f.includes("touch") || !te && !Ot && f.includes("desktop")) && (z = true);
        } else typeof this.options.focusOverlay.activeFilter == "function" ? z = this.options.focusOverlay.activeFilter() : z = U;
        if (z) {
          const f = structuredClone(this.options), F = ((t = this.options.focusOverlay) == null ? void 0 : t.scale) || 1;
          f.focusOverlay = { activeFilter: false };
          const G = Number(((e = f.style) == null ? void 0 : e.fontSize) || ((i = Y.style) == null ? void 0 : i.fontSize) || 20) * F;
          if (f.style || (f.style = {}), f.style.fontSize = G, f.padding && (f.padding.left *= F, f.padding.top *= F, f.padding.right *= F, f.padding.bottom *= F), (n = f.bg) != null && n.radius && (f.bg.radius *= F), (r = (o = f.bg) == null ? void 0 : o.stroke) != null && r.width && (f.bg.stroke.width *= F), f.minWidth && (f.minWidth *= F, f.minWidth > this.app.size.width && (f.minWidth = this.app.size.width - ((h = (a = f.bg) == null ? void 0 : a.stroke) != null && h.width ? f.bg.stroke.width * 2 + 20 : 20))), (l = (c = this.options.focusOverlay) == null ? void 0 : c.backing) != null && l.active) {
            const tt = this.make.sprite({
              asset: Texture.WHITE,
              tint: ((d = this.options.focusOverlay.backing.options) == null ? void 0 : d.color) ?? 0,
              alpha: ((p = this.options.focusOverlay.backing.options) == null ? void 0 : p.alpha) ?? 0.8,
              width: this.app.size.width,
              height: this.app.size.height,
              eventMode: "static"
            });
            this.overlayBacking = this.app.stage.addChild(tt);
          }
          this.cloneOverlay = new _Ue(f, true, this), this.cloneOverlay.label = `${this.label} -- clone`, this.cloneOverlay.alpha = 0, this.cloneOverlay.input.text = this.value, this.cloneOverlay.validate(), this.app.stage.addChild(this.cloneOverlay), this._positionCloneOverlay(), this._showCloneOverlay();
        }
      }
    }
  }
  _showCloneOverlay() {
    this.cloneOverlay.pivot.y = -20, gsapWithCSS.to(this.cloneOverlay, { duration: 0.5, alpha: 0.8, ease: "sine.out", delay: 0.1 }), gsapWithCSS.to(this.cloneOverlay.pivot, { duration: 0.5, y: 0, ease: "sine.out", delay: 0.1 });
  }
  _positionCloneOverlay() {
    var e;
    if (!this.cloneOverlay)
      return;
    const t = this.cloneOverlay.options.minWidth;
    this.cloneOverlay.x = this.app.size.width * 0.5 - t * 0.5, this.cloneOverlay.y = ((e = this.options.focusOverlay) == null ? void 0 : e.marginTop) || 20, this.overlayBacking && (this.overlayBacking.width = this.app.size.width, this.overlayBacking.height = this.app.size.height);
  }
  _removeCloneOverlay() {
    var t, e, i, n, o, r;
    (t = this.overlayBacking) == null || t.destroy(), (i = (e = this.overlayBacking) == null ? void 0 : e.parent) == null || i.removeChild(this.overlayBacking), this.overlayBacking = null, (n = this.cloneOverlay) == null || n.destroy(), (r = (o = this.cloneOverlay) == null ? void 0 : o.parent) == null || r.removeChild(this.cloneOverlay), this.cloneOverlay = null;
  }
  _handleDomElementFocus() {
    this.app.stage.off("pointerdown", this._checkPointerDownOutside), this._handleFocus();
  }
  _handleDomElementBlur() {
    this.isClone || (clearTimeout(this._focusTimer), clearTimeout(this._pointerDownTimer), this.hideCursor(), this._removeCloneOverlay(), this.destroyDomElement());
  }
  _handleDomElementKeyup() {
    this._updateCaretAndSelection();
  }
  _handleDomElementKeydown(t) {
    this._updateCaretAndSelection(), !this.isClone && t.key === "Enter" && (this.options.blurOnEnter && this.domElement.blur(), this.onEnter.emit({ input: this, value: this._value, domElement: this.domElement }));
  }
  _updateCaretAndSelection() {
    if (!this.domElement) {
      _.warn(this.label, "No dom element");
      return;
    }
    const t = this.domElement.selectionStart || 0, e = this.domElement.selectionEnd || -1, i = this.domElement.selectionDirection;
    let n = "";
    const o = this.options.type === "password" ? this.input.text : this._value;
    if (e === void 0) {
      n = o.substring(0, t);
      const r = CanvasTextMetrics.measureText(n, this.input.style);
      this._caretPosition = r.width, this._selectionRect = null;
    } else {
      n = o.substring(t > e ? e : t, t > e ? t : e);
      const r = o.substring(0, t > e ? e : t), a = CanvasTextMetrics.measureText(r, this.input.style), h = CanvasTextMetrics.measureText(n, this.input.style);
      this._selectionRect = new Rectangle(a.width, 0, h.width, this.input.height), this._caretPosition = i === "backward" ? this._selectionRect.left : this._selectionRect.left + this._selectionRect.width;
    }
  }
  _handleDomElementChange(t) {
    var i;
    const e = t.target;
    if (e && !this.domElement && (this.domElement = e), this.options.pattern !== "") {
      const n = e.value.replace(new RegExp(this.options.pattern, "g"), "");
      e.value = n, this._value = n;
    } else
      this._value = e.value;
    this.input.text = this.options.type === "password" ? (i = this._value) == null ? void 0 : i.split("").map(() => "*").join("") : this._value, this._updateCaretAndSelection(), this.isClone || (this.onChange.emit({ input: this, domElement: this.domElement, value: this._value }), this.validate());
  }
};
var Un = class extends B {
  constructor(t) {
    if (super(), this.onChange = new u(), this.onStart = new u(), this.onEnd = new u(), this.onDestroy = new u(), this.outerRadius = 0, this.innerRadius = 0, this.innerAlphaStandby = 0.5, this.dragging = false, this.pointData = new Point(), this.direction = C.None, this.settings = Object.assign(
      {
        outerScale: 1,
        innerScale: 1
      },
      t
    ), !this.settings.outer) {
      const e = new Graphics();
      e.circle(0, 0, 60).fill({ color: 0 }), e.alpha = 0.5, this.settings.outer = e;
    }
    if (!this.settings.inner) {
      const e = new Graphics();
      e.circle(0, 0, 35).fill({ color: 0 }), e.alpha = this.innerAlphaStandby, this.settings.inner = e;
    }
    this.threshold = this.settings.threshold ?? 0.01, this.initialize();
  }
  initialize() {
    this.outer = this.settings.outer, this.inner = this.settings.inner, this.outer.scale.set(this.settings.outerScale, this.settings.outerScale), this.inner.scale.set(this.settings.innerScale, this.settings.innerScale), "anchor" in this.outer && this.outer.anchor.set(0.5), "anchor" in this.inner && this.inner.anchor.set(0.5), this.add.existing(this.outer), this.add.existing(this.inner), this.outerRadius = this.width / 2.5, this.innerRadius = this.inner.width / 2, this.bindEvents();
  }
  handleDragMove(t) {
    if (!this.dragging || t.pointerId !== this._pointerId)
      return;
    const e = this.toLocal(t.global), i = e.x - this.startPosition.x, n = e.y - this.startPosition.y, o = new Point(0, 0);
    let r = 0, a = C.None;
    if (i == 0 && n == 0) {
      this.direction = a;
      return;
    }
    if (i === 0 && (n > 0 ? (o.set(0, n > this.outerRadius ? this.outerRadius : n), r = 270, a = C.Bottom) : (o.set(0, -(Math.abs(n) > this.outerRadius ? this.outerRadius : Math.abs(n))), r = 90, a = C.Top), this.inner.position.set(o.x, o.y), this.power = this.getPower(o), this.power >= this.threshold)) {
      this.direction = a, this.onChange.emit({ angle: r, direction: a, power: this.power });
      return;
    }
    if (n === 0 && (i > 0 ? (o.set(Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i), 0), r = 0, a = C.Right) : (o.set(-(Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i)), 0), r = 180, a = C.Left), this.inner.position.set(o.x, o.y), this.power = this.getPower(o), this.power >= this.threshold)) {
      this.direction = a, this.onChange.emit({ angle: r, direction: a, power: this.power });
      return;
    }
    const h = Math.abs(n / i), c = Math.atan(h);
    r = c * 180 / Math.PI;
    let l = 0, d = 0;
    i * i + n * n >= this.outerRadius * this.outerRadius ? (l = this.outerRadius * Math.cos(c), d = this.outerRadius * Math.sin(c)) : (l = Math.abs(i) > this.outerRadius ? this.outerRadius : Math.abs(i), d = Math.abs(n) > this.outerRadius ? this.outerRadius : Math.abs(n)), n < 0 && (d = -Math.abs(d)), i < 0 && (l = -Math.abs(l)), i > 0 && n < 0 || (i < 0 && n < 0 ? r = 180 - r : i < 0 && n > 0 ? r = r + 180 : i > 0 && n > 0 && (r = 360 - r)), o.set(l, d), this.power = this.getPower(o), this.power >= this.threshold && (a = this.getDirection(o), this.direction = a, this.inner.position.set(o.x, o.y), this.onChange.emit({ angle: r, direction: a, power: this.power }));
  }
  destroy(t) {
    this.off("pointerdown", this.handleDragStart).off("pointerup", this.handleDragEnd).off("pointerupoutside", this.handleDragEnd).off("pointermove", this.handleDragMove), window.removeEventListener("pointerup", this.handleDragEnd), this.onDestroy.emit(), super.destroy(t);
  }
  handleDragStart(t) {
    this._pointerId === void 0 && (this._pointerId = t.pointerId, this.startPosition = this.toLocal(t.global), this.dragging = true, this.inner.alpha = 1, this.onStart.emit());
  }
  handleDragEnd(t) {
    this._pointerId === t.pointerId && (this.direction = C.None, this.inner.position.set(0, 0), this.dragging = false, this.inner.alpha = this.innerAlphaStandby, this.onEnd.emit(), this._pointerId = void 0);
  }
  bindEvents() {
    this.eventMode = "static", this.on("pointerdown", this.handleDragStart).on("pointerup", this.handleDragEnd).on("pointerupoutside", this.handleDragEnd).on("pointermove", this.handleDragMove), window.addEventListener("pointerup", this.handleDragEnd);
  }
  getPower(t) {
    const e = t.x, i = t.y;
    return Math.min(1, Math.sqrt(e * e + i * i) / this.outerRadius);
  }
  getDirection(t) {
    const e = Math.atan2(t.y, t.x);
    return e >= -Math.PI / 8 && e < 0 || e >= 0 && e < Math.PI / 8 ? C.Right : e >= Math.PI / 8 && e < 3 * Math.PI / 8 ? C.BottomRight : e >= 3 * Math.PI / 8 && e < 5 * Math.PI / 8 ? C.Bottom : e >= 5 * Math.PI / 8 && e < 7 * Math.PI / 8 ? C.BottomLeft : e >= 7 * Math.PI / 8 && e < Math.PI || e >= -Math.PI && e < -7 * Math.PI / 8 ? C.Left : e >= -7 * Math.PI / 8 && e < -5 * Math.PI / 8 ? C.TopLeft : e >= -5 * Math.PI / 8 && e < -3 * Math.PI / 8 ? C.Top : C.TopRight;
  }
};
var vs = ["text", "anchor", "resolution", "roundPixels", "style"];
function k(s, t) {
  for (const e in s)
    try {
      t[e] = s[e];
    } catch (i) {
      _.error(`Error setting property ${e}`, i);
    }
}
function Mt(s) {
  let t;
  const e = s == null ? void 0 : s.asset, i = e, n = s == null ? void 0 : s.sheet;
  if (e instanceof Texture)
    t = e;
  else if (!n || (n == null ? void 0 : n.length) === 0)
    if (Assets.cache.has(i))
      t = Assets.get(i);
    else if (Assets.get(i))
      t = Assets.get(i).texture;
    else
      throw new Error('Asset "' + e + '" not loaded into Pixi cache');
  else if (Assets.get(n)) {
    const o = Assets.get(n), r = o.textures;
    if (r !== void 0)
      if (r.hasOwnProperty(i))
        t = r[i];
      else if (o.linkedSheets !== void 0 && o.linkedSheets.length > 0) {
        for (const a of o.linkedSheets)
          if (a.textures !== void 0 && a.textures.hasOwnProperty(i)) {
            t = a.textures[i];
            break;
          }
        if (t === void 0)
          throw new Error(
            'Asset "' + e + '" not found inside spritesheet "' + e + "' or any of its linked sheets"
          );
      } else
        throw new Error('Asset "' + e + '" not found inside spritesheet "' + n + "'");
    else
      throw new Error('Spritesheet "' + n + '" loaded but textures arent?!');
  } else
    throw new Error('Spritesheet "' + n + '" not loaded into Pixi cache');
  return t || new Sprite().texture;
}
function E(s, t) {
  const e = I(s.position, false, s.x, s.y);
  t.x = e.x, t.y = e.y;
}
function L(s, t) {
  if (!s)
    return;
  if (s.scale === void 0) {
    if (s.scaleX === void 0 && s.scaleY === void 0)
      return;
    s.scaleX === void 0 && (s.scaleX = 1), s.scaleY === void 0 && (s.scaleY = 1);
  }
  const e = I(s.scale, false, s.scaleX, s.scaleY);
  t.scale.set(e.x, e.y);
}
function Bt(s, t) {
  if (s !== void 0) {
    const e = I(s);
    t.anchor.set(e.x, e.y);
  }
}
function M(s, t) {
  if (s !== void 0) {
    const e = I(s);
    t.pivot.set(e.x, e.y);
  }
}
var ws = {
  existing: (s, t) => {
    if (!t) return s;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = t;
    return E({ position: e, x: i, y: n }, s), L({ scale: r, scaleX: a, scaleY: h }, s), M(o, s), k(c, s), s;
  },
  container: (s) => {
    const t = X(s ?? {}, ve), e = $(ve, s ?? {}), i = new B(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  particleContainer: (s) => {
    const t = X(s ?? {}, we), e = $(
      we,
      s ?? {}
    ), i = new as(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, ...c } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h }, i), M(a, i), k(c, i), i;
  },
  texture: Mt,
  sprite: (s) => {
    const t = new Sprite(s ? Mt(s) : void 0);
    if (!s) return t;
    const { position: e, x: i, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: c, ...l } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: a, scaleX: h, scaleY: c }, t), Bt(o, t), M(r, t), k(l, t), t;
  },
  animatedSprite: (s) => {
    const t = new ft(s);
    s != null && s.position && E({ position: s.position, x: s.x, y: s.y }, t), s != null && s.scale && L({ scale: s.scale ?? 1, scaleX: s.scaleX, scaleY: s.scaleY }, t), s != null && s.pivot && M(s.pivot, t);
    const e = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s ?? {}
    );
    return k(e, t), t;
  },
  graphics: (s) => {
    const t = new Graphics();
    if (!s) return t;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: r, scaleX: a, scaleY: h }, t), M(o, t), k(c, t), t;
  },
  svg(s) {
    const t = new hs(s.ctx);
    if (!s) return t;
    const { position: e, x: i, y: n, pivot: o, scale: r, scaleX: a, scaleY: h, ...c } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: r, scaleX: a, scaleY: h }, t), M(o, t), k(c, t), t;
  },
  text: (s) => {
    const t = s ? {
      text: s.text,
      roundPixels: s.roundPixels,
      resolution: s.resolution,
      style: s.style,
      anchor: s.anchor ? I(s.anchor, true) : void 0
    } : {}, e = new Text(t);
    if (!s) return e;
    const { position: i, x: n, y: o, scale: r, scaleX: a, scaleY: h, pivot: c } = s;
    E({ position: i, x: n, y: o }, e), L({ scale: r, scaleX: a, scaleY: h }, e), M(c, e);
    const l = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s
    );
    return k(l, e), e;
  },
  bitmapText: (s) => {
    const t = X(s ?? {}, vs), e = new BitmapText(t);
    s != null && s.position && E({ position: s.position, x: s.x, y: s.y }, e), s != null && s.scale && L({ scale: s.scale ?? 1, scaleX: s.scaleX, scaleY: s.scaleY }, e), s != null && s.pivot && M(s.pivot, e);
    const i = $(
      ["x", "y", "position", "text", "roundPixels", "resolution", "style", "anchor", "pivot"],
      s ?? {}
    );
    return k(i, e), e;
  },
  // dill pixel specific stuff
  button: (s) => {
    const t = X(s ?? {}, be), e = $(be, s ?? {}), i = new ds(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  flexContainer: (s) => {
    const t = X(s ?? {}, xe), e = $(xe, s ?? {}), i = new Et(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  uiCanvas: (s) => {
    const t = X(s ?? {}, Ce), e = $(Ce, s ?? {}), i = new Lt(t);
    if (!e) return i;
    const { position: n, x: o, y: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = e;
    return E({ position: n, x: o, y: r }, i), L({ scale: h, scaleX: c, scaleY: l }, i), M(a, i), k(d, i), i;
  },
  spine: (s) => {
    let t = s == null ? void 0 : s.data;
    if (typeof t == "string") {
      let p = t.slice(-5);
      p !== ".json" && p !== ".skel" ? p = ".json" : t = t.substring(0, t.length - 5), t = { skeleton: t + p, atlas: t + ".atlas" };
    }
    const e = window.Spine.from(t);
    if (!s) return e;
    s.autoUpdate !== void 0 && (e.autoUpdate = s.autoUpdate), s.animationName && e.state.setAnimation(s.trackIndex ?? 0, s.animationName, s.loop);
    const { position: i, x: n, y: o, anchor: r, pivot: a, scale: h, scaleX: c, scaleY: l, ...d } = s;
    return E({ position: i, x: n, y: o }, e), L({ scale: h, scaleX: c, scaleY: l }, e), Bt(r, e), M(a, e), k(d, e), e;
  },
  spineAnimation: (s) => {
    const t = new cs(s);
    if (!s) return t;
    const { position: e, x: i, y: n, anchor: o, pivot: r, scale: a, scaleX: h, scaleY: c, ...l } = s;
    return E({ position: e, x: i, y: n }, t), L({ scale: a, scaleX: h, scaleY: c }, t), Bt(o, t), M(r, t), k(l, t), t;
  }
};
function vt(s) {
  return class extends Container {
    constructor() {
      super(), s = Object.assign(ws, s), this.make = ye(s, this, false), this.add = ye(s, this, true);
    }
  };
}
function Q(s) {
  return s === void 0 ? s = "*undefined*" : s === " " ? s = "Space" : s.length === 1 && (s = s.toUpperCase()), s;
}
var bs = class extends O {
  constructor() {
    super(...arguments), this.id = "keyboard", this.onGlobalKeyDown = new u(), this.onGlobalKeyUp = new u(), this._keyDownSignals = /* @__PURE__ */ new Map(), this._keyUpSignals = /* @__PURE__ */ new Map(), this._keysDown = /* @__PURE__ */ new Set(), this._enabled = true;
  }
  get keysDown() {
    return this._keysDown;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(t) {
    this._enabled = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(t) {
    document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  destroy() {
    document.removeEventListener("keydown", this._handleEvent), document.removeEventListener("keyup", this._handleEvent), document.addEventListener("keydown", this._handleKeyDown), document.addEventListener("keyup", this._handleKeyUp);
  }
  onKeyDown(t) {
    return this._checkAndAddSignal(t || void 0, "keydown");
  }
  onKeyUp(t) {
    return this._checkAndAddSignal(t || void 0, "keyup");
  }
  isKeyDown(t) {
    return this._keysDown.has(t);
  }
  _update() {
  }
  getCoreSignals() {
    return ["onGlobalKeyDown", "onGlobalKeyUp"];
  }
  getCoreFunctions() {
    return ["onKeyDown", "onKeyUp", "isKeyDown"];
  }
  _handleKeyDown(t) {
    const e = Q(t.key);
    this._keysDown.add(e), this.onGlobalKeyDown.emit({ event: t, key: t.key });
  }
  _handleKeyUp(t) {
    const e = Q(t.key);
    this._keysDown.delete(e), this.onGlobalKeyUp.emit({ event: t, key: t.key });
  }
  /**
   * Check if the signal exists and add it if it doesn't
   * Also, if this is the first signal, start listening for the event
   * @param {string} key
   * @param {KeyboardEventType} eventType
   * @returns {KeySignal}
   * @private
   */
  _checkAndAddSignal(t, e) {
    const i = e === "keydown" ? this._keyDownSignals : this._keyUpSignals;
    return i.size || this._listen(e), t = Q(t), i.has(t) || i.set(t, new u()), i.get(t);
  }
  _listen(t) {
    document.addEventListener(t, this._handleEvent);
  }
  _handleEvent(t) {
    var n, o;
    if (!this._enabled)
      return;
    const e = t.type === "keydown" ? this._keyDownSignals : this._keyUpSignals, i = Q(t.key);
    (n = e.get("*undefined*")) == null || n.emit({ event: t, key: i }), (o = e.get(i)) == null || o.emit({ event: t, key: i });
  }
};
var $e = class {
  get app() {
    return v.getInstance();
  }
  initialize(t) {
    this.scheme = t;
  }
};
var xs = class extends K($e) {
  constructor() {
    super(), this._keyCombinations = [], this._singleDownKeys = /* @__PURE__ */ new Set(), this._keyCombinationsMap = /* @__PURE__ */ new Map(), this._activeDownKeys = /* @__PURE__ */ new Map(), this._activeUpKeys = /* @__PURE__ */ new Map(), w(this);
  }
  get app() {
    return v.getInstance();
  }
  isActionActive(t) {
    var i;
    const e = ((i = this.scheme.down) == null ? void 0 : i[t]) ?? null;
    return e ? Array.isArray(e) ? this._keyCombinationsMap.has(e) || e.some((n) => this._singleDownKeys.has(n)) : this._singleDownKeys.has(e) : false;
  }
  initialize(t) {
    super.initialize(t), this._keyDownMap = t.down || {}, this._keyUpMap = t.up || {}, this._sortActions();
  }
  connect() {
    this.addSignalConnection(
      this.app.signal.onActionContextChanged.connect(this._handleContextChanged),
      this.app.keyboard.onKeyDown().connect(this._handleKeyDown),
      this.app.keyboard.onKeyUp().connect(this._handleKeyUp)
    ), this.app.ticker.add(this._update);
  }
  _sortActions() {
    const t = this.app.actionsPlugin.getActions();
    this._keyCombinations = [], this._keyCombinationsMap.clear(), this._activeDownKeys.clear(), this._activeUpKeys.clear();
    let e = Object.keys(this._keyDownMap);
    e.forEach((i) => {
      const n = this._keyDownMap[i], o = t[i];
      if (o.context !== "*" && o.context !== this.app.actionContext && !o.context.includes(this.app.actionContext))
        return;
      let r = n;
      r && (Array.isArray(r) || (r = [r]), r.forEach((a) => {
        if (a.includes("+")) {
          const h = a.split("+");
          this._keyCombinations.push(h), this._keyCombinationsMap.set(h, i);
        } else
          this._activeDownKeys.set(a, i);
      }));
    }), this._keyCombinations.sort((i, n) => n.length - i.length), e = Object.keys(this._keyUpMap), e.forEach((i) => {
      let o = this._keyUpMap[i];
      o && (Array.isArray(o) || (o = [o]), o.forEach((r) => {
        this._activeUpKeys.set(r, i);
      }));
    });
  }
  _handleContextChanged() {
    this._getPossibleActions();
  }
  _getPossibleActions() {
    this._sortActions();
  }
  _handleKeyDown(t) {
    const e = Q(t.event.key);
    this._singleDownKeys.add(e);
  }
  _handleKeyUp(t) {
    const e = Q(t.event.key);
    this._singleDownKeys.delete(e);
    const i = this._activeUpKeys.get(e);
    i && this.app.action(i, { combination: false, inputState: "up", key: e });
  }
  _update() {
    if (!this.app.keyboard)
      return;
    const t = this.app.keyboard.keysDown;
    if (t.size === 0)
      return;
    const e = /* @__PURE__ */ new Set();
    for (let i = 0; i < this._keyCombinations.length; i++) {
      const n = this._keyCombinations[i];
      if (!n.some((o) => e.has(o)) && n.every((o) => t.has(o))) {
        n.forEach((r) => e.add(r));
        const o = this._keyCombinationsMap.get(n);
        o && this.app.action(o, {
          key: n,
          combination: true,
          inputState: "down"
        });
      }
    }
    this._singleDownKeys.forEach((i) => {
      if (!e.has(i) && t.has(i)) {
        const n = this._activeDownKeys.get(i);
        n && this.app.action(n, { key: i, combination: false, inputState: "down" });
      }
    });
  }
};
var C = ((s) => (s.None = "none", s.Left = "left", s.Top = "top", s.Bottom = "bottom", s.Right = "right", s.TopLeft = "top_left", s.TopRight = "top_right", s.BottomLeft = "bottom_left", s.BottomRight = "bottom_right", s))(C || {});
var Wn = [
  "none",
  "left",
  "top",
  "bottom",
  "right",
  "top_left",
  "top_right",
  "bottom_left",
  "bottom_right"
  /* BottomRight */
];
var Cs = class extends K($e) {
  constructor() {
    super(), this._buttons = /* @__PURE__ */ new Set(), this._combinations = [], this._singleDownButtons = /* @__PURE__ */ new Set(), this._activeJoystickDirections = /* @__PURE__ */ new Map(), this._activeButtonDownIds = /* @__PURE__ */ new Map(), this._activeButtonUpIds = /* @__PURE__ */ new Map(), this._combinationsMap = /* @__PURE__ */ new Map(), w(this);
  }
  get joystick() {
    return this._joystick;
  }
  set joystick(t) {
    this._joystick = t;
  }
  get app() {
    return v.getInstance();
  }
  addButton(t) {
    !t || this._buttons.has(t) || (this.addSignalConnection(
      t.onDown.connect(() => this._handleButtonDown(t)),
      t.onUp.connect(() => this._handleButtonUp(t)),
      t.onUpOutside.connect(() => this._handleButtonUp(t)),
      t.onDestroy.connect(() => this.removeButton(t))
    ), this._buttons.add(t));
  }
  removeButton(t) {
    !t || !this._buttons.has(t) || (t.onDown.disconnect(() => this._handleButtonDown(t)), t.onUp.disconnect(() => this._handleButtonUp(t)), t.onUpOutside.disconnect(() => this._handleButtonUp(t)), t.onDestroy.disconnect(() => this.removeButton(t)), this._buttons.delete(t));
  }
  initialize(t) {
    super.initialize(t), this._buttonDownMap = t.down || {}, this._buttonUpMap = t.up || {}, this._joystickMap = t.joystick || {}, this.app.signal.onActionContextChanged.connect(this._sortActions), this._sortActions();
  }
  connect() {
    this.app.ticker.add(this._update);
  }
  isActionActive(t) {
    var i, n, o;
    const e = ((i = this.scheme.down) == null ? void 0 : i[t]) ?? null;
    if (e)
      return Array.isArray(e) ? this._combinationsMap.has(e) : this._singleDownButtons.has(e);
    {
      const r = ((n = this.scheme.joystick) == null ? void 0 : n[t]) ?? null;
      if (this._joystick && r)
        return Array.isArray(r) ? r.includes(this._joystick.direction) : r === ((o = this._joystick) == null ? void 0 : o.direction);
    }
    return false;
  }
  _sortActions() {
    const t = this.app.actionsPlugin.getActions();
    this._combinations = [], this._combinationsMap.clear(), this._activeJoystickDirections.clear(), this._activeButtonDownIds.clear(), this._activeButtonUpIds.clear();
    let e = Object.keys(this._buttonDownMap);
    e.forEach((n) => {
      const o = this._buttonDownMap[n], r = t[n];
      if (r.context !== "*" && r.context !== this.app.actionContext && !r.context.includes(this.app.actionContext))
        return;
      let a = o;
      a && (Array.isArray(a) || (a = [a]), a.forEach((h) => {
        if (h.includes("+")) {
          const c = h.split("+");
          this._combinations.push(c), this._combinationsMap.set(c, n);
        } else
          this._activeButtonDownIds.set(h, n);
      }));
    }), this._combinations.sort((n, o) => o.length - n.length), e = Object.keys(this._buttonUpMap), e.forEach((n) => {
      const o = this._buttonUpMap[n], r = t[n];
      r.context !== "*" && r.context !== this.app.actionContext && !r.context.includes(this.app.actionContext) || this._activeButtonUpIds.set(o, n);
    }), Object.keys(this._joystickMap).forEach((n) => {
      let r = this._joystickMap[n];
      r && (Array.isArray(r) || (r = [r]), r.forEach((a) => {
        this._activeJoystickDirections.set(a, n);
      }));
    });
  }
  _handleButtonDown(t) {
    this._singleDownButtons.add(t.id);
  }
  _handleButtonUp(t) {
    this._singleDownButtons.delete(t.id);
    const e = this._activeButtonUpIds.get(t.id);
    e && this.app.action(e, {
      combination: false,
      inputState: "up",
      button: t.id
    });
  }
  _update() {
    var n;
    const t = ((n = this._joystick) == null ? void 0 : n.direction) ?? null, e = this._singleDownButtons, i = /* @__PURE__ */ new Set();
    for (let o = 0; o < this._combinations.length; o++) {
      const r = this._combinations[o];
      if (!r.some((a) => i.has(a)) && r.every((a) => e.has(a) || t === a)) {
        r.forEach((h) => i.add(h));
        const a = this._combinationsMap.get(r);
        a && this.app.action(a, {
          button: r,
          combination: true,
          inputState: "down"
        });
      }
    }
    if (this._singleDownButtons.forEach((o) => {
      if (!i.has(o) && e.has(o)) {
        const r = this._activeButtonDownIds.get(o);
        r && this.app.action(r, {
          button: o,
          combination: false,
          inputState: "down"
        });
      }
    }), t) {
      const o = this._activeJoystickDirections.get(t);
      o && this.app.action(o, {
        inputState: "joystick"
      });
    }
  }
};
var As = class {
  constructor() {
    w(this);
  }
  get app() {
    return v.getInstance();
  }
  destroy() {
    this.keyboard && this.keyboard.destroy(), this.touch && this.touch.destroy();
  }
  isActionActive(t) {
    var i, n;
    return ((i = this.keyboard) == null ? void 0 : i.isActionActive(t)) || ((n = this.touch) == null ? void 0 : n.isActionActive(t)) || false;
  }
  initialize(t) {
    t.keyboard && (this.keyboard = new xs(), this.keyboard.initialize(t.keyboard)), t.touch && (this.touch = new Cs(), this.touch.initialize(t.touch));
  }
  connect() {
    this.keyboard && this.keyboard.connect(), this.touch && this.touch.connect();
  }
};
var Ae = {
  actions: zi
};
var Ss = class extends O {
  constructor() {
    super(...arguments), this.id = "input", this.controls = new As(), this.activeGamepads = /* @__PURE__ */ new Map(), this.activeControllers = /* @__PURE__ */ new Set([]), this.onGamepadConnected = new u(), this.onGamepadDisconnected = new u(), this.onControllerActivated = new u(), this.onControllerDeactivated = new u();
  }
  isActionActive(t) {
    return this.controls.isActionActive(t);
  }
  async initialize(t, e = Ae) {
    this.options = { ...Ae, ...e }, t.stage.eventMode = "static", t.stage.on("touchstart", this._onTouchStart), t.stage.on("globalmousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown), window.addEventListener("gamepadconnected", this._onGamepadConnected), window.addEventListener("gamepaddisconnected", this._onGamepadDisconnected), this.options.controls && this.controls.initialize(this.options.controls);
  }
  postInitialize() {
    this.controls && this.controls.connect();
  }
  destroy() {
    this.app.stage.off("touchstart", this._onTouchStart), this.app.stage.off("globalmousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("gamepadconnected", this._onGamepadConnected), window.removeEventListener("gamepaddisconnected", this._onGamepadDisconnected), super.destroy();
  }
  isControllerActive(t) {
    return this.activeControllers.has(t);
  }
  isGamepadActive(t) {
    return this.activeGamepads.has(t.id);
  }
  getCoreSignals() {
    return ["onGamepadConnected", "onGamepadDisconnected", "onControllerActivated", "onControllerDeactivated"];
  }
  _activateController(t) {
    this.activeControllers.has(t) || (this.activeControllers.add(t), this.onControllerActivated.emit(t));
  }
  _deactivateController(t) {
    this.activeControllers.has(t) && (this.activeControllers.delete(t), this.onControllerDeactivated.emit(t));
  }
  _activateGamepad(t) {
    this.activeGamepads.set(t.id, t);
  }
  _deactivateGamepad(t) {
    this.activeGamepads.delete(t);
  }
  _onTouchStart() {
    this._activateController(Z.Touch);
  }
  _onMouseMove() {
    this._activateController(Z.Mouse);
  }
  _onKeyDown() {
    this._activateController(Z.Keyboard);
  }
  _onGamepadConnected(t) {
    this._activateController(Z.GamePad), this._activateController(t.gamepad.id), this._activateGamepad(t.gamepad), this.onGamepadConnected.emit(t.gamepad);
  }
  _onGamepadDisconnected(t) {
    this._deactivateGamepad(t.gamepad.id), this.actionsPlugin.sendAction("pause"), this.onGamepadDisconnected.emit(t.gamepad), this.activeGamepads.size === 0 && this._deactivateController(Z.GamePad);
  }
  get actionsPlugin() {
    return this.app.getPlugin("actions");
  }
};
function Kn(s, t, e) {
  return e || [];
}
var Ps = class extends O {
  constructor() {
    super(...arguments), this.id = "popups", this.view = new B(), this.onShowPopup = new u(), this.onHidePopup = new u(), this._popups = /* @__PURE__ */ new Map(), this._activePopups = /* @__PURE__ */ new Map(), this._currentPopupId = void 0;
  }
  // The id of the current popup
  get currentPopupId() {
    return this._currentPopupId;
  }
  get popupCount() {
    return this._popups.size;
  }
  get current() {
    if (this._currentPopupId !== void 0)
      return this._activePopups.get(this._currentPopupId);
  }
  /**
   * Initialize the PopupManager
   * @param _app
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(t) {
    w(this), this.view.label = "PopupManager", this._setupAppListeners();
  }
  /**
   * Destroy the PopupManager
   */
  destroy() {
    this._activePopups.clear(), super.destroy();
  }
  /**
   * Add a popup
   * @param id - The id of the popup
   * @param popup - The popup constructor
   */
  addPopup(t, e) {
    this._popups.set(t, e);
  }
  /**
   * Show a popup
   * @param id - The id of the popup
   * @param config - The configuration for the popup
   * @returns a promise resolving to the popup, if it exists
   */
  async showPopup(t, e = {}) {
    const i = this._popups.get(t);
    if (i) {
      e.id = t;
      const n = this.view.add.existing(new i(t, e));
      return n.initialize(), this.app.focus.clearFocus(), await n.show(), this.app.focus.setFocusLayer(t), n.afterShow(), this._activePopups.set(t, n), this._currentPopupId = t, this.onShowPopup.emit({ id: t, data: e == null ? void 0 : e.data }), n.start(), n;
    }
  }
  /**
   * Hide a popup
   * @param id - The id of the popup
   * @param data
   * @returns a promise resolving to the popup, if it exists
   */
  async hidePopup(t, e) {
    var n;
    const i = this._activePopups.get(t);
    if (i)
      return i.beforeHide(), await i.hide(), this.view.removeChild(i), this._activePopups.delete(t), this._currentPopupId = ((n = Ht(this._activePopups)) == null ? void 0 : n[0]) || void 0, this.onHidePopup.emit({ id: t, data: e }), i.end(), i;
  }
  /**
   * Remove all popups
   * @param animate - Whether to animate the removal
   */
  removeAllPopups(t = false) {
    t ? this._activePopups.forEach((e) => {
      e.hide();
    }) : (this._activePopups.clear(), this.view.removeChildren());
  }
  getCoreFunctions() {
    return ["addPopup", "hidePopup", "showPopup", "removeAllPopups"];
  }
  getCoreSignals() {
    return ["onShowPopup", "onHidePopup"];
  }
  /**
   * Setup application listeners
   * @private
   */
  _setupAppListeners() {
    this.addSignalConnection(this.app.scenes.onSceneChangeStart.connect(() => this.removeAllPopups())), this.app.keyboard.onKeyUp("Escape").connect(this._handleEscape);
  }
  /**
   * Handle escape key press
   * if the current popup should close when escape is pressed (true by default), closes it
   * @private
   */
  _handleEscape() {
    this.current && this.current.config.closeOnEscape && this.hidePopup(this.current.id);
  }
};
var ks = {
  autoScroll: false,
  useAspectRatio: false,
  fixed: false,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
  debug: false
};
var Es = class extends O {
  constructor() {
    super(...arguments), this.id = "resizer";
  }
  get size() {
    return this._size;
  }
  get scale() {
    return this._scale;
  }
  /**
   * Initializes the Resizer module.
   */
  async initialize(t, e = {}) {
    this._options = { ...ks, ...e };
  }
  /**
   * Post-initialization of the Resizer module.
   * when this is called, the renderer is already created, and the dom element has been appended
   */
  async postInitialize() {
    this.resize();
  }
  /**
   * Resizes the application based on window size and module options.
   */
  resize() {
    var p;
    let t = window.innerWidth, e = window.innerHeight;
    const i = (p = this.app.renderer.canvas) == null ? void 0 : p.parentElement, n = i == null ? void 0 : i.getBoundingClientRect();
    n && (t = n.width, e = n.height);
    const o = this._options.minSize.width, r = this._options.minSize.height, a = t < o ? o / t : 1, h = e < r ? r / e : 1, c = a > h ? a : h;
    this._scale = c;
    const l = t * c, d = e * c;
    this.app.renderer.canvas.style.width = `${t}px`, this.app.renderer.canvas.style.height = `${e}px`, this._options.autoScroll && (window == null || window.scrollTo(0, 0)), this.app.renderer.resize(l, d), this._size = { width: l, height: d }, this._options.debug && this._drawDebug();
  }
  /**
   * Draws debug information if debug option is enabled.
   */
  _drawDebug() {
    this._debugContainer || (this._debugContainer = this.app.stage.addChild(new B()), this._gfx = this._debugContainer.add.graphics()), this._gfx.clear(), this._gfx.rect(0, 0, this._size.width, this._size.height), this._gfx.stroke({ width: 4, color: 4095 });
  }
};
var Ls = {
  view: null,
  hideWhen: "firstSceneEnter",
  zOrder: "top"
};
var Ms = class extends O {
  constructor() {
    super(), this.id = "scenes", this.onSceneChangeStart = new u(), this.onSceneChangeComplete = new u(), this.view = new Container(), this.isFirstScene = true, this.list = [], this._sceneModules = /* @__PURE__ */ new Map(), this._lastScene = null, this._defaultLoadMethod = "immediate", this._debugVisible = false, this._useHash = false, w(this);
  }
  get ids() {
    return this.list.map((t) => t.id);
  }
  setDefaultLoadMethod(t) {
    this._defaultLoadMethod = t;
  }
  destroy() {
  }
  async initialize(t) {
    var n, o, r, a, h, c, l, d;
    this._debugVisible = ((n = this.app.config) == null ? void 0 : n.showSceneDebugMenu) === true || W && ((o = this.app.config) == null ? void 0 : o.showSceneDebugMenu) !== false, this._useHash = ((r = t.config) == null ? void 0 : r.useHash) === true || this._debugVisible, this.view.sortableChildren = true;
    const i = globalThis.getDillPixel("sceneList") || [];
    if (this.list = i.filter((p) => p.active !== false), (this._debugVisible || this._useHash) && (this.defaultScene = this.getSceneFromHash() || ""), !this.splash) {
      this.splash = { view: null, hideWhen: "firstSceneEnter", zOrder: "top" };
      const p = { ...Ls, ...((a = t.config) == null ? void 0 : a.splash) ?? {} };
      p.view && (this.splash.view = typeof p.view == "function" ? new p.view() : p.view);
    }
    return this.defaultScene = this.defaultScene || ((h = t.config) == null ? void 0 : h.defaultScene) || ((l = (c = this.list) == null ? void 0 : c[0]) == null ? void 0 : l.id), !this.transition && ((d = t.config) != null && d.sceneTransition) && (this.transition = typeof t.config.sceneTransition == "function" ? new t.config.sceneTransition() : t.config.sceneTransition), this._defaultLoadMethod = t.config.defaultSceneLoadMethod || "immediate", this._debugVisible && this._createDebugMenu(), this._useHash && this._listenForHashChange(), Promise.resolve(void 0);
  }
  async loadDefaultScene() {
    return this.splash && await this._showSplash(), await this.app.assets.loadRequired(), this.splash.hideWhen === "requiredAssetsLoaded" && await this._hideSplash(), this.loadScene(this.defaultScene);
  }
  async loadScene(t) {
    var o;
    if (this._queue)
      return;
    this._lastScene = null;
    const e = typeof t == "string" ? t : t.id, i = typeof t == "string" ? this._defaultLoadMethod : (t == null ? void 0 : t.method) || this._defaultLoadMethod;
    this.currentScene && (this._lastScene = this.currentScene);
    const n = this.list.find((r) => r.id === e);
    if (!n)
      throw new Error(`Scene item not found  for id ${e}`);
    if ((o = n == null ? void 0 : n.plugins) != null && o.length)
      for (const r of n.plugins) {
        const a = this.app.getUnloadedPlugin(r);
        a && await this.app.loadPlugin(a);
      }
    switch (this._currentSceneId = e, this._queue = si(this._createCurrentScene), i) {
      case "exitEnter":
        this._queue.add(
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "enterExit":
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
          this._destroyLastScene,
          this._unloadLastScene
        );
        break;
      case "enterBehind":
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentSceneBehind,
          this._enterCurrentScene,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._startCurrentScene
        );
        break;
      case "transitionExitEnter":
        this._queue.add(
          this._showTransition,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "exitTransitionEnter":
        this._queue.add(
          this._exitLastScene,
          this._showTransition,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
      case "immediate":
      default:
        this._queue.add(
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene
        );
        break;
    }
    this._queue.add(this._queueComplete), this._queue.start();
  }
  getSceneFromHash() {
    var e, i, n;
    let t = (e = window == null ? void 0 : window.location) == null ? void 0 : e.hash;
    if (t && (t = t.replace("#", ""), t.length > 0)) {
      for (let o = 0; o < this.list.length; o++)
        if (((n = (i = this.list[o]) == null ? void 0 : i.id) == null ? void 0 : n.toLowerCase()) === t.toLowerCase())
          return this.list[o].id;
    }
    return null;
  }
  getCoreSignals() {
    return ["onSceneChangeStart", "onSceneChangeComplete"];
  }
  getCoreFunctions() {
    return ["loadScene"];
  }
  _listenForHashChange() {
    window.addEventListener("hashchange", () => {
      const t = this.getSceneFromHash();
      t && this.loadScene(t);
    });
  }
  async _createCurrentScene() {
    var i;
    const t = this.list.find((n) => n.id === this._currentSceneId);
    let e;
    if (this._sceneModules.has(this._currentSceneId))
      e = this._sceneModules.get(this._currentSceneId);
    else {
      const n = await At(t);
      if (!n)
        throw new Error(`Couldn't load ${this._currentSceneId}"`);
      n[this._currentSceneId] ? e = n[this._currentSceneId] : e = n, e && this._sceneModules.set(this._currentSceneId, e);
    }
    if (!e)
      throw new Error(`Couldn't load ${this._currentSceneId}"`);
    this.currentScene = new e(), this.currentScene.id = this._currentSceneId, t != null && t.assets && (this.currentScene.assets = t.assets), t.autoUnloadAssets !== void 0 && (this.currentScene.autoUnloadAssets = t.autoUnloadAssets), this.onSceneChangeStart.emit({ exiting: ((i = this._lastScene) == null ? void 0 : i.id) || null, entering: this.currentScene.id });
  }
  _queueComplete() {
    return this.isFirstScene && this.app.assets.loadBackground(), this.isFirstScene = false, this.app.assets.loadSceneAssets(this.currentScene, true), this._lastScene = null, this.onSceneChangeComplete.emit({ current: this.currentScene.id }), this._queue = null, Promise.resolve();
  }
  async _destroyLastScene() {
    return this._lastScene && (this.view.removeChild(this._lastScene), this._lastScene.destroy()), Promise.resolve();
  }
  async _exitLastScene() {
    return this._lastScene && await this._lastScene.exit(), Promise.resolve();
  }
  async _loadCurrentScene() {
    await this.app.assets.loadSceneAssets(this.currentScene);
  }
  async _unloadLastScene() {
    return this._lastScene && this._lastScene.autoUnloadAssets ? this.app.assets.unloadSceneAssets(this._lastScene) : Promise.resolve();
  }
  async _initializeCurrentScene() {
    return await this.currentScene.initialize(), this.app.ticker.addOnce(() => {
      this.currentScene.resize(this.app.size);
    }), Promise.resolve();
  }
  _addCurrentScene() {
    return this.view.addChild(this.currentScene), Promise.resolve();
  }
  _addCurrentSceneBehind() {
    return this.view.addChildAt(this.currentScene, 0), Promise.resolve();
  }
  async _enterCurrentScene() {
    return await this.currentScene.enter(), this.isFirstScene && this.splash.hideWhen === "firstSceneEnter" && await this._hideSplash(), Promise.resolve();
  }
  async _startCurrentScene() {
    return this.currentScene.start(), Promise.resolve();
  }
  async _showTransition() {
    if (this.isFirstScene)
      return Promise.resolve();
    this.transition && (this.transition.active = true, this.transition.renderable = true, this.transition.visible = true, this.transition.progress = 0, await this.transition.enter());
  }
  async _hideTransition() {
    if (this.isFirstScene)
      return Promise.resolve();
    this.transition && (await this.transition.exit(), this.transition.progress = 0, this.transition.visible = false, this.transition.renderable = false, this.transition.active = false);
  }
  async _showSplash() {
    var t;
    await ((t = this.splash.view) == null ? void 0 : t.enter());
  }
  async _hideSplash() {
    var t, e, i, n;
    await ((t = this.splash.view) == null ? void 0 : t.exit()), (e = this.splash.view) == null || e.destroy(), (n = (i = this.splash.view) == null ? void 0 : i.parent) == null || n.removeChild(this.splash.view), this.splash.view = null;
  }
  _createDebugMenu() {
    this._debugMenu = document.createElement("div"), this._debugMenu.id = "scene-debug", this._debugMenu.style.cssText = "position: absolute; bottom: 0; left:0; width:48px; height:48px; z-index: 1000; background-color:rgba(0,0,0,0.8); color:white; border-top-right-radius:8px;";
    const t = document.createElement("i");
    t.style.cssText = "cursor:pointer; position:absolute;width:100%; font-style:normal; font-size:20px; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; pointer-events:none", t.innerHTML = "🎬", this._debugMenu.appendChild(t), (v.containerElement || document.body).appendChild(this._debugMenu), this._sceneSelect = document.createElement("select"), this._sceneSelect.style.cssText = "padding:0; border-radius:5px; opacity:0; width:48px; height:48px; cursor:pointer", this._sceneSelect.value = this.defaultScene || "";
    const e = document.createElement("option");
    e.value = "", e.innerHTML = "Select a scene", e.setAttribute("disabled", "disabled"), this._sceneSelect.appendChild(e);
    const i = /* @__PURE__ */ new Map();
    if (this.list.forEach((n) => {
      if (n.debugGroup && !i.has(n.debugGroup)) {
        const o = document.createElement("optgroup");
        o.label = n.debugGroup, i.set(n.debugGroup, o), this._sceneSelect.appendChild(o);
      }
    }), i.size > 0) {
      const n = this.list.filter((o) => !o.debugGroup);
      if (n.length) {
        const o = document.createElement("optgroup");
        o.label = "Other", i.set("Other", o), this._sceneSelect.appendChild(o), n.forEach((r) => {
          r.debugGroup = "Other";
        });
      }
    }
    this.list.forEach((n) => {
      var r;
      const o = document.createElement("option");
      o.value = n.id, o.innerHTML = (n == null ? void 0 : n.debugLabel) || n.id, n.id === this.defaultScene && (o.selected = true), n.debugGroup ? (r = i.get(n.debugGroup)) == null || r.appendChild(o) : this._sceneSelect.appendChild(o);
    }), this._debugMenu.appendChild(this._sceneSelect), this._debugMenu.addEventListener("change", (n) => {
      if (this._queue) {
        n.preventDefault();
        return;
      }
      const r = n.target.value;
      r && (window.location.hash = r.toLowerCase());
    }), this.onSceneChangeStart.connect(this._disableDebugMenu), this.onSceneChangeComplete.connect(this._enableDebugMenu);
  }
  _enableDebugMenu() {
    var t, e;
    (e = (t = this._debugMenu) == null ? void 0 : t.querySelector("select")) == null || e.removeAttribute("disabled");
  }
  _disableDebugMenu() {
    var t, e;
    (e = (t = this._debugMenu) == null ? void 0 : t.querySelector("select")) == null || e.setAttribute("disabled", "disabled");
  }
};
var Ts = class extends O {
  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    super(), this.id = "webEvents", this.onResize = new u(), this.onVisibilityChanged = new u(), w(this);
  }
  get app() {
    return v.getInstance();
  }
  initialize() {
    document.addEventListener("visibilitychange", this._onVisibilityChanged, false), window.addEventListener("pagehide", this._onPageHide, false), window.addEventListener("pageshow", this._onPageShow, false), window.addEventListener("resize", this._onResize), document.addEventListener("fullscreenchange", this._onResize);
  }
  destroy() {
    document.removeEventListener("visibilitychange", this._onVisibilityChanged, false), window.removeEventListener("resize", this._onResize), document.removeEventListener("fullscreenchange", this._onResize), window.removeEventListener("pagehide", this._onPageHide, false), window.removeEventListener("pageshow", this._onPageShow, false);
  }
  getCoreSignals() {
    return ["onResize", "onVisibilityChanged"];
  }
  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  _onVisibilityChanged() {
    this.onVisibilityChanged.emit(!document.hidden);
  }
  /**
   * Called when the browser resizes.
   */
  _onResize() {
    var n;
    const t = (n = this.app.renderer.canvas) == null ? void 0 : n.parentElement;
    let e = window.innerWidth, i = window.innerHeight;
    t && (t != null && t.getBoundingClientRect()) && (e = t.offsetWidth, i = t.offsetHeight), this.onResize.emit({ width: e, height: i });
  }
  /**
   * Called when the page is hidden.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pagehide`.
   * We're just mimicking the `visibilitychange` event here.
   */
  _onPageHide() {
    this.onVisibilityChanged.emit(false);
  }
  /**
   * Called when the page is shown.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pageshow`.
   * We're just mimicking the `visibilitychange` event here.
   * @private
   */
  _onPageShow() {
    this.onVisibilityChanged.emit(true);
  }
};
var Ds = class extends O {
  /**
   * Creates a new StorageAdapter.
   * @param {string} id The ID of the adapter. Default is 'StorageAdapter'.
   */
  constructor(t = "StorageAdapter") {
    super(t), this.id = t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async load(t, ...e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(t, e, ...i) {
  }
};
var Fs = class extends Ds {
  constructor(t = "data") {
    super(t), this.id = t, this.backupKeys = [], this.backupAll = false, this.namespace = "", this.overrideWithLocalStorage = true;
  }
  /**
   * Destroys the adapter.
   */
  destroy() {
    this.data = {};
  }
  /**
   * Initializes the adapter.
   * @param {IApplication} _app The application that the adapter belongs to.
   * @param {Partial<ILocalStorageAdapterOptions>} options The options to initialize the adapter with.
   */
  initialize(t, e) {
    var i;
    this.namespace = (e == null ? void 0 : e.namespace) || ((i = t.config) == null ? void 0 : i.id) || "data", this.data = (e == null ? void 0 : e.initial) || {}, this.backupKeys = (e == null ? void 0 : e.backupKeys) || [], this.backupAll = (e == null ? void 0 : e.backupAll) || false, this.overrideWithLocalStorage = (e == null ? void 0 : e.overrideWithLocalStorage) !== false, (this.backupAll || this.backupKeys.length > 0) && (this.overrideWithLocalStorage && this.restoreFromLocalStorage(this.backupKeys), this.backupToLocalStorage(this.backupKeys));
  }
  /**
   * Saves data under a specified key in the local storage.
   * @param {string} key The key under which to save the data.
   * @param {any} data The data to save.
   * @returns {any} The saved data.
   */
  save(t, e) {
    return this.data[t] = e, (this.backupAll || this.backupKeys.includes(t)) && this.backupToLocalStorage([t]), e;
  }
  /**
   * Loads data from a specified key in the local storage.
   * @template T The type of the data to load.
   * @param {string} key The key from which to load the data.
   * @returns {T} The loaded data.
   */
  load(t) {
    return this.data[t];
  }
  set(t, e = true) {
    return e ? this.data = We({ ...this.data }, t) : this.data = t, (this.backupAll || this.backupKeys.length > 0) && this.backupToLocalStorage(this.backupKeys), this.data;
  }
  get() {
    return this.data;
  }
  /**
   * Deletes data from a specified key in the local storage.
   * @param {string} key The key from which to delete the data.
   */
  clear(t) {
    delete this.data[t], localStorage.removeItem(`${this.namespace}-${t}`);
  }
  /**
   * Backs up specified keys or all data to local storage.
   * @param {Array<keyof D>} [keys] The keys to back up. If not provided, all data will be backed up.
   */
  backupToLocalStorage(t) {
    const e = t && (t == null ? void 0 : t.length) > 0 ? Object.fromEntries(t.map((i) => [i, this.data[i]])) : this.data;
    for (const i in e)
      localStorage.setItem(`${this.namespace}-${i}`, JSON.stringify(e[i]));
  }
  /**
   * Restores data from local storage for specified keys or all data.
   * @param {Array<keyof D>} [keys] The keys to restore. If not provided, all data will be restored.
   */
  restoreFromLocalStorage(t) {
    (t && (t == null ? void 0 : t.length) > 0 ? t : Object.keys(this.data)).forEach((i) => {
      const n = localStorage.getItem(`${this.namespace}-${i}`);
      n !== null && (this.data[i] = JSON.parse(n));
    });
  }
};
function We(s, t) {
  for (const e in t)
    t[e] !== void 0 && Object.prototype.toString.call(t[e]) === "[object Object]" && e in s && typeof s[e] == "object" ? s[e] = We(s[e], t[e]) : t[e] !== void 0 && (s[e] = t[e]);
  return s;
}
var Se = [
  {
    id: "webEvents",
    module: Ts,
    namedExport: "WebEventsPlugin"
  },
  {
    id: "resizer",
    module: Es,
    namedExport: "ResizerPlugin"
  },
  {
    id: "assets",
    module: Ri,
    namedExport: "AssetsPlugin"
  },
  {
    id: "scenes",
    module: Ms,
    namedExport: "SceneManagerPlugin"
  },
  {
    id: "actions",
    module: Fi,
    namedExport: "ActionsPlugin"
  },
  {
    id: "input",
    module: Ss,
    namedExport: "InputPlugin"
  },
  {
    id: "keyboard",
    module: bs,
    namedExport: "KeyboardPlugin"
  },
  {
    id: "focus",
    module: es,
    namedExport: "FocusManagerPlugin"
  },
  {
    id: "popups",
    module: Ps,
    namedExport: "PopupManagerPlugin"
  },
  {
    id: "audio",
    module: Qi,
    namedExport: "AudioManagerPlugin"
  },
  {
    id: "i18n",
    module: ss,
    namedExport: "i18nPlugin"
  }
];
var Os = { BASE_URL: "/", DEV: false, MODE: "production", PROD: true, SSR: false };
var zs = {
  antialias: false,
  autoStart: true,
  resizeToContainer: false,
  backgroundColor: 0,
  backgroundAlpha: 1,
  clearBeforeRender: false,
  context: null,
  eventFeatures: void 0,
  eventMode: void 0,
  hello: false,
  powerPreference: "high-performance",
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  resizeTo: void 0,
  sharedTicker: true,
  view: void 0,
  autoDensity: false,
  resolution: Math.max(window.devicePixelRatio, 2),
  // dill pixel options
  useHash: W,
  showSceneDebugMenu: W,
  showStats: W,
  useStore: true,
  useSpine: false,
  useVoiceover: false,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: "immediate",
  assets: {
    manifest: "./assets.json"
  }
};
var v = class _v extends Application {
  constructor() {
    super(), this.__dill_pixel_method_binding_root = true, this.onPause = new u(), this.onResume = new u(), this.onResize = new u(), this._plugins = /* @__PURE__ */ new Map(), this._isBooting = true, this._env = Os || {}, this._paused = false, this._center = new Point(0, 0), w(this);
  }
  get env() {
    return this._env;
  }
  get paused() {
    return this._paused;
  }
  set paused(t) {
    this._paused = t, this._paused ? this.onPause.emit() : this.onResume.emit();
  }
  resume() {
    this.paused = false;
  }
  pause() {
    this._paused = true;
  }
  togglePause() {
    this._paused = !this._paused;
  }
  get appVersion() {
    try {
      this._appVersion = __DILL_PIXEL_APP_VERSION;
    } catch {
      this._appVersion = -1;
    }
    return this._appVersion;
  }
  get appName() {
    if (!this._appName)
      try {
        this._appName = __DILL_PIXEL_APP_NAME;
      } catch {
        this._appName = "n/a";
      }
    return this._appName;
  }
  get i18n() {
    return this._i18n || (this._i18n = this.getPlugin("i18n")), this._i18n;
  }
  get resizer() {
    return this._resizer || (this._resizer = this.getPlugin("resizer")), this._resizer;
  }
  get actionsPlugin() {
    return this._actionsPlugin || (this._actionsPlugin = this.getPlugin("actions")), this._actionsPlugin;
  }
  get input() {
    return this._input || (this._input = this.getPlugin("input")), this._input;
  }
  // controls
  get controls() {
    return this._input || (this._input = this.getPlugin("input")), this._input.controls;
  }
  get store() {
    return this._store;
  }
  get center() {
    return this._center;
  }
  get assets() {
    return this._assetManager || (this._assetManager = this.getPlugin("assets")), this._assetManager;
  }
  get scenes() {
    return this._sceneManager || (this._sceneManager = this.getPlugin("scenes")), this._sceneManager;
  }
  get webEvents() {
    return this._webEventsManager || (this._webEventsManager = this.getPlugin("webEvents")), this._webEventsManager;
  }
  get keyboard() {
    return this._keyboardManager || (this._keyboardManager = this.getPlugin("keyboard")), this._keyboardManager;
  }
  get focus() {
    return this._focusManager || (this._focusManager = this.getPlugin("focus")), this._focusManager;
  }
  get size() {
    return this.resizer.size;
  }
  get popups() {
    return this._popupManager || (this._popupManager = this.getPlugin("popups")), this._popupManager;
  }
  get audio() {
    return this._audioManager || (this._audioManager = this.getPlugin("audio")), this._audioManager;
  }
  get actionContext() {
    return this.actionsPlugin.context;
  }
  set actionContext(t) {
    this.actionsPlugin.context = t;
  }
  get voiceover() {
    return this._voiceoverPlugin || (this._voiceoverPlugin = this.getPlugin(
      "voiceover",
      this._isBooting || this.config.useVoiceover
    )), this._voiceoverPlugin;
  }
  get captions() {
    return this._captionsPlugin || (this._captionsPlugin = this.getPlugin("captions", this._isBooting || this.config.useVoiceover)), this._captionsPlugin;
  }
  get isMobile() {
    return isMobile.any;
  }
  get isTouch() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
  get signal() {
    return Te;
  }
  get func() {
    return $t;
  }
  get exec() {
    return $t;
  }
  get views() {
    var t;
    return this._views || (this._views = [this.scenes.view, this.popups.view], this.scenes.splash.view && this._views.push(this.scenes.splash.view), this.scenes.transition && this._views.push(this.scenes.transition), (t = this.captions) != null && t.view && this._views.push(this.captions.view)), this._views;
  }
  static getInstance() {
    return _v.instance;
  }
  /**
   * Destroy the application
   * This will destroy all plugins and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  destroy(t, e) {
    this._plugins.forEach((i) => {
      i.destroy();
    }), this.store.destroy(), super.destroy(t, e);
  }
  setContainer(t) {
    _v.containerElement || (_v.containerElement = t);
  }
  async initialize(t) {
    if (_v.instance)
      throw new Error("Application is already initialized");
    _v.instance = this, this.config = Object.assign({ ...zs }, t), t.container && (_v.containerElement = t.container), _.initialize(this.config.logger), await this.boot(this.config), await this.preInitialize(this.config), await this.initAssets(), await this.init(this.config), await this.registerDefaultPlugins(), await this._setup(), this.plugins = await _i(this.config.plugins || []);
    for (let e = 0; e < this.plugins.length; e++) {
      const i = this.plugins[e];
      i && (i == null ? void 0 : i.autoLoad) !== false && await this.loadPlugin(i);
    }
    if (await this.registerPlugins(), this.config.useStore) {
      this.storageAdapters = await gi(this.config.storageAdapters || []);
      for (let e = 0; e < this.storageAdapters.length; e++) {
        const i = this.storageAdapters[e];
        if (this.store.hasAdapter(i.id)) {
          _.error(`Storage Adapter with id "${i.id}" already registered. Not registering.`);
          continue;
        }
        const n = await At(i);
        await this.registerStorageAdapter(new n(i.id), i.options);
      }
      await this.registerStorageAdapters();
    }
    return await this.setup(), await this.loadDefaultScene(), this.renderer.canvas.focus(), this.config.container && this.config.container.classList.add("loaded"), this._isBooting = false, _v.instance;
  }
  getPlugin(t, e = false) {
    const i = this._plugins.get(t);
    return !i && e && _.error(`Plugin with name "${t}" not found.`), i;
  }
  async postInitialize() {
    globalThis.__PIXI_APP__ = this, this._resize(), this._plugins.forEach((t) => {
      t.postInitialize(this);
    }), this.webEvents.onVisibilityChanged.connect((t) => {
      t ? this.audio.restore() : this.audio.suspend();
    });
  }
  getUnloadedPlugin(t) {
    var e;
    return (e = this.plugins) == null ? void 0 : e.find((i) => i.id === t);
  }
  async loadPlugin(t, e = false) {
    if (this._plugins.has(t.id))
      return await this.registerPlugin(this._plugins.get(t.id), t.options);
    const i = await At(t), n = new i(t.id);
    n.id !== t.id && (n.id = t.id);
    let o = t.options;
    return e && !o && (o = this.config[n.id]), await this.registerPlugin(n, o);
  }
  /**
   * Gets an ActionSignal for the specified action type
   * @template TActionData - The type of data associated with the action
   * @param {A} action - The action to get the signal for
   * @returns {ActionSignal<TActionData>} A signal that can be used to listen for the action
   * @example
   * // Listen for a 'jump' action
   * app.actions('jump').connect((data) => {
   *   player.jump(data.power);
   * });
   */
  actions(t) {
    return this.actionsPlugin.getAction(t);
  }
  /**
   * Dispatches an action with optional data
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.sendAction('jump', { power: 100 });
   */
  sendAction(t, e) {
    this.actionsPlugin.sendAction(t, e);
  }
  /**
   * Dispatches an action with optional data
   * alias for sendAction
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.action('jump', { power: 100 });
   */
  action(t, e) {
    this.actionsPlugin.sendAction(t, e);
  }
  /**
   * Checks if an action is currently active
   * @param {A} action - The action to check
   * @returns {boolean} True if the action is active, false otherwise
   * @example
   * // Check if the 'run' action is active
   * if (app.isActionActive('run')) {
   *   player.updateSpeed(runningSpeed);
   * }
   */
  isActionActive(t) {
    return this.input.controls.isActionActive(t);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  getStorageAdapter(t) {
    return this.store.getAdapter(t);
  }
  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  get data() {
    return this.store.getAdapter("data");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async boot(t) {
    console.log(
      `%c App info - %c${this.appName} | %cv${this.appVersion} `,
      "background: rgba(31, 41, 55, 1); color: #74b64c",
      "background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold",
      "background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold"
    );
  }
  /**
   * Pre-initialize the application
   * This is called before the application is initialized
   * should register any pixi extensions, etc
   * @param {Partial<IApplicationOptions>} config
   * @returns {Promise<void>}
   * @protected
   */
  async preInitialize(t) {
    t.useSpine && await this.loadPlugin({
      id: "SpinePlugin",
      module: () => import("./SpinePlugin-BmtOdimW-WL2DPB5Z.js"),
      namedExport: "SpinePlugin"
    }), this.config.useStore && (this._store = new xi(), this._store.initialize(this), this.registerDefaultStorageAdapters());
  }
  // plugins
  async registerPlugin(t, e) {
    return this._plugins.has(t.id) ? (_.error(`Plugin with id "${t.id}" already registered. Not registering.`), t.initialize(this, e)) : (t.registerCoreFunctions(), t.registerCoreSignals(), this._plugins.set(t.id, t), t.initialize(this, e));
  }
  async registerDefaultPlugins() {
    for (let e = 0; e < Se.length; e++) {
      const i = Se[e];
      await this.loadPlugin(i, true);
    }
    (this.config.showStats === true || W && this.config.showStats !== false) && await this.loadPlugin({
      id: "stats",
      module: () => import("./StatsPlugin-oCsIuD9Y-YOPXGXUK.js"),
      namedExport: "StatsPlugin"
    }), this.config.useVoiceover && (await this.loadPlugin({
      id: "voiceover",
      module: () => import("./VoiceOverPlugin-C1E6kNts-Z2ENHN2Z.js"),
      namedExport: "VoiceOverPlugin",
      options: this.config.voiceover || void 0
    }), await this.loadPlugin({
      id: "captions",
      module: () => import("./CaptionsPlugin-DazrJZ9z-YQYZV5TQ.js"),
      namedExport: "CaptionsPlugin",
      options: this.config.captions || void 0
    }));
  }
  async registerDefaultStorageAdapters() {
    const t = new Fs();
    await this.registerStorageAdapter(t, this.config.data);
  }
  async registerPlugins() {
    return Promise.resolve();
  }
  // storage
  async registerStorageAdapters() {
    return Promise.resolve();
  }
  async registerStorageAdapter(t, e) {
    return this.store.registerAdapter(t, e);
  }
  async setup() {
  }
  async initAssets() {
    var e, i;
    const t = ((e = this.config.assets) == null ? void 0 : e.initOptions) || {};
    if ((i = this.config.assets) != null && i.manifest) {
      let n = this.config.assets.manifest || t.manifest;
      Ee(n) && (n = await n), t.manifest = n;
    }
    await Assets.init(t), this.manifest = Assets.resolver._manifest;
  }
  async loadDefaultScene() {
    return this.scenes.loadDefaultScene();
  }
  async _resize() {
    this.resizer.resize(), console.log("Application._resize", this.size), this.ticker.addOnce(() => {
      this._center.set(this.size.width * 0.5, this.size.height * 0.5), this.views.forEach((t) => {
        !t || !t.position || t.position.set(this._center.x, this._center.y);
      }), this.onResize.emit(this.size);
    });
  }
  /**
   * Called after the application is initialized
   * Here we add application specific signal listeners, etc
   * @returns {Promise<void>}
   * @private
   */
  async _setup() {
    var t, e;
    return W && (globalThis.__PIXI_APP__ = this), this._resize(), this.webEvents.onResize.connect(this._resize, -1), (t = this.scenes.splash) != null && t.view && this.scenes.splash.zOrder === "bottom" && this._addSplash(), this.scenes.view.label = "SceneManager", this.stage.addChild(this.scenes.view), (e = this.scenes.splash) != null && e.view && this.scenes.splash.zOrder === "top" && this._addSplash(), this.scenes.transition && (this.scenes.transition.label = "SceneManager:: Transition", this.stage.addChild(this.scenes.transition)), this.stage.addChild(this.popups.view), this.focus.view.label = "FocusManager", this.stage.addChild(this.focus.view), Promise.resolve();
  }
  _addSplash() {
    this.scenes.splash.view && (this.scenes.splash.view.label = "SceneManager:: Splash", this.stage.addChild(this.scenes.splash.view));
  }
};
var jn = R.Collector;
var Hn = R.CollectorArray;
var Gn = R.CollectorLast;
var Vn = R.CollectorUntil0;
var Xn = R.CollectorWhile0;
var qn = R.SignalConnections;

export {
  checkExtension,
  Assets,
  gsapWithCSS,
  Pe,
  W,
  Rs,
  Rt,
  Us,
  _,
  ke,
  $s,
  Ee,
  si,
  ni,
  At,
  Jt,
  Ws,
  Ut,
  ri,
  Ht,
  ai,
  Ks,
  hi,
  X,
  $,
  js,
  Hs,
  Gs,
  Vs,
  Xs,
  qs,
  Ys,
  li,
  Ns,
  I,
  Zs,
  Qs,
  Js,
  tn,
  ci,
  w,
  en,
  Le,
  sn,
  Gt,
  nn,
  on,
  rn,
  an,
  wt,
  bt,
  hn,
  Ot,
  te,
  ee,
  di,
  fi,
  pi,
  ln,
  cn,
  ie,
  un,
  dn,
  fn,
  pn,
  _n,
  gn,
  Me,
  se,
  ne,
  mn,
  yn,
  vn,
  wn,
  bn,
  _i,
  gi,
  xn,
  mi,
  yi,
  vi,
  bi,
  Cn,
  Te,
  $t,
  xi,
  u,
  O,
  Fi,
  Mn,
  Oi,
  zi,
  Bi,
  Tn,
  Dn,
  Fn,
  On,
  Ri,
  Ui,
  ge,
  Qi,
  Ji,
  es,
  ss,
  Z,
  K,
  ns,
  Vt,
  Re,
  ye,
  ve,
  B,
  we,
  as,
  zn,
  Bn,
  hs,
  ft,
  In,
  Rn,
  cs,
  be,
  ds,
  xe,
  Et,
  Ce,
  Lt,
  ct,
  Ue,
  Un,
  vs,
  k,
  Mt,
  E,
  L,
  Bt,
  M,
  ws,
  vt,
  Q,
  bs,
  xs,
  C,
  Wn,
  Cs,
  As,
  Ss,
  Kn,
  Ps,
  Es,
  Ms,
  Ts,
  Ds,
  Fs,
  v,
  jn,
  Hn,
  Gn,
  Vn,
  Xn,
  qn
};
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.12.5
   * https://gsap.com
   *
   * @license Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.12.5
   * https://gsap.com
   *
   * Copyright 2008-2024, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license or for
   * Club GSAP members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
//# sourceMappingURL=chunk-D37FA67I.js.map
