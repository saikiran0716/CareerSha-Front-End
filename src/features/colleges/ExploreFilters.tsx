import React from 'react';
import { ENTRANCE_EXAMS_DATA } from '../../data/exams/examDetailData';

export interface ExploreFilterValues {
  streams: string[];
  ownership: string[];
  states: string[];
  exam: string;
}

interface ExploreFiltersProps {
  values: ExploreFilterValues;
  options: { streams: string[]; ownership: string[]; states: string[] };
  onChange: (values: ExploreFilterValues) => void;
}

const EXAM_OPTIONS: [id: string, label: string][] = [
  ['jee-main', 'JEE Main'],
  ['jee-advanced', 'JEE Advanced'],
  ['neet', 'NEET'],
  ['cat', 'CAT'],
  ['gate', 'GATE'],
  ['clat', 'CLAT'],
  ['nift', 'NIFT'],
].map(([id, fallback]) => [id, ENTRANCE_EXAMS_DATA[id]?.title.replace(/\s*\d{4}$/, '') ?? fallback]);

const CheckboxGroup: React.FC<{
  legend: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}> = ({ legend, options, selected, onChange }) => (
  <fieldset className="border-b border-neutral-100 pb-5">
    <legend className="mb-3 text-sm text-neutral-900">{legend}</legend>
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label key={opt} className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt])}
            className="h-4 w-4 rounded border-neutral-300 accent-primary-800"
          />
          {opt}
        </label>
      ))}
    </div>
  </fieldset>
);

const ExploreFilters: React.FC<ExploreFiltersProps> = ({ values, options, onChange }) => {
  const active = values.streams.length + values.ownership.length + values.states.length + (values.exam ? 1 : 0);
  return (
    <aside aria-label="Filters" className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base text-neutral-900">Filters</h2>
        {active > 0 && (
          <button
            onClick={() => onChange({ streams: [], ownership: [], states: [], exam: '' })}
            className="text-xs text-primary-700 hover:underline"
          >
            Clear all ({active})
          </button>
        )}
      </div>

      <CheckboxGroup
        legend="Stream"
        options={options.streams}
        selected={values.streams}
        onChange={(streams) => onChange({ ...values, streams })}
      />

      <fieldset className="border-b border-neutral-100 pb-5">
        <legend className="mb-3 text-sm text-neutral-900">Exam accepted</legend>
        <select
          aria-label="Exam accepted"
          value={values.exam}
          onChange={(e) => onChange({ ...values, exam: e.target.value })}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Any exam</option>
          {EXAM_OPTIONS.map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </fieldset>

      <CheckboxGroup
        legend="Ownership"
        options={options.ownership}
        selected={values.ownership}
        onChange={(ownership) => onChange({ ...values, ownership })}
      />
      <CheckboxGroup
        legend="State"
        options={options.states}
        selected={values.states}
        onChange={(states) => onChange({ ...values, states })}
      />
    </aside>
  );
};

export default ExploreFilters;
