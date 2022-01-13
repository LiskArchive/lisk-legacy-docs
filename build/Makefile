.PHONY: all
.PHONY: ui
.PHONY: antora

all: ui antora

ui:
	cd antora && git pull origin antora && npm ci && gulp bundle
antora: ui
	antora site.yml --fetch
