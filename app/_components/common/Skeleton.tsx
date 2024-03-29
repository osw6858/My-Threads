const Skeleton = ({ count }: { count: number }) => {
  return (
    <div className="h-screen">
      {new Array(count).fill(true).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 w-full my-5 h-80">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
