import chalk from 'chalk';
import MultiProgress from 'multi-progress';

const multi = new MultiProgress(process.stderr);

// eslint-disable-next-line require-jsdoc
class MultiBar {
  bar0;
  bar1;
  bar2;
  bar3;
  // eslint-disable-next-line require-jsdoc
  constructor(config: ProgressBar.ProgressBarOptions) {
    const curConfig = {
      complete: '=',
      incomplete: ' ',
      width: 30,
      ...config,
    };
    this.bar0 = multi.newBar(`:title`, curConfig);
    this.bar1 = multi.newBar(`Progress   [:bar] :percent`, curConfig);
    this.bar2 = multi.newBar(`FileInfo   :current/:total :file`, curConfig);
    this.bar3 = multi.newBar(`Consuming  :elapseds`, curConfig);
  }
  tick = ({ file, module }: { file: string; module: string }) => {
    this.bar0.tick({
      title: `Generating files from ${module}`,
    });
    this.bar1.tick();
    this.bar2.tick({
      file: chalk.cyan(`${file}.ts`),
    });
    this.bar3.tick();
  };
  isComplete = () => this.bar0.complete;
}

export { MultiBar };
