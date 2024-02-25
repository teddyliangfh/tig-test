const formatTime = (timeString: string, format: Intl.DateTimeFormatOptions) => {
    const date = new Date(timeString)
    const formattedTime = date.toLocaleString('en-US', format).replace(',', '')
    return formattedTime
}

export {
    formatTime,
}