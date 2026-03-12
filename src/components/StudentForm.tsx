import React, { useState } from "react";
import {
  Qualification,
  BudgetRange,
  CollegeType,
  CareerGoal,
  StudentProfile,
} from "../types";

interface Props {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

const StudentForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<StudentProfile>({
    name: "",
    academic: {
      qualification: Qualification.Twelfth,
      board: "CBSE",
      year: "2024",
      subjects: "",
      marks: "",
    },
    exam: {
      examName: "JEE Main",
      rank: "",
      category: "General",
      quota: "State",
    },
    preferences: {
      stream: "",
      location: "",
      budget: BudgetRange.Medium,
      collegeType: CollegeType.Government,
      careerGoal: "",
    },
  });

  const validateStep = (current: number) => {
    const newErrors: string[] = [];

    if (current === 1) {
      if (!formData.name.trim()) newErrors.push("Full Name required");
      if (!formData.academic.marks.trim()) newErrors.push("Score required");
      if (!formData.academic.subjects.trim())
        newErrors.push("Stream required");
    }

    if (current === 2) {
      if (!formData.exam.rank.trim()) newErrors.push("Rank required");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (
    section: keyof StudentProfile | "name",
    field: string | null,
    value: string
  ) => {
    if (section === "name") {
      setFormData((prev) => ({ ...prev, name: value }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field as string]: value,
      },
    }));
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
      setErrors([]);
    }
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) next();
    else if (validateStep(3)) onSubmit(formData);
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6">

        {/* Stepper */}
        <div className="flex justify-between items-center mb-6 relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -z-10 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold ${step === s
                    ? "bg-indigo-600 text-white"
                    : step > s
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {step > s ? "✓" : s}
              </div>
              <span className="text-[10px] mt-1 text-gray-400 uppercase">
                {s === 1 ? "Academic" : s === 2 ? "Exams" : "Future"}
              </span>
            </div>
          ))}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                Academic Profile
              </h2>

              <Input
                label="Full Name"
                value={formData.name}
                onChange={(v) => handleChange("name", null, v)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Year"
                  type="number"
                  value={formData.academic.year}
                  onChange={(v) =>
                    handleChange("academic", "year", v)
                  }
                />
                <Input
                  label="Score"
                  value={formData.academic.marks}
                  onChange={(v) =>
                    handleChange("academic", "marks", v)
                  }
                />
              </div>

              <Input
                label="Stream"
                value={formData.academic.subjects}
                onChange={(v) =>
                  handleChange("academic", "subjects", v)
                }
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                Exam Details
              </h2>

              <Input
                label="Exam"
                value={formData.exam.examName}
                onChange={(v) =>
                  handleChange("exam", "examName", v)
                }
              />

              <Input
                label="Rank"
                value={formData.exam.rank}
                onChange={(v) =>
                  handleChange("exam", "rank", v)
                }
              />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold text-gray-800">
                Future Goals
              </h2>

              <Input
                label="Preferred Location"
                value={formData.preferences.location}
                onChange={(v) =>
                  handleChange("preferences", "location", v)
                }
              />

              <Input
                label="Desired Stream"
                value={formData.preferences.stream}
                onChange={(v) =>
                  handleChange("preferences", "stream", v)
                }
              />
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="text-xs px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="text-xs px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="text-xs px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Generate"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    />
  </div>
);

export default StudentForm;
