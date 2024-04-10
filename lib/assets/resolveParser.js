import { extensions, ExtensionType, Resolver, resolveTextureUrl } from 'pixi.js';
export const resolveJsonUrl = {
    extension: ExtensionType.ResolveParser,
    test: (value) => Resolver.RETINA_PREFIX.test(value) && value.endsWith('.json'),
    parse: resolveTextureUrl.parse
};
extensions.add(resolveJsonUrl);
//# sourceMappingURL=resolveParser.js.map