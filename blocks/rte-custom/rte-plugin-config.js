/**
 * Custom RTE Plugin Configuration for Westpac
 * Based on Adobe Experience Manager Cloud Service RTE configuration
 * Reference: https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/configure-rte
 */

export const rtePluginConfig = {
  // Custom Westpac Plugin
  customPlugin: {
    name: 'customPlugin',
    title: 'Custom Westpac Plugin',
    icon: 'westpac-icon',
    features: {
      highlight: {
        title: 'Westpac Highlight',
        icon: 'highlight',
        command: 'westpacHighlight',
        shortcut: 'Ctrl+H'
      },
      callout: {
        title: 'Westpac Callout',
        icon: 'callout',
        command: 'westpacCallout',
        shortcut: 'Ctrl+Shift+C'
      },
      quote: {
        title: 'Westpac Quote',
        icon: 'quote',
        command: 'westpacQuote', 
        shortcut: 'Ctrl+Q'
      }
    },
    toolbar: [
      'customPlugin#highlight',
      'customPlugin#callout',
      'customPlugin#quote'
    ]
  },

  // Westpac Branding Plugin
  westpacPlugin: {
    name: 'westpacPlugin',
    title: 'Westpac Branding Plugin',
    icon: 'branding-icon',
    features: {
      brandColors: {
        title: 'Brand Colors',
        icon: 'palette',
        command: 'westpacBrandColors'
      },
      typography: {
        title: 'Brand Typography',
        icon: 'font',
        command: 'westpacTypography'
      },
      components: {
        title: 'Brand Components',
        icon: 'component',
        command: 'westpacComponents'
      }
    },
    toolbar: [
      'westpacPlugin#brandColors',
      'westpacPlugin#typography',
      'westpacPlugin#components'
    ]
  },

  // RTE Configuration
  rteConfig: {
    // Toolbar configuration
    toolbar: {
      // Group 1: Undo/Redo
      group1: ['undo', 'redo'],
      
      // Group 2: Basic formatting
      group2: ['bold', 'italic', 'underline'],
      
      // Group 3: Paragraph formatting
      group3: ['format', 'fontfamily', 'fontsize'],
      
      // Group 4: Colors
      group4: ['fontcolor', 'fontbackgroundcolor'],
      
      // Group 5: Lists
      group5: ['bullist', 'numlist'],
      
      // Group 6: Indentation
      group6: ['outdent', 'indent'],
      
      // Group 7: Alignment
      group7: ['justifyleft', 'justifycenter', 'justifyright'],
      
      // Group 8: Links and media
      group8: ['link', 'unlink', 'anchor', 'image', 'table'],
      
      // Group 9: Tools
      group9: ['spellcheck', 'find', 'replace'],
      
      // Group 10: Clipboard
      group10: ['cut', 'copy', 'paste', 'pastetext', 'pastefromword'],
      
      // Group 11: Advanced
      group11: ['specialchars', 'sourceedit'],
      
      // Group 12: Custom plugins
      group12: ['customPlugin', 'westpacPlugin']
    },

    // Paragraph formats
    paraformat: {
      tags: [
        { tag: 'p', description: 'Paragraph' },
        { tag: 'h1', description: 'Heading 1' },
        { tag: 'h2', description: 'Heading 2' },
        { tag: 'h3', description: 'Heading 3' },
        { tag: 'h4', description: 'Heading 4' },
        { tag: 'h5', description: 'Heading 5' },
        { tag: 'h6', description: 'Heading 6' },
        { tag: 'div', description: 'Division' },
        { tag: 'pre', description: 'Preformatted' }
      ],
      defaultTag: 'p'
    },

    // Font families
    fontFamily: {
      fonts: [
        { name: 'SF Pro Text', value: '"SF Pro Text", Arial, sans-serif' },
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", serif' },
        { name: 'Courier New', value: '"Courier New", monospace' },
        { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' }
      ],
      defaultFont: 'SF Pro Text'
    },

    // Font sizes
    fontSize: {
      sizes: [
        '8px', '9px', '10px', '11px', '12px', '14px',
        '16px', '18px', '20px', '22px', '24px', '26px',
        '28px', '36px', '48px', '72px'
      ],
      defaultSize: '16px'
    },

    // Colors
    colors: {
      // Westpac brand colors
      brand: {
        primary: '#d32f2f',
        secondary: '#1f1c4f',
        accent: '#fdf5fc',
        neutral: '#f3f4f6'
      },
      // Standard colors
      standard: [
        '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'
      ]
    },

    // Styles
    styles: {
      formats: {
        'westpac-highlight': {
          title: 'Westpac Highlight',
          block: 'span',
          classes: ['westpac-highlight'],
          wrapper: true,
          exact: true
        },
        'westpac-callout': {
          title: 'Westpac Callout',
          block: 'div',
          classes: ['westpac-callout'],
          wrapper: true,
          exact: true
        },
        'westpac-quote': {
          title: 'Westpac Quote',
          block: 'blockquote',
          classes: ['westpac-quote'],
          wrapper: true,
          exact: true
        },
        'brand-button': {
          title: 'Brand Button',
          inline: 'a',
          classes: ['btn', 'btn-primary'],
          attributes: { role: 'button' }
        }
      }
    },

    // HTML rules
    htmlRules: {
      allowedElements: [
        'a', 'em', 'strong', 'cite', 'blockquote', 'br', 'ul', 'ol', 'li',
        'p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'img', 'figure', 'figcaption'
      ],
      allowedAttributes: {
        '*': ['class', 'id', 'style'],
        'a': ['href', 'title', 'target', 'rel'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'table': ['border', 'cellpadding', 'cellspacing'],
        'td': ['colspan', 'rowspan'],
        'th': ['colspan', 'rowspan', 'scope']
      },
      forbiddenElements: ['script', 'object', 'embed', 'iframe'],
      htmlPasteRules: {
        allowBasicTextFormatting: true,
        allowTables: true,
        allowImages: true,
        stripComments: true,
        stripScripts: true
      }
    },

    // Special characters
    specialChars: {
      groups: {
        currency: ['€', '$', '£', '¥', '¢'],
        math: ['±', '×', '÷', '≠', '≤', '≥'],
        arrows: ['→', '←', '↑', '↓', '↔'],
        symbols: ['™', '®', '©', '°', '%', '‰'],
        quotes: ['"', '"', "'", "'", '«', '»'],
        punctuation: ['…', '–', '—', '•']
      }
    },

    // Link configuration
    link: {
      protocols: ['http://', 'https://', 'ftp://', 'mailto:', 'tel:'],
      defaultProtocol: 'https://',
      targetOptions: [
        { name: 'Same Window', value: '_self' },
        { name: 'New Window', value: '_blank' },
        { name: 'Parent Frame', value: '_parent' },
        { name: 'Top Frame', value: '_top' }
      ]
    },

    // Table configuration
    table: {
      allowedStyles: ['border', 'border-collapse', 'width', 'height'],
      defaultStyles: {
        'border-collapse': 'collapse',
        'width': '100%'
      }
    }
  },

  // Plugin initialization
  initPlugins: function(editor) {
    // Initialize custom plugins
    this.initCustomPlugin(editor);
    this.initWestpacPlugin(editor);
  },

  initCustomPlugin: function(editor) {
    // Register custom plugin commands
    editor.addCommand('westpacHighlight', () => {
      editor.formatter.toggle('westpac-highlight');
    });

    editor.addCommand('westpacCallout', () => {
      const selection = editor.selection.getContent();
      const calloutHTML = `<div class="westpac-callout"><h3>Information</h3><p>${selection || 'Add your content here...'}</p></div>`;
      editor.insertContent(calloutHTML);
    });

    editor.addCommand('westpacQuote', () => {
      editor.formatter.toggle('westpac-quote');
    });
  },

  initWestpacPlugin: function(editor) {
    // Register Westpac branding commands
    editor.addCommand('westpacBrandColors', () => {
      // Open brand color picker
      this.openBrandColorPicker(editor);
    });

    editor.addCommand('westpacTypography', () => {
      // Apply brand typography
      this.applyBrandTypography(editor);
    });

    editor.addCommand('westpacComponents', () => {
      // Insert brand components
      this.insertBrandComponents(editor);
    });
  },

  openBrandColorPicker: function(editor) {
    // Implementation for brand color picker
    const colors = this.rteConfig.colors.brand;
    // Show color picker dialog with brand colors
  },

  applyBrandTypography: function(editor) {
    // Apply Westpac typography standards
    const fontFamily = this.rteConfig.fontFamily.defaultFont;
    editor.formatter.apply('fontname', { value: fontFamily });
  },

  insertBrandComponents: function(editor) {
    // Insert pre-defined brand components
    const componentHTML = `
      <div class="westpac-callout">
        <h3>Brand Component</h3>
        <p>This is a pre-configured Westpac brand component.</p>
      </div>
    `;
    editor.insertContent(componentHTML);
  }
};

export default rtePluginConfig;
