export default function ParallaxDivider() {
  return (
    <div aria-hidden className="relative h-20 md:h-24 w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_30%_120%,rgba(99,102,241,0.18),transparent),radial-gradient(600px_200px_at_70%_-20%,rgba(236,72,153,0.15),transparent)] bg-fixed" />
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
}
