-- Add Biotechnology as a core vertical
INSERT INTO verticals (id, name, category, parent_id, description)
VALUES ('biotechnology', 'Biotechnology', 'core', NULL,
  'BioEconomy pillar — BioPharma, BioIndustrial, BioServices, BioAgri. Tracked via KBER 2025.')
ON CONFLICT (id) DO NOTHING;
