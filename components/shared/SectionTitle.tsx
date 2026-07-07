type Props = {
  title: string;
  action?: React.ReactNode;
};

export function SectionTitle({
  title,
  action,
}: Props) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {action}
    </div>
  );
}