library(tidyverse)
library(ggplot2)
library(ggcorrplot)
library(ggthemes)
library(ggridges)
library(ggrepel)
library(data.table)

alignment<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/alignment.tsv",col_names = TRUE)
financing<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/financing.tsv",col_names = TRUE)
flexiguidance<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/flexiguidance.tsv",col_names = TRUE)
inclusiveness<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/inclusiveness.tsv",col_names = TRUE)
participation<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/participation.tsv",col_names = TRUE)
quality<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/quality.tsv",col_names = TRUE)
urgency<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/urgency.tsv",col_names = TRUE)
indicator_guide<- read_tsv("/Users/vfduclos/Dropbox/Work/adult_skills/data/indicator_guide.tsv",col_names = TRUE)


alignment_wide <- gather(alignment,variable,value,-Country)
financing_wide <- gather(financing,variable,value,-Country)
flexiguidance_wide <- gather(flexiguidance,variable,value,-Country)
inclusiveness_wide <- gather(inclusiveness,variable,value,-Country)
participation_wide <- gather(participation,variable,value,-Country)
quality_wide <- gather(quality,variable,value,-Country)
urgency_wide <- gather(urgency,variable,value,-Country)


write.table(alignment_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/alignment_wide.tsv",sep='\t',row.names = FALSE)
write.table(financing_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/financing_wide.tsv",sep='\t',row.names = FALSE)
write.table(flexiguidance_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/flexiguidance_wide.tsv",sep='\t',row.names = FALSE)
write.table(inclusiveness_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/inclusiveness_wide.tsv",sep='\t',row.names = FALSE)
write.table(participation_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/participation_wide.tsv",sep='\t',row.names = FALSE)
write.table(quality_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/quality_wide.tsv",sep='\t',row.names = FALSE)
write.table(urgency_wide,"/Users/vfduclos/Dropbox/Work/adult_skills/data/urgency_wide.tsv",sep='\t',row.names = FALSE)

  
