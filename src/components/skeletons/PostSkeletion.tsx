const PostSkeleton = () => {
  return (
    <div className="bg-white p-4 border rounded-md overflow-hidden relative w-full">
      <header className={`flex items-center mb-4`}>
        <div className="skeleton w-[40px] h-[40px] rounded-full skeleton skeleton-profile-img" />
        <div className="w-[80%]">
          <p className="ml-4 font-bold skeleton skeleton-text">{""}</p>
          <p className="ml-4 font-bold skeleton skeleton-text">{""}</p>
        </div>
      </header>
      <div className="h-[320px] border-y skeleton mb-4" />

      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  );
};

export default PostSkeleton;
