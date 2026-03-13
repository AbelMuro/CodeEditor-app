const ChangeStyles = (theme, className, styles) => {
        return theme === 'dark' ? [styles[className], styles.dark].join(' ') : [styles[className], styles.light].join(' ');
}

export {ChangeStyles};