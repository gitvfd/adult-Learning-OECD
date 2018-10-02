library(tidyverse)
library(ggplot2)
library(ggcorrplot)
library(ggthemes)
library(ggridges)
library(ggrepel)
library(data.table)

alignment<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/alignment.tsv",col_names = TRUE)
financing<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/financing.tsv",col_names = TRUE)
flexiguidance<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/flexiguidance.tsv",col_names = TRUE)
inclusiveness<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/inclusiveness.tsv",col_names = TRUE)
participation<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/participation.tsv",col_names = TRUE)
quality<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/quality.tsv",col_names = TRUE)
urgency<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/urgency.tsv",col_names = TRUE)
indicator_guide<- read_tsv("/Users/vfduclos/GitHub/adult-Learning-OECD/proposal/data/indicator_guide.tsv",col_names = TRUE)


alignment_wide <- gather(alignment,variable,value,-Country)
financing_wide <- gather(financing,variable,value,-Country)
flexiguidance_wide <- gather(flexiguidance,variable,value,-Country)
inclusiveness_wide <- gather(inclusiveness,variable,value,-Country)
participation_wide <- gather(participation,variable,value,-Country)
quality_wide <- gather(quality,variable,value,-Country)
urgency_wide <- gather(urgency,variable,value,-Country)


write.table(alignment_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/alignment_wide.tsv",sep='\t',row.names = FALSE)
write.table(financing_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/financing_wide.tsv",sep='\t',row.names = FALSE)
write.table(flexiguidance_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/flexiguidance_wide.tsv",sep='\t',row.names = FALSE)
write.table(inclusiveness_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/inclusiveness_wide.tsv",sep='\t',row.names = FALSE)
write.table(participation_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/participation_wide.tsv",sep='\t',row.names = FALSE)
write.table(quality_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/quality_wide.tsv",sep='\t',row.names = FALSE)
write.table(urgency_wide,"/Users/vfduclos/GitHub/adult-Learning-OECD/data/urgency_wide.tsv",sep='\t',row.names = FALSE)

  
