CREATE TABLE landing_pages (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  template TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'unpublished')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE INDEX idx_landing_pages_client_id
ON landing_pages(client_id);

CREATE INDEX idx_landing_pages_status
ON landing_pages(status);

CREATE INDEX idx_landing_pages_slug
ON landing_pages(slug);
