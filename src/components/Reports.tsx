import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FileText, X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

const reports = [
  {
    title: "FINANCIAL IMPACT OF CARBON CREDITS ON CORPORATE INVESTMENT PORTFOLIOS",
    filename: "carbon-credits-report.pdf",
    type: "Research Report"
  },
  {
    title: "NOVEMBER WEEK REPORT",
    filename: "november-week-report.pdf",
    type: "Weekly Analysis"
  },
  {
    title: "BI WEEKLY REPORT",
    filename: "bi-weekly-report.pdf",
    type: "Bi-Weekly Analysis"
  },
  {
    title: "UNION BUDGET",
    filename: "union-budget-analysis.pdf",
    type: "Budget Analysis"
  },
  {
    title: "OCTOBER WEEKLY REPORT",
    filename: "october-weekly-report.pdf",
    type: "Weekly Analysis"
  },
  {
    title: "EQUITY REPORT",
    filename: "equity-report.pdf",
    type: "Market Analysis"
  },
];

export const Reports = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedReport, setSelectedReport] = useState<null | typeof reports[0]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedReport) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedReport]);

  const openPreview = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setCurrentPage(1);
    setZoom(1);
    setDirection(0);
  };

  const closePreview = () => {
    setSelectedReport(null);
    setCurrentPage(1);
    setZoom(1);
    setDirection(0);
  };

  const nextPage = () => {
    setDirection(1);
    setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToPage = (page: number) => {
    const newDirection = page > currentPage ? 1 : -1;
    setDirection(newDirection);
    setCurrentPage(Math.max(1, page));
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const downloadReport = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/reports/${filename}`;
    link.download = filename;
    link.click();
  };

  // Page turn animation variants
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section id="reports" className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,hsl(51,100%,50%)_49%,hsl(51,100%,50%)_51%,transparent_52%)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold"
        >
          Reports & Publications
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-white/70 mb-16 text-lg"
        >
          Industry insights and financial research by our members
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-black/50 backdrop-blur-sm border-2 border-yellow-400/30 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:border-yellow-400/60"
              onClick={() => openPreview(report)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors line-clamp-3">
                  {report.title}
                </h3>
                
                <p className="text-yellow-400/80 text-sm font-medium">
                  {report.type}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        {/* PDF Preview Modal */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
              onClick={closePreview}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/90 border-2 border-yellow-400/40 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">
                      {selectedReport.title}
                    </h3>
                    <p className="text-yellow-400 text-sm">{selectedReport.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-1">
                      <button
                        onClick={zoomOut}
                        disabled={zoom <= 0.5}
                        className="w-8 h-8 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-yellow-400 text-sm px-2 min-w-12 text-center">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button
                        onClick={zoomIn}
                        disabled={zoom >= 3}
                        className="w-8 h-8 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => downloadReport(selectedReport.filename)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    
                    {/* Close Button */}
                    <button
                      onClick={closePreview}
                      className="w-10 h-10 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>

                {/* PDF Preview with Page Turning Animation */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={pageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div 
                          className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden"
                          style={{ transform: `scale(${zoom})` }}
                        >
                          <iframe
                            src={`/reports/${selectedReport.filename}#page=${currentPage}`}
                            className="w-full h-full border-0"
                            title={`PDF Preview - ${selectedReport.title} - Page ${currentPage}`}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Page Navigation */}
                  <div className="flex items-center justify-between w-full max-w-4xl mt-6 px-4">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous Page
                    </button>

                    <div className="flex items-center gap-4">
                      <span className="text-white font-semibold bg-yellow-500/20 px-4 py-2 rounded-lg border border-yellow-400/30">
                        Page {currentPage}
                      </span>
                      <span className="text-white/70 text-sm">
                        {selectedReport.filename}
                      </span>
                    </div>

                    <button
                      onClick={nextPage}
                      className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-colors font-semibold"
                    >
                      Next Page
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quick Page Navigation */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-white/70 text-sm">Go to page:</span>
                    <input
                      type="number"
                      min="1"
                      value={currentPage}
                      onChange={(e) => goToPage(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 bg-black border border-yellow-400/30 rounded text-white text-center"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};