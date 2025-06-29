import { mockFiles } from '@/services/mockData/files.json'

class FileService {
  constructor() {
    this.files = [...mockFiles]
  }
  
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300))
    return [...this.files].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.files.find(file => file.Id === parseInt(id))
  }
  
  async uploadFile(file) {
    // Simulate file processing time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))
    
    // Extract file extension
    const extension = file.name.split('.').pop().toLowerCase()
    
    // Create new file record
    const newFile = {
      Id: Math.max(...this.files.map(f => f.Id), 0) + 1,
      filename: file.name,
      type: extension,
      size: file.size,
      extractedText: this.generateMockExtractedText(file.name, extension),
      metadata: {
        mimeType: file.type,
        lastModified: new Date(file.lastModified).toISOString(),
        pages: extension === 'pdf' ? Math.floor(Math.random() * 20) + 1 : null
      },
      uploadDate: new Date().toISOString()
    }
    
    this.files.unshift(newFile)
    return newFile
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = this.files.findIndex(file => file.Id === parseInt(id))
    if (index === -1) {
      throw new Error('File not found')
    }
    this.files.splice(index, 1)
    return true
  }
  
  generateMockExtractedText(filename, extension) {
    const sampleTexts = {
      pdf: "This is a sample PDF document containing important information about business processes and procedures. The document outlines key strategies and methodologies for improving organizational efficiency.",
      doc: "This Word document contains detailed analysis of market trends and customer behavior patterns. It includes comprehensive research findings and strategic recommendations for business growth.",
      docx: "Modern document format containing structured content with headers, paragraphs, and formatting. This document discusses innovative approaches to project management and team collaboration.",
      xls: "Spreadsheet data showing financial projections, budget allocations, and performance metrics. Contains multiple worksheets with charts and formulas for data analysis.",
      xlsx: "Advanced Excel workbook with pivot tables, conditional formatting, and complex calculations. Includes quarterly reports and trend analysis for decision making.",
      ppt: "Presentation slides covering quarterly business review and strategic planning initiatives. Contains charts, graphs, and key performance indicators.",
      pptx: "Professional PowerPoint presentation with modern design elements, infographics, and data visualizations for executive briefings and stakeholder meetings."
    }
    
    return sampleTexts[extension] || "Document content extracted successfully. This file contains relevant information that can be searched and referenced."
  }
}

export const fileService = new FileService()