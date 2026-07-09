const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace standard handleScheduleCall
  const search1 = `  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' });
    }
  };`;
  const replace1 = `  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };`;
  content = content.replace(search1, replace1);

  // Replace multiline handleScheduleCall (Hero.js)
  const search2 = `  const handleScheduleCall = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ 
        url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' 
      });
    }
  };`;
  const replace2 = `  const handleScheduleCall = () => {
    window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank');
  };`;
  content = content.replace(search2, replace2);

  // Replace inline onclick (AgentsGallery.js)
  const search3 = `onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/d/cwvd-6vj-tp8/demo-call' })}`;
  const replace3 = `onClick={() => window.open('https://calendar.app.google/mhjiQ9t9g5Ge322s6', '_blank')}`;
  content = content.replace(search3, replace3);

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Calendly replacements done.');
