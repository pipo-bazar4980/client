export const showSuccess = (success, msg) => {
    if (success) return <div className="alert alert-primary">{msg}</div>
}

