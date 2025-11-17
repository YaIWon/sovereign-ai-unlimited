const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class SystemMonitor {
    constructor() {
        this.workspace = process.cwd();
        this.startTime = Date.now();
    }

    startMonitoring() {
        console.log(chalk.green('📊 Starting System Monitor...'));
        
        setInterval(() => {
            this.logSystemStatus();
        }, 30000); // Every 30 seconds
        
        setInterval(() => {
            this.checkKnowledgeGrowth();
        }, 60000); // Every minute
    }

    logSystemStatus() {
        const uptime = Date.now() - this.startTime;
        const hours = Math.floor(uptime / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        
        console.log(chalk.cyan('\n=== SYSTEM STATUS ==='));
        console.log(chalk.blue(`🕐 Uptime: ${hours}h ${minutes}m`));
        console.log(chalk.blue(`📚 Knowledge Base: ${this.getKnowledgeBaseSize()} items`));
        console.log(chalk.blue(`💾 Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`));
        console.log(chalk.blue(`🔄 Learning Cycles: ${this.getLearningCycleCount()}`));
    }

    getKnowledgeBaseSize() {
        try {
            const knowledgePath = path.join(this.workspace, 'knowledge_base.json');
            if (fs.existsSync(knowledgePath)) {
                const knowledge = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
                return Object.keys(knowledge).length;
            }
        } catch (error) {
            // Ignore errors
        }
        return 0;
    }

    getLearningCycleCount() {
        try {
            const logPath = path.join(this.workspace, 'learning_log.json');
            if (fs.existsSync(logPath)) {
                const log = JSON.parse(fs.readFileSync(logPath, 'utf8'));
                return log.cycles || 0;
            }
        } catch (error) {
            // Ignore errors
        }
        return 0;
    }

    checkKnowledgeGrowth() {
        const currentSize = this.getKnowledgeBaseSize();
        const growthPath = path.join(this.workspace, 'knowledge_growth.json');
        
        let growthData = { sizes: [], timestamps: [] };
        if (fs.existsSync(growthPath)) {
            growthData = JSON.parse(fs.readFileSync(growthPath, 'utf8'));
        }
        
        growthData.sizes.push(currentSize);
        growthData.timestamps.push(Date.now());
        
        // Keep only last 100 entries
        if (growthData.sizes.length > 100) {
            growthData.sizes = growthData.sizes.slice(-100);
            growthData.timestamps = growthData.timestamps.slice(-100);
        }
        
        fs.writeFileSync(growthPath, JSON.stringify(growthData, null, 2));
        
        if (growthData.sizes.length > 1) {
            const growth = currentSize - growthData.sizes[0];
            console.log(chalk.green(`📈 Knowledge Growth: +${growth} items`));
        }
    }
}

// Start monitoring
const monitor = new SystemMonitor();
monitor.startMonitoring();
