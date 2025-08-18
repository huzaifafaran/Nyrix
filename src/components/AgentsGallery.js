import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './AgentsGallery.css';
import agents from './agentsData';

const Row = ({ title, items, onPick, selectedId }) => {
  const rowRef = React.useRef(null);

  const scrollBy = (delta) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <div className="agents-row">
      <div className="row-header">
        <h3>{title}</h3>
        <div className="row-controls">
          <button className="nav-btn" onClick={() => scrollBy(-600)} aria-label="Scroll left">
            <ChevronLeft />
          </button>
          <button className="nav-btn" onClick={() => scrollBy(600)} aria-label="Scroll right">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="cards" ref={rowRef}>
        {items.map((agent) => (
          <motion.div
            key={agent.id}
            className={`agent-card-tile ${selectedId === agent.id ? 'active' : ''}`}
            whileHover={{ scale: 1.05, y: -6 }}
            onClick={() => onPick && onPick(agent)}
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
  );
};

const AgentsGallery = () => {
  const [selected, setSelected] = React.useState(agents[0]);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const openDetails = (agent) => setSelected(agent);
  const closeDetails = () => setSelected(null);
  const go = (dir) => {
    const idx = agents.findIndex(a => a.id === selected.id);
    const next = (idx + dir + agents.length) % agents.length;
    setSelected(agents[next]);
  };

  React.useEffect(() => {
    // reset load state when selection changes
    setImageLoaded(false);
  }, [selected?.id]);

  return (
    <section className="agents-gallery section">
      <div className="container">
        <AnimatePresence mode="wait">
        {selected && (
          <motion.div key={selected.id} className="featured" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
          <div className="featured-media">
            {!imageLoaded && (
              <div className="media-skeleton" />
            )}
            {selected?.imageHero ? (
              <motion.img
                key={selected.id + '-img'}
                src={selected.imageHero}
                alt={selected.title}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
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

        <Row title="All Agents" items={agents} onPick={openDetails} selectedId={selected?.id} />
      </div>
    </section>
  );
};

export default AgentsGallery;


