import {extensions, ExtensionType, Resolver, resolveTextureUrl, ResolveURLParser} from 'pixi.js';

export const resolveJsonUrl = {
	extension: ExtensionType.ResolveParser,
	test: (value: string): boolean => Resolver.RETINA_PREFIX.test(value) && value.endsWith('.json'),
	parse: resolveTextureUrl.parse
} as ResolveURLParser;

extensions.add(resolveJsonUrl);
