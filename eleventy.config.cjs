const fg = require('fast-glob');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

	eleventyConfig.setUseGitIgnore(false);

	const coversSrc = fg.sync(['src/assets/images/covers/**/*.{jpg,jpeg,png,gif,webp}']);
	eleventyConfig.addCollection('covers', () => {
		const covers = [];

		for (const cover of coversSrc) {
			const coverBits = cover.split('/');
			const coverName = coverBits[coverBits.length - 1];
			if (coverName !== '_-----_.png') {
				covers.push(coverName);
			}
		}
		return covers;
	});

	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'src/public/**/*',
		],
		showVersion: true,
	});

	return {
		dir: {
			includes: '_includes',
			layouts: '_layouts',
		}
	}
};
