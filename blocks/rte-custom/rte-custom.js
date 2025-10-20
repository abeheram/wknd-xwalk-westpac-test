export default function decorate(block) {
  const props = [...block.children];
  const content = props[0]?.textContent?.trim() || '';
  const variant = props[1]?.textContent?.trim() || 'default';
  const maxLength = props[2]?.textContent?.trim() || '5000';
  const enableSpellCheck = props[3]?.textContent?.trim().toLowerCase() === 'true';
  const enableSourceEdit = props[4]?.textContent?.trim().toLowerCase() === 'true';
  
  // Clear the block
  block.innerHTML = '';
  
  // Add CSS class based on variant
  block.classList.add(`rte-${variant}`);
  
  // Create the RTE container
  const rteContainer = document.createElement('div');
  rteContainer.className = 'rte-container';
  
  // Create the content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'rte-content';
  contentWrapper.innerHTML = content;
  
  // Add Westpac-specific styling classes
  if (variant === 'westpac') {
    contentWrapper.classList.add('westpac-branded');
  }
  
  // Apply character limit if specified
  if (maxLength && parseInt(maxLength) > 0) {
    const charCount = document.createElement('div');
    charCount.className = 'char-count';
    charCount.textContent = `0 / ${maxLength} characters`;
    rteContainer.appendChild(charCount);
    
    // Update character count for existing content
    const currentLength = contentWrapper.textContent.length;
    charCount.textContent = `${currentLength} / ${maxLength} characters`;
    
    if (currentLength > parseInt(maxLength)) {
      charCount.classList.add('over-limit');
    }
  }
  
  // Enable spell check if required
  if (enableSpellCheck) {
    contentWrapper.setAttribute('spellcheck', 'true');
  }
  
  // Add source edit toggle if enabled
  if (enableSourceEdit) {
    const sourceToggle = document.createElement('button');
    sourceToggle.className = 'source-toggle';
    sourceToggle.textContent = 'View Source';
    sourceToggle.addEventListener('click', () => {
      const isSource = contentWrapper.classList.contains('source-mode');
      if (isSource) {
        contentWrapper.innerHTML = contentWrapper.textContent;
        contentWrapper.classList.remove('source-mode');
        sourceToggle.textContent = 'View Source';
      } else {
        contentWrapper.textContent = contentWrapper.innerHTML;
        contentWrapper.classList.add('source-mode');
        sourceToggle.textContent = 'View Rendered';
      }
    });
    rteContainer.appendChild(sourceToggle);
  }
  
  rteContainer.appendChild(contentWrapper);
  block.appendChild(rteContainer);
  
  // Initialize custom plugins
  initializeCustomPlugins(contentWrapper, variant);
}

function initializeCustomPlugins(container, variant) {
  // Custom Westpac Plugin functionality
  if (variant === 'westpac') {
    // Add Westpac-specific functionality
    addWestpacHighlightPlugin(container);
    addWestpacCalloutPlugin(container);
    addWestpacQuotePlugin(container);
  }
  
  // General custom plugin functionality
  addCustomFormattingPlugin(container);
}

function addWestpacHighlightPlugin(container) {
  // Add click handlers for Westpac highlight elements
  const highlights = container.querySelectorAll('.westpac-highlight');
  highlights.forEach(highlight => {
    highlight.addEventListener('click', (e) => {
      e.preventDefault();
      // Custom highlight behavior
      highlight.classList.toggle('active');
    });
  });
}

function addWestpacCalloutPlugin(container) {
  // Add functionality for Westpac callout boxes
  const callouts = container.querySelectorAll('.westpac-callout');
  callouts.forEach(callout => {
    // Add expand/collapse functionality
    const header = callout.querySelector('h3, h4, h5, h6');
    if (header) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        callout.classList.toggle('collapsed');
      });
    }
  });
}

function addWestpacQuotePlugin(container) {
  // Add functionality for Westpac quotes
  const quotes = container.querySelectorAll('.westpac-quote');
  quotes.forEach(quote => {
    // Add citation functionality
    if (!quote.querySelector('.quote-citation')) {
      const citation = document.createElement('cite');
      citation.className = 'quote-citation';
      citation.textContent = 'Westpac Customer';
      quote.appendChild(citation);
    }
  });
}

function addCustomFormattingPlugin(container) {
  // Add custom formatting functionality
  container.addEventListener('keydown', (e) => {
    // Custom keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'h':
          e.preventDefault();
          toggleHighlight(e.target);
          break;
        case 'q':
          e.preventDefault();
          wrapWithQuote(e.target);
          break;
      }
    }
  });
}

function toggleHighlight(element) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'westpac-highlight';
    try {
      range.surroundContents(span);
    } catch (e) {
      // Handle complex selections
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }
    selection.removeAllRanges();
  }
}

function wrapWithQuote(element) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'westpac-quote';
    try {
      range.surroundContents(blockquote);
    } catch (e) {
      blockquote.appendChild(range.extractContents());
      range.insertNode(blockquote);
    }
    selection.removeAllRanges();
  }
}
