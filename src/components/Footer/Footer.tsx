const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <small>
          &copy; {currentYear} Utsav Malla — Built with semantic HTML, modern
          CSS and React + TypeScript.
        </small>
      </div>
    </footer>
  )
}

export default Footer
