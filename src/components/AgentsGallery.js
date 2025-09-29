import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Search, Filter } from 'lucide-react';
import './AgentsGallery.css';
import agents from './agentsData';

const CategoryRow = ({ category, items, onPick, selectedId }) => {
  const rowRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
    rowRef.current.style.cursor = 'grabbing';
    rowRef.current.style.userSelect = 'none';
    rowRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll during drag
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (rowRef.current) {
      rowRef.current.style.cursor = 'grab';
      rowRef.current.style.userSelect = 'auto';
      rowRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (rowRef.current) {
      rowRef.current.style.cursor = 'grab';
      rowRef.current.style.userSelect = 'auto';
      rowRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother feel
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.pageX - rowRef.current.offsetLeft);
    setScrollLeft(rowRef.current.scrollLeft);
    rowRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll during touch
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother feel
    rowRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (rowRef.current) {
      rowRef.current.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="category-section">
      <div className="category-header">
        <h3 className="category-title">{category}</h3>
        <div className="category-count">{items.length} agent{items.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="agents-row">
        <div 
          className="cards" 
          ref={rowRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: 'grab' }}
        >
          {items.map((agent) => (
            <motion.div
              key={agent.id}
              className={`agent-card-tile ${selectedId === agent.id ? 'active' : ''}`}
              whileHover={{ scale: 1.05, y: -6 }}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                  return;
                }
                onPick && onPick(agent);
              }}
            >
              {agent.imageThumb ? (
                <img className="poster" src={agent.imageThumb} alt={agent.title} />
              ) : (
                <div className="poster" style={{ background: `linear-gradient(135deg, ${agent.color}55, ${agent.color})` }} />
              )}
              <div className="meta">
                <span className="tag">{agent.subtitle}</span>
                <h4 className="name">{agent.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AgentsGallery = () => {
  const [selected, setSelected] = React.useState(agents[0]);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [filteredAgents, setFilteredAgents] = React.useState(agents);

  // Get unique categories
  const categories = ['All', ...new Set(agents.map(agent => agent.category))];

  // Group agents by category for Netflix-style browsing
  const getGroupedAgents = () => {
    let filtered = agents;
    
    // Filter by search term first
    if (searchTerm) {
      filtered = filtered.filter(agent => 
        agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // If "All" is selected, group by category for Netflix-style browsing
    if (selectedCategory === 'All') {
      const grouped = {};
      filtered.forEach(agent => {
        if (!grouped[agent.category]) {
          grouped[agent.category] = [];
        }
        grouped[agent.category].push(agent);
      });
      return grouped;
    }
    
    // If specific category is selected, return single group
    const categoryFiltered = filtered.filter(agent => agent.category === selectedCategory);
    return { [selectedCategory]: categoryFiltered };
  };

  const groupedAgents = getGroupedAgents();

  // Filter agents based on search and category for other uses
  React.useEffect(() => {
    let filtered = agents;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(agent => agent.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(agent => 
        agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredAgents(filtered);
    
    // Update selected agent if current selection is not in filtered results
    if (filtered.length > 0 && !filtered.find(agent => agent.id === selected.id)) {
      setSelected(filtered[0]);
    }
  }, [searchTerm, selectedCategory, selected.id]);

  const openDetails = (agent) => {
    setSelected(agent);
    // Scroll to top smoothly when an agent is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeDetails = () => setSelected(null);
  const go = (dir) => {
    const currentFiltered = filteredAgents.length > 0 ? filteredAgents : agents;
    const idx = currentFiltered.findIndex(a => a.id === selected.id);
    const next = (idx + dir + currentFiltered.length) % currentFiltered.length;
    setSelected(currentFiltered[next]);
    // Scroll to top smoothly when navigating with arrow keys
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle arrow keys when the gallery is focused or when no input is focused
      const isGalleryFocused = e.target.closest('.agents-gallery');
      const isInputFocused = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true';
      
      if (isGalleryFocused && !isInputFocused) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            go(-1);
            break;
          case 'ArrowRight':
            e.preventDefault();
            go(1);
            break;
          default:
            break;
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected?.id]); // Re-run when selected agent changes

  React.useEffect(() => {
    // reset load state when selection changes
    setImageLoaded(false);
  }, [selected?.id]);

  return (
    <section className="agents-gallery section" tabIndex={0}>
      <div className="container">
        {/* Search and Filter Controls */}
        <div className="gallery-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="results-count">
            {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <AnimatePresence mode="wait">
        {selected && (
          <motion.div key={selected.id} className="featured" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <div className="featured-media">
            {!imageLoaded && (
              <div className="media-skeleton" />
            )}
            {selected?.imageHero ? (
              <>
                <motion.img
                  key={selected.id + '-img'}
                  src={selected.imageHero}
                  alt={selected.title}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    position: imageLoaded ? 'static' : 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </>
            ) : (
              <div className="poster large" style={{ background: selected?.gradient }} />
            )}
            <button className="nav-btn abs left" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft/></button>
            <button className="nav-btn abs right" onClick={() => go(1)} aria-label="Next"><ChevronRight/></button>
          </div>
          <div className="featured-info">
            {imageLoaded ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                <h2>{selected?.title}</h2>
                <p className="subtitle">{selected?.subtitle}</p>
                <p className="description">{selected?.fullDescription}</p>
                <h4 className="cap-title">Key Capabilities</h4>
                <ul className="capabilities">
                  {selected?.features.map((f, i) => (<li key={i}>{f}</li>))}
                </ul>
                <motion.button className="demo-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' });
                  }
                }}>Request Demo</motion.button>
              </motion.div>
            ) : (
              <div className="info-skeleton">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-line" style={{ width: '60%' }}></div>
                <div className="skeleton skeleton-line" style={{ width: '90%' }}></div>
                <div className="skeleton skeleton-line" style={{ width: '95%' }}></div>
                <div className="skeleton skeleton-line" style={{ width: '80%' }}></div>
                <div className="skeleton skeleton-title small"></div>
                <div className="skeleton skeleton-line" style={{ width: '70%' }}></div>
                <div className="skeleton skeleton-line" style={{ width: '85%' }}></div>
                <div className="skeleton skeleton-line" style={{ width: '75%' }}></div>
              </div>
            )}
          </div>
        </motion.div>
        )}
        </AnimatePresence>

        {/* Category Sections - Netflix/YouTube Style */}
        <div className="categories-container">
          {Object.entries(groupedAgents).map(([category, categoryAgents]) => (
            <CategoryRow
              key={category}
              category={category}
              items={categoryAgents}
              onPick={openDetails}
              selectedId={selected?.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsGallery;


