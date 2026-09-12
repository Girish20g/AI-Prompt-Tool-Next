interface PromptLoaderProps {
  label?: string;
}

const PromptLoader = ({ label = "Loading prompts" }: PromptLoaderProps) => {
  return (
    <div className="prompt_loader" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className="prompt_loader_spinner" aria-hidden="true" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="prompt_loader_skeletons" aria-hidden="true">
        {["one", "two", "three"].map((item) => (
          <div key={item} className="prompt_loader_skeleton">
            <div className="h-10 w-10 rounded-full bg-gray-200/80" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/5 rounded-full bg-gray-200/80" />
              <div className="h-3 w-4/5 rounded-full bg-gray-200/60" />
              <div className="h-3 w-3/5 rounded-full bg-gray-200/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLoader;
