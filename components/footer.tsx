export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/tasker-logo.png" alt="Tasker Logo" className="h-6 w-auto" />
            <span className="text-sm text-muted-foreground">© {currentYear} Tasker. All rights reserved.</span>
          </div>

          <div className="text-sm text-muted-foreground">Built with ❤️ for seamless task management</div>
        </div>
      </div>
    </footer>
  )
}
