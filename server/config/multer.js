import multer from "multer";

const storage = multer.diskStorage({})

// const upload = multer({storage: storage})
// export default  upload;


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)   // ← accept
  } else {
    cb(new Error('Only PDF files are allowed'), false)  // ← reject
  }
}

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // ← 5MB limit
})

export default upload;