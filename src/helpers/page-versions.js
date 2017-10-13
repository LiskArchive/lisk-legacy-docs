'use strict'

// FIXME the UI model should be prepopulated with this collection
module.exports = (domains, domainName, otherPageVersions) => {
  const domain = domains.find((candidate) => candidate.name === domainName)
  const pageVersions = []
  domain.versions.forEach((domainVersion) => {
    const pageVersion = otherPageVersions.find((candidate) => candidate.string === domainVersion.string)
    if (pageVersion) {
      pageVersions.push(pageVersion)
    } else {
      pageVersions.push(Object.assign({ missing: true }, domainVersion))
    }
  })

  return pageVersions
}
