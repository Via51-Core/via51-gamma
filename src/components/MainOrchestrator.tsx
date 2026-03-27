// src/components/MainOrchestrator
const MainOrchestrator = () => {
  const { config } = useSystem();

  if (config.mode === OPERATIONAL_MODES.CRITICAL) {
    return <AlphaCoyunturaView eventId={config.activeCoyunturaId} />;
  }

  return (
    <main className="grid-pillars">
      <PoliticalModule />
      <SocialModule />
      <ProductiveModule />
    </main>
  );
};
