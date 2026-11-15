import React from 'react';
import type { FacetOption, JobFacets } from '../../services/jobsService';

export type FilterGroup = 'type' | 'experience' | 'location' | 'mode';
export type SelectedFilters = Record<FilterGroup, string[]>;

interface Props {
  facets: JobFacets | null;
  selected: SelectedFilters;
  onToggle: (group: FilterGroup, id: string) => void;
  onClear: () => void;
}

const Section: React.FC<{
  title: string;
  group: FilterGroup;
  options: FacetOption[];
  selected: SelectedFilters;
  onToggle: Props['onToggle'];
}> = ({ title, group, options, selected, onToggle }) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="text-[13px] font-bold text-neutral-800 mb-3">{title}</legend>
    <div className="flex flex-col gap-2.5">
      {options.map((option) => {
        const checked = selected[group].includes(option.id);
        return (
          <label key={option.id} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={() => onToggle(group, option.id)}
            />
            <span
              aria-hidden="true"
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/40 ${
                checked ? 'bg-primary-600 border-primary-600' : 'border-neutral-300 group-hover:border-primary-600'
              }`}
            >
              {checked && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-[13px] text-neutral-600 flex-1">{option.label}</span>
            <span className="text-[12px] text-neutral-500">({option.count.toLocaleString('en-IN')})</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

/** Checkbox filters with live counts from the jobs API. */
export const JobsSidebarFilter: React.FC<Props> = ({ facets, selected, onToggle, onClear }) => {
  const anySelected = Object.values(selected).some((values) => values.length > 0);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-neutral-800">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={!anySelected}
          className="text-[13px] font-bold text-primary-600 hover:text-primary-700 disabled:text-neutral-400 disabled:cursor-default"
        >
          Clear All
        </button>
      </div>

      {!facets ? (
        <div className="space-y-3 animate-pulse" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 rounded-full bg-neutral-100" />
          ))}
        </div>
      ) : (
        <>
          <Section title="Job Type" group="type" options={facets.types} selected={selected} onToggle={onToggle} />
          <hr className="border-neutral-100" />
          <Section
            title="Experience Level"
            group="experience"
            options={facets.experience}
            selected={selected}
            onToggle={onToggle}
          />
          <hr className="border-neutral-100" />
          <Section title="Work Mode" group="mode" options={facets.workModes} selected={selected} onToggle={onToggle} />
          {facets.locations.length > 0 && (
            <>
              <hr className="border-neutral-100" />
              <Section
                title="Location"
                group="location"
                options={facets.locations}
                selected={selected}
                onToggle={onToggle}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
