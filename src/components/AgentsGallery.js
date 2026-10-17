import React from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import "./AgentsGallery.css";
import agents from "./agentsData";
import EmphasizedTitle from "./EmphasizedTitle";

const CategoryRow = ({ category, items, onPick, selectedId }) => {
  if (!items.length) return null;
  return (
    <section className="agent-category" aria-label={`${category} agents`}>
      <div className="agent-category-heading">
        <h3>{category}</h3>
        <span>
          {items.length} agent{items.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="agent-card-row">
        {items.map((agent) => (
          <button
            key={agent.id}
            type="button"
            className="agent-library-card"
            aria-pressed={selectedId === agent.id}
            onClick={() => onPick(agent)}
          >
            <span className="agent-card-art">
              {agent.imageThumb ? (
                <img src={agent.imageThumb} alt="" loading="lazy" />
              ) : (
                <span
                  className="agent-color-fallback"
                  style={{ background: agent.color }}
                />
              )}
            </span>
            <span className="agent-card-copy">
              <span className="agent-subtitle">{agent.subtitle}</span>
              <span className="agent-card-title">{agent.title}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

const AgentsGallery = () => {
  const [selected, setSelected] = React.useState(agents[0]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const reducedMotion = useReducedMotion();
  const categories = ["All", ...new Set(agents.map((agent) => agent.category))];
  const filteredAgents = React.useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return agents.filter(
      (agent) =>
        (selectedCategory === "All" || agent.category === selectedCategory) &&
        (!query ||
          [agent.title, agent.subtitle, agent.category, ...agent.features].some(
            (value) => value.toLowerCase().includes(query),
          )),
    );
  }, [searchTerm, selectedCategory]);
  const groupedAgents = filteredAgents.reduce((groups, agent) => {
    (groups[agent.category] ||= []).push(agent);
    return groups;
  }, {});

  React.useEffect(() => {
    if (
      filteredAgents.length &&
      !filteredAgents.some((agent) => agent.id === selected?.id)
    ) {
      setSelected(filteredAgents[0]);
    }
  }, [filteredAgents, selected?.id]);

  const openDetails = React.useCallback(
    (agent) => {
      setSelected(agent);
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );
  const go = React.useCallback(
    (direction) => {
      if (!filteredAgents.length) return;
      const index = filteredAgents.findIndex(
        (agent) => agent.id === selected?.id,
      );
      openDetails(
        filteredAgents[
          (index + direction + filteredAgents.length) % filteredAgents.length
        ],
      );
    },
    [filteredAgents, selected?.id, openDetails],
  );

  return (
    <section
      className="agents-gallery-section"
      aria-labelledby="agent-library-heading"
      onKeyDown={(event) => {
        if (event.target.closest("input, select, textarea")) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          go(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="site-container">
        <header className="agent-library-intro">
          <p className="eyebrow">Agent library</p>
          <h1 id="agent-library-heading"><EmphasizedTitle text="Agent library" /></h1>
          <p>
            Explore agents by capability and find the right starting point for
            your workflow.
          </p>
        </header>
        <div className="agent-library-controls">
          <div className="agent-filter-field">
            <label htmlFor="agent-search">Search agents</label>
            <div className="agent-input-wrap">
              <Search size={18} aria-hidden="true" />
              <input
                id="agent-search"
                type="search"
                placeholder="Search by name or capability"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
          <div className="agent-filter-field">
            <label htmlFor="agent-category">Category</label>
            <div className="agent-input-wrap">
              <Filter size={18} aria-hidden="true" />
              <select
                id="agent-category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="agent-results-count" role="status">
          {filteredAgents.length} agent{filteredAgents.length !== 1 ? "s" : ""}{" "}
          found
        </p>
        {filteredAgents.length > 0 && selected ? (
          <div className="agent-feature">
            <div className="agent-feature-art">
              {selected.imageHero ? (
                <img src={selected.imageHero} alt={selected.title} />
              ) : (
                <div
                  className="agent-color-fallback"
                  style={{ background: selected.color }}
                />
              )}
              <div className="agent-navigation" aria-label="Browse agents">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous agent"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next agent"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="agent-feature-copy">
              <p className="agent-subtitle">{selected.subtitle}</p>
              <h2>{selected.title}</h2>
              <p>{selected.fullDescription}</p>
              <h3>Key capabilities</h3>
              <ul>
                {selected.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <a
                className="button-primary agent-demo-link"
                href="https://calendar.app.google/mhjiQ9t9g5Ge322s6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request demo{" "}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="agent-empty-state">
            <h2>No matching agents</h2>
            <p>Try another search or select a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="agent-categories">
          {Object.entries(groupedAgents).map(([category, items]) => (
            <CategoryRow
              key={category}
              category={category}
              items={items}
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
