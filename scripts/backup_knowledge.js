const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class KnowledgeBackup {
    constructor() {
        this.workspace = process.cwd();
        this.backupDir = path.join(this.workspace, 'backups');
        this.ensureBackupDir();
    }

    ensureBackupDir() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    async backupKnowledge() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = path.join(this.backupDir, `knowledge_backup_${timestamp}.json`);
        
        try {
            const knowledgePath = path.join(this.workspace, 'knowledge_base.json');
            if (fs.existsSync(knowledgePath)) {
                const knowledge = fs.readFileSync(knowledgePath, 'utf8');
                fs.writeFileSync(backupFile, knowledge);
                console.log(chalk.green(`✅ Knowledge backup created: ${backupFile}`));
                
                // Clean old backups (keep last 10)
                this.cleanOldBackups();
            }
        } catch (error) {
            console.log(chalk.red('Backup failed:'), error.message);
        }
    }

    cleanOldBackups() {
        try {
            const files = fs.readdirSync(this.backupDir)
                .filter(file => file.startsWith('knowledge_backup_'))
                .map(file => ({
                    name: file,
                    time: fs.statSync(path.join(this.backupDir, file)).mtime.getTime()
                }))
                .sort((a, b) => b.time - a.time);

            // Keep only the 10 most recent backups
            if (files.length > 10) {
                files.slice(10).forEach(file => {
                    fs.unlinkSync(path.join(this.backupDir, file.name));
                    console.log(chalk.yellow(`🗑️  Deleted old backup: ${file.name}`));
                });
            }
        } catch (error) {
            console.log(chalk.red('Backup cleanup failed:'), error.message);
        }
    }
}

module.exports = KnowledgeBackup;
