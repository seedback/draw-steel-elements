// Custom ESLint rule to prefer specific path aliases over generic @/ alias
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prefer specific aliases like @model/* over @/model/*',
            category: 'Best Practices',
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        const aliasMap = {
            '@/model/': '@model/',
            '@/drawSteelComponents/': '@drawSteelComponents/',
            '@/utils/': '@utils/',
            '@/views/': '@views/',
            '@/drawSteelAdmonition/': '@drawSteelAdmonition/',
        };

        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                
                for (const [generic, specific] of Object.entries(aliasMap)) {
                    if (importPath.startsWith(generic)) {
                        context.report({
                            node: node.source,
                            message: `Use '${specific}' instead of '${generic}' for imports`,
                            fix(fixer) {
                                const newPath = importPath.replace(generic, specific);
                                return fixer.replaceText(node.source, `'${newPath}'`);
                            },
                        });
                        break;
                    }
                }
            },
        };
    },
};
