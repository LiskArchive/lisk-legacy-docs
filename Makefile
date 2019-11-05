.PHONY: all
.PHONY: ui
.PHONY: antora

all: ui antora

ui:
	cd antora && npm ci && gulp bundle
antora: ui
	antora site.yml
